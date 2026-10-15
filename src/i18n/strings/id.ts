/** Bahasa Indonesia: "kamu", tenang dan hangat. */
import { b, s } from '@/i18n/rich';
import type { Strings } from '@/i18n/strings/en';
import type { Per } from '@/lib/loves';

type Unit = 'visits' | 'days' | 'times';

/** "a, b, dan c" */
const list = (xs: string[]) =>
  xs.length < 2 ? xs.join('') : xs.length === 2 ? `${xs[0]} dan ${xs[1]}` : `${xs.slice(0, -1).join(', ')}, dan ${xs.at(-1)}`;

const PER: Record<Per, string> = { day: 'sehari', week: 'seminggu', month: 'sebulan', year: 'setahun' };
const UNIT: Record<Unit, string> = { visits: 'kali bertemu', days: 'hari', times: 'kali' };

export const id: Strings = {
  common: {
    back: '← Kembali',
    close: 'Tutup',
    continue: 'Lanjut',
    skip: 'Lewati',
    skipForNow: 'Lewati dulu',
    save: 'Simpan',
    done: 'Selesai',
    add: 'Tambah',
    remove: 'Hapus',
    removeA11y: (name) => `Hapus ${name}`,
    less: 'Kurangi',
    more: 'Tambah',
    you: 'Kamu',
    source: 'Sumber',
    why: 'Mengapa',
    theScience: 'Kata sains',
    sourceA11y: (prefix, label) => `${prefix}: ${label}, terbuka di browser`,
    tickingSound: 'Suara detak',
    clockTicking: 'Detak jam',
    hoursValue: (h) => `${h} jam`,
    yrs: (signed) => `${signed} thn`,
    years: (y) => `${y} tahun`,
    notAdvice:
      'Perkiraan ini berasal dari rata-rata populasi dan rasio risiko umum. Ia menunjukkan arah dan perkiraan besarnya, bukan janji, dan bukan nasihat medis.',
    list,
  },

  tabs: { life: 'Hidup', habits: 'Kebiasaan', loves: 'Yang Dicinta', today: 'Hari Ini' },

  language: {
    heading: 'BAHASA',
    note: 'Mengikuti bahasa perangkatmu sampai kamu memilih.',
    a11y: 'Bahasa',
  },

  date: {
    months: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
    monthInitials: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    weekdayInitials: ['M', 'S', 'S', 'R', 'K', 'J', 'S'],
    weekdays: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    year: 'Tahun',
    month: 'Bulan',
    day: 'Hari',
    decade: (d) => `${d}-an`,
    hour: (h) => String(h),
  },

  habits: {
    smoke: {
      question: 'Apakah kamu merokok?',
      short: 'Merokok',
      why: 'Pengaruh terbesar di daftar ini.',
      options: { never: 'Tidak pernah', former: 'Sudah berhenti', current: 'Ya' },
    },
    exercise: {
      question: 'Seberapa sering kamu berolahraga?',
      short: 'Olahraga',
      why: 'Jalan cepat juga dihitung.',
      options: { none: 'Jarang', some: '1–2× seminggu', regular: '3+× seminggu' },
    },
    bmi: {
      question: 'Mana yang paling menggambarkan berat badanmu?',
      short: 'Berat badan',
      why: 'Rentang indeks massa tubuh. Perkiraan saja cukup.',
      options: { under: 'Kurus', normal: 'Sehat', over: 'Kelebihan berat', obese: 'Obesitas' },
    },
    alcohol: {
      question: 'Seberapa banyak kamu minum alkohol?',
      short: 'Alkohol',
      why: 'Banyak artinya sekitar 15 gelas atau lebih per minggu.',
      options: { none: 'Sedikit atau tidak sama sekali', moderate: 'Sedang', heavy: 'Banyak' },
    },
    sleep: {
      question: 'Berapa lama kamu tidur?',
      short: 'Tidur',
      why: 'Sebagian besar malam, bukan malam terbaikmu.',
      options: { short: 'Kurang dari 6 jam', ok: '6–9 jam' },
    },
    connection: {
      question: 'Seberapa sering kamu menghabiskan waktu dengan orang-orang terdekatmu?',
      short: 'Kedekatan',
      why: 'Bertemu langsung atau percakapan sungguhan. Hubungan dekat adalah salah satu prediktor terkuat umur panjang.',
      options: { often: 'Setiap minggu', sometimes: 'Beberapa kali sebulan', rarely: 'Jarang; aku sering merasa sendirian' },
    },
  },

  levers: {
    smoke: 'Berhenti merokok',
    exercise: 'Berolahraga 3+ kali seminggu',
    bmi: 'Mencapai berat badan sehat',
    alcohol: 'Mengurangi minum',
    sleep: 'Tidur 6–9 jam',
    connection: 'Bertemu orang-orang tercinta setiap minggu',
    steps: 'Berjalan 10.000 langkah sehari',
  },

  values: {
    family: 'Keluarga',
    partner: 'Pasanganku',
    friends: 'Teman',
    health: 'Kesehatan',
    craft: 'Pekerjaan dan keahlian',
    learning: 'Belajar',
    creating: 'Berkarya',
    faith: 'Iman dan spiritualitas',
    nature: 'Alam',
    adventure: 'Petualangan',
    service: 'Menolong sesama',
    peace: 'Ketenangan batin',
  },

  onboarding: {
    welcomeEyebrow: 'Ingatlah bahwa kamu akan mati',
    welcomeLede:
      'Kaum Stoa selalu mengingat kematian agar tidak menyia-nyiakan hari-hari mereka. Aplikasi ini menghitung waktu yang mungkin masih kamu punya, agar hari ini mendapat bobot yang layak, dan mengarahkannya pada apa yang kamu cintai.',
    welcomeNote: 'Beberapa pertanyaan singkat, satu per satu. Jawabanmu tetap di perangkat ini.',
    begin: 'Mulai',
    step: {
      you: 'Kamu',
      birth: 'Kelahiran',
      body: 'Tubuh',
      habits: 'Kebiasaan',
      time: 'Waktumu',
      values: 'Yang penting',
      who: 'Yang mencintaimu',
      what: 'Yang kamu cintai',
    },
    nameQuestion: 'Kami harus memanggilmu apa?',
    nameA11y: 'Nama depan',
    namePlaceholder: 'Nama depanmu',
    dobQuestion: 'Kapan kamu lahir?',
    sexQuestion: 'Apa jenis kelaminmu saat lahir?',
    sexWhy: 'Rata-rata, perempuan hidup sekitar lima tahun lebih lama daripada laki-laki.',
    sex: { m: 'Laki-laki', f: 'Perempuan' },
    phoneQuestion: 'Berapa jam sehari kamu memakai ponsel?',
    phoneWhereIos:
      'iPhone-mu sudah tahu: Pengaturan → Durasi Layar → Lihat Semua Aktivitas App & Situs Web. Pakai rata-rata hariannya.',
    phoneWhereAndroid: 'Ponselmu sudah tahu: Setelan → Digital Wellbeing. Pakai rata-rata hariannya.',
    phoneWhereWeb:
      'Ponselmu sudah tahu. iPhone: Pengaturan → Durasi Layar. Android: Setelan → Digital Wellbeing. Pakai rata-rata hariannya.',
    phoneA11y: 'Jam per hari di ponsel',
    phoneResult: (years, share) => [
      s('Selama waktu yang mungkin masih kamu punya, itu sekitar '),
      b(`${years} tahun`),
      s(`, ${share} dari jam-jam terjagamu.`),
    ],
    valuesQuestion: 'Apa yang paling penting bagimu?',
    valuesWhy: 'Pilih sampai tiga. Pengingatmu akan terus mengarahkanmu kembali ke sana.',
    peopleQuestion: 'Siapa yang mencintaimu, dan siapa yang kamu cintai?',
    peopleWhy:
      'Orang-orang (dan hewan peliharaan) yang paling akan kamu sesali jika jarang kamu temui. Kami akan menghitung berapa kali lagi kamu mungkin bertemu mereka.',
    activitiesQuestion: 'Apa yang suka kamu lakukan?',
    activitiesWhy: 'Kami akan menghitung berapa kali lagi kamu bisa melakukannya.',
    computing: 'Menghitung minggu-minggumu',
    computingNote: 'Mengubah jawabanmu menjadi waktu.',
  },

  reveal: {
    eyebrow: (name) => (name ? `${name}, waktumu` : 'Waktumu'),
    about: 'Sekitar',
    weeksRemain: 'minggu kemungkinan tersisa',
    fullLife: (total, lived) =>
      `Hidup utuh seperti milikmu sekitar ${total} minggu. Kamu sudah menjalani ${lived} di antaranya. Mari jadikan sisanya berarti.`,
    person: (n, label) => [s('Itu sekitar '), b(n), s(` ${label}.`)],
    phone: (years, swap) => [
      s('Ponselmu mengambil sekitar '),
      b(`${years} tahun`),
      s(` dari itu. Setengah jam lebih sedikit sehari bisa menjadi ${swap}.`),
    ],
    lever: (label, years, weekends) => [
      s(` ${label} bisa menambah sekitar `),
      b(`${years} tahun`),
      s(`, kira-kira ${weekends} akhir pekan lagi.`),
    ],
    values: (vals) =>
      `Kamu bilang ${list(vals.map((v) => v.toLowerCase()))} paling penting bagimu. Kami akan terus mengarahkanmu kembali ke sana.`,
    range: (med, q25, q75) =>
      `Ini rentang, bukan tanggal: separuh orang yang hidup sepertimu mencapai usia ${med}, dan kebanyakan berada di antara ${q25} dan ${q75}. Bukan nasihat medis.`,
    seeLife: 'Lihat hidupmu',
  },

  alive: {
    heading: 'Kamu sudah hidup selama',
    summary: (days, years) => `Kamu sudah hidup selama ${days} hari, sekitar ${years} tahun.`,
    units: {
      seconds: 'detik',
      minutes: 'menit',
      hours: 'jam',
      days: 'hari',
      weeks: 'minggu',
      months: 'bulan',
      years: 'tahun',
    },
  },

  life: {
    eyebrow: (name) => (name ? `${name}, hari ini` : 'Hari ini'),
    verdict: (age, med, left) => [
      s('Usiamu '),
      b(age),
      s('. Separuh orang yang hidup sepertimu mencapai usia '),
      b(String(med)),
      s('. Artinya masih sekitar '),
      b(`${left} tahun`),
      s('.'),
    ],
    range: (q25, q75, p80) => `Kemungkinan rentang ${q25}–${q75} · ${p80}% peluang mencapai 80`,
    timeLeft: 'Kemungkinan sisa waktu',
    clock: (y, d) => `${y}t ${d}h `,
    clockA11y: (y, d) => `Sekitar ${y} tahun dan ${d} hari`,
    zoomA11y: 'Perbesaran',
    zooms: { life: 'Hidup', weeks: 'Minggu', year: 'Tahun', today: 'Hari ini' },
    caption: {
      life: (year, pct, birthdays) => [
        s(`Tahun ke-${year} hidupmu sudah lewat `),
        b(pct),
        s('. Sekitar '),
        b(birthdays),
        s(' ulang tahun lagi kemungkinan masih ada.'),
      ],
      weeks: (week, pct, weeks) => [
        s(`Minggu ke-${week} hidupmu sudah lewat `),
        b(pct),
        s('. Sekitar '),
        b(weeks),
        s(' minggu kemungkinan tersisa.'),
      ],
      year: (year, pctYear, pctDay, days) => [
        s(`Tahun ${year} sudah lewat `),
        b(pctYear),
        s('. Hari ini sudah lewat '),
        b(pctDay),
        s('. Tersisa '),
        b(days),
        s(' hari tahun ini.'),
      ],
      today: (pct, hours) => [
        s('Jam ini sudah lewat '),
        b(pct),
        s('. Hari ini masih ada sekitar '),
        b(hours),
        s(' jam. Gunakan dengan sengaja.'),
      ],
    },
    legend: { lived: 'Sudah dijalani', now: 'Sekarang', likely: 'Kemungkinan di depan', reach: 'Dalam jangkauan', maybe: 'Jika nasib mengizinkan' },
    phoneTitle: 'Ponselmu',
    phoneLine: (hours, years, share) => [
      s(`${hours} jam sehari adalah sekitar `),
      b(`${years} tahun`),
      s(` dari waktu yang mungkin masih kamu punya: ${share} dari jam-jam terjagamu.`),
    ],
    phoneSwap: (swap) =>
      `Setengah jam lebih sedikit sehari bisa menjadi ${swap}. Dalam eksperimen, mengurangi media sosial berarti lebih banyak waktu bersama keluarga dan teman, dan lebih sedikit rasa kesepian.`,
    phoneAsk:
      'Berapa jam sehari kamu memakai ponsel? Pengaturan Durasi Layar atau Digital Wellbeing menunjukkan rata-rata hariannya.',
    habitsTitle: 'Kebiasaanmu',
    habitsNeutral: 'Kebiasaanmu membuatmu tetap dekat dengan perkiraan dasar.',
    habitsEffect: (adds, years) => [s(`Kebiasaanmu ${adds ? 'menambah' : 'mengurangi'} sekitar `), b(`${years} tahun`), s('.')],
    withinReach: 'Dalam jangkauan',
    moreWeekends: (n) => `sekitar ${n} akhir pekan lagi`,
    together: (several, gain, capped) => [
      s(several ? 'Bersama-sama, sekitar ' : 'Itu sekitar '),
      b(`${gain} tahun lagi`),
      s(`${capped ? ' (dibatasi: efek kebiasaan saling tumpang tindih)' : ''}. Itulah lingkaran perunggu di bawah.`),
    ],
    allGood: 'Kamu sudah melakukan hal-hal yang paling menambah waktu. Pertahankan, dan jaga orang-orang tercintamu tetap dekat.',
  },

  share: {
    half: 'sekitar setengah',
    third: 'sekitar sepertiga',
    quarter: 'sekitar seperempat',
    seventh: 'sekitar sepertujuh',
    pct: (p) => `${p}%`,
  },
  swap: {
    dog: (name, walks) => `jalan-jalan harian dengan ${name}: sekitar ${walks} kali jalan-jalan lagi`,
    dinners: (n, person) =>
      `sekitar ${n} makan malam dua jam setahun ${person ? `bersama ${person} atau teman` : 'bersama teman dan keluarga'}`,
  },

  habitsScreen: {
    eyebrow: 'Yang ada dalam kendalimu',
    title: 'Ubah satu kebiasaan, ubah hitungannya',
    median: 'usia median bagi orang yang hidup sepertimu. Ketuk satu pilihan untuk melihat apa yang berubah.',
    whatMatters: 'YANG PALING PENTING',
    ranked: 'Diurutkan menurut besar dan kuatnya bukti. Ketuk satu untuk melihat angka dan sumbernya.',
    exerciseReplaced: 'Digantikan oleh langkah harianmu di atas, agar tidak ada yang dihitung dua kali.',
    youNow: 'kamu sekarang',
    noChange: 'tidak berubah',
    stepsHeading: 'LANGKAH HARIAN',
    stepsA11y: 'Rata-rata langkah harian',
    stepsAnswer: (n) => `${n} langkah sehari`,
    math1: (n) => `1 · Rata-rata: ${n} langkah sehari`,
    math2: (hr) => `2 · Risiko dibanding 6.000 langkah: × ${hr}`,
    math3: (hr, b) => `3 · Tahun ≈ ln(1 ÷ ${hr}) ÷ ${b} = `,
    math4: '4 · Menggantikan jawaban olahragamu; manfaatnya mendatar di 10.000.',
    useExercise: 'Pakai jawaban olahragaku saja',
    stepsHint: 'Ketuk + atau − untuk memakai langkahmu sebagai ganti jawaban olahraga. Aplikasi kesehatan di ponselmu menunjukkan rata-ratamu.',
    inEstimate: 'Termasuk dalam perkiraanmu.',
    notInEstimate: 'Belum masuk perkiraanmu; ditampilkan sebagai arah.',
    howItWorks: 'CARA KERJA PERKIRAANMU',
    strength: { strong: 'kuat', moderate: 'sedang', emerging: 'baru' },
  },

  evidence: {
    smoking: {
      title: 'Tidak merokok',
      summary: 'Pengaruh tunggal terbesar. Berhenti di usia berapa pun membantu.',
      detail: 'Merokok kira-kira menggandakan risiko kematian tahunan (×2,2 di aplikasi ini). Setelah berhenti, turun mendekati ×1,3.',
    },
    moving: {
      title: 'Lebih banyak bergerak, tetap bugar',
      summary: 'Risiko terus turun sampai 8–10 ribu langkah sehari di bawah 60 tahun, 6–8 ribu di atas 60.',
      detail:
        'Di 15 kohort (47.471 orang dewasa), lebih banyak langkah harian berarti angka kematian lebih rendah hingga tingkat tersebut. Kebugaran kardio adalah salah satu prediktor terkuat untuk bertahan hidup, tanpa batas atas manfaat yang terlihat.',
    },
    relationships: {
      title: 'Hubungan dekat',
      summary: 'Isolasi dan kesepian dikaitkan dengan risiko meninggal dini sekitar 26–32% lebih tinggi, setara dengan merokok atau obesitas.',
      detail:
        'Di 70 studi (3,4 juta orang), isolasi sosial, kesepian, dan tinggal sendirian masing-masing menaikkan peluang kematian dini sekitar seperempat hingga sepertiga. Tinjauan sebelumnya atas 148 studi menemukan ikatan yang kuat berkaitan dengan peluang bertahan hidup sekitar 1,5×. Dalam studi Harvard selama 85 tahun, kepuasan dalam hubungan di usia 50 memprediksi kesehatan di usia 80 lebih baik daripada kolesterol.',
    },
    diet: {
      title: 'Apa yang kamu makan',
      summary: 'Lebih banyak kacang-kacangan, biji-bijian utuh, dan kacang; lebih sedikit daging merah dan olahan.',
      detail:
        'Beralih secara permanen dari pola makan Barat yang khas ke pola makan optimal dikaitkan dengan 10–13 tahun lebih lama jika dimulai di usia 20, sekitar 8 di usia 60, dan lebih dari 3 di usia 80. Ini studi pemodelan: rata-rata populasi, bukan ramalan pribadi.',
    },
    weight: {
      title: 'Berat badan dan tekanan darah sehat',
      summary: 'Keduanya mendorong penyakit jantung, penyebab kematian nomor satu.',
      detail:
        'Berat badan sehat adalah salah satu dari lima kebiasaan yang bersama-sama dikaitkan dengan 12–14 tahun lebih lama di usia 50, dan sekitar 8–11 tahun lebih lama bebas kanker, penyakit jantung, dan diabetes.',
    },
    strength: {
      title: 'Latihan kekuatan',
      summary: '30–60 menit seminggu dikaitkan dengan angka kematian 10–17% lebih rendah.',
      detail: 'Sebagai tambahan latihan aerobik, bukan penggantinya. Manfaat di atas sekitar satu jam seminggu belum jelas.',
    },
    purpose: {
      title: 'Rasa punya tujuan',
      summary: 'Dikaitkan dengan angka kematian sekitar 17% lebih rendah serta lebih sedikit serangan jantung dan stroke.',
      detail:
        'Di 10 studi (136.265 orang) di AS dan Jepang, tempat hal ini disebut ikigai: "hidup yang layak dijalani". Optimisme menunjukkan pola serupa.',
    },
    sleep: {
      title: 'Tidur 7–8 jam',
      summary: 'Tidur kurang dari sekitar 6 jam dikaitkan dengan angka kematian 12% lebih tinggi.',
      detail: 'Tidur yang sangat lama juga menunjukkan risiko lebih tinggi, tetapi itu lebih sering tanda penyakit daripada penyebabnya.',
    },
    alcohol: {
      title: 'Sedikit minum',
      summary: 'Minum sedikit tidak melindungi; risiko naik mulai sekitar 2 gelas sehari bagi perempuan, 3 bagi laki-laki.',
      detail:
        'Meta-analisis 107 kohort (4,8 juta orang) tidak menemukan angka kematian yang lebih rendah pada peminum ringan dibandingkan orang yang tidak pernah minum.',
    },
    helping: {
      title: 'Menolong sesama',
      summary: 'Menjadi relawan di usia lanjut dikaitkan dengan angka kematian 24% lebih rendah.',
      detail: 'Setelah disesuaikan dengan kesehatan, di 14 studi orang dewasa berusia 55 tahun ke atas.',
    },
    scrolling: {
      title: 'Kurangi scroll, perbanyak bertemu orang',
      summary: 'Dalam eksperimen, mengurangi media sosial berarti lebih banyak waktu bersama keluarga dan teman, dan lebih sedikit kesepian.',
      detail:
        'Menonaktifkan Facebook selama 4 minggu meningkatkan kesejahteraan dan waktu luring bersama teman dan keluarga. Membatasi media sosial sekitar 30 menit sehari selama 3 minggu menurunkan kesepian dan depresi.',
    },
  },

  howItWorks: [
    'Risiko kematian tahunan setiap orang naik seiring usia, kira-kira berlipat dua setiap 8 tahun. Kami mulai dari kurva itu untuk jenis kelaminmu, perkiraan dari tabel kehidupan AS.',
    'Kebiasaanmu mengalikan risiko itu: merokok ×2,2, olahraga 3+ kali seminggu ×0,85, tidur kurang dari 6 jam ×1,15, jarang bertemu orang terdekat ×1,29, dan seterusnya.',
    'Kami mengikuti risiko itu bulan demi bulan dari usiamu sekarang. Usia saat separuh orang sepertimu telah meninggal adalah median-mu; tanda 25% dan 75% memberi rentangmu.',
    'Aturan praktis: tahun ≈ ln(pengali risiko) ÷ 0,085. Karena itu risiko dua kali lipat mengurangi sekitar 8 tahun, dan berhenti merokok bisa mengembalikan sekitar 9.',
    'Beberapa perubahan sekaligus menambah lebih sedikit dari jumlah masing-masing, dan kami membatasi totalnya 14 tahun, selisih terbesar dari semua kebiasaan dalam sebuah studi besar di AS.',
    'Ini adalah keterkaitan dari studi populasi, bukan sebab-akibat, dan bukan nasihat medis.',
  ],

  loves: {
    per: PER,
    pace: (count, per) => `${count} kali ${PER[per]}`,
    reasonBoth: (pace) => `${pace}, selama tahun-tahun yang mungkin kalian berdua punya`,
    reasonUntil: (pace, age) => `${pace}, sampai kamu berusia ${age}`,
    reasonLife: (pace) => `${pace}, sepanjang sisa hidupmu`,
    moreWith: (unit, name) => `${UNIT[unit]} lagi dengan ${name}`,
    moreTimes: (activity) => `kali lagi: ${activity.toLowerCase()}`,
    aboutMore: (n, unit) => [s('sekitar '), b(n), s(` ${UNIT[unit]} lagi`)],
    since: {
      today: 'hari ini',
      yesterday: 'kemarin',
      days: (n) => `${n} hari lalu`,
      months: (n) => `${n} bulan lalu`,
    },
    suggestPeople: {
      mom: 'Ibu',
      dad: 'Ayah',
      friend: 'Sahabatku',
      grandma: 'Nenekku',
      dog: 'Anjingku',
      cat: 'Kucingku',
    },
    suggestActivities: {
      soccer: 'Main sepak bola',
      movies: 'Nonton di bioskop',
      read: 'Membaca buku',
      travel: 'Bepergian ke tempat baru',
      cook: 'Memasak untuk teman',
    },
    eyebrow: 'Yang kamu cintai',
    title: 'Berapa kali lagi?',
    sub: 'Dengan kebiasaanmu sekarang, selama hidup yang mungkin masih tersisa.',
    empty: 'Belum ada apa-apa. Tambahkan seseorang yang mencintaimu, atau sesuatu yang suka kamu lakukan.',
    addHeading: 'TAMBAH',
    addToA11y: 'Tambah ke',
    groups: { who: 'Yang mencintaimu', what: 'Yang kamu cintai' },
    cardA11y: (n, label, reason) => `Sekitar ${n} ${label}. ${reason}.`,
    kinds: { person: 'Orang', pet: 'Hewan peliharaan' },
    species: { dog: 'Anjing', cat: 'Kucing' },
    personOrPet: 'Orang atau hewan peliharaan',
    kindOfPet: 'Jenis hewan',
    useSuggestion: (name) => `Pakai saran: ${name}`,
    whoA11y: 'Siapa',
    whatA11y: 'Apa',
    petPlaceholder: 'Max, Luna…',
    personPlaceholder: 'Ibu, pasanganku, Budi…',
    activityPlaceholder: 'Main bola, membaca, jalan-jalan…',
    howOftenSee: 'Seberapa sering kamu bertemu mereka',
    howOftenDo: 'Seberapa sering kamu melakukannya',
    fewer: 'Kurangi',
    times: () => 'kali',
    perA11y: 'Per',
    theirAge: 'Usia mereka (opsional)',
    petAge: 'Usianya dalam tahun (opsional)',
    untilAge: 'Sampai usia berapa? (opsional)',
    phoneA11y: 'Telepon (opsional)',
    phonePlaceholder: 'Telepon (opsional, untuk Telepon dan Pesan)',
  },

  reach: {
    lastTime: (since) => `Terakhir kali kalian bicara atau bertemu: ${since}.`,
    hint: 'Ketuk "Kami sudah bicara" setelah menelepon atau berkunjung, agar tercatat.',
    claim: 'Orang lebih menghargai dihubungi daripada yang kita kira, apalagi setelah lama tidak bertemu.',
    message: 'Pesan',
    call: 'Telepon',
    weTalked: 'Kami sudah bicara',
    logged: 'Tercatat ✓',
    logA11y: (name) => `Catat bahwa kamu bicara dengan ${name} hari ini`,
    openers: [
      'Lagi kepikiran kamu. Ada waktu makan malam minggu ini?',
      'Hai! Sudah lama banget. Teleponan akhir pekan ini?',
      'Cuma mau bilang aku sayang kamu.',
      'Tadi ingat hal lucu tentang kita. Kapan kita ketemu?',
      'Jangan sampai sebulan lagi lewat begitu saja. Ngopi segera?',
    ],
  },

  today: {
    reachOut: 'Hubungi seseorang hari ini',
    moreVisits: (n) => [s('Sekitar '), b(n), s(' kali bertemu lagi dengan kebiasaanmu sekarang. Mengirim pesan cuma butuh semenit.')],
    isolation:
      'Orang yang tetap dekat dengan sesama hidup lebih lama: isolasi dan kesepian dikaitkan dengan risiko meninggal dini sekitar 26–32% lebih tinggi.',
    connectionLever: (years) => `Bagimu, bertemu orang-orang tercinta setiap minggu bisa menambah sekitar ${years} tahun.`,
    connectionOften: 'Bertemu orang setiap minggu sudah termasuk dalam perkiraanmu. Pertahankan.',
    noPerson: 'Hubungan dekat adalah salah satu prediktor terkuat hidup yang panjang dan sehat. Siapa yang ingin lebih sering kamu temui?',
    addSomeone: 'Tambahkan seseorang yang mencintaimu',
    noneLogged: 'Belum ada telepon atau kunjungan yang tercatat dalam 30 hari terakhir.',
    peopleThisMonth: (n) => `Dalam 30 hari terakhir kamu bicara atau bertemu dengan ${n} orang yang kamu cintai.`,
  },

  daily: {
    quotes: [
      ['Jangan bertindak seolah-olah kamu punya sepuluh ribu tahun untuk hidup. Selagi hidup, selagi masih mampu, jadilah baik.', 'Marcus Aurelius · Meditations IV.17'],
      ['Selagi kita menunda-nunda, hidup melesat pergi.', 'Seneca · Surat 1'],
      ['Anggaplah dirimu sudah mati. Kamu sudah menjalani hidupmu. Sekarang ambil yang tersisa dan jalanilah dengan baik.', 'Marcus Aurelius · Meditations VII.56'],
      ['Mari siapkan batin seolah kita telah tiba di ujung hidup. Jangan menunda apa pun.', 'Seneca · Surat 101'],
      ['Bukan karena hidup kita singkat, melainkan karena kita menyia-nyiakan banyak darinya.', 'Seneca · Tentang Singkatnya Hidup'],
      ['Hadirkan kematian di depan matamu setiap hari, dan kamu tak akan pernah punya pikiran yang hina.', 'Epiktetos · Enchiridion 21'],
      ['Setiap orang hanya hidup di saat ini. Selebihnya sudah berlalu atau belum pasti.', 'Marcus Aurelius · Meditations III.10'],
      ['Mulailah hidup sekarang juga, dan hitunglah setiap hari sebagai satu kehidupan tersendiri.', 'Seneca · Surat 101'],
      ['Kamu bisa meninggalkan hidup saat ini juga. Biarlah itu menentukan apa yang kamu lakukan, katakan, dan pikirkan.', 'Marcus Aurelius · Meditations II.11'],
      ['Tak seorang pun bebas jika ia tidak menguasai dirinya sendiri.', 'Epiktetos · Fragmen'],
    ],
    questions: [
      'Apa yang akan membuat hari ini berarti?',
      'Siapa yang layak mendapat perhatian penuhmu hari ini?',
      'Apa yang kamu tunda yang akan kamu sesali jika tak pernah dilakukan?',
      'Apa yang ada dalam kendalimu hari ini, dan apa yang tidak?',
      'Jika ini hari {day} biasa terakhirmu, apa yang akan kamu biarkan tetap sama?',
      'Apa yang akan kamu lakukan hari ini jika kamu tidak takut?',
      'Apa yang bisa kamu lepaskan hari ini?',
      'Kamu ingin dikenang karena apa, dan apakah hari ini membawamu lebih dekat ke sana?',
    ],
    loveSub: (pace) => `${pace[0].toUpperCase()}${pace.slice(1)}, selama waktu yang mungkin kamu punya.`,
    weekends: { what: 'akhir pekan lagi', sub: 'Masing-masing adalah Sabtu dan Minggu yang bisa kamu jalani dengan sengaja.' },
    summers: { what: 'musim liburan lagi', sub: 'Sore yang panjang. Malam yang hangat. Tidak tak terbatas.' },
    moons: { what: 'purnama lagi', sub: 'Keluarlah untuk melihat yang berikutnya.' },
    lived: { what: 'akhir pekan sudah dijalani', sub: 'Sebagian di antaranya indah. Syukuri itu, dan beri ruang untuk lebih banyak lagi.' },
  },

  opening: {
    lookBack: 'Menengok ke belakang',
    todaysCount: 'Hitungan hari ini',
    today: 'Hari ini',
    agency: (label, years, more, what) => [
      s(`${label} bisa menambah sekitar `),
      b(`${years} tahun`),
      s('. Itu sekitar '),
      b(more),
      s(` ${what}.`),
    ],
    tapToSee: 'Ketuk untuk melihat hidupmu',
    cardOf: (i, n) => `Kartu ${i} dari ${n}`,
    seeLife: 'Lihat hidupmu',
    next: 'Berikutnya',
  },

  account: {
    title: 'Kamu',
    edit: 'Ubah jawabanmu',
    dataHeading: 'DATAMU',
    dataBody:
      'Semua yang kamu masukkan tetap di perangkat ini. Tidak ada akun, iklan, atau pelacakan. Perkiraanmu dihitung di sini, di ponsel atau browser-mu.',
    guestNote: (guest) =>
      `Kamu juga punya ${guest ? 'akun tamu' : 'akun yang sudah masuk'} dari uji coba sebelumnya. Isinya hanya profil kosong; menghapus di bawah akan mengeluarkannya.`,
    confirm: 'Ini menghapus jawabanmu, orang dan hal yang kamu cintai, dan semua hal lain di perangkat ini. Tidak bisa dibatalkan.',
    yesDelete: 'Ya, hapus semuanya',
    keep: 'Simpan dataku',
    deleteAll: 'Hapus semua di perangkat ini',
    signOutFailed: 'Tidak bisa keluar.',
    disclaimer:
      'Perkiraan ini berasal dari studi populasi. Ia menunjukkan arah dan perkiraan besarnya, bukan janji, dan bukan nasihat medis.',
  },
};
