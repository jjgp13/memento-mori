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
    lifeTables: 'Tabel kehidupan',
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
    weekdaysShort: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
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
    strength: {
      question: 'Apakah kamu latihan kekuatan?',
      short: 'Kekuatan',
      why: 'Beban, karet elastis, atau berat badan sendiri: squat, push-up, membawa tas berat. Ini menjagamu tetap kuat dan stabil nanti.',
      options: { none: 'Jarang atau tidak pernah', some: 'Sekitar seminggu sekali', regular: 'Dua kali seminggu atau lebih' },
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
    strength: 'Latihan kekuatan dua kali seminggu',
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
      place: 'Tempat',
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
    countryQuestion: 'Kamu tinggal di mana?',
    countryWhy:
      'Tempat tinggal memengaruhi berapa lama orang hidup, bisa berbeda 30 tahun atau lebih antarnegara. Kami mulai dari tabel kehidupan negaramu.',
    countrySearch: 'Cari negara',
    countrySearchAgain: 'Di tempat lain? Cari',
    countryNone: 'Tidak ada negara dengan nama itu di tabel PBB.',
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
    range: (med, q25, q75, country) =>
      `Ini rentang, bukan tanggal: separuh orang yang hidup sepertimu${country ? ` di ${country}` : ''} mencapai usia ${med}, dan kebanyakan berada di antara ${q25} dan ${q75}. Bukan nasihat medis.`,
    seeLife: 'Lihat hidupmu',
    healthy: (weeks, lever, years) => [
      s('Sekitar '),
      b(weeks),
      s(' dari minggu-minggu itu kemungkinan dijalani dengan sehat: kuat dan mandiri.'),
      ...(lever ? [s(` ${lever} bisa menambah sekitar `), b(`${years} tahun`), s(' di antaranya.')] : []),
    ],
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
    eyebrow: (name) => (name ? `${name} · kemungkinan sisa waktu` : 'Kemungkinan sisa waktu'),
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
      layers: (unit, sleep, phone, free) => [
        s(' Jika dijumlahkan, sekitar '),
        b(sleep),
        s(` dari ${unit === 'years' ? 'tahun-tahun' : 'minggu-minggu'} itu adalah tidur (waktu yang terpakai dengan baik)`),
        ...(phone ? [s(' dan '), b(phone), s(' di ponsel')] : []),
        s(', menyisakan sekitar '),
        b(free),
        s(phone ? ' saat terjaga dan jauh dari ponsel.' : ' saat terjaga.'),
      ],
      health: (unit, med, lo, hi) => [
        s(' Sekitar '),
        b(med),
        s(` di antaranya kemungkinan dijalani dengan sehat, kuat dan mandiri: pita hijau, yang memudar di tempat orang berbeda-beda (bagi kebanyakan orang sepertimu, ${lo}–${hi} ${unit === 'years' ? 'tahun' : 'minggu'}).`),
      ],
    },
    legend: {
      lived: 'Sudah dijalani',
      now: 'Sekarang',
      likely: 'Kemungkinan di depan',
      reach: 'Dalam jangkauan',
      maybe: 'Jika nasib mengizinkan',
      asleep: 'Tidur',
      phone: 'Di ponsel',
      healthy: 'Kemungkinan sehat',
    },
    shows: { all: 'Semua', awake: 'Terjaga', free: 'Tanpa ponsel' },
    showA11y: 'Tampilkan waktu ke depan',
    whatIf: 'Bagaimana jika… ketuk untuk mencoba',
    whatIfA11y: (label, years, healthy) => `Bagaimana jika: ${label}, sekitar ${years} tahun, ${healthy} lebih banyak dalam keadaan sehat`,
    whatIfYears: (years) => `+${years} thn`,
    weeksAhead: 'Minggu-minggumu ke depan',
    weeksUnit: 'minggu',
    bar: { free: 'terjaga, tanpa ponsel', phone: 'di ponsel', sleep: 'tidur' },
    barLever: (label) => label.toLowerCase(),
    triedTotal: (several, weeks, years, capped) => [
      s(several ? 'Bersama-sama, sekitar ' : 'Sekitar '),
      b(`${weeks} minggu lagi`),
      s(` (${years} tahun)`),
      s(several ? `: kurang dari jumlahnya, karena efek kebiasaan saling tumpang tindih${capped ? ', dan dibatasi' : ''}.` : '.'),
    ],
    triedOne: (label, years, healthy) => `${label}: sekitar ${years} tahun sendiri, ${healthy} dalam keadaan sehat`,
    triedHealthy: (years) => [s(' Pita hijau bertambah sekitar '), b(`${years} tahun dalam keadaan sehat`), s('.')],
    tapWhatIf: 'Ketuk “Bagaimana jika” di kalender untuk melihat apa yang bisa ditambahkan sebuah perubahan.',
    makePlan: 'Buat rencana kecil',
    makePlanA11y: (label) => `Buat rencana kecil untuk: ${label}`,
    onePlanAtATime: (sentence) => `Satu rencana kecil dalam satu waktu: ini akan menggantikan “${sentence}”`,
    tablesFor: (country) => `Berawal dari tabel kehidupan ${country}.`,
    tablesUS: 'Berawal dari perkiraan tabel kehidupan AS.',
    changeCountry: 'Ganti negara',
    setCountry: 'Pilih negaramu',
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
      s(`${capped ? ' (dibatasi: efek kebiasaan saling tumpang tindih)' : ''}. Coba di kalender dengan “Bagaimana jika”.`),
    ],
    allGood: 'Kamu sudah melakukan hal-hal yang paling menambah waktu. Pertahankan, dan jaga orang-orang tercintamu tetap dekat.',
    healthy: {
      eyebrow: 'Kuat dan mandiri',
      years: (med, lo, hi) => [
        s('Sekitar '),
        b(`${med} dari tahun-tahun itu`),
        s(` kemungkinan dijalani dengan sehat: kuat, stabil, dan mengurus diri sendiri. Bagi kebanyakan orang sepertimu, ${lo}–${hi}.`),
      ],
      later:
        'Tahun-tahun kemudian sering membawa lebih banyak pegal dan penyakit, dan sedikit lebih bergantung pada orang di sekitarmu. Berapa banyak, dan seberapa cepat, sebagian ada di tanganmu.',
      lever: (label, years, why) => [
        s(`${label} bisa menambah sekitar `),
        b(`${years} di antaranya`),
        s(why === 'strength' ? ': kaki lebih kuat, keseimbangan lebih baik, lebih jarang jatuh.' : why === 'more' ? ', lebih banyak daripada yang ditambahkannya pada usiamu.' : '.'),
      ],
      allGood: 'Kamu sudah melakukan hal-hal yang paling lama menjaga orang tetap kuat. Pertahankan, dan jaga orang-orangmu tetap dekat.',
      askStrength: 'Apakah kamu latihan kekuatan? Tambahkan jawabanmu',
      sourceHealthy: 'Tahun sehat',
      sourceHabits: 'Kebiasaan',
    },
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
    median: (country) =>
      `usia median bagi orang yang hidup sepertimu${country ? ` di ${country}` : ''}. Ketuk satu pilihan untuk melihat apa yang berubah.`,
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
    healthspan: 'TETAP KUAT DAN MANDIRI',
    healthspanNote: 'Yang menjaga tahun-tahun akhir tetap sehat: pita hijau di kalender Hidup-mu. Ketuk salah satu untuk melihat angka dan sumbernya.',
    strengthNote: (years) =>
      `Efek terbesarnya adalah menjagamu tetap kuat dan mandiri: dua kali seminggu bisa menambah sekitar ${years} tahun dalam keadaan sehat.`,
    strengthKeep: 'Dua kali seminggu menjagamu lebih kuat dan stabil lebih lama. Pertahankan.',
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
      summary: '30–60 menit seminggu dikaitkan dengan kematian 10–17% lebih rendah, dan tetap kuat dan mandiri lebih lama.',
      detail:
        'Sebagai tambahan latihan aerobik, bukan penggantinya; manfaat di atas sekitar satu jam seminggu belum jelas. Efek terbesarnya pada tahun-tahun akhir: latihan kekuatan dan keseimbangan berarti lebih jarang jatuh dan lebih sedikit disabilitas (lihat "Tetap kuat dan mandiri"). Di aplikasi ini, dua kali seminggu dihitung ×0,85 pada risiko kematian dan ×0,82 pada risiko kehilangan kesehatan yang baik.',
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
    healthyHabits: {
      title: 'Kebiasaan sehat menambah tahun sehat',
      summary: 'Di usia 50, 4–5 kebiasaan sehat disertai sekitar 10,7 (perempuan) dan 7,6 (laki-laki) tahun lebih bebas kanker, penyakit jantung, dan diabetes.',
      detail:
        'Di dua kohort besar Harvard, total tahun naik hampir sama (+9,4 perempuan, +8,1 laki-laki): hampir semua waktu tambahan adalah waktu sehat, dan tahun-tahun dengan penyakit hampir tidak berubah. Kebiasaannya: tidak merokok, berat badan sehat, 30+ menit aktivitas sehari, sedikit atau tanpa alkohol, pola makan baik. Aplikasi ini menggeser tahun sehatmu sesuai kebiasaanmu.',
    },
    falls: {
      title: 'Olahraga mencegah jatuh',
      summary: 'Olahraga mengurangi jatuh pada lansia sebesar 23%; program dengan kekuatan dan keseimbangan sekitar sepertiga.',
      detail:
        'Tinjauan Cochrane atas 108 uji (23.407 orang di atas 60 yang tinggal di rumah). Rasio laju keseluruhan 0,77 (bukti kepastian tinggi); latihan keseimbangan dan fungsional 0,76; beberapa jenis sekaligus, biasanya keseimbangan plus kekuatan, 0,66 (kepastian sedang).',
    },
    mobility: {
      title: 'Tetap bisa berjalan sendiri',
      summary: 'Dalam uji pada 1.635 orang berusia 70–89, berjalan disertai latihan kekuatan dan keseimbangan mengurangi disabilitas mobilitas berat sebesar 18%.',
      detail:
        'Uji LIFE: program sedang yang terstruktur (jalan kaki, kekuatan, kelenturan, keseimbangan) dibanding edukasi kesehatan, selama 2,6 tahun. Kehilangan kemampuan berjalan 400 m: 30,1% vs 35,5% (HR 0,82). Satu uji besar atas program gabungan, jadi porsi dari kekuatan saja tidak diketahui. Aplikasi ini memakai 0,82 untuk latihan kekuatan dua kali seminggu.',
    },
    grip: {
      title: 'Kekuatan genggaman',
      summary: 'Orang di atas 60 dengan genggaman lemah sekitar 1,8× lebih mungkin kehilangan fungsi, dan meninggal, selama pemantauan.',
      detail:
        'Meta-analisis 34 studi pada orang berusia 60 ke atas yang tinggal di rumah: rasio gabungan 1,78 untuk penurunan fungsi fisik dan 1,79 untuk kematian, genggaman lemah vs kuat. Genggaman adalah penanda kekuatan keseluruhan; ini observasional, jadi lebih menunjukkan siapa yang berisiko daripada apa yang harus dilakukan, tetapi kekuatan dijaga dengan berlatih.',
    },
  },

  howItWorks: [
    'Risiko kematian tahunan setiap orang naik seiring usia, kira-kira berlipat dua setiap 7 tahun. Kami mulai dari kurva itu untuk jenis kelaminmu di negaramu, disesuaikan dengan tabel kehidupan PBB (World Population Prospects 2024, kematian 2023). Tanpa negara, kami memakai perkiraan tabel AS.',
    'Kebiasaanmu mengalikan risiko itu: merokok ×2,2, olahraga 3+ kali seminggu ×0,85, tidur kurang dari 6 jam ×1,15, jarang bertemu orang terdekat ×1,29, dan seterusnya.',
    'Kami mengikuti risiko itu bulan demi bulan dari usiamu sekarang. Usia saat separuh orang sepertimu telah meninggal adalah median-mu; tanda 25% dan 75% memberi rentangmu.',
    'Aturan praktis: tahun ≈ ln(pengali risiko) ÷ 0,085. Karena itu risiko dua kali lipat mengurangi sekitar 8 tahun, dan berhenti merokok bisa mengembalikan sekitar 9.',
    'Beberapa perubahan sekaligus menambah lebih sedikit dari jumlah masing-masing, dan kami membatasi totalnya 14 tahun, selisih terbesar dari semua kebiasaan dalam sebuah studi besar di AS.',
    'Tahun sehat berangkat dari harapan hidup sehat negaramu (WHO, 2023): bagian dari tahun-tahun ke depan yang dijalani orang seusiamu dalam keadaan sehat. Waktu yang kurang sehat kami kumpulkan di akhir, tempat sebagian besarnya jatuh, sehingga tampak sebagai pita yang memudar, bukan tanggal.',
    'Kebiasaan menggeser tahun sehat hampir sebesar total tahun, seperti dalam sebuah studi besar Harvard, dan latihan kekuatan lebih lagi: menjaga orang tetap kuat, stabil, dan mandiri. Batas 14 tahun yang sama berlaku.',
    'Ini adalah keterkaitan dari studi populasi, bukan sebab-akibat, dan bukan nasihat medis.',
  ],

  claims: {
    lifeTables: 'Tabel kehidupan untuk 237 negara dan wilayah, menurut jenis kelamin, perkiraan 2023.',
    plans: 'Menentukan kapan dan di mana kamu akan melakukan sesuatu, dalam bentuk “jika… maka…”, membuatnya jauh lebih mungkin terlaksana (94 studi).',
    freshStart: 'Orang lebih mungkin memulai tujuan di awal minggu, awal bulan, atau saat ulang tahun: awal yang baru.',
    comingBack:
      'Dalam uji coba dorongan olahraga terbesar (61.293 orang), yang paling membantu adalah memberi penghargaan saat kembali setelah melewatkan latihan.',
    personalNumbers:
      'Melihat angkamu sendiri bisa membantu: perokok yang diberi tahu “usia paru-paru” mereka sekitar dua kali lebih mungkin berhenti dalam setahun (13,6% vs 6,4%).',
    walkAfterMeals: 'Berjalan ringan beberapa menit setelah makan menurunkan gula darah sekitar 17% dibanding duduk.',
  },

  plans: {
    everyDay: 'Setiap hari',
    weekdays: 'Hari kerja',
    weekends: 'Akhir pekan',
    days: (days) => {
      const names = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const short = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
      if (days.length === 1) return `Setiap ${names[days[0]]}`;
      if (days.length === 2) return `Setiap ${names[days[0]]} dan ${names[days[1]]}`;
      return `Setiap ${list(days.map((d) => short[d]))}`;
    },
    time: (h, m) => `${String(h).padStart(2, '0')}.${String(m).padStart(2, '0')}`,
    cue: (days, anchor, time) => `${days} ${anchor ?? `pukul ${time}`}`,
    sentence: (cue, action) => `${cue}, aku akan ${action}.`,
    nameInSentence: (name) => name,
    today: 'hari ini',
    tomorrow: 'besok',
    anchors: {
      breakfast: 'setelah sarapan',
      lunch: 'setelah makan siang',
      work: 'sepulang kerja',
      dinner: 'setelah makan malam',
      morning: 'pagi hari',
      cigarette: 'saat ingin merokok',
      atLunch: 'saat makan siang',
      coffee: 'setelah kopi pagiku',
    },
    call: (name) => `menelepon ${name}`,
    messageOrCall: (name) => `mengirim pesan atau menelepon ${name}`,
    actions: {
      walk: 'jalan kaki 10 menit',
      connect: 'menelepon atau menemui orang yang kucintai',
      bed: 'menyingkirkan ponsel dan bersiap tidur',
      smoke: 'jalan kaki 5 menit dulu',
      drink: 'minum segelas air soda dulu',
      plate: 'mengisi setengah piring dengan sayuran',
      strength: 'melakukan 10 menit squat, push-up, dan mengangkat beban',
    },
    withAnchor: (action, anchor) => `${action} ${anchor}`,
    capitalize: (s) => s.charAt(0).toUpperCase() + s.slice(1),
    periodWeek: 'minggu ini',
    periodBirthday: 'tahun barumu',
    calendarNote: 'Terlewat sekali tidak apa-apa: lanjutkan saja lain kali. Dari Memento Mori.',
    when: 'KAPAN',
    daysA11y: 'Hari',
    atSetTime: 'pada jam tertentu',
    anchorPlaceholder: 'atau dengan kata-katamu: saat aku sampai di rumah',
    anchorA11y: 'Momen yang mengingatkanmu, dengan kata-katamu',
    around: 'Sekitar (untuk pengingat)',
    at: 'Pukul',
    timeA11y: 'Waktu',
    iWill: 'AKU AKAN',
    actionPlaceholder: 'menelepon Ibu',
    actionA11y: 'Apa yang akan kamu lakukan',
    save: 'Simpan rencana',
    cancel: 'Batal',
    planReachOut: 'Rencanakan kapan menghubungi',
    planReachOutA11y: (name) => `Rencanakan kapan menghubungi ${name}`,
    yourPlan: 'Rencanamu',
    edit: 'Ubah',
    removeA11y: 'Hapus rencana ini',
    addToCalendar: 'Tambahkan ke kalenderku',
    calendarSaved: 'Tersimpan: buka untuk menambahkan ✓',
    addToCalendarA11y: (title) => `Tambahkan "${title}" ke kalendermu sebagai acara berulang`,
  },

  thisWeek: {
    heading: 'Minggu ini',
    doneToday: 'selesai hari ini ✓',
    doneThisWeek: 'selesai minggu ini ✓',
    next: (when) => `berikutnya: ${when}`,
    welcomeBack: (name) =>
      `Selamat datang kembali${name ? `, ${name}` : ''}. Rencana bisa terlewat bagi siapa saja, dan itu tidak apa-apa: yang penting memulainya lagi. Minggu ini adalah halaman baru.`,
    oneThingFor: (period) => `Satu hal untuk ${period}`,
    doneMark: ' · selesai ✓',
    did: 'Selesai',
    didToday: 'Selesai hari ini ✓',
    moreVisits: (n, name) => `Sekitar ${n} kali bertemu lagi dengan ${name} dengan kebiasaanmu sekarang.`,
    smallStep: (label, years) => `${label} bisa menambah sekitar ${years} tahun. Ini langkah kecil ke arah itu.`,
    noPlans:
      'Belum ada rencana. Rencana adalah “kapan, lalu apa” yang kecil: “Setiap Minggu setelah makan siang, aku akan menelepon Ibu.” Kamu bisa membuatnya untuk siapa saja di Yang Dicinta, atau untuk kebiasaan di Hidup.',
    suggestHeading: 'Rencana yang bisa kamu coba',
    suggestPerson: (n, name) =>
      `Sekitar ${n} kali bertemu lagi dengan ${name} dengan kebiasaanmu sekarang. Rencana membuat pertemuan berikutnya lebih mungkin.`,
    suggestLever: (label, years) => `${label} bisa menambah sekitar ${years} tahun. Rencana kecil adalah cara untuk memulai.`,
    whyPlans: 'Mengapa rencana membantu',
    makeItMine: 'Jadikan rencanaku',
    changeIt: 'Ubah',
    notNow: 'Nanti saja',
  },

  freshStart: {
    eyebrow: { week: 'Senin · awal yang baru', month: 'Tanggal 1 · awal yang baru', birthday: 'Ulang tahunmu · awal yang baru' },
    title: (period) => `Satu hal untuk ${period}?`,
    birthday: (name, weeks) =>
      `Selamat ulang tahun${name ? `, ${name}` : ''}. Kamu sudah hidup sekitar ${weeks} minggu, sebagian di antaranya indah. Apa satu hal yang bisa kamu lakukan di tahun yang akan datang?`,
    prompt: (week, month) =>
      `Apa satu hal yang bisa kamu lakukan ${week ? 'minggu ini' : `di bulan ${month}`} yang akan membuatmu senang telah melakukannya?`,
    callIdea: (name) => `Menelepon ${name}`,
    gratitudeIdea: 'Menulis untuk seseorang yang kusyukuri',
    useIdea: (idea) => `Pakai ide: ${idea}`,
    ownPlaceholder: 'atau idemu sendiri',
    a11y: (period) => `Satu hal untuk ${period}`,
    choose: 'Jadikan satu hal milikku',
    notToday: 'Tidak hari ini',
  },

  todaysCount: {
    pet: 'Jalan-jalan atau waktu tenang bersama hari ini?',
    activity: 'Bisakah kamu memilih hari untuk berikutnya? Menentukan kapan membuatnya lebih mungkin terjadi.',
    agency: (label, years, more, what) => [
      s(`${label} bisa menambah sekitar `),
      b(`${years} tahun`),
      s(': sekitar '),
      b(more),
      s(` ${what}. Kamu bisa mencobanya di kalender Hidup.`),
    ],
  },

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

  gentle: {
    setting: 'Sembunyikan angka',
    settingNote:
      'Kata-kata sebagai ganti tahun, minggu, dan hitungan di Hidup, Yang Dicinta, Hari Ini, dan pembuka. Kalendernya tetap, tanpa angka.',
    ahead: {
      most: 'Sebagian besar hidupmu masih di depan.',
      plenty: 'Kemungkinan masih banyak tahun baik di depan.',
      some: 'Masih ada tahun-tahun baik di depan. Gunakan untuk yang kamu cintai.',
      gift: 'Setiap hari mulai sekarang adalah hadiah. Gunakan untuk yang kamu cintai.',
    },
    caption: {
      life: 'Tahun hidupmu ini sedang berjalan. ',
      weeks: 'Minggu hidupmu ini sedang berjalan. ',
      year: {
        early: 'Sebagian besar tahun ini masih di depan.',
        middle: 'Tahun ini sudah jauh berjalan. Masih ada waktu baik di dalamnya.',
        late: 'Tahun ini hampir selesai. Buat minggu-minggu terakhirnya berarti.',
      },
      today: {
        early: 'Sebagian besar hari ini masih di depan. Jalani dengan sengaja.',
        middle: 'Hari ini sudah jauh berjalan. Jalani sisanya dengan sengaja.',
        late: 'Hari ini hampir selesai. Jalani sisanya dengan sengaja.',
      },
      layers: (phone) =>
        phone
          ? ' Sebagian adalah tidur (waktu yang dipakai dengan baik) dan sebagian di ponsel; sisanya terjaga dan jauh dari ponsel.'
          : ' Sebagian adalah tidur, waktu yang dipakai dengan baik; sisanya terjaga.',
      health: ' Banyak di antaranya kemungkinan dijalani dengan kuat dan mandiri: pita hijau, yang memudar di bagian orang-orang berbeda.',
    },
    range:
      'Sebuah rentang, bukan tanggal: lingkaran penuh kemungkinan besar, cincin jika keberuntungan mengizinkan, dan kebiasaan bisa menggesernya.',
    whatIfA11y: (label) => `Bagaimana jika: ${label}, bisa menambah waktu`,
    triedTotal: (several) =>
      several
        ? 'Bersama-sama bisa menambah waktu yang baik: kurang dari jumlahnya, karena efek kebiasaan saling tumpang tindih.'
        : 'Ini bisa menambah waktu yang baik.',
    phoneLine: (share) => `Ponselmu memakan ${share} jam terjagamu.`,
    phoneSwap:
      'Setengah jam lebih sedikit sehari bisa menjadi lebih banyak waktu dengan orang-orang yang kamu cintai. Dalam eksperimen, mengurangi media sosial berarti lebih banyak waktu dengan keluarga dan teman serta lebih sedikit kesepian.',
    habitsEffect: (adds) => (adds ? 'Kebiasaanmu menambah waktu pada perkiraanmu.' : 'Kebiasaanmu mengurangi sedikit waktu dari perkiraanmu.'),
    adds: 'menambah waktu',
    costs: 'mengurangi waktu',
    couldAdd: 'bisa menambah waktu yang baik',
    together: (several) =>
      several
        ? 'Bersama-sama bisa menambah tahun-tahun baik. Coba di kalender dengan Bagaimana jika.'
        : 'Coba di kalender dengan Bagaimana jika.',
    howMany: {
      few: 'Beberapa kali lagi, lebih dari yang kamu kira.',
      many: 'Masih banyak kali lagi, jika kamu memberi ruang.',
    },
    pace: 'Dengan ritme sekarang.',
    loveSub: 'Dengan ritme sekarang, selama waktu yang kemungkinan kamu punya.',
    agency: (label) => `${label} bisa menambah lebih banyak lagi. Kamu bisa mencobanya di kalender Hidup.`,
    moreVisits: (name) => `Lebih banyak kunjungan dengan ${name} daripada yang kamu kira, dengan ritme sekarang.`,
    reachOut: 'Lebih banyak kunjungan daripada yang kamu kira, dengan ritme sekarang. Mengirim pesan hanya butuh semenit.',
    smallStep: (label) => `${label} bisa menambah waktu yang baik. Ini langkah kecil ke sana.`,
    suggestPerson: (name) =>
      `Lebih banyak kunjungan dengan ${name} daripada yang kamu kira, dengan ritme sekarang. Rencana membuat kunjungan berikutnya lebih mungkin.`,
    suggestLever: (label) => `${label} bisa menambah waktu yang baik. Rencana kecil adalah cara untuk mulai.`,
    birthday: (name) =>
      `Selamat ulang tahun${name ? `, ${name}` : ''}. Kamu sudah menjalani banyak minggu, sebagian di antaranya indah. Apa satu hal yang bisa kamu lakukan di tahun mendatang?`,
    isolation: 'Orang yang tetap dekat dengan orang lain cenderung hidup lebih lama dan lebih sehat.',
    connectionLever: 'Bagimu, bertemu orang-orang yang kamu cintai setiap minggu bisa menambah waktu yang baik.',
    noneLogged: 'Belum ada telepon atau kunjungan yang dicatat sebulan terakhir.',
    someThisMonth: 'Sebulan terakhir kamu berbicara dengan atau bertemu beberapa orang yang kamu cintai.',
    healthy: {
      years:
        'Banyak tahun di depan kemungkinan dijalani dengan kuat dan mandiri: pita hijau di kalendermu, yang memudar di bagian orang-orang berbeda.',
      lever: (label, strength) =>
        strength
          ? `${label} bisa membuatmu kuat dan mandiri lebih lama: kaki lebih kuat, keseimbangan lebih baik, lebih jarang jatuh.`
          : `${label} bisa menambah tahun-tahun sehat.`,
      tried: ' Pita hijaunya juga bertambah.',
      reveal: (lever) => 'Banyak dari minggu-minggu itu kemungkinan dijalani dengan kuat dan mandiri.' + (lever ? ` ${lever} bisa menambah lebih banyak lagi.` : ''),
    },
    reveal: {
      fullLife: 'Hidup yang penuh adalah rangkaian panjang minggu, dan kamu sedang di perjalanan. Mari buat sisanya berarti.',
      person: (label, howMany) => `Itu termasuk ${label}. ${howMany}`,
      phone: 'Ponselmu memakan sebagian darinya. Setengah jam lebih sedikit sehari bisa menjadi lebih banyak waktu dengan orang-orang yang kamu cintai.',
      lever: (label) => ` ${label} bisa menambah tahun-tahun baik.`,
      range: (country) =>
        `Ini rentang, bukan tanggal, dari berapa lama orang yang hidup sepertimu${country ? ` di ${country}` : ''} biasanya hidup. Bukan nasihat medis.`,
    },
  },

  account: {
    title: 'Kamu',
    edit: 'Ubah jawabanmu',
    dataHeading: 'DATAMU',
    dataBody:
      'Semua yang kamu masukkan tetap di perangkat ini. Tidak ada akun, iklan, atau pelacakan. Perkiraanmu dihitung di sini, di ponsel atau browser-mu.',
    guestNote: (guest) =>
      `Kamu juga punya ${guest ? 'akun tamu' : 'akun yang sudah masuk'} dari uji coba sebelumnya. Isinya hanya profil kosong; menghapus di bawah juga akan menghapusnya.`,
    confirm: 'Ini menghapus jawabanmu, orang dan hal yang kamu cintai, dan semua hal lain di perangkat ini. Tidak bisa dibatalkan.',
    yesDelete: 'Ya, hapus semuanya',
    keep: 'Simpan dataku',
    deleteAll: 'Hapus semua di perangkat ini',
    accountFailed:
      'Server tidak bisa dihubungi untuk menghapus akunmu dari uji coba sebelumnya, jadi belum ada yang dihapus. Kamu bisa coba lagi, atau hapus di perangkat ini saja; akun kosong itu akan tetap ada sampai kamu meminta kami menghapusnya lewat email.',
    deviceOnly: 'Hapus di perangkat ini saja',
    exportButton: 'Unduh dataku',
    exportNote: 'Salinan semua yang disimpan aplikasi ini di perangkat ini, dalam file yang bisa dibuka dengan editor teks apa pun.',
    exportDone: (name: string) => `Salinanmu siap: ${name}. Isinya jawaban kesehatanmu, jadi simpan di tempat yang pribadi.`,
    exportFailed: 'Tidak bisa membuat file. Coba lagi.',
    exportAbout: 'Semua yang disimpan Memento Mori di perangkat ini. "profile" berisi jawaban dan hal yang kamu cintai; "settings" berisi pengaturan kecil aplikasi.',
    disclaimer:
      'Perkiraan ini berasal dari studi populasi. Ia menunjukkan arah dan perkiraan besarnya, bukan janji, dan bukan nasihat medis.',
  },

  disclaimer: {
    short: 'Perkiraan dari rata-rata populasi, untuk renungan dan belajar. Bukan ramalan kematianmu, dan bukan nasihat medis.',
    points: [
      'Ini perkiraan dari rata-rata populasi, bukan ramalan kapan kamu akan meninggal. Tak ada yang bisa tahu itu.',
      'Ini bukan nasihat, diagnosis, atau pengobatan medis. Untuk pertanyaan soal kesehatanmu, bicarakan dengan dokter atau tenaga kesehatan lain.',
      'Ini ada untuk renungan dan belajar: membantumu memakai waktu yang kamu punya untuk hal yang penting bagimu.',
    ],
    support:
      'Kalau memikirkan kematian terasa berat sekarang, kamu tidak harus menanggungnya sendirian. Di AS, telepon atau kirim pesan ke [988](https://988lifeline.org). Di tempat lain, [findahelpline.com](https://findahelpline.com) mencantumkan layanan dukungan gratis dan rahasia di dekatmu. Dalam keadaan darurat, hubungi nomor darurat setempat.',
    howItWorks: 'Cara kerjanya',
    sources: 'Sumber',
    beforeEyebrow: 'Sebelum kamu melihatnya',
    beforeTitle: 'Beberapa kata jujur',
    understand: 'Saya mengerti',
  },

  legal: {
    terms: 'Ketentuan Penggunaan',
    privacy: 'Kebijakan Privasi',
    health: 'Kebijakan Privasi Data Kesehatan',
    eyebrow: 'Hukum',
    draft: 'Draf',
    draftNotice: 'Ini masih draf. Belum ditinjau pengacara dan bisa berubah sebelum Memento Mori diluncurkan.',
    englishOnly: 'Untuk saat ini dokumen ini hanya tersedia dalam bahasa Inggris. Terjemahannya menyusul setelah versi bahasa Inggris ditinjau pengacara.',
    version: (v) => `Versi ${v}`,
    notFound: 'Tidak ditemukan',
    notFoundBody: 'Tidak ada dokumen di sini.',
    agree:
      'Dengan memulai, kamu menyetujui [Ketentuan Penggunaan](/legal/terms) dan menyatakan bahwa usiamu 18 tahun atau lebih. Jawabanmu, termasuk kebiasaan kesehatan, tidak pernah keluar dari perangkat ini: lihat [Kebijakan Privasi](/legal/privacy) dan [Kebijakan Privasi Data Kesehatan](/legal/health-data).',
  },

  sources: {
    eyebrow: 'Sumber',
    title: 'Riset di balik aplikasi ini',
    lede: (n) => `Semua ${n} studi dan kumpulan data yang dikutip aplikasi, dikelompokkan menurut kegunaannya. Ketuk salah satu untuk membukanya.`,
    usedFor: (what) => `Dipakai untuk: ${what}`,
    opens: 'Terbuka di browser.',
    topics: {
      model: { title: 'Cara perkiraan disusun', blurb: 'Kurva kematian, tabel kehidupan yang dipakai untuk menyesuaikannya, dan batas atas tambahan gabungan.' },
      habits: { title: 'Kebiasaan dalam perkiraanmu', blurb: 'Dari mana pengali risiko tiap kebiasaan berasal.' },
      direction: {
        title: 'Sebagai arah, belum masuk perkiraan',
        blurb: 'Temuan di layar Kebiasaan yang menunjukkan arah tetapi belum masuk ke angka.',
      },
      behavior: { title: 'Rencana, pengingat, dan menghubungi orang', blurb: 'Ilmu perilaku di balik rencana, awal baru, dan sambutan kembali.' },
      time: { title: 'Ke mana jam-jammu pergi', blurb: 'Waktu di ponsel dan apa yang bisa didapat dengan mengambil kembali sebagian.' },
      loves: { title: 'Yang kamu cintai: “N kali lagi”', blurb: 'Umur khas hewan peliharaan untuk menghitung waktu bersamanya.' },
    },
    uses: {
      gompertz1825: 'Bentuk kurva: risiko meninggal per tahun naik secara eksponensial seiring usia.',
      makeham1860: 'Bagian risiko yang tetap, tidak bergantung pada usia (suku “A”).',
      wpp2024: 'Titik awalmu: tabel kehidupan untuk negara dan jenis kelaminmu.',
      li2018: 'Batas 14 tahun untuk tambahan gabungan; tidak merokok sebagai pengungkit terbesar.',
      holtLunstad2015: 'Kedekatan: jarang bertemu orang dekat ×1,29.',
      holtLunstad2010: 'Ikatan sosial yang kuat dan peluang bertahan hidup sekitar 1,5 kali (148 studi).',
      paluch2022: 'Olahraga dan langkah harian.',
      mandsager2018: 'Kebugaran kardio sebagai salah satu prediktor terkuat untuk bertahan hidup.',
      li2020: 'Berat badan sehat, dan tahun-tahun bebas penyakit kronis.',
      cappuccio2010: 'Tidur: kurang dari 6 jam ×1,15.',
      zhao2023: 'Alkohol: banyak minum ×1,4; sedikit minum tidak melindungi.',
      fadnes2022: 'Apa yang kamu makan.',
      momma2022: 'Latihan kekuatan.',
      who2023hale: 'Tahun sehat: bagian tahun-tahun ke depan yang dijalani orang seusiamu dalam keadaan sehat, menurut negara dan jenis kelamin.',
      pahor2014: 'Tetap bisa berjalan sendiri: efek latihan kekuatan pada tahun sehat.',
      sherrington2019: 'Olahraga dengan kekuatan dan keseimbangan mencegah jatuh.',
      rijk2016: 'Kekuatan genggaman sebagai penanda kemandirian.',
      cohen2016: 'Rasa punya tujuan hidup.',
      lee2019: 'Optimisme dan mencapai usia 85.',
      okun2013: 'Menolong orang lain.',
      waldinger2016: 'Kepuasan dalam hubungan di usia 50 dan kesehatan di usia 80.',
      allcott2020: 'Lebih sedikit menggulir, lebih banyak waktu dengan orang.',
      hunt2018: 'Membatasi media sosial 30 menit sehari.',
      phoneTime2025: 'Titik awal 4 jam pada pertanyaan ponsel (perkiraannya beragam).',
      liu2023: 'Menghubungi orang.',
      gollwitzer2006: 'Rencana “jika… maka”.',
      dai2014: 'Awal baru: hari Senin, tanggal 1, ulang tahun.',
      milkman2021: 'Sambutan kembali setelah lama absen, bukan rentetan hari.',
      parkes2008: 'Menunjukkan angka milik orang itu sendiri.',
      buffey2022: 'Jalan singkat setelah makan.',
      oneill2013: 'Anjing: median umur sekitar 12 tahun.',
      mcmillan2024: 'Anjing: median harapan hidup 12,5 tahun (584.734 anjing di Inggris).',
      oneill2015: 'Kucing: median umur 14 tahun.',
    },
    quotesHeading: 'Kutipan',
    quotes:
      'Marcus Aurelius (Meditations, terj. Inggris George Long, 1862), Seneca (Surat-surat dan Tentang Singkatnya Hidup, terj. Inggris Richard M. Gummere, 1917–25, dan lainnya), serta Epictetus (Enchiridion, terj. Inggris Thomas Wentworth Higginson, 1865). Terjemahan domain publik, sebagian sedikit disesuaikan.',
    footnote:
      'Beberapa tautan mengarah ke ringkasan atau siaran pers bila makalah lengkapnya berbayar. Kaitan dari studi populasi tidak membuktikan sebab-akibat, dan tidak ada di sini yang merupakan nasihat medis.',
  },

  methods: {
    eyebrow: 'Cara kerjanya',
    title: 'Dari mana angkamu berasal',
    lede: 'Semua yang ditampilkan aplikasi dihitung di perangkatmu dari jawabanmu dan riset yang telah terbit. Inilah tiap langkahnya, beserta studi di baliknya.',
    everyStep: 'Setiap langkah, dengan sumbernya',
    accountHeading: 'CARA KERJANYA',
    curveTitle: '1 · Kurva tempat semua orang bermula',
    curveIntro:
      'Pada orang dewasa, risiko meninggal per tahun naik terus seiring usia, kira-kira berlipat dua setiap 7 sampai 8 tahun. Para aktuaris menggambarkannya selama dua abad sebagai kurva Gompertz–Makeham:',
    curveParts: (child, youth) =>
      `B · e^(b·x) adalah bagian yang tumbuh seiring usia x (Gompertz); A adalah risiko kecil yang tidak bergantung pada usia, seperti kecelakaan (Makeham). Kematian di masa kanak-kanak dan remaja tidak mengikuti bentuk itu, jadi ditambahkan dua suku tetap: satu sebelum usia ${child} dan satu dari ${child} sampai ${youth}.`,
    placeTitle: '2 · Tempat kamu tinggal',
    placeBody: (n) =>
      `Tempat tinggal lebih berpengaruh daripada kebiasaan apa pun: pada 2023, median usia saat meninggal berkisar dari sekitar 59 hingga lebih dari 90 tahun antarnegara. Karena itu kurvanya disesuaikan terpisah untuk tiap jenis kelamin di tiap ${n} negara dan wilayah, dengan tabel kehidupan PBB untuk 2023 (World Population Prospects 2024). A, B, dan b diambil dari angka kematian usia 30 hingga 100; suku masa kanak-kanak dan remaja membuat peluang hidup sampai 15 dan 30 tahun sama persis dengan tabel. Di semua negara dan kedua jenis kelamin, median usia saat meninggal sejak lahir menurut model berselisih kurang dari setahun dari tabel PBB.`,
    placeUs: (mA, mB, fA, fB, b) =>
      `Tanpa negara, aplikasi memakai pendekatan lama tabel AS: A = ${mA}, B = ${mB} untuk laki-laki; A = ${fA}, B = ${fB} untuk perempuan; b = ${b} (sekitar 75 dan 81 tahun saat lahir).`,
    placeLeftOut:
      'Penghasilan dan pendidikan juga memprediksi umur di dalam satu negara. Keduanya sengaja tidak dipakai: kamu tidak bisa mengubahnya di sini, dan terdengar seperti vonis.',
    habitsTitle: '3 · Kebiasaanmu',
    habitsIntro:
      'Setiap jawaban mengalikan risiko tahunan di setiap usia. ×1 berarti tidak berubah; ×2 berarti risikonya dua kali lipat. Pengalinya dibulatkan dari studi dan tinjauan besar: semuanya pendekatan, dan berasal dari kaitan, bukan eksperimen.',
    habitsConnection: (middle) =>
      `Untuk kedekatan, jawaban tengah (${middle}) berada di antara tingkat yang diukur; jawaban itu sendiri tidak diukur. Studinya melaporkan rasio odds, yang di sini dipakai sebagai pengali risiko, pendekatan yang cukup dekat.`,
    habitsSteps: (at4k, at10k) =>
      `Langkah harian, bila kamu isi, menggantikan jawaban olahraga, jadi gerak tidak pernah dihitung dua kali. Risiko turun sekitar 7% untuk setiap tambahan 1.000 langkah, diukur dari 6.000 sehari, dan mendatar di 10.000: pengali = e^(−0,072 × (langkah − 6.000) ÷ 1.000). Jadi 4.000 langkah adalah ${at4k} dan 10.000 adalah ${at10k}.`,
    rangeTitle: '4 · Dari risiko ke rentang',
    rangeBody:
      'Mulai dari usiamu hari ini, aplikasi mengikuti risiko bulan demi bulan sampai usia 121, dikalikan dengan kebiasaanmu. Usia saat separuh orang sepertimu telah meninggal adalah median kamu. Usia saat seperempat dan tiga perempat telah meninggal memberi rentang yang mungkin. Aplikasi juga menunjukkan peluang mencapai 80.',
    rangeRule: (b, years, doubling) =>
      `Patokan kasar di balik angka kebiasaan: tahun bertambah ≈ ln(1 ÷ pengali) ÷ ${b}. Memangkas risikomu separuhnya menambah sekitar ${years} tahun, karena dengan b = ${b} risiko berlipat dua kira-kira setiap ${doubling} tahun usia (kurva negara hasil penyesuaian sedikit lebih curam). Layar-layar menghitung selisih sebenarnya, bukan jalan pintas ini.`,
    combineTitle: '5 · Bagaimana jika: menggabungkan perubahan',
    combineBody: (cap) =>
      `Setiap “bagaimana jika” adalah selisih antara median kamu sekarang dan median kamu bila kebiasaan itu diubah. Beberapa perubahan sekaligus saling mengalikan, jadi hasilnya kurang dari jumlah masing-masing, karena efek kebiasaan saling tumpang tindih. Totalnya juga dibatasi ${cap} tahun.`,
    capClaim: (cap) =>
      `${cap} tahun: selisih terbesar antara orang dengan kelima kebiasaan sehat dan orang tanpa satu pun, dalam dua kohort besar di AS.`,
    combineCalendar:
      'Di kalender, tambahan gabungan dibagi di antara perubahan yang kamu coba sebanding dengan tambahan masing-masing, sehingga tiap perubahan punya warnanya sendiri.',
    notInEstimate: (items) =>
      `Beberapa hal di layar Kebiasaan hanya ditampilkan sebagai arah dan belum masuk ke angkamu: ${items}.`,
    healthyTitle: '6 · Tahun sehat',
    healthyBody:
      'Tahun sehat berangkat dari harapan hidup sehat negaramu (WHO, 2023): bagian tahun-tahun ke depan yang dijalani orang seusia dan sejenis kelamin denganmu dalam keadaan sehat, sejak lahir dan sejak 60. Kami mencocokkan kurva berapa banyak orang yang tidak sehat di tiap usia dengan dua bagian itu, lalu memakainya untuk menimbang tahun-tahunmu ke depan, mengumpulkan waktu yang kurang sehat di akhir hidup, tempat sebagian besarnya jatuh. Karena itu pita hijau di kalender memudar sepanjang rentang, bukan berakhir di satu tanggal. WHO menimbang tiap kondisi menurut seberapa membatasinya, jadi “sehat” di sini mirip, tetapi tidak sama, dengan mandiri.',
    healthyHabits: (k, cap) => `Kebiasaan menggeser tahun sehat hampir sebesar total tahun, seperti dalam sebuah studi besar Harvard: pengali risiko tiap kebiasaan menggeser kurva kesehatan ${k} kali sejauh risiko kematian. Batas ${cap} tahun yang sama berlaku.`,
    healthyStrength: (hr) => `Latihan kekuatan dua kali seminggu juga menurunkan risiko kehilangan kesehatan yang baik (${hr}), dari uji di mana berjalan dengan latihan kekuatan dan keseimbangan mengurangi disabilitas mobilitas berat sebesar 18%. Olahraga dengan kekuatan dan keseimbangan juga mencegah jatuh.`,
    timeTitle: '7 · Waktu ponsel dan tidur',
    timePhone: (waking) =>
      `Waktu ponsel adalah perkiraanmu sendiri, dalam jam per hari (dimulai dari 4, dekat perkiraan umum untuk orang dewasa di AS). Selama tahun-tahun yang mungkin masih kamu punya, jumlahnya jam × tahun ÷ 24. Sebagai bagian dari waktu terjagamu, itu jam ÷ ${waking}.`,
    timeSleep: (ok, short) =>
      `Tampilan “Terjaga” dan “Tanpa ponsel” mengeluarkan tidur dari kalender: sekitar ${ok} jam semalam, atau ${short} bila kamu menjawab kurang dari 6. Tidur adalah waktu yang terpakai dengan baik, bukan hilang.`,
    timeSwap: (minutes) =>
      `Pertukaran ini mengusulkan mengambil kembali ${minutes} menit sehari dari ponsel dan menunjukkan bisa jadi apa, misalnya jalan-jalan setiap hari dengan anjingmu selama tahun-tahun yang mungkin kalian punya bersama.`,
    lovesTitle: '8 · Yang kamu cintai: “N kali lagi”',
    lovesBody:
      'Untuk tiap orang, hewan, atau kegiatan, aplikasi menghitung tahun yang mungkin kalian lalui bersama, lalu mengalikannya dengan seberapa sering kamu bertemu atau melakukannya. Tahun-tahun itu berakhir pada yang paling awal dari: usia median kamu; usia saat kamu bilang akan berhenti melakukan kegiatan; usia median orang itu (dari usianya, dirata-ratakan untuk kedua jenis kelamin karena aplikasi tidak menanyakannya, dan dianggap tinggal di negaramu); atau umur khas hewan peliharaan.',
    lovesPets: (dog, cat) =>
      `Umur khas: anjing sekitar ${dog} tahun, kucing sekitar ${cat}, dari catatan dokter hewan di Inggris. Ras dan ukuran sangat berpengaruh. Hewan yang sudah tua selalu dihitung setidaknya setengah tahun.`,
    limitsTitle: '9 · Yang tidak bisa diberitahukannya',
    limits: [
      'Ini rata-rata populasi. Angka ini menggambarkan berapa lama kelompok orang dengan jawaban seperti milikmu biasanya hidup, bukan apa yang akan terjadi padamu. Angka ini tidak tahu apa pun tentang riwayat kesehatan, gen, atau perawatan medismu.',
      'Kaitan antara kebiasaan dan umur berasal dari studi observasional: orang yang melakukan X cenderung hidup lebih lama, sebagian karena X dan sebagian karena segala hal yang menyertainya. Mengubah kebiasaan belum tentu mengubah umurmu sebesar yang ditampilkan.',
      'Itulah sebabnya aplikasi menampilkan rentang, tidak pernah tanggal. Separuh orang sepertimu hidup melewati median; banyak yang jauh melewatinya.',
    ],
    versionTitle: 'Versi model',
    versionBody: 'Model hanya berubah bila ada bukti kuat, seperti meta-analisis, dan setiap perubahan mendapat versi baru.',
    allSources: 'Semua sumber, lengkap',
  },
};
