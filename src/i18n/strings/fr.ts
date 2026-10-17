/** Français : tutoiement, ton calme et chaleureux. */
import { b, s } from '@/i18n/rich';
import type { Strings } from '@/i18n/strings/en';
import type { Per } from '@/lib/loves';

type Unit = 'visits' | 'days' | 'times';

const plural = (n: number, one: string, many: string) => (n <= 1 ? one : many);

/** "a, b et c" */
const list = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} et ${xs.at(-1)}`);

const PER: Record<Per, string> = { day: 'par jour', week: 'par semaine', month: 'par mois', year: 'par an' };
const UNIT: Record<Unit, string> = { visits: 'visites', days: 'jours', times: 'fois' };

export const fr: Strings = {
  common: {
    back: '← Retour',
    close: 'Fermer',
    continue: 'Continuer',
    skip: 'Passer',
    skipForNow: 'Passer pour l’instant',
    save: 'Enregistrer',
    done: 'OK',
    add: 'Ajouter',
    remove: 'Retirer',
    removeA11y: (name) => `Retirer ${name}`,
    less: 'Moins',
    more: 'Plus',
    you: 'Toi',
    source: 'Source',
    why: 'Pourquoi',
    theScience: 'La science',
    lifeTables: 'Tables de mortalité',
    sourceA11y: (prefix, label) => `${prefix} : ${label}, s’ouvre dans le navigateur`,
    tickingSound: 'Tic-tac',
    clockTicking: 'Tic-tac de l’horloge',
    hoursValue: (h) => `${h} h`,
    yrs: (signed) => `${signed} ans`,
    years: (y) => `${y} ans`,
    notAdvice:
      'Les estimations viennent de moyennes de population et de grands ratios de risque. Elles indiquent une direction et un ordre de grandeur, pas une promesse, et ne sont pas un avis médical.',
    list,
  },

  tabs: { life: 'Vie', habits: 'Habitudes', loves: 'Amours', today: 'Aujourd’hui' },

  language: {
    heading: 'LANGUE',
    note: 'Suit la langue de ton appareil jusqu’à ce que tu en choisisses une.',
    a11y: 'Langue',
  },

  date: {
    months: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
    monthsShort: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
    monthInitials: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    weekdayInitials: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    weekdays: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
    weekdaysShort: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
    year: 'Année',
    month: 'Mois',
    day: 'Jour',
    decade: (d) => `Années ${d}`,
    hour: (h) => `${h}h`,
  },

  habits: {
    smoke: {
      question: 'Est-ce que tu fumes ?',
      short: 'Tabac',
      why: 'Le levier le plus important de cette liste.',
      options: { never: 'Jamais', former: 'J’ai arrêté', current: 'Oui' },
    },
    exercise: {
      question: 'À quelle fréquence fais-tu du sport ?',
      short: 'Activité physique',
      why: 'La marche rapide compte.',
      options: { none: 'Rarement', some: '1 à 2 fois par semaine', regular: '3 fois ou plus par semaine' },
    },
    bmi: {
      question: 'Qu’est-ce qui décrit le mieux ton poids ?',
      short: 'Poids',
      why: 'Tranches d’indice de masse corporelle. Une approximation suffit.',
      options: { under: 'Insuffisant', normal: 'Normal', over: 'Surpoids', obese: 'Obésité' },
    },
    alcohol: {
      question: 'Combien bois-tu d’alcool ?',
      short: 'Alcool',
      why: 'Beaucoup, c’est environ 15 verres ou plus par semaine.',
      options: { none: 'Peu ou pas', moderate: 'Modérément', heavy: 'Beaucoup' },
    },
    sleep: {
      question: 'Combien dors-tu ?',
      short: 'Sommeil',
      why: 'La plupart des nuits, pas tes meilleures nuits.',
      options: { short: 'Moins de 6 heures', ok: '6 à 9 heures' },
    },
    connection: {
      question: 'À quelle fréquence passes-tu du temps avec tes proches ?',
      short: 'Lien social',
      why: 'En personne ou une vraie conversation. Les relations proches sont parmi les meilleurs prédicteurs d’une longue vie.',
      options: { often: 'Chaque semaine', sometimes: 'Quelques fois par mois', rarely: 'Rarement ; je me sens souvent seul·e' },
    },
    strength: {
      question: 'Fais-tu du renforcement musculaire ?',
      short: 'Force',
      why: 'Haltères, élastiques ou poids du corps : squats, pompes, porter des sacs lourds. Cela te garde fort et stable plus tard.',
      options: { none: 'Rarement ou jamais', some: 'Environ une fois par semaine', regular: 'Deux fois par semaine ou plus' },
    },
  },

  levers: {
    smoke: 'Arrêter de fumer',
    exercise: 'Faire du sport 3 fois par semaine',
    bmi: 'Atteindre un poids sain',
    alcohol: 'Boire moins',
    sleep: 'Dormir 6 à 9 heures',
    connection: 'Voir tes proches chaque semaine',
    steps: 'Marcher 10 000 pas par jour',
    strength: 'Du renforcement deux fois par semaine',
  },

  values: {
    family: 'La famille',
    partner: 'Mon/ma partenaire',
    friends: 'Les amis',
    health: 'La santé',
    craft: 'Le travail et le métier',
    learning: 'Apprendre',
    creating: 'Créer',
    faith: 'La foi et l’esprit',
    nature: 'La nature',
    adventure: 'L’aventure',
    service: 'Aider les autres',
    peace: 'La paix intérieure',
  },

  onboarding: {
    welcomeEyebrow: 'Souviens-toi que tu vas mourir',
    welcomeLede:
      'Les stoïciens gardaient la mort à l’esprit pour ne pas gaspiller leurs jours. Cette app compte le temps qu’il te reste probablement, pour donner à aujourd’hui le poids qu’il mérite, et le tourner vers ce que tu aimes.',
    welcomeNote: 'Quelques questions courtes, une à la fois. Tes réponses restent sur cet appareil.',
    begin: 'Commencer',
    step: {
      you: 'Toi',
      birth: 'Naissance',
      place: 'Lieu',
      body: 'Corps',
      habits: 'Habitudes',
      time: 'Ton temps',
      values: 'Ce qui compte',
      who: 'Qui t’aime',
      what: 'Ce que tu aimes',
    },
    nameQuestion: 'Comment devons-nous t’appeler ?',
    nameA11y: 'Prénom',
    namePlaceholder: 'Ton prénom',
    dobQuestion: 'Quand es-tu né·e ?',
    countryQuestion: 'Où vis-tu ?',
    countryWhy:
      'Là où l’on vit change la durée de vie, de 30 ans ou plus d’un pays à l’autre. Nous partons des tables de mortalité de ton pays.',
    countrySearch: 'Chercher un pays',
    countrySearchAgain: 'Ailleurs ? Cherche',
    countryNone: 'Aucun pays de ce nom dans les tables de l’ONU.',
    sexQuestion: 'Quel était ton sexe à la naissance ?',
    sexWhy: 'En moyenne, les femmes vivent environ cinq ans de plus que les hommes.',
    sex: { m: 'Homme', f: 'Femme' },
    phoneQuestion: 'Combien d’heures par jour passes-tu sur ton téléphone ?',
    phoneWhereIos:
      'Ton iPhone le sait déjà : Réglages → Temps d’écran → Voir toute l’activité. Utilise la moyenne quotidienne.',
    phoneWhereAndroid: 'Ton téléphone le sait déjà : Paramètres → Bien-être numérique. Utilise la moyenne quotidienne.',
    phoneWhereWeb:
      'Ton téléphone le sait déjà. iPhone : Réglages → Temps d’écran. Android : Paramètres → Bien-être numérique. Utilise la moyenne quotidienne.',
    phoneA11y: 'Heures par jour sur ton téléphone',
    phoneResult: (years, share) => [
      s('Sur le temps qu’il te reste probablement, cela fait environ '),
      b(`${years} ans`),
      s(`, soit ${share} de tes heures éveillées.`),
    ],
    valuesQuestion: 'Qu’est-ce qui compte le plus pour toi ?',
    valuesWhy: 'Choisis-en jusqu’à trois. Tes rappels y reviendront toujours.',
    peopleQuestion: 'Qui t’aime, et qui aimes-tu ?',
    peopleWhy:
      'Les personnes (et les animaux) que tu regretterais le plus de ne pas voir assez. Nous compterons combien de fois encore tu les verras probablement.',
    activitiesQuestion: 'Qu’aimes-tu faire ?',
    activitiesWhy: 'Nous compterons combien de fois encore tu pourras le faire.',
    computing: 'On compte tes semaines',
    computingNote: 'Tes réponses deviennent du temps.',
  },

  reveal: {
    eyebrow: (name) => (name ? `${name}, ton temps` : 'Ton temps'),
    about: 'Environ',
    weeksRemain: 'semaines restent probablement',
    fullLife: (total, lived) =>
      `Une vie entière comme la tienne compte environ ${total} semaines. Tu en as vécu ${lived}. Faisons que le reste compte.`,
    person: (n, label) => [s('Cela fait environ '), b(n), s(` ${label}.`)],
    phone: (years, swap) => [
      s('Ton téléphone en prend environ '),
      b(`${years} ans`),
      s(`. Une demi-heure de moins par jour pourrait devenir ${swap}.`),
    ],
    lever: (label, years, weekends) => [
      s(` ${label} pourrait ajouter environ `),
      b(`${years} ans`),
      s(`, soit à peu près ${weekends} week-ends de plus.`),
    ],
    values: (vals) =>
      `Tu as dit que ${list(vals.map((v) => v.toLowerCase()))} ${plural(vals.length, 'compte', 'comptent')} le plus. Nous continuerons à t’y ramener.`,
    range: (med, q25, q75, country) =>
      `C’est une fourchette, pas une date : la moitié des personnes qui vivent comme toi${country ? ` en ${country}` : ''} atteignent ${med} ans, et la plupart se situent entre ${q25} et ${q75} ans. Pas un avis médical.`,
    seeLife: 'Voir ta vie',
    healthy: (weeks, lever, years) => [
      s('Environ '),
      b(weeks),
      s(' de ces semaines seront probablement en bonne santé : fort et autonome.'),
      ...(lever ? [s(` ${lever} pourrait en ajouter environ `), b(`${years} ans`), s('.')] : []),
    ],
  },

  alive: {
    heading: 'Tu as vécu',
    summary: (days, years) => `Tu as vécu ${days} jours, environ ${years} ans.`,
    units: {
      seconds: 'secondes',
      minutes: 'minutes',
      hours: 'heures',
      days: 'jours',
      weeks: 'semaines',
      months: 'mois',
      years: 'ans',
    },
  },

  life: {
    eyebrow: (name) => (name ? `${name} · temps qu’il te reste probablement` : 'Temps qu’il te reste probablement'),
    verdict: (age, med, left) => [
      s('Tu as '),
      b(age),
      s(' ans. La moitié des personnes qui vivent comme toi atteignent '),
      b(String(med)),
      s(' ans. Il te reste donc environ '),
      b(`${left} ans`),
      s('.'),
    ],
    range: (q25, q75, p80) => `Fourchette probable ${q25}–${q75} · ${p80} % de chances d’atteindre 80 ans`,
    timeLeft: 'Temps qu’il te reste probablement',
    clock: (y, d) => `${y}a ${d}j `,
    clockA11y: (y, d) => `Environ ${y} ans et ${d} jours`,
    zoomA11y: 'Zoom',
    zooms: { life: 'Vie', weeks: 'Semaines', year: 'Année', today: 'Jour' },
    caption: {
      life: (year, pct, birthdays) => [
        s(`Ta ${year}e année est écoulée à `),
        b(pct),
        s('. Environ '),
        b(birthdays),
        s(' anniversaires de plus sont probables.'),
      ],
      weeks: (week, pct, weeks) => [
        s(`La semaine ${week} de ta vie est écoulée à `),
        b(pct),
        s('. Il reste probablement environ '),
        b(weeks),
        s(' semaines.'),
      ],
      year: (year, pctYear, pctDay, days) => [
        s(`${year} est écoulée à `),
        b(pctYear),
        s('. Aujourd’hui est écoulé à '),
        b(pctDay),
        s('. Il reste '),
        b(days),
        s(' jours cette année.'),
      ],
      today: (pct, hours) => [
        s('Cette heure est écoulée à '),
        b(pct),
        s('. Il reste environ '),
        b(hours),
        s(' heures aujourd’hui. Passe-les avec intention.'),
      ],
      layers: (unit, sleep, phone, free) => [
        s(' Au total, environ '),
        b(sleep),
        s(` de ces ${unit === 'years' ? 'années' : 'semaines'} sont du sommeil (du temps bien employé)`),
        ...(phone ? [s(' et '), b(phone), s(' sur ton téléphone')] : []),
        s(', ce qui laisse environ '),
        b(free),
        s(phone ? ' éveillé·e et loin de ton téléphone.' : ' éveillé·e.'),
      ],
      health: (unit, med, lo, hi) => [
        s(' Environ '),
        b(med),
        s(` d’entre ${unit === 'years' ? 'eux' : 'elles'} seront probablement en bonne santé, fort et autonome : la bande verte, qui s’estompe là où les gens diffèrent (pour la plupart des gens comme toi, ${lo}–${hi} ${unit === 'years' ? 'ans' : 'semaines'}).`),
      ],
    },
    legend: {
      lived: 'Vécu',
      now: 'Maintenant',
      likely: 'Probablement à venir',
      reach: 'À ta portée',
      maybe: 'Si la chance le permet',
      asleep: 'Sommeil',
      phone: 'Sur ton téléphone',
      healthy: 'Probablement en bonne santé',
    },
    shows: { all: 'Tout', awake: 'Éveillé', free: 'Hors téléphone' },
    showA11y: 'Afficher le temps à venir',
    whatIf: 'Et si… touche pour essayer',
    whatIfA11y: (label, years, healthy) => `Et si : ${label}, environ ${years} ans, dont ${healthy} de plus en bonne santé`,
    whatIfYears: (years) => `+${years} a`,
    weeksAhead: 'Tes semaines à venir',
    weeksUnit: 'semaines',
    bar: { free: 'éveillé, hors téléphone', phone: 'sur ton téléphone', sleep: 'sommeil' },
    barLever: (label) => label.toLowerCase(),
    triedTotal: (several, weeks, years, capped) => [
      s(several ? 'Ensemble, environ ' : 'Environ '),
      b(`${weeks} semaines de plus`),
      s(` (${years} ans)`),
      s(several ? ` : moins que la somme, car les effets des habitudes se recoupent${capped ? ', et plafonné' : ''}.` : '.'),
    ],
    triedOne: (label, years, healthy) => `${label} : environ ${years} ans à lui seul, ${healthy} en bonne santé`,
    triedHealthy: (years) => [s(' La bande verte s’allonge d’environ '), b(`${years} ans en bonne santé`), s('.')],
    tapWhatIf: 'Touche un « Et si » sur le calendrier pour voir ce qu’un changement pourrait ajouter.',
    makePlan: 'Faire un petit plan',
    makePlanA11y: (label) => `Faire un petit plan pour : ${label}`,
    onePlanAtATime: (sentence) => `Un petit plan à la fois : celui-ci remplacerait « ${sentence} »`,
    tablesFor: (country) => `À partir des tables de mortalité : ${country}.`,
    tablesUS: 'À partir d’une approximation des tables de mortalité américaines.',
    changeCountry: 'Changer de pays',
    setCountry: 'Choisir ton pays',
    phoneTitle: 'Ton téléphone',
    phoneLine: (hours, years, share) => [
      s(`${hours} heures par jour, c’est environ `),
      b(`${years} ans`),
      s(` du temps qu’il te reste probablement : ${share} de tes heures éveillées.`),
    ],
    phoneSwap: (swap) =>
      `Une demi-heure de moins par jour pourrait devenir ${swap}. Dans des expériences, réduire les réseaux sociaux a donné plus de temps avec la famille et les amis, et moins de solitude.`,
    phoneAsk:
      'Combien d’heures par jour passes-tu sur ton téléphone ? Tes réglages Temps d’écran ou Bien-être numérique affichent la moyenne quotidienne.',
    habitsTitle: 'Tes habitudes',
    habitsNeutral: 'Tes habitudes te gardent proche de l’estimation de base.',
    habitsEffect: (adds, years) => [s(`Tes habitudes ${adds ? 'ajoutent' : 'coûtent'} environ `), b(`${years} ans`), s('.')],
    withinReach: 'À ta portée',
    moreWeekends: (n) => `environ ${n} week-ends de plus`,
    together: (several, gain, capped) => [
      s(several ? 'Ensemble, environ ' : 'Cela fait environ '),
      b(`${gain} ans de plus`),
      s(`${capped ? ' (plafonné : les effets des habitudes se recoupent)' : ''}. Essaie-les sur le calendrier avec « Et si ».`),
    ],
    allGood: 'Tu fais déjà ce qui ajoute le plus de temps. Continue, et garde tes proches près de toi.',
    healthy: {
      eyebrow: 'Fort et autonome',
      years: (med, lo, hi) => [
        s('Environ '),
        b(`${med} de ces années`),
        s(` seront probablement en bonne santé : fort, stable et autonome. Pour la plupart des gens comme toi, ${lo}–${hi}.`),
      ],
      later:
        'Les dernières années apportent souvent plus de douleurs et de maladies, et on s’appuie un peu plus sur son entourage. Combien, et à quel moment, dépend en partie de toi.',
      lever: (label, years, why) => [
        s(`${label} pourrait en ajouter environ `),
        b(`${years}`),
        s(why === 'strength' ? ' : des jambes plus fortes, un meilleur équilibre, moins de chutes.' : why === 'more' ? ', plus qu’à ta durée de vie.' : '.'),
      ],
      allGood: 'Tu fais déjà ce qui garde les gens forts le plus longtemps. Continue, et garde tes proches près de toi.',
      askStrength: 'Fais-tu du renforcement ? Ajoute ta réponse',
      sourceHealthy: 'Années en bonne santé',
      sourceHabits: 'Habitudes',
    },
  },

  share: {
    half: 'environ la moitié',
    third: 'environ un tiers',
    quarter: 'environ un quart',
    seventh: 'environ un septième',
    pct: (p) => `${p} %`,
  },
  swap: {
    dog: (name, walks) => `une promenade quotidienne avec ${name} : environ ${walks} promenades de plus`,
    dinners: (n, person) =>
      `environ ${n} dîners de deux heures par an ${person ? `avec ${person} ou des amis` : 'avec tes amis et ta famille'}`,
  },

  habitsScreen: {
    eyebrow: 'Ce qui dépend de toi',
    title: 'Change une habitude, change le compte',
    median: (country) =>
      `âge médian pour quelqu’un qui vit comme toi${country ? ` (${country})` : ''}. Touche une option pour voir ce qu’elle changerait.`,
    whatMatters: 'CE QUI COMPTE LE PLUS',
    ranked: 'Classé selon l’ampleur et la solidité des preuves. Touche une ligne pour voir les chiffres et la source.',
    exerciseReplaced: 'Remplacé par tes pas quotidiens ci-dessus, pour ne rien compter deux fois.',
    youNow: 'toi maintenant',
    noChange: 'aucun changement',
    stepsHeading: 'PAS PAR JOUR',
    stepsA11y: 'Nombre moyen de pas par jour',
    stepsAnswer: (n) => `${n} pas par jour`,
    math1: (n) => `1 · Moyenne : ${n} pas par jour`,
    math2: (hr) => `2 · Risque par rapport à 6 000 pas : × ${hr}`,
    math3: (hr, b) => `3 · Années ≈ ln(1 ÷ ${hr}) ÷ ${b} = `,
    math4: '4 · Remplace ta réponse sur le sport ; le bénéfice plafonne à 10 000.',
    useExercise: 'Utiliser plutôt ma réponse sur le sport',
    stepsHint:
      'Touche + ou − pour utiliser tes pas au lieu de ta réponse sur le sport. L’app santé de ton téléphone affiche ta moyenne.',
    inEstimate: 'Fait partie de ton estimation.',
    notInEstimate: 'Pas encore dans ton estimation ; indiqué à titre d’orientation.',
    howItWorks: 'COMMENT FONCTIONNE TON ESTIMATION',
    strength: { strong: 'solide', moderate: 'modérée', emerging: 'émergente' },
    healthspan: 'RESTER FORT ET AUTONOME',
    healthspanNote: 'Ce qui garde les dernières années en bonne santé : la bande verte de ton calendrier Vie. Touche une ligne pour voir les chiffres et la source.',
    strengthNote: (years) =>
      `Son plus grand effet est de te garder fort et autonome : deux fois par semaine pourrait ajouter environ ${years} ans en bonne santé.`,
    strengthKeep: 'Deux fois par semaine te garde plus fort et plus stable plus longtemps. Continue.',
  },

  evidence: {
    smoking: {
      title: 'Ne pas fumer',
      summary: 'Le plus grand levier à lui seul. Arrêter aide à tout âge.',
      detail: 'Fumer double à peu près le risque annuel de mourir (×2,2 dans cette app). Après l’arrêt, il redescend vers ×1,3.',
    },
    moving: {
      title: 'Bouger plus, rester en forme',
      summary: 'Le risque continue de baisser jusqu’à 8 000–10 000 pas par jour avant 60 ans, 6 000–8 000 après.',
      detail:
        'Sur 15 cohortes (47 471 adultes), plus de pas quotidiens allaient avec une mortalité plus faible jusqu’à ces niveaux. La forme cardiorespiratoire est l’un des meilleurs prédicteurs de survie, sans limite supérieure de bénéfice observée.',
    },
    relationships: {
      title: 'Des relations proches',
      summary: 'L’isolement et la solitude sont liés à un risque de mort précoce plus élevé d’environ 26–32 %, comparable au tabac ou à l’obésité.',
      detail:
        'Sur 70 études (3,4 millions de personnes), l’isolement social, la solitude et le fait de vivre seul augmentaient chacun le risque de mort précoce d’environ un quart à un tiers. Une revue antérieure de 148 études a trouvé que des liens forts allaient avec des chances de survie environ 1,5 fois plus élevées. Dans une étude de Harvard sur 85 ans, la satisfaction relationnelle à 50 ans prédisait la santé à 80 ans mieux que le cholestérol.',
    },
    diet: {
      title: 'Ce que tu manges',
      summary: 'Plus de légumineuses, de céréales complètes et de noix ; moins de viande rouge et transformée.',
      detail:
        'Passer durablement d’une alimentation occidentale typique à une alimentation optimale est lié à 10–13 années de plus si c’est fait à 20 ans, environ 8 à 60 ans et plus de 3 à 80 ans. Une étude de modélisation : des moyennes de population, pas des prévisions individuelles.',
    },
    weight: {
      title: 'Poids et tension artérielle sains',
      summary: 'Tous deux favorisent les maladies cardiaques, première cause de décès.',
      detail:
        'Un poids sain fait partie des cinq habitudes qui, ensemble, étaient liées à 12–14 années de plus à 50 ans, et à environ 8–11 années de plus sans cancer, maladie cardiaque ni diabète.',
    },
    strength: {
      title: 'Renforcement musculaire',
      summary: '30 à 60 minutes par semaine sont liées à une mortalité de 10 à 17 % plus faible, et à rester fort et autonome plus longtemps.',
      detail:
        'En plus de l’exercice aérobie, pas à sa place ; au-delà d’environ une heure par semaine, le bénéfice est incertain. Son plus grand effet porte sur les dernières années : le travail de force et d’équilibre signifie moins de chutes et moins d’incapacité (voir « Rester fort et autonome »). Dans cette appli, deux fois par semaine compte ×0,85 sur le risque de décès et ×0,82 sur le risque de perdre la bonne santé.',
    },
    purpose: {
      title: 'Un sens à sa vie',
      summary: 'Lié à une mortalité plus faible d’environ 17 % et à moins d’infarctus et d’AVC.',
      detail:
        'Sur 10 études (136 265 personnes) aux États-Unis et au Japon, où on l’appelle ikigai : « une vie qui vaut la peine d’être vécue ». L’optimisme montre un schéma similaire.',
    },
    sleep: {
      title: 'Dormir 7 à 8 heures',
      summary: 'Moins d’environ 6 heures est lié à une mortalité plus élevée de 12 %.',
      detail: 'Un sommeil très long montre aussi un risque plus élevé, mais c’est surtout un signe de maladie plutôt qu’une cause.',
    },
    alcohol: {
      title: 'Boire peu',
      summary: 'Boire un peu ne protège pas ; le risque augmente à partir d’environ 2 verres par jour pour les femmes, 3 pour les hommes.',
      detail:
        'Une méta-analyse de 107 cohortes (4,8 millions de personnes) n’a trouvé aucune mortalité plus faible chez les petits buveurs que chez les personnes n’ayant jamais bu.',
    },
    helping: {
      title: 'Aider les autres',
      summary: 'Le bénévolat plus tard dans la vie est lié à une mortalité plus faible de 24 %.',
      detail: 'Après ajustement sur la santé, dans 14 études d’adultes de 55 ans et plus.',
    },
    scrolling: {
      title: 'Moins d’écran, plus de gens',
      summary: 'Dans des expériences, réduire les réseaux sociaux a donné plus de temps avec la famille et les amis, et moins de solitude.',
      detail:
        'Désactiver Facebook pendant 4 semaines a amélioré le bien-être et le temps hors ligne avec les amis et la famille. Limiter les réseaux sociaux à environ 30 minutes par jour pendant 3 semaines a réduit la solitude et la dépression.',
    },
    healthyHabits: {
      title: 'De bonnes habitudes ajoutent des années en bonne santé',
      summary: 'À 50 ans, 4 à 5 bonnes habitudes allaient avec environ 10,7 (femmes) et 7,6 (hommes) années de plus sans cancer, maladie cardiaque ni diabète.',
      detail:
        'Dans deux grandes cohortes de Harvard, le total d’années a augmenté presque autant (+9,4 femmes, +8,1 hommes) : presque tout le temps gagné était du temps en bonne santé, et les années vécues avec la maladie ont à peine changé. Les habitudes : ne pas fumer, poids sain, 30 minutes ou plus d’activité par jour, boire peu ou pas, bien manger. L’appli fait bouger tes années en bonne santé avec tes habitudes.',
    },
    falls: {
      title: 'L’exercice prévient les chutes',
      summary: 'L’exercice a réduit les chutes chez les personnes âgées de 23 % ; les programmes avec force et équilibre, d’environ un tiers.',
      detail:
        'Revue Cochrane de 108 essais (23 407 personnes de plus de 60 ans vivant chez elles). Rapport de taux global 0,77 (preuves de haute certitude) ; équilibre et exercices fonctionnels 0,76 ; plusieurs types ensemble, le plus souvent équilibre et force, 0,66 (certitude modérée).',
    },
    mobility: {
      title: 'Continuer à marcher seul',
      summary: 'Dans un essai avec 1 635 personnes de 70 à 89 ans, la marche avec du travail de force et d’équilibre a réduit de 18 % l’incapacité grave à se déplacer.',
      detail:
        'L’essai LIFE : un programme modéré et structuré (marche, force, souplesse, équilibre) contre une éducation à la santé, sur 2,6 ans. Perdre la capacité de marcher 400 m : 30,1 % contre 35,5 % (HR 0,82). Un seul grand essai d’un programme combiné : la part due à la force seule est inconnue. L’appli utilise 0,82 pour le renforcement deux fois par semaine.',
    },
    grip: {
      title: 'Force de préhension',
      summary: 'Les plus de 60 ans à la poigne faible avaient environ 1,8× plus de risques de perdre leur autonomie physique, et de mourir, pendant le suivi.',
      detail:
        'Méta-analyse de 34 études de personnes de 60 ans et plus vivant chez elles : rapport combiné de 1,78 pour le déclin physique et de 1,79 pour la mortalité, poigne faible contre forte. La poigne est un marqueur de la force générale ; c’est observationnel, donc cela montre qui est à risque plus que quoi faire, mais la force se garde en l’entraînant.',
    },
  },

  howItWorks: [
    'Le risque annuel de mourir augmente avec l’âge pour tout le monde, doublant à peu près tous les 7 ans. Nous partons de cette courbe pour ton sexe dans ton pays, ajustée à sa table de mortalité de l’ONU (World Population Prospects 2024, décès de 2023). Sans pays, nous utilisons une approximation des tables américaines.',
    'Tes habitudes multiplient ce risque : tabac ×2,2, sport 3 fois par semaine ×0,85, moins de 6 heures de sommeil ×1,15, voir rarement tes proches ×1,29, et ainsi de suite.',
    'Nous suivons ce risque mois après mois à partir de ton âge actuel. L’âge auquel la moitié des personnes comme toi sont décédées est ta médiane ; les repères de 25 % et 75 % donnent ta fourchette.',
    'Règle simple : années ≈ ln(multiplicateur de risque) ÷ 0,085. C’est pourquoi doubler ton risque coûte environ 8 ans, et pourquoi arrêter de fumer peut en rendre environ 9.',
    'Plusieurs changements ensemble ajoutent moins que leur somme, et nous plafonnons le total à 14 ans, le plus grand écart toutes habitudes confondues trouvé dans une grande étude américaine.',
    'Les années en bonne santé partent de l’espérance de vie en bonne santé de ton pays (OMS, 2023) : la part des années à venir que les gens de ton âge passent en bonne santé. Nous regroupons le temps moins sain à la fin, où il se concentre surtout : cela donne une bande qui s’estompe, pas une date.',
    'Les habitudes font bouger les années en bonne santé à peu près autant que le total, comme dans une grande étude de Harvard, et le renforcement encore plus : il garde fort, stable et autonome. Le même plafond de 14 ans s’applique.',
    'Ce sont des associations tirées d’études de population, pas des causes, et pas un avis médical.',
  ],

  claims: {
    lifeTables: 'Tables de mortalité de 237 pays et territoires, par sexe, estimations pour 2023.',
    plans:
      'Décider quand et où tu feras quelque chose, sous forme de « si… alors », rend le passage à l’acte bien plus probable (94 études).',
    freshStart: 'On se lance plus volontiers dans un objectif au début d’une semaine, d’un mois ou à un anniversaire : un nouveau départ.',
    comingBack:
      'Dans le plus grand test d’incitations au sport (61 293 personnes), ce qui a le plus aidé, c’est de récompenser le retour après une séance manquée.',
    personalNumbers:
      'Voir ses propres chiffres peut aider : les fumeurs à qui l’on a donné leur « âge pulmonaire » ont été deux fois plus nombreux à arrêter en un an (13,6 % contre 6,4 %).',
    walkAfterMeals: 'Quelques minutes de marche légère après un repas ont fait baisser la glycémie d’environ 17 % par rapport à rester assis.',
  },

  plans: {
    everyDay: 'Tous les jours',
    weekdays: 'En semaine',
    weekends: 'Le week-end',
    days: (days) => {
      const names = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
      const short = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];
      if (days.length === 1) return `Le ${names[days[0]]}`;
      if (days.length === 2) return `Le ${names[days[0]]} et le ${names[days[1]]}`;
      return `Le ${list(days.map((d) => short[d]))}`;
    },
    time: (h, m) => `${h}h${String(m).padStart(2, '0')}`,
    cue: (days, anchor, time) => `${days} ${anchor ?? `à ${time}`}`,
    sentence: (cue, action) => `${cue}, je vais ${action}.`,
    nameInSentence: (name) => name.replace(/^Mon /, 'mon ').replace(/^Ma /, 'ma ').replace(/^Mes /, 'mes '),
    today: 'aujourd’hui',
    tomorrow: 'demain',
    anchors: {
      breakfast: 'après le petit-déjeuner',
      lunch: 'après le déjeuner',
      work: 'après le travail',
      dinner: 'après le dîner',
      morning: 'le matin',
      cigarette: 'quand j’ai envie d’une cigarette',
      atLunch: 'au déjeuner',
      coffee: 'après mon café du matin',
    },
    call: (name) => `appeler ${name}`,
    messageOrCall: (name) => `écrire ou appeler ${name}`,
    actions: {
      walk: 'faire une marche de 10 minutes',
      connect: 'appeler ou voir quelqu’un que j’aime',
      bed: 'poser mon téléphone et me préparer à dormir',
      smoke: 'marcher 5 minutes d’abord',
      drink: 'boire d’abord un verre d’eau pétillante',
      plate: 'remplir la moitié de mon assiette de légumes',
      strength: 'faire 10 minutes de squats, de pompes et de port de charges',
    },
    withAnchor: (action, anchor) => `${action} ${anchor}`,
    capitalize: (s) => s.charAt(0).toUpperCase() + s.slice(1),
    periodWeek: 'cette semaine',
    periodBirthday: 'ta nouvelle année',
    calendarNote: 'En manquer un, ce n’est pas grave : reprends simplement la fois suivante. De la part de Memento Mori.',
    when: 'QUAND',
    daysA11y: 'Jours',
    atSetTime: 'à heure fixe',
    anchorPlaceholder: 'ou avec tes mots : en rentrant à la maison',
    anchorA11y: 'Le moment qui te le rappelle, avec tes mots',
    around: 'Vers (pour les rappels)',
    at: 'À',
    timeA11y: 'Heure',
    iWill: 'JE VAIS',
    actionPlaceholder: 'appeler Maman',
    actionA11y: 'Ce que tu vas faire',
    save: 'Enregistrer le plan',
    cancel: 'Annuler',
    planReachOut: 'Prévoir quand prendre des nouvelles',
    planReachOutA11y: (name) => `Prévoir quand prendre des nouvelles de ${name}`,
    yourPlan: 'Ton plan',
    edit: 'Modifier',
    removeA11y: 'Retirer ce plan',
    addToCalendar: 'Ajouter à mon agenda',
    calendarSaved: 'Enregistré : ouvre-le pour l’ajouter ✓',
    addToCalendarA11y: (title) => `Ajouter « ${title} » à ton agenda comme événement récurrent`,
  },

  thisWeek: {
    heading: 'Cette semaine',
    doneToday: 'fait aujourd’hui ✓',
    doneThisWeek: 'fait cette semaine ✓',
    next: (when) => `prochaine fois : ${when}`,
    welcomeBack: (name) =>
      `Bon retour${name ? `, ${name}` : ''}. Les plans glissent pour tout le monde, et ce n’est pas grave : ce qui compte, c’est d’en reprendre un. Cette semaine est une page blanche.`,
    oneThingFor: (period) => `Une chose pour ${period}`,
    doneMark: ' · fait ✓',
    did: 'Fait',
    didToday: 'Fait aujourd’hui ✓',
    moreVisits: (n, name) => `Environ ${n} visites de plus avec ${name} à ton rythme actuel.`,
    smallStep: (label, years) => `${label} pourrait ajouter environ ${years} ans. C’est un petit pas dans ce sens.`,
    noPlans:
      'Pas encore de plan. Un plan, c’est un petit « quand, alors » : « Le dimanche après le déjeuner, je vais appeler Maman. » Tu peux en faire un pour n’importe qui dans Amours, ou pour une habitude dans Vie.',
    suggestHeading: 'Un plan à essayer',
    suggestPerson: (n, name) =>
      `Environ ${n} visites de plus avec ${name} à ton rythme actuel. Un plan rend la prochaine plus probable.`,
    suggestLever: (label, years) => `${label} pourrait ajouter environ ${years} ans. Un petit plan est une façon de commencer.`,
    whyPlans: 'Pourquoi les plans aident',
    makeItMine: 'En faire mon plan',
    changeIt: 'Le modifier',
    notNow: 'Pas maintenant',
  },

  freshStart: {
    eyebrow: { week: 'Lundi · un nouveau départ', month: 'Le 1er · un nouveau départ', birthday: 'Ton anniversaire · un nouveau départ' },
    title: (period) => `Une chose pour ${period} ?`,
    birthday: (name, weeks) =>
      `Joyeux anniversaire${name ? `, ${name}` : ''}. Tu as vécu environ ${weeks} semaines, dont certaines merveilleuses. Quelle chose pourrais-tu faire de l’année qui commence ?`,
    prompt: (week, month) =>
      `Quelle chose pourrais-tu faire ${week ? 'cette semaine' : `en ${month}`} que tu serais content·e d’avoir faite ?`,
    callIdea: (name) => `Appeler ${name}`,
    gratitudeIdea: 'Écrire à quelqu’un envers qui je suis reconnaissant·e',
    useIdea: (idea) => `Utiliser l’idée : ${idea}`,
    ownPlaceholder: 'ou la tienne',
    a11y: (period) => `Une chose pour ${period}`,
    choose: 'En faire ma chose',
    notToday: 'Pas aujourd’hui',
  },

  todaysCount: {
    pet: 'Une promenade ou un moment calme ensemble aujourd’hui ?',
    activity: 'Pourrais-tu choisir un jour pour la prochaine fois ? Décider quand la rend plus probable.',
    agency: (label, years, more, what) => [
      s(`${label} pourrait ajouter environ `),
      b(`${years} ans`),
      s(' : environ '),
      b(more),
      s(` ${what}. Tu peux l’essayer sur le calendrier de Vie.`),
    ],
  },

  loves: {
    per: PER,
    pace: (count, per) => `${count} fois ${PER[per]}`,
    reasonBoth: (pace) => `${pace}, sur les années que vous avez probablement tous les deux`,
    reasonUntil: (pace, age) => `${pace}, jusqu’à tes ${age} ans`,
    reasonLife: (pace) => `${pace}, pour le reste de ta vie`,
    moreWith: (unit, name) => `${UNIT[unit]} de plus avec ${name}`,
    moreTimes: (activity) => `fois de plus : ${activity.toLowerCase()}`,
    aboutMore: (n, unit) => [s('environ '), b(n), s(` ${UNIT[unit]} de plus`)],
    since: {
      today: 'aujourd’hui',
      yesterday: 'hier',
      days: (n) => `il y a ${n} jours`,
      months: (n) => `il y a ${n} mois`,
    },
    suggestPeople: {
      mom: 'Maman',
      dad: 'Papa',
      friend: 'Mon meilleur ami',
      grandma: 'Ma grand-mère',
      dog: 'Mon chien',
      cat: 'Mon chat',
    },
    suggestActivities: {
      soccer: 'Jouer au foot',
      movies: 'Aller au cinéma',
      read: 'Lire un livre',
      travel: 'Découvrir un nouvel endroit',
      cook: 'Cuisiner pour des amis',
    },
    eyebrow: 'Ce que tu aimes',
    title: 'Combien de fois encore ?',
    sub: 'À ton rythme actuel, sur la vie qu’il te reste probablement.',
    empty: 'Rien ici pour l’instant. Ajoute quelqu’un qui t’aime, ou quelque chose que tu aimes faire.',
    addHeading: 'AJOUTER',
    addToA11y: 'Ajouter à',
    groups: { who: 'Qui t’aime', what: 'Ce que tu aimes' },
    cardA11y: (n, label, reason) => `Environ ${n} ${label}. ${reason}.`,
    kinds: { person: 'Personne', pet: 'Animal' },
    species: { dog: 'Chien', cat: 'Chat' },
    personOrPet: 'Personne ou animal',
    kindOfPet: 'Type d’animal',
    useSuggestion: (name) => `Utiliser la suggestion : ${name}`,
    whoA11y: 'Qui',
    whatA11y: 'Quoi',
    petPlaceholder: 'Max, Luna…',
    personPlaceholder: 'Maman, mon/ma partenaire, Sam…',
    activityPlaceholder: 'Jouer au foot, lire, voyager…',
    howOftenSee: 'À quelle fréquence tu les vois',
    howOftenDo: 'À quelle fréquence tu le fais',
    fewer: 'Moins',
    times: () => 'fois',
    perA11y: 'Par',
    theirAge: 'Son âge (facultatif)',
    petAge: 'Son âge en années (facultatif)',
    untilAge: 'Jusqu’à quel âge ? (facultatif)',
    phoneA11y: 'Téléphone (facultatif)',
    phonePlaceholder: 'Téléphone (facultatif, pour Appeler et Message)',
  },

  reach: {
    lastTime: (since) => `Dernière fois que vous vous êtes parlé ou vus : ${since}.`,
    hint: 'Touche « On s’est parlé » après un appel ou une visite pour garder le fil.',
    claim: 'Les gens apprécient qu’on prenne de leurs nouvelles plus qu’on ne le pense, surtout après un moment.',
    message: 'Message',
    call: 'Appeler',
    weTalked: 'On s’est parlé',
    logged: 'Noté ✓',
    logA11y: (name) => `Noter que tu as parlé avec ${name} aujourd’hui`,
    openers: [
      'Je pense à toi. Libre pour dîner cette semaine ?',
      'Coucou ! Ça fait trop longtemps. On s’appelle ce week-end ?',
      'Je voulais juste te dire que je t’aime.',
      'Je me suis souvenu d’un truc drôle sur nous aujourd’hui. On se voit quand ?',
      'Ne laissons pas passer un mois de plus. Un café bientôt ?',
    ],
  },

  today: {
    reachOut: 'Prends des nouvelles aujourd’hui',
    moreVisits: (n) => [s('Environ '), b(n), s(' visites de plus à ton rythme actuel. Un message prend une minute.')],
    isolation:
      'Les personnes qui restent proches des autres vivent plus longtemps : l’isolement et la solitude sont liés à un risque de mort précoce plus élevé d’environ 26–32 %.',
    connectionLever: (years) => `Pour toi, voir tes proches chaque semaine pourrait ajouter environ ${years} ans.`,
    connectionOften: 'Voir tes proches chaque semaine fait déjà partie de ton estimation. Continue.',
    noPerson:
      'Les relations proches sont parmi les meilleurs prédicteurs d’une vie longue et en bonne santé. Qui aimerais-tu voir plus souvent ?',
    addSomeone: 'Ajouter quelqu’un qui t’aime',
    noneLogged: 'Aucun appel ni visite noté ces 30 derniers jours.',
    peopleThisMonth: (n) => `Ces 30 derniers jours, tu as parlé avec ou vu ${n} des personnes que tu aimes.`,
  },

  daily: {
    quotes: [
      ['N’agis pas comme si tu avais dix mille ans à vivre. Tant que tu vis, tant que cela est en ton pouvoir, sois bon.', 'Marc Aurèle · Pensées IV.17'],
      ['Pendant qu’on remet à plus tard, la vie passe.', 'Sénèque · Lettres 1'],
      ['Considère-toi comme mort. Tu as vécu ta vie. Prends maintenant ce qui reste et vis-le comme il faut.', 'Marc Aurèle · Pensées VII.56'],
      ['Préparons notre âme comme si nous étions arrivés au terme de la vie. Ne remettons rien à plus tard.', 'Sénèque · Lettres 101'],
      ['Ce n’est pas que nous ayons peu de temps à vivre, c’est que nous en perdons beaucoup.', 'Sénèque · De la brièveté de la vie'],
      ['Aie chaque jour la mort devant les yeux, et tu n’auras jamais de pensée basse.', 'Épictète · Manuel 21'],
      ['Chacun ne vit que l’instant présent. Tout le reste est passé ou incertain.', 'Marc Aurèle · Pensées III.10'],
      ['Commence dès maintenant à vivre, et compte chaque jour comme une vie à part.', 'Sénèque · Lettres 101'],
      ['Tu pourrais quitter la vie à l’instant. Que cela règle ce que tu fais, dis et penses.', 'Marc Aurèle · Pensées II.11'],
      ['Nul n’est libre s’il n’est maître de lui-même.', 'Épictète · Fragments'],
    ],
    questions: [
      'Qu’est-ce qui rendrait cette journée précieuse ?',
      'Qui mérite toute ton attention aujourd’hui ?',
      'Que repousses-tu que tu regretterais de ne jamais avoir fait ?',
      'Qu’est-ce qui dépend de toi aujourd’hui, et qu’est-ce qui n’en dépend pas ?',
      'Si c’était ton dernier {day} ordinaire, que garderais-tu tel quel ?',
      'Que ferais-tu aujourd’hui si tu n’avais pas peur ?',
      'De quoi peux-tu te détacher aujourd’hui ?',
      'Pour quoi veux-tu qu’on se souvienne de toi, et cette journée t’en a-t-elle rapproché·e ?',
    ],
    loveSub: (pace) => `À ${pace}, sur le temps que tu as probablement.`,
    weekends: { what: 'week-ends de plus', sub: 'Chacun est un samedi et un dimanche à vivre avec intention.' },
    summers: { what: 'étés de plus', sub: 'Longues soirées. Nuits chaudes. Pas illimités.' },
    moons: { what: 'pleines lunes de plus', sub: 'Sors regarder la prochaine.' },
    lived: { what: 'week-ends déjà vécus', sub: 'Certains étaient merveilleux. Sois reconnaissant·e pour ceux-là, et fais de la place pour d’autres.' },
  },

  opening: {
    lookBack: 'Regarder en arrière',
    todaysCount: 'Le compte du jour',
    today: 'Aujourd’hui',
    agency: (label, years, more, what) => [
      s(`${label} pourrait ajouter environ `),
      b(`${years} ans`),
      s('. Cela fait environ '),
      b(more),
      s(` ${what}.`),
    ],
    tapToSee: 'Touche pour voir ta vie',
    cardOf: (i, n) => `Carte ${i} sur ${n}`,
    seeLife: 'Voir ta vie',
    next: 'Suivant',
  },

  account: {
    title: 'Toi',
    edit: 'Modifier tes réponses',
    dataHeading: 'TES DONNÉES',
    dataBody:
      'Tout ce que tu saisis reste sur cet appareil. Pas de compte, pas de pub, pas de pistage. Ton estimation est calculée ici même, sur ton téléphone ou dans ton navigateur.',
    guestNote: (guest) =>
      `Tu as aussi un ${guest ? 'compte invité' : 'compte connecté'} d’un test précédent. Il ne contient qu’un profil vide ; la suppression ci-dessous t’en déconnecte.`,
    confirm:
      'Cela efface tes réponses, les personnes et les choses que tu aimes, et tout le reste sur cet appareil. C’est irréversible.',
    yesDelete: 'Oui, tout effacer',
    keep: 'Garder mes données',
    deleteAll: 'Tout effacer sur cet appareil',
    signOutFailed: 'Impossible de se déconnecter.',
    disclaimer:
      'Les estimations viennent d’études de population. Elles indiquent une direction et un ordre de grandeur, pas une promesse, et ne sont pas un avis médical.',
  },
};
