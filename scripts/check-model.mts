/**
 * Checks src/lib/model.ts against the prototype's original model code across every combination
 * of answers. Run with `npm run check:model` (Node 22.18+ runs TypeScript directly; excluded from the app typecheck).
 * If a deliberate model change makes this fail, bump MODEL_VERSION and update or retire this check.
 */
import { readFileSync } from 'node:fs';

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
const ok = maxDiff < 1e-4;
console.log(`${ok ? 'OK' : 'MISMATCH'}: ${profiles} profiles, max difference ${maxDiff.toExponential(2)} years`);
process.exit(ok ? 0 : 1);
