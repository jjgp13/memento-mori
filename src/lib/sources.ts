/**
 * Every study and data set the app cites, in one place. Claims link here through cite() (see
 * src/lib/evidence.ts), and the Sources screen and docs/sources.md are generated from this list, so
 * the in-app bibliography can't drift from what the screens actually cite.
 * Keep it in step with the Sources lists in docs/science.md and docs/nudges.md.
 *
 * Pure data with relative imports only: scripts/write-docs.mts reads it with plain Node.
 */

export type Topic = 'model' | 'habits' | 'direction' | 'behavior' | 'time' | 'loves';

export const TOPICS: { key: Topic; title: string; blurb: string }[] = [
  { key: 'model', title: 'How the estimate is built', blurb: 'The mortality curve, the life tables it is fitted to, and the cap on combined gains.' },
  { key: 'habits', title: 'Habits in your estimate', blurb: 'Where each habit’s risk multiplier comes from.' },
  {
    key: 'direction',
    title: 'Shown for direction, not in the estimate',
    blurb: 'Findings on the Habits screen that point the way but are not yet part of the numbers.',
  },
  { key: 'behavior', title: 'Plans, prompts and reaching out', blurb: 'Behavior science behind plans, fresh starts and welcome-backs.' },
  { key: 'time', title: 'Where the hours go', blurb: 'Phone time and what taking some back can do.' },
  { key: 'loves', title: 'Loves: “N more times”', blurb: 'Typical lifespans used to count time with pets.' },
];

export type Study = {
  /** Authors as published, e.g. "Li Y, Pan A, Wang DD, et al." */
  authors: string;
  title: string;
  /** Journal or publisher, written out. */
  journal: string;
  year: number;
  /** Volume, issue and pages or article number, when known. */
  details?: string;
  url: string;
  /** Short author form for in-line labels: "Li et al.", "Gollwitzer & Sheeran". */
  who: string;
  /** Short journal name for in-line labels; defaults to `journal`. */
  journalShort?: string;
  /** Replaces the "who, journal year" label (e.g. for data sets). */
  label?: string;
  topic: Topic;
  /** Where the app leans on it, in a few words. */
  usedFor: string;
};

