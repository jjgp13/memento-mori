/**
 * "What matters most": the ranked list on the Habits screen, condensed from docs/science.md.
 * Keep the two in step; numbers here are associations from population studies, not promises.
 * Titles, summaries and details are in the language catalogs (src/i18n), under `evidence`.
 * Every source comes from the catalog in src/lib/sources.ts via cite(), so the Sources screen lists it.
 */
import { cite, type Source } from '@/lib/sources';

export type Strength = 'strong' | 'moderate' | 'emerging';

export type EvidenceKey =
  | 'smoking'
  | 'moving'
  | 'relationships'
  | 'diet'
  | 'weight'
  | 'strength'
  | 'purpose'
  | 'sleep'
  | 'alcohol'
  | 'helping'
  | 'scrolling'
  | 'healthyHabits'
  | 'falls'
  | 'mobility'
  | 'grip';

export type Evidence = {
  key: EvidenceKey;
  strength: Strength;
  source: Source;
  /** Other studies behind claims in the catalog's `detail`. */
  also?: Source[];
  /** Already part of this app's estimate (vs. shown for direction only, for now). */
  inEstimate: boolean;
};

export const WHAT_MATTERS: Evidence[] = [
  {
    key: 'smoking',
    strength: 'strong',
    source: cite('li2018'),
    inEstimate: true,
  },
  {
    key: 'moving',
    strength: 'strong',
    source: cite('paluch2022'),
    also: [cite('mandsager2018')],
    inEstimate: true,
  },
  {
    key: 'relationships',
    strength: 'strong',
    source: cite('holtLunstad2015'),
    also: [cite('holtLunstad2010'), cite('waldinger2016')],
    inEstimate: true,
  },
  {
    key: 'diet',
    strength: 'strong',
    source: cite('fadnes2022'),
    inEstimate: false,
  },
  {
    key: 'weight',
    strength: 'strong',
    source: cite('li2020'),
    inEstimate: true,
  },
  {
    key: 'strength',
    strength: 'moderate',
    source: cite('momma2022'),
    inEstimate: true,
  },
  {
    key: 'purpose',
    strength: 'moderate',
    source: cite('cohen2016'),
    also: [cite('lee2019')],
    inEstimate: false,
  },
  {
    key: 'sleep',
    strength: 'moderate',
    source: cite('cappuccio2010'),
    inEstimate: true,
  },
  {
    key: 'alcohol',
    strength: 'moderate',
    source: cite('zhao2023'),
    inEstimate: true,
  },
  {
    key: 'helping',
    strength: 'moderate',
    source: cite('okun2013'),
    inEstimate: false,
  },
  {
    key: 'scrolling',
    strength: 'emerging',
    source: cite('allcott2020'),
    also: [cite('hunt2018')],
    inEstimate: false,
  },
];

/**
 * Staying strong and independent: how habits move healthy years (healthspan), on the Habits screen and behind the
 * healthy band on Life. Keep in step with docs/science.md §1. Text is in the catalogs, under `evidence`.
 */
export const HEALTHSPAN: Evidence[] = [
  {
    key: 'healthyHabits',
    strength: 'strong',
    source: { label: 'Li et al., BMJ 2020', url: 'https://www.bmj.com/content/368/bmj.l6669' },
    inEstimate: true,
  },
  {
    key: 'falls',
    strength: 'strong',
    source: { label: 'Sherrington et al., Cochrane 2019', url: 'https://bjsm.bmj.com/content/54/15/885' },
    inEstimate: false,
  },
  {
    key: 'mobility',
    strength: 'moderate',
    source: { label: 'Pahor et al., JAMA 2014', url: 'https://pubmed.ncbi.nlm.nih.gov/24866862/' },
    inEstimate: true,
  },
  {
    key: 'grip',
    strength: 'moderate',
    source: { label: 'Rijk et al., Geriatr Gerontol Int 2016', url: 'https://pubmed.ncbi.nlm.nih.gov/26016893/' },
    inEstimate: false,
  },
];

/** Where healthy years start from: each country's healthy life expectancy (src/lib/health-tables.ts). */
export const HEALTHY_LIFE_TABLES = {
  source: { label: 'WHO Global Health Observatory', url: 'https://data.who.int/indicators/i/C64284D' },
};

/** Where the baseline comes from: each country's life table (src/lib/country-tables.ts). */
export const LIFE_TABLES = {
  /** The claim itself is in the language catalogs, under `claims`. */
  source: cite('wpp2024'),
};

/** The cap on combined gains (MAX_TOTAL_GAIN in src/lib/habit-impact.ts); the claim is `t.methods.capClaim`. */
export const GAIN_CAP = { source: cite('li2018') };

/** The model's shape: Gompertz's exponential rise with age, plus Makeham's constant term. */
export const MODEL_SHAPE = [cite('gompertz1825'), cite('makeham1860')];

/** Typical pet lifespans (PET_LIFESPAN in src/lib/loves.ts). */
export const PET_LIFESPANS = [cite('mcmillan2024'), cite('oneill2013'), cite('oneill2015')];

/** The phone question starts at 4 hours a day, near common (widely varying) estimates for US adults. */
export const PHONE_TIME = { source: cite('phoneTime2025') };

/** Behavior findings used in copy (see docs/nudges.md), not ranked as health factors. */
export const REACHING_OUT = {
  /** The claim itself is `t.reach.claim`. */
  source: cite('liu2023'),
};

/** If-then plans (docs/nudges.md §1a). */
export const PLANS = {
  /** The claim itself is in the language catalogs, under `claims`. */
  source: cite('gollwitzer2006'),
};

/** Fresh starts (docs/nudges.md §1d). */
export const FRESH_START = {
  /** The claim itself is in the language catalogs, under `claims`. */
  source: cite('dai2014'),
};

/** Welcome-backs (docs/nudges.md §1e). */
export const COMING_BACK = {
  /** The claim itself is in the language catalogs, under `claims`. */
  source: cite('milkman2021'),
};

/** Personal numbers, like "lung age" (docs/nudges.md §1k). */
export const PERSONAL_NUMBERS = {
  /** The claim itself is in the language catalogs, under `claims`. */
  source: cite('parkes2008'),
};

/** Short walks after meals (docs/nudges.md §1j). */
export const WALK_AFTER_MEALS = {
  /** The claim itself is in the language catalogs, under `claims`. */
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
  healthy: 'healthyHabits',
};

export function evidenceFor(key: string): Evidence | undefined {
  const k = EVIDENCE_FOR[key] ?? key;
  return WHAT_MATTERS.find((e) => e.key === k) ?? HEALTHSPAN.find((e) => e.key === k);
}
