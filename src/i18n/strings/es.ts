/** Español (México): tuteo, cercano y sereno. */
import { b, s, type Rich } from '@/i18n/rich';
import type { Strings } from '@/i18n/strings/en';
import type { Per } from '@/lib/loves';

type Unit = 'visits' | 'days' | 'times';

const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);

/** "a, b y c" */
const list = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} y ${xs.at(-1)}`);

const PER: Record<Per, string> = { day: 'al día', week: 'a la semana', month: 'al mes', year: 'al año' };
const UNIT: Record<Unit, string> = { visits: 'visitas', days: 'días', times: 'veces' };

export const es: Strings = {
  common: {
    back: '← Atrás',
    close: 'Cerrar',
    continue: 'Continuar',
    skip: 'Omitir',
    skipForNow: 'Omitir por ahora',
    save: 'Guardar',
    done: 'Listo',
    add: 'Agregar',
    remove: 'Quitar',
    removeA11y: (name) => `Quitar a ${name}`,
    less: 'Menos',
    more: 'Más',
    you: 'Tú',
    source: 'Fuente',
    why: 'Por qué',
    theScience: 'La ciencia',
    lifeTables: 'Tablas de vida',
    sourceA11y: (prefix, label) => `${prefix}: ${label}, se abre en el navegador`,
    tickingSound: 'Sonido de reloj',
    clockTicking: 'Tictac del reloj',
    hoursValue: (h) => `${h} h`,
    yrs: (signed) => `${signed} años`,
    years: (y) => `${y} años`,
    notAdvice:
      'Las estimaciones vienen de promedios de población y de riesgos relativos generales. Muestran la dirección y el tamaño aproximado, no son una promesa ni un consejo médico.',
    list,
  },

  tabs: { life: 'Vida', habits: 'Hábitos', loves: 'Amores', today: 'Hoy' },

  language: {
    heading: 'IDIOMA',
    note: 'Sigue el idioma de tu dispositivo hasta que elijas uno.',
    a11y: 'Idioma',
  },

  date: {
    months: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthsShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    monthInitials: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    weekdayInitials: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    weekdays: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    weekdaysShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    year: 'Año',
    month: 'Mes',
    day: 'Día',
    decade: (d) => `${d}s`,
    hour: (h) => String(h),
  },

  habits: {
    smoke: {
      question: '¿Fumas?',
      short: 'Tabaco',
      why: 'La palanca más grande de esta lista.',
      options: { never: 'Nunca', former: 'Lo dejé', current: 'Sí' },
    },
    exercise: {
      question: '¿Qué tan seguido haces ejercicio?',
      short: 'Ejercicio',
      why: 'Caminar a paso rápido cuenta.',
      options: { none: 'Casi nunca', some: '1–2 veces por semana', regular: '3+ veces por semana' },
    },
    bmi: {
      question: '¿Qué describe mejor tu peso?',
      short: 'Peso',
      why: 'Rangos de índice de masa corporal. Aproximado está bien.',
      options: { under: 'Bajo peso', normal: 'Saludable', over: 'Sobrepeso', obese: 'Obesidad' },
    },
    alcohol: {
      question: '¿Cuánto tomas?',
      short: 'Alcohol',
      why: 'Mucho es unas 15 bebidas o más a la semana.',
      options: { none: 'Poco o nada', moderate: 'Moderado', heavy: 'Mucho' },
    },
    sleep: {
      question: '¿Cuánto duermes?',
      short: 'Sueño',
      why: 'La mayoría de las noches, no tus mejores noches.',
      options: { short: 'Menos de 6 horas', ok: '6–9 horas' },
    },
    connection: {
      question: '¿Qué tan seguido pasas tiempo con la gente cercana a ti?',
      short: 'Conexión',
      why: 'En persona o en una conversación de verdad. Las relaciones cercanas son de lo que mejor predice una vida larga.',
      options: { often: 'Cada semana', sometimes: 'Algunas veces al mes', rarely: 'Casi nunca; a menudo siento soledad' },
    },
    strength: {
      question: '¿Haces ejercicios de fuerza?',
      short: 'Fuerza',
      why: 'Pesas, ligas o tu propio peso: sentadillas, lagartijas, cargar bolsas pesadas. Te mantiene fuerte y estable más adelante.',
      options: { none: 'Casi nunca', some: 'Más o menos una vez a la semana', regular: 'Dos veces a la semana o más' },
    },
  },

  levers: {
    smoke: 'Dejar de fumar',
    exercise: 'Hacer ejercicio 3+ veces por semana',
    bmi: 'Llegar a un peso saludable',
    alcohol: 'Tomar menos',
    sleep: 'Dormir 6–9 horas',
    connection: 'Ver cada semana a la gente que quieres',
    steps: 'Caminar 10,000 pasos al día',
    strength: 'Hacer fuerza dos veces a la semana',
  },

  values: {
    family: 'Familia',
    partner: 'Mi pareja',
    friends: 'Amistades',
    health: 'Salud',
    craft: 'Trabajo y oficio',
    learning: 'Aprender',
    creating: 'Crear',
    faith: 'Fe y espíritu',
    nature: 'Naturaleza',
    adventure: 'Aventura',
    service: 'Ayudar a otros',
    peace: 'Paz interior',
  },

  onboarding: {
    welcomeEyebrow: 'Recuerda que vas a morir',
    welcomeLede:
      'Los estoicos tenían presente la muerte para no desperdiciar sus días. Esta app cuenta el tiempo que probablemente te queda, para que el día de hoy tenga el peso que merece, y lo dirige hacia lo que amas.',
    welcomeNote: 'Unas cuantas preguntas cortas, una a la vez. Tus respuestas se quedan en este dispositivo.',
    begin: 'Comenzar',
    step: {
      you: 'Tú',
      birth: 'Nacimiento',
      place: 'Lugar',
      body: 'Cuerpo',
      habits: 'Hábitos',
      time: 'Tu tiempo',
      values: 'Lo que importa',
      who: 'Quién te ama',
      what: 'Lo que amas',
    },
    nameQuestion: '¿Cómo te llamamos?',
    nameA11y: 'Nombre',
    namePlaceholder: 'Tu nombre',
    dobQuestion: '¿Cuándo naciste?',
    countryQuestion: '¿Dónde vives?',
    countryWhy:
      'El lugar donde vives influye en cuánto vive la gente: hasta 30 años o más de diferencia entre países. Partimos de las tablas de vida de tu país.',
    countrySearch: 'Buscar país',
    countrySearchAgain: '¿Otro lugar? Busca',
    countryNone: 'No hay ningún país con ese nombre en las tablas de la ONU.',
    sexQuestion: '¿Cuál fue tu sexo al nacer?',
    sexWhy: 'En promedio, las mujeres viven unos cinco años más que los hombres.',
    sex: { m: 'Hombre', f: 'Mujer' },
    phoneQuestion: '¿Cuántas horas al día pasas en tu celular?',
    phoneWhereIos:
      'Tu iPhone ya lo sabe: Configuración → Tiempo en pantalla → Ver toda la actividad de apps y sitios web. Usa el promedio diario.',
    phoneWhereAndroid: 'Tu celular ya lo sabe: Configuración → Bienestar digital. Usa el promedio diario.',
    phoneWhereWeb:
      'Tu celular ya lo sabe. iPhone: Configuración → Tiempo en pantalla. Android: Configuración → Bienestar digital. Usa el promedio diario.',
    phoneA11y: 'Horas al día en tu celular',
    phoneResult: (years, share) => [
      s('En el tiempo que probablemente te queda, eso suma unos '),
      b(`${years} años`),
      s(`: ${share} de tus horas de vigilia.`),
    ],
    valuesQuestion: '¿Qué es lo que más te importa?',
    valuesWhy: 'Elige hasta tres. Tus recordatorios te van a regresar a ellos.',
    peopleQuestion: '¿Quién te ama y a quién amas tú?',
    peopleWhy:
      'Las personas (y mascotas) que más lamentarías no ver lo suficiente. Contaremos cuántas veces más es probable que las veas.',
    activitiesQuestion: '¿Qué te encanta hacer?',
    activitiesWhy: 'Contaremos cuántas veces más podrás hacerlo.',
    computing: 'Contando tus semanas',
    computingNote: 'Convirtiendo tus respuestas en tiempo.',
  },

  reveal: {
    eyebrow: (name) => (name ? `${name}, tu tiempo` : 'Tu tiempo'),
    about: 'Unas',
    weeksRemain: 'semanas probablemente te quedan',
    fullLife: (total, lived) =>
      `Una vida completa como la tuya es de unas ${total} semanas. Ya has vivido ${lived}. Hagamos que el resto cuente.`,
    person: (n, label): Rich => [s('Eso es como '), b(n), s(` ${label}.`)],
    phone: (years, swap) => [
      s('Tu celular se lleva unos '),
      b(`${years} años`),
      s(` de eso. Media hora menos al día podría convertirse en ${swap}.`),
    ],
    lever: (label, years, weekends) => [
      s(` ${label} podría sumar unos `),
      b(`${years} años`),
      s(`, más o menos ${weekends} fines de semana más.`),
    ],
    values: (vals) =>
      `Dijiste que ${list(vals.map((v) => v.toLowerCase()))} ${plural(vals.length, 'es', 'son')} lo que más te importa. Te lo vamos a seguir recordando.`,
    range: (med, q25, q75, country) =>
      `Esto es un rango, no una fecha: la mitad de las personas que viven como tú${country ? ` en ${country}` : ''} llegan a los ${med}, y la mayoría queda entre los ${q25} y los ${q75}. No es consejo médico.`,
    seeLife: 'Ver tu vida',
    healthy: (weeks, lever, years) => [
      s('Cerca de '),
      b(weeks),
      s(' de esas semanas probablemente serán con buena salud: fuerte y valiéndote por ti mismo.'),
      ...(lever ? [s(` ${lever} podría sumar unos `), b(`${years} años`), s(' de ellas.')] : []),
    ],
  },

  alive: {
    heading: 'Has vivido',
    summary: (days, years) => `Has vivido ${days} días, unos ${years} años.`,
    units: {
      seconds: 'segundos',
      minutes: 'minutos',
      hours: 'horas',
      days: 'días',
      weeks: 'semanas',
      months: 'meses',
      years: 'años',
    },
  },

  life: {
    eyebrow: (name) => (name ? `${name} · tiempo que probablemente te queda` : 'Tiempo que probablemente te queda'),
    verdict: (age, med, left) => [
      s('Tienes '),
      b(age),
      s(' años. La mitad de las personas que viven como tú llegan a los '),
      b(String(med)),
      s('. Eso te deja unos '),
      b(`${left} años`),
      s('.'),
    ],
    range: (q25, q75, p80) => `Rango probable ${q25}–${q75} · ${p80}% de probabilidad de llegar a los 80`,
    timeLeft: 'Tiempo que probablemente te queda',
    clock: (y, d) => `${y}a ${d}d `,
    clockA11y: (y, d) => `Unos ${y} años y ${d} días`,
    zoomA11y: 'Zoom',
    zooms: { life: 'Vida', weeks: 'Semanas', year: 'Año', today: 'Hoy' },
    caption: {
      life: (year, pct, birthdays) => [
        s('Ya pasó el '),
        b(pct),
        s(` de tu año ${year}. Probablemente te quedan unos `),
        b(birthdays),
        s(' cumpleaños más.'),
      ],
      weeks: (week, pct, weeks) => [
        s('Ya pasó el '),
        b(pct),
        s(` de la semana ${week} de tu vida. Probablemente quedan unas `),
        b(weeks),
        s(' semanas.'),
      ],
      year: (year, pctYear, pctDay, days) => [
        s('Ya pasó el '),
        b(pctYear),
        s(` de ${year} y el `),
        b(pctDay),
        s(' de hoy. Quedan '),
        b(days),
        s(' días este año.'),
      ],
      today: (pct, hours) => [
        s('Ya pasó el '),
        b(pct),
        s(' de esta hora. A hoy le quedan unas '),
        b(hours),
        s(' horas. Úsalas con intención.'),
      ],
      layers: (unit, sleep, phone, free) => [
        s(' En total, unos '),
        b(sleep),
        s(` de esos ${unit === 'years' ? 'años' : 'semanas'} son sueño (tiempo bien usado)`),
        ...(phone ? [s(' y '), b(phone), s(' en tu celular')] : []),
        s(', y te quedan unos '),
        b(free),
        s(phone ? ' despierto y fuera del celular.' : ' despierto.'),
      ],
      health: (unit, med, lo, hi) => [
        s(' Cerca de '),
        b(med),
        s(` de ${unit === 'years' ? 'ellos' : 'ellas'} probablemente serán con buena salud, fuerte e independiente: la franja verde, que se desvanece donde las personas difieren (para la mayoría como tú, ${lo}–${hi} ${unit === 'years' ? 'años' : 'semanas'}).`),
      ],
    },
    legend: {
      lived: 'Vivido',
      now: 'Ahora',
      likely: 'Probablemente por delante',
      reach: 'A tu alcance',
      maybe: 'Si la suerte lo permite',
      asleep: 'Durmiendo',
      phone: 'En tu celular',
      healthy: 'Probablemente con buena salud',
    },
    shows: { all: 'Todo', awake: 'Despierto', free: 'Sin celular' },
    showA11y: 'Mostrar el tiempo por delante',
    whatIf: '¿Y si…? Toca para probar',
    whatIfA11y: (label, years, healthy) => `¿Y si…? ${label}, unos ${years} años, ${healthy} más con buena salud`,
    whatIfYears: (years) => `+${years}a`,
    weeksAhead: 'Tus semanas por delante',
    weeksUnit: 'semanas',
    bar: { free: 'despierto, sin celular', phone: 'en tu celular', sleep: 'durmiendo' },
    barLever: (label) => label.toLowerCase(),
    triedTotal: (several, weeks, years, capped) => [
      s(several ? 'Juntos, unas ' : 'Unas '),
      b(`${weeks} semanas más`),
      s(` (${years} años)`),
      s(several ? `: menos que la suma, porque los efectos de los hábitos se traslapan${capped ? ', y con tope' : ''}.` : '.'),
    ],
    triedOne: (label, years, healthy) => `${label}: unos ${years} años por sí solo, ${healthy} con buena salud`,
    triedHealthy: (years) => [s(' La franja verde crece unos '), b(`${years} años con buena salud`), s('.')],
    tapWhatIf: 'Toca un “¿Y si…?” en el calendario para ver cuánto podría sumar un cambio.',
    makePlan: 'Hacer un plan pequeño',
    makePlanA11y: (label) => `Hacer un plan pequeño para: ${label}`,
    onePlanAtATime: (sentence) => `Un plan pequeño a la vez: este tomaría el lugar de “${sentence}”`,
    tablesFor: (country) => `Partimos de las tablas de vida de ${country}.`,
    tablesUS: 'Partimos de una aproximación de las tablas de vida de EE. UU.',
    changeCountry: 'Cambiar país',
    setCountry: 'Elegir tu país',
    phoneTitle: 'Tu celular',
    phoneLine: (hours, years, share) => [
      s(`${hours} horas al día suman unos `),
      b(`${years} años`),
      s(` del tiempo que probablemente te queda: ${share} de tus horas de vigilia.`),
    ],
    phoneSwap: (swap) =>
      `Media hora menos al día podría convertirse en ${swap}. En experimentos, usar menos las redes sociales significó más tiempo con familia y amigos, y menos soledad.`,
    phoneAsk:
      '¿Cuántas horas al día pasas en tu celular? Tu configuración de Tiempo en pantalla o Bienestar digital muestra el promedio diario.',
    habitsTitle: 'Tus hábitos',
    habitsNeutral: 'Tus hábitos te mantienen cerca de la estimación base.',
    habitsEffect: (adds, years) => [s(`Tus hábitos ${adds ? 'suman' : 'restan'} unos `), b(`${years} años`), s('.')],
    withinReach: 'A tu alcance',
    moreWeekends: (n) => `unos ${n} fines de semana más`,
    together: (several, gain, capped) => [
      s(several ? 'Juntos, unos ' : 'Eso es como '),
      b(`${gain} años más`),
      s(`${capped ? ' (con tope: los efectos de los hábitos se traslapan)' : ''}. Pruébalos en el calendario con “¿Y si…?”.`),
    ],
    allGood: 'Ya estás haciendo lo que más tiempo suma. Sigue así, y mantén cerca a tu gente.',
    healthy: {
      eyebrow: 'Fuerte e independiente',
      years: (med, lo, hi) => [
        s('Cerca de '),
        b(`${med} de esos años`),
        s(` probablemente serán con buena salud: fuerte, estable y valiéndote por ti mismo. Para la mayoría de las personas como tú, ${lo}–${hi}.`),
      ],
      later:
        'Los años más tardíos suelen traer más achaques y enfermedades, y apoyarse un poco más en quienes te rodean. Cuántos, y qué tan pronto, depende en parte de ti.',
      lever: (label, years, why) => [
        s(`${label} podría sumar unos `),
        b(`${years} de ellos`),
        s(why === 'strength' ? ': piernas más fuertes, mejor equilibrio, menos caídas.' : why === 'more' ? ', más de lo que suma a tu vida.' : '.'),
      ],
      allGood: 'Ya haces lo que mantiene fuertes a las personas por más tiempo. Sigue así, y mantén cerca a tu gente.',
      askStrength: '¿Haces ejercicios de fuerza? Agrega tu respuesta',
      sourceHealthy: 'Años con salud',
      sourceHabits: 'Hábitos',
    },
  },

  share: {
    half: 'cerca de la mitad',
    third: 'cerca de una tercera parte',
    quarter: 'cerca de una cuarta parte',
    seventh: 'cerca de una séptima parte',
    pct: (p) => `${p}%`,
  },
  swap: {
    dog: (name, walks) => `un paseo diario con ${name}: unos ${walks} paseos más`,
    dinners: (n, person) =>
      `unas ${n} cenas de dos horas al año ${person ? `con ${person} o con amigos` : 'con amigos y familia'}`,
  },

  habitsScreen: {
    eyebrow: 'Lo que está en tus manos',
    title: 'Cambia un hábito, cambia la cuenta',
    median: (country) =>
      `edad mediana para alguien que vive como tú${country ? ` en ${country}` : ''}. Toca una opción para ver qué cambiaría.`,
    whatMatters: 'LO QUE MÁS IMPORTA',
    ranked: 'Ordenado por tamaño y solidez de la evidencia. Toca uno para ver los números y la fuente.',
    exerciseReplaced: 'Reemplazado por tus pasos diarios de arriba, para no contar nada dos veces.',
    youNow: 'tú ahora',
    noChange: 'sin cambio',
    stepsHeading: 'PASOS AL DÍA',
    stepsA11y: 'Pasos diarios en promedio',
    stepsAnswer: (n) => `${n} pasos al día`,
    math1: (n) => `1 · Promedio: ${n} pasos al día`,
    math2: (hr) => `2 · Riesgo frente a 6,000 pasos: × ${hr}`,
    math3: (hr, b) => `3 · Años ≈ ln(1 ÷ ${hr}) ÷ ${b} = `,
    math4: '4 · Reemplaza tu respuesta de ejercicio; el beneficio se estabiliza en 10,000.',
    useExercise: 'Usar mi respuesta de ejercicio',
    stepsHint:
      'Toca + o − para usar tus pasos en lugar de tu respuesta de ejercicio. La app de salud de tu celular muestra tu promedio.',
    inEstimate: 'Forma parte de tu estimación.',
    notInEstimate: 'Todavía no está en tu estimación; se muestra como orientación.',
    howItWorks: 'CÓMO FUNCIONA TU ESTIMACIÓN',
    strength: { strong: 'fuerte', moderate: 'moderada', emerging: 'emergente' },
    healthspan: 'MANTENERTE FUERTE E INDEPENDIENTE',
    healthspanNote: 'Lo que mantiene sanos los últimos años: la franja verde de tu calendario de Vida. Toca uno para ver los números y la fuente.',
    strengthNote: (years) =>
      `Su efecto más grande está en mantenerte fuerte e independiente: dos veces a la semana podría sumar unos ${years} años con buena salud.`,
    strengthKeep: 'Dos veces a la semana te mantiene más fuerte y estable por más tiempo. Sigue así.',
  },

  evidence: {
    smoking: {
      title: 'No fumar',
      summary: 'La palanca individual más grande. Dejarlo a cualquier edad ayuda.',
      detail: 'Fumar casi duplica el riesgo anual de morir (×2.2 en esta app). Después de dejarlo baja hacia ×1.3.',
    },
    moving: {
      title: 'Moverte más y mantenerte en forma',
      summary: 'El riesgo sigue bajando hasta 8–10 mil pasos al día antes de los 60, y 6–8 mil después de los 60.',
      detail:
        'En 15 cohortes (47,471 adultos), más pasos diarios significaron menor mortalidad hasta esos niveles. La condición cardiovascular es de lo que mejor predice la supervivencia, sin un límite superior de beneficio observado.',
    },
    relationships: {
      title: 'Relaciones cercanas',
      summary: 'El aislamiento y la soledad se asocian con un riesgo 26–32% mayor de morir antes, a la par de fumar o la obesidad.',
      detail:
        'En 70 estudios (3.4 millones de personas), el aislamiento social, la soledad y vivir solo aumentaron cada uno las probabilidades de muerte temprana entre una cuarta y una tercera parte. Una revisión anterior de 148 estudios encontró que los lazos fuertes iban con 1.5× las probabilidades de sobrevivir. En un estudio de Harvard de 85 años, la satisfacción con las relaciones a los 50 predijo la salud a los 80 mejor que el colesterol.',
    },
    diet: {
      title: 'Lo que comes',
      summary: 'Más leguminosas, granos enteros y nueces; menos carne roja y procesada.',
      detail:
        'Un cambio duradero de una dieta occidental típica a una óptima se asocia con 10–13 años más si se hace a los 20, unos 8 a los 60 y más de 3 a los 80. Es un estudio de modelado: promedios de población, no pronósticos individuales.',
    },
    weight: {
      title: 'Peso y presión arterial saludables',
      summary: 'Ambos impulsan las enfermedades del corazón, la principal causa de muerte.',
      detail:
        'El peso saludable es uno de los cinco hábitos que juntos se asociaron con 12–14 años más a los 50, y con unos 8–11 años más libres de cáncer, enfermedades del corazón y diabetes.',
    },
    strength: {
      title: 'Ejercicios de fuerza',
      summary: '30–60 minutos a la semana se asocian con 10–17% menos mortalidad, y con mantenerte fuerte e independiente por más tiempo.',
      detail:
        'Además del ejercicio aeróbico, no en su lugar; no está claro que ayude más de una hora a la semana. Su efecto más grande está en los últimos años: el trabajo de fuerza y equilibrio significa menos caídas y menos discapacidad (ver "Mantenerte fuerte e independiente"). En esta app, dos veces a la semana cuenta ×0.85 en el riesgo de morir y ×0.82 en el riesgo de perder la buena salud.',
    },
    purpose: {
      title: 'Un sentido de propósito',
      summary: 'Se asocia con un 17% menos de mortalidad y menos infartos y derrames cerebrales.',
      detail:
        'En 10 estudios (136,265 personas) en Estados Unidos y Japón, donde se le llama ikigai: "una vida que vale la pena vivir". El optimismo muestra un patrón parecido.',
    },
    sleep: {
      title: 'Dormir 7–8 horas',
      summary: 'Dormir menos de 6 horas se asocia con 12% más mortalidad.',
      detail: 'Dormir muchísimo también muestra más riesgo, pero suele ser señal de enfermedad más que su causa.',
    },
    alcohol: {
      title: 'Tomar poco',
      summary: 'Tomar poco no protege; el riesgo sube a partir de unas 2 bebidas al día en mujeres y 3 en hombres.',
      detail:
        'Un metaanálisis de 107 cohortes (4.8 millones de personas) no encontró menor mortalidad en quienes toman poco que en quienes nunca han tomado.',
    },
    helping: {
      title: 'Ayudar a otros',
      summary: 'Hacer voluntariado en la edad madura se asocia con 24% menos mortalidad.',
      detail: 'Después de ajustar por salud, en 14 estudios de adultos de 55 años o más.',
    },
    scrolling: {
      title: 'Menos pantalla, más personas',
      summary: 'En experimentos, dejar las redes sociales significó más tiempo con familia y amigos, y menos soledad.',
      detail:
        'Desactivar Facebook durante 4 semanas mejoró el bienestar y el tiempo fuera de línea con amigos y familia. Limitar las redes sociales a unos 30 minutos al día durante 3 semanas redujo la soledad y la depresión.',
    },
    healthyHabits: {
      title: 'Los hábitos sanos suman años con salud',
      summary: 'A los 50, 4–5 hábitos sanos se asociaron con unos 10.7 (mujeres) y 7.6 (hombres) años más sin cáncer, enfermedad cardiaca ni diabetes.',
      detail:
        'En dos grandes cohortes de Harvard, los años totales subieron casi lo mismo (+9.4 mujeres, +8.1 hombres): casi todo el tiempo extra fue tiempo con salud, y los años vividos con enfermedad apenas cambiaron. Los hábitos: no fumar, peso saludable, 30+ minutos de actividad al día, beber poco o nada, buena alimentación. La app mueve tus años con salud según tus hábitos.',
    },
    falls: {
      title: 'El ejercicio previene caídas',
      summary: 'El ejercicio redujo las caídas en personas mayores 23%; los programas con fuerza y equilibrio, cerca de un tercio.',
      detail:
        'Revisión Cochrane de 108 ensayos (23,407 personas de más de 60 que viven en casa). Razón de tasas global 0.77 (evidencia de alta certeza); equilibrio y ejercicio funcional 0.76; varios tipos juntos, por lo general equilibrio más fuerza, 0.66 (certeza moderada).',
    },
    mobility: {
      title: 'Seguir caminando por tu cuenta',
      summary: 'En un ensayo con 1,635 personas de 70–89 años, caminar con trabajo de fuerza y equilibrio redujo 18% la discapacidad grave para moverse.',
      detail:
        'El ensayo LIFE: un programa moderado y estructurado (caminar, fuerza, flexibilidad, equilibrio) frente a educación en salud, durante 2.6 años. Perder la capacidad de caminar 400 m: 30.1% frente a 35.5% (HR 0.82). Es un solo ensayo grande de un programa combinado, así que no se sabe qué parte se debe solo a la fuerza. La app usa 0.82 para la fuerza dos veces a la semana.',
    },
    grip: {
      title: 'Fuerza de agarre',
      summary: 'Las personas de más de 60 con agarre débil tuvieron cerca de 1.8× más probabilidad de perder funcionalidad, y de morir, durante el seguimiento.',
      detail:
        'Metaanálisis de 34 estudios de personas de 60 o más que viven en casa: razón combinada de 1.78 para el deterioro físico y 1.79 para la mortalidad, agarre bajo frente a alto. El agarre es un indicador de la fuerza general; es observacional, así que muestra quién está en riesgo más que qué hacer, pero la fuerza se conserva entrenándola.',
    },
  },

  howItWorks: [
    'El riesgo anual de morir de todos aumenta con la edad: se duplica más o menos cada 7 años. Partimos de esa curva para tu sexo en tu país, ajustada a su tabla de vida de la ONU (World Population Prospects 2024, muertes en 2023). Sin país, usamos una aproximación de las tablas de EE. UU.',
    'Tus hábitos multiplican ese riesgo: fumar ×2.2, hacer ejercicio 3+ veces por semana ×0.85, dormir menos de 6 horas ×1.15, casi nunca ver a la gente cercana ×1.29, y así.',
    'Seguimos ese riesgo mes a mes desde tu edad actual. La edad a la que ha muerto la mitad de las personas como tú es tu mediana; las marcas del 25% y 75% dan tu rango.',
    'Regla práctica: años ≈ ln(multiplicador de riesgo) ÷ 0.085. Por eso duplicar tu riesgo cuesta unos 8 años, y dejar de fumar puede devolverte unos 9.',
    'Varios cambios juntos suman menos que la suma de cada uno, y ponemos un tope total de 14 años, la mayor diferencia por todos los hábitos encontrada en un estudio grande de EE. UU.',
    'Los años con salud parten de la esperanza de vida saludable de tu país (OMS, 2023): la parte de los años por delante que las personas de tu edad pasan con buena salud. Juntamos el tiempo menos sano al final, donde cae la mayor parte, así que se ve como una franja que se desvanece, no como una fecha.',
    'Los hábitos mueven los años con salud casi tanto como los años totales, como en un gran estudio de Harvard, y la fuerza todavía más: mantiene a las personas fuertes, estables e independientes. Aplica el mismo tope de 14 años.',
    'Son asociaciones de estudios de población, no causas, y no son consejo médico.',
  ],

  claims: {
    lifeTables: 'Tablas de vida de 237 países y territorios, por sexo, estimaciones de 2023.',
    plans:
      'Decidir cuándo y dónde vas a hacer algo, como un “si pasa esto, hago aquello”, hace mucho más probable cumplirlo (94 estudios).',
    freshStart: 'Es más fácil empezar una meta al inicio de una semana, de un mes o en un cumpleaños: un nuevo comienzo.',
    comingBack:
      'En la prueba más grande de recordatorios para hacer ejercicio (61,293 personas), lo que más ayudó fue premiar el regreso después de faltar.',
    personalNumbers:
      'Ver tus propios números puede ayudar: los fumadores a quienes se les dijo su “edad pulmonar” tuvieron el doble de probabilidad de dejarlo en un año (13.6% vs 6.4%).',
    walkAfterMeals: 'Caminar unos minutos después de comer bajó el azúcar en la sangre cerca de 17% comparado con quedarse sentado.',
  },

  plans: {
    everyDay: 'Todos los días',
    weekdays: 'Entre semana',
    weekends: 'Los fines de semana',
    days: (days) => {
      const names = ['domingos', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábados'];
      const short = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
      if (days.length === 1) return `Los ${names[days[0]]}`;
      if (days.length === 2) return `Los ${names[days[0]]} y ${names[days[1]]}`;
      return list(days.map((d) => short[d]));
    },
    time: (h, m) => `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'a. m.' : 'p. m.'}`,
    cue: (days, anchor, time) => `${days} ${anchor ?? `a las ${time}`}`,
    sentence: (cue, action) => `${cue}, voy a ${action}.`,
    nameInSentence: (name) => name.replace(/^Mi /, 'mi ').replace(/^Mis /, 'mis '),
    today: 'hoy',
    tomorrow: 'mañana',
    anchors: {
      breakfast: 'después de desayunar',
      lunch: 'después de comer',
      work: 'después del trabajo',
      dinner: 'después de cenar',
      morning: 'en la mañana',
      cigarette: 'cuando tenga ganas de fumar',
      atLunch: 'a la hora de la comida',
      coffee: 'después de mi café de la mañana',
    },
    call: (name) => `llamarle a ${name}`,
    messageOrCall: (name) => `escribirle o llamarle a ${name}`,
    actions: {
      walk: 'salir a caminar 10 minutos',
      connect: 'llamar o ver a alguien que quiero',
      bed: 'dejar el celular y prepararme para dormir',
      smoke: 'caminar 5 minutos primero',
      drink: 'tomarme primero un vaso de agua mineral',
      plate: 'llenar la mitad de mi plato con verduras',
      strength: 'hacer 10 minutos de sentadillas, lagartijas y cargar peso',
    },
    withAnchor: (action, anchor) => `${action} ${anchor}`,
    capitalize: (s) => s.charAt(0).toUpperCase() + s.slice(1),
    periodWeek: 'esta semana',
    periodBirthday: 'tu nuevo año',
    calendarNote: 'Si te saltas una, no pasa nada: retómalo la próxima vez. Desde Memento Mori.',
    when: 'CUÁNDO',
    daysA11y: 'Días',
    atSetTime: 'a una hora fija',
    anchorPlaceholder: 'o con tus palabras: cuando llegue a casa',
    anchorA11y: 'El momento que te lo recuerda, con tus palabras',
    around: 'Más o menos (para recordatorios)',
    at: 'A las',
    timeA11y: 'Hora',
    iWill: 'VOY A',
    actionPlaceholder: 'llamarle a mamá',
    actionA11y: 'Lo que vas a hacer',
    save: 'Guardar plan',
    cancel: 'Cancelar',
    planReachOut: 'Planear cuándo buscarle',
    planReachOutA11y: (name) => `Planear cuándo buscar a ${name}`,
    yourPlan: 'Tu plan',
    edit: 'Editar',
    removeA11y: 'Quitar este plan',
    addToCalendar: 'Agregar a mi calendario',
    calendarSaved: 'Guardado: ábrelo para agregarlo ✓',
    addToCalendarA11y: (title) => `Agregar "${title}" a tu calendario como evento que se repite`,
  },

  thisWeek: {
    heading: 'Esta semana',
    doneToday: 'hecho hoy ✓',
    doneThisWeek: 'hecho esta semana ✓',
    next: (when) => `siguiente: ${when}`,
    welcomeBack: (name) =>
      `Qué bueno verte de nuevo${name ? `, ${name}` : ''}. A todos se nos pasan los planes, y está bien: lo que cuenta es retomarlos. Esta semana es una página nueva.`,
    oneThingFor: (period) => `Una cosa para ${period}`,
    doneMark: ' · hecho ✓',
    did: 'Hecho',
    didToday: 'Hecho hoy ✓',
    moreVisits: (n, name) => `Unas ${n} visitas más con ${name} a tu ritmo actual.`,
    smallStep: (label, years) => `${label} podría sumar unos ${years} años. Este es un pasito hacia eso.`,
    noPlans:
      'Todavía no hay planes. Un plan es un pequeño “cuándo, qué”: “Los domingos después de comer, voy a llamarle a mamá.” Puedes hacer uno para cualquier persona en Amores, o para un hábito en Vida.',
    suggestHeading: 'Un plan que podrías probar',
    suggestPerson: (n, name) =>
      `Unas ${n} visitas más con ${name} a tu ritmo actual. Un plan hace más probable la siguiente.`,
    suggestLever: (label, years) => `${label} podría sumar unos ${years} años. Un plan pequeño es una forma de empezar.`,
    whyPlans: 'Por qué ayudan los planes',
    makeItMine: 'Hacerlo mi plan',
    changeIt: 'Cambiarlo',
    notNow: 'Ahora no',
  },

  freshStart: {
    eyebrow: { week: 'Lunes · un nuevo comienzo', month: 'Día 1 · un nuevo comienzo', birthday: 'Tu cumpleaños · un nuevo comienzo' },
    title: (period) => `¿Una cosa para ${period}?`,
    birthday: (name, weeks) =>
      `Feliz cumpleaños${name ? `, ${name}` : ''}. Has vivido unas ${weeks} semanas, algunas maravillosas. ¿Qué es una cosa que podrías hacer con el año que empieza?`,
    prompt: (week, month) =>
      `¿Qué es una cosa que podrías hacer ${week ? 'esta semana' : `en ${month}`} y que te daría gusto haber hecho?`,
    callIdea: (name) => `Llamarle a ${name}`,
    gratitudeIdea: 'Escribirle a alguien a quien le estoy agradecido',
    useIdea: (idea) => `Usar idea: ${idea}`,
    ownPlaceholder: 'o la tuya',
    a11y: (period) => `Una cosa para ${period}`,
    choose: 'Hacerla mi cosa',
    notToday: 'Hoy no',
  },

  todaysCount: {
    pet: '¿Un paseo o un rato tranquilo juntos hoy?',
    activity: '¿Podrías elegir un día para la próxima? Decidir cuándo lo hace más probable.',
    agency: (label, years, more, what) => [
      s(`${label} podría sumar unos `),
      b(`${years} años`),
      s(': unas '),
      b(more),
      s(` ${what}. Puedes probarlo en el calendario de Vida.`),
    ],
  },

  loves: {
    per: PER,
    pace: (count, per) => `${count} ${plural(count, 'vez', 'veces')} ${PER[per]}`,
    reasonBoth: (pace) => `${pace}, en los años que probablemente tienen los dos`,
    reasonUntil: (pace, age) => `${pace}, hasta que tengas ${age}`,
    reasonLife: (pace) => `${pace}, por el resto de tu vida`,
    moreWith: (unit, name) => `${UNIT[unit]} más con ${name}`,
    moreTimes: (activity) => `veces más: ${activity.toLowerCase()}`,
    aboutMore: (n, unit) => [s('unas '), b(n), s(` ${UNIT[unit]} más`)],
    since: {
      today: 'hoy',
      yesterday: 'ayer',
      days: (n) => `hace ${n} días`,
      months: (n) => `hace ${n} meses`,
    },
    suggestPeople: {
      mom: 'Mamá',
      dad: 'Papá',
      friend: 'Mi mejor amigo',
      grandma: 'Mi abuelita',
      dog: 'Mi perro',
      cat: 'Mi gato',
    },
    suggestActivities: {
      soccer: 'Jugar fútbol',
      movies: 'Ir al cine',
      read: 'Leer un libro',
      travel: 'Viajar a un lugar nuevo',
      cook: 'Cocinar para amigos',
    },
    eyebrow: 'Lo que amas',
    title: '¿Cuántas veces más?',
    sub: 'A tu ritmo actual, en la vida que probablemente te queda.',
    empty: 'Todavía no hay nada aquí. Agrega a alguien que te ama, o algo que te encante hacer.',
    addHeading: 'AGREGAR',
    addToA11y: 'Agregar a',
    groups: { who: 'Quién te ama', what: 'Lo que amas' },
    cardA11y: (n, label, reason) => `Unas ${n} ${label}. ${reason}.`,
    kinds: { person: 'Persona', pet: 'Mascota' },
    species: { dog: 'Perro', cat: 'Gato' },
    personOrPet: 'Persona o mascota',
    kindOfPet: 'Tipo de mascota',
    useSuggestion: (name) => `Usar sugerencia: ${name}`,
    whoA11y: 'Quién',
    whatA11y: 'Qué',
    petPlaceholder: 'Max, Luna…',
    personPlaceholder: 'Mamá, mi pareja, Sam…',
    activityPlaceholder: 'Jugar fútbol, leer, viajar…',
    howOftenSee: 'Qué tan seguido los ves',
    howOftenDo: 'Qué tan seguido lo haces',
    fewer: 'Menos',
    times: (n) => plural(n, 'vez', 'veces'),
    perA11y: 'Por',
    theirAge: 'Su edad (opcional)',
    petAge: 'Su edad en años (opcional)',
    untilAge: '¿Hasta qué edad? (opcional)',
    phoneA11y: 'Teléfono (opcional)',
    phonePlaceholder: 'Teléfono (opcional, para Llamar y Mensaje)',
  },

  reach: {
    lastTime: (since) => `La última vez que hablaron o se vieron: ${since}.`,
    hint: 'Toca "Hablamos" después de una llamada o visita para llevar la cuenta.',
    claim: 'A la gente le gusta que la busquen más de lo que creemos, sobre todo cuando ha pasado un tiempo.',
    message: 'Mensaje',
    call: 'Llamar',
    weTalked: 'Hablamos',
    logged: 'Anotado ✓',
    logA11y: (name) => `Anotar que hoy hablaste con ${name}`,
    openers: [
      'Me acordé de ti. ¿Tienes tiempo para cenar esta semana?',
      '¡Hola! Ya pasó mucho tiempo. ¿Nos hablamos este fin de semana?',
      'Nada más quería decirte que te quiero.',
      'Hoy me acordé de algo chistoso de nosotros. ¿Cuándo nos ponemos al día?',
      'No dejemos pasar otro mes. ¿Un café pronto?',
    ],
  },

  today: {
    reachOut: 'Busca a alguien hoy',
    moreVisits: (n) => [s('Unas '), b(n), s(' visitas más a tu ritmo actual. Un mensaje toma un minuto.')],
    isolation:
      'Las personas que se mantienen cerca de otras viven más: el aislamiento y la soledad se asocian con un riesgo 26–32% mayor de morir antes.',
    connectionLever: (years) => `En tu caso, ver cada semana a la gente que quieres podría sumar unos ${years} años.`,
    connectionOften: 'Ver a tu gente cada semana ya forma parte de tu estimación. Sigue así.',
    noPerson:
      'Las relaciones cercanas son de lo que mejor predice una vida larga y sana. ¿A quién te gustaría ver más?',
    addSomeone: 'Agrega a alguien que te ama',
    noneLogged: 'Todavía no hay llamadas ni visitas anotadas en los últimos 30 días.',
    peopleThisMonth: (n) => `En los últimos 30 días hablaste o te viste con ${n} de las personas que quieres.`,
  },

  daily: {
    quotes: [
      ['No vivas como si fueras a vivir diez mil años. Mientras vivas, mientras esté en tu poder, sé bueno.', 'Marco Aurelio · Meditaciones IV.17'],
      ['Mientras aplazamos las cosas, la vida pasa de prisa.', 'Séneca · Cartas 1'],
      ['Piensa que ya has muerto, que ya viviste tu vida. Ahora toma lo que te queda y vívelo como se debe.', 'Marco Aurelio · Meditaciones VII.56'],
      ['Preparemos el ánimo como si hubiéramos llegado al final de la vida. No aplacemos nada.', 'Séneca · Cartas 101'],
      ['No es que tengamos poco tiempo para vivir, sino que desperdiciamos mucho.', 'Séneca · Sobre la brevedad de la vida'],
      ['Ten cada día ante tus ojos la muerte, y nunca tendrás un pensamiento mezquino.', 'Epicteto · Enquiridión 21'],
      ['Cada quien vive solo este momento presente. Todo lo demás ya pasó o es incierto.', 'Marco Aurelio · Meditaciones III.10'],
      ['Empieza ya a vivir, y cuenta cada día como una vida aparte.', 'Séneca · Cartas 101'],
      ['Podrías dejar la vida ahora mismo. Que eso decida lo que haces, dices y piensas.', 'Marco Aurelio · Meditaciones II.11'],
      ['Nadie es libre si no es dueño de sí mismo.', 'Epicteto · Fragmentos'],
    ],
    questions: [
      '¿Qué haría que el día de hoy valiera la pena?',
      '¿Quién merece hoy toda tu atención?',
      '¿Qué estás aplazando que lamentarías no haber hecho nunca?',
      '¿Qué está hoy en tus manos y qué no?',
      'Si este fuera tu último {day} normal, ¿qué dejarías igual?',
      '¿Qué harías hoy si no tuvieras miedo?',
      '¿Qué puedes soltar hoy?',
      '¿Por qué quieres que te recuerden, y el día de hoy te acercó a eso?',
    ],
    loveSub: (pace) => `${pace}, en el tiempo que probablemente tienes.`,
    weekends: { what: 'fines de semana más', sub: 'Cada uno es un sábado y un domingo que puedes vivir con intención.' },
    summers: { what: 'veranos más', sub: 'Tardes largas. Noches tibias. No son infinitos.' },
    moons: { what: 'lunas llenas más', sub: 'Sal a ver la próxima.' },
    lived: { what: 'fines de semana ya vividos', sub: 'Algunos fueron maravillosos. Agradece esos, y haz espacio para más.' },
  },

  opening: {
    lookBack: 'Mira atrás',
    todaysCount: 'La cuenta de hoy',
    today: 'Hoy',
    agency: (label, years, more, what) => [
      s(`${label} podría sumar unos `),
      b(`${years} años`),
      s('. Eso es como '),
      b(more),
      s(` ${what}.`),
    ],
    tapToSee: 'Toca para ver tu vida',
    cardOf: (i, n) => `Tarjeta ${i} de ${n}`,
    seeLife: 'Ver tu vida',
    next: 'Siguiente',
  },

  gentle: {
    setting: 'Ocultar números',
    settingNote:
      'Palabras en lugar de años, semanas y cuentas en Vida, Amores, Hoy y la apertura. El calendario se queda, sin sus números.',
    ahead: {
      most: 'La mayor parte de tu vida está por delante.',
      plenty: 'Es probable que tengas muchos años buenos por delante.',
      some: 'Todavía hay años buenos por delante. Dedícalos a lo que amas.',
      gift: 'Cada día a partir de aquí es un regalo. Dedícalo a lo que amas.',
    },
    caption: {
      life: 'Este año de tu vida está en marcha. ',
      weeks: 'Esta semana de tu vida está en marcha. ',
      year: {
        early: 'La mayor parte de este año está por delante.',
        middle: 'Este año va avanzado. Todavía le queda buen tiempo.',
        late: 'Este año casi termina. Haz que sus últimas semanas cuenten.',
      },
      today: {
        early: 'La mayor parte del día está por delante. Úsalo con intención.',
        middle: 'El día va avanzado. Usa lo que queda con intención.',
        late: 'El día casi termina. Usa lo que queda con intención.',
      },
      layers: (phone) =>
        phone
          ? ' Una parte es sueño (tiempo bien usado) y otra es en el celular; el resto es despierto y lejos de él.'
          : ' Una parte es sueño, tiempo bien usado; el resto es despierto.',
      health: ' Muchos de ellos probablemente serán con fuerza e independencia: la franja verde, que se desvanece donde las personas difieren.',
    },
    range:
      'Un rango, no una fecha: los círculos llenos son probables, los anillos son si la suerte lo permite, y los hábitos pueden moverlos.',
    whatIfA11y: (label) => `¿Y si…?: ${label}, podría sumar tiempo`,
    triedTotal: (several) =>
      several
        ? 'Juntos podrían sumar buen tiempo: menos que la suma, porque los efectos de los hábitos se traslapan.'
        : 'Esto podría sumar buen tiempo.',
    phoneLine: (share) => `Tu celular se lleva ${share} de tus horas despierto.`,
    phoneSwap:
      'Media hora menos al día podría convertirse en más tiempo con la gente que amas. En experimentos, usar menos redes sociales significó más tiempo con familia y amigos y menos soledad.',
    habitsEffect: (adds) => (adds ? 'Tus hábitos suman tiempo a tu estimación.' : 'Tus hábitos le restan algo de tiempo a tu estimación.'),
    adds: 'suma tiempo',
    costs: 'resta tiempo',
    couldAdd: 'podría sumar buen tiempo',
    together: (several) =>
      several ? 'Juntos podrían sumar años buenos. Pruébalos en el calendario con ¿Y si…?' : 'Pruébalo en el calendario con ¿Y si…?',
    howMany: {
      few: 'Unas cuantas veces más de las que crees.',
      many: 'Muchas veces más, si les haces espacio.',
    },
    pace: 'A tu ritmo actual.',
    loveSub: 'A tu ritmo actual, en el tiempo que probablemente tienes.',
    agency: (label) => `${label} podría sumar más de estos. Puedes probarlo en el calendario de Vida.`,
    moreVisits: (name) => `Más visitas con ${name} de las que crees, a tu ritmo actual.`,
    reachOut: 'Más visitas de las que crees, a tu ritmo actual. Un mensaje toma un minuto.',
    smallStep: (label) => `${label} podría sumar buen tiempo. Este es un paso pequeño hacia eso.`,
    suggestPerson: (name) =>
      `Más visitas con ${name} de las que crees, a tu ritmo actual. Un plan hace más probable la siguiente.`,
    suggestLever: (label) => `${label} podría sumar buen tiempo. Un plan pequeño es una forma de empezar.`,
    birthday: (name) =>
      `Feliz cumpleaños${name ? `, ${name}` : ''}. Has vivido muchas semanas, algunas maravillosas. ¿Qué es algo que podrías hacer con el año que viene?`,
    isolation: 'Las personas que se mantienen cerca de otras tienden a vivir más y con más salud.',
    connectionLever: 'Para ti, ver cada semana a la gente que amas podría sumar buen tiempo.',
    noneLogged: 'Todavía no hay llamadas ni visitas registradas este último mes.',
    someThisMonth: 'Este último mes hablaste con o viste a algunas de las personas que amas.',
    healthy: {
      years:
        'Es probable que muchos de los años por delante sean con fuerza e independencia: la franja verde de tu calendario, que se desvanece donde las personas difieren.',
      lever: (label, strength) =>
        strength
          ? `${label} podría mantenerte con fuerza e independencia por más tiempo: piernas más fuertes, mejor equilibrio, menos caídas.`
          : `${label} podría sumar años con salud.`,
      tried: ' La franja verde también crece.',
      reveal: (lever) => 'Es probable que muchas de esas semanas sean con fuerza e independencia.' + (lever ? ` ${lever} podría sumar más.` : ''),
    },
    reveal: {
      fullLife: 'Una vida plena es una larga serie de semanas, y vas a medio camino. Hagamos que el resto cuente.',
      person: (label, howMany) => `Eso incluye ${label}. ${howMany}`,
      phone: 'Tu celular se lleva una parte. Media hora menos al día podría convertirse en más tiempo con la gente que amas.',
      lever: (label) => ` ${label} podría sumar años buenos.`,
      range: (country) =>
        `Esto es un rango, no una fecha, de cuánto suelen vivir las personas que viven como tú${country ? ` en ${country}` : ''}. No es consejo médico.`,
    },
  },

  account: {
    title: 'Tú',
    edit: 'Editar tus respuestas',
    dataHeading: 'TUS DATOS',
    dataBody:
      'Todo lo que escribes se queda en este dispositivo. No hay cuenta, ni anuncios, ni rastreo. Tu estimación se calcula aquí mismo, en tu celular o en tu navegador.',
    guestNote: (guest) =>
      `También tienes una ${guest ? 'cuenta de invitado' : 'cuenta con sesión iniciada'} de una prueba anterior. Solo guarda un perfil vacío; al borrar abajo se cierra la sesión.`,
    confirm:
      'Esto borra tus respuestas, las personas y cosas que amas, y todo lo demás en este dispositivo. No se puede deshacer.',
    yesDelete: 'Sí, borrar todo',
    keep: 'Conservar mis datos',
    deleteAll: 'Borrar todo en este dispositivo',
    signOutFailed: 'No se pudo cerrar la sesión.',
    disclaimer:
      'Las estimaciones vienen de estudios de población. Muestran la dirección y el tamaño aproximado, no son una promesa ni un consejo médico.',
  },
};