export const STUDIES = {
  gompertz1825: {
    authors: 'Gompertz B.',
    title:
      'On the nature of the function expressive of the law of human mortality, and on a new mode of determining the value of life contingencies',
    journal: 'Philosophical Transactions of the Royal Society of London',
    journalShort: 'Phil Trans R Soc',
    year: 1825,
    details: '115:513–583',
    url: 'https://doi.org/10.1098/rstl.1825.0026',
    who: 'Gompertz',
    topic: 'model',
    usedFor: 'The shape of the curve: yearly risk of dying rises exponentially with age.',
  },
  makeham1860: {
    authors: 'Makeham WM.',
    title: 'On the law of mortality and the construction of annuity tables',
    journal: 'Journal of the Institute of Actuaries',
    journalShort: 'J Inst Actuaries',
    year: 1860,
    details: '8(6)',
    url: 'https://doi.org/10.1017/S204616580000126X',
    who: 'Makeham',
    topic: 'model',
    usedFor: 'The constant, age-independent part of the risk (the “A” term).',
  },
  wpp2024: {
    authors: 'United Nations, Department of Economic and Social Affairs, Population Division',
    title: 'World Population Prospects 2024: single-age life tables by sex, estimates for 2023',
    journal: 'United Nations (CC BY 3.0 IGO)',
    year: 2024,
    url: 'https://population.un.org/wpp/',
    who: 'UN',
    label: 'UN World Population Prospects 2024',
    topic: 'model',
    usedFor: 'Your baseline: the life table for your country and sex.',
  },
  li2018: {
    authors: 'Li Y, Pan A, Wang DD, et al.',
    title: 'Impact of healthy lifestyle factors on life expectancies in the US population',
    journal: 'Circulation',
    year: 2018,
    details: '138(4):345–355',
    url: 'https://www.heart.org/en/news/2018/05/03/americans-could-live-up-to-14-years-longer-by-doing-five-things',
    who: 'Li et al.',
    topic: 'model',
    usedFor: 'The 14-year cap on combined gains; not smoking as the largest lever.',
  },

  holtLunstad2015: {
    authors: 'Holt-Lunstad J, Smith TB, Baker M, Harris T, Stephenson D.',
    title: 'Loneliness and social isolation as risk factors for mortality: a meta-analytic review',
    journal: 'Perspectives on Psychological Science',
    year: 2015,
    details: '10(2):227–237',
    url: 'https://scholarsarchive.byu.edu/facpub/7516',
    who: 'Holt-Lunstad et al.',
    topic: 'habits',
    usedFor: 'Connection: rarely seeing close people ×1.29.',
  },
  holtLunstad2010: {
    authors: 'Holt-Lunstad J, Smith TB, Layton JB.',
    title: 'Social relationships and mortality risk: a meta-analytic review',
    journal: 'PLoS Medicine',
    year: 2010,
    details: '7(7):e1000316',
    url: 'https://doaj.org/article/c9833ba608474b048444b92ae7ee48ad',
    who: 'Holt-Lunstad et al.',
    topic: 'habits',
    usedFor: 'Strong social ties and about 1.5× the odds of survival (148 studies).',
  },
  paluch2022: {
    authors: 'Paluch AE, Bajpai S, Bassett DR, et al.',
    title: 'Daily steps and all-cause mortality: a meta-analysis of 15 international cohorts',
    journal: 'Lancet Public Health',
    year: 2022,
    details: '7(3):e219–e228',
    url: 'https://doaj.org/article/c3639c468b4348958202e52793ab979d',
    who: 'Paluch et al.',
    topic: 'habits',
    usedFor: 'Exercise and daily steps.',
  },
  mandsager2018: {
    authors: 'Mandsager K, Harb S, Cremer P, Phelan D, Nissen SE, Jaber W.',
    title: 'Association of cardiorespiratory fitness with long-term mortality among adults undergoing exercise treadmill testing',
    journal: 'JAMA Network Open',
    year: 2018,
    details: '1(6):e183605',
    url: 'https://newsroom.clevelandclinic.org/2018/10/19/cleveland-clinic-research-shows-better-cardiorespiratory-fitness-correlates-to-a-longer-life/',
    who: 'Mandsager et al.',
    topic: 'habits',
    usedFor: 'Cardio fitness as one of the strongest predictors of survival.',
  },
  li2020: {
    authors: 'Li Y, Schoufour J, Wang DD, et al.',
    title: 'Healthy lifestyle and life expectancy free of cancer, cardiovascular disease, and type 2 diabetes: prospective cohort study',
    journal: 'BMJ',
    year: 2020,
    details: '368:l6669',
    url: 'https://www.bmj.com/content/368/bmj.l6669',
    who: 'Li et al.',
    topic: 'habits',
    usedFor: 'Healthy weight, and years free of chronic disease.',
  },
  cappuccio2010: {
    authors: 'Cappuccio FP, D’Elia L, Strazzullo P, Miller MA.',
    title: 'Sleep duration and all-cause mortality: a systematic review and meta-analysis of prospective studies',
    journal: 'Sleep',
    year: 2010,
    details: '33(5):585–592',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2864873/',
    who: 'Cappuccio et al.',
    topic: 'habits',
    usedFor: 'Sleep: under 6 hours ×1.15.',
  },
  zhao2023: {
    authors: 'Zhao J, Stockwell T, Naimi T, Churchill S, Clay J, Sherk A.',
    title: 'Association between daily alcohol intake and risk of all-cause mortality: a systematic review and meta-analyses',
    journal: 'JAMA Network Open',
    year: 2023,
    details: '6(3):e236185',
    url: 'https://www.healio.com/news/primary-care/20230405/metaanalysis-alcohol-consumption-does-not-lower-allcause-mortality-risk',
    who: 'Zhao et al.',
    topic: 'habits',
    usedFor: 'Alcohol: heavy drinking ×1.4; light drinking not protective.',
  },

  fadnes2022: {
    authors: 'Fadnes LT, Økland JM, Haaland ØA, Johansson KA.',
    title: 'Estimating impact of food choices on life expectancy: a modeling study',
    journal: 'PLOS Medicine',
    year: 2022,
    details: '19(2):e1003889',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8824353',
    who: 'Fadnes et al.',
    topic: 'direction',
    usedFor: 'What you eat.',
  },
  momma2022: {
    authors: 'Momma H, Kawakami R, Honda T, Sawada SS.',
    title:
      'Muscle-strengthening activities are associated with lower risk and mortality in major non-communicable diseases: a systematic review and meta-analysis of cohort studies',
    journal: 'British Journal of Sports Medicine',
    journalShort: 'Br J Sports Med',
    year: 2022,
    details: '56(13):755–763',
    url: 'https://bjsm.bmj.com/content/56/13/755',
    who: 'Momma et al.',
    topic: 'direction',
    usedFor: 'Strength training.',
  },
  cohen2016: {
    authors: 'Cohen R, Bavishi C, Rozanski A.',
    title: 'Purpose in life and its relationship to all-cause mortality and cardiovascular events: a meta-analysis',
    journal: 'Psychosomatic Medicine',
    year: 2016,
    details: '78(2):122–133',
    url: 'https://eurekalert.org/news-releases/529471',
    who: 'Cohen et al.',
    topic: 'direction',
    usedFor: 'A sense of purpose.',
  },
  lee2019: {
    authors: 'Lee LO, James P, Zevon ES, et al.',
    title: 'Optimism is associated with exceptional longevity in 2 epidemiologic cohorts of men and women',
    journal: 'Proceedings of the National Academy of Sciences',
    journalShort: 'PNAS',
    year: 2019,
    details: '116(37):18357–18362',
    url: 'https://www.cnbc.com/2019/08/29/having-an-optimistic-outlook-could-help-you-live-years-longer-study.html',
    who: 'Lee et al.',
    topic: 'direction',
    usedFor: 'Optimism and reaching 85.',
  },
  okun2013: {
    authors: 'Okun MA, Yeung EW, Brown S.',
    title: 'Volunteering by older adults and risk of mortality: a meta-analysis',
    journal: 'Psychology and Aging',
    year: 2013,
    details: '28(2):564–577',
    url: 'https://keep.lib.asu.edu/items/129666',
    who: 'Okun et al.',
    topic: 'direction',
    usedFor: 'Helping others.',
  },
  waldinger2016: {
    authors: 'Waldinger RJ, Schulz MS (Harvard Study of Adult Development)',
    title: 'What one of the world’s longest studies tells us about happiness (summary of the 85-year study)',
    journal: 'World Economic Forum',
    year: 2016,
    url: 'https://weforum.org/agenda/2016/01/what-one-of-the-worlds-longest-studies-tells-us-about-happiness',
    who: 'Waldinger & Schulz',
    label: 'Harvard Study of Adult Development',
    topic: 'direction',
    usedFor: 'Relationship satisfaction at 50 and health at 80.',
  },

  allcott2020: {
    authors: 'Allcott H, Braghieri L, Eichmeyer S, Gentzkow M.',
    title: 'The welfare effects of social media',
    journal: 'American Economic Review',
    year: 2020,
    details: '110(3):629–676',
    url: 'https://www.aeaweb.org/doi/10.1257/aer.20190658',
    who: 'Allcott et al.',
    topic: 'time',
    usedFor: 'Less scrolling, more time with people.',
  },
  hunt2018: {
    authors: 'Hunt MG, Marx R, Lipson C, Young J.',
    title: 'No more FOMO: limiting social media decreases loneliness and depression',
    journal: 'Journal of Social and Clinical Psychology',
    journalShort: 'J Soc Clin Psychol',
    year: 2018,
    details: '37(10):751–768',
    url: 'https://techcrunch.com/2018/11/09/limiting-social-media-use-reduced-loneliness-and-depression-in-new-experiment',
    who: 'Hunt et al.',
    topic: 'time',
    usedFor: 'Limiting social media to 30 minutes a day.',
  },
  phoneTime2025: {
    authors: 'eMarketer, reported by Boston 25 News',
    title: 'Deep dive into Americans’ mobile habits (secondary estimates of daily smartphone time)',
    journal: 'Boston 25 News',
    year: 2025,
    url: 'https://www.boston25news.com/news/deep-dive-into-americans-mobile-habits-2025/UCZOPSUIZVJ57EK5YZ2BTPEYAE/',
    who: 'eMarketer',
    topic: 'time',
    usedFor: 'The 4-hour starting point for the phone question (estimates vary).',
  },

  liu2023: {
    authors: 'Liu PJ, Rim S, Min L, Min KE.',
    title: 'The surprise of reaching out: appreciated more than we think',
    journal: 'Journal of Personality and Social Psychology',
    journalShort: 'J Pers Soc Psychol',
    year: 2023,
    details: '124(4):754–771',
    url: 'https://www.apa.org/news/press/releases/2022/07/friends-enjoy-being-reached',
    who: 'Liu et al.',
    topic: 'behavior',
    usedFor: 'Reaching out to people.',
  },
  gollwitzer2006: {
    authors: 'Gollwitzer PM, Sheeran P.',
    title: 'Implementation intentions and goal achievement: a meta-analysis of effects and processes',
    journal: 'Advances in Experimental Social Psychology',
    journalShort: 'Adv Exp Soc Psychol',
    year: 2006,
    details: '38:69–119',
    url: 'https://www.socmot.uni-konstanz.de/publications/implementation-intentions-and-goal-achievement-meta-analysis-effects-and-processes',
    who: 'Gollwitzer & Sheeran',
    topic: 'behavior',
    usedFor: 'If-then plans.',
  },
  dai2014: {
    authors: 'Dai H, Milkman KL, Riis J.',
    title: 'The fresh start effect: temporal landmarks motivate aspirational behavior',
    journal: 'Management Science',
    year: 2014,
    details: '60(10):2563–2582',
    url: 'https://faculty.wharton.upenn.edu/wp-content/uploads/2014/06/Dai_Fresh_Start_2014_Mgmt_Sci.pdf',
    who: 'Dai, Milkman & Riis',
    topic: 'behavior',
    usedFor: 'Fresh starts: Mondays, the 1st, birthdays.',
  },
  milkman2021: {
    authors: 'Milkman KL, Gromet D, Ho H, et al.',
    title: 'Megastudies improve the impact of applied behavioural science',
    journal: 'Nature',
    year: 2021,
    details: '600:478–483',
    url: 'https://authors.library.caltech.edu/records/mys88-cc756',
    who: 'Milkman et al.',
    topic: 'behavior',
    usedFor: 'Welcome-backs after time away, instead of streaks.',
  },
  parkes2008: {
    authors: 'Parkes G, Greenhalgh T, Griffin M, Dent R.',
    title: 'Effect on smoking quit rate of telling patients their lung age: the Step2quit randomised controlled trial',
    journal: 'BMJ',
    year: 2008,
    details: '336(7644):598–600',
    url: 'https://www.bmj.com/content/336/7644/598',
    who: 'Parkes et al.',
    topic: 'behavior',
    usedFor: 'Showing people their own numbers.',
  },
  buffey2022: {
    authors: 'Buffey AJ, Herring MP, Langley CK, Donnelly AE, Carson BP.',
    title:
      'The acute effects of interrupting prolonged sitting time in adults with standing and light-intensity walking on biomarkers of cardiometabolic health in adults: a systematic review and meta-analysis',
    journal: 'Sports Medicine',
    journalShort: 'Sports Med',
    year: 2022,
    details: '52(8):1765–1787',
    url: 'https://ktvz.com/health/cnn-health/2023/09/08/just-2-minutes-of-walking-after-eating-can-help-blood-sugar-study-says-2/',
    who: 'Buffey et al.',
    topic: 'behavior',
    usedFor: 'Short walks after meals.',
  },

  oneill2013: {
    authors: 'O’Neill DG, Church DB, McGreevy PD, Thomson PC, Brodbelt DC.',
    title: 'Longevity and mortality of owned dogs in England',
    journal: 'The Veterinary Journal',
    journalShort: 'Vet J',
    year: 2013,
    details: '198(3):638–643',
    url: 'https://doi.org/10.1016/j.tvjl.2013.09.020',
    who: 'O’Neill et al.',
    topic: 'loves',
    usedFor: 'Dogs: median longevity about 12 years.',
  },
  mcmillan2024: {
    authors: 'McMillan KM, Bielby J, Williams CL, Upjohn MM, Casey RA, Christley RM.',
    title: 'Longevity of companion dog breeds: those at risk from early death',
    journal: 'Scientific Reports',
    journalShort: 'Sci Rep',
    year: 2024,
    details: '14:531',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10834484/',
    who: 'McMillan et al.',
    topic: 'loves',
    usedFor: 'Dogs: median life expectancy 12.5 years (584,734 UK dogs).',
  },
  oneill2015: {
    authors: 'O’Neill DG, Church DB, McGreevy PD, Thomson PC, Brodbelt DC.',
    title: 'Longevity and mortality of cats attending primary care veterinary practices in England',
    journal: 'Journal of Feline Medicine and Surgery',
    journalShort: 'J Feline Med Surg',
    year: 2015,
    details: '17(2):125–133',
    url: 'https://rvc-repository.worktribe.com/output/1402075',
    who: 'O’Neill et al.',
    topic: 'loves',
    usedFor: 'Cats: median longevity 14 years.',
  },
} as const satisfies Record<string, Study>;

