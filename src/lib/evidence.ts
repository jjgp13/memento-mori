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
  | 'scrolling';

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
    inEstimate: false,
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

/** Behavior findings used in copy (see docs/nudges.md), not ranked as health factors. */
export const REACHING_OUT = {
  /** The claim itself is `t.reach.claim`. */
  source: { label: 'Liu et al., J Pers Soc Psychol 2023', url: 'https://www.apa.org/news/press/releases/2022/07/friends-enjoy-being-reached' },
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
