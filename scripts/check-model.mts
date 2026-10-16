/**
 * Checks src/lib/model.ts:
 * 1. With no country, it matches the prototype's original model code across every combination of answers
 *    (so profiles saved before countries existed get the same estimate).
 * 2. With each country, the fitted median age at death from birth is within a year of that country's
 *    UN life table (med0, stored by scripts/fit-country-tables.mts).
 * 3. Healthy years: with each country WHO covers, the model's healthy share of the years ahead (from birth and
 *    from 60) matches WHO's HALE ÷ life expectancy; habits move healthy years about as much as total years
 *    (Li et al. 2020); good health never outlasts life; strength training adds more healthy years than years.
 * Run with `npm run check:model` (Node 22.18+ runs TypeScript directly; excluded from the app typecheck).
 * If a deliberate model change makes this fail, bump MODEL_VERSION and update or retire this check.
 */
import { readFileSync } from 'node:fs';

import { COUNTRY_TABLES } from '../src/lib/country-tables.ts';
import { HEALTH_TABLES } from '../src/lib/health-tables.ts';
import * as M from '../src/lib/model.ts';

const html = readFileSync(new URL('../prototype/index.html', import.meta.url), 'utf8');
const start = html.indexOf('const DAY=864e5');
const end = html.indexOf('/* ---------- state ---------- */');
const proto = new Function(`${html.slice(start, end)}; return { est };`)() as {
  est: (p: object) => M.Survival;
};

const values = (k: M.HabitKey) => M.HABITS[k].options.map((o) => o.value);
let profiles = 0;
let maxDiff = 0;
for (const sex of ['m', 'f'] as const)
  for (const dob of ['1940-06-15', '1950-03-02', '1972-07-15', '1990-01-31', '2005-12-24'])
    for (const smoke of values('smoke'))
      for (const exercise of values('exercise'))
        for (const bmi of values('bmi'))
          for (const alcohol of values('alcohol'))
            for (const sleep of values('sleep'))
              for (const steps of [undefined, 3000, 8000, 12000]) {
                // The prototype has no connection factor; 'often' (×1) keeps the two comparable.
                const p = { sex, dob, smoke, exercise, bmi, alcohol, sleep, connection: 'often', steps } as M.ModelInput;
                const t = Date.now();
                const a = M.estimate(p, t);
                const b = proto.est(p);
                for (const k of ['mean', 'q25', 'med', 'q75', 'p80'] as const) {
                  maxDiff = Math.max(maxDiff, Math.abs(a[k] - b[k]));
                }
                profiles++;
              }

// The two sides read the clock a moment apart, so allow a sliver of drift.
const parity = maxDiff < 1e-4;
console.log(`${parity ? 'OK' : 'MISMATCH'}: no country vs prototype, ${profiles} profiles, max difference ${maxDiff.toExponential(2)} years`);

const TOLERANCE = 1;
const misses: string[] = [];
let worst = 0;
for (const c of COUNTRY_TABLES)
  for (const sex of ['m', 'f'] as const) {
    const diff = M.survival(sex, 0, 1, c.code).med - c[sex].med0;
    worst = Math.max(worst, Math.abs(diff));
    if (Math.abs(diff) > TOLERANCE) misses.push(`${c.name} (${c.code}) ${sex}: ${diff > 0 ? '+' : ''}${diff.toFixed(2)}`);
  }
const fits = misses.length === 0 && COUNTRY_TABLES.length > 0;
console.log(
  `${fits ? 'OK' : 'MISFIT'}: ${COUNTRY_TABLES.length} countries × 2 sexes, median at birth within ${TOLERANCE} year of the UN table (worst ${worst.toFixed(2)})`,
);
for (const m of misses) console.log(`  ${m}`);

