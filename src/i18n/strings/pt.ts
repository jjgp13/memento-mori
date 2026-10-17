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
      question: 'Você fuma?',
      short: 'Cigarro',
      why: 'A maior alavanca desta lista.',
      options: { never: 'Nunca', former: 'Parei', current: 'Sim' },
    },
    exercise: {
      question: 'Com que frequência você faz exercício?',
      short: 'Exercício',
      why: 'Caminhada rápida conta.',
      options: { none: 'Raramente', some: '1–2× por semana', regular: '3+× por semana' },
    },
    bmi: {
      question: 'O que descreve melhor o seu peso?',
      short: 'Peso',
      why: 'Faixas de índice de massa corporal. Aproximado está ótimo.',
      options: { under: 'Abaixo do peso', normal: 'Saudável', over: 'Sobrepeso', obese: 'Obesidade' },
    },
    alcohol: {
      question: 'Quanto você bebe?',
      short: 'Álcool',
      why: 'Muito é cerca de 15 doses ou mais por semana.',
      options: { none: 'Pouco ou nada', moderate: 'Moderado', heavy: 'Muito' },
    },
    sleep: {
      question: 'Quanto você dorme?',
      short: 'Sono',
      why: 'Na maioria das noites, não nas suas melhores.',
      options: { short: 'Menos de 6 horas', ok: '6–9 horas' },
    },
    connection: {
      question: 'Com que frequência você passa tempo com pessoas próximas?',
      short: 'Conexão',
      why: 'Pessoalmente ou numa conversa de verdade. Relações próximas estão entre os melhores preditores de uma vida longa.',
      options: { often: 'Toda semana', sometimes: 'Algumas vezes por mês', rarely: 'Raramente; muitas vezes me sinto só' },
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
    welcomeEyebrow: 'Lembre-se de que você vai morrer',
    welcomeLede:
      'Os estoicos mantinham a morte em mente para não desperdiçar seus dias. Este app conta o tempo que provavelmente lhe resta, para que o dia de hoje tenha o peso que merece, e o direciona ao que você ama.',
    welcomeNote: 'Algumas perguntas curtas, uma de cada vez. Suas respostas ficam neste aparelho.',
    begin: 'Começar',
    step: {
      you: 'Você',
      birth: 'Nascimento',
      place: 'Lugar',
      body: 'Corpo',
      habits: 'Hábitos',
      time: 'Seu tempo',
      values: 'O que importa',
      who: 'Quem ama você',
      what: 'O que você ama',
    },
    nameQuestion: 'Como devemos chamar você?',
    nameA11y: 'Primeiro nome',
    namePlaceholder: 'Seu primeiro nome',
    dobQuestion: 'Quando você nasceu?',
    countryQuestion: 'Onde você mora?',
    countryWhy:
      'O lugar onde se vive muda quanto as pessoas vivem, em 30 anos ou mais entre países. Partimos das tábuas de vida do seu país.',
    countrySearch: 'Buscar país',
    countrySearchAgain: 'Outro lugar? Busque',
    countryNone: 'Nenhum país com esse nome nas tábuas da ONU.',
    sexQuestion: 'Qual era o seu sexo ao nascer?',
    sexWhy: 'Em média, as mulheres vivem cerca de cinco anos a mais que os homens.',
    sex: { m: 'Masculino', f: 'Feminino' },
    phoneQuestion: 'Quantas horas por dia você passa no celular?',
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
    valuesQuestion: 'O que mais importa para você?',
    valuesWhy: 'Escolha até três. Seus lembretes vão sempre apontar de volta para eles.',
    peopleQuestion: 'Quem ama você, e quem você ama?',
    peopleWhy:
      'As pessoas (e os bichos) que você mais se arrependeria de não ver o bastante. Vamos contar quantas vezes mais você provavelmente vai vê-los.',
    activitiesQuestion: 'O que você ama fazer?',
    activitiesWhy: 'Vamos contar quantas vezes mais você vai poder fazer isso.',
    computing: 'Contando suas semanas',
    computingNote: 'Transformando suas respostas em tempo.',
  },

  reveal: {
    eyebrow: (name) => (name ? `${name}, seu tempo` : 'Seu tempo'),
    about: 'Cerca de',
    weeksRemain: 'semanas provavelmente restam',
    fullLife: (total, lived) =>
      `Uma vida inteira como a sua tem cerca de ${total} semanas. Você já viveu ${lived} delas. Vamos fazer o resto valer.`,
    person: (n, label) => [s('Isso dá cerca de '), b(n), s(` ${label}.`)],
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
    },
    legend: {
      lived: 'Vivido',
      now: 'Agora',
      likely: 'Provavelmente pela frente',
      reach: 'Ao seu alcance',
      maybe: 'Se a sorte permitir',
      asleep: 'Dormindo',
      phone: 'No celular',
    },
    shows: { all: 'Tudo', awake: 'Acordado', free: 'Fora do celular' },
    showA11y: 'Mostrar o tempo pela frente',
    whatIf: 'E se… toque para testar',
    whatIfA11y: (label, years) => `E se: ${label}, cerca de ${years} anos`,
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
    triedOne: (label, years) => `${label}: cerca de ${years} anos sozinho`,
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
      summary: '30–60 minutos por semana estão ligados a 10–17% menos mortalidade.',
      detail: 'Além do exercício aeróbico, não no lugar dele. Os benefícios além de cerca de uma hora por semana não são claros.',
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
  },

  howItWorks: [
    'O risco anual de morrer de todo mundo sobe com a idade, mais ou menos dobrando a cada 7 anos. Partimos dessa curva para o seu sexo no seu país, ajustada à tábua de vida da ONU (World Population Prospects 2024, mortes em 2023). Sem país, usamos uma aproximação das tábuas dos EUA.',
    'Seus hábitos multiplicam esse risco: fumar ×2,2, exercício 3+ vezes por semana ×0,85, menos de 6 horas de sono ×1,15, raramente ver pessoas próximas ×1,29, e assim por diante.',
    'Acompanhamos esse risco mês a mês a partir da sua idade hoje. A idade em que metade das pessoas como você já morreu é a sua mediana; as marcas de 25% e 75% dão a sua faixa.',
    'Regra prática: anos ≈ ln(multiplicador de risco) ÷ 0,085. Por isso dobrar o risco custa cerca de 8 anos, e parar de fumar pode devolver cerca de 9.',
    'Várias mudanças juntas somam menos que a soma de cada uma, e limitamos o total a 14 anos, a maior diferença de todos os hábitos encontrada num grande estudo dos EUA.',
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

  account: {
    title: 'Você',
    edit: 'Editar suas respostas',
    dataHeading: 'SEUS DADOS',
    dataBody:
      'Tudo o que você digita fica neste aparelho. Não há conta, nem anúncios, nem rastreamento. Sua estimativa é calculada aqui mesmo, no seu celular ou no seu navegador.',
    guestNote: (guest) =>
      `Você também tem uma ${guest ? 'conta de visitante' : 'conta conectada'} de um teste anterior. Ela só guarda um perfil vazio; apagar abaixo encerra a sessão.`,
    confirm:
      'Isso apaga suas respostas, as pessoas e coisas que você ama, e todo o resto neste aparelho. Não dá para desfazer.',
    yesDelete: 'Sim, apagar tudo',
    keep: 'Manter meus dados',
    deleteAll: 'Apagar tudo neste aparelho',
    signOutFailed: 'Não foi possível sair.',
    disclaimer:
      'As estimativas vêm de estudos populacionais. Mostram a direção e o tamanho aproximado, não são uma promessa nem orientação médica.',
  },
};
