/**
 * Life-expectancy model, ported from prototype/index.html. Pure functions, no app imports.
 *
 * Gompertz–Makeham hazard h(x) = (A + B·e^(b·x) + early-life terms) × habit multiplier, integrated
 * monthly. The early-life terms are constants: c before CHILD_END and y from then until YOUTH_END
 * (childhood and youth deaths aren't Gompertz-shaped). A, B, b, c and y are fitted per country and sex to the UN World Population
 * Prospects 2024 life tables (scripts/fit-country-tables.mts → country-tables.ts). Without a
 * country, the prototype's approximation of US tables is used (~75 at birth for males, ~81 for
 * females), so profiles saved before countries existed give the same answer as before.
 */
import { COUNTRY_TABLES, COUNTRY_TABLES_SOURCE } from './country-tables.ts';
import { HEALTH_TABLES, HEALTH_TABLES_SOURCE, NO_COUNTRY_HEALTH } from './health-tables.ts';

/** Stored alongside any saved estimate so results can be traced to the model that produced them. */
export const MODEL_VERSION = `gm-2026.10d+${COUNTRY_TABLES_SOURCE.version}+${HEALTH_TABLES_SOURCE.version}`;
// 2026.10b: adds social connection (Holt-Lunstad 2015). Everything else matches the prototype.
// 2026.10c: baseline mortality by country (UN WPP 2024). No country = the 2026.10b US approximation.
// 2026.10d: healthy years (WHO HALE 2023, habits per Li 2020) and strength training. Unanswered = ×1, so
//           lifespans for profiles saved before match 2026.10c.

/** Gompertz slope of the US approximation; also the rule-of-thumb slope for "years ≈ ln(1/HR) ÷ b". */
export const GOMPERTZ_B = 0.085;

/** Childhood hazard `c` applies before this age, youth hazard `y` from it until YOUTH_END. */
export const CHILD_END = 15;
export const YOUTH_END = 30;

export type Sex = 'm' | 'f';

/** Baseline hazard parameters for one sex in one place; c and y are the early-life terms (may be negative). */
export type CountryParams = { A: number; B: number; b: number; c?: number; y?: number };

/** Yearly baseline hazard at age x, before habits. */
export function baseHazard({ A, B, b, c = 0, y = 0 }: CountryParams, x: number) {
  return A + B * Math.exp(b * x) + (x < CHILD_END ? c : x < YOUTH_END ? y : 0);
}

/** The prototype's approximation of US period life tables: used when no country is set. */
export const US_APPROX: Record<Sex, CountryParams> = {
  m: { A: 0.0012, B: 6.0e-5, b: GOMPERTZ_B },
  f: { A: 0.0007, B: 4.2e-5, b: GOMPERTZ_B },
};

const BY_CODE = new Map(COUNTRY_TABLES.map((c) => [c.code, c]));

/** The life table for an ISO 3166-1 alpha-2 code, if the UN publishes one. */
export function countryTable(code: string | undefined) {
  return code ? BY_CODE.get(code.toUpperCase()) : undefined;
}

export function paramsFor(sex: Sex, country?: string): CountryParams {
  return countryTable(country)?.[sex] ?? US_APPROX[sex];
}

type Option<V extends string> = { value: V; label: string; hr: number };