// 3a. Healthy share vs WHO, per country and sex.
const SHARE_TOLERANCE = 0.005;
const shareMisses: string[] = [];
let worstShare = 0;
let worstYears = 0;
let covered = 0;
for (const h of HEALTH_TABLES) {
  if (h.global) continue;
  covered++;
  for (const sex of ['m', 'f'] as const)
    for (const [from, want] of [
      [0, h[sex].s0],
      [60, h[sex].s60],
    ] as const) {
      const { life, health } = M.healthspanWith(M.paramsFor(sex, h.code), M.healthParamsFor(sex, h.code), from, 1, 0);
      const got = (health.mean - from) / (life.mean - from);
      worstShare = Math.max(worstShare, Math.abs(got - want));
      if (Math.abs(got - want) > SHARE_TOLERANCE) shareMisses.push(`${h.code} ${sex} from ${from}: ${got.toFixed(3)} vs ${want}`);
      // WHO's own healthy years differ where WHO's and the UN's life expectancies do; reported, not checked.
      const whoYears = from === 0 ? h[sex].hale0 : h[sex].hale60;
      if (whoYears != null) worstYears = Math.max(worstYears, Math.abs(health.mean - from - whoYears));
    }
}
const halePass = shareMisses.length === 0 && covered > 150;
console.log(
  `${halePass ? 'OK' : 'MISFIT'}: ${covered} WHO countries × 2 sexes, healthy share from birth and 60 within ${SHARE_TOLERANCE} of HALE ÷ LE (worst ${worstShare.toFixed(4)}; healthy years vs WHO's HALE differ by up to ${worstYears.toFixed(1)} where UN and WHO mortality differ)`,
);
for (const m of shareMisses.slice(0, 10)) console.log(`  ${m}`);

// 3b. Li et al. 2020: 4–5 healthy habits vs none at 50 → +10.7/+9.4 (women, healthy/total), +7.6/+8.1 (men).
const at50 = (sex: M.Sex, smoke: string, exercise: string, bmi: string, alcohol: string) => {
  const p = { sex, dob: '1976-01-01', smoke, exercise, bmi, alcohol, sleep: 'ok', connection: 'often', country: 'US' } as M.ModelInput;
  return M.healthspanWith(M.paramsFor(sex, 'US'), M.healthParamsFor(sex, 'US'), 50, M.hazardMultiplier(p), M.healthShift(p));
};
let liPass = true;
for (const sex of ['f', 'm'] as const) {
  const worst = at50(sex, 'current', 'none', 'obese', 'heavy');
  const best = at50(sex, 'never', 'regular', 'normal', 'moderate');
  const total = best.life.mean - worst.life.mean;
  const healthy = best.health.mean - worst.health.mean;
  const ratio = healthy / total;
  const ok = ratio > 0.85 && ratio < 1.25;
  liPass &&= ok;
  console.log(`${ok ? 'OK' : 'OFF'}: Li 2020 contrast, ${sex}: +${healthy.toFixed(1)} healthy vs +${total.toFixed(1)} total years (ratio ${ratio.toFixed(2)}; Li ${sex === 'f' ? '1.14' : '0.94'}; uncapped)`);
}

// 3c. Good health never outlasts life; strength training moves healthy years more than total years.
let orderPass = true;
for (const c of COUNTRY_TABLES)
  for (const sex of ['m', 'f'] as const)
    for (const dob of ['1950-03-02', '1990-01-31'])
      for (const smoke of ['never', 'current'])
        for (const strength of [undefined, 'regular']) {
          const p = { sex, dob, smoke, exercise: 'some', bmi: 'normal', alcohol: 'none', sleep: 'ok', connection: 'often', strength, country: c.code } as M.ModelInput;
          const { life, health } = M.healthEstimate(p);
          if (!(health.q25 <= life.q25 && health.med <= life.med && health.q75 <= life.q75 && health.q25 <= health.med && health.med <= health.q75)) {
            orderPass = false;
            console.log(`  order broken: ${c.code} ${sex} ${dob} ${smoke} ${strength}`);
          }
        }
const base = { sex: 'f', dob: '1985-06-01', smoke: 'never', exercise: 'some', bmi: 'normal', alcohol: 'none', sleep: 'ok', connection: 'often', country: 'US' } as M.ModelInput;
const a = M.healthEstimate(base);
const b = M.healthEstimate({ ...base, strength: 'regular' });
const strengthPass = b.health.med - a.health.med > b.life.med - a.life.med;
console.log(
  `${orderPass && strengthPass ? 'OK' : 'OFF'}: healthy ≤ life everywhere; strength twice a week: +${(b.health.med - a.health.med).toFixed(1)} healthy vs +${(b.life.med - a.life.med).toFixed(1)} total years`,
);

process.exit(parity && fits && halePass && liPass && orderPass && strengthPass ? 0 : 1);
