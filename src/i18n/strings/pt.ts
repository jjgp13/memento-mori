/** Português (Brasil): "você", tom calmo e próximo. */
import { b, s } from '@/i18n/rich';
import type { Strings } from '@/i18n/strings/en';
import type { Per } from '@/lib/loves';

type Unit = 'visits' | 'days' | 'times';

const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);

/** "a, b e c" */
const list = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} e ${xs.at(-1)}`);

const PER: Record<Per, string> = { day: 'por dia', week: 'por semana', month: 'por mês', year: 'por ano' };
const UNIT: Record<Unit, string> = { visits: 'visitas', days: 'dias', times: 'vezes' };

export const pt: Strings = {
  common: {
    back: '← Voltar',
    close: 'Fechar',
    continue: 'Continuar',
    skip: 'Pular',
    skipForNow: 'Pular por enquanto',
    save: 'Salvar',
    done: 'Pronto',
    add: 'Adicionar',
    remove: 'Remover',
    removeA11y: (name) => `Remover ${name}`,
    less: 'Menos',
    more: 'Mais',
    you: 'Você',
    source: 'Fonte',
    why: 'Por quê',
    theScience: 'A ciência',
    lifeTables: 'Tábuas de vida',
    sourceA11y: (prefix, label) => `${prefix}: ${label}, abre no navegador`,
    tickingSound: 'Som de relógio',
    clockTicking: 'Tique-taque do relógio',
    hoursValue: (h) => `${h} h`,
    yrs: (signed) => `${signed} anos`,
    years: (y) => `${y} anos`,
    notAdvice:
      'As estimativas vêm de médias populacionais e de razões de risco gerais. Mostram a direção e o tamanho aproximado, não são uma promessa nem orientação médica.',
    list,
  },

  tabs: { life: 'Vida', habits: 'Hábitos', loves: 'Amores', today: 'Hoje' },

  language: {
    heading: 'IDIOMA',
    note: 'Segue o idioma do seu aparelho até você escolher um.',
    a11y: 'Idioma',
  },

  date: {
    months: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
    monthsShort: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
    monthInitials: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    weekdayInitials: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    weekdays: ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
    weekdaysShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
    year: 'Ano',
    month: 'Mês',
    day: 'Dia',
    decade: (d) => `Anos ${d}`,
    hour: (h) => `${h}h`,
  },

  habits: {
    smoke: {
      question: 'Você fuma cigarro?',
      short: 'Cigarro',
      why: 'O hábito que mais pesa nesta lista.',
      options: { never: 'Nunca', former: 'Parei', current: 'Sim' },
    },
    exercise: {
      question: 'Numa semana normal, em quantos dias você se mexe o bastante para ficar ofegante?',
      short: 'Exercício',
      why: 'Por 20 minutos ou mais: caminhada rápida, bicicleta, dança ou esporte contam.',
      options: { none: 'Raramente', some: '1–2 dias por semana', regular: '3 dias ou mais por semana' },
    },
    bmi: {
      question: 'O que mais se aproxima do seu peso para a sua altura?',
      short: 'Peso',
      why: 'Uma estimativa basta. São as faixas do índice de massa corporal (IMC): menos de 18,5, 18,5–25, 25–30, 30 ou mais.',
      options: { under: 'Abaixo do peso', normal: 'Peso saudável', over: 'Sobrepeso', obese: 'Obesidade' },
    },
    alcohol: {
      question: 'Numa semana normal, quantas bebidas alcoólicas você toma?',
      short: 'Álcool',
      why: 'Uma dose é uma lata de cerveja, uma taça de vinho ou uma dose de destilado.',
      options: { none: '0–2 por semana', moderate: '3–14 por semana', heavy: '15 ou mais por semana' },
    },
    sleep: {
      question: 'Numa noite normal, quantas horas você dorme?',
      short: 'Sono',
      why: 'Na maioria das noites, não nas suas melhores.',
      options: { short: 'Menos de 6 horas', ok: '6 horas ou mais' },
    },
    connection: {
      question: 'No último mês, com que frequência você viu ou conversou de verdade com alguém próximo?',
      short: 'Conexão',
      why: 'Pessoalmente ou numa ligação de verdade. Relações próximas estão entre os melhores indicadores de uma vida longa.',
      options: { often: 'Toda semana', sometimes: 'Algumas vezes', rarely: 'Quase nada; muitas vezes me sinto só' },
    },
    strength: {
      question: 'Numa semana normal, com que frequência você faz exercícios de força?',
      short: 'Força',
      why: 'Pesos, elásticos ou o próprio corpo: agachamentos, flexões, carregar sacolas pesadas. Mantém você forte e firme mais tarde.',
      options: { none: 'Raramente ou nunca', some: 'Cerca de uma vez por semana', regular: 'Duas vezes por semana ou mais' },
    },
  },

  levers: {
    smoke: 'Parar de fumar',
    exercise: 'Fazer exercício 3+ vezes por semana',
    bmi: 'Chegar a um peso saudável',
    alcohol: 'Beber menos',
    sleep: 'Dormir 6–9 horas',
    connection: 'Ver toda semana as pessoas que você ama',
    steps: 'Caminhar 10.000 passos por dia',
    strength: 'Treinar força duas vezes por semana',
  },

  values: {
    family: 'Família',
    partner: 'Meu par',
    friends: 'Amigos',
    health: 'Saúde',
    craft: 'Trabalho e ofício',
    learning: 'Aprender',
    creating: 'Criar',
    faith: 'Fé e espiritualidade',
    nature: 'Natureza',
    adventure: 'Aventura',
    service: 'Ajudar os outros',
    peace: 'Paz de espírito',
  },

  onboarding: {
    calendar: {
      title: 'Seus anos prováveis pela frente, um círculo por ano',
      legend: { likely: 'Prováveis', phone: 'No celular', gain: 'Somados pelos seus hábitos', cost: 'Tirados pelos seus hábitos' },
      same: 'Até agora, igual à média de pessoas como você.',
      effect: (adds, years) => [
        s(`Até agora suas respostas ${adds ? 'somam' : 'tiram'} cerca de `),
        b(`${years} anos`),
        s(adds ? ' à média.' : ' da média.'),
      ],
      a11y: (left, avg) => `Cerca de ${left} anos prováveis pela frente, um círculo por ano. A média de pessoas como você é de cerca de ${avg}.`,
    },
    winBack: (cost, label, years) => [
      s('Esta resposta tira cerca de '),
      b(`${cost} anos`),
      s(`. ${label} poderia somar cerca de `),
      b(`${years} anos`),
      s('.'),
    ],
    skipHabits: 'Pular e usar a média',
    welcomeEyebrow: 'Lembre-se de que você vai morrer',
    welcomeLede:
      'Os estoicos mantinham a morte em mente para não desperdiçar seus dias. Este app conta o tempo que provavelmente lhe resta, para que o dia de hoje tenha o peso que merece, e o direciona ao que você ama.',
    welcomeNote: 'Algumas perguntas curtas, uma de cada vez. Suas respostas ficam neste aparelho.',
    begin: 'Começar',
    chapters: { you: 'Você', habits: 'Seus hábitos', loves: 'O que você ama' },
    chapterStep: (chapter, k, n) => `${chapter} · ${k} de ${n}`,
    nameQuestion: 'Como devemos chamar você?',
    nameA11y: 'Primeiro nome',
    namePlaceholder: 'Seu primeiro nome',
    dobQuestion: 'Quando você nasceu?',
    countryQuestion: 'Em que país você mora?',
    countryWhy: 'A expectativa de vida muda 30 anos ou mais entre países, então começamos pelo seu.',
    countrySearch: 'Buscar país',
    countrySearchAgain: 'Outro lugar? Busque',
    countryNone: 'Nenhum país com esse nome nas tábuas da ONU.',
    sexQuestion: 'Qual era o seu sexo ao nascer?',
    sexWhy: 'Em média, as mulheres vivem cerca de cinco anos a mais que os homens, então o ponto de partida muda.',
    sex: { m: 'Masculino', f: 'Feminino' },
    phoneQuestion: 'Num dia normal, quantas horas você passa no celular?',
    phoneWhereIos:
      'Seu iPhone já sabe: Ajustes → Tempo de Uso → Ver Toda a Atividade. Use a média diária.',
    phoneWhereAndroid: 'Seu celular já sabe: Configurações → Bem-estar digital. Use a média diária.',
    phoneWhereWeb:
      'Seu celular já sabe. iPhone: Ajustes → Tempo de Uso. Android: Configurações → Bem-estar digital. Use a média diária.',
    phoneA11y: 'Horas por dia no celular',
    phoneResult: (years, share) => [
      s('No tempo que provavelmente lhe resta, isso dá cerca de '),
      b(`${years} anos`),
      s(`, ${share} das suas horas acordado.`),
    ],
    valuesQuestion: 'Quais destas coisas mais importam para você agora?',
    valuesWhy: 'Escolha até três. Seus lembretes vão sempre apontar de volta para eles.',
    peopleQuestion: 'Com quem você quer passar mais tempo?',
    peopleWhy:
      'Qualquer pessoa que importe para você: sua mãe, seus netos, um velho amigo, um bicho de estimação. Os nomes abaixo são só ideias. Vamos contar quantas vezes mais você provavelmente vai vê-los.',
    activitiesQuestion: 'O que você quer fazer mais vezes?',
    activitiesWhy:
      'Qualquer coisa que você ame: cozinhar, aprender algo novo, pescar, tocar música, dançar. Os exemplos abaixo são só ideias. Vamos contar quantas vezes mais você vai poder fazer isso.',
    computing: 'Contando suas semanas',
    computingNote: 'Transformando suas respostas em tempo.',
  },

  reveal: {
    eyebrow: (name) => (name ? `${name}, seu tempo` : 'Seu tempo'),
    about: 'Cerca de',
    weeksRemain: 'semanas provavelmente restam',
    fullLife: (total, lived) =>
      `Uma vida inteira como a sua tem cerca de ${total} semanas. Você já viveu ${lived} delas. Vamos fazer o resto valer.`,
    person: (n, label) => [s('Cerca de '), b(n), s(` ${label}.`)],
    phone: (years, swap) => [
      s('Seu celular leva cerca de '),
      b(`${years} anos`),
      s(` disso. Meia hora a menos por dia poderia virar ${swap}.`),
    ],
    lever: (label, years, weekends) => [
      s(` ${label} poderia somar cerca de `),
      b(`${years} anos`),
      s(`, mais ou menos ${weekends} fins de semana a mais.`),
    ],
    values: (vals) =>
      `Você disse que ${list(vals.map((v) => v.toLowerCase()))} ${plural(vals.length, 'é o que mais importa', 'são o que mais importa')}. Vamos continuar trazendo você de volta a isso.`,
    range: (med, q25, q75, country) =>
      `Isto é uma faixa, não uma data: metade das pessoas que vivem como você${country ? ` (${country})` : ''} chega aos ${med}, e a maioria fica entre ${q25} e ${q75}. Não é orientação médica.`,
    seeLife: 'Ver sua vida',
    baseEyebrow: (name) => (name ? `${name}, seu ponto de partida` : 'Seu ponto de partida'),
    baseWho: (country) =>
      `Esta é a média para pessoas da sua idade e sexo${country ? ` (${country})` : ''}, antes de saber como você vive.`,
    baseRange: (med, q25, q75) =>
      `Metade delas chega aos ${med}, e a maioria fica entre ${q25} e ${q75}. Uma faixa, não uma data. Não é orientação médica.`,
    baseHook: 'Como você vive pode mudar isso em anos, para mais ou para menos. Algumas perguntas rápidas vão mostrar onde você está.',
    baseNext: 'Ver onde estou',
    habitsEyebrow: (name) => (name ? `${name}, com seus hábitos` : 'Com seus hábitos'),
    habitsHook: 'Esse é o seu tempo. Agora: com quem e com o que você quer passá-lo.',
    habitsNext: 'Escolher o que importa',
    lovesTitle: 'O que cabe no seu tempo',
    healthy: (weeks, lever, years) => [
      s('Cerca de '),
      b(weeks),
      s(' dessas semanas devem ser com boa saúde: forte e fazendo as coisas por conta própria.'),
      ...(lever ? [s(` ${lever} pode somar cerca de `), b(`${years} anos`), s(' delas.')] : []),
    ],
  },

  alive: {
    heading: 'Você já viveu',
    summary: (days, years) => `Você já viveu ${days} dias, cerca de ${years} anos.`,
    units: {
      seconds: 'segundos',
      minutes: 'minutos',
      hours: 'horas',
      days: 'dias',
      weeks: 'semanas',
      months: 'meses',
      years: 'anos',
    },
  },

  life: {
    eyebrow: (name) => (name ? `${name} · tempo que provavelmente resta` : 'Tempo que provavelmente resta'),
    verdict: (age, med, left) => [
      s('Você tem '),
      b(age),
      s(' anos. Metade das pessoas que vivem como você chega aos '),
      b(String(med)),
      s('. Isso deixa cerca de '),
      b(`${left} anos`),
      s('.'),
    ],
    range: (q25, q75, p80) => `Faixa provável ${q25}–${q75} · ${p80}% de chance de chegar aos 80`,
    timeLeft: 'Tempo que provavelmente resta',
    clock: (y, d) => `${y}a ${d}d `,
    clockA11y: (y, d) => `Cerca de ${y} anos e ${d} dias`,
    zoomA11y: 'Zoom',
    zooms: { life: 'Vida', weeks: 'Semanas', year: 'Ano', today: 'Hoje' },
    caption: {
      life: (year, pct, birthdays) => [
        s('Já se foi '),
        b(pct),
        s(` do seu ${year}º ano. Cerca de `),
        b(birthdays),
        s(' aniversários a mais são prováveis.'),
      ],
      weeks: (week, pct, weeks) => [
        s('Já se foi '),
        b(pct),
        s(` da semana ${week} da sua vida. Provavelmente restam cerca de `),
        b(weeks),
        s(' semanas.'),
      ],
      year: (year, pctYear, pctDay, days) => [
        s('Já se foi '),
        b(pctYear),
        s(` de ${year} e `),
        b(pctDay),
        s(' de hoje. Restam '),
        b(days),
        s(' dias neste ano.'),
      ],
      today: (pct, hours) => [
        s('Já se foi '),
        b(pct),
        s(' desta hora. Hoje ainda tem cerca de '),
        b(hours),
        s(' horas. Use-as com intenção.'),
      ],
      layers: (unit, sleep, phone, free) => [
        s(' Somando tudo, cerca de '),
        b(sleep),
        s(` desses ${unit === 'years' ? 'anos' : 'semanas'} são sono (tempo bem gasto)`),
        ...(phone ? [s(' e '), b(phone), s(' no celular')] : []),
        s(', e sobram cerca de '),
        b(free),
        s(phone ? ' acordado e longe do celular.' : ' acordado.'),
      ],
      health: (unit, med, lo, hi) => [
        s(' Cerca de '),
        b(med),
        s(` ${unit === 'years' ? 'deles' : 'delas'} devem ser com boa saúde, forte e independente: a faixa verde, que esmaece onde as pessoas variam (para a maioria como você, ${lo}–${hi} ${unit === 'years' ? 'anos' : 'semanas'}).`),
      ],
    },
    legend: {
      lived: 'Vivido',
      now: 'Agora',
      likely: 'Provavelmente pela frente',
      reach: 'Ao seu alcance',
      maybe: 'Se a sorte permitir',
      asleep: 'Dormindo',
      phone: 'No celular',
      healthy: 'Provavelmente com boa saúde',
    },
    shows: { all: 'Tudo', awake: 'Acordado', free: 'Fora do celular' },
    showA11y: 'Mostrar o tempo pela frente',
    whatIf: 'E se… toque para testar',
    whatIfA11y: (label, years, healthy) => `E se: ${label}, cerca de ${years} anos, ${healthy} a mais com boa saúde`,
    whatIfYears: (years) => `+${years}a`,
    weeksAhead: 'Suas semanas pela frente',
    weeksUnit: 'semanas',
    bar: { free: 'acordado, fora do celular', phone: 'no celular', sleep: 'dormindo' },
    barLever: (label) => label.toLowerCase(),
    triedTotal: (several, weeks, years, capped) => [
      s(several ? 'Juntas, cerca de ' : 'Cerca de '),
      b(`${weeks} semanas a mais`),
      s(` (${years} anos)`),
      s(several ? `: menos que a soma, porque os efeitos dos hábitos se sobrepõem${capped ? ', e com teto' : ''}.` : '.'),
    ],
    triedOne: (label, years, healthy) => `${label}: cerca de ${years} anos sozinho, ${healthy} com boa saúde`,
    triedHealthy: (years) => [s(' A faixa verde cresce cerca de '), b(`${years} anos com boa saúde`), s('.')],
    tapWhatIf: 'Toque num “E se” no calendário para ver o que uma mudança poderia somar.',
    makePlan: 'Fazer um pequeno plano',
    makePlanA11y: (label) => `Fazer um pequeno plano para: ${label}`,
    onePlanAtATime: (sentence) => `Um pequeno plano por vez: este ocuparia o lugar de “${sentence}”`,
    tablesFor: (country) => `Partindo das tábuas de vida de: ${country}.`,
    tablesUS: 'Partindo de uma aproximação das tábuas de vida dos EUA.',
    changeCountry: 'Mudar de país',
    setCountry: 'Escolher seu país',
    phoneTitle: 'Seu celular',
    phoneLine: (hours, years, share) => [
      s(`${hours} horas por dia são cerca de `),
      b(`${years} anos`),
      s(` do tempo que provavelmente lhe resta: ${share} das suas horas acordado.`),
    ],
    phoneSwap: (swap) =>
      `Meia hora a menos por dia poderia virar ${swap}. Em experimentos, usar menos as redes sociais significou mais tempo com família e amigos e menos solidão.`,
    phoneAsk:
      'Quantas horas por dia você passa no celular? Os ajustes de Tempo de Uso ou Bem-estar digital mostram a média diária.',
    habitsTitle: 'Seus hábitos',
    habitsNeutral: 'Seus hábitos mantêm você perto da estimativa de base.',
    habitsEffect: (adds, years) => [s(`Seus hábitos ${adds ? 'somam' : 'tiram'} cerca de `), b(`${years} anos`), s('.')],
    withinReach: 'Ao seu alcance',
    moreWeekends: (n) => `cerca de ${n} fins de semana a mais`,
    together: (several, gain, capped) => [
      s(several ? 'Juntas, cerca de ' : 'Isso dá cerca de '),
      b(`${gain} anos a mais`),
      s(`${capped ? ' (com teto: os efeitos dos hábitos se sobrepõem)' : ''}. Teste no calendário com “E se”.`),
    ],
    allGood: 'Você já faz o que mais acrescenta tempo. Continue assim, e mantenha sua gente por perto.',
    healthy: {
      eyebrow: 'Forte e independente',
      years: (med, lo, hi) => [
        s('Cerca de '),
        b(`${med} desses anos`),
        s(` devem ser com boa saúde: forte, firme e fazendo as coisas por conta própria. Para a maioria das pessoas como você, ${lo}–${hi}.`),
      ],
      later:
        'Os anos mais tardios costumam trazer mais dores e doenças, e se apoiar um pouco mais em quem está por perto. Quantos, e quando, depende em parte de você.',
      lever: (label, years, why) => [
        s(`${label} pode somar cerca de `),
        b(`${years} deles`),
        s(why === 'strength' ? ': pernas mais fortes, mais equilíbrio, menos quedas.' : why === 'more' ? ', mais do que soma à sua vida.' : '.'),
      ],
      allGood: 'Você já faz o que mantém as pessoas fortes por mais tempo. Continue, e mantenha sua gente por perto.',
      askStrength: 'Você faz treino de força? Adicione sua resposta',
      sourceHealthy: 'Anos com saúde',
      sourceHabits: 'Hábitos',
    },
  },

  share: {
    half: 'cerca de metade',
    third: 'cerca de um terço',
    quarter: 'cerca de um quarto',
    seventh: 'cerca de um sétimo',
    pct: (p) => `${p}%`,
  },
  swap: {
    dog: (name, walks) => `um passeio diário com ${name}: cerca de ${walks} passeios a mais`,
    dinners: (n, person) =>
      `cerca de ${n} jantares de duas horas por ano ${person ? `com ${person} ou amigos` : 'com amigos e família'}`,
  },

  habitsScreen: {
    eyebrow: 'O que está nas suas mãos',
    title: 'Mude um hábito, mude a conta',
    median: (country) =>
      `idade mediana para quem vive como você${country ? ` (${country})` : ''}. Toque numa opção para ver o que mudaria.`,
    whatMatters: 'O QUE MAIS IMPORTA',
    ranked: 'Ordenado pelo tamanho e pela força das evidências. Toque num item para ver os números e a fonte.',
    exerciseReplaced: 'Substituído pelos seus passos diários acima, para nada ser contado duas vezes.',
    youNow: 'você agora',
    noChange: 'sem mudança',
    stepsHeading: 'PASSOS POR DIA',
    stepsA11y: 'Média de passos por dia',
    stepsAnswer: (n) => `${n} passos por dia`,
    math1: (n) => `1 · Média: ${n} passos por dia`,
    math2: (hr) => `2 · Risco vs 6.000 passos: × ${hr}`,
    math3: (hr, b) => `3 · Anos ≈ ln(1 ÷ ${hr}) ÷ ${b} = `,
    math4: '4 · Substitui sua resposta sobre exercício; o benefício se estabiliza em 10.000.',
    useExercise: 'Usar minha resposta sobre exercício',
    stepsHint:
      'Toque em + ou − para usar seus passos no lugar da resposta sobre exercício. O app de saúde do celular mostra sua média.',
    inEstimate: 'Faz parte da sua estimativa.',
    notInEstimate: 'Ainda não está na sua estimativa; aparece como direção.',
    howItWorks: 'COMO FUNCIONA SUA ESTIMATIVA',
    strength: { strong: 'forte', moderate: 'moderada', emerging: 'emergente' },
    healthspan: 'CONTINUAR FORTE E INDEPENDENTE',
    healthspanNote: 'O que mantém os últimos anos saudáveis: a faixa verde do seu calendário Vida. Toque em um para ver os números e a fonte.',
    strengthNote: (years) =>
      `O maior efeito é manter você forte e independente: duas vezes por semana pode somar cerca de ${years} anos com boa saúde.`,
    strengthKeep: 'Duas vezes por semana mantém você mais forte e firme por mais tempo. Continue.',
  },

  evidence: {
    smoking: {
      title: 'Não fumar',
      summary: 'A maior alavanca isolada. Parar ajuda em qualquer idade.',
      detail: 'Fumar quase dobra o risco anual de morrer (×2,2 neste app). Depois de parar, cai para perto de ×1,3.',
    },
    moving: {
      title: 'Mexer-se mais, manter a forma',
      summary: 'O risco segue caindo até 8–10 mil passos por dia antes dos 60, e 6–8 mil depois dos 60.',
      detail:
        'Em 15 coortes (47.471 adultos), mais passos diários significaram menor mortalidade até esses níveis. O condicionamento cardiorrespiratório é um dos maiores preditores de sobrevivência, sem limite superior de benefício observado.',
    },
    relationships: {
      title: 'Relações próximas',
      summary: 'Isolamento e solidão estão ligados a um risco 26–32% maior de morrer cedo, comparável a fumar ou à obesidade.',
      detail:
        'Em 70 estudos (3,4 milhões de pessoas), isolamento social, solidão e morar sozinho aumentaram cada um as chances de morte precoce em cerca de um quarto a um terço. Uma revisão anterior de 148 estudos viu que laços fortes vinham com cerca de 1,5× a chance de sobreviver. Num estudo de Harvard de 85 anos, a satisfação nas relações aos 50 previu a saúde aos 80 melhor que o colesterol.',
    },
    diet: {
      title: 'O que você come',
      summary: 'Mais leguminosas, grãos integrais e castanhas; menos carne vermelha e processada.',
      detail:
        'Uma troca duradoura de uma dieta ocidental típica para uma ideal está ligada a 10–13 anos a mais se feita aos 20, cerca de 8 aos 60 e mais de 3 aos 80. É um estudo de modelagem: médias populacionais, não previsões individuais.',
    },
    weight: {
      title: 'Peso e pressão arterial saudáveis',
      summary: 'Ambos impulsionam as doenças do coração, a principal causa de morte.',
      detail:
        'Peso saudável é um dos cinco hábitos que, juntos, foram ligados a 12–14 anos a mais aos 50, e a cerca de 8–11 anos a mais livres de câncer, doença cardíaca e diabetes.',
    },
    strength: {
      title: 'Treino de força',
      summary: '30–60 minutos por semana estão ligados a 10–17% menos mortalidade, e a continuar forte e independente por mais tempo.',
      detail:
        'Além do exercício aeróbico, não no lugar dele; benefícios acima de cerca de uma hora por semana são incertos. O maior efeito é nos últimos anos: força e equilíbrio significam menos quedas e menos incapacidade (veja "Continuar forte e independente"). Neste app, duas vezes por semana conta ×0,85 no risco de morrer e ×0,82 no risco de perder a boa saúde.',
    },
    purpose: {
      title: 'Um senso de propósito',
      summary: 'Ligado a cerca de 17% menos mortalidade e menos infartos e AVCs.',
      detail:
        'Em 10 estudos (136.265 pessoas) nos EUA e no Japão, onde se chama ikigai: "uma vida que vale a pena viver". O otimismo mostra um padrão parecido.',
    },
    sleep: {
      title: 'Dormir 7–8 horas',
      summary: 'Menos de 6 horas está ligado a 12% mais mortalidade.',
      detail: 'Sono muito longo também mostra mais risco, mas isso é sobretudo sinal de doença, não causa.',
    },
    alcohol: {
      title: 'Beber pouco',
      summary: 'Beber pouco não protege; o risco sobe a partir de cerca de 2 doses por dia para mulheres e 3 para homens.',
      detail:
        'Uma metanálise de 107 coortes (4,8 milhões de pessoas) não encontrou mortalidade menor em quem bebe pouco do que em quem nunca bebeu.',
    },
    helping: {
      title: 'Ajudar os outros',
      summary: 'Fazer voluntariado mais tarde na vida está ligado a 24% menos mortalidade.',
      detail: 'Após ajuste pela saúde, em 14 estudos com adultos de 55 anos ou mais.',
    },
    scrolling: {
      title: 'Menos rolagem, mais pessoas',
      summary: 'Em experimentos, cortar redes sociais significou mais tempo com família e amigos, e menos solidão.',
      detail:
        'Desativar o Facebook por 4 semanas aumentou o bem-estar e o tempo offline com amigos e família. Limitar as redes sociais a cerca de 30 minutos por dia por 3 semanas reduziu a solidão e a depressão.',
    },
    healthyHabits: {
      title: 'Hábitos saudáveis somam anos com saúde',
      summary: 'Aos 50, 4–5 hábitos saudáveis vieram com cerca de 10,7 (mulheres) e 7,6 (homens) anos a mais sem câncer, doença cardíaca e diabetes.',
      detail:
        'Em duas grandes coortes de Harvard, o total de anos subiu quase o mesmo (+9,4 mulheres, +8,1 homens): quase todo o tempo extra foi tempo com saúde, e os anos vividos com doença mal mudaram. Os hábitos: não fumar, peso saudável, 30+ minutos de atividade por dia, beber pouco ou nada, boa alimentação. O app move seus anos com saúde de acordo com seus hábitos.',
    },
    falls: {
      title: 'Exercício previne quedas',
      summary: 'O exercício reduziu as quedas em idosos em 23%; programas com força e equilíbrio, em cerca de um terço.',
      detail:
        'Revisão Cochrane de 108 ensaios (23.407 pessoas acima de 60 que moram em casa). Razão de taxas geral 0,77 (evidência de alta certeza); equilíbrio e exercício funcional 0,76; vários tipos juntos, em geral equilíbrio mais força, 0,66 (certeza moderada).',
    },
    mobility: {
      title: 'Continuar andando sozinho',
      summary: 'Num ensaio com 1.635 pessoas de 70–89 anos, caminhada com força e equilíbrio reduziu em 18% a incapacidade grave de locomoção.',
      detail:
        'O ensaio LIFE: um programa moderado e estruturado (caminhada, força, flexibilidade, equilíbrio) contra educação em saúde, por 2,6 anos. Perder a capacidade de andar 400 m: 30,1% contra 35,5% (HR 0,82). Um único grande ensaio de um programa combinado, então a parte devida só à força é desconhecida. O app usa 0,82 para treino de força duas vezes por semana.',
    },
    grip: {
      title: 'Força de preensão',
      summary: 'Pessoas acima de 60 com aperto de mão fraco tiveram cerca de 1,8× mais chance de perder função, e de morrer, no acompanhamento.',
      detail:
        'Meta-análise de 34 estudos de pessoas com 60 ou mais que moram em casa: razão combinada de 1,78 para declínio físico e 1,79 para mortalidade, preensão baixa contra alta. A preensão é um marcador da força geral; é observacional, então mostra quem está em risco mais do que o que fazer, mas força se mantém treinando.',
    },
  },

  howItWorks: [
    'O risco anual de morrer de todo mundo sobe com a idade, mais ou menos dobrando a cada 7 anos. Partimos dessa curva para o seu sexo no seu país, ajustada à tábua de vida da ONU (World Population Prospects 2024, mortes em 2023). Sem país, usamos uma aproximação das tábuas dos EUA.',
    'Seus hábitos multiplicam esse risco: fumar ×2,2, exercício 3+ vezes por semana ×0,85, menos de 6 horas de sono ×1,15, raramente ver pessoas próximas ×1,29, e assim por diante.',
    'Acompanhamos esse risco mês a mês a partir da sua idade hoje. A idade em que metade das pessoas como você já morreu é a sua mediana; as marcas de 25% e 75% dão a sua faixa.',
    'Regra prática: anos ≈ ln(multiplicador de risco) ÷ 0,085. Por isso dobrar o risco custa cerca de 8 anos, e parar de fumar pode devolver cerca de 9.',
    'Várias mudanças juntas somam menos que a soma de cada uma, e limitamos o total a 14 anos, a maior diferença de todos os hábitos encontrada num grande estudo dos EUA.',
    'Os anos com saúde partem da expectativa de vida saudável do seu país (OMS, 2023): a parte dos anos à frente que as pessoas da sua idade passam com boa saúde. Juntamos o tempo menos saudável no fim, onde cai a maior parte, então aparece como uma faixa que esmaece, não uma data.',
    'Os hábitos movem os anos com saúde quase tanto quanto o total, como num grande estudo de Harvard, e o treino de força ainda mais: mantém as pessoas fortes, firmes e independentes. O mesmo limite de 14 anos vale.',
    'São associações de estudos populacionais, não causas, e não são orientação médica.',
  ],

  claims: {
    lifeTables: 'Tábuas de vida de 237 países e territórios, por sexo, estimativas para 2023.',
    plans:
      'Decidir quando e onde você vai fazer algo, como um “se… então”, torna muito mais provável cumprir (94 estudos).',
    freshStart: 'É mais fácil começar uma meta no início de uma semana, de um mês ou num aniversário: um recomeço.',
    comingBack:
      'No maior teste de incentivos ao exercício (61.293 pessoas), o que mais ajudou foi recompensar a volta depois de faltar a um treino.',
    personalNumbers:
      'Ver os próprios números pode ajudar: fumantes que souberam sua “idade pulmonar” tiveram o dobro de chance de parar em um ano (13,6% contra 6,4%).',
    walkAfterMeals: 'Alguns minutos de caminhada leve depois de comer baixaram o açúcar no sangue em cerca de 17% em relação a ficar sentado.',
  },

  plans: {
    everyDay: 'Todo dia',
    weekdays: 'Dias úteis',
    weekends: 'Fins de semana',
    days: (days) => {
      const names = ['domingos', 'segundas', 'terças', 'quartas', 'quintas', 'sextas', 'sábados'];
      const short = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
      const art = (d: number) => (d === 0 || d === 6 ? 'Aos' : 'Às');
      if (days.length === 1) return `${art(days[0])} ${names[days[0]]}`;
      if (days.length === 2) return `${art(days[0])} ${names[days[0]]} e ${names[days[1]]}`;
      return list(days.map((d) => short[d]));
    },
    time: (h, m) => `${h}h${String(m).padStart(2, '0')}`,
    cue: (days, anchor, time) => `${days} ${anchor ?? `às ${time}`}`,
    sentence: (cue, action) => `${cue}, eu vou ${action}.`,
    nameInSentence: (name) => name.replace(/^Meu /, 'meu ').replace(/^Minha /, 'minha '),
    today: 'hoje',
    tomorrow: 'amanhã',
    anchors: {
      breakfast: 'depois do café da manhã',
      lunch: 'depois do almoço',
      work: 'depois do trabalho',
      dinner: 'depois do jantar',
      morning: 'de manhã',
      cigarette: 'quando der vontade de fumar',
      atLunch: 'no almoço',
      coffee: 'depois do meu café da manhã',
    },
    call: (name) => `ligar para ${name}`,
    messageOrCall: (name) => `mandar mensagem ou ligar para ${name}`,
    actions: {
      walk: 'fazer uma caminhada de 10 minutos',
      connect: 'ligar ou ver alguém que eu amo',
      bed: 'largar o celular e me preparar para dormir',
      smoke: 'caminhar 5 minutos antes',
      drink: 'tomar antes um copo de água com gás',
      plate: 'encher metade do prato com verduras e legumes',
      strength: 'fazer 10 minutos de agachamentos, flexões e carregar peso',
    },
    withAnchor: (action, anchor) => `${action} ${anchor}`,
    capitalize: (s) => s.charAt(0).toUpperCase() + s.slice(1),
    periodWeek: 'esta semana',
    periodBirthday: 'seu novo ano',
    calendarNote: 'Perder um não tem problema: é só retomar na próxima. Do Memento Mori.',
    when: 'QUANDO',
    daysA11y: 'Dias',
    atSetTime: 'num horário fixo',
    anchorPlaceholder: 'ou do seu jeito: quando eu chegar em casa',
    anchorA11y: 'O momento que lembra você, do seu jeito',
    around: 'Por volta de (para lembretes)',
    at: 'Às',
    timeA11y: 'Horário',
    iWill: 'EU VOU',
    actionPlaceholder: 'ligar para a mãe',
    actionA11y: 'O que você vai fazer',
    save: 'Salvar plano',
    cancel: 'Cancelar',
    planReachOut: 'Planejar quando procurar',
    planReachOutA11y: (name) => `Planejar quando procurar ${name}`,
    yourPlan: 'Seu plano',
    edit: 'Editar',
    removeA11y: 'Remover este plano',
    addToCalendar: 'Adicionar à minha agenda',
    calendarSaved: 'Salvo: abra para adicionar ✓',
    addToCalendarA11y: (title) => `Adicionar "${title}" à sua agenda como evento repetido`,
  },

  thisWeek: {
    heading: 'Esta semana',
    doneToday: 'feito hoje ✓',
    doneThisWeek: 'feito esta semana ✓',
    next: (when) => `próximo: ${when}`,
    welcomeBack: (name) =>
      `Que bom ver você de volta${name ? `, ${name}` : ''}. Planos escapam para todo mundo, e tudo bem: o que conta é retomar. Esta semana é uma página nova.`,
    oneThingFor: (period) => `Uma coisa para ${period}`,
    doneMark: ' · feito ✓',
    did: 'Feito',
    didToday: 'Feito hoje ✓',
    moreVisits: (n, name) => `Cerca de ${n} visitas a mais com ${name} no seu ritmo atual.`,
    smallStep: (label, years) => `${label} poderia somar cerca de ${years} anos. Este é um pequeno passo nessa direção.`,
    noPlans:
      'Nenhum plano ainda. Um plano é um pequeno “quando, então”: “Aos domingos depois do almoço, eu vou ligar para a mãe.” Você pode fazer um para qualquer pessoa em Amores, ou para um hábito em Vida.',
    suggestHeading: 'Um plano para experimentar',
    suggestPerson: (n, name) =>
      `Cerca de ${n} visitas a mais com ${name} no seu ritmo atual. Um plano torna a próxima mais provável.`,
    suggestLever: (label, years) => `${label} poderia somar cerca de ${years} anos. Um pequeno plano é um jeito de começar.`,
    whyPlans: 'Por que planos ajudam',
    makeItMine: 'Fazer dele meu plano',
    changeIt: 'Mudar',
    notNow: 'Agora não',
  },

  freshStart: {
    eyebrow: { week: 'Segunda · um recomeço', month: 'Dia 1º · um recomeço', birthday: 'Seu aniversário · um recomeço' },
    title: (period) => `Uma coisa para ${period}?`,
    birthday: (name, weeks) =>
      `Feliz aniversário${name ? `, ${name}` : ''}. Você já viveu cerca de ${weeks} semanas, algumas maravilhosas. Qual é uma coisa que você poderia fazer com o ano que começa?`,
    prompt: (week, month) =>
      `Qual é uma coisa que você poderia fazer ${week ? 'esta semana' : `em ${month}`} e ficaria feliz de ter feito?`,
    callIdea: (name) => `Ligar para ${name}`,
    gratitudeIdea: 'Escrever para alguém a quem sou grato',
    useIdea: (idea) => `Usar ideia: ${idea}`,
    ownPlaceholder: 'ou a sua',
    a11y: (period) => `Uma coisa para ${period}`,
    choose: 'Fazer disso minha coisa',
    notToday: 'Hoje não',
  },

  todaysCount: {
    pet: 'Um passeio ou um momento tranquilo juntos hoje?',
    activity: 'Que tal escolher um dia para a próxima? Decidir quando torna mais provável.',
    agency: (label, years, more, what) => [
      s(`${label} poderia somar cerca de `),
      b(`${years} anos`),
      s(': cerca de '),
      b(more),
      s(` ${what}. Você pode testar no calendário de Vida.`),
    ],
  },

  loves: {
    per: PER,
    pace: (count, per) => `${count} ${plural(count, 'vez', 'vezes')} ${PER[per]}`,
    reasonBoth: (pace) => `${pace}, nos anos que vocês dois provavelmente têm`,
    reasonUntil: (pace, age) => `${pace}, até você ter ${age}`,
    reasonLife: (pace) => `${pace}, pelo resto da sua vida`,
    moreWith: (unit, name) => `${UNIT[unit]} a mais com ${name}`,
    moreTimes: (activity) => `vezes a mais: ${activity.toLowerCase()}`,
    aboutMore: (n, unit) => [s('cerca de '), b(n), s(` ${UNIT[unit]} a mais`)],
    since: {
      today: 'hoje',
      yesterday: 'ontem',
      days: (n) => `há ${n} dias`,
      months: (n) => `há ${n} meses`,
    },
    suggestPeople: {
      mom: 'Mãe',
      dad: 'Pai',
      friend: 'Meu melhor amigo',
      grandma: 'Minha avó',
      dog: 'Meu cachorro',
      cat: 'Meu gato',
    },
    suggestActivities: {
      soccer: 'Jogar futebol',
      movies: 'Ir ao cinema',
      read: 'Ler um livro',
      travel: 'Viajar para um lugar novo',
      cook: 'Cozinhar para amigos',
    },
    eyebrow: 'O que você ama',
    title: 'Quantas vezes mais?',
    sub: 'No seu ritmo atual, na vida que provavelmente lhe resta.',
    empty: 'Nada aqui ainda. Adicione alguém que ama você, ou algo que você ama fazer.',
    addHeading: 'ADICIONAR',
    addToA11y: 'Adicionar a',
    groups: { who: 'Quem ama você', what: 'O que você ama' },
    cardA11y: (n, label, reason) => `Cerca de ${n} ${label}. ${reason}.`,
    kinds: { person: 'Pessoa', pet: 'Bicho' },
    species: { dog: 'Cachorro', cat: 'Gato' },
    personOrPet: 'Pessoa ou bicho de estimação',
    kindOfPet: 'Tipo de bicho',
    useSuggestion: (name) => `Usar sugestão: ${name}`,
    whoA11y: 'Quem',
    whatA11y: 'O quê',
    petPlaceholder: 'Max, Luna…',
    personPlaceholder: 'Mãe, meu par, Sam…',
    activityPlaceholder: 'Jogar futebol, ler, viajar…',
    howOftenSee: 'Com que frequência você os vê',
    howOftenDo: 'Com que frequência você faz isso',
    fewer: 'Menos',
    times: (n) => plural(n, 'vez', 'vezes'),
    perA11y: 'Por',
    theirAge: 'Idade dele/dela (opcional)',
    petAge: 'Idade em anos (opcional)',
    untilAge: 'Até que idade? (opcional)',
    phoneA11y: 'Telefone (opcional)',
    phonePlaceholder: 'Telefone (opcional, para Ligar e Mensagem)',
  },

  reach: {
    lastTime: (since) => `Última vez que vocês se falaram ou se viram: ${since}.`,
    hint: 'Toque em "Conversamos" depois de uma ligação ou visita para acompanhar.',
    claim: 'As pessoas gostam de receber notícias nossas mais do que imaginamos, principalmente depois de um tempo.',
    message: 'Mensagem',
    call: 'Ligar',
    weTalked: 'Conversamos',
    logged: 'Anotado ✓',
    logA11y: (name) => `Anotar que você conversou com ${name} hoje`,
    openers: [
      'Pensando em você. Livre para jantar esta semana?',
      'Oi! Faz tempo demais. Vamos nos falar no fim de semana?',
      'Só queria dizer que eu te amo.',
      'Hoje lembrei de uma coisa engraçada nossa. Quando a gente se vê?',
      'Não vamos deixar passar mais um mês. Um café logo?',
    ],
  },

  today: {
    reachOut: 'Procure alguém hoje',
    moreVisits: (n) => [s('Cerca de '), b(n), s(' visitas a mais no seu ritmo atual. Uma mensagem leva um minuto.')],
    isolation:
      'Quem se mantém perto dos outros vive mais: isolamento e solidão estão ligados a um risco cerca de 26–32% maior de morrer cedo.',
    connectionLever: (years) => `No seu caso, ver toda semana as pessoas que você ama poderia somar cerca de ${years} anos.`,
    connectionOften: 'Ver pessoas toda semana já faz parte da sua estimativa. Continue assim.',
    noPerson:
      'Relações próximas estão entre os melhores preditores de uma vida longa e saudável. Quem você gostaria de ver mais?',
    addSomeone: 'Adicionar alguém que ama você',
    noneLogged: 'Nenhuma ligação ou visita anotada nos últimos 30 dias.',
    peopleThisMonth: (n) => `Nos últimos 30 dias você conversou com ou viu ${n} das pessoas que ama.`,
  },

  daily: {
    quotes: [
      ['Não aja como se fosse viver dez mil anos. Enquanto vive, enquanto está em seu poder, seja bom.', 'Marco Aurélio · Meditações IV.17'],
      ['Enquanto adiamos, a vida passa depressa.', 'Sêneca · Cartas 1'],
      ['Pense em si mesmo como morto. Você já viveu sua vida. Agora pegue o que resta e viva-o como se deve.', 'Marco Aurélio · Meditações VII.56'],
      ['Preparemos o espírito como se tivéssemos chegado ao fim da vida. Não adiemos nada.', 'Sêneca · Cartas 101'],
      ['Não é que tenhamos pouco tempo para viver, mas que desperdiçamos muito dele.', 'Sêneca · Sobre a brevidade da vida'],
      ['Tenha a morte diante dos olhos todos os dias, e você nunca terá um pensamento mesquinho.', 'Epicteto · Manual 21'],
      ['Cada um vive apenas este momento presente. Todo o resto já passou ou é incerto.', 'Marco Aurélio · Meditações III.10'],
      ['Comece agora a viver, e conte cada dia como uma vida à parte.', 'Sêneca · Cartas 101'],
      ['Você poderia deixar a vida agora mesmo. Que isso decida o que você faz, diz e pensa.', 'Marco Aurélio · Meditações II.11'],
      ['Ninguém é livre se não for senhor de si mesmo.', 'Epicteto · Fragmentos'],
    ],
    questions: [
      'O que faria o dia de hoje valer a pena?',
      'Quem merece toda a sua atenção hoje?',
      'O que você está adiando que se arrependeria de nunca fazer?',
      'O que está sob o seu controle hoje, e o que não está?',
      'Se hoje, {day}, fosse seu último dia comum, o que você manteria igual?',
      'O que você faria hoje se não tivesse medo?',
      'Do que você pode abrir mão hoje?',
      'Pelo que você quer ser lembrado, e o dia de hoje aproximou você disso?',
    ],
    loveSub: (pace) => `Com ${pace}, no tempo que você provavelmente tem.`,
    weekends: { what: 'fins de semana a mais', sub: 'Cada um é um sábado e um domingo para viver com intenção.' },
    summers: { what: 'verões a mais', sub: 'Fins de tarde longos. Noites quentes. Não são infinitos.' },
    moons: { what: 'luas cheias a mais', sub: 'Saia para ver a próxima.' },
    lived: { what: 'fins de semana já vividos', sub: 'Alguns foram maravilhosos. Seja grato por eles, e abra espaço para mais.' },
  },

  /** Words from people who lived before us (src/lib/wisdom.ts). The entries themselves are English for now. */
  wisdom: {
    story: 'Uma história',
    practice: 'Uma prática',
    retoldFrom: (cite: string) => `Recontado a partir de ${cite}`,
    /** Comes before an action, e.g. "You could" + "call Mom today." */
    youCould: 'Você poderia',
    someoneYouLove: 'alguém que você ama',
    readIn: (translator: string) => `Leia na tradução de ${translator}`,
    ourTranslation: (translator: string, year: string) => `Tradução nossa, a partir da versão inglesa de ${translator} (${year})`,
  },
  opening: {
    lookBack: 'Olhe para trás',
    todaysCount: 'A conta de hoje',
    today: 'Hoje',
    agency: (label, years, more, what) => [
      s(`${label} poderia somar cerca de `),
      b(`${years} anos`),
      s('. Isso dá cerca de '),
      b(more),
      s(` ${what}.`),
    ],
    tapToSee: 'Toque para ver sua vida',
    cardOf: (i, n) => `Cartão ${i} de ${n}`,
    seeLife: 'Ver sua vida',
    next: 'Próximo',
  },

  gentle: {
    calendar: {
      same: 'Até agora, igual à média de pessoas como você.',
      effect: (adds) => (adds ? 'Até agora suas respostas somam tempo à média.' : 'Até agora suas respostas tiram um pouco de tempo da média.'),
      a11y: 'Círculos para os anos prováveis pela frente, um por ano.',
      winBack: (label) => `Esta resposta tira um pouco de tempo. ${label} poderia devolver bom tempo.`,
    },
    setting: 'Ocultar números',
    settingNote:
      'Palavras em vez de anos, semanas e contagens em Vida, Amores, Hoje e na abertura. O calendário fica, sem os números.',
    ahead: {
      most: 'A maior parte da sua vida ainda está pela frente.',
      plenty: 'Provavelmente ainda há muitos anos bons pela frente.',
      some: 'Ainda há anos bons pela frente. Dedique-os ao que você ama.',
      gift: 'Cada dia daqui em diante é um presente. Dedique-o ao que você ama.',
    },
    caption: {
      life: 'Este ano da sua vida está em andamento. ',
      weeks: 'Esta semana da sua vida está em andamento. ',
      year: {
        early: 'A maior parte deste ano ainda está pela frente.',
        middle: 'Este ano já vai adiantado. Ainda há tempo bom nele.',
        late: 'Este ano está quase no fim. Faça as últimas semanas valerem.',
      },
      today: {
        early: 'A maior parte do dia ainda está pela frente. Use-o com intenção.',
        middle: 'O dia já vai adiantado. Use o que resta com intenção.',
        late: 'O dia está quase no fim. Use o que resta com intenção.',
      },
      layers: (phone) =>
        phone
          ? ' Uma parte é sono (tempo bem gasto) e outra no celular; o resto é acordado e longe dele.'
          : ' Uma parte é sono, tempo bem gasto; o resto é acordado.',
      health: ' Muitos deles provavelmente serão com força e independência: a faixa verde, que esmaece onde as pessoas diferem.',
    },
    range:
      'Uma faixa, não uma data: os círculos cheios são prováveis, os anéis são se a sorte permitir, e os hábitos podem movê-los.',
    whatIfA11y: (label) => `E se: ${label}, poderia somar tempo`,
    triedTotal: (several) =>
      several
        ? 'Juntos poderiam somar tempo bom: menos que a soma, porque os efeitos dos hábitos se sobrepõem.'
        : 'Isso poderia somar tempo bom.',
    phoneLine: (share) => `Seu celular ocupa ${share} das suas horas acordado.`,
    phoneSwap:
      'Meia hora a menos por dia poderia virar mais tempo com as pessoas que você ama. Em experimentos, usar menos redes sociais significou mais tempo com família e amigos e menos solidão.',
    habitsEffect: (adds) => (adds ? 'Seus hábitos somam tempo à sua estimativa.' : 'Seus hábitos tiram um pouco de tempo da sua estimativa.'),
    adds: 'soma tempo',
    costs: 'tira tempo',
    couldAdd: 'poderia somar tempo bom',
    together: (several) =>
      several ? 'Juntos poderiam somar anos bons. Teste-os no calendário com E se.' : 'Teste no calendário com E se.',
    howMany: {
      few: 'Algumas vezes a mais do que você imagina.',
      many: 'Muitas vezes mais, se você abrir espaço para elas.',
    },
    pace: 'No seu ritmo atual.',
    loveSub: 'No seu ritmo atual, ao longo do tempo que você provavelmente tem.',
    agency: (label) => `${label} poderia somar mais destes. Você pode testar no calendário da Vida.`,
    moreVisits: (name) => `Mais visitas com ${name} do que você imagina, no seu ritmo atual.`,
    reachOut: 'Mais visitas do que você imagina, no seu ritmo atual. Uma mensagem leva um minuto.',
    smallStep: (label) => `${label} poderia somar tempo bom. Este é um pequeno passo nessa direção.`,
    suggestPerson: (name) =>
      `Mais visitas com ${name} do que você imagina, no seu ritmo atual. Um plano torna a próxima mais provável.`,
    suggestLever: (label) => `${label} poderia somar tempo bom. Um pequeno plano é um jeito de começar.`,
    birthday: (name) =>
      `Feliz aniversário${name ? `, ${name}` : ''}. Você já viveu muitas semanas, algumas maravilhosas. O que você poderia fazer com o ano que vem?`,
    isolation: 'Pessoas que se mantêm próximas dos outros tendem a viver mais e com mais saúde.',
    connectionLever: 'Para você, ver toda semana as pessoas que ama poderia somar tempo bom.',
    noneLogged: 'Nenhuma ligação ou visita registrada no último mês ainda.',
    someThisMonth: 'No último mês você falou com ou viu algumas das pessoas que ama.',
    healthy: {
      years:
        'Muitos dos anos pela frente provavelmente serão com força e independência: a faixa verde do seu calendário, que esmaece onde as pessoas diferem.',
      lever: (label, strength) =>
        strength
          ? `${label} poderia manter você com força e independência por mais tempo: pernas mais fortes, mais equilíbrio, menos quedas.`
          : `${label} poderia somar anos com saúde.`,
      tried: ' A faixa verde também cresce.',
      reveal: (lever) => 'Muitas dessas semanas provavelmente serão com força e independência.' + (lever ? ` ${lever} poderia somar mais delas.` : ''),
    },
    reveal: {
      fullLife: 'Uma vida plena é uma longa sequência de semanas, e você está no caminho. Vamos fazer o resto valer.',
      person: (label, howMany) => `Isso inclui ${label}. ${howMany}`,
      phone: 'Seu celular ocupa uma parte disso. Meia hora a menos por dia poderia virar mais tempo com as pessoas que você ama.',
      lever: (label) => ` ${label} poderia somar anos bons.`,
      range: (country) =>
        `Isto é uma faixa, não uma data, a partir de quanto costumam viver as pessoas que vivem como você${country ? ` em ${country}` : ''}. Não é conselho médico.`,
    },
  },

  account: {
    title: 'Você',
    edit: 'Editar suas respostas',
    dataHeading: 'SEUS DADOS',
    dataBody:
      'Tudo o que você digita fica neste aparelho. Não há conta, nem anúncios, nem rastreamento. Sua estimativa é calculada aqui mesmo, no seu celular ou no seu navegador.',
    guestNote: (guest) =>
      `Você também tem uma ${guest ? 'conta de visitante' : 'conta conectada'} de um teste anterior. Ela só guarda um perfil vazio; apagar abaixo também a exclui.`,
    confirm:
      'Isso apaga suas respostas, as pessoas e coisas que você ama, e todo o resto neste aparelho. Não dá para desfazer.',
    yesDelete: 'Sim, apagar tudo',
    keep: 'Manter meus dados',
    deleteAll: 'Apagar tudo neste aparelho',
    accountFailed:
      'Não conseguimos falar com o servidor para apagar sua conta do teste anterior, então nada foi apagado ainda. Você pode tentar de novo ou apagar só neste aparelho; a conta vazia fica até você nos escrever pedindo para apagá-la.',
    deviceOnly: 'Apagar só neste aparelho',
    exportButton: 'Baixar meus dados',
    exportNote: 'Uma cópia de tudo o que o app guarda neste aparelho, num arquivo que você abre em qualquer editor de texto.',
    exportDone: (name: string) => `Sua cópia está pronta: ${name}. Ela tem suas respostas de saúde, então guarde-a em um lugar privado.`,
    exportFailed: 'Não foi possível criar o arquivo. Tente de novo.',
    exportAbout: 'Tudo o que o Memento Mori guarda neste aparelho. "profile" tem suas respostas e o que você ama; "settings", pequenos ajustes do app.',
    disclaimer:
      'As estimativas vêm de estudos populacionais. Mostram a direção e o tamanho aproximado, não são uma promessa nem orientação médica.',
  },

  disclaimer: {
    short: 'Uma estimativa a partir de médias populacionais, para refletir e aprender. Não é uma previsão da sua morte nem orientação médica.',
    points: [
      'É uma estimativa a partir de médias populacionais, não uma previsão de quando você vai morrer. Ninguém pode saber isso.',
      'Não é orientação, diagnóstico nem tratamento médico. Para dúvidas sobre sua saúde, converse com um médico ou outro profissional qualificado.',
      'Está aqui para refletir e aprender: para ajudar você a dedicar o tempo que tem ao que importa para você.',
    ],
    support:
      'Se pensar na morte está pesado agora, você não precisa carregar isso sem apoio. No Brasil, ligue para o CVV no [188](tel:188), de graça e a qualquer hora. Nos EUA, ligue ou mande mensagem para o [988](https://988lifeline.org). Em outros lugares, o [findahelpline.com](https://findahelpline.com) reúne apoio gratuito e confidencial perto de você. Em uma emergência, ligue para o número de emergência local.',
    howItWorks: 'Como funciona',
    sources: 'Fontes',
    beforeEyebrow: 'Antes de ver',
    beforeTitle: 'Algumas palavras honestas',
    understand: 'Entendi',
  },

  legal: {
    terms: 'Termos de uso',
    privacy: 'Política de privacidade',
    health: 'Política de privacidade de dados de saúde',
    eyebrow: 'Jurídico',
    draft: 'Rascunho',
    draftNotice: 'Este é um rascunho. Ainda não foi revisado por um advogado e pode mudar antes do lançamento do Memento Mori.',
    englishOnly: 'Por enquanto este documento está em inglês. Ele será traduzido depois que um advogado revisar a versão em inglês.',
    version: (v) => `Versão ${v}`,
    notFound: 'Não encontrado',
    notFoundBody: 'Não há nenhum documento aqui.',
    agree:
      'Ao começar, você aceita os [Termos de uso](/legal/terms) e confirma que tem 18 anos ou mais. Suas respostas, incluindo hábitos de saúde, nunca saem deste aparelho: veja a [Política de privacidade](/legal/privacy) e a [Política de privacidade de dados de saúde](/legal/health-data).',
  },

  sources: {
    eyebrow: 'Fontes',
    title: 'A pesquisa por trás do app',
    lede: (n) => `Os ${n} estudos e conjuntos de dados que o app cita, agrupados pelo uso. Toque em um para abrir.`,
    usedFor: (what) => `Usado para: ${what}`,
    opens: 'Abre no navegador.',
    topics: {
      model: { title: 'Como a estimativa é construída', blurb: 'A curva de mortalidade, as tábuas de vida a que ela é ajustada e o limite dos ganhos combinados.' },
      habits: { title: 'Hábitos na sua estimativa', blurb: 'De onde vem o multiplicador de risco de cada hábito.' },
      direction: {
        title: 'Para orientar, fora da estimativa',
        blurb: 'Achados da tela Hábitos que apontam o caminho, mas ainda não fazem parte dos números.',
      },
      behavior: { title: 'Planos, lembretes e procurar as pessoas', blurb: 'A ciência do comportamento por trás dos planos, dos recomeços e das boas-vindas.' },
      time: { title: 'Para onde vão as horas', blurb: 'O tempo no celular e o que recuperar um pouco dele pode trazer.' },
      loves: { title: 'O que você ama: “mais N vezes”', blurb: 'Expectativas de vida típicas para contar o tempo com seus bichos.' },
    },
    uses: {
      gompertz1825: 'O formato da curva: o risco anual de morrer cresce de forma exponencial com a idade.',
      makeham1860: 'A parte constante do risco, que não depende da idade (o termo “A”).',
      wpp2024: 'Seu ponto de partida: a tábua de vida do seu país e sexo.',
      li2018: 'O limite de 14 anos para ganhos combinados; não fumar como a maior alavanca.',
      holtLunstad2015: 'Conexão: ver pouco as pessoas próximas ×1,29.',
      holtLunstad2010: 'Laços sociais fortes e cerca de 1,5 vez a chance de sobreviver (148 estudos).',
      paluch2022: 'Exercício e passos diários.',
      mandsager2018: 'O condicionamento cardiorrespiratório como um dos melhores preditores de sobrevivência.',
      li2020: 'Peso saudável e anos livres de doenças crônicas.',
      cappuccio2010: 'Sono: menos de 6 horas ×1,15.',
      zhao2023: 'Álcool: beber muito ×1,4; beber pouco não protege.',
      fadnes2022: 'O que você come.',
      momma2022: 'Treino de força.',
      who2023hale: 'Anos com saúde: a parte dos anos à frente que as pessoas da sua idade passam com boa saúde, por país e sexo.',
      pahor2014: 'Continuar andando sozinho: o efeito do treino de força nos anos com saúde.',
      sherrington2019: 'Exercício com força e equilíbrio previne quedas.',
      rijk2016: 'A força de preensão como marcador de independência.',
      cohen2016: 'Um senso de propósito.',
      lee2019: 'Otimismo e chegar aos 85.',
      okun2013: 'Ajudar os outros.',
      waldinger2016: 'Satisfação nos relacionamentos aos 50 e saúde aos 80.',
      allcott2020: 'Menos rolagem, mais tempo com as pessoas.',
      hunt2018: 'Limitar as redes sociais a 30 minutos por dia.',
      phoneTime2025: 'O ponto de partida de 4 horas na pergunta do celular (as estimativas variam).',
      liu2023: 'Procurar as pessoas.',
      gollwitzer2006: 'Planos “se… então”.',
      dai2014: 'Recomeços: segundas, dia 1º, aniversários.',
      milkman2021: 'Boas-vindas depois de um tempo longe, em vez de sequências.',
      parkes2008: 'Mostrar às pessoas os próprios números.',
      buffey2022: 'Caminhadas curtas depois das refeições.',
      oneill2013: 'Cães: longevidade mediana de cerca de 12 anos.',
      mcmillan2024: 'Cães: expectativa de vida mediana de 12,5 anos (584.734 cães do Reino Unido).',
      oneill2015: 'Gatos: longevidade mediana de 14 anos.',
    },
    quotesHeading: 'Citações',
    /** Above the list of translations the wisdom library quotes, in languages that have the library. */
    wisdomIntro: 'Citações, histórias e práticas de pessoas que viveram antes de nós. Cada citação vem de uma destas traduções em domínio público e indica o lugar exato; as histórias são recontadas com nossas palavras.',
    quotes:
      'Marco Aurélio (Meditações, trad. inglesa de George Long, 1862), Sêneca (Cartas e Sobre a brevidade da vida, trad. inglesa de Richard M. Gummere, 1917–25, entre outras) e Epicteto (Encheirídion, trad. inglesa de Thomas Wentworth Higginson, 1865). Traduções em domínio público, algumas levemente adaptadas.',
    footnote:
      'Alguns links levam a um resumo ou comunicado quando o artigo completo é pago. Associações de estudos populacionais não provam causa, e nada aqui é orientação médica.',
  },

  methods: {
    eyebrow: 'Como funciona',
    title: 'De onde vêm seus números',
    lede: 'Tudo o que o app mostra é calculado no seu aparelho a partir das suas respostas e de pesquisas publicadas. Aqui está cada passo e o estudo por trás dele.',
    everyStep: 'Cada passo, com as fontes',
    accountHeading: 'COMO FUNCIONA',
    curveTitle: '1 · A curva de onde todos partem',
    curveIntro:
      'Nos adultos, o risco anual de morrer sobe de forma constante com a idade, dobrando mais ou menos a cada 7 ou 8 anos. Atuários descrevem isso há dois séculos como uma curva de Gompertz–Makeham:',
    curveParts: (child, youth) =>
      `B · e^(b·x) é a parte que cresce com a idade x (Gompertz); A é um risco pequeno que não depende da idade, como acidentes (Makeham). As mortes na infância e na juventude não seguem esse formato, então somamos dois termos constantes: um antes dos ${child} anos e outro dos ${child} aos ${youth}.`,
    placeTitle: '2 · Onde você mora',
    placeBody: (n) =>
      `Onde você mora pesa mais do que qualquer hábito: em 2023, a idade mediana ao morrer ia de cerca de 59 a mais de 90 anos conforme o país. Por isso a curva é ajustada separadamente para cada sexo em cada um de ${n} países e territórios, às tábuas de vida das Nações Unidas para 2023 (World Population Prospects 2024). A, B e b vêm das taxas de mortalidade entre 30 e 100 anos; os termos da infância e da juventude fazem a sobrevivência aos 15 e aos 30 bater exatamente com a tábua. Em todos os países e nos dois sexos, a idade mediana ao morrer que o modelo dá desde o nascimento fica a menos de um ano da tábua da ONU.`,
    placeUs: (mA, mB, fA, fB, b) =>
      `Sem país, o app usa uma aproximação antiga das tábuas dos EUA: A = ${mA}, B = ${mB} para homens; A = ${fA}, B = ${fB} para mulheres; b = ${b} (cerca de 75 e 81 anos ao nascer).`,
    placeLeftOut:
      'Renda e escolaridade também preveem a duração da vida dentro de um país. Ficam de fora de propósito: não são algo sobre o que você possa agir aqui e soam como um veredito.',
    habitsTitle: '3 · Seus hábitos',
    habitsIntro:
      'Cada resposta multiplica o risco anual em qualquer idade. ×1 significa nenhuma mudança; ×2, o dobro do risco. Os multiplicadores são arredondados a partir de grandes estudos e revisões: são aproximações e vêm de associações, não de experimentos.',
    habitsConnection: (middle) =>
      `Em conexão, a resposta do meio (${middle}) fica entre os níveis medidos; ela mesma não foi medida. O estudo informa razões de chances, usadas aqui como multiplicadores de risco, uma aproximação próxima.`,
    habitsSteps: (at4k, at10k) =>
      `Os passos diários, se você os informar, substituem a resposta sobre exercício, então o movimento nunca é contado duas vezes. O risco cai cerca de 7% a cada 1.000 passos a mais, medido a partir de 6.000 por dia, e se estabiliza em 10.000: multiplicador = e^(−0,072 × (passos − 6.000) ÷ 1.000). Assim, 4.000 passos dão ${at4k} e 10.000 dão ${at10k}.`,
    rangeTitle: '4 · Do risco a uma faixa',
    rangeBody:
      'A partir da sua idade hoje, o app acompanha o risco mês a mês até os 121 anos, multiplicado pelos seus hábitos. A idade em que metade das pessoas como você já morreu é a sua mediana. As idades em que um quarto e três quartos já morreram dão a faixa provável. Ele também mostra a chance de chegar aos 80.',
    rangeRule: (b, years, doubling) =>
      `Uma regra prática por trás dos números dos hábitos: anos ganhos ≈ ln(1 ÷ multiplicador) ÷ ${b}. Cortar seu risco pela metade soma cerca de ${years} anos, porque com b = ${b} o risco dobra mais ou menos a cada ${doubling} anos de idade (as curvas ajustadas por país são um pouco mais íngremes). As telas calculam a diferença real, não o atalho.`,
    combineTitle: '5 · E se: combinar mudanças',
    combineBody: (cap) =>
      `Cada “e se” é a diferença entre sua mediana de agora e sua mediana com aquele hábito mudado. Várias mudanças juntas se multiplicam, então somam menos que cada uma sozinha, porque os efeitos dos hábitos se sobrepõem. O total também tem um limite de ${cap} anos.`,
    capClaim: (cap) =>
      `${cap} anos: a maior diferença entre pessoas com os cinco hábitos saudáveis e pessoas sem nenhum, em duas grandes coortes dos EUA.`,
    combineCalendar:
      'No calendário, o ganho combinado é dividido entre as mudanças que você testa na proporção do que cada uma somaria sozinha, e cada uma ganha sua própria cor.',
    notInEstimate: (items) =>
      `Algumas coisas da tela Hábitos aparecem só para orientar e ainda não estão nos seus números: ${items}.`,
    healthyTitle: '6 · Anos com saúde',
    healthyBody:
      'Os anos com saúde partem da expectativa de vida saudável do seu país (OMS, 2023): a parte dos anos à frente que as pessoas da sua idade e sexo passam com boa saúde, desde o nascimento e a partir dos 60. Ajustamos a essas duas partes uma curva de quantas pessoas não estão com boa saúde em cada idade e com ela ponderamos seus anos à frente, juntando o tempo menos saudável no fim da vida, onde cai a maior parte. Por isso a faixa verde do calendário esmaece num intervalo em vez de terminar numa data. A OMS pondera cada condição pelo quanto ela limita, então “boa saúde” aqui é parecido, mas não igual, a ser independente.',
    healthyHabits: (k, cap) => `Os hábitos movem os anos com saúde quase tanto quanto o total, como num grande estudo de Harvard: o multiplicador de risco de cada hábito desloca a curva de saúde ${k} vezes o que desloca o risco de morrer. O mesmo limite de ${cap} anos vale.`,
    healthyStrength: (hr) => `Treinar força duas vezes por semana também reduz o risco de perder a boa saúde (${hr}), segundo um ensaio em que caminhada com força e equilíbrio reduziu em 18% a incapacidade grave de locomoção. Exercício com força e equilíbrio também previne quedas.`,
    timeTitle: '7 · Celular e sono',
    timePhone: (waking) =>
      `O tempo no celular é a sua própria estimativa, em horas por dia (começa em 4, perto das estimativas comuns para adultos nos EUA). Ao longo dos anos que você provavelmente ainda tem, isso soma horas × anos ÷ 24. Como parte do seu dia acordado, são horas ÷ ${waking}.`,
    timeSleep: (ok, short) =>
      `As visões “Acordado” e “Fora do celular” tiram o sono do calendário: cerca de ${ok} horas por noite, ou ${short} se você respondeu menos de 6. Dormir é tempo bem usado, não perdido.`,
    timeSwap: (minutes) =>
      `A troca sugere recuperar ${minutes} minutos por dia do celular e mostra no que eles poderiam se transformar, por exemplo passeios diários com seu cachorro durante os anos que vocês provavelmente têm juntos.`,
    lovesTitle: '8 · O que você ama: “mais N vezes”',
    lovesBody:
      'Para cada pessoa, bicho ou atividade, o app conta os anos que vocês provavelmente vão compartilhar e multiplica pela frequência com que você os vê ou faz aquilo. Esses anos terminam no que vier primeiro: sua idade mediana; a idade em que você disse que pararia uma atividade; a idade mediana da outra pessoa (pela idade dela, na média dos dois sexos, já que o app não pergunta, e supondo que ela mora no seu país); ou a expectativa de vida típica de um bicho.',
    lovesPets: (dog, cat) =>
      `Expectativas de vida típicas: cães cerca de ${dog} anos, gatos cerca de ${cat}, segundo registros veterinários do Reino Unido. Raça e porte importam muito. Um bicho mais velho sempre conta com pelo menos meio ano.`,
    limitsTitle: '9 · O que ele não pode dizer',
    limits: [
      'São médias populacionais. Descrevem quanto tempo grupos de pessoas com respostas como as suas costumavam viver, não o que vai acontecer com você. Não sabem nada do seu histórico de saúde, dos seus genes ou do seu atendimento médico.',
      'As ligações entre hábitos e duração da vida vêm de estudos observacionais: quem faz X tende a viver mais, em parte por causa de X e em parte por tudo o que vem junto. Mudar um hábito pode não mudar sua vida na quantidade mostrada.',
      'Por isso o app mostra uma faixa, nunca uma data. Metade das pessoas como você vive além da mediana; muitas, bem além.',
    ],
    versionTitle: 'Versão do modelo',
    versionBody: 'O modelo só muda com evidências fortes, como meta-análises, e cada mudança ganha uma nova versão.',
    allSources: 'Todas as fontes, completas',
  },
};
