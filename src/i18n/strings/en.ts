/**
 * English: the source catalog. Its shape is the `Strings` type every other language must match, so add a
 * string here first, then to each translation (the typecheck lists any that are missing).
 *
 * Functions take numbers already formatted with fmt()/dec1() (from @/i18n/format) as strings, and raw
 * numbers only where the wording depends on them (plurals). Rich results mark the numbers set in bronze.
 */
import { b, s, type Rich } from '@/i18n/rich';
import type { Per } from '@/lib/loves';
import type { StudyId, Topic } from '@/lib/sources';

type Unit = 'visits' | 'days' | 'times';

const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);

/** "a, b and c" */
const list = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs.at(-1)}`);

const PER: Record<Per, string> = { day: 'a day', week: 'a week', month: 'a month', year: 'a year' };

export const en = {
  common: {
    back: '← Back',
    close: 'Close',
    continue: 'Continue',
    skip: 'Skip',
    skipForNow: 'Skip for now',
    save: 'Save',
    done: 'Done',
    add: 'Add',
    remove: 'Remove',
    removeA11y: (name: string) => `Remove ${name}`,
    less: 'Less',
    more: 'More',
    you: 'You',
    source: 'Source',
    why: 'Why',
    theScience: 'The science',
    lifeTables: 'Life tables',
    sourceA11y: (prefix: string, label: string) => `${prefix}: ${label}, opens in browser`,
    tickingSound: 'Ticking sound',
    clockTicking: 'Clock ticking',
    hoursValue: (h: string) => `${h} h`,
    /** "+1.9 yrs" from an already signed number. */
    yrs: (signed: string) => `${signed} yrs`,
    years: (y: string) => `${y} years`,
    notAdvice:
      'Estimates come from population averages and broad risk ratios. They show direction and rough size, not a promise, and are not medical advice.',
    list,
  },

  tabs: { life: 'Life', habits: 'Habits', loves: 'Loves', today: 'Today' },

  language: {
    heading: 'LANGUAGE',
    note: 'Follows your device until you pick one.',
    a11y: 'Language',
  },

  date: {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    /** Row labels on the Year view. */
    monthInitials: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    /** Sunday first. */
    weekdayInitials: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    year: 'Year',
    month: 'Month',
    day: 'Day',
    decade: (d: number) => `${d}s`,
    /** Labels on the Today view's 24 hour circles. */
    hour: (h: number) => `${h % 12 || 12}${h < 12 ? 'a' : 'p'}`,
  },

  /** Habit questions and answers, keyed like HABITS in lib/model.ts. */
  habits: {
    smoke: {
      question: 'Do you smoke?',
      short: 'Smoking',
      why: 'The single biggest lever on this list.',
      options: { never: 'Never', former: 'I quit', current: 'Yes' },
    },
    exercise: {
      question: 'How often do you exercise?',
      short: 'Exercise',
      why: 'Brisk walking counts.',
      options: { none: 'Rarely', some: '1–2× a week', regular: '3+× a week' },
    },
    bmi: {
      question: 'Which describes your weight?',
      short: 'Weight',
      why: 'Body mass index ranges. Rough is fine.',
      options: { under: 'Underweight', normal: 'Healthy', over: 'Overweight', obese: 'Obese' },
    },
    alcohol: {
      question: 'How much do you drink?',
      short: 'Alcohol',
      why: 'Heavy means about 15 or more drinks a week.',
      options: { none: 'Little or none', moderate: 'Moderate', heavy: 'Heavy' },
    },
    sleep: {
      question: 'How much do you sleep?',
      short: 'Sleep',
      why: 'Most nights, not your best nights.',
      options: { short: 'Under 6 hours', ok: '6–9 hours' },
    },
    connection: {
      question: 'How often do you spend time with people you are close to?',
      short: 'Connection',
      why: 'In person or a real conversation. Close relationships are one of the strongest predictors of a long life.',
      options: { often: 'Every week', sometimes: 'A few times a month', rarely: 'Rarely; I often feel alone' },
    },
    strength: {
      question: 'Do you do strength training?',
      short: 'Strength',
      why: 'Weights, bands, or your own body weight: squats, push-ups, carrying heavy bags. It keeps you strong and steady later on.',
      options: { none: 'Rarely or never', some: 'About once a week', regular: 'Twice a week or more' },
    },
  },

  /** The single changes that would add time (lib/habit-impact.ts). */
  levers: {
    smoke: 'Quitting smoking',
    exercise: 'Exercising 3+ times a week',
    bmi: 'Reaching a healthy weight',
    alcohol: 'Drinking less',
    sleep: 'Sleeping 6–9 hours',
    connection: 'Seeing the people you love every week',
    steps: 'Walking 10,000 steps a day',
    strength: 'Strength training twice a week',
  },

  values: {
    family: 'Family',
    partner: 'My partner',
    friends: 'Friends',
    health: 'Health',
    craft: 'Work and craft',
    learning: 'Learning',
    creating: 'Creating',
    faith: 'Faith and spirit',
    nature: 'Nature',
    adventure: 'Adventure',
    service: 'Helping others',
    peace: 'Peace of mind',
  },

  onboarding: {
    welcomeEyebrow: 'Remember you will die',
    welcomeLede:
      'The Stoics kept death in mind so they would not waste their days. This app counts the time you likely have left, so today gets the weight it deserves, and points it at what you love.',
    welcomeNote: 'A few short questions, one at a time. Your answers stay on this device.',
    begin: 'Begin',
    step: {
      you: 'You',
      birth: 'Birth',
      place: 'Place',
      body: 'Body',
      habits: 'Habits',
      time: 'Your time',
      values: 'What matters',
      who: 'Who loves you',
      what: 'What you love',
    },
    nameQuestion: 'What should we call you?',
    nameA11y: 'First name',
    namePlaceholder: 'Your first name',
    dobQuestion: 'When were you born?',
    countryQuestion: 'Where do you live?',
    countryWhy:
      "Where you live shapes how long people live, by 30 years or more between countries. We start from your country's life tables.",
    countrySearch: 'Search countries',
    countrySearchAgain: 'Somewhere else? Search',
    countryNone: 'No country by that name in the UN tables.',
    sexQuestion: 'What was your sex at birth?',
    sexWhy: 'On average women outlive men by about five years.',
    sex: { m: 'Male', f: 'Female' },
    phoneQuestion: 'How many hours a day are you on your phone?',
    phoneWhereIos: 'Your iPhone already knows: Settings → Screen Time → See All App & Website Activity. Use the daily average.',
    phoneWhereAndroid: 'Your phone already knows: Settings → Digital Wellbeing. Use the daily average.',
    phoneWhereWeb:
      'Your phone already knows. iPhone: Settings → Screen Time. Android: Settings → Digital Wellbeing. Use the daily average.',
    phoneA11y: 'Hours a day on your phone',
    phoneResult: (years: string, share: string): Rich => [
      s('Over the time you likely have left, that is about '),
      b(`${years} years`),
      s(`, ${share} of your waking hours.`),
    ],
    valuesQuestion: 'What matters most to you?',
    valuesWhy: 'Pick up to three. Your reminders will keep pointing back to them.',
    peopleQuestion: 'Who loves you, and who do you love?',
    peopleWhy:
      "The people (and pets) you'd most regret not seeing enough. We'll count how many more times you're likely to see them.",
    activitiesQuestion: 'What do you love doing?',
    activitiesWhy: "We'll count how many more times you get to do it.",
    computing: 'Counting your weeks',
    computingNote: 'Turning your answers into time.',
  },

  reveal: {
    eyebrow: (name: string) => (name ? `${name}, your time` : 'Your time'),
    about: 'About',
    weeksRemain: 'weeks likely remain',
    fullLife: (total: string, lived: string) =>
      `A full life like yours is about ${total} weeks. You have lived ${lived} of them. Let's make the rest count.`,
    person: (n: string, label: string): Rich => [s('That is about '), b(n), s(` ${label}.`)],
    phone: (years: string, swap: string): Rich => [
      s('Your phone takes about '),
      b(`${years} years`),
      s(` of that. Half an hour less a day could become ${swap}.`),
    ],
    lever: (label: string, years: string, weekends: string): Rich => [
      s(` ${label} could add about `),
      b(`${years} years`),
      s(`, roughly ${weekends} more weekends.`),
    ],
    values: (vals: string[]) =>
      `You said ${list(vals.map((v) => v.toLowerCase()))} ${plural(vals.length, 'matters', 'matter')} most. We will keep pointing you back to ${plural(vals.length, 'it', 'them')}.`,
    range: (med: number, q25: number, q75: number, country: string | null) =>
      `This is a range, not a date: half of people living like you${country ? ` in ${country}` : ''} reach ${med}, and most land between ${q25} and ${q75}. Not medical advice.`,
    seeLife: 'See your life',
    /** Healthy years, and the change that would add the most of them. */
    healthy: (weeks: string, lever: string | null, years: string): Rich => [
      s('About '),
      b(weeks),
      s(' of those weeks are likely to be in good health: strong and doing things for yourself.'),
      ...(lever ? [s(` ${lever} could add about `), b(`${years} years`), s(' of them.')] : []),
    ],
  },

  /** "You have been alive for…" on the birth-date step. */
  alive: {
    heading: 'You have been alive for',
    summary: (days: string, years: number) => `You have been alive for ${days} days, about ${years} years.`,
    units: {
      seconds: 'seconds',
      minutes: 'minutes',
      hours: 'hours',
      days: 'days',
      weeks: 'weeks',
      months: 'months',
      years: 'years',
    },
  },

  life: {
    /** Above the countdown. */
    eyebrow: (name: string) => (name ? `${name} · likely time left` : 'Likely time left'),
    verdict: (age: string, med: number, left: number): Rich => [
      s('You are '),
      b(age),
      s('. Half of people living like you reach '),
      b(String(med)),
      s('. That leaves about '),
      b(`${left} years`),
      s('.'),
    ],
    range: (q25: number, q75: number, p80: number) => `Likely range ${q25}–${q75} · ${p80}% chance of reaching 80`,
    timeLeft: 'Likely time left',
    clock: (y: number, d: number) => `${y}y ${d}d `,
    clockA11y: (y: number, d: number) => `About ${y} years and ${d} days`,
    zoomA11y: 'Zoom',
    zooms: { life: 'Life', weeks: 'Weeks', year: 'Year', today: 'Today' },
    caption: {
      life: (year: number, pct: string, birthdays: string): Rich => [
        s(`Your year ${year} is `),
        b(pct),
        s(' gone. About '),
        b(birthdays),
        s(' more birthdays are likely.'),
      ],
      weeks: (week: string, pct: string, weeks: string): Rich => [
        s(`Week ${week} of your life is `),
        b(pct),
        s(' gone. About '),
        b(weeks),
        s(' weeks likely remain.'),
      ],
      year: (year: number, pctYear: string, pctDay: string, days: string): Rich => [
        s(`${year} is `),
        b(pctYear),
        s(' gone. Today is '),
        b(pctDay),
        s(' gone. '),
        b(days),
        s(' days left this year.'),
      ],
      today: (pct: string, hours: string): Rich => [
        s('This hour is '),
        b(pct),
        s(' gone. Today has about '),
        b(hours),
        s(' hours left. Spend them on purpose.'),
      ],
      /** Added after the Life or Weeks caption when sleep (and phone) are shown. Sleep is time well spent, never "lost". */
      layers: (unit: 'years' | 'weeks', sleep: string, phone: string | null, free: string): Rich => [
        s(' Added up, about '),
        b(sleep),
        s(` of those ${unit} are sleep (time well spent)`),
        ...(phone ? [s(' and '), b(phone), s(' on your phone')] : []),
        s(', leaving about '),
        b(free),
        s(phone ? ' awake and off your phone.' : ' awake.'),
      ],
      /** The healthy band in words: its text alternative. */
      health: (unit: 'years' | 'weeks', med: string, lo: string, hi: string): Rich => [
        s(' About '),
        b(med),
        s(` of them are likely in good health, strong and independent: the green band, fading where people differ (for most like you, ${lo}–${hi} ${unit}).`),
      ],
    },
    shows: { all: 'All', awake: 'Awake', free: 'Off phone' },
    showA11y: 'Show time ahead',
    whatIf: 'What if… tap to try',
    whatIfA11y: (label: string, years: string, healthy: string) => `What if: ${label}, about ${years} years, ${healthy} more in good health`,
    whatIfYears: (years: string) => `+${years}y`,
    weeksAhead: 'Your weeks ahead',
    weeksUnit: 'weeks',
    bar: { free: 'awake, off phone', phone: 'on your phone', sleep: 'asleep' },
    /** A change's name as a bar label: "quitting smoking". */
    barLever: (label: string) => label.toLowerCase(),
    triedTotal: (several: boolean, weeks: string, years: string, capped: boolean): Rich => [
      s(several ? 'Together, about ' : 'About '),
      b(`${weeks} more weeks`),
      s(` (${years} years)`),
      s(several ? `: less than the sum, since habit effects overlap${capped ? ', and capped' : ''}.` : '.'),
    ],
    triedOne: (label: string, years: string, healthy: string) => `${label}: about ${years} years on its own, ${healthy} in good health`,
    triedHealthy: (years: string): Rich => [s(' The green band grows by about '), b(`${years} years in good health`), s('.')],
    tapWhatIf: 'Tap a “What if” on the calendar to see what a change could add.',
    makePlan: 'Make a small plan',
    makePlanA11y: (label: string) => `Make a small plan for: ${label}`,
    onePlanAtATime: (sentence: string) => `One small plan at a time: this would take the place of “${sentence}”`,
    tablesFor: (country: string) => `Starting from life tables for ${country}.`,
    tablesUS: 'Starting from an approximation of US life tables.',
    changeCountry: 'Change country',
    setCountry: 'Set your country',
    legend: {
      lived: 'Lived',
      now: 'Now',
      likely: 'Likely ahead',
      reach: 'Within reach',
      maybe: 'If fortune allows',
      asleep: 'Asleep',
      phone: 'On your phone',
      healthy: 'Likely in good health',
    },
    phoneTitle: 'Your phone',
    phoneLine: (hours: string, years: string, share: string): Rich => [
      s(`${hours} hours a day is about `),
      b(`${years} years`),
      s(` of the time you likely have left: ${share} of your waking hours.`),
    ],
    phoneSwap: (swap: string) =>
      `Half an hour less a day could become ${swap}. In experiments, cutting back on social media meant more time with family and friends and less loneliness.`,
    phoneAsk:
      'How many hours a day are you on your phone? Your Screen Time or Digital Wellbeing settings show the daily average.',
    habitsTitle: 'Your habits',
    habitsNeutral: 'Your habits keep you close to the baseline estimate.',
    habitsEffect: (adds: boolean, years: string): Rich => [
      s(`Your habits ${adds ? 'add' : 'cost'} about `),
      b(`${years} years`),
      s('.'),
    ],
    withinReach: 'Within reach',
    moreWeekends: (n: string) => `about ${n} more weekends`,
    together: (several: boolean, gain: string, capped: boolean): Rich => [
      s(several ? 'Together, about ' : 'That is about '),
      b(`${gain} more years`),
      s(`${capped ? ' (capped: habit effects overlap)' : ''}. Try them on the calendar with What if.`),
    ],
    allGood: 'You are already doing the things that add the most time. Keep them, and keep your people close.',
    /** The "Strong and independent" card. Later years are described gently, never as an age. */
    healthy: {
      eyebrow: 'Strong and independent',
      years: (med: string, lo: string, hi: string): Rich => [
        s('About '),
        b(`${med} of those years`),
        s(` are likely to be in good health: strong, steady and doing things for yourself. For most people like you, ${lo}–${hi}.`),
      ],
      later:
        'Later years often bring more aches and illness, and lean a little more on the people around you. How many, and how soon, is partly in your hands.',
      lever: (label: string, years: string, why: 'strength' | 'more' | 'plain'): Rich => [
        s(`${label} could add about `),
        b(`${years} of them`),
        s(why === 'strength' ? ': stronger legs, steadier balance, fewer falls.' : why === 'more' ? ', more than it adds to your lifespan.' : '.'),
      ],
      allGood: 'You already do the things that keep people strong the longest. Keep them, and keep your people close.',
      askStrength: 'Do you do strength training? Add your answer',
      sourceHealthy: 'Healthy years',
      sourceHabits: 'Habits',
    },
  },

  /** Phone time in words (lib/time-use.ts). */
  share: {
    half: 'about half',
    third: 'about a third',
    quarter: 'about a quarter',
    seventh: 'about a seventh',
    pct: (p: number) => `${p}%`,
  },
  swap: {
    dog: (name: string, walks: string) => `a daily walk with ${name}: about ${walks} more walks`,
    dinners: (n: string, person: string | null) =>
      `about ${n} two-hour dinners a year ${person ? `with ${person} or friends` : 'with friends and family'}`,
  },

  habitsScreen: {
    eyebrow: 'What is in your control',
    title: 'Change a habit, change the count',
    median: (country: string | null) =>
      `median age for someone living like you${country ? ` in ${country}` : ''}. Tap an option to see what it would change.`,
    whatMatters: 'WHAT MATTERS MOST',
    ranked: 'Ranked by size and strength of evidence. Tap one to see the numbers and the source.',
    exerciseReplaced: 'Replaced by your daily steps above, so nothing is counted twice.',
    youNow: 'you now',
    noChange: 'no change',
    stepsHeading: 'DAILY STEPS',
    stepsA11y: 'Average daily steps',
    stepsAnswer: (n: string) => `${n} steps a day`,
    math1: (n: string) => `1 · Average: ${n} steps a day`,
    math2: (hr: string) => `2 · Risk vs 6,000 steps: × ${hr}`,
    math3: (hr: string, b: string) => `3 · Years ≈ ln(1 ÷ ${hr}) ÷ ${b} = `,
    math4: '4 · Replaces your exercise answer; benefit levels off at 10,000.',
    useExercise: 'Use my exercise answer instead',
    stepsHint: "Tap + or − to use your steps instead of your exercise answer. Your phone's health app shows your average.",
    inEstimate: 'Part of your estimate.',
    notInEstimate: 'Not in your estimate yet; shown for direction.',
    howItWorks: 'HOW YOUR ESTIMATE WORKS',
    strength: { strong: 'strong', moderate: 'moderate', emerging: 'emerging' },
    healthspan: 'STAYING STRONG AND INDEPENDENT',
    healthspanNote: 'What keeps the later years healthy: the green band on your Life calendar. Tap one to see the numbers and the source.',
    strengthNote: (years: string) =>
      `Its bigger effect is on staying strong and independent: twice a week could add about ${years} years in good health.`,
    strengthKeep: 'Twice a week keeps you stronger and steadier for longer. Keep it up.',
  },

  /** "What matters most", keyed like WHAT_MATTERS in lib/evidence.ts. Keep in step with docs/science.md. */
  evidence: {
    smoking: {
      title: 'Not smoking',
      summary: 'The largest single lever. Quitting at any age helps.',
      detail: 'Smoking roughly doubles the yearly risk of dying (×2.2 in this app). After quitting it falls toward ×1.3.',
    },
    moving: {
      title: 'Moving more, staying fit',
      summary: 'Risk keeps falling up to 8–10k steps a day under 60, 6–8k over 60.',
      detail:
        'Across 15 cohorts (47,471 adults), more daily steps meant lower mortality up to those levels. Cardio fitness is one of the strongest predictors of survival, with no upper limit of benefit seen.',
    },
    relationships: {
      title: 'Close relationships',
      summary: 'Isolation and loneliness are linked to about 26–32% higher risk of dying early, on par with smoking or obesity.',
      detail:
        'Across 70 studies (3.4 million people), social isolation, loneliness and living alone each raised the odds of early death by about a quarter to a third. An earlier review of 148 studies found strong ties went with about 1.5× the odds of survival. In an 85-year Harvard study, relationship satisfaction at 50 predicted health at 80 better than cholesterol.',
    },
    diet: {
      title: 'What you eat',
      summary: 'More legumes, whole grains and nuts; less red and processed meat.',
      detail:
        'A lasting switch from a typical Western diet to an optimal one is linked to 10–13 more years if made at 20, about 8 at 60, and over 3 at 80. A modeling study: population averages, not individual forecasts.',
    },
    weight: {
      title: 'Healthy weight and blood pressure',
      summary: 'Both drive heart disease, the top cause of death.',
      detail:
        'Healthy weight is one of the five habits that together were linked to 12–14 more years at age 50, and to about 8–11 more years free of cancer, heart disease and diabetes.',
    },
    strength: {
      title: 'Strength training',
      summary: '30–60 minutes a week is linked to 10–17% lower mortality, and to staying strong and independent for longer.',
      detail:
        'On top of, not instead of, aerobic exercise; benefits beyond about an hour a week are unclear. Its bigger effect is on the later years: strength and balance work means fewer falls and less disability (see "Staying strong and independent"). In this app, twice a week counts ×0.85 on the risk of dying and ×0.82 on the risk of losing good health.',
    },
    purpose: {
      title: 'A sense of purpose',
      summary: 'Linked to about 17% lower mortality and fewer heart attacks and strokes.',
      detail:
        'Across 10 studies (136,265 people) in the US and Japan, where it is called ikigai: "a life worth living". Optimism shows a similar pattern.',
    },
    sleep: {
      title: 'Sleeping 7–8 hours',
      summary: 'Under about 6 hours is linked to 12% higher mortality.',
      detail: 'Very long sleep shows higher risk too, but that is mostly a sign of illness rather than a cause.',
    },
    alcohol: {
      title: 'Drinking little',
      summary: 'Light drinking does not protect; risk rises from about 2 drinks a day for women, 3 for men.',
      detail:
        'A meta-analysis of 107 cohorts (4.8 million people) found no lower mortality for light drinkers than for lifelong non-drinkers.',
    },
    helping: {
      title: 'Helping others',
      summary: 'Volunteering later in life is linked to 24% lower mortality.',
      detail: 'After adjusting for health, across 14 studies of adults 55 and older.',
    },
    scrolling: {
      title: 'Less scrolling, more people',
      summary: 'Cutting social media in experiments meant more time with family and friends, and less loneliness.',
      detail:
        'Deactivating Facebook for 4 weeks raised well-being and offline time with friends and family. Limiting social media to about 30 minutes a day for 3 weeks lowered loneliness and depression.',
    },
    healthyHabits: {
      title: 'Healthy habits add healthy years',
      summary: 'At 50, 4–5 healthy habits went with about 10.7 (women) and 7.6 (men) more years free of cancer, heart disease and diabetes.',
      detail:
        'In two large Harvard cohorts, total years rose about as much (+9.4 women, +8.1 men): nearly all the extra time was healthy time, and the years lived with disease barely changed. The habits: not smoking, healthy weight, 30+ minutes a day of activity, moderate or no drinking, a good diet. The app moves your healthy years with your habits to match.',
    },
    falls: {
      title: 'Exercise prevents falls',
      summary: 'Exercise cut falls in older people by 23%; programs with strength and balance work by about a third.',
      detail:
        'Cochrane review of 108 trials (23,407 people over 60 living at home). Overall rate ratio 0.77 (high-certainty evidence); balance and functional exercise 0.76; several kinds together, usually balance plus strength, 0.66 (moderate certainty).',
    },
    mobility: {
      title: 'Staying able to walk on your own',
      summary: 'In a trial of 1,635 people aged 70–89, walking with strength and balance work cut major mobility disability by 18%.',
      detail:
        'The LIFE trial: a structured moderate program (walking, strength, flexibility, balance) vs health education, over 2.6 years. Losing the ability to walk 400 m: 30.1% vs 35.5% (HR 0.82). One large trial of a combined program, so the share due to strength alone is unknown. The app uses 0.82 for strength training twice a week.',
    },
    grip: {
      title: 'Grip strength',
      summary: 'People over 60 with weak grip were about 1.8× as likely to lose function, and to die, over follow-up.',
      detail:
        'Meta-analysis of 34 studies of people 60 and older living at home: pooled ratio 1.78 for declining physical function and 1.79 for mortality, low vs high grip. Grip is a marker of overall strength; observational, so it shows who is at risk more than what to do, but strength training is how strength is kept.',
    },
  },

  howItWorks: [
    'Everyone’s yearly risk of dying rises with age, roughly doubling every 7 years. We start from that curve for your sex in your country, fitted to its UN life table (World Population Prospects 2024, deaths in 2023). Without a country, we use an approximation of US tables.',
    'Your habits multiply that risk: smoking ×2.2, exercising 3+ times a week ×0.85, under 6 hours of sleep ×1.15, rarely seeing people you are close to ×1.29, and so on.',
    'We follow that risk month by month from your age today. The age by which half of people like you have died is your median; the 25% and 75% marks give your range.',
    'Rule of thumb: years ≈ ln(risk multiplier) ÷ 0.085. That is why doubling your risk costs about 8 years, and why quitting smoking can give back about 9.',
    'Several changes together add less than their sum, and we cap the total at 14 years, the largest all-habits difference found in a major US study.',
    'Healthy years start from your country’s healthy life expectancy (WHO, 2023): the share of the years ahead that people your age spend in good health. We gather the less healthy time at the end, where most of it falls, so it shows as a band that fades, not a date.',
    'Habits move healthy years about as much as total years, as they did in a large Harvard study, and strength training more: it keeps people strong, steady and independent. The same 14-year cap applies.',
    'These are associations from population studies, not causes, and not medical advice.',
  ],

  /** Findings quoted next to their sources (lib/evidence.ts holds the links). */
  claims: {
    lifeTables: 'Life tables for 237 countries and areas, by sex, estimates for 2023.',
    plans:
      'Deciding when and where you will do something, as an if-then, makes following through much more likely (94 studies).',
    freshStart: 'People are more likely to start on a goal at a new week, a new month or a birthday: a fresh start.',
    comingBack:
      'In the largest test of exercise nudges (61,293 people), what helped most was rewarding a return after a missed workout.',
    personalNumbers:
      'Seeing your own numbers can help: smokers told their "lung age" were about twice as likely to quit within a year (13.6% vs 6.4%).',
    walkAfterMeals: 'A few minutes of light walking after a meal lowered blood sugar by about 17% compared with sitting.',
  },

  /** If-then plans (lib/plans.ts). Plans keep the words they were made with, so defaults are only a start. */
  plans: {
    everyDay: 'Every day',
    weekdays: 'Weekdays',
    weekends: 'Weekends',
    /** Days in week order (Monday first, 0 = Sunday): "Sundays", "Mondays and Thursdays", "Mon, Wed and Fri". */
    days: (days: number[]) => {
      const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const short = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      if (days.length === 1) return `${names[days[0]]}s`;
      if (days.length === 2) return `${names[days[0]]}s and ${names[days[1]]}s`;
      return list(days.map((d) => short[d]));
    },
    /** "12:30 pm" */
    time: (h: number, m: number) => `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'am' : 'pm'}`,
    /** The "when": "Sundays after lunch", "Weekdays at 8:00 am". */
    cue: (days: string, anchor: string | null, time: string) => `${days} ${anchor ?? `at ${time}`}`,
    /** "Sundays after lunch, I will call Mom." */
    sentence: (cue: string, action: string) => `${cue}, I will ${action}.`,
    /** "call my best friend", not "call My best friend". */
    nameInSentence: (name: string) => name.replace(/^My /, 'my '),
    today: 'today',
    tomorrow: 'tomorrow',
    anchors: {
      breakfast: 'after breakfast',
      lunch: 'after lunch',
      work: 'after work',
      dinner: 'after dinner',
      morning: 'in the morning',
      cigarette: 'when I want a cigarette',
      atLunch: 'at lunch',
      coffee: 'after my morning coffee',
    },
    call: (name: string) => `call ${name}`,
    messageOrCall: (name: string) => `message or call ${name}`,
    actions: {
      walk: 'go for a 10-minute walk',
      connect: 'call or see someone I love',
      bed: 'put my phone away and get ready for bed',
      smoke: 'take a 5-minute walk first',
      drink: 'have a glass of sparkling water first',
      plate: 'fill half my plate with vegetables',
      strength: 'do 10 minutes of squats, push-ups and carries',
    },
    /** A habit step as a one-thing idea: "Go for a 10-minute walk after dinner". */
    withAnchor: (action: string, anchor: string) => `${action} ${anchor}`,
    capitalize: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
    /** "One thing for this week / October / your new year" */
    periodWeek: 'this week',
    periodBirthday: 'your new year',
    calendarNote: 'Missing one is fine: just pick it up next time. From Memento Mori.',
    // Editor
    when: 'WHEN',
    daysA11y: 'Days',
    atSetTime: 'at a set time',
    anchorPlaceholder: 'or in your words: when I get home',
    anchorA11y: 'The moment that reminds you, in your words',
    around: 'Around (for reminders)',
    at: 'At',
    timeA11y: 'Time',
    iWill: 'I WILL',
    actionPlaceholder: 'call Mom',
    actionA11y: 'What you will do',
    save: 'Save plan',
    cancel: 'Cancel',
    planReachOut: 'Plan when to reach out',
    planReachOutA11y: (name: string) => `Plan when to reach out to ${name}`,
    yourPlan: 'Your plan',
    edit: 'Edit',
    removeA11y: 'Remove this plan',
    addToCalendar: 'Add to my calendar',
    calendarSaved: 'Saved: open it to add ✓',
    addToCalendarA11y: (title: string) => `Add "${title}" to your calendar as a repeating event`,
  },

  thisWeek: {
    heading: 'This week',
    doneToday: 'done today ✓',
    doneThisWeek: 'done this week ✓',
    next: (when: string) => `next: ${when}`,
    welcomeBack: (name: string) =>
      `Welcome back${name ? `, ${name}` : ''}. Plans slip for everyone, and that is fine: picking one up again is what counts. This week is a fresh page.`,
    oneThingFor: (period: string) => `One thing for ${period}`,
    doneMark: ' · done ✓',
    did: 'Done',
    didToday: 'Done today ✓',
    moreVisits: (n: string, name: string) => `About ${n} more visits with ${name} at your current pace.`,
    smallStep: (label: string, years: string) => `${label} could add about ${years} years. This is a small step toward it.`,
    noPlans:
      'No plans yet. A plan is a small “when, then”: “Sundays after lunch, I will call Mom.” You could make one on anyone in Loves, or for a habit on Life.',
    suggestHeading: 'A plan you could try',
    suggestPerson: (n: string, name: string) =>
      `About ${n} more visits with ${name} at your current pace. A plan makes the next one more likely.`,
    suggestLever: (label: string, years: string) => `${label} could add about ${years} years. A small plan is a way to start.`,
    whyPlans: 'Why plans help',
    makeItMine: 'Make it my plan',
    changeIt: 'Change it',
    notNow: 'Not now',
  },

  freshStart: {
    eyebrow: { week: 'Monday · a fresh start', month: 'The 1st · a fresh start', birthday: 'Your birthday · a fresh start' },
    title: (period: string) => `One thing for ${period}?`,
    birthday: (name: string, weeks: string) =>
      `Happy birthday${name ? `, ${name}` : ''}. You have lived about ${weeks} weeks, some of them wonderful. What is one thing you could do with the year ahead?`,
    prompt: (week: boolean, month: string) =>
      `What is one thing you could do ${week ? 'this week' : `in ${month}`} that you would be glad you did?`,
    callIdea: (name: string) => `Call ${name}`,
    gratitudeIdea: 'Write to someone I am grateful for',
    useIdea: (idea: string) => `Use idea: ${idea}`,
    ownPlaceholder: 'or your own',
    a11y: (period: string) => `One thing for ${period}`,
    choose: 'Make it my one thing',
    notToday: 'Not today',
  },

  todaysCount: {
    pet: 'A walk or some quiet time together today?',
    activity: 'Could you pick a day for the next one? Deciding when makes it more likely.',
    agency: (label: string, years: string, more: string, what: string): Rich => [
      s(`${label} could add about `),
      b(`${years} years`),
      s(': about '),
      b(more),
      s(` ${what}. You can try it on the Life calendar.`),
    ],
  },

  loves: {
    per: PER,
    /** "4 a year" */
    pace: (count: number, per: Per) => `${count} ${PER[per]}`,
    reasonBoth: (pace: string) => `${pace}, over the years you both likely have`,
    reasonUntil: (pace: string, age: number) => `${pace}, until you're ${age}`,
    reasonLife: (pace: string) => `${pace}, for the rest of your life`,
    /** "more visits with Mom" · "more days with Max" */
    moreWith: (unit: Unit, name: string) => `more ${unit} with ${name}`,
    /** "more times: play soccer" */
    moreTimes: (activity: string) => `more times: ${activity.toLowerCase()}`,
    /** "about 120 more visits" in the editor list. */
    aboutMore: (n: string, unit: Unit): Rich => [s('about '), b(n), s(` more ${unit}`)],
    since: {
      today: 'today',
      yesterday: 'yesterday',
      days: (n: number) => `${n} days ago`,
      months: (n: number) => `${n} months ago`,
    },
    suggestPeople: {
      mom: 'Mom',
      dad: 'Dad',
      friend: 'My best friend',
      grandma: 'My grandmother',
      dog: 'My dog',
      cat: 'My cat',
    },
    suggestActivities: {
      soccer: 'Play soccer',
      movies: 'Go to the movies',
      read: 'Read a book',
      travel: 'Travel somewhere new',
      cook: 'Cook for friends',
    },
    // Screen
    eyebrow: 'What you love',
    title: 'How many more times?',
    sub: 'At your current pace, over the life you likely have left.',
    empty: 'Nothing here yet. Add someone who loves you, or something you love doing.',
    addHeading: 'ADD',
    addToA11y: 'Add to',
    groups: { who: 'Who loves you', what: 'What you love' },
    cardA11y: (n: string, label: string, reason: string) => `About ${n} ${label}. ${reason}.`,
    // Editor
    kinds: { person: 'Person', pet: 'Pet' },
    species: { dog: 'Dog', cat: 'Cat' },
    personOrPet: 'Person or pet',
    kindOfPet: 'Kind of pet',
    useSuggestion: (name: string) => `Use suggestion: ${name}`,
    whoA11y: 'Who',
    whatA11y: 'What',
    petPlaceholder: 'Max, Luna…',
    personPlaceholder: 'Mom, my partner, Sam…',
    activityPlaceholder: 'Play soccer, read, travel…',
    howOftenSee: 'How often you see them',
    howOftenDo: 'How often you do it',
    fewer: 'Fewer',
    times: (n: number) => plural(n, 'time', 'times'),
    perA11y: 'Per',
    theirAge: 'Their age (optional)',
    petAge: 'Their age in years (optional)',
    untilAge: 'Until what age? (optional)',
    phoneA11y: 'Phone (optional)',
    phonePlaceholder: 'Phone (optional, for Call and Message)',
  },

  reach: {
    lastTime: (since: string) => `Last time you talked or met: ${since}.`,
    hint: 'Tap "We talked" after a call or visit to keep track.',
    claim: 'People appreciate being reached out to more than we expect, especially after a while.',
    message: 'Message',
    call: 'Call',
    weTalked: 'We talked',
    logged: 'Logged ✓',
    logA11y: (name: string) => `Log that you talked with ${name} today`,
    /** Gentle openers for the Message button, rotated by day. */
    openers: [
      'Thinking of you. Free for dinner this week?',
      "Hey! It's been too long. Call this weekend?",
      'Just wanted to say I love you.',
      'Remembered something funny about us today. When can we catch up?',
      "Let's not let another month go by. Coffee soon?",
    ],
  },

  today: {
    reachOut: 'Reach out today',
    moreVisits: (n: string): Rich => [s('About '), b(n), s(' more visits at your current pace. A message takes a minute.')],
    isolation:
      'People who stay close to others live longer: isolation and loneliness are linked to about 26–32% higher risk of dying early.',
    connectionLever: (years: string) => `For you, seeing the people you love every week could add about ${years} years.`,
    connectionOften: 'Seeing people every week is already part of your estimate. Keep it up.',
    noPerson:
      'Close relationships are one of the strongest predictors of a long, healthy life. Who would you like to see more of?',
    addSomeone: 'Add someone who loves you',
    noneLogged: 'No calls or visits logged in the last 30 days yet.',
    peopleThisMonth: (n: number) => `In the last 30 days you talked with or saw ${n} of the people you love.`,
  },

  daily: {
    /** Public-domain Stoic sources (Long 1862, Gummere 1917–25, Higginson 1865 translations; some lightly adapted). */
    quotes: [
      ['Do not act as if you had ten thousand years to live. While you live, while it is in your power, be good.', 'Marcus Aurelius · Meditations IV.17'],
      ['While we are postponing, life speeds by.', 'Seneca · Letters 1'],
      ['Think of yourself as dead. You have lived your life. Now take what is left and live it properly.', 'Marcus Aurelius · Meditations VII.56'],
      ['Let us prepare our minds as if we had come to the very end of life. Let us postpone nothing.', 'Seneca · Letters 101'],
      ['It is not that we have a short time to live, but that we waste much of it.', 'Seneca · On the Shortness of Life'],
      ['Let death be daily before your eyes, and you will never have an abject thought.', 'Epictetus · Enchiridion 21'],
      ['Every man lives only this present moment. All the rest is either past or uncertain.', 'Marcus Aurelius · Meditations III.10'],
      ['Begin at once to live, and count each separate day as a separate life.', 'Seneca · Letters 101'],
      ['You could leave life right now. Let that decide what you do and say and think.', 'Marcus Aurelius · Meditations II.11'],
      ['No man is free who is not master of himself.', 'Epictetus · Fragments'],
    ] as [text: string, source: string][],
    /** `{day}` becomes today's weekday. */
    questions: [
      'What would make today worth it?',
      'Who deserves your full attention today?',
      'What are you postponing that you would regret never doing?',
      'What is in your control today, and what is not?',
      'If this were your last ordinary {day}, what would you keep the same?',
      'What would you do today if you were not afraid?',
      'What can you let go of today?',
      'What do you want to be remembered for, and did today move you toward it?',
    ],
    loveSub: (pace: string) => `At ${pace}, over the time you likely have.`,
    weekends: { what: 'more weekends', sub: 'Each one is a Saturday and a Sunday you get to spend on purpose.' },
    summers: { what: 'more summers', sub: 'Long evenings. Warm nights. Not unlimited.' },
    moons: { what: 'more full moons', sub: 'Step outside for the next one.' },
    lived: { what: 'weekends already lived', sub: 'Some of them were wonderful. Be grateful for those, and make room for more.' },
  },

  opening: {
    lookBack: 'Look back',
    todaysCount: "Today's count",
    today: 'Today',
    agency: (label: string, years: string, more: string, what: string): Rich => [
      s(`${label} could add about `),
      b(`${years} years`),
      s(". That's about "),
      b(more),
      s(` ${what}.`),
    ],
    tapToSee: 'Tap to see your life',
    cardOf: (i: number, n: number) => `Card ${i} of ${n}`,
    seeLife: 'See your life',
    next: 'Next',
  },

  /**
   * Words in place of numbers while "Hide numbers" is on (the You screen): no years, weeks, ages, counts or
   * percentages on Life, Loves, Today, the opening and the reveal. Never a digit in here.
   */
  gentle: {
    setting: 'Hide numbers',
    settingNote:
      'Words instead of years, weeks and counts on Life, Loves, Today and the opening. The calendar stays, without its numbers.',
    /** How much of a likely life is ahead, from the share already lived (lib/life-views.ts aheadLevel). */
    ahead: {
      most: 'Most of your life is still ahead.',
      plenty: 'Plenty of good years are likely still ahead.',
      some: 'Good years are still ahead. Spend them on what you love.',
      gift: 'Every day from here is a gift. Spend it on what you love.',
    },
    /** How far through this year or today: early, under way, nearly done. */
    caption: {
      life: 'This year of your life is under way. ',
      weeks: 'This week of your life is under way. ',
      year: {
        early: 'Most of this year is still ahead.',
        middle: 'This year is well under way. There is good time left in it.',
        late: 'This year is nearly done. Make its last weeks count.',
      },
      today: {
        early: 'Most of today is still ahead. Spend it on purpose.',
        middle: 'Today is well under way. Spend what is left on purpose.',
        late: 'Today is nearly done. Spend what is left on purpose.',
      },
      layers: (phone: boolean): string =>
        phone
          ? ' Some of it is sleep (time well spent) and some is on your phone; the rest is awake and off it.'
          : ' Some of it is sleep, time well spent; the rest is awake.',
      /** The healthy band in words. */
      health: ' Many of them are likely strong and independent: the green band, fading where people differ.',
    },
    range: 'A range, not a date: the filled circles are likely, the rings are if fortune allows, and habits can move them.',
    whatIfA11y: (label: string) => `What if: ${label}, could add time`,
    triedTotal: (several: boolean): string =>
      several
        ? 'Together they could add good time: less than the sum, since habit effects overlap.'
        : 'This could add good time.',
    phoneLine: (share: string) => `Your phone takes ${share} of your waking hours.`,
    phoneSwap:
      'Half an hour less a day could become more time with the people you love. In experiments, cutting back on social media meant more time with family and friends and less loneliness.',
    habitsEffect: (adds: boolean): string => (adds ? 'Your habits add time to your estimate.' : 'Your habits cost some time in your estimate.'),
    adds: 'adds time',
    costs: 'costs time',
    couldAdd: 'could add good time',
    together: (several: boolean): string =>
      several ? 'Together they could add good years. Try them on the calendar with What if.' : 'Try it on the calendar with What if.',
    /** In place of a love's count: a little or a lot, never how many. */
    howMany: {
      few: 'A few more times than you might think.',
      many: 'Many more times, if you make room for them.',
    },
    pace: 'At your current pace.',
    loveSub: 'At your current pace, over the time you likely have.',
    agency: (label: string) => `${label} could add more of these. You can try it on the Life calendar.`,
    moreVisits: (name: string) => `More visits with ${name} than you might think, at your current pace.`,
    reachOut: 'More visits than you might think, at your current pace. A message takes a minute.',
    smallStep: (label: string) => `${label} could add good time. This is a small step toward it.`,
    suggestPerson: (name: string) =>
      `More visits with ${name} than you might think, at your current pace. A plan makes the next one more likely.`,
    suggestLever: (label: string) => `${label} could add good time. A small plan is a way to start.`,
    birthday: (name: string) =>
      `Happy birthday${name ? `, ${name}` : ''}. You have lived many weeks, some of them wonderful. What is one thing you could do with the year ahead?`,
    isolation: 'People who stay close to others tend to live longer and healthier lives.',
    connectionLever: 'For you, seeing the people you love every week could add good time.',
    noneLogged: 'No calls or visits logged this past month yet.',
    someThisMonth: 'This past month you talked with or saw some of the people you love.',
    /** The healthy band and the Strong and independent card. */
    healthy: {
      years:
        'Many of the years ahead are likely strong and independent: the green band on your calendar, fading where people differ.',
      lever: (label: string, strength: boolean) =>
        strength
          ? `${label} could keep you strong and independent for longer: stronger legs, steadier balance, fewer falls.`
          : `${label} could add healthy years.`,
      tried: ' The green band grows too.',
      reveal: (lever: string | null) => 'Many of those weeks are likely strong and independent.' + (lever ? ` ${lever} could add more of them.` : ''),
    },
    reveal: {
      fullLife: "A full life is a long run of weeks, and you are part way along. Let's make the rest count.",
      /** "more visits with Mom" + gentle.howMany */
      person: (label: string, howMany: string) => `That includes ${label}. ${howMany}`,
      phone: 'Your phone takes some of that. Half an hour less a day could become more time with the people you love.',
      lever: (label: string) => ` ${label} could add good years.`,
      range: (country: string | null) =>
        `This is a range, not a date, from how long people living like you${country ? ` in ${country}` : ''} tend to live. Not medical advice.`,
    },
  },

  account: {
    title: 'You',
    edit: 'Edit your answers',
    dataHeading: 'YOUR DATA',
    dataBody:
      'Everything you enter stays on this device. There is no account, no ads and no tracking. Your estimate is worked out right here, on your phone or in your browser.',
    guestNote: (guest: boolean) =>
      `You also have a ${guest ? 'guest account' : 'signed-in account'} from an earlier test. It holds nothing but an empty profile; deleting below erases it too.`,
    confirm:
      "This erases your answers, the people and things you love, and everything else on this device. It can't be undone.",
    yesDelete: 'Yes, delete everything',
    keep: 'Keep my data',
    deleteAll: 'Delete everything on this device',
    /** Shown when the server could not erase the account; nothing was deleted. */
    accountFailed:
      "We couldn't reach the server to erase your account from the earlier test, so nothing has been deleted yet. You can try again, or delete on this device only; the empty account then stays until you email us to erase it.",
    deviceOnly: 'Delete on this device only',
    disclaimer:
      'Estimates come from population studies. They show direction and rough size, not a promise, and are not medical advice.',
  },

  /** "Not a prediction, not medical advice", and the support line (components/disclaimer.tsx). */
  disclaimer: {
    short: 'An estimate from population averages, for reflection and education. Not a prediction of your death, and not medical advice.',
    points: [
      'This is an estimate from population averages, not a prediction of when you will die. Nobody can know that.',
      'It is not medical advice, diagnosis or treatment. For questions about your health, talk with a doctor or other qualified professional.',
      'It is here for reflection and education: to help you spend the time you have on what matters to you.',
    ],
    /** [label](href) runs are links. */
    support:
      'If thinking about death feels heavy right now, you don’t have to carry it alone. In the US, call or text [988](https://988lifeline.org) (Suicide & Crisis Lifeline). Elsewhere, [findahelpline.com](https://findahelpline.com) lists free, confidential support near you. In an emergency, call your local emergency number.',
    howItWorks: 'How this works',
    sources: 'Sources',
    beforeEyebrow: 'Before you see it',
    beforeTitle: 'A few honest words',
    understand: 'I understand',
  },

  /** Around the legal documents. Their bodies (lib/legal.ts) are English until a lawyer has reviewed them. */
  legal: {
    terms: 'Terms of Use',
    privacy: 'Privacy Policy',
    health: 'Consumer Health Data Privacy Policy',
    eyebrow: 'Legal',
    draft: 'Draft',
    draftNotice: 'This is a draft. It has not yet been reviewed by a lawyer and may change before Memento Mori launches.',
    /** Shown above a document in every language but English. */
    englishOnly: '',
    version: (v: string) => `Version ${v}`,
    notFound: 'Not found',
    notFoundBody: 'There is no document here.',
    /** Welcome screen; [label](href) runs are links. */
    agree:
      'By beginning, you agree to the [Terms of Use](/legal/terms) and confirm you are 18 or older. Your answers, including health habits, never leave this device: see the [Privacy Policy](/legal/privacy) and [Consumer Health Data Privacy Policy](/legal/health-data).',
  },

  /** The Sources screen. Authors, titles and journals stay as published (lib/sources.ts). */
  sources: {
    eyebrow: 'Sources',
    title: 'The research behind the app',
    lede: (n: string) => `All ${n} studies and data sets the app cites, grouped by what they are used for. Tap one to open it.`,
    usedFor: (what: string) => `Used for: ${what}`,
    opens: 'Opens in browser.',
    topics: {
      model: { title: 'How the estimate is built', blurb: 'The mortality curve, the life tables it is fitted to, and the cap on combined gains.' },
      habits: { title: 'Habits in your estimate', blurb: 'Where each habit’s risk multiplier comes from.' },
      direction: {
        title: 'Shown for direction, not in the estimate',
        blurb: 'Findings on the Habits screen that point the way but are not yet part of the numbers.',
      },
      behavior: { title: 'Plans, prompts and reaching out', blurb: 'Behavior science behind plans, fresh starts and welcome-backs.' },
      time: { title: 'Where the hours go', blurb: 'Phone time and what taking some back can do.' },
      loves: { title: 'Loves: “N more times”', blurb: 'Typical lifespans used to count time with pets.' },
    } satisfies Record<Topic, { title: string; blurb: string }>,
    uses: {
      gompertz1825: 'The shape of the curve: yearly risk of dying rises exponentially with age.',
      makeham1860: 'The constant, age-independent part of the risk (the “A” term).',
      wpp2024: 'Your baseline: the life table for your country and sex.',
      li2018: 'The 14-year cap on combined gains; not smoking as the largest lever.',
      holtLunstad2015: 'Connection: rarely seeing close people ×1.29.',
      holtLunstad2010: 'Strong social ties and about 1.5× the odds of survival (148 studies).',
      paluch2022: 'Exercise and daily steps.',
      mandsager2018: 'Cardio fitness as one of the strongest predictors of survival.',
      li2020: 'Healthy weight, and years free of chronic disease.',
      cappuccio2010: 'Sleep: under 6 hours ×1.15.',
      zhao2023: 'Alcohol: heavy drinking ×1.4; light drinking not protective.',
      fadnes2022: 'What you eat.',
      momma2022: 'Strength training.',
      who2023hale: 'Healthy years: the share of the years ahead people your age spend in good health, by country and sex.',
      pahor2014: "Staying able to walk on your own: strength training's effect on healthy years.",
      sherrington2019: 'Exercise with strength and balance work prevents falls.',
      rijk2016: 'Grip strength as a marker of staying independent.',
      cohen2016: 'A sense of purpose.',
      lee2019: 'Optimism and reaching 85.',
      okun2013: 'Helping others.',
      waldinger2016: 'Relationship satisfaction at 50 and health at 80.',
      allcott2020: 'Less scrolling, more time with people.',
      hunt2018: 'Limiting social media to 30 minutes a day.',
      phoneTime2025: 'The 4-hour starting point for the phone question (estimates vary).',
      liu2023: 'Reaching out to people.',
      gollwitzer2006: 'If-then plans.',
      dai2014: 'Fresh starts: Mondays, the 1st, birthdays.',
      milkman2021: 'Welcome-backs after time away, instead of streaks.',
      parkes2008: 'Showing people their own numbers.',
      buffey2022: 'Short walks after meals.',
      oneill2013: 'Dogs: median longevity about 12 years.',
      mcmillan2024: 'Dogs: median life expectancy 12.5 years (584,734 UK dogs).',
      oneill2015: 'Cats: median longevity 14 years.',
    } satisfies Record<StudyId, string>,
    quotesHeading: 'Quotes',
    quotes:
      'Marcus Aurelius (Meditations, tr. George Long, 1862), Seneca (Letters and On the Shortness of Life, tr. Richard M. Gummere, 1917–25, and others) and Epictetus (Enchiridion, tr. Thomas Wentworth Higginson, 1865). Public-domain translations, some lightly adapted.',
    footnote:
      'Some links go to a summary or press release when the full paper is behind a paywall. Associations from population studies are not proof of cause, and nothing here is medical advice.',
  },

  /** The How this works screen (app/how-it-works.tsx). Numbers come in already formatted. */
  methods: {
    eyebrow: 'How this works',
    title: 'Where your numbers come from',
    lede: 'Everything the app shows is worked out on your device from your answers and published research. Here is each step, and the study behind it.',
    everyStep: 'Every step, with sources',
    accountHeading: 'HOW IT WORKS',
    curveTitle: '1 · The curve everyone starts from',
    curveIntro:
      'For adults, the yearly risk of dying rises steadily with age, roughly doubling every 7 to 8 years. Actuaries have described this for two centuries as a Gompertz–Makeham curve:',
    curveParts: (child: string, youth: string) =>
      `B · e^(b·x) is the part that grows with age x (Gompertz); A is a small risk that doesn’t depend on age, like accidents (Makeham). Childhood and youth deaths don’t follow that shape, so two constant terms are added: one before age ${child} and one from ${child} to ${youth}.`,
    placeTitle: '2 · Where you live',
    placeBody: (n: string) =>
      `Where you live matters more than any habit: in 2023 the median age at death ran from about 59 to over 90 across countries. So the curve is fitted separately for each sex in each of ${n} countries and areas, to the United Nations’ life tables for 2023 (World Population Prospects 2024). A, B and b come from death rates at ages 30 to 100; the early-life terms make survival to 15 and to 30 match the table exactly. Across every country and sex, the model’s median age at death from birth lands within a year of the UN table’s.`,
    placeUs: (mA: string, mB: string, fA: string, fB: string, b: string) =>
      `Without a country, the app uses an older approximation of US tables: A = ${mA}, B = ${mB} for men; A = ${fA}, B = ${fB} for women; b = ${b} (about 75 and 81 years at birth).`,
    placeLeftOut:
      'Income and education also predict lifespan within a country. They are left out on purpose: they aren’t something you can act on here, and they read like a verdict.',
    habitsTitle: '3 · Your habits',
    habitsIntro:
      'Each answer multiplies the yearly risk at every age. ×1 means no change; ×2 means twice the risk. The multipliers are rounded from large studies and reviews: they are approximations, and they come from associations, not experiments.',
    habitsConnection: (middle: string) =>
      `For connection, the middle answer (${middle}) sits between the measured levels; it isn’t measured itself. The study reports odds, used here as risk multipliers, which is a close approximation.`,
    habitsSteps: (at4k: string, at10k: string) =>
      `Daily steps, when you enter them, replace the exercise answer, so movement is never counted twice. Risk falls about 7% for every extra 1,000 steps, measured from 6,000 a day and leveling off at 10,000: multiplier = e^(−0.072 × (steps − 6,000) ÷ 1,000). So 4,000 steps is ${at4k} and 10,000 is ${at10k}.`,
    rangeTitle: '4 · From risk to a range',
    rangeBody:
      'Starting from your age today, the app follows the risk month by month to age 121, multiplied by your habits. The age by which half of people like you have died is your median. The ages by which a quarter and three quarters have died give the likely range. It also shows the chance of reaching 80.',
    rangeRule: (b: string, years: string, doubling: string) =>
      `A rule of thumb behind the habit numbers: years gained ≈ ln(1 ÷ multiplier) ÷ ${b}. Halving your risk adds about ${years} years, because at b = ${b} risk doubles about every ${doubling} years of age (the fitted country curves are a little steeper). The screens compute the real difference rather than using the shortcut.`,
    combineTitle: '5 · What if: combining changes',
    combineBody: (cap: string) =>
      `Each “what if” is the difference between your median now and your median with that habit changed. Several changes together multiply, so they add less than the sum of each alone, since habit effects overlap. The total is also capped at ${cap} years.`,
    capClaim: (cap: string) =>
      `${cap} years: the largest difference between people with all five healthy habits and none, in two large US cohorts.`,
    combineCalendar:
      'On the calendar, the combined gain is split between the changes you try in proportion to what each would add alone, so each gets its own color.',
    notInEstimate: (items: string) =>
      `Some things on the Habits screen are shown for direction only and aren’t in your numbers yet: ${items}.`,
    healthyTitle: '6 · Healthy years',
    healthyBody:
      'Healthy years start from your country’s healthy life expectancy (WHO, 2023): the share of the years ahead that people your age and sex spend in good health, from birth and from 60. We fit a curve of how many people are not in good health at each age to those two shares and weight your years ahead by it, gathering the less healthy time at the end of life, where most of it falls. So the green band on the calendar fades across a range instead of ending on a date. WHO weights each condition by how much it limits people, so “good health” here is close to, but not the same as, being independent.',
    healthyHabits: (k: string, cap: string) => `Habits move healthy years about as much as total years, as they did in a large Harvard study: each habit’s risk multiplier shifts the health curve ${k} times as far as it shifts the risk of dying. The same ${cap}-year cap applies.`,
    healthyStrength: (hr: string) => `Strength training twice a week also lowers the risk of losing good health (${hr}), from a trial where walking with strength and balance work cut major mobility disability by 18%. Exercise with strength and balance work also prevents falls.`,
    timeTitle: '7 · Phone and sleep time',
    timePhone: (waking: string) =>
      `Phone time is your own estimate, in hours a day (it starts at 4, near common estimates for US adults). Over the years you likely have left, it adds up to hours × years ÷ 24. As a share of your waking day, it is hours ÷ ${waking}.`,
    timeSleep: (ok: string, short: string) =>
      `The “Awake” and “Off phone” views take sleep out of the calendar: about ${ok} hours a night, or ${short} if you said under 6. Sleep is time well spent, not lost.`,
    timeSwap: (minutes: string) =>
      `The swap suggests taking ${minutes} minutes a day back from the phone and shows what it could become, for example daily walks with your dog over the years you both likely have.`,
    lovesTitle: '8 · Loves: “N more times”',
    lovesBody:
      'For each person, pet or activity, the app counts the years you likely share, then multiplies by how often you see them or do it. The years shared end at the earliest of: your median age; the age you said you’d stop an activity; a person’s own median age (from their age, averaged over both sexes, since the app doesn’t ask, and assumed to live in your country); or a pet’s typical lifespan.',
    lovesPets: (dog: string, cat: string) =>
      `Typical lifespans: dogs about ${dog} years, cats about ${cat}, from UK veterinary records. Breed and size matter a lot. An older pet is always counted as having at least half a year.`,
    limitsTitle: '9 · What it can’t tell you',
    limits: [
      'These are population averages. They describe how long groups of people with answers like yours tended to live, not what will happen to you. They know nothing of your health history, your genes or your medical care.',
      'The links between habits and lifespan come from observational studies: people who do X tend to live longer, partly because of X and partly because of everything that travels with it. Changing a habit may not change your lifespan by the amount shown.',
      'That’s why the app shows a range, never a date. Half of people like you live past the median; many live far longer.',
    ],
    versionTitle: 'Model version',
    versionBody: 'The model changes only on strong evidence, such as meta-analyses, and each change gets a new version.',
    allSources: 'Every source, in full',
  },
};

export type Strings = typeof en;
