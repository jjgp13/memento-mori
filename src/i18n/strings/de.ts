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
    range: (med, q25, q75) =>
      `Das ist eine Spanne, kein Datum: Die Hälfte der Menschen, die so leben wie du, wird ${med}, und die meisten landen zwischen ${q25} und ${q75}. Keine medizinische Beratung.`,
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
    eyebrow: (name) => (name ? `${name}, heute` : 'Heute'),
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
    },
    legend: { lived: 'Gelebt', now: 'Jetzt', likely: 'Wahrscheinlich vor dir', reach: 'In Reichweite', maybe: 'Wenn das Glück es will' },
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
      s(`${capped ? ' (gedeckelt: die Effekte überschneiden sich)' : ''}. Das sind die bronzenen Kreise unten.`),
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
    median: 'Medianalter für jemanden, der so lebt wie du. Tippe auf eine Option, um zu sehen, was sie ändern würde.',
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
    'Das jährliche Sterberisiko steigt bei allen mit dem Alter und verdoppelt sich etwa alle 8 Jahre. Wir starten mit dieser Kurve für dein Geschlecht, einer Näherung der US-Sterbetafeln.',
    'Deine Gewohnheiten multiplizieren dieses Risiko: Rauchen ×2,2, Sport 3+ Mal pro Woche ×0,85, unter 6 Stunden Schlaf ×1,15, selten nahestehende Menschen sehen ×1,29 und so weiter.',
    'Wir verfolgen dieses Risiko Monat für Monat ab deinem heutigen Alter. Das Alter, bis zu dem die Hälfte der Menschen wie du gestorben ist, ist dein Median; die 25-%- und 75-%-Marken ergeben deine Spanne.',
    'Faustregel: Jahre ≈ ln(Risikofaktor) ÷ 0,085. Deshalb kostet ein verdoppeltes Risiko etwa 8 Jahre, und Aufhören mit dem Rauchen kann etwa 9 zurückgeben.',
    'Mehrere Änderungen zusammen bringen weniger als ihre Summe, und wir begrenzen den Gesamtgewinn auf 14 Jahre, den größten Unterschied über alle Gewohnheiten aus einer großen US-Studie.',
    'Das sind Zusammenhänge aus Bevölkerungsstudien, keine Ursachen, und keine medizinische Beratung.',
  ],

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
      `Du hast außerdem ein ${guest ? 'Gastkonto' : 'angemeldetes Konto'} aus einem früheren Test. Es enthält nur ein leeres Profil; Löschen unten meldet es ab.`,
    confirm:
      'Das löscht deine Antworten, die Menschen und Dinge, die du liebst, und alles andere auf diesem Gerät. Es lässt sich nicht rückgängig machen.',
    yesDelete: 'Ja, alles löschen',
    keep: 'Meine Daten behalten',
    deleteAll: 'Alles auf diesem Gerät löschen',
    signOutFailed: 'Abmelden fehlgeschlagen.',
    disclaimer:
      'Die Schätzungen beruhen auf Bevölkerungsstudien. Sie zeigen Richtung und ungefähre Größe, kein Versprechen, und sind keine medizinische Beratung.',
  },
};
