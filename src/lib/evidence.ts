/**
 * "What matters most": the ranked list on the Habits screen, condensed from docs/science.md.
 * Keep the two in step; numbers here are associations from population studies, not promises.
 */
export type Strength = 'strong' | 'moderate' | 'emerging';

export type Evidence = {
  key: string;
  title: string;
  strength: Strength;
  summary: string;
  detail: string;
  source: { label: string; url: string };
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
    source: { label: 'Li et al., Circulation 2018', url: 'https://www.heart.org/en/news/2018/05/03/americans-could-live-up-to-14-years-longer-by-doing-five-things' },
    inEstimate: true,
  },
  {
    key: 'moving',
    title: 'Moving more, staying fit',
    strength: 'strong',
    summary: 'Risk keeps falling up to 8–10k steps a day under 60, 6–8k over 60.',
    detail:
      'Across 15 cohorts (47,471 adults), more daily steps meant lower mortality up to those levels. Cardio fitness is one of the strongest predictors of survival, with no upper limit of benefit seen.',
    source: { label: 'Paluch et al., Lancet Public Health 2022', url: 'https://doaj.org/article/c3639c468b4348958202e52793ab979d' },
    inEstimate: true,
  },
  {
    key: 'relationships',
    title: 'Close relationships',
    strength: 'strong',
    summary: 'Isolation and loneliness are linked to about 26–32% higher risk of dying early, on par with smoking or obesity.',
    detail:
      'Across 70 studies (3.4 million people), social isolation, loneliness and living alone each raised the odds of early death by about a quarter to a third. An earlier review of 148 studies found strong ties went with about 1.5× the odds of survival. In an 85-year Harvard study, relationship satisfaction at 50 predicted health at 80 better than cholesterol.',
    source: { label: 'Holt-Lunstad et al., Perspectives on Psychological Science 2015', url: 'https://scholarsarchive.byu.edu/facpub/7516' },
    inEstimate: true,
  },
  {
    key: 'diet',
    title: 'What you eat',
    strength: 'strong',
    summary: 'More legumes, whole grains and nuts; less red and processed meat.',
    detail:
      'A lasting switch from a typical Western diet to an optimal one is linked to 10–13 more years if made at 20, about 8 at 60, and over 3 at 80. A modeling study: population averages, not individual forecasts.',
    source: { label: 'Fadnes et al., PLOS Medicine 2022', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8824353' },
    inEstimate: false,
  },
  {
    key: 'weight',
    title: 'Healthy weight and blood pressure',
    strength: 'strong',
    summary: 'Both drive heart disease, the top cause of death.',
    detail:
      'Healthy weight is one of the five habits that together were linked to 12–14 more years at age 50, and to about 8–11 more years free of cancer, heart disease and diabetes.',
    source: { label: 'Li et al., BMJ 2020', url: 'https://www.bmj.com/content/368/bmj.l6669' },
    inEstimate: true,
  },
  {
    key: 'strength',
    title: 'Strength training',
    strength: 'moderate',
    summary: '30–60 minutes a week is linked to 10–17% lower mortality.',
    detail: 'On top of, not instead of, aerobic exercise. Benefits beyond about an hour a week are unclear.',
    source: { label: 'Momma et al., Br J Sports Med 2022', url: 'https://bjsm.bmj.com/content/56/13/755' },
    inEstimate: false,
  },
  {
    key: 'purpose',
    title: 'A sense of purpose',
    strength: 'moderate',
    summary: 'Linked to about 17% lower mortality and fewer heart attacks and strokes.',
    detail: 'Across 10 studies (136,265 people) in the US and Japan, where it is called ikigai: "a life worth living". Optimism shows a similar pattern.',
    source: { label: 'Cohen et al., Psychosomatic Medicine 2016', url: 'https://eurekalert.org/news-releases/529471' },
    inEstimate: false,
  },
  {
    key: 'sleep',
    title: 'Sleeping 7–8 hours',
    strength: 'moderate',
    summary: 'Under about 6 hours is linked to 12% higher mortality.',
    detail: 'Very long sleep shows higher risk too, but that is mostly a sign of illness rather than a cause.',
    source: { label: 'Cappuccio et al., Sleep 2010', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2864873/' },
    inEstimate: true,
  },
  {
    key: 'alcohol',
    title: 'Drinking little',
    strength: 'moderate',
    summary: 'Light drinking does not protect; risk rises from about 2 drinks a day for women, 3 for men.',
    detail: 'A meta-analysis of 107 cohorts (4.8 million people) found no lower mortality for light drinkers than for lifelong non-drinkers.',
    source: { label: 'Zhao et al., JAMA Network Open 2023', url: 'https://www.healio.com/news/primary-care/20230405/metaanalysis-alcohol-consumption-does-not-lower-allcause-mortality-risk' },
    inEstimate: true,
  },
  {
    key: 'helping',
    title: 'Helping others',
    strength: 'moderate',
    summary: 'Volunteering later in life is linked to 24% lower mortality.',
    detail: 'After adjusting for health, across 14 studies of adults 55 and older.',
    source: { label: 'Okun et al., Psychology and Aging 2013', url: 'https://keep.lib.asu.edu/items/129666' },
    inEstimate: false,
  },
  {
    key: 'scrolling',
    title: 'Less scrolling, more people',
    strength: 'emerging',
    summary: 'Cutting social media in experiments meant more time with family and friends, and less loneliness.',
    detail:
      'Deactivating Facebook for 4 weeks raised well-being and offline time with friends and family. Limiting social media to about 30 minutes a day for 3 weeks lowered loneliness and depression.',
    source: { label: 'Allcott et al., American Economic Review 2020', url: 'https://www.aeaweb.org/doi/10.1257/aer.20190658' },
    inEstimate: false,
  },
];

/** Behavior findings used in copy (see docs/nudges.md), not ranked as health factors. */
export const REACHING_OUT = {
  claim: 'People appreciate being reached out to more than we expect, especially after a while.',
  source: { label: 'Liu et al., J Pers Soc Psychol 2023', url: 'https://www.apa.org/news/press/releases/2022/07/friends-enjoy-being-reached' },
};

/** If-then plans (docs/nudges.md §1a). */
export const PLANS = {
  claim: 'Deciding when and where you will do something, as an if-then, makes following through much more likely (94 studies).',
  source: {
    label: 'Gollwitzer & Sheeran, Adv Exp Soc Psychol 2006',
    url: 'https://www.socmot.uni-konstanz.de/publications/implementation-intentions-and-goal-achievement-meta-analysis-effects-and-processes',
  },
};

/** Fresh starts (docs/nudges.md §1d). */
export const FRESH_START = {
  claim: 'People are more likely to start on a goal at a new week, a new month or a birthday: a fresh start.',
  source: { label: 'Dai, Milkman & Riis, Management Science 2014', url: 'https://faculty.wharton.upenn.edu/wp-content/uploads/2014/06/Dai_Fresh_Start_2014_Mgmt_Sci.pdf' },
};

/** Welcome-backs (docs/nudges.md §1e). */
export const COMING_BACK = {
  claim: 'In the largest test of exercise nudges (61,293 people), what helped most was rewarding a return after a missed workout.',
  source: { label: 'Milkman et al., Nature 2021', url: 'https://authors.library.caltech.edu/records/mys88-cc756' },
};

/** Personal numbers, like "lung age" (docs/nudges.md §1k). */
export const PERSONAL_NUMBERS = {
  claim: 'Seeing your own numbers can help: smokers told their "lung age" were about twice as likely to quit within a year (13.6% vs 6.4%).',
  source: { label: 'Parkes et al., BMJ 2008', url: 'https://www.bmj.com/content/336/7644/598' },
};

/** Short walks after meals (docs/nudges.md §1j). */
export const WALK_AFTER_MEALS = {
  claim: 'A few minutes of light walking after a meal lowered blood sugar by about 17% compared with sitting.',
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
};

export function evidenceFor(key: string): Evidence | undefined {
  const k = EVIDENCE_FOR[key] ?? key;
  return WHAT_MATTERS.find((e) => e.key === k);
}

export const HOW_IT_WORKS = [
  'Everyone’s yearly risk of dying rises with age, roughly doubling every 8 years. We start from that curve for your sex, an approximation of US life tables.',
  'Your habits multiply that risk: smoking ×2.2, exercising 3+ times a week ×0.85, under 6 hours of sleep ×1.15, rarely seeing people you are close to ×1.29, and so on.',
  'We follow that risk month by month from your age today. The age by which half of people like you have died is your median; the 25% and 75% marks give your range.',
  'Rule of thumb: years ≈ ln(risk multiplier) ÷ 0.085. That is why doubling your risk costs about 8 years, and why quitting smoking can give back about 9.',
  'Several changes together add less than their sum, and we cap the total at 14 years, the largest all-habits difference found in a major US study.',
  'These are associations from population studies, not causes, and not medical advice.',
];
