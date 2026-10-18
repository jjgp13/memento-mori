/** Deutsch: Du-Form, ruhig und warm. Substantive behalten ihre Großschreibung. */
import { b, s } from '@/i18n/rich';
import type { Strings } from '@/i18n/strings/en';
import type { Per } from '@/lib/loves';

type Unit = 'visits' | 'days' | 'times';

const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);

/** "a, b und c" */
const list = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} und ${xs.at(-1)}`);

const PER: Record<Per, string> = { day: 'pro Tag', week: 'pro Woche', month: 'pro Monat', year: 'pro Jahr' };
const UNIT: Record<Unit, string> = { visits: 'Besuche', days: 'Tage', times: 'Male' };

export const de: Strings = {
  common: {
    back: '← Zurück',
    close: 'Schließen',
    continue: 'Weiter',
    skip: 'Überspringen',
    skipForNow: 'Erst einmal überspringen',
    save: 'Speichern',
    done: 'Fertig',
    add: 'Hinzufügen',
    remove: 'Entfernen',
    removeA11y: (name) => `${name} entfernen`,
    less: 'Weniger',
    more: 'Mehr',
    you: 'Du',
    source: 'Quelle',
    why: 'Warum',
    theScience: 'Die Forschung',
    lifeTables: 'Sterbetafeln',
    sourceA11y: (prefix, label) => `${prefix}: ${label}, öffnet im Browser`,
    tickingSound: 'Ticken',
    clockTicking: 'Uhrticken',
    hoursValue: (h) => `${h} Std.`,
    yrs: (signed) => `${signed} J.`,
    years: (y) => `${y} Jahre`,
    notAdvice:
      'Die Schätzungen beruhen auf Bevölkerungsdurchschnitten und groben Risikoverhältnissen. Sie zeigen Richtung und ungefähre Größe, kein Versprechen, und sind keine medizinische Beratung.',
    list,
  },

  tabs: { life: 'Leben', habits: 'Gewohnheiten', loves: 'Liebe', today: 'Heute' },

  language: {
    heading: 'SPRACHE',
    note: 'Folgt der Sprache deines Geräts, bis du eine auswählst.',
    a11y: 'Sprache',
  },

  date: {
    months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    monthsShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    monthInitials: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    weekdayInitials: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
    weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    weekdaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    year: 'Jahr',
    month: 'Monat',
    day: 'Tag',
    decade: (d) => `${d}er`,
    hour: (h) => String(h),
  },

  habits: {
    smoke: {
      question: 'Rauchst du?',
      short: 'Rauchen',
      why: 'Der größte Hebel auf dieser Liste.',
      options: { never: 'Nie', former: 'Ich habe aufgehört', current: 'Ja' },
    },
    exercise: {
      question: 'Wie oft treibst du Sport?',
      short: 'Bewegung',
      why: 'Zügiges Gehen zählt.',
      options: { none: 'Selten', some: '1–2× pro Woche', regular: '3+× pro Woche' },
    },
    bmi: {
      question: 'Was beschreibt dein Gewicht?',
      short: 'Gewicht',
      why: 'Bereiche des Body-Mass-Index. Grob reicht.',
      options: { under: 'Untergewicht', normal: 'Gesund', over: 'Übergewicht', obese: 'Adipositas' },
    },
    alcohol: {
      question: 'Wie viel trinkst du?',
      short: 'Alkohol',
      why: 'Viel heißt etwa 15 oder mehr Getränke pro Woche.',
      options: { none: 'Wenig oder nichts', moderate: 'Mäßig', heavy: 'Viel' },
    },
    sleep: {
      question: 'Wie viel schläfst du?',
      short: 'Schlaf',
      why: 'In den meisten Nächten, nicht in deinen besten.',
      options: { short: 'Unter 6 Stunden', ok: '6–9 Stunden' },
    },
    connection: {
      question: 'Wie oft verbringst du Zeit mit Menschen, die dir nahestehen?',
      short: 'Verbundenheit',
      why: 'Persönlich oder in einem echten Gespräch. Enge Beziehungen gehören zu den stärksten Vorhersagen für ein langes Leben.',
      options: { often: 'Jede Woche', sometimes: 'Ein paar Mal im Monat', rarely: 'Selten; ich fühle mich oft allein' },
    },
  },

  levers: {
    smoke: 'Mit dem Rauchen aufhören',
    exercise: '3+ Mal pro Woche Sport treiben',
    bmi: 'Ein gesundes Gewicht erreichen',
    alcohol: 'Weniger trinken',
    sleep: '6–9 Stunden schlafen',
    connection: 'Jede Woche die Menschen sehen, die du liebst',
    steps: '10.000 Schritte am Tag gehen',
  },

  values: {
    family: 'Familie',
    partner: 'Mein Partner, meine Partnerin',
    friends: 'Freunde',
    health: 'Gesundheit',
    craft: 'Arbeit und Handwerk',
    learning: 'Lernen',
    creating: 'Gestalten',
    faith: 'Glaube und Geist',
    nature: 'Natur',
    adventure: 'Abenteuer',
    service: 'Anderen helfen',
    peace: 'Innere Ruhe',
  },

  onboarding: {
    welcomeEyebrow: 'Bedenke, dass du sterben wirst',
    welcomeLede:
      'Die Stoiker hielten sich den Tod vor Augen, um ihre Tage nicht zu vergeuden. Diese App zählt die Zeit, die du wahrscheinlich noch hast, damit das Heute das Gewicht bekommt, das es verdient, und richtet sie auf das aus, was du liebst.',
    welcomeNote: 'Ein paar kurze Fragen, eine nach der anderen. Deine Antworten bleiben auf diesem Gerät.',
    begin: 'Los geht’s',
    step: {
      you: 'Du',
      birth: 'Geburt',
      place: 'Ort',
      body: 'Körper',
      habits: 'Gewohnheiten',
      time: 'Deine Zeit',
      values: 'Was zählt',
      who: 'Wer dich liebt',
      what: 'Was du liebst',
    },
    nameQuestion: 'Wie sollen wir dich nennen?',
    nameA11y: 'Vorname',
    namePlaceholder: 'Dein Vorname',
    dobQuestion: 'Wann bist du geboren?',
    countryQuestion: 'Wo lebst du?',
    countryWhy:
      'Wo man lebt, prägt, wie lange Menschen leben: zwischen Ländern um 30 Jahre oder mehr. Wir starten mit den Sterbetafeln deines Landes.',
    countrySearch: 'Land suchen',
    countrySearchAgain: 'Woanders? Suchen',
    countryNone: 'Kein Land mit diesem Namen in den UN-Tafeln.',
    sexQuestion: 'Welches Geschlecht wurde dir bei der Geburt zugewiesen?',
    sexWhy: 'Im Durchschnitt leben Frauen etwa fünf Jahre länger als Männer.',
    sex: { m: 'Männlich', f: 'Weiblich' },
    phoneQuestion: 'Wie viele Stunden am Tag bist du am Handy?',
    phoneWhereIos:
      'Dein iPhone weiß es schon: Einstellungen → Bildschirmzeit → Alle App- & Website-Aktivitäten. Nimm den Tagesdurchschnitt.',
    phoneWhereAndroid: 'Dein Handy weiß es schon: Einstellungen → Digital Wellbeing. Nimm den Tagesdurchschnitt.',
    phoneWhereWeb:
      'Dein Handy weiß es schon. iPhone: Einstellungen → Bildschirmzeit. Android: Einstellungen → Digital Wellbeing. Nimm den Tagesdurchschnitt.',
    phoneA11y: 'Stunden pro Tag am Handy',
    phoneResult: (years, share) => [
      s('Über die Zeit, die du wahrscheinlich noch hast, sind das etwa '),
      b(`${years} Jahre`),
      s(`, ${share} deiner wachen Stunden.`),
    ],
    valuesQuestion: 'Was ist dir am wichtigsten?',
    valuesWhy: 'Wähle bis zu drei. Deine Erinnerungen führen dich immer wieder dorthin zurück.',
    peopleQuestion: 'Wer liebt dich, und wen liebst du?',
    peopleWhy:
      'Die Menschen (und Tiere), die du am meisten bereuen würdest, zu selten gesehen zu haben. Wir zählen, wie oft du sie wahrscheinlich noch siehst.',
    activitiesQuestion: 'Was machst du am liebsten?',
    activitiesWhy: 'Wir zählen, wie oft du es noch tun kannst.',
    computing: 'Wir zählen deine Wochen',
    computingNote: 'Deine Antworten werden zu Zeit.',
  },

  reveal: {
    eyebrow: (name) => (name ? `${name}, deine Zeit` : 'Deine Zeit'),
    about: 'Etwa',
    weeksRemain: 'Wochen bleiben wahrscheinlich',
    fullLife: (total, lived) =>
      `Ein ganzes Leben wie deins hat etwa ${total} Wochen. ${lived} davon hast du gelebt. Lass uns den Rest zählen lassen.`,
    person: (n, label) => [s('Das sind etwa '), b(n), s(` ${label}.`)],
    phone: (years, swap) => [
      s('Dein Handy nimmt davon etwa '),
      b(`${years} Jahre`),
      s(`. Eine halbe Stunde weniger am Tag könnte zu ${swap} werden.`),
    ],
    lever: (label, years, weekends) => [
      s(` ${label} könnte etwa `),
      b(`${years} Jahre`),
      s(` bringen, ungefähr ${weekends} Wochenenden mehr.`),
    ],
    values: (vals) =>
      `Du hast gesagt, ${list(vals)} ${plural(vals.length, 'ist', 'sind')} dir am wichtigsten. Wir führen dich immer wieder dorthin zurück.`,
    range: (med, q25, q75, country) =>
      `Das ist eine Spanne, kein Datum: Die Hälfte der Menschen, die so leben wie du${country ? ` (${country})` : ''}, wird ${med}, und die meisten landen zwischen ${q25} und ${q75}. Keine medizinische Beratung.`,
    seeLife: 'Dein Leben ansehen',
  },

  alive: {
    heading: 'Du lebst schon seit',
    summary: (days, years) => `Du lebst schon seit ${days} Tagen, etwa ${years} Jahren.`,
    units: {
      seconds: 'Sekunden',
      minutes: 'Minuten',
      hours: 'Stunden',
      days: 'Tagen',
      weeks: 'Wochen',
      months: 'Monaten',
      years: 'Jahren',
    },
  },

  life: {
    eyebrow: (name) => (name ? `${name} · wahrscheinlich verbleibende Zeit` : 'Wahrscheinlich verbleibende Zeit'),
    verdict: (age, med, left) => [
      s('Du bist '),
      b(age),
      s('. Die Hälfte der Menschen, die so leben wie du, wird '),
      b(String(med)),
      s('. Das lässt dir etwa '),
      b(`${left} Jahre`),
      s('.'),
    ],
    range: (q25, q75, p80) => `Wahrscheinliche Spanne ${q25}–${q75} · ${p80} % Chance, 80 zu werden`,
    timeLeft: 'Wahrscheinlich verbleibende Zeit',
    clock: (y, d) => `${y}J ${d}T `,
    clockA11y: (y, d) => `Etwa ${y} Jahre und ${d} Tage`,
    zoomA11y: 'Zoom',
    zooms: { life: 'Leben', weeks: 'Wochen', year: 'Jahr', today: 'Heute' },
    caption: {
      life: (year, pct, birthdays) => [
        s(`Dein ${year}. Lebensjahr ist zu `),
        b(pct),
        s(' vorbei. Etwa '),
        b(birthdays),
        s(' weitere Geburtstage sind wahrscheinlich.'),
      ],
      weeks: (week, pct, weeks) => [
        s(`Woche ${week} deines Lebens ist zu `),
        b(pct),
        s(' vorbei. Etwa '),
        b(weeks),
        s(' Wochen bleiben wahrscheinlich.'),
      ],
      year: (year, pctYear, pctDay, days) => [
        s(`${year} ist zu `),
        b(pctYear),
        s(' vorbei. Heute ist zu '),
        b(pctDay),
        s(' vorbei. Noch '),
        b(days),
        s(' Tage in diesem Jahr.'),
      ],
      today: (pct, hours) => [
        s('Diese Stunde ist zu '),
        b(pct),
        s(' vorbei. Heute bleiben noch etwa '),
        b(hours),
        s(' Stunden. Verbringe sie bewusst.'),
      ],
      layers: (unit, sleep, phone, free) => [
        s(' Zusammengerechnet sind etwa '),
        b(sleep),
        s(` dieser ${unit === 'years' ? 'Jahre' : 'Wochen'} Schlaf (gut verbrachte Zeit)`),
        ...(phone ? [s(' und '), b(phone), s(' am Handy')] : []),
        s('. Bleiben etwa '),
        b(free),
        s(phone ? ' wach und ohne Handy.' : ' wach.'),
      ],
    },
    legend: {
      lived: 'Gelebt',
      now: 'Jetzt',
      likely: 'Wahrscheinlich vor dir',
      reach: 'In Reichweite',
      maybe: 'Wenn das Glück es will',
      asleep: 'Schlaf',
      phone: 'Am Handy',
    },
    shows: { all: 'Alles', awake: 'Wach', free: 'Ohne Handy' },
    showA11y: 'Verbleibende Zeit anzeigen',
    whatIf: 'Was wäre, wenn … zum Ausprobieren tippen',
    whatIfA11y: (label, years) => `Was wäre, wenn: ${label}, etwa ${years} Jahre`,
    whatIfYears: (years) => `+${years} J.`,
    weeksAhead: 'Deine Wochen vor dir',
    weeksUnit: 'Wochen',
    bar: { free: 'wach, ohne Handy', phone: 'am Handy', sleep: 'Schlaf' },
    barLever: (label) => label,
    triedTotal: (several, weeks, years, capped) => [
      s(several ? 'Zusammen etwa ' : 'Etwa '),
      b(`${weeks} Wochen mehr`),
      s(` (${years} Jahre)`),
      s(several ? `: weniger als die Summe, weil sich Gewohnheiten überschneiden${capped ? ', und gedeckelt' : ''}.` : '.'),
    ],
    triedOne: (label, years) => `${label}: allein etwa ${years} Jahre`,
    tapWhatIf: 'Tippe im Kalender auf ein „Was wäre, wenn“, um zu sehen, was eine Änderung bringen könnte.',
    makePlan: 'Einen kleinen Plan machen',
    makePlanA11y: (label) => `Einen kleinen Plan machen für: ${label}`,
    onePlanAtATime: (sentence) => `Ein kleiner Plan nach dem anderen: Dieser würde „${sentence}“ ersetzen`,
    tablesFor: (country) => `Ausgangspunkt: Sterbetafeln für ${country}.`,
    tablesUS: 'Ausgangspunkt: eine Näherung der US-Sterbetafeln.',
    changeCountry: 'Land ändern',
    setCountry: 'Land wählen',
    phoneTitle: 'Dein Handy',
    phoneLine: (hours, years, share) => [
      s(`${hours} Stunden am Tag sind etwa `),
      b(`${years} Jahre`),
      s(` der Zeit, die du wahrscheinlich noch hast: ${share} deiner wachen Stunden.`),
    ],
    phoneSwap: (swap) =>
      `Eine halbe Stunde weniger am Tag könnte zu ${swap} werden. In Experimenten brachte weniger Social Media mehr Zeit mit Familie und Freunden und weniger Einsamkeit.`,
    phoneAsk:
      'Wie viele Stunden am Tag bist du am Handy? Deine Einstellungen für Bildschirmzeit oder Digital Wellbeing zeigen den Tagesdurchschnitt.',
    habitsTitle: 'Deine Gewohnheiten',
    habitsNeutral: 'Deine Gewohnheiten halten dich nah an der Grundschätzung.',
    habitsEffect: (adds, years) => [
      s(`Deine Gewohnheiten ${adds ? 'bringen dir' : 'kosten dich'} etwa `),
      b(`${years} Jahre`),
      s('.'),
    ],
    withinReach: 'In Reichweite',
    moreWeekends: (n) => `etwa ${n} Wochenenden mehr`,
    together: (several, gain, capped) => [
      s(several ? 'Zusammen etwa ' : 'Das sind etwa '),
      b(`${gain} Jahre mehr`),
      s(`${capped ? ' (gedeckelt: die Effekte überschneiden sich)' : ''}. Probiere sie im Kalender mit „Was wäre, wenn“ aus.`),
    ],
    allGood: 'Du tust schon das, was am meisten Zeit bringt. Bleib dabei, und halte deine Menschen nah.',
  },

  share: {
    half: 'etwa die Hälfte',
    third: 'etwa ein Drittel',
    quarter: 'etwa ein Viertel',
    seventh: 'etwa ein Siebtel',
    pct: (p) => `${p} %`,
  },
  swap: {
    dog: (name, walks) => `einem täglichen Spaziergang mit ${name}: etwa ${walks} Spaziergänge mehr`,
    dinners: (n, person) =>
      `etwa ${n} zweistündigen Abendessen im Jahr ${person ? `mit ${person} oder Freunden` : 'mit Freunden und Familie'}`,
  },

  habitsScreen: {
    eyebrow: 'Was du in der Hand hast',
    title: 'Ändere eine Gewohnheit, ändere die Zahl',
    median: (country) =>
      `Medianalter für jemanden, der so lebt wie du${country ? ` (${country})` : ''}. Tippe auf eine Option, um zu sehen, was sie ändern würde.`,
    whatMatters: 'WAS AM MEISTEN ZÄHLT',
    ranked: 'Geordnet nach Größe und Stärke der Belege. Tippe auf einen Eintrag für Zahlen und Quelle.',
    exerciseReplaced: 'Ersetzt durch deine täglichen Schritte oben, damit nichts doppelt zählt.',
    youNow: 'du jetzt',
    noChange: 'keine Änderung',
    stepsHeading: 'SCHRITTE PRO TAG',
    stepsA11y: 'Durchschnittliche Schritte pro Tag',
    stepsAnswer: (n) => `${n} Schritte am Tag`,
    math1: (n) => `1 · Durchschnitt: ${n} Schritte am Tag`,
    math2: (hr) => `2 · Risiko gegenüber 6.000 Schritten: × ${hr}`,
    math3: (hr, b) => `3 · Jahre ≈ ln(1 ÷ ${hr}) ÷ ${b} = `,
    math4: '4 · Ersetzt deine Sport-Antwort; der Nutzen flacht bei 10.000 ab.',
    useExercise: 'Lieber meine Sport-Antwort verwenden',
    stepsHint:
      'Tippe + oder −, um deine Schritte statt deiner Sport-Antwort zu nutzen. Die Gesundheits-App deines Handys zeigt deinen Durchschnitt.',
    inEstimate: 'Teil deiner Schätzung.',
    notInEstimate: 'Noch nicht in deiner Schätzung; zur Orientierung gezeigt.',
    howItWorks: 'WIE DEINE SCHÄTZUNG FUNKTIONIERT',
    strength: { strong: 'stark', moderate: 'mittel', emerging: 'neu' },
  },

  evidence: {
    smoking: {
      title: 'Nicht rauchen',
      summary: 'Der größte einzelne Hebel. Aufhören hilft in jedem Alter.',
      detail: 'Rauchen verdoppelt etwa das jährliche Sterberisiko (×2,2 in dieser App). Nach dem Aufhören sinkt es Richtung ×1,3.',
    },
    moving: {
      title: 'Mehr bewegen, fit bleiben',
      summary: 'Das Risiko sinkt weiter bis 8.000–10.000 Schritte am Tag unter 60, 6.000–8.000 über 60.',
      detail:
        'In 15 Kohorten (47.471 Erwachsene) gingen mehr tägliche Schritte bis zu diesen Werten mit geringerer Sterblichkeit einher. Ausdauerfitness ist einer der stärksten Prädiktoren fürs Überleben, ohne erkennbare Obergrenze des Nutzens.',
    },
    relationships: {
      title: 'Enge Beziehungen',
      summary: 'Isolation und Einsamkeit gehen mit etwa 26–32 % höherem Risiko eines frühen Todes einher, vergleichbar mit Rauchen oder Adipositas.',
      detail:
        'In 70 Studien (3,4 Millionen Menschen) erhöhten soziale Isolation, Einsamkeit und Alleinleben jeweils die Wahrscheinlichkeit eines frühen Todes um etwa ein Viertel bis ein Drittel. Eine frühere Übersicht über 148 Studien fand, dass starke Bindungen mit etwa 1,5-fachen Überlebenschancen einhergingen. In einer 85-jährigen Harvard-Studie sagte die Zufriedenheit mit Beziehungen mit 50 die Gesundheit mit 80 besser voraus als das Cholesterin.',
    },
    diet: {
      title: 'Was du isst',
      summary: 'Mehr Hülsenfrüchte, Vollkorn und Nüsse; weniger rotes und verarbeitetes Fleisch.',
      detail:
        'Ein dauerhafter Wechsel von typisch westlicher zu optimaler Ernährung geht mit 10–13 zusätzlichen Jahren einher, wenn er mit 20 erfolgt, etwa 8 mit 60 und über 3 mit 80. Eine Modellstudie: Bevölkerungsdurchschnitte, keine individuellen Prognosen.',
    },
    weight: {
      title: 'Gesundes Gewicht und Blutdruck',
      summary: 'Beide treiben Herzkrankheiten an, die häufigste Todesursache.',
      detail:
        'Gesundes Gewicht ist eine der fünf Gewohnheiten, die zusammen mit 12–14 zusätzlichen Jahren im Alter von 50 verbunden waren, und mit etwa 8–11 mehr Jahren ohne Krebs, Herzkrankheit und Diabetes.',
    },
    strength: {
      title: 'Krafttraining',
      summary: '30–60 Minuten pro Woche gehen mit 10–17 % geringerer Sterblichkeit einher.',
      detail: 'Zusätzlich zu Ausdauertraining, nicht stattdessen. Der Nutzen über etwa eine Stunde pro Woche hinaus ist unklar.',
    },
    purpose: {
      title: 'Ein Sinn im Leben',
      summary: 'Verbunden mit etwa 17 % geringerer Sterblichkeit und weniger Herzinfarkten und Schlaganfällen.',
      detail:
        'In 10 Studien (136.265 Menschen) in den USA und Japan, wo man es Ikigai nennt: „ein Leben, das sich zu leben lohnt“. Optimismus zeigt ein ähnliches Muster.',
    },
    sleep: {
      title: '7–8 Stunden schlafen',
      summary: 'Weniger als etwa 6 Stunden geht mit 12 % höherer Sterblichkeit einher.',
      detail: 'Sehr langer Schlaf zeigt ebenfalls höheres Risiko, ist aber meist ein Zeichen von Krankheit statt ihre Ursache.',
    },
    alcohol: {
      title: 'Wenig trinken',
      summary: 'Wenig zu trinken schützt nicht; das Risiko steigt ab etwa 2 Getränken am Tag bei Frauen, 3 bei Männern.',
      detail:
        'Eine Metaanalyse von 107 Kohorten (4,8 Millionen Menschen) fand bei leichten Trinkern keine geringere Sterblichkeit als bei lebenslang Abstinenten.',
    },
    helping: {
      title: 'Anderen helfen',
      summary: 'Ehrenamt im späteren Leben geht mit 24 % geringerer Sterblichkeit einher.',
      detail: 'Nach Bereinigung um Gesundheit, über 14 Studien mit Erwachsenen ab 55.',
    },
    scrolling: {
      title: 'Weniger scrollen, mehr Menschen',
      summary: 'In Experimenten brachte weniger Social Media mehr Zeit mit Familie und Freunden und weniger Einsamkeit.',
      detail:
        'Facebook 4 Wochen lang zu deaktivieren steigerte das Wohlbefinden und die Offline-Zeit mit Freunden und Familie. Social Media 3 Wochen lang auf etwa 30 Minuten am Tag zu begrenzen senkte Einsamkeit und Depression.',
    },
  },

  howItWorks: [
    'Das jährliche Sterberisiko steigt bei allen mit dem Alter und verdoppelt sich etwa alle 7 Jahre. Wir starten mit dieser Kurve für dein Geschlecht in deinem Land, angepasst an dessen UN-Sterbetafel (World Population Prospects 2024, Todesfälle 2023). Ohne Land nutzen wir eine Näherung der US-Tafeln.',
    'Deine Gewohnheiten multiplizieren dieses Risiko: Rauchen ×2,2, Sport 3+ Mal pro Woche ×0,85, unter 6 Stunden Schlaf ×1,15, selten nahestehende Menschen sehen ×1,29 und so weiter.',
    'Wir verfolgen dieses Risiko Monat für Monat ab deinem heutigen Alter. Das Alter, bis zu dem die Hälfte der Menschen wie du gestorben ist, ist dein Median; die 25-%- und 75-%-Marken ergeben deine Spanne.',
    'Faustregel: Jahre ≈ ln(Risikofaktor) ÷ 0,085. Deshalb kostet ein verdoppeltes Risiko etwa 8 Jahre, und Aufhören mit dem Rauchen kann etwa 9 zurückgeben.',
    'Mehrere Änderungen zusammen bringen weniger als ihre Summe, und wir begrenzen den Gesamtgewinn auf 14 Jahre, den größten Unterschied über alle Gewohnheiten aus einer großen US-Studie.',
    'Das sind Zusammenhänge aus Bevölkerungsstudien, keine Ursachen, und keine medizinische Beratung.',
  ],

  claims: {
    lifeTables: 'Sterbetafeln für 237 Länder und Gebiete, nach Geschlecht, Schätzungen für 2023.',
    plans:
      'Festzulegen, wann und wo man etwas tut, als Wenn-dann, macht das Dranbleiben viel wahrscheinlicher (94 Studien).',
    freshStart: 'Menschen beginnen ein Ziel eher zu Wochen- oder Monatsbeginn oder am Geburtstag: ein Neuanfang.',
    comingBack:
      'Im größten Test von Bewegungs-Anstößen (61.293 Menschen) half am meisten, die Rückkehr nach einem verpassten Training zu belohnen.',
    personalNumbers:
      'Die eigenen Zahlen zu sehen, kann helfen: Raucher, denen man ihr „Lungenalter“ nannte, hörten etwa doppelt so oft binnen eines Jahres auf (13,6 % gegenüber 6,4 %).',
    walkAfterMeals: 'Ein paar Minuten leichtes Gehen nach dem Essen senkten den Blutzucker um etwa 17 % gegenüber Sitzen.',
  },

  plans: {
    everyDay: 'Jeden Tag',
    weekdays: 'Werktags',
    weekends: 'Am Wochenende',
    days: (days) => {
      const names = ['Sonntags', 'Montags', 'Dienstags', 'Mittwochs', 'Donnerstags', 'Freitags', 'Samstags'];
      const short = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
      if (days.length === 1) return names[days[0]];
      if (days.length === 2) return `${names[days[0]]} und ${names[days[1]].toLowerCase()}`;
      return list(days.map((d) => short[d]));
    },
    time: (h, m) => `${h}:${String(m).padStart(2, '0')} Uhr`,
    cue: (days, anchor, time) => `${days} ${anchor ?? `um ${time}`}`,
    sentence: (cue, action) => `${cue} werde ich ${action}.`,
    nameInSentence: (name) => name.replace(/^Mein /, 'mein ').replace(/^Meine /, 'meine '),
    today: 'heute',
    tomorrow: 'morgen',
    anchors: {
      breakfast: 'nach dem Frühstück',
      lunch: 'nach dem Mittagessen',
      work: 'nach der Arbeit',
      dinner: 'nach dem Abendessen',
      morning: 'am Morgen',
      cigarette: 'wenn ich eine Zigarette will',
      atLunch: 'beim Mittagessen',
    },
    call: (name) => `${name} anrufen`,
    messageOrCall: (name) => `${name} schreiben oder anrufen`,
    actions: {
      walk: '10 Minuten spazieren gehen',
      connect: 'jemanden anrufen oder sehen, den ich liebe',
      bed: 'das Handy weglegen und mich bettfertig machen',
      smoke: 'erst 5 Minuten gehen',
      drink: 'erst ein Glas Sprudelwasser trinken',
      plate: 'meinen Teller zur Hälfte mit Gemüse füllen',
    },
    withAnchor: (action, anchor) => `${anchor} ${action}`,
    capitalize: (s) => s.charAt(0).toUpperCase() + s.slice(1),
    periodWeek: 'diese Woche',
    periodBirthday: 'dein neues Lebensjahr',
    calendarNote: 'Einmal verpassen ist in Ordnung: einfach beim nächsten Mal weitermachen. Von Memento Mori.',
    when: 'WANN',
    daysA11y: 'Tage',
    atSetTime: 'zu einer festen Zeit',
    anchorPlaceholder: 'oder in deinen Worten: wenn ich nach Hause komme',
    anchorA11y: 'Der Moment, der dich erinnert, in deinen Worten',
    around: 'Gegen (für Erinnerungen)',
    at: 'Um',
    timeA11y: 'Uhrzeit',
    iWill: 'WERDE ICH',
    actionPlaceholder: 'Mama anrufen',
    actionA11y: 'Was du tun wirst',
    save: 'Plan speichern',
    cancel: 'Abbrechen',
    planReachOut: 'Planen, wann du dich meldest',
    planReachOutA11y: (name) => `Planen, wann du dich bei ${name} meldest`,
    yourPlan: 'Dein Plan',
    edit: 'Bearbeiten',
    removeA11y: 'Diesen Plan entfernen',
    addToCalendar: 'Zu meinem Kalender hinzufügen',
    calendarSaved: 'Gespeichert: öffnen zum Hinzufügen ✓',
    addToCalendarA11y: (title) => `„${title}“ als wiederkehrenden Termin zu deinem Kalender hinzufügen`,
  },

  thisWeek: {
    heading: 'Diese Woche',
    doneToday: 'heute erledigt ✓',
    doneThisWeek: 'diese Woche erledigt ✓',
    next: (when) => `nächstes Mal: ${when}`,
    welcomeBack: (name) =>
      `Willkommen zurück${name ? `, ${name}` : ''}. Pläne rutschen jedem mal durch, und das ist in Ordnung: Wieder anzufangen ist, was zählt. Diese Woche ist eine neue Seite.`,
    oneThingFor: (period) => `Eine Sache für ${period}`,
    doneMark: ' · erledigt ✓',
    did: 'Erledigt',
    didToday: 'Heute erledigt ✓',
    moreVisits: (n, name) => `Etwa ${n} weitere Besuche mit ${name} in deinem jetzigen Rhythmus.`,
    smallStep: (label, years) => `${label} könnte etwa ${years} Jahre bringen. Das ist ein kleiner Schritt dorthin.`,
    noPlans:
      'Noch keine Pläne. Ein Plan ist ein kleines „Wann, dann“: „Sonntags nach dem Mittagessen werde ich Mama anrufen.“ Du kannst einen für jeden Menschen unter Liebe machen, oder für eine Gewohnheit unter Leben.',
    suggestHeading: 'Ein Plan zum Ausprobieren',
    suggestPerson: (n, name) =>
      `Etwa ${n} weitere Besuche mit ${name} in deinem jetzigen Rhythmus. Ein Plan macht den nächsten wahrscheinlicher.`,
    suggestLever: (label, years) => `${label} könnte etwa ${years} Jahre bringen. Ein kleiner Plan ist ein Anfang.`,
    whyPlans: 'Warum Pläne helfen',
    makeItMine: 'Zu meinem Plan machen',
    changeIt: 'Ändern',
    notNow: 'Nicht jetzt',
  },

  freshStart: {
    eyebrow: { week: 'Montag · ein Neuanfang', month: 'Der 1. · ein Neuanfang', birthday: 'Dein Geburtstag · ein Neuanfang' },
    title: (period) => `Eine Sache für ${period}?`,
    birthday: (name, weeks) =>
      `Alles Gute zum Geburtstag${name ? `, ${name}` : ''}. Du hast etwa ${weeks} Wochen gelebt, manche davon wunderbar. Was ist eine Sache, die du mit dem neuen Jahr machen könntest?`,
    prompt: (week, month) =>
      `Was ist eine Sache, die du ${week ? 'diese Woche' : `im ${month}`} tun könntest und über die du dich freuen würdest?`,
    callIdea: (name) => `${name} anrufen`,
    gratitudeIdea: 'Jemandem schreiben, dem ich dankbar bin',
    useIdea: (idea) => `Idee verwenden: ${idea}`,
    ownPlaceholder: 'oder deine eigene',
    a11y: (period) => `Eine Sache für ${period}`,
    choose: 'Zu meiner einen Sache machen',
    notToday: 'Heute nicht',
  },

  todaysCount: {
    pet: 'Heute ein Spaziergang oder etwas ruhige Zeit zusammen?',
    activity: 'Könntest du einen Tag fürs nächste Mal festlegen? Zu entscheiden, wann, macht es wahrscheinlicher.',
    agency: (label, years, more, what) => [
      s(`${label} könnte etwa `),
      b(`${years} Jahre`),
      s(' bringen: etwa '),
      b(more),
      s(` ${what}. Du kannst es im Lebenskalender ausprobieren.`),
    ],
  },

  loves: {
    per: PER,
    pace: (count, per) => `${count}× ${PER[per]}`,
    reasonBoth: (pace) => `${pace}, über die Jahre, die ihr beide wahrscheinlich habt`,
    reasonUntil: (pace, age) => `${pace}, bis du ${age} bist`,
    reasonLife: (pace) => `${pace}, für den Rest deines Lebens`,
    moreWith: (unit, name) => `weitere ${UNIT[unit]} mit ${name}`,
    moreTimes: (activity) => `weitere Male: ${activity}`,
    aboutMore: (n, unit) => [s('etwa '), b(n), s(` weitere ${UNIT[unit]}`)],
    since: {
      today: 'heute',
      yesterday: 'gestern',
      days: (n) => `vor ${n} Tagen`,
      months: (n) => `vor ${n} Monaten`,
    },
    suggestPeople: {
      mom: 'Mama',
      dad: 'Papa',
      friend: 'Mein bester Freund',
      grandma: 'Meine Oma',
      dog: 'Mein Hund',
      cat: 'Meine Katze',
    },
    suggestActivities: {
      soccer: 'Fußball spielen',
      movies: 'Ins Kino gehen',
      read: 'Ein Buch lesen',
      travel: 'An einen neuen Ort reisen',
      cook: 'Für Freunde kochen',
    },
    eyebrow: 'Was du liebst',
    title: 'Wie viele Male noch?',
    sub: 'In deinem jetzigen Rhythmus, über das Leben, das du wahrscheinlich noch hast.',
    empty: 'Noch nichts hier. Füge jemanden hinzu, der dich liebt, oder etwas, das du gern tust.',
    addHeading: 'HINZUFÜGEN',
    addToA11y: 'Hinzufügen zu',
    groups: { who: 'Wer dich liebt', what: 'Was du liebst' },
    cardA11y: (n, label, reason) => `Etwa ${n} ${label}. ${reason}.`,
    kinds: { person: 'Mensch', pet: 'Haustier' },
    species: { dog: 'Hund', cat: 'Katze' },
    personOrPet: 'Mensch oder Haustier',
    kindOfPet: 'Art des Haustiers',
    useSuggestion: (name) => `Vorschlag verwenden: ${name}`,
    whoA11y: 'Wer',
    whatA11y: 'Was',
    petPlaceholder: 'Max, Luna…',
    personPlaceholder: 'Mama, mein Partner, Sam…',
    activityPlaceholder: 'Fußball spielen, lesen, reisen…',
    howOftenSee: 'Wie oft du sie siehst',
    howOftenDo: 'Wie oft du es tust',
    fewer: 'Weniger',
    times: (n) => plural(n, 'Mal', 'Mal'),
    perA11y: 'Pro',
    theirAge: 'Alter (optional)',
    petAge: 'Alter in Jahren (optional)',
    untilAge: 'Bis zu welchem Alter? (optional)',
    phoneA11y: 'Telefon (optional)',
    phonePlaceholder: 'Telefon (optional, für Anrufen und Nachricht)',
  },

  reach: {
    lastTime: (since) => `Zuletzt gesprochen oder getroffen: ${since}.`,
    hint: 'Tippe nach einem Anruf oder Besuch auf „Wir haben geredet“, um den Überblick zu behalten.',
    claim: 'Menschen freuen sich mehr über ein Lebenszeichen, als wir denken, besonders nach einer Weile.',
    message: 'Nachricht',
    call: 'Anrufen',
    weTalked: 'Wir haben geredet',
    logged: 'Notiert ✓',
    logA11y: (name) => `Notieren, dass du heute mit ${name} geredet hast`,
    openers: [
      'Ich denke an dich. Hast du diese Woche Zeit zum Essen?',
      'Hey! Ist viel zu lange her. Telefonieren wir am Wochenende?',
      'Ich wollte dir nur sagen, dass ich dich lieb habe.',
      'Mir ist heute was Lustiges über uns eingefallen. Wann sehen wir uns?',
      'Lass uns nicht noch einen Monat verstreichen lassen. Bald einen Kaffee?',
    ],
  },

  today: {
    reachOut: 'Melde dich heute',
    moreVisits: (n) => [s('Etwa '), b(n), s(' weitere Besuche in deinem jetzigen Rhythmus. Eine Nachricht dauert eine Minute.')],
    isolation:
      'Wer anderen nahe bleibt, lebt länger: Isolation und Einsamkeit gehen mit etwa 26–32 % höherem Risiko eines frühen Todes einher.',
    connectionLever: (years) => `Für dich könnte es etwa ${years} Jahre bringen, die Menschen, die du liebst, jede Woche zu sehen.`,
    connectionOften: 'Menschen jede Woche zu sehen, ist schon Teil deiner Schätzung. Bleib dabei.',
    noPerson:
      'Enge Beziehungen gehören zu den stärksten Vorhersagen für ein langes, gesundes Leben. Wen würdest du gern öfter sehen?',
    addSomeone: 'Jemanden hinzufügen, der dich liebt',
    noneLogged: 'In den letzten 30 Tagen noch keine Anrufe oder Besuche notiert.',
    peopleThisMonth: (n) => `In den letzten 30 Tagen hast du mit ${n} der Menschen, die du liebst, geredet oder sie gesehen.`,
  },

  daily: {
    quotes: [
      ['Lebe nicht, als hättest du zehntausend Jahre vor dir. Solange du lebst, solange es in deiner Macht steht, sei gut.', 'Mark Aurel · Selbstbetrachtungen IV.17'],
      ['Während wir aufschieben, eilt das Leben vorüber.', 'Seneca · Briefe 1'],
      ['Betrachte dich als gestorben. Du hast dein Leben gelebt. Nimm nun, was bleibt, und lebe es recht.', 'Mark Aurel · Selbstbetrachtungen VII.56'],
      ['Bereiten wir unseren Geist vor, als wären wir am Ende des Lebens angekommen. Schieben wir nichts auf.', 'Seneca · Briefe 101'],
      ['Es ist nicht so, dass wir wenig Zeit zum Leben haben, sondern dass wir viel davon vergeuden.', 'Seneca · Von der Kürze des Lebens'],
      ['Habe den Tod täglich vor Augen, und du wirst nie einen niedrigen Gedanken hegen.', 'Epiktet · Handbüchlein 21'],
      ['Jeder lebt nur diesen gegenwärtigen Augenblick. Alles andere ist vergangen oder ungewiss.', 'Mark Aurel · Selbstbetrachtungen III.10'],
      ['Fang sofort an zu leben, und zähle jeden einzelnen Tag als ein eigenes Leben.', 'Seneca · Briefe 101'],
      ['Du könntest das Leben jetzt gleich verlassen. Lass das bestimmen, was du tust, sagst und denkst.', 'Mark Aurel · Selbstbetrachtungen II.11'],
      ['Niemand ist frei, der nicht Herr über sich selbst ist.', 'Epiktet · Fragmente'],
    ],
    questions: [
      'Was würde den heutigen Tag lohnenswert machen?',
      'Wer verdient heute deine volle Aufmerksamkeit?',
      'Was schiebst du auf, das du bereuen würdest, nie getan zu haben?',
      'Was liegt heute in deiner Hand, und was nicht?',
      'Wenn dies dein letzter gewöhnlicher {day} wäre, was würdest du gleich lassen?',
      'Was würdest du heute tun, wenn du keine Angst hättest?',
      'Was kannst du heute loslassen?',
      'Wofür möchtest du in Erinnerung bleiben, und hat dich der heutige Tag dem nähergebracht?',
    ],
    loveSub: (pace) => `${pace}, über die Zeit, die du wahrscheinlich hast.`,
    weekends: { what: 'weitere Wochenenden', sub: 'Jedes ist ein Samstag und ein Sonntag, die du bewusst verbringen kannst.' },
    summers: { what: 'weitere Sommer', sub: 'Lange Abende. Warme Nächte. Nicht unbegrenzt.' },
    moons: { what: 'weitere Vollmonde', sub: 'Geh beim nächsten nach draußen.' },
    lived: { what: 'schon gelebte Wochenenden', sub: 'Manche waren wunderbar. Sei dankbar dafür, und mach Platz für mehr.' },
  },

  /** Words from people who lived before us (src/lib/wisdom.ts). The entries themselves are English for now. */
  wisdom: {
    story: 'Eine Geschichte',
    practice: 'Eine Übung',
    retoldFrom: (cite: string) => `Nacherzählt nach ${cite}`,
    /** Comes before an action, e.g. "You could" + "call Mom today." */
    youCould: 'Du könntest',
    someoneYouLove: 'einen Menschen, den du liebst',
    readIn: (translator: string) => `In der Übersetzung von ${translator} lesen`,
    ourTranslation: (translator: string, year: string) => `Unsere Übersetzung, nach der englischen von ${translator} (${year})`,
  },
  opening: {
    lookBack: 'Zurückblicken',
    todaysCount: 'Die Zahl des Tages',
    today: 'Heute',
    agency: (label, years, more, what) => [
      s(`${label} könnte etwa `),
      b(`${years} Jahre`),
      s(' bringen. Das sind etwa '),
      b(more),
      s(` ${what}.`),
    ],
    tapToSee: 'Tippe, um dein Leben zu sehen',
    cardOf: (i, n) => `Karte ${i} von ${n}`,
    seeLife: 'Dein Leben ansehen',
    next: 'Weiter',
  },

  account: {
    title: 'Du',
    edit: 'Antworten bearbeiten',
    dataHeading: 'DEINE DATEN',
    dataBody:
      'Alles, was du eingibst, bleibt auf diesem Gerät. Kein Konto, keine Werbung, kein Tracking. Deine Schätzung wird genau hier berechnet, auf deinem Handy oder in deinem Browser.',
    guestNote: (guest) =>
      `Du hast außerdem ein ${guest ? 'Gastkonto' : 'angemeldetes Konto'} aus einem früheren Test. Es enthält nur ein leeres Profil; Löschen unten löscht es mit.`,
    confirm:
      'Das löscht deine Antworten, die Menschen und Dinge, die du liebst, und alles andere auf diesem Gerät. Es lässt sich nicht rückgängig machen.',
    yesDelete: 'Ja, alles löschen',
    keep: 'Meine Daten behalten',
    deleteAll: 'Alles auf diesem Gerät löschen',
    accountFailed:
      'Der Server war nicht erreichbar, um dein Konto aus dem früheren Test zu löschen, daher ist noch nichts gelöscht. Du kannst es noch einmal versuchen oder nur auf diesem Gerät löschen; das leere Konto bleibt dann, bis du uns per E-Mail bittest, es zu löschen.',
    deviceOnly: 'Nur auf diesem Gerät löschen',
    disclaimer:
      'Die Schätzungen beruhen auf Bevölkerungsstudien. Sie zeigen Richtung und ungefähre Größe, kein Versprechen, und sind keine medizinische Beratung.',
  },

  disclaimer: {
    short: 'Eine Schätzung aus Bevölkerungsdurchschnitten, zum Nachdenken und Lernen. Keine Vorhersage deines Todes und keine medizinische Beratung.',
    points: [
      'Das ist eine Schätzung aus Bevölkerungsdurchschnitten, keine Vorhersage, wann du stirbst. Das kann niemand wissen.',
      'Es ist keine medizinische Beratung, Diagnose oder Behandlung. Bei Fragen zu deiner Gesundheit sprich mit einer Ärztin, einem Arzt oder einer anderen Fachperson.',
      'Es ist zum Nachdenken und Lernen da: damit du die Zeit, die du hast, dem widmest, was dir wichtig ist.',
    ],
    support:
      'Wenn dich der Gedanke an den Tod gerade belastet, musst du das nicht allein tragen. In Deutschland erreichst du die TelefonSeelsorge kostenlos und rund um die Uhr unter [0800 111 0 111](tel:08001110111). In den USA: Anruf oder SMS an [988](https://988lifeline.org). Anderswo listet [findahelpline.com](https://findahelpline.com) kostenlose, vertrauliche Hilfe in deiner Nähe. Im Notfall ruf die örtliche Notrufnummer an.',
    howItWorks: 'So funktioniert es',
    sources: 'Quellen',
    beforeEyebrow: 'Bevor du es siehst',
    beforeTitle: 'Ein paar ehrliche Worte',
    understand: 'Verstanden',
  },

  legal: {
    terms: 'Nutzungsbedingungen',
    privacy: 'Datenschutzerklärung',
    health: 'Datenschutzerklärung für Gesundheitsdaten',
    eyebrow: 'Rechtliches',
    draft: 'Entwurf',
    draftNotice: 'Dies ist ein Entwurf. Er wurde noch nicht anwaltlich geprüft und kann sich vor dem Start von Memento Mori ändern.',
    englishOnly: 'Dieses Dokument gibt es vorerst nur auf Englisch. Es wird übersetzt, sobald die englische Fassung anwaltlich geprüft ist.',
    version: (v) => `Version ${v}`,
    notFound: 'Nicht gefunden',
    notFoundBody: 'Hier gibt es kein Dokument.',
    agree:
      'Mit dem Start stimmst du den [Nutzungsbedingungen](/legal/terms) zu und bestätigst, dass du mindestens 18 bist. Deine Antworten, auch zu Gesundheitsgewohnheiten, verlassen nie dieses Gerät: siehe [Datenschutzerklärung](/legal/privacy) und [Datenschutzerklärung für Gesundheitsdaten](/legal/health-data).',
  },

  sources: {
    eyebrow: 'Quellen',
    title: 'Die Forschung hinter der App',
    lede: (n) => `Alle ${n} Studien und Datensätze, die die App zitiert, nach ihrem Zweck geordnet. Tippe auf eine, um sie zu öffnen.`,
    usedFor: (what) => `Verwendet für: ${what}`,
    opens: 'Öffnet sich im Browser.',
    topics: {
      model: { title: 'Wie die Schätzung entsteht', blurb: 'Die Sterblichkeitskurve, die Sterbetafeln, an die sie angepasst ist, und die Obergrenze für kombinierte Gewinne.' },
      habits: { title: 'Gewohnheiten in deiner Schätzung', blurb: 'Woher der Risikofaktor jeder Gewohnheit kommt.' },
      direction: {
        title: 'Zur Orientierung, nicht in der Schätzung',
        blurb: 'Befunde auf dem Gewohnheiten-Bildschirm, die die Richtung zeigen, aber noch nicht in die Zahlen eingehen.',
      },
      behavior: { title: 'Pläne, Erinnerungen und sich melden', blurb: 'Verhaltensforschung hinter Plänen, Neuanfängen und Willkommen-zurück.' },
      time: { title: 'Wohin die Stunden gehen', blurb: 'Zeit am Handy und was es bringen kann, etwas davon zurückzuholen.' },
      loves: { title: 'Was du liebst: „noch N-mal“', blurb: 'Typische Lebensdauern, um die Zeit mit Haustieren zu zählen.' },
    },
    uses: {
      gompertz1825: 'Die Form der Kurve: Das jährliche Sterberisiko steigt exponentiell mit dem Alter.',
      makeham1860: 'Der konstante, altersunabhängige Teil des Risikos (der „A“-Term).',
      wpp2024: 'Dein Ausgangspunkt: die Sterbetafel für dein Land und Geschlecht.',
      li2018: 'Die 14-Jahre-Obergrenze für kombinierte Gewinne; Nichtrauchen als größter Hebel.',
      holtLunstad2015: 'Verbundenheit: nahestehende Menschen selten sehen ×1,29.',
      holtLunstad2010: 'Starke soziale Bindungen und etwa 1,5-fache Überlebenschance (148 Studien).',
      paluch2022: 'Bewegung und tägliche Schritte.',
      mandsager2018: 'Ausdauerfitness als einer der stärksten Prädiktoren fürs Überleben.',
      li2020: 'Gesundes Gewicht und Jahre ohne chronische Krankheit.',
      cappuccio2010: 'Schlaf: unter 6 Stunden ×1,15.',
      zhao2023: 'Alkohol: viel trinken ×1,4; wenig trinken schützt nicht.',
      fadnes2022: 'Was du isst.',
      momma2022: 'Krafttraining.',
      cohen2016: 'Ein Sinn im Leben.',
      lee2019: 'Optimismus und 85 werden.',
      okun2013: 'Anderen helfen.',
      waldinger2016: 'Zufriedenheit in Beziehungen mit 50 und Gesundheit mit 80.',
      allcott2020: 'Weniger scrollen, mehr Zeit mit Menschen.',
      hunt2018: 'Soziale Medien auf 30 Minuten am Tag begrenzen.',
      phoneTime2025: 'Der Startwert von 4 Stunden bei der Handy-Frage (Schätzungen schwanken).',
      liu2023: 'Sich bei Menschen melden.',
      gollwitzer2006: 'Wenn-dann-Pläne.',
      dai2014: 'Neuanfänge: Montage, der Monatserste, Geburtstage.',
      milkman2021: 'Willkommen zurück nach einer Pause statt Serien.',
      parkes2008: 'Menschen ihre eigenen Zahlen zeigen.',
      buffey2022: 'Kurze Spaziergänge nach dem Essen.',
      oneill2013: 'Hunde: mittlere Lebensdauer etwa 12 Jahre.',
      mcmillan2024: 'Hunde: mittlere Lebenserwartung 12,5 Jahre (584.734 Hunde im Vereinigten Königreich).',
      oneill2015: 'Katzen: mittlere Lebensdauer 14 Jahre.',
    },
    quotesHeading: 'Zitate',
    /** Above the list of translations the wisdom library quotes, in languages that have the library. */
    wisdomIntro: 'Zitate, Geschichten und Übungen von Menschen, die vor uns gelebt haben. Jedes Zitat stammt aus einer dieser gemeinfreien Übersetzungen und nennt die genaue Stelle; Geschichten erzählen wir mit eigenen Worten nach.',
    quotes:
      'Mark Aurel (Selbstbetrachtungen, engl. Übers. George Long, 1862), Seneca (Briefe und Von der Kürze des Lebens, engl. Übers. Richard M. Gummere, 1917–25, u. a.) und Epiktet (Handbüchlein, engl. Übers. Thomas Wentworth Higginson, 1865). Gemeinfreie Übersetzungen, teils leicht angepasst.',
    footnote:
      'Manche Links führen zu einer Zusammenfassung oder Pressemitteilung, wenn der volle Artikel kostenpflichtig ist. Zusammenhänge aus Bevölkerungsstudien beweisen keine Ursache, und nichts hier ist medizinische Beratung.',
  },

  methods: {
    eyebrow: 'So funktioniert es',
    title: 'Woher deine Zahlen kommen',
    lede: 'Alles, was die App zeigt, wird auf deinem Gerät aus deinen Antworten und veröffentlichter Forschung berechnet. Hier ist jeder Schritt und die Studie dahinter.',
    everyStep: 'Jeder Schritt, mit Quellen',
    accountHeading: 'SO FUNKTIONIERT ES',
    curveTitle: '1 · Die Kurve, von der alle ausgehen',
    curveIntro:
      'Bei Erwachsenen steigt das jährliche Sterberisiko mit dem Alter stetig an und verdoppelt sich etwa alle 7 bis 8 Jahre. Versicherungsmathematiker beschreiben das seit zwei Jahrhunderten als Gompertz-Makeham-Kurve:',
    curveParts: (child, youth) =>
      `B · e^(b·x) ist der Teil, der mit dem Alter x wächst (Gompertz); A ist ein kleines Risiko, das nicht vom Alter abhängt, etwa Unfälle (Makeham). Todesfälle in Kindheit und Jugend folgen dieser Form nicht, deshalb kommen zwei konstante Terme dazu: einer vor dem Alter von ${child} und einer von ${child} bis ${youth}.`,
    placeTitle: '2 · Wo du lebst',
    placeBody: (n) =>
      `Wo du lebst, wiegt mehr als jede Gewohnheit: 2023 reichte das mittlere Sterbealter je nach Land von etwa 59 bis über 90 Jahre. Deshalb wird die Kurve für jedes Geschlecht in jedem der ${n} Länder und Gebiete einzeln an die Sterbetafeln der Vereinten Nationen für 2023 angepasst (World Population Prospects 2024). A, B und b stammen aus den Sterberaten im Alter von 30 bis 100; die Terme für Kindheit und Jugend sorgen dafür, dass das Überleben bis 15 und bis 30 genau zur Tafel passt. In allen Ländern und für beide Geschlechter liegt das mittlere Sterbealter des Modells ab Geburt weniger als ein Jahr neben dem der UN-Tafel.`,
    placeUs: (mA, mB, fA, fB, b) =>
      `Ohne Land nutzt die App eine ältere Annäherung an US-Tafeln: A = ${mA}, B = ${mB} für Männer; A = ${fA}, B = ${fB} für Frauen; b = ${b} (etwa 75 und 81 Jahre bei Geburt).`,
    placeLeftOut:
      'Einkommen und Bildung sagen die Lebensdauer innerhalb eines Landes ebenfalls voraus. Sie bleiben bewusst draußen: Du kannst hier nichts daran ändern, und sie klingen wie ein Urteil.',
    habitsTitle: '3 · Deine Gewohnheiten',
    habitsIntro:
      'Jede Antwort multipliziert das jährliche Risiko in jedem Alter. ×1 heißt keine Änderung, ×2 doppeltes Risiko. Die Faktoren sind aus großen Studien und Übersichtsarbeiten gerundet: Es sind Näherungen, und sie stammen aus Zusammenhängen, nicht aus Experimenten.',
    habitsConnection: (middle) =>
      `Bei Verbundenheit liegt die mittlere Antwort (${middle}) zwischen den gemessenen Stufen; sie selbst wurde nicht gemessen. Die Studie berichtet Odds Ratios, die hier als Risikofaktoren dienen, eine gute Näherung.`,
    habitsSteps: (at4k, at10k) =>
      `Tägliche Schritte ersetzen, wenn du sie eingibst, die Antwort zu Sport, damit Bewegung nie doppelt zählt. Das Risiko sinkt um etwa 7 % pro 1.000 zusätzliche Schritte, gemessen ab 6.000 am Tag, und flacht bei 10.000 ab: Faktor = e^(−0,072 × (Schritte − 6.000) ÷ 1.000). 4.000 Schritte ergeben also ${at4k}, 10.000 ergeben ${at10k}.`,
    rangeTitle: '4 · Vom Risiko zur Spanne',
    rangeBody:
      'Ab deinem heutigen Alter verfolgt die App das Risiko Monat für Monat bis 121, multipliziert mit deinen Gewohnheiten. Das Alter, bis zu dem die Hälfte der Menschen wie du gestorben ist, ist dein Median. Die Alter, bis zu denen ein Viertel und drei Viertel gestorben sind, ergeben die wahrscheinliche Spanne. Sie zeigt auch die Chance, 80 zu werden.',
    rangeRule: (b, years, doubling) =>
      `Eine Faustregel hinter den Zahlen zu Gewohnheiten: gewonnene Jahre ≈ ln(1 ÷ Faktor) ÷ ${b}. Dein Risiko zu halbieren bringt etwa ${years} Jahre, weil sich das Risiko bei b = ${b} etwa alle ${doubling} Lebensjahre verdoppelt (die angepassten Länderkurven sind etwas steiler). Die Bildschirme rechnen den echten Unterschied, nicht die Abkürzung.`,
    combineTitle: '5 · Was wäre, wenn: Änderungen kombinieren',
    combineBody: (cap) =>
      `Jedes „Was wäre, wenn“ ist der Unterschied zwischen deinem Median jetzt und deinem Median mit geänderter Gewohnheit. Mehrere Änderungen multiplizieren sich, bringen also weniger als die Summe der einzelnen, weil sich die Wirkungen überschneiden. Außerdem ist die Summe auf ${cap} Jahre begrenzt.`,
    capClaim: (cap) =>
      `${cap} Jahre: der größte Unterschied zwischen Menschen mit allen fünf gesunden Gewohnheiten und Menschen ohne eine davon, in zwei großen US-Kohorten.`,
    combineCalendar:
      'Im Kalender wird der kombinierte Gewinn im Verhältnis dazu aufgeteilt, was jede Änderung allein bringen würde, sodass jede ihre eigene Farbe bekommt.',
    notInEstimate: (items) =>
      `Manches auf dem Gewohnheiten-Bildschirm dient nur der Orientierung und steckt noch nicht in deinen Zahlen: ${items}.`,
    timeTitle: '6 · Handy und Schlaf',
    timePhone: (waking) =>
      `Die Handyzeit ist deine eigene Schätzung in Stunden pro Tag (sie beginnt bei 4, nahe gängigen Schätzungen für Erwachsene in den USA). Über die Jahre, die du wahrscheinlich noch hast, ergibt das Stunden × Jahre ÷ 24. Als Anteil deines wachen Tages sind es Stunden ÷ ${waking}.`,
    timeSleep: (ok, short) =>
      `Die Ansichten „Wach“ und „Ohne Handy“ nehmen den Schlaf aus dem Kalender: etwa ${ok} Stunden pro Nacht, oder ${short}, wenn du unter 6 angegeben hast. Schlaf ist gut genutzte Zeit, keine verlorene.`,
    timeSwap: (minutes) =>
      `Der Tausch schlägt vor, dir ${minutes} Minuten am Tag vom Handy zurückzuholen, und zeigt, was daraus werden könnte, etwa tägliche Spaziergänge mit deinem Hund in den Jahren, die ihr wahrscheinlich zusammen habt.`,
    lovesTitle: '7 · Was du liebst: „noch N-mal“',
    lovesBody:
      'Für jeden Menschen, jedes Tier und jede Tätigkeit zählt die App die Jahre, die ihr wahrscheinlich teilt, und multipliziert sie damit, wie oft du sie siehst oder es tust. Diese Jahre enden beim frühesten von: deinem Medianalter; dem Alter, mit dem du eine Tätigkeit aufhören willst; dem Medianalter des anderen Menschen (aus seinem Alter, über beide Geschlechter gemittelt, weil die App nicht fragt, und angenommen, er lebt in deinem Land); oder der typischen Lebensdauer eines Tiers.',
    lovesPets: (dog, cat) =>
      `Typische Lebensdauern: Hunde etwa ${dog} Jahre, Katzen etwa ${cat}, aus britischen Tierarztdaten. Rasse und Größe machen viel aus. Ein älteres Tier zählt immer mit mindestens einem halben Jahr.`,
    limitsTitle: '8 · Was sie dir nicht sagen kann',
    limits: [
      'Das sind Bevölkerungsdurchschnitte. Sie beschreiben, wie lange Gruppen von Menschen mit ähnlichen Antworten gelebt haben, nicht, was mit dir passieren wird. Sie wissen nichts über deine Krankengeschichte, deine Gene oder deine Versorgung.',
      'Die Zusammenhänge zwischen Gewohnheiten und Lebensdauer stammen aus Beobachtungsstudien: Wer X tut, lebt oft länger, teils wegen X und teils wegen allem, was damit einhergeht. Eine Gewohnheit zu ändern, ändert deine Lebensdauer womöglich nicht um den gezeigten Betrag.',
      'Darum zeigt die App eine Spanne, nie ein Datum. Die Hälfte der Menschen wie du lebt länger als der Median, viele deutlich länger.',
    ],
    versionTitle: 'Modellversion',
    versionBody: 'Das Modell ändert sich nur bei starker Evidenz, etwa Metaanalysen, und jede Änderung bekommt eine neue Version.',
    allSources: 'Alle Quellen, vollständig',
  },
};
