/**
 * How someone's habits move their estimate, and the single change that would help most.
 * Ported from bestLever() in prototype/index.html.
 */
import { num } from '@/i18n/format';
import { habitAnswer } from '@/i18n/labels';
import type { Strings } from '@/i18n/strings/en';
import { HABIT_KEYS, ageAt, hazardMultiplier, healthEstimate, survival, type HabitKey, type ModelInput } from '@/lib/model';

/** The healthiest answer for each habit. */
const BEST: { [K in HabitKey]-?: NonNullable<ModelInput[K]> } = {
  smoke: 'never',
  exercise: 'regular',
  bmi: 'normal',
  alcohol: 'moderate',
  sleep: 'ok',
  connection: 'often',
  strength: 'regular',
};

/**
 * Combined gains are capped: habit effects overlap, so stacking every multiplier overstates them. 14 years is
 * the largest all-habits difference in Li et al. 2018 (women, 5 vs 0 healthy factors at 50).
 */
export const MAX_TOTAL_GAIN = 14;

/** Changes smaller than this aren't worth a headline. */
const MIN_LEVER_YEARS = 0.2;

const medianWith = (p: ModelInput, now: number) => survival(p.sex, ageAt(p.dob, now), hazardMultiplier(p), p.country).med;
/** Median age good health likely lasts to. */
const healthyWith = (p: ModelInput, now: number) => healthEstimate(p, now).health.med;

/**
 * Years your answers add (+) or cost (−) versus the reference answers (hazard ratio 1:
 * non-smoker, some exercise, healthy weight, light drinking, 6–9 h sleep).
 */
export function habitsEffect(p: ModelInput, now = Date.now()) {
  return medianWith(p, now) - survival(p.sex, ageAt(p.dob, now), 1, p.country).med;
}

/** A single change, the years it would likely add, and the years in good health; its label is `t.levers[key]`. */
export type Lever = { key: HabitKey | 'steps'; years: number; healthy: number };

/** Each single habit change that would add time or healthy time, biggest first (only those worth mentioning). */
export function allLevers(p: ModelInput, now = Date.now()): Lever[] {
  const base = medianWith(p, now);
  const baseHealthy = healthyWith(p, now);
  const levers: Lever[] = [];
  const consider = (key: Lever['key'], changed: ModelInput) => {
    const years = medianWith(changed, now) - base;
    const healthy = healthyWith(changed, now) - baseHealthy;
    if (years >= MIN_LEVER_YEARS || healthy >= MIN_LEVER_YEARS) levers.push({ key, years, healthy });
  };

  for (const k of HABIT_KEYS) {
    if (k === 'exercise' && p.steps) {
      if (p.steps < 10000) consider('steps', { ...p, steps: 10000 });
      continue;
    }
    // Unanswered (asked only since 2026.10d): no claim until they say.
    if (p[k] != null && p[k] !== BEST[k]) consider(k, { ...p, [k]: BEST[k] });
  }
  return levers.sort((x, y) => y.years - x.years);
}

/** The change that would add the most years in good health. */
export function bestHealthyLever(p: ModelInput, now = Date.now()): Lever | null {
  return [...allLevers(p, now)].sort((x, y) => y.healthy - x.healthy)[0] ?? null;
}

/** The one habit change with the biggest gain in median age, if it's worth mentioning. */
export function bestLever(p: ModelInput, now = Date.now()): Lever | null {
  return allLevers(p, now)[0] ?? null;
}

/**
 * Years all the changes together would likely add, capped at MAX_TOTAL_GAIN. Less than the sum of the
 * single changes, since the model multiplies risks rather than adding years.
 */
export function combinedGain(p: ModelInput, now = Date.now()) {
  return gainFrom(p, allLevers(p, now).map((l) => l.key), now);
}

function withChanges(p: ModelInput, keys: Lever['key'][]) {
  const best = { ...p };
  for (const k of keys) {
    if (k === 'steps') best.steps = 10000;
    else Object.assign(best, { [k]: BEST[k] });
  }
  return best;
}

/** Years these changes together would likely add ("what if I quit smoking and slept more?"), capped. */
export function gainFrom(p: ModelInput, keys: Lever['key'][], now = Date.now()) {
  if (!keys.length) return 0;
  return Math.min(MAX_TOTAL_GAIN, Math.max(0, medianWith(withChanges(p, keys), now) - medianWith(p, now)));
}

/**
 * Years in good health these changes together would likely add, capped the same way: in Li et al. 2020 the
 * all-habits difference in disease-free years (+10.7 women, +7.6 men) was about the size of the difference
 * in total years, so the 14-year cap applies to both.
 */
export function healthyGainFrom(p: ModelInput, keys: Lever['key'][], now = Date.now()) {
  if (!keys.length) return 0;
  return Math.min(MAX_TOTAL_GAIN, Math.max(0, healthyWith(withChanges(p, keys), now) - healthyWith(p, now)));
}

/** The answer for each habit that carries no extra risk (hazard ratio 1). */
const NEUTRAL: { [K in HabitKey]-?: NonNullable<ModelInput[K]> } = {
  smoke: 'never',
  exercise: 'some',
  bmi: 'normal',
  alcohol: 'none',
  sleep: 'ok',
  connection: 'often',
  strength: 'none',
};

export type HabitEffect = { key: HabitKey; label: string; answer: string; years: number };

/** Per habit: years gained (+) or lost (−) by the current answer versus the neutral one. */
export function habitBreakdown(p: ModelInput, t: Strings, now = Date.now()): HabitEffect[] {
  const base = medianWith(p, now);
  return HABIT_KEYS.flatMap((k) => {
    const neutral: ModelInput = k === 'exercise' ? { ...p, exercise: NEUTRAL.exercise, steps: undefined } : { ...p, [k]: NEUTRAL[k] };
    const years = base - medianWith(neutral, now);
    if (Math.abs(years) < 0.05) return [];
    const answer = k === 'exercise' && p.steps ? t.habitsScreen.stepsAnswer(num(p.steps)) : habitAnswer(t, k, p[k]);
    return [{ key: k, label: t.habits[k].short, answer, years }];
  });
}
