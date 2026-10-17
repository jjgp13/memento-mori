/**
 * The wisdom library in Spanish (Mexico). Same entries and ids as wisdom-data.ts (docs/wisdom.md §5).
 *
 * - Ecclesiastes and the Psalms quote the Reina-Valera 1909 word for word (public domain; checked by
 *   scripts/verify-wisdom.py). `modern` only updates its spelling ("á" → "a", "Criador" → "Creador").
 * - Every other quote is our translation of the English public-domain translation the entry cites, and
 *   the app says so under it. The older Spanish versions we found (Díaz de Miranda's Marco Aurelio and
 *   Brum's Epicteto on Wikisource, Navarro y Calvo's Séneca) are unproofread OCR or scans only, and
 *   number the text differently, so they can't be quoted and cited exactly yet (docs/wisdom.md §5).
 * - Stories, questions and actions are ours. Actions finish "Podrías …": an infinitive, offered, never
 *   assigned (docs/nudges.md §1i).
 */
import type { WisdomLanguage } from './wisdom-data';

export const ES: WisdomLanguage = {
  lang: 'es',
  authors: {
    marcus: 'Marco Aurelio',
    seneca: 'Séneca',
    epictetus: 'Epicteto',
    musonius: 'Musonio Rufo',
    qoheleth: 'El Predicador',
    psalms: 'Los Salmos',
    buddha: 'El Buda',
    laozi: 'Laozi',
    zhuangzi: 'Zhuangzi',
    montaigne: 'Montaigne',
    boethius: 'Boecio',
  },
  works: {
    Meditations: 'Meditaciones',
    Letters: 'Cartas a Lucilio',
    'On the Shortness of Life': 'Sobre la brevedad de la vida',
    'On Anger': 'Sobre la ira',
    Discourses: 'Disertaciones',
    'in Epictetus, Discourses': 'en Epicteto, Disertaciones',
    Enchiridion: 'Enquiridión',
    Ecclesiastes: 'Eclesiastés',
    Psalms: 'Salmos',
    Dhammapada: 'Dhammapada',
    'Tao Te Ching': 'Tao Te Ching',
    Zhuangzi: 'Zhuangzi',
    Essays: 'Ensayos',
    'Consolation of Philosophy': 'La consolación de la filosofía',
  },
  locus: [
    ['prose', 'prosa'],
    ['ch.', 'cap.'],
  ],
  entries: {
    // ───────────── Marco Aurelio · Meditaciones (from Long) ─────────────
    'meditations-4-17': {
      text: 'No actúes como si fueras a vivir diez mil años. La muerte pende sobre ti. Mientras vives, mientras está en tu poder, sé bueno.',
      question: '¿Qué cosa buena está hoy en tu poder?',
      action: 'hacer algo amable antes del mediodía, algo tan pequeño que puedas hacerlo ya.',
    },
    'meditations-2-11': {
      text: 'Puesto que es posible que dejes la vida en este mismo momento, ordena cada acto y cada pensamiento en consecuencia.',
      question: 'Si este fuera tu último {day} normal, ¿qué dejarías igual?',
      action: 'elegir una cosa que dejarías igual y hacerla hoy a propósito.',
    },
    'meditations-7-56': {
      text: 'Considérate muerto, como si tu vida hubiera terminado hasta este momento; y vive conforme a la naturaleza el resto que se te concede.',
      question: 'Si cada día de aquí en adelante fuera de regalo, ¿cómo pasarías este?',
      action: 'anotar una cosa de hoy que contarías como un regalo.',
    },
    'meditations-3-10': {
      text: 'Ten presente que cada uno de nosotros vive solo este tiempo presente, que es un punto indivisible, y que todo el resto de la vida o ya pasó o es incierto.',
      question: '¿Qué tienes enfrente ahora mismo que merece toda tu atención?',
    },
    'meditations-4-3': {
      text: 'La gente busca retiros para sí: casas en el campo, orillas del mar, montañas … está en tu poder, cuando tú quieras, retirarte dentro de ti.',
      question: '¿Dónde podrías encontrar hoy cinco minutos de calma?',
      action: 'sentarte cinco minutos sin nada en las manos.',
    },
    'meditations-4-48': {
      text: 'Pasa, pues, este breve espacio de tiempo de acuerdo con la naturaleza, y termina tu viaje contento, como cae la aceituna cuando está madura, bendiciendo a la naturaleza que la produjo y dando gracias al árbol en que creció.',
      question: '¿Quién es el árbol en el que creciste?',
      action: 'darle las gracias a alguien que te ayudó a crecer. Basta un mensaje corto.',
    },
    'meditations-5-1': {
      text: 'Por la mañana, cuando te levantes sin ganas, ten presente este pensamiento: me levanto para hacer el trabajo de un ser humano.',
      question: '¿Cuál es, para ti, el trabajo de un ser humano este {day}?',
    },
    'meditations-7-27': {
      text: 'No pienses tanto en lo que te falta como en lo que tienes: de las cosas que tienes, escoge las mejores, y piensa con cuánto afán las habrías buscado si no las tuvieras.',
      question: '¿Qué tienes ahora que alguna vez deseaste?',
    },
    'meditations-6-48': {
      text: 'Cuando quieras alegrarte, piensa en las virtudes de quienes viven contigo: la energía de uno, la modestia de otro, la generosidad de un tercero y alguna otra buena cualidad de un cuarto.',
      question: '¿Cuál es una buena cualidad de alguien que quieres?',
      action: 'decirle a {person} lo que notaste.',
    },
    'meditations-7-69': {
      text: 'La perfección del carácter consiste en esto: en pasar cada día como si fuera el último, sin agitarse con violencia, sin adormecerse y sin fingir.',
      question: '¿Cómo sería vivir hoy como el último, con calma?',
      action: 'darle a una conversación de hoy toda tu atención.',
    },
    'meditations-10-16': {
      text: 'No hables más de cómo debe ser una persona buena: sé una.',
      question: '¿De qué manera pequeña podrías ser hoy lo que admiras?',
    },
    'meditations-5-16': {
      text: 'Como sean tus pensamientos habituales, así será el carácter de tu mente; porque el alma se tiñe de sus pensamientos.',
      question: '¿A qué pensamiento te gustaría volver más seguido?',
    },
    'meditations-4-24': {
      text: 'Ocúpate de pocas cosas, dice el filósofo, si quieres vivir tranquilo.',
      question: '¿Qué podrías dejar hoy a un lado, para que lo demás reciba tu atención?',
    },
    'meditations-5-6': {
      text: 'Quien ha hecho un bien no llama a otros para que vengan a verlo, sino que pasa a otra buena acción, como la vid vuelve a dar uvas a su tiempo.',
      question: '¿Qué bien podrías hacer hoy que nadie necesite ver?',
    },
    'meditations-7-22': {
      text: 'Es propio del ser humano amar incluso a quienes hacen mal. Y esto sucede si, cuando hacen mal, te viene a la mente que son de tu misma familia … y que pronto morirán los dos.',
      question: '¿A quién podrías perdonar un poco, sabiendo que el tiempo es corto para los dos?',
      action: 'soltar un pequeño rencor, aunque sea solo en tu cabeza.',
    },
    'meditations-4-43': {
      text: 'El tiempo es como un río hecho de lo que sucede, y una corriente impetuosa: apenas se ha visto una cosa, ya se la llevó, y viene otra en su lugar, y también esa se la llevará.',
      question: '¿Qué está pasando hoy frente a ti que te gustaría ver de verdad?',
    },
    'meditations-2-1': {
      text: 'Empieza la mañana diciéndote: hoy me encontraré con el entrometido, el ingrato, el arrogante, el mentiroso, el envidioso, el huraño.',
      question: '¿Quién podría poner a prueba tu paciencia hoy, y cómo te gustaría responder?',
    },
    'meditations-8-47': {
      text: 'Si algo de fuera te duele, no es esa cosa lo que te perturba, sino tu juicio sobre ella. Y está en tu poder borrar ese juicio ahora mismo.',
      question: '¿Qué te está molestando, y qué parte de eso es la historia que tú te cuentas?',
    },
    'meditations-6-39': {
      text: 'Adáptate a las cosas que te tocaron en suerte; y a las personas con quienes te tocó vivir, quiérelas, y de verdad.',
      question: '¿Entre qué personas te ha puesto la vida, y cómo podrías quererlas de verdad hoy?',
    },
    'meditations-12-1': {
      text: 'Si temes no porque algún día dejarás de vivir, sino porque quizá nunca empezaste a vivir conforme a la naturaleza, entonces serás digno del universo que te produjo.',
      question: '¿Cómo sería para ti empezar a vivir, esta semana?',
      action: 'empezar eso que siempre dices que vas a empezar, durante diez minutos.',
    },
    'meditations-2-14': {
      text: 'Nadie pierde otra vida que la que está viviendo ahora, ni vive otra que la que ahora está perdiendo.',
      question: '¿De qué parte de esta vida, la que vives ahora, te gustaría tener más?',
    },
    'meditations-4-32': {
      text: 'Marco nos pide imaginar la época del emperador Vespasiano, un siglo antes de la suya: gente que se casa, cría hijos, enferma, muere, hace fiestas, comercia, siembra, ama, desea cosas. Toda esa vida ya se fue. Luego, dice, piensa en la gente que tú has conocido.',
      question: '¿Qué parte ordinaria de tu vida extrañarías más?',
      action: 'hacer hoy algo ordinario despacio y a propósito: una comida, una caminata, una llamada.',
    },
    'meditations-1-practice': {
      text: 'Marco abre su cuaderno no con consejos, sino con gratitud. Línea por línea nombra lo que aprendió de cada persona: su abuelo, su madre, sus maestros, su hermano, sus amigos. De su madre, escribe, la piedad y la bondad, y una manera sencilla de vivir.',
      question: '¿Qué aprendiste de las personas que te criaron?',
      action: 'escribir tu propio Libro Primero: una línea por cada persona que te formó.',
    },

    // ───────────── Séneca · Cartas a Lucilio (from Gummere) ─────────────
    'letters-1-2-postponing': {
      text: 'Mientras aplazamos, la vida pasa corriendo.',
      question: '¿Qué estás aplazando que lamentarías no haber hecho nunca?',
      action: 'dar hoy el primer paso, uno de cinco minutos.',
    },
    'letters-1-3': {
      text: 'Nada, Lucilio, es nuestro, excepto el tiempo.',
      question: '¿A dónde se fue tu tiempo ayer, y a dónde te gustaría que fuera hoy?',
    },
    'letters-1-2-dying-daily': {
      text: '¿Puedes mostrarme a alguien que dé valor a su tiempo, que sepa lo que vale cada día, que entienda que está muriendo cada día?',
      question: '¿Cuánto vale para ti el día de hoy?',
      action: 'poner en tu día algo que importa, con una hora al lado.',
    },
    'letters-12-4': {
      text: 'Abracemos y amemos la vejez; porque está llena de placer si uno sabe aprovecharla.',
      question: '¿Qué te ilusiona de envejecer?',
    },
    'letters-12-story': {
      text: 'Séneca visita su vieja casa de campo y regaña al capataz por los muros que se desmoronan y los plátanos sin hojas. El capataz dice que simplemente están viejos. Séneca plantó esos árboles con sus propias manos. Luego, un anciano gastado en la puerta resulta ser Felicio, el niño con quien él jugaba. Todo lo que había notado era su propia edad.',
      question: '¿Quién te conoce desde hace más tiempo, y cuándo platicaron por última vez?',
    },
    'letters-101-7': {
      text: 'Ordenemos nuestra mente como si hubiéramos llegado al final. No aplacemos nada. Saldemos cada día las cuentas con la vida.',
      question: '¿Qué cosa pequeña sigue pendiente que podrías cerrar hoy?',
      action: 'resolver algo pequeño antes de dormir: una respuesta, un gracias, una disculpa.',
    },
    'letters-101-10': {
      text: 'Empieza ya a vivir, y cuenta cada día como una vida aparte.',
      question: 'Si hoy fuera una vida entera, ¿qué la haría una buena vida?',
    },
    'letters-13-4': {
      text: 'Hay más cosas, Lucilio, que nos asustan que cosas que nos aplastan; sufrimos más a menudo en la imaginación que en la realidad.',
      question: '¿Qué preocupación es más grande en tu cabeza que en el mundo?',
    },
    'letters-2-6': {
      text: 'No es pobre quien tiene poco, sino quien desea más.',
      question: '¿De qué tienes ya suficiente?',
    },
    'letters-9-6': {
      text: 'Puedo mostrarte un filtro de amor hecho sin drogas, sin hierbas ni conjuros de hechicera: “Si quieres ser amado, ama”.',
      question: '¿A quién podrías querer primero hoy, sin esperar?',
      action: 'mandarle a {person} un mensaje que no necesite respuesta.',
    },
    'letters-3-2': {
      text: 'Piensa mucho tiempo si vas a admitir a alguien en tu amistad; pero cuando lo hayas decidido, recíbelo con todo tu corazón y toda tu alma.',
      question: '¿A quién le has abierto la puerta de tu amistad, y cómo podrías darle una bienvenida más plena?',
    },
    'letters-24-20': {
      text: 'No caemos de golpe en la muerte, sino que avanzamos hacia ella poco a poco; morimos cada día. Porque cada día se nos quita un poco de vida.',
      question: '¿A dónde te gustaría que fuera hoy ese pedacito de vida?',
      action: 'dedicar diez minutos a algo que te gustaría tener más en tu vida.',
    },
    'letters-28-1': {
      text: 'Necesitas cambiar de alma, no de clima.',
      question: '¿Qué esperas que arregle un cambio de lugar?',
    },
    'letters-61-1': {
      text: 'Procuro vivir cada día como si fuera una vida completa.',
      question: '¿Qué haría que el día de hoy se sintiera completo?',
    },
    'letters-63-8': {
      text: 'Disfrutemos con avidez de nuestros amigos, porque no sabemos cuánto tiempo tendremos este privilegio.',
      question: '¿A quién de tus amistades te gustaría ver más seguido?',
      action: 'proponerle a {person} una fecha para verse en las próximas dos semanas.',
    },
    'letters-63-4': {
      text: 'Procuremos que el recuerdo de quienes hemos perdido se vuelva para nosotros una memoria grata.',
      question: '¿A quién has perdido que hoy podrías recordar con una sonrisa?',
      action: 'compartir un recuerdo con alguien que también conoció a esa persona.',
    },
    'letters-93-2': {
      text: 'Esforcémonos no por vivir mucho, sino por vivir bien; porque para vivir mucho solo hace falta el destino, pero para vivir bien hace falta el alma. Una vida es realmente larga si es una vida plena.',
      question: '¿Qué hace que un día sea pleno para ti, y no solo largo?',
      action: 'hacer hoy algo que haga tu vida más plena, no solo más larga.',
    },
    'letters-77-20': {
      text: 'Con la vida pasa como con una obra de teatro: no importa cuánto dure la función, sino qué tan bien se actúe.',
      question: '¿Qué escena de hoy te gustaría actuar bien?',
      action: 'elegir un momento de hoy, una comida, una llamada, una caminata, y darle lo mejor de ti.',
    },
    'letters-15-4': {
      text: 'Hay ejercicios cortos y sencillos que cansan el cuerpo rápido y así ahorran tiempo; y el tiempo es algo de lo que hay que llevar cuentas estrictas.',
      question: '¿Qué ejercicio corto podría caber en tu día de hoy?',
      action: 'dar una caminata rápida de diez minutos.',
    },
    'letters-18-5': {
      text: 'Aparta cierto número de días en los que te contentes con la comida más escasa y barata, con ropa tosca y áspera, diciéndote mientras tanto: “¿Es esto lo que yo temía?”',
      question: '¿Qué comodidad temes más perder, y podrías vivir sin ella un día?',
    },
    'letters-2-4': {
      text: 'Cada día consigue algo que te fortalezca contra la pobreza, contra la muerte y también contra otras desgracias; y después de recorrer muchos pensamientos, escoge uno para digerirlo bien ese día.',
      question: '¿Qué pensamiento te gustaría llevar contigo todo el día de hoy?',
    },
    'letters-83-2': {
      text: 'Me vigilaré continuamente y, costumbre utilísima, repasaré cada día. Porque esto es lo que nos hace malos: que ninguno de nosotros mira hacia atrás su propia vida.',
      question: 'Mirando el día de hoy, ¿qué salió bien y qué harías distinto?',
      action: 'dedicar dos minutos antes de dormir a repasar tu día.',
    },
    'letters-30-17': {
      text: 'No tememos a la muerte; tememos a la idea de la muerte.',
      question: '¿Qué miedo de hoy es solo una idea?',
      action: 'cuando hoy llegue un pensamiento de miedo, nombrarlo con suavidad: “solo es un pensamiento”.',
    },
    'letters-47-11': {
      text: 'Trata a quienes están por debajo de ti como quisieras que te trataran quienes están por encima.',
      question: '¿A quién, de quienes te ayudan todos los días, casi nunca le das las gracias?',
      action: 'darle las gracias, por su nombre, a alguien cuyo trabajo te hace el día más fácil.',
    },
    'letters-7-8': {
      text: 'Rodéate de quienes te harán mejor. Recibe a quienes tú puedes mejorar. El proceso es mutuo, porque los hombres aprenden mientras enseñan.',
      question: '¿Quién te hace mejor, y a quién podrías ayudar a crecer?',
    },
    'letters-6-4': {
      text: 'Ningún bien es grato de poseer si no hay amigos con quienes compartirlo.',
      question: '¿Qué cosa buena de tu vida podrías compartir esta semana?',
      action: 'compartir con {person} algo que estés disfrutando.',
    },
    'letters-48-2': {
      text: 'Nadie puede vivir feliz si solo se mira a sí mismo y lo convierte todo en una cuestión de su propio provecho; tienes que vivir para tu prójimo si quieres vivir para ti.',
      question: '¿Quién cerca de ti podría necesitar una mano esta semana?',
    },
    'letters-78-28': {
      text: 'Por corto que sea este tiempo, lo haremos largo si sabemos emplearlo.',
      question: '¿Cómo podrías hacer largo hoy un tiempo corto?',
    },

    // ───────────── Séneca · Sobre la brevedad de la vida, Sobre la ira (from Stewart) ─────────────
    'shortness-1': {
      text: 'No recibimos una vida corta, sino que la hacemos corta; no somos pobres de días, sino derrochadores de ellos.',
      question: '¿Por dónde se te escapa el tiempo sin que lo elijas?',
      action: 'escoger una fuga, como el celular o un hábito, y taparla por una noche.',
    },
    'shortness-9': {
      text: 'Aplazar es el mayor desperdicio de la vida: nos arrebata un día tras otro y nos quita el presente prometiéndonos algo para después … todo lo futuro es incierto: vive ahora mismo.',
      question: '¿Qué estás esperando un mejor momento para hacer?',
      action: 'hacer hoy un pedacito de eso en vez de esperar.',
    },
    'shortness-16': {
      text: 'Llevan la vida más corta y más infeliz quienes olvidan el pasado, descuidan el presente y temen el futuro.',
      question: '¿Qué de tu pasado agradeces, y qué de tu presente merece más cuidado?',
    },
    'shortness-7': {
      text: 'Toda la vida hay que pasarla aprendiendo a vivir y, lo que quizá te sorprenda más, toda la vida hay que pasarla aprendiendo a morir.',
      question: '¿Qué sigues aprendiendo sobre cómo vivir?',
      action: 'preguntarle a alguien mayor qué le habría gustado saber a tu edad.',
    },
    'anger-3-36': {
      text: 'Sextio tenía la costumbre, al terminar el día y retirarse a descansar, de preguntarle a su espíritu: “¿Qué mal hábito curaste hoy? ¿Qué vicio frenaste? ¿En qué eres mejor?”',
      question: '¿En qué fuiste hoy un poco mejor?',
      action: 'hacerte esta noche, antes de dormir, las tres preguntas de Sextio.',
    },

    // ───────────── Epicteto · Enquiridión, Disertaciones (from Long) ─────────────
    'enchiridion-1': {
      text: 'De las cosas, unas están en nuestro poder y otras no.',
      question: '¿Qué está hoy en tus manos, y qué no?',
    },
    'enchiridion-21': {
      text: 'Ten cada día ante los ojos la muerte, el destierro y todo lo que parece terrible, pero sobre todo la muerte; y nunca pensarás nada mezquino ni desearás nada con exceso.',
      question: 'Con la muerte a la vista, ¿qué cosa mezquina podrías soltar?',
      action: 'hacer esa pequeña cosa valiente que has estado evitando.',
    },
    'enchiridion-11': {
      text: 'Nunca digas de nada: “Lo he perdido”, sino: “Lo he devuelto”.',
      question: '¿Qué se te prestó por un tiempo que te alegra haber tenido?',
    },
    'enchiridion-8': {
      text: 'No pidas que las cosas sucedan como tú quieres; quiere que sucedan como suceden, y tu vida fluirá tranquila.',
      question: '¿Qué podrías aceptar hoy en vez de pelearlo?',
    },
    'enchiridion-15': {
      text: 'Recuerda que en la vida debes portarte como en un banquete. Supón que algo va pasando de mano en mano y llega frente a ti. Extiende la mano y toma tu parte con decoro.',
      question: '¿Qué cosa buena está pasando hoy frente a ti?',
    },
    'enchiridion-43': {
      text: 'Toda cosa tiene dos asas: una por la que puede llevarse y otra por la que no.',
      question: '¿Por qué asa podrías tomar hoy algo difícil?',
    },
    'enchiridion-46': {
      text: 'Las ovejas no vomitan el pasto para mostrarles a los pastores cuánto han comido, sino que, después de digerirlo por dentro, dan por fuera lana y leche.',
      question: '¿Qué has aprendido que podría notarse en lo que haces, no en lo que dices?',
    },
    'enchiridion-50': {
      text: '¿Hasta cuándo vas a seguir aplazando el considerarte digno de lo mejor?',
      question: '¿Qué cosa mejor has estado aplazando para ti?',
    },
    'discourses-1-15': {
      text: 'Nada grande, dijo Epicteto, se produce de repente, como no se produce así ni la uva ni el higo. Si me dices ahora que quieres un higo, te responderé que hace falta tiempo: que primero florezca, luego dé fruto y después madure.',
      question: '¿Qué estás cultivando que necesita un poco más de tiempo?',
    },
    'discourses-2-18': {
      text: 'Todo hábito y toda facultad se mantienen y crecen con las acciones que les corresponden: el hábito de caminar, caminando; el de correr, corriendo. Si quieres leer bien, lee; si escribir, escribe.',
      question: '¿Qué te gustaría hacer bien, y podrías hacer hoy un poco de eso?',
      action: 'dedicarle hoy cinco minutos.',
    },
    'discourses-1-1-agrippinus': {
      text: 'A Agripino le avisaron que su juicio había empezado en el Senado. Era la hora en que solía hacer ejercicio y tomar un baño frío, así que dijo: “Vamos a hacer ejercicio”. Cuando llegó la noticia de que lo habían condenado al destierro, solo preguntó a dónde, y luego dijo: “Vamos a Aricia, y comamos allá”.',
      question: '¿Qué está hoy fuera de tus manos, y cuál es la siguiente cosa buena que sí está en ellas?',
    },
    'discourses-1-11': {
      text: 'Un padre le contó a Epicteto que, cuando su hijita estuvo gravemente enferma, no lo soportó y se fue de casa hasta que le avisaron que se había recuperado. Epicteto le preguntó: ¿también debió irse la madre, y la nodriza, si ellas también la quieren? Y si tú estuvieras enfermo, ¿querrías que quienes te quieren te dejaran solo?',
      question: '¿Quién necesita que te quedes cerca cuando las cosas son difíciles?',
      action: 'preguntarle cómo está a alguien que esté pasando por algo difícil.',
    },

    // ───────────── Musonio Rufo, en Epicteto (from Long) ─────────────
    'musonius-discourses-1-1': {
      text: 'Si eliges la muerte como la desgracia más pesada, ¡qué locura la de tu elección! Y si como la más ligera, ¿quién te ha dado a elegir? ¿No te esforzarás por contentarte con lo que se te ha dado?',
      question: '¿Qué se te ha dado con lo que podrías contentarte hoy?',
      action: 'nombrar tres cosas que tienes hoy y que no tuviste que elegir.',
    },
    'musonius-discourses-3-23': {
      text: 'Rufo solía decir: si tienes tiempo de alabarme, estoy hablando en vano.',
      question: '¿Qué consejo has admirado últimamente pero todavía no has usado?',
    },
    'musonius-discourses-1-9': {
      text: 'Para poner a prueba al joven Epicteto, su maestro Musonio Rufo le advertía: tal y tal cosa te va a pasar a manos de tu amo. Cuando Epicteto respondía que eran simples penas humanas, Musonio le contestaba: entonces, ¿por qué pedirle a otro lo que ya puedes encontrar en ti mismo?',
      question: '¿Qué fuerza tienes ya y sigues buscando en otra parte?',
    },

    // ───────────── Eclesiastés, Salmos (Reina-Valera 1909) ─────────────
    'ecclesiastes-3-1': {
      text: 'Para todas las cosas hay sazón, y todo lo que se quiere debajo del cielo, tiene su tiempo: Tiempo de nacer, y tiempo de morir; tiempo de plantar, y tiempo de arrancar lo plantado.',
      source: 'reina-valera-1909',
      question: '¿En qué estación de la vida estás, y qué te está pidiendo?',
      action: 'plantar algo esta semana: una semilla, un plan, una primera conversación.',
    },
    'ecclesiastes-9-7': {
      text: 'Anda, y come tu pan con gozo, y bebe tu vino con alegre corazón.',
      source: 'reina-valera-1909',
      question: '¿Qué comida de esta semana podrías compartir y disfrutar sin prisa?',
      action: 'invitar a {person} a compartir una comida.',
    },
    'ecclesiastes-9-9': {
      text: 'Goza de la vida con la mujer que amas, todos los días de la vida de tu vanidad.',
      source: 'reina-valera-1909',
      question: '¿Cómo podrías darle un poco más de alegría a quien comparte tus días?',
      action: 'planear algo pequeño y alegre con la persona que amas.',
    },
    'ecclesiastes-9-10': {
      text: 'Todo lo que te viniere á la mano para hacer, hazlo según tus fuerzas; porque en el sepulcro, adonde tú vas, no hay obra, ni industria, ni ciencia, ni sabiduría.',
      modern: 'Todo lo que te viniere a la mano para hacer, hazlo según tus fuerzas; porque en el sepulcro, adonde tú vas, no hay obra, ni industria, ni ciencia, ni sabiduría.',
      source: 'reina-valera-1909',
      question: '¿Qué tienes hoy en las manos que merece todo de ti?',
      action: 'darle hoy a una tarea todo tu esfuerzo, de principio a fin.',
    },
    'ecclesiastes-11-7': {
      text: 'Suave ciertamente es la luz, y agradable á los ojos ver el sol.',
      modern: 'Suave ciertamente es la luz, y agradable a los ojos ver el sol.',
      source: 'reina-valera-1909',
      question: '¿Cuándo vas a salir hoy a la luz del día?',
      action: 'pasar diez minutos afuera, en la luz.',
    },
    'ecclesiastes-4-9': {
      text: 'Mejores son dos que uno; porque tienen mejor paga de su trabajo. Porque si cayeren, el uno levantará á su compañero.',
      modern: 'Mejores son dos que uno; porque tienen mejor paga de su trabajo. Porque si cayeren, el uno levantará a su compañero.',
      source: 'reina-valera-1909',
      question: '¿Quién te levanta a ti, y a quién podrías levantar tú?',
      action: 'preguntarle a {person} cómo está de verdad.',
    },
    'ecclesiastes-1-4': {
      text: 'Generación va, y generación viene: mas la tierra siempre permanece.',
      source: 'reina-valera-1909',
      question: '¿Qué te gustaría dejarle a la generación que viene después de ti?',
      action: 'contarle a alguien más joven una historia de familia que tal vez no conozca.',
    },
    'ecclesiastes-5-12': {
      text: 'Dulce es el sueño del trabajador.',
      source: 'reina-valera-1909',
      question: '¿Qué haría dulce tu sueño de esta noche?',
      action: 'guardar el celular media hora antes de dormir.',
    },
    'ecclesiastes-12-1': {
      text: 'Acuérdate de tu Criador en los días de tu juventud, antes que vengan los malos días.',
      modern: 'Acuérdate de tu Creador en los días de tu juventud, antes que vengan los malos días.',
      source: 'reina-valera-1909',
      question: '¿Qué quieres recordar mientras tus días todavía son buenos?',
    },
    'psalms-90-12': {
      text: 'Enséñanos de tal modo á contar nuestros días, que traigamos al corazón sabiduría.',
      modern: 'Enséñanos de tal modo a contar nuestros días, que traigamos al corazón sabiduría.',
      source: 'reina-valera-1909',
      question: 'Ahora que tus días están contados, ¿hacia dónde llevarás tu corazón?',
      action: 'elegir una de tus “veces más” y planear la siguiente.',
    },
    'psalms-103-15': {
      text: 'El hombre, como la hierba son sus días: florece como la flor del campo. Que pasó el viento por ella, y pereció.',
      source: 'reina-valera-1909',
      question: '¿Cómo podrías florecer hoy, mientras la flor está abierta?',
      action: 'hacer hoy algo solo porque te da gusto estar con vida.',
    },

    // ───────────── Dhammapada (from Müller) ─────────────
    'dhammapada-1': {
      text: 'Todo lo que somos es resultado de lo que hemos pensado: está fundado en nuestros pensamientos, está hecho de nuestros pensamientos.',
      question: '¿Sobre qué pensamiento quieres construir el día de hoy?',
    },
    'dhammapada-5': {
      text: 'Porque el odio nunca cesa con el odio: el odio cesa con el amor; esta es una ley antigua.',
      question: '¿Dónde podría un poco de amor terminar con un poco de odio?',
    },
    'dhammapada-6': {
      text: 'El mundo no sabe que todos hemos de llegar aquí a un final; pero quienes lo saben, sus pleitos cesan de inmediato.',
      question: '¿Qué pleito terminaría si los dos recordaran lo corta que es la vida?',
      action: 'hacer una pequeña paz: un mensaje amable a alguien de quien te has alejado.',
    },
    'dhammapada-47': {
      text: 'La muerte se lleva al hombre que va recogiendo flores con la mente distraída, como una inundación se lleva a una aldea dormida.',
      question: '¿Qué te distrae más de la vida que tienes enfrente?',
      action: 'dejar el celular en otro cuarto durante una comida de hoy.',
    },
    'dhammapada-103': {
      text: 'Si un hombre vence en batalla mil veces a mil hombres, y otro se vence a sí mismo, este es el mayor de los vencedores.',
      question: '¿Qué pequeña victoria sobre ti te gustaría lograr hoy?',
    },
    'dhammapada-122': {
      text: 'Que nadie tome el bien a la ligera, diciendo en su corazón: “No llegará hasta mí”. Aun gota a gota se llena el cántaro.',
      question: '¿Qué pequeño buen hábito podría ser la gota de hoy?',
      action: 'hacer hoy la versión más pequeña de un buen hábito.',
    },
    'dhammapada-151': {
      text: 'Los espléndidos carros de los reyes se destruyen, también el cuerpo se acerca a su destrucción, pero la virtud de los buenos nunca se acerca a la destrucción.',
      question: '¿Qué bien en ti te gustaría que te sobreviviera?',
      action: 'hacer hoy una buena obra que alguien vaya a recordar.',
    },
    'dhammapada-197': {
      text: '¡Vivamos, pues, felices, sin odiar a quienes nos odian! ¡Entre quienes nos odian, vivamos libres de odio!',
      question: '¿El rechazo de quién podrías dejar de cargar hoy?',
    },
    'dhammapada-204': {
      text: 'La salud es el mayor de los dones, el contento la mayor riqueza; la confianza es la mejor de las relaciones.',
      question: '¿Cuál de estos dones tienes hoy?',
    },
    'dhammapada-223': {
      text: 'Que se venza la ira con amor, el mal con el bien; que se venza al avaro con generosidad y al mentiroso con la verdad.',
      question: '¿Dónde podrías responder hoy al enojo con bondad?',
    },
    'dhammapada-21': {
      text: 'La atención es el camino de la inmortalidad (el nirvana); el descuido, el camino de la muerte.',
      question: '¿Qué merece hoy toda tu atención?',
      action: 'hacer hoy una tarea sin ninguna otra pantalla o pestaña abierta.',
    },

    // ───────────── Laozi · Tao Te Ching (from Legge) ─────────────
    'tao-64': {
      text: 'El árbol que llena los brazos creció de un brote diminuto; la torre de nueve pisos se levantó de un montoncito de tierra; el viaje de mil li empezó con un solo paso.',
      question: '¿Qué paso podría empezar algo hoy?',
      action: 'dar el primer paso, por pequeño que sea.',
    },
    'tao-33': {
      text: 'Quien conoce a los demás es perspicaz; quien se conoce a sí mismo es sabio. Quien vence a los demás es fuerte; quien se vence a sí mismo es poderoso. Quien está satisfecho con su suerte es rico.',
      question: '¿En qué sentido tu vida ya es rica?',
    },
    'tao-8': {
      text: 'La mayor excelencia es como la del agua. La excelencia del agua está en que beneficia a todas las cosas y en que ocupa, sin pelear, el lugar bajo que todos desprecian.',
      question: '¿Dónde podrías ayudar hoy sin necesitar reconocimiento?',
    },
    'tao-11': {
      text: 'Los treinta rayos se unen en un solo cubo; pero del espacio vacío (para el eje) depende el uso de la rueda.',
      question: '¿Dónde podrías dejar hoy un poco de espacio vacío?',
      action: 'dejar hoy media hora sin nada planeado.',
    },
    'tao-63': {
      text: '(El sabio) se anticipa a lo difícil mientras es fácil, y hace lo que llegaría a ser grande mientras es pequeño.',
      question: '¿Qué es todavía fácil hoy y podría volverse difícil si lo dejas?',
    },
    'tao-46': {
      text: 'No hay culpa mayor que consentir la ambición; no hay desgracia mayor que estar descontento con la propia suerte; no hay falta mayor que el afán de obtener.',
      question: '¿Qué sería suficiente?',
    },
    'tao-44': {
      text: 'Quien está contento no teme la vergüenza. Quien sabe detenerse no incurre en culpa. Libre de peligro, vivirá largo tiempo.',
      question: '¿Dónde podrías detenerte hoy un poco antes?',
    },

    // ───────────── Zhuangzi (retold, from Giles) ─────────────
    'zhuangzi-2-butterfly': {
      text: 'Una vez Zhuangzi soñó que era una mariposa que revoloteaba de aquí para allá, feliz, sin saber que era un hombre. Luego despertó, y ahí estaba, otra vez él mismo. Ya no podía saber: ¿era un hombre que había soñado ser mariposa, o una mariposa que soñaba ser un hombre?',
      question: '¿Cuándo fue la última vez que te perdiste en algo, como una mariposa?',
    },
    'zhuangzi-18-bowl': {
      text: 'Cuando murió la esposa de Zhuangzi, su amigo Huizi fue a darle el pésame y lo encontró sentado en el suelo, cantando y marcando el ritmo sobre un cuenco. Huizi se escandalizó. Zhuangzi le dijo que al principio había sufrido. Luego pensó en cómo ella había pasado de lo informe a la vida y ahora seguía su camino, como la primavera que se vuelve verano, otoño e invierno, y dejó de llorar.',
      question: '¿Cómo te gustaría que te recordaran quienes te quieren?',
      action: 'decirle a {person} una manera en que hace tu vida mejor.',
    },
    'zhuangzi-3-cook': {
      text: 'El cocinero del príncipe Hui destazaba un buey con tanta soltura que cada movimiento parecía un baile. Cuando le preguntaron cómo, dijo que al principio solo veía bueyes enteros. Tras años de práctica trabajaba más con la mente que con los ojos, siguiendo las aberturas naturales, y su cuchillo seguía tan afilado como nuevo después de diecinueve años.',
      question: '¿Qué haces tan seguido que podría volverse un arte?',
    },

    // ───────────── Montaigne · Ensayos (from Cotton) ─────────────
    'montaigne-1-19-everywhere': {
      text: 'Dónde nos espera la muerte es incierto; esperémosla en todas partes. Meditar la muerte es meditar la libertad; quien ha aprendido a morir ha desaprendido a servir.',
      question: '¿Qué dejarías de hacer si ya no tuvieras miedo?',
      action: 'decirle que no hoy a algo que solo haces por miedo.',
    },
    'montaigne-1-19-cabbages': {
      text: 'Quiero que uno esté siempre haciendo algo y que, en cuanto de él dependa, alargue y prolongue los oficios de la vida; y que la muerte me encuentre plantando mis coles, sin preocuparme de ella, y menos aún de que mi huerto no esté terminado.',
      question: '¿Cuáles son tus coles, esas cosas ordinarias que te gusta cuidar?',
      action: 'dedicar hoy un rato a algo que cuidas solo porque sí.',
    },
    'montaigne-1-19-use-of-time': {
      text: 'La utilidad de vivir no está en la duración de los días, sino en el uso del tiempo; alguien puede haber vivido mucho y, sin embargo, haber vivido poco. Aprovecha el tiempo mientras lo tienes.',
      question: '¿Cómo te gustaría usar hoy el tiempo que tienes?',
    },
    'montaigne-3-13-dance': {
      text: 'Cuando bailo, bailo; cuando duermo, duermo.',
      question: '¿Qué podrías hacer hoy sin tener nada más en la cabeza?',
    },
    'montaigne-3-13-lived': {
      text: 'Somos grandes tontos. “Ha pasado su vida en el ocio”, decimos; “hoy no he hecho nada”. ¿Cómo? ¿No has vivido? Esa no solo es la fundamental, sino la más ilustre de tus ocupaciones.',
      question: 'En un día en que “no hiciste nada”, ¿qué viviste?',
    },
    'montaigne-3-13-masterpiece': {
      text: 'La gloriosa obra maestra del hombre es vivir con propósito; todo lo demás, reinar, atesorar, construir, no son más que pequeños apéndices y apoyos.',
      question: '¿Qué significa para ti vivir con propósito esta semana?',
    },
    'montaigne-1-27-friend': {
      text: 'Si alguien me insistiera en que dijera por qué lo quería, siento que no podría expresarse de otro modo que respondiendo: porque era él, porque era yo.',
      question: '¿A quién quieres simplemente porque es quien es?',
      action: 'decirle a {person} que te alegra que esté en tu vida. No hace falta una razón.',
    },

    // ───────────── Boecio · La consolación de la filosofía (from James) ─────────────
    'boethius-2-p4-within': {
      text: '¿Por qué, entonces, hijos de la mortalidad, buscan fuera la felicidad que solo tiene su asiento dentro de ustedes?',
      question: '¿Qué felicidad llevas ya contigo?',
    },
    'boethius-2-p4-thinking': {
      text: 'Nada es desdichado si no lo piensas así y, al contrario, toda suerte es feliz si se lleva con ecuanimidad.',
      question: '¿Qué cosa difícil podrías cargar hoy con un poco más de ligereza?',
    },
    'boethius-2-p1-wheel': {
      text: '¡Cómo! ¿De veras intentas detener la rueda que gira? Si se quedara quieta, ya no sería la rueda de la Fortuna.',
      question: '¿Qué cambio estás tratando de detener?',
    },
    'boethius-1-p1-story': {
      text: 'Boecio había sido uno de los hombres más poderosos de Roma. Acusado de traición, estaba en una celda escribiendo versos tristes, esperando la muerte. Entonces, escribe, apareció sobre su cabeza una mujer: la Filosofía en persona, que venía a recordarle lo que nadie le podía quitar.',
      question: '¿Qué tienes que nadie te puede quitar?',
      action: 'anotar tres cosas que nadie te podría quitar nunca.',
    },
  },
};