export type StudyId = keyof typeof STUDIES;

/** What a SourceLink needs. */
export type Source = { label: string; url: string };

export const sourceLabel = (s: Study) => s.label ?? `${s.who}, ${s.journalShort ?? s.journal} ${s.year}`;

/** A study as an in-line source: "Li et al., Circulation 2018" plus its link. */
export function cite(id: StudyId): Source {
  const s: Study = STUDIES[id];
  return { label: sourceLabel(s), url: s.url };
}

/** Authors ending in a full stop, ready to precede the title. */
export const authorsLine = (s: Study) => (s.authors.endsWith('.') ? s.authors : `${s.authors}.`);

/** Full reference: "Li Y, Pan A, Wang DD, et al. Impact of … Circulation. 2018;138(4):345–355." */
export function reference(s: Study) {
  return `${authorsLine(s)} ${s.title}. ${s.journal}. ${s.year}${s.details ? `;${s.details}` : ''}.`;
}

/** The catalog grouped by topic, in TOPICS order. */
export function studiesByTopic() {
  const all = Object.entries(STUDIES) as [StudyId, Study][];
  return TOPICS.map((t) => ({ ...t, studies: all.filter(([, s]) => s.topic === t.key).map(([id, s]) => ({ id, ...s })) }));
}

/** Not studies, but quoted in the app: where the Stoic lines on the Today screen come from. */
export const QUOTE_SOURCES =
  'Marcus Aurelius (Meditations, tr. George Long, 1862), Seneca (Letters and On the Shortness of Life, tr. Richard M. Gummere, 1917–25, and others) and Epictetus (Enchiridion, tr. Thomas Wentworth Higginson, 1865). Public-domain translations, some lightly adapted.';
