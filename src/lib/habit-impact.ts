/**
 * How someone's habits move their estimate, and the single change that would help most.
 * Ported from bestLever() in prototype/index.html.
 */
import { HABITS, HABIT_KEYS, ageAt, hazardMultiplier, survival, type HabitKey, type ModelInput } from '@/lib/model';

/** The healthiest answer for each habit. */
const BEST: { [K in HabitKey]: ModelInput[K] } = {
  smoke: 'never',
  exercise: 'regular',
  bmi: 'normal',
  alcohol: 'moderate',
  sleep: 'ok',
};

const LEVER_LABEL: Record<HabitKey | 'steps', string> = {
  smoke: 'Quitting smoking',
  exercise: 'Exercising 3+ times a week',
  bmi: 'Reaching a healthy weight',
  alcohol: 'Drinking less',
  sleep: 'Sleeping 6–9 hours',
  steps: 'Walking 10,000 steps a day',
};

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

export type Lever = { key: HabitKey | 'steps'; label: string; years: number };

/** The one habit change with the biggest gain in median age, if it's worth mentioning. */
export function bestLever(p: ModelInput, now = Date.now()): Lever | null {
  const base = medianWith(p, now);
  let best: Lever | null = null;
  const consider = (key: Lever['key'], changed: ModelInput) => {
    const years = medianWith(changed, now) - base;
    if (!best || years > best.years) best = { key, label: LEVER_LABEL[key], years };
  };

  for (const k of HABIT_KEYS) {
    if (k === 'exercise' && p.steps) {
      if (p.steps < 10000) consider('steps', { ...p, steps: 10000 });
      continue;
    }
    if (p[k] !== BEST[k]) consider(k, { ...p, [k]: BEST[k] });
  }

  const found = best as Lever | null;
  return found && found.years >= MIN_LEVER_YEARS ? found : null;
}

/** The answer for each habit that carries no extra risk (hazard ratio 1). */
const NEUTRAL: { [K in HabitKey]: ModelInput[K] } = {
  smoke: 'never',
  exercise: 'some',
  bmi: 'normal',
  alcohol: 'none',
  sleep: 'ok',
};

export type HabitEffect = { key: HabitKey; label: string; answer: string; years: number };

/** Per habit: years gained (+) or lost (−) by the current answer versus the neutral one. */
export function habitBreakdown(p: ModelInput, now = Date.now()): HabitEffect[] {
  const base = medianWith(p, now);
  return HABIT_KEYS.flatMap((k) => {
    const neutral: ModelInput = k === 'exercise' ? { ...p, exercise: NEUTRAL.exercise, steps: undefined } : { ...p, [k]: NEUTRAL[k] };
    const years = base - medianWith(neutral, now);
    if (Math.abs(years) < 0.05) return [];
    const options: readonly { value: string; label: string }[] = HABITS[k].options;
    const answer = k === 'exercise' && p.steps ? `${p.steps.toLocaleString('en-US')} steps a day` : (options.find((o) => o.value === p[k])?.label ?? '');
    return [{ key: k, label: HABITS[k].short, answer, years }];
  });
}