/** Each habit's answers and the hazard ratio applied to all-cause mortality. */
export const HABITS = {
  smoke: {
    question: 'Do you smoke?',
    short: 'Smoking',
    why: 'The single biggest lever on this list.',
    options: [
      { value: 'never', label: 'Never', hr: 1 },
      { value: 'former', label: 'I quit', hr: 1.3 },
      { value: 'current', label: 'Yes', hr: 2.2 },
    ],
  },
  exercise: {
    question: 'How often do you exercise?',
    short: 'Exercise',
    why: 'Brisk walking counts.',
    options: [
      { value: 'none', label: 'Rarely', hr: 1.3 },
      { value: 'some', label: '1–2× a week', hr: 1 },
      { value: 'regular', label: '3+× a week', hr: 0.85 },
    ],
  },
  bmi: {
    question: 'Which describes your weight?',
    short: 'Weight',
    why: 'Body mass index ranges. Rough is fine.',
    options: [
      { value: 'under', label: 'Underweight', hr: 1.4 },
      { value: 'normal', label: 'Healthy', hr: 1 },
      { value: 'over', label: 'Overweight', hr: 1.05 },
      { value: 'obese', label: 'Obese', hr: 1.35 },
    ],
  },
  alcohol: {
    question: 'How much do you drink?',
    short: 'Alcohol',
    why: 'Heavy means about 15 or more drinks a week.',
    options: [
      { value: 'none', label: 'Little or none', hr: 1 },
      { value: 'moderate', label: 'Moderate', hr: 1 },
      { value: 'heavy', label: 'Heavy', hr: 1.4 },
    ],
  },
  sleep: {
    question: 'How much do you sleep?',
    short: 'Sleep',
    why: 'Most nights, not your best nights.',
    options: [
      { value: 'short', label: 'Under 6 hours', hr: 1.15 },
      { value: 'ok', label: '6–9 hours', hr: 1 },
    ],
  },
  /**
   * Holt-Lunstad et al. 2015 (70 studies, 3.4 M people): social isolation OR 1.29, loneliness 1.26, living
   * alone 1.32. Odds ratios used as hazard ratios, an approximation. "A few times a month" (1.1) is an
   * interpolation, not a measured level.
   */
  connection: {
    question: 'How often do you spend time with people you are close to?',
    short: 'Connection',
    why: 'In person or a real conversation. Close relationships are one of the strongest predictors of a long life.',
    options: [
      { value: 'often', label: 'Every week', hr: 1 },
      { value: 'sometimes', label: 'A few times a month', hr: 1.1 },
      { value: 'rarely', label: 'Rarely; I often feel alone', hr: 1.29 },
    ],
  },
  /**
   * Momma et al. 2022 (16 cohorts): muscle-strengthening activities were linked to 10–17% lower mortality, most
   * of it by 30–60 minutes a week. "Once a week" (0.9) is an interpolation. Its larger effect on staying strong
   * and independent is in HEALTH_HR.
   */
  strength: {
    question: 'Do you do strength training?',
    short: 'Strength',
    why: 'Weights, bands, or your own body weight: squats, push-ups, carrying heavy bags. It keeps you strong and steady later on.',
    options: [
      { value: 'none', label: 'Rarely or never', hr: 1 },
      { value: 'some', label: 'About once a week', hr: 0.9 },
      { value: 'regular', label: 'Twice a week or more', hr: 0.85 },
    ],
  },
} as const satisfies Record<string, { question: string; short: string; why: string; options: readonly Option<string>[] }>;

export type HabitKey = keyof typeof HABITS;
export const HABIT_KEYS = Object.keys(HABITS) as HabitKey[];
export type HabitValue<K extends HabitKey> = (typeof HABITS)[K]['options'][number]['value'];
/** Habits asked since 2026.10d may be missing on older profiles; a missing answer counts as ×1. */
export const LATER_HABITS = ['strength'] as const satisfies readonly HabitKey[];
type LaterHabit = (typeof LATER_HABITS)[number];
export type Habits = { [K in Exclude<HabitKey, LaterHabit>]: HabitValue<K> } & { [K in LaterHabit]?: HabitValue<K> };

export type ModelInput = Habits & {
  sex: Sex;
  /** ISO 3166-1 alpha-2 code whose life table sets the baseline. Absent on older profiles (US approximation). */
  country?: string;
  /** ISO date, YYYY-MM-DD. */
  dob: string;
  /** 90-day average daily steps. When set, replaces the exercise answer (never double count). */
  steps?: number;
};

export const DAY_MS = 864e5;
export const YEAR_MS = 365.2425 * DAY_MS;
export const WEEK_MS = 7 * DAY_MS;
export const WEEKS_PER_YEAR = 52.1775;

