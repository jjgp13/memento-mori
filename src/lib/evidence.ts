/**
 * "What matters most": the ranked list on the Habits screen, condensed from docs/science.md.
 * Keep the two in step; numbers here are associations from population studies, not promises.
 * Every source comes from the catalog in src/lib/sources.ts via cite(), so the Sources screen lists it.
 */
import { cite, type Source } from '@/lib/sources';

export type Strength = 'strong' | 'moderate' | 'emerging';

export type Evidence = {
  key: string;
  title: string;
  strength: Strength;
  summary: string;
  detail: string;
  source: Source;
  /** Other studies behind claims in `detail`. */
  also?: Source[];
  /** Already part of this app's estimate (vs. shown for direction only, for now). */
  inEstimate: boolean;
};

export const WHAT_MATTERS: Evidence[] = [
  {
    key: 'smoking',
    title: 'Not smoking',
    strength: 'strong',
    summary: 'The largest single lever. Quitting at any age helps.',
    detail: 'Smoking roughly doubles the yearly risk of dying (×2.2 in this app). After quitting it falls toward ×1.3.',
    source: cite('li2018'),
    inEstimate: true,
  },
  {
    key: 'moving',
    title: 'Moving more, staying fit',
    strength: 'strong',
    summary: 'Risk keeps falling up to 8–10k steps a day under 60, 6–8k over 60.',
    detail:
      'Across 15 cohorts (47,471 adults), more daily steps meant lower mortality up to those levels. Cardio fitness is one of the strongest predictors of survival, with no upper limit of benefit seen.',
    source: cite('paluch2022'),
    also: [cite('mandsager2018')],
    inEstimate: true,
  },
  {
    key: 'relationships',
    title: 'Close relationships',
    strength: 'strong',
    summary: 'Isolation and loneliness are linked to about 26–32% higher risk of dying early, on par with smoking or obesity.',
    detail:
      'Across 70 studies (3.4 million people), social isolation, loneliness and living alone each raised the odds of early death by about a quarter to a third. An earlier review of 148 studies found strong ties went with about 1.5× the odds of survival. In an 85-year Harvard study, relationship satisfaction at 50 predicted health at 80 better than cholesterol.',
    source: cite('holtLunstad2015'),
    also: [cite('holtLunstad2010'), cite('waldinger2016')],
    inEstimate: true,
  },
  {
    key: 'diet',
    title: 'What you eat',
    strength: 'strong',
    summary: 'More legumes, whole grains and nuts; less red and processed meat.',
    detail:
      'A lasting switch from a typical Western diet to an optimal one is linked to 10–13 more years if made at 20, about 8 at 60, and over 3 at 80. A modeling study: population averages, not individual forecasts.',
    source: cite('fadnes2022'),
    inEstimate: false,
  },
  {
    key: 'weight',
    title: 'Healthy weight and blood pressure',
    strength: 'strong',
    summary: 'Both drive heart disease, the top cause of death.',
    detail:
      'Healthy weight is one of the five habits that together were linked to 12–14 more years at age 50, and to about 8–11 more years free of cancer, heart disease and diabetes.',
    source: cite('li2020'),
    inEstimate: true,
  },
  {
    key: 'strength',
    title: 'Strength training',
    strength: 'moderate',
    summary: '30–60 minutes a week is linked to 10–17% lower mortality.',
    detail: 'On top of, not instead of, aerobic exercise. Benefits beyond about an hour a week are unclear.',
    source: cite('momma2022'),
    inEstimate: false,
  },
  {
    key: 'purpose',
    title: 'A sense of purpose',
    strength: 'moderate',
    summary: 'Linked to about 17% lower mortality and fewer heart attacks and strokes.',
    detail: 'Across 10 studies (136,265 people) in the US and Japan, where it is called ikigai: "a life worth living". Optimism shows a similar pattern.',
    source: cite('cohen2016'),
    also: [cite('lee2019')],
    inEstimate: false,
  },
  {
    key: 'sleep',
    title: 'Sleeping 7–8 hours',
    strength: 'moderate',
    summary: 'Under about 6 hours is linked to 12% higher mortality.',
    detail: 'Very long sleep shows higher risk too, but that is mostly a sign of illness rather than a cause.',
    source: cite('cappuccio2010'),
    inEstimate: true,
  },
  {
    key: 'alcohol',
    title: 'Drinking little',
    strength: 'moderate',
    summary: 'Light drinking does not protect; risk rises from about 2 drinks a day for women, 3 for men.',
    detail: 'A meta-analysis of 107 cohorts (4.8 million people) found no lower mortality for light drinkers than for lifelong non-drinkers.',
    source: cite('zhao2023'),
    inEstimate: true,
  },
  {
    key: 'helping',
    title: 'Helping others',
    strength: 'moderate',
    summary: 'Volunteering later in life is linked to 24% lower mortality.',
    detail: 'After adjusting for health, across 14 studies of adults 55 and older.',
    source: cite('okun2013'),
    inEstimate: false,
  },
  {
    key: 'scrolling',
    title: 'Less scrolling, more people',
    strength: 'emerging',
    summary: 'Cutting social media in experiments meant more time with family and friends, and less loneliness.',
    detail:
      'Deactivating Facebook for 4 weeks raised well-being and offline time with friends and family. Limiting social media to about 30 minutes a day for 3 weeks lowered loneliness and depression.',
    source: cite('allcott2020'),
    also: [cite('hunt2018')],
    inEstimate: false,
  },
];

