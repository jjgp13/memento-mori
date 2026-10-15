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
  },

  levers: {
    smoke: 'Arrêter de fumer',
    exercise: 'Faire du sport 3 fois par semaine',
    bmi: 'Atteindre un poids sain',
    alcohol: 'Boire moins',
    sleep: 'Dormir 6 à 9 heures',
    connection: 'Voir tes proches chaque semaine',
    steps: 'Marcher 10 000 pas par jour',
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
    range: (med, q25, q75) =>
      `C’est une fourchette, pas une date : la moitié des personnes qui vivent comme toi atteignent ${med} ans, et la plupart se situent entre ${q25} et ${q75} ans. Pas un avis médical.`,
    seeLife: 'Voir ta vie',
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
    eyebrow: (name) => (name ? `${name}, aujourd’hui` : 'Aujourd’hui'),
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
    },
    legend: { lived: 'Vécu', now: 'Maintenant', likely: 'Probablement à venir', reach: 'À ta portée', maybe: 'Si la chance le permet' },
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
      s(`${capped ? ' (plafonné : les effets des habitudes se recoupent)' : ''}. Ce sont les cercles bronze ci-dessous.`),
    ],
    allGood: 'Tu fais déjà ce qui ajoute le plus de temps. Continue, et garde tes proches près de toi.',
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
    median: 'âge médian pour quelqu’un qui vit comme toi. Touche une option pour voir ce qu’elle changerait.',
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
      title: 'Le renforcement musculaire',
      summary: '30 à 60 minutes par semaine sont liées à une mortalité plus faible de 10–17 %.',
      detail: 'En plus de l’exercice aérobie, pas à la place. Les bénéfices au-delà d’environ une heure par semaine sont incertains.',
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
  },

  howItWorks: [
    'Le risque annuel de mourir augmente avec l’âge pour tout le monde, doublant à peu près tous les 8 ans. Nous partons de cette courbe pour ton sexe, une approximation des tables de mortalité américaines.',
    'Tes habitudes multiplient ce risque : tabac ×2,2, sport 3 fois par semaine ×0,85, moins de 6 heures de sommeil ×1,15, voir rarement tes proches ×1,29, et ainsi de suite.',
    'Nous suivons ce risque mois après mois à partir de ton âge actuel. L’âge auquel la moitié des personnes comme toi sont décédées est ta médiane ; les repères de 25 % et 75 % donnent ta fourchette.',
    'Règle simple : années ≈ ln(multiplicateur de risque) ÷ 0,085. C’est pourquoi doubler ton risque coûte environ 8 ans, et pourquoi arrêter de fumer peut en rendre environ 9.',
    'Plusieurs changements ensemble ajoutent moins que leur somme, et nous plafonnons le total à 14 ans, le plus grand écart toutes habitudes confondues trouvé dans une grande étude américaine.',
    'Ce sont des associations tirées d’études de population, pas des causes, et pas un avis médical.',
  ],

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