export function habitHR<K extends HabitKey>(key: K, value: HabitValue<K> | undefined) {
  const options: readonly Option<string>[] = HABITS[key].options;
  return options.find((o) => o.value === value)?.hr ?? 1;
}

/** Log-linear risk vs a 6,000-step reference, plateauing at 10,000 (8k vs 4k ≈ 0.75). */
export function stepsHR(steps: number) {
  return Math.exp((-0.072 * (Math.min(Math.max(steps, 1000), 10000) - 6000)) / 1000);
}

/** Shortcut: years gained ≈ ln(1/HR) ÷ b. */
export function yearsFromHR(hr: number) {
  return Math.log(1 / hr) / GOMPERTZ_B;
}

export function hazardMultiplier(p: ModelInput) {
  return HABIT_KEYS.reduce(
    (m, k) => m * (k === 'exercise' && p.steps ? stepsHR(p.steps) : habitHR(k, p[k])),
    1,
  );
}

export type Survival = {
  /** Life expectancy (mean age at death). */
  mean: number;
  /** Age by which 25% of people like this have died. */
  q25: number;
  /** Median age at death: half of people like this reach it. */
  med: number;
  /** Age by which 75% have died. */
  q75: number;
  /** Probability of reaching 80. */
  p80: number;
};

/** Survival from `age` onward for a sex and (optional) country, stepping monthly to age 121. */
export function survival(sex: Sex, age: number, multiplier: number, country?: string): Survival {
  return survivalWith(paramsFor(sex, country), age, multiplier);
}

export function survivalWith(params: CountryParams, age: number, multiplier: number): Survival {
  const quantiles: Partial<Record<0.75 | 0.5 | 0.25, number>> = {};
  let S = 1;
  let x = age;
  let expectancy = 0;
  let p80 = age >= 80 ? 1 : 0;

  while (x < 121 && S > 1e-4) {
    const h = (baseHazard(params, x) * multiplier) / 12;
    const s = Math.exp(-h);
    expectancy += (S * (1 + s)) / 2 / 12;
    const prev = S;
    S *= s;
    x += 1 / 12;
    for (const t of [0.75, 0.5, 0.25] as const) {
      if (quantiles[t] == null && S <= t) quantiles[t] = x;
    }
    if (!p80 && x >= 80 && x < 80 + 1 / 12) p80 = prev;
  }

  return {
    mean: age + expectancy,
    q25: quantiles[0.75] ?? x,
    med: quantiles[0.5] ?? x,
    q75: quantiles[0.25] ?? x,
    p80,
  };
}

/** Birth instant in local time. */
export function birthTime(dob: string) {
  return new Date(`${dob}T00:00:00`).getTime();
}

export function ageAt(dob: string, t = Date.now()) {
  return Math.max(0, (t - birthTime(dob)) / YEAR_MS);
}

export function estimate(p: ModelInput, t = Date.now()) {
  return survival(p.sex, ageAt(p.dob, t), hazardMultiplier(p), p.country);
}

// ---------- Healthy years ----------
//
// WHO's healthy life expectancy (HALE) counts the years lived in good health. Its gap to life expectancy
// comes from the share of people at each age living with illness or disability (the Sullivan method), so we
// model that share as a logistic curve in age, fitted per country and sex so the model's healthy share of
// the years ahead, from birth and from 60, matches WHO's HALE ÷ life expectancy
// (scripts/fetch-health-tables.mts → health-tables.ts). A share, not WHO's years, because the mortality
// underneath is the UN's; the two agencies' life expectancies differ by a year or more in some countries.
//
// For one person, the years ahead are weighted by that share and the less healthy time is gathered at the
// end, where most of it falls: someone who lives to T stays in good health until about
// age + ∫ (1 − poor(x)) dx from now to T. So the healthy quantiles follow the lifespan ones, and the band on
// the calendar ends before the likely end of life, never as a fixed age.