/** Where the baseline comes from: each country's life table (src/lib/country-tables.ts). */
export const LIFE_TABLES = {
  claim: 'Life tables for 237 countries and areas, by sex, estimates for 2023.',
  source: cite('wpp2024'),
};

/** The cap on combined gains (MAX_TOTAL_GAIN in src/lib/habit-impact.ts). */
export const GAIN_CAP = {
  claim: '14 years: the largest difference between people with all five healthy habits and none, in two large US cohorts.',
  source: cite('li2018'),
};

/** The model's shape: Gompertz's exponential rise with age, plus Makeham's constant term. */
export const MODEL_SHAPE = [cite('gompertz1825'), cite('makeham1860')];

/** Typical pet lifespans (PET_LIFESPAN in src/lib/loves.ts). */
export const PET_LIFESPANS = {
  dog: { claim: 'Dogs in the UK: a median of about 12 to 12.5 years.', sources: [cite('mcmillan2024'), cite('oneill2013')] },
  cat: { claim: 'Cats in England: a median of about 14 years.', sources: [cite('oneill2015')] },
};

/** The phone question starts at 4 hours a day, near common estimates for US adults (they vary widely). */
export const PHONE_TIME = { claim: 'US adults spend roughly 4–5 hours a day on their phones, by secondary estimates.', source: cite('phoneTime2025') };

/** Behavior findings used in copy (see docs/nudges.md), not ranked as health factors. */
export const REACHING_OUT = {
  claim: 'People appreciate being reached out to more than we expect, especially after a while.',
  source: cite('liu2023'),
};

/** If-then plans (docs/nudges.md §1a). */
export const PLANS = {
  claim: 'Deciding when and where you will do something, as an if-then, makes following through much more likely (94 studies).',
  source: cite('gollwitzer2006'),
};

/** Fresh starts (docs/nudges.md §1d). */
export const FRESH_START = {
  claim: 'People are more likely to start on a goal at a new week, a new month or a birthday: a fresh start.',
  source: cite('dai2014'),
};

/** Welcome-backs (docs/nudges.md §1e). */
export const COMING_BACK = {
  claim: 'In the largest test of exercise nudges (61,293 people), what helped most was rewarding a return after a missed workout.',
  source: cite('milkman2021'),
};

/** Personal numbers, like "lung age" (docs/nudges.md §1k). */
export const PERSONAL_NUMBERS = {
  claim: 'Seeing your own numbers can help: smokers told their "lung age" were about twice as likely to quit within a year (13.6% vs 6.4%).',
  source: cite('parkes2008'),
};

/** Short walks after meals (docs/nudges.md §1j). */
export const WALK_AFTER_MEALS = {
  claim: 'A few minutes of light walking after a meal lowered blood sugar by about 17% compared with sitting.',
  source: cite('buffey2022'),
};

/** Which evidence backs each habit, lever or claim, so every number in the app can link to its source. */
const EVIDENCE_FOR: Record<string, string> = {
  smoke: 'smoking',
  exercise: 'moving',
  steps: 'moving',
  bmi: 'weight',
  alcohol: 'alcohol',
  sleep: 'sleep',
  connection: 'relationships',
  phone: 'scrolling',
};

export function evidenceFor(key: string): Evidence | undefined {
  const k = EVIDENCE_FOR[key] ?? key;
  return WHAT_MATTERS.find((e) => e.key === k);
}

export const HOW_IT_WORKS = [
  'Everyone’s yearly risk of dying rises with age, roughly doubling every 7 years. We start from that curve for your sex in your country, fitted to its UN life table (World Population Prospects 2024, deaths in 2023). Without a country, we use an approximation of US tables.',
  'Your habits multiply that risk: smoking ×2.2, exercising 3+ times a week ×0.85, under 6 hours of sleep ×1.15, rarely seeing people you are close to ×1.29, and so on.',
  'We follow that risk month by month from your age today. The age by which half of people like you have died is your median; the 25% and 75% marks give your range.',
  'Rule of thumb: years ≈ ln(risk multiplier) ÷ 0.085. That is why doubling your risk costs about 8 years, and why quitting smoking can give back about 9.',
  'Several changes together add less than their sum, and we cap the total at 14 years, the largest all-habits difference found in a major US study.',
  'These are associations from population studies, not causes, and not medical advice.',
];
