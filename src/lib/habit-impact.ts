/**
 * How someone's habits move their estimate, and the single change that would help most.
 * Ported from bestLever() in prototype/index.html.
 */
import { num } from '@/i18n/format';
import { habitAnswer } from '@/i18n/labels';
import type { Strings } from '@/i18n/strings/en';
import { HABIT_KEYS, ageAt, hazardMultiplier, survival, type HabitKey, type ModelInput } from '@/lib/model';

/** The healthiest answer for each habit. */
const BEST: { [K in HabitKey]: ModelInput[K] } = {
  smoke: 'never',
  exercise: 'regular',
  bmi: 'normal',
  alcohol: 'moderate',
  sleep: 'ok',
  connection: 'often',
};

/**
 * Combined gains are capped: habit effects overlap, so stacking every multiplier overstates them. 14 years is
 * the largest all-habits difference in Li et al. 2018 (women, 5 vs 0 healthy factors at 50).
 */
export const MAX_TOTAL_GAIN = 14;

/** Changes smaller than this aren't worth a headline. */
const MIN_LEVER_YEARS = 0.2;

const medianWith = (p: ModelInput, now: number) => survival(p.sex, ageAt(p.dob, now), hazardMultiplier(p)).med;

/**
 * Years your answers add (+) or cost (−) versus the reference answers (hazard ratio 1:
 * non-smoker, some exercise, healthy weight, light drinking, 6–9 h sleep).
 */
export function habitsEffect(p: ModelInput, now = Date.now()) {
  return medianWith(p, now) - survival(p.sex, ageAt(p.dob, now), 1).med;
}

/** A single change; its label is `t.levers[key]`. */
export type Lever = { key: HabitKey | 'steps'; years: number };

/** Each single habit change that would add time, biggest first (only those worth mentioning). */
export function allLevers(p: ModelInput, now = Date.now()): Lever[] {
  const base = medianWith(p, now);
  const levers: Lever[] = [];
  const consider = (key: Lever['key'], changed: ModelInput) => {
    const years = medianWith(changed, now) - base;
    if (years >= MIN_LEVER_YEARS) levers.push({ key, years });
  };

  for (const k of HABIT_KEYS) {
    if (k === 'exercise' && p.steps) {
      if (p.steps < 10000) consider('steps', { ...p, steps: 10000 });
      continue;
    }
    if (p[k] !== BEST[k]) consider(k, { ...p, [k]: BEST[k] });
  }
  return levers.sort((x, y) => y.years - x.years);
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
  const levers = allLevers(p, now);
  if (!levers.length) return 0;
  const best = { ...p };
  for (const l of levers) {
    if (l.key === 'steps') best.steps = 10000;
    else Object.assign(best, { [l.key]: BEST[l.key] });
  }
  return Math.min(MAX_TOTAL_GAIN, medianWith(best, now) - medianWith(p, now));
}

/** The answer for each habit that carries no extra risk (hazard ratio 1). */
const NEUTRAL: { [K in HabitKey]: ModelInput[K] } = {
  smoke: 'never',
  exercise: 'some',
  bmi: 'normal',
  alcohol: 'none',
  sleep: 'ok',
  connection: 'often',
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
