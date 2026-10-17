/**
 * "What matters most": the ranked list on the Habits screen, condensed from docs/science.md.
 * Keep the two in step; numbers here are associations from population studies, not promises.
 * Titles, summaries and details are in the language catalogs (src/i18n), under `evidence`.
 */
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
  source: { label: string; url: string };
  /** Already part of this app's estimate (vs. shown for direction only, for now). */
  inEstimate: boolean;
};

export const WHAT_MATTERS: Evidence[] = [
  {
    key: 'smoking',
    strength: 'strong',
    source: { label: 'Li et al., Circulation 2018', url: 'https://www.heart.org/en/news/2018/05/03/americans-could-live-up-to-14-years-longer-by-doing-five-things' },
    inEstimate: true,
  },
  {
    key: 'moving',
    strength: 'strong',
    source: { label: 'Paluch et al., Lancet Public Health 2022', url: 'https://doaj.org/article/c3639c468b4348958202e52793ab979d' },
    inEstimate: true,
  },
  {
    key: 'relationships',
    strength: 'strong',
    source: { label: 'Holt-Lunstad et al., Perspectives on Psychological Science 2015', url: 'https://scholarsarchive.byu.edu/facpub/7516' },
    inEstimate: true,
  },
  {
    key: 'diet',
    strength: 'strong',
    source: { label: 'Fadnes et al., PLOS Medicine 2022', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8824353' },
    inEstimate: false,
  },
  {
    key: 'weight',
    strength: 'strong',
    source: { label: 'Li et al., BMJ 2020', url: 'https://www.bmj.com/content/368/bmj.l6669' },
    inEstimate: true,
  },
  {
    key: 'strength',
    strength: 'moderate',
    source: { label: 'Momma et al., Br J Sports Med 2022', url: 'https://bjsm.bmj.com/content/56/13/755' },
    inEstimate: true,
  },
  {
    key: 'purpose',
    strength: 'moderate',
    source: { label: 'Cohen et al., Psychosomatic Medicine 2016', url: 'https://eurekalert.org/news-releases/529471' },
    inEstimate: false,
  },
  {
    key: 'sleep',
    strength: 'moderate',
    source: { label: 'Cappuccio et al., Sleep 2010', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2864873/' },
    inEstimate: true,
  },
  {
    key: 'alcohol',
    strength: 'moderate',
    source: { label: 'Zhao et al., JAMA Network Open 2023', url: 'https://www.healio.com/news/primary-care/20230405/metaanalysis-alcohol-consumption-does-not-lower-allcause-mortality-risk' },
    inEstimate: true,
  },
  {
    key: 'helping',
    strength: 'moderate',
    source: { label: 'Okun et al., Psychology and Aging 2013', url: 'https://keep.lib.asu.edu/items/129666' },
    inEstimate: false,
  },
  {
    key: 'scrolling',
    strength: 'emerging',
    source: { label: 'Allcott et al., American Economic Review 2020', url: 'https://www.aeaweb.org/doi/10.1257/aer.20190658' },
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
  source: { label: 'UN World Population Prospects 2024', url: 'https://population.un.org/wpp/' },
};

/** Behavior findings used in copy (see docs/nudges.md), not ranked as health factors. */
export const REACHING_OUT = {
  /** The claim itself is `t.reach.claim`. */
  source: { label: 'Liu et al., J Pers Soc Psychol 2023', url: 'https://www.apa.org/news/press/releases/2022/07/friends-enjoy-being-reached' },
};

/** If-then plans (docs/nudges.md §1a). */
export const PLANS = {
  /** The claim itself is in the language catalogs, under `claims`. */
  source: {
    label: 'Gollwitzer & Sheeran, Adv Exp Soc Psychol 2006',
    url: 'https://www.socmot.uni-konstanz.de/publications/implementation-intentions-and-goal-achievement-meta-analysis-effects-and-processes',
  },
};

/** Fresh starts (docs/nudges.md §1d). */
export const FRESH_START = {
  /** The claim itself is in the language catalogs, under `claims`. */
  source: { label: 'Dai, Milkman & Riis, Management Science 2014', url: 'https://faculty.wharton.upenn.edu/wp-content/uploads/2014/06/Dai_Fresh_Start_2014_Mgmt_Sci.pdf' },
};

/** Welcome-backs (docs/nudges.md §1e). */
export const COMING_BACK = {
  /** The claim itself is in the language catalogs, under `claims`. */
  source: { label: 'Milkman et al., Nature 2021', url: 'https://authors.library.caltech.edu/records/mys88-cc756' },
};

/** Personal numbers, like "lung age" (docs/nudges.md §1k). */
export const PERSONAL_NUMBERS = {
  /** The claim itself is in the language catalogs, under `claims`. */
  source: { label: 'Parkes et al., BMJ 2008', url: 'https://www.bmj.com/content/336/7644/598' },
};

/** Short walks after meals (docs/nudges.md §1j). */
export const WALK_AFTER_MEALS = {
  /** The claim itself is in the language catalogs, under `claims`. */
  source: { label: 'Buffey et al., Sports Med 2022', url: 'https://ktvz.com/health/cnn-health/2023/09/08/just-2-minutes-of-walking-after-eating-can-help-blood-sugar-study-says-2/' },
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