/** Logistic share of people at age x not in good health: 1 / (1 + e^−(al + be·(x − 60))). */
export type HealthParams = { al: number; be: number };

export function poorHealth({ al, be }: HealthParams, x: number) {
  return 1 / (1 + Math.exp(-(al + be * (x - 60))));
}

const HEALTH_BY_CODE = new Map(HEALTH_TABLES.map((c) => [c.code, c]));

/** The WHO-fitted health curve for a country; absent countries were fitted to the global shares. */
export function healthParamsFor(sex: Sex, country?: string): HealthParams {
  const code = country?.toUpperCase();
  return (code && HEALTH_BY_CODE.get(code)?.[sex]) || NO_COUNTRY_HEALTH[sex];
}

/**
 * Habits move healthy years at least as much as total years: in Li et al. 2020 (BMJ), 4–5 healthy habits at 50
 * vs none meant about +9.4 (women) and +8.1 (men) total years, and +10.7 and +7.6 years free of cancer, heart
 * disease and diabetes; the years lived with disease barely changed. Habits act on the health curve as an age
 * shift, ln(multiplier) ÷ b, like they do on mortality, scaled by HEALTH_K. HEALTH_K = 2 makes the model's
 * healthy-years gain about equal to its total-years gain for that comparison (checked by check-model).
 */
export const HEALTH_K = 2;

/**
 * Factors that move health more than survival, as hazard ratios on losing good health. Strength training: in
 * the LIFE trial, a program of walking, strength and balance work cut major mobility disability by 18% (HR
 * 0.82); exercise with strength and balance work cut falls by about a third (Sherrington 2019); low grip
 * strength goes with about 1.8× the risk of losing function (Rijk 2016). "Once a week" is an interpolation.
 */
export const HEALTH_HR: { strength: Record<HabitValue<'strength'>, number> } = {
  strength: { none: 1, some: 0.9, regular: 0.82 },
};

/** Years earlier (+) or later (−) than average that health tends to decline, from habits. */
export function healthShift(p: ModelInput) {
  const only = p.strength ? HEALTH_HR.strength[p.strength] : 1;
  return (HEALTH_K * Math.log(hazardMultiplier(p)) + Math.log(only)) / GOMPERTZ_B;
}

/** Ages by which good health likely ends (quantiles follow the lifespan's), and the expected age. */
export type Healthspan = { mean: number; q25: number; med: number; q75: number };

/** Age someone at `age` likely stays in good health until, if they live to `to`. */
function healthyUntil(hp: HealthParams, age: number, to: number, shift: number) {
  let years = 0;
  for (let x = age; x < to - 1e-9; x += 1 / 12) {
    const step = Math.min(1 / 12, to - x);
    years += step * (1 - poorHealth(hp, x + step / 2 + shift));
  }
  return age + years;
}

export function healthspanWith(params: CountryParams, hp: HealthParams, age: number, multiplier: number, shift: number) {
  const life = survivalWith(params, age, multiplier);
  let S = 1;
  let healthy = 0;
  for (let x = age; x < 121 && S > 1e-4; x += 1 / 12) {
    const s = Math.exp((-baseHazard(params, x) * multiplier) / 12);
    healthy += ((S * (1 + s)) / 2 / 12) * (1 - poorHealth(hp, x + 1 / 24 + shift));
    S *= s;
  }
  const health: Healthspan = {
    mean: age + healthy,
    q25: healthyUntil(hp, age, life.q25, shift),
    med: healthyUntil(hp, age, life.med, shift),
    q75: healthyUntil(hp, age, life.q75, shift),
  };
  return { life, health };
}

/** Lifespan and healthy years for a person, by country, sex and habits. */
export function healthEstimate(p: ModelInput, t = Date.now()) {
  return healthspanWith(paramsFor(p.sex, p.country), healthParamsFor(p.sex, p.country), ageAt(p.dob, t), hazardMultiplier(p), healthShift(p));
}
