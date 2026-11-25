export const materiCategories = [
  'Semua Kategori',
  'Pengantar Ekonomi',
  'Masalah Pokok Ekonomi',
  'Kebutuhan & Pemuas',
  'Kegiatan Ekonomi',
  'Mekanisme Pasar',
  'Struktur Ekonomi',
  'Arus Melingkar (Circular Flow)',
  'Sistem Moneter',
  'Makroekonomi',
  'Sistem & Ideologi Ekonomi',
];

export const materiList = [
  {
    id: 'materi-1',
    chapterNum: 'Bab 1',
    title: 'Konsep Dasar Ilmu Ekonomi',
    category: 'Pengantar Ekonomi',
    summary: 'Mempelajari bagaimana manusia memenuhi kebutuhan hidupnya yang tak terbatas dengan sumber daya yang terbatas.',
    duration: '25 Menit',
    icon: 'TrendingUp',
    accentColor: 'blue',
    chapters: [
      {
        id: 'ch-1-1',
        title: 'Pengertian dan Hakikat Ilmu Ekonomi',
        duration: '7 min',
        summary: 'Asal usul kata oikonomia dan definisi ilmu ekonomi menurut para ahli.',
        theory: `
          <p>Secara etimologis, kata <strong>ekonomi</strong> berasal dari bahasa Yunani kuno, yaitu <em>oikonomia</em>. Kata ini terdiri atas dua kata: <strong>oikos</strong> yang berarti rumah tangga, dan <strong>nomos</strong> yang berarti tata kelola atau aturan. Dengan demikian, secara sederhana ekonomi diartikan sebagai tata laksana atau aturan pengelolaan rumah tangga.</p>
          <p>Dalam arti luas dan modern, <strong>Ilmu Ekonomi</strong> adalah cabang ilmu sosial yang mempelajari perilaku manusia dalam menentukan pilihan untuk mengalokasikan sumber daya yang langka guna menghasilkan barang dan jasa, serta mendistribusikannya kepada berbagai individu atau kelompok dalam masyarakat.</p>
        `,
        keyPoints: [
          'Inti ilmu ekonomi adalah pengambilan keputusan (choice) atas sumber daya yang langka.',
          'Manusia bertindak sebagai homo economicus yang rasional dalam memenuhi kebutuhannya.',
          'Ekonomi bukan hanya tentang uang, melainkan tentang keputusan manusia dalam mengoptimalkan manfaat.'
        ],
        example: `
          <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-blue-900 text-xs uppercase tracking-wider mb-1">Contoh Nyata Pelajar SMA:</h5>
            <p class="text-xs text-blue-800 leading-relaxed">
              Kamu memiliki uang saku Rp 30.000 hari ini. Kamu harus memilih antara membeli makan siang bergizi di kantin sekolah atau membeli kuota internet untuk bermain game online. Keputusan yang kamu ambil untuk mengalokasikan uang tersebut merupakan penerapan nyata dari ilmu ekonomi.
            </p>
          </div>
        `,
        reflection: 'Jika kamu dihadapkan pada pilihan antara waktu istirahat 1 jam dan belajar untuk ujian besok, bagaimana prinsip ilmu ekonomi membimbing keputusanmu?'
      },
      {
        id: 'ch-1-2',
        title: 'Prinsip, Motif, dan Tindakan Ekonomi',
        duration: '10 min',
        summary: 'Pembeda antara prinsip ekonomi, motif intrinsik/ekstrinsik, dan tindakan ekonomi rasional vs irasional.',
        theory: `
          <p>Dalam kehidupan sehari-hari, manusia melakukan kegiatan ekonomi atas dasar dorongan tertentu dan dengan berpedoman pada prinsip tertentu:</p>
          <p><strong>1. Prinsip Ekonomi:</strong> Pedoman bertindak dengan pengorbanan sekecil-kecilnya untuk memperoleh hasil tertentu, atau dengan pengorbanan tertentu untuk memperoleh hasil yang sebesar-besarnya (maksimal).</p>
          <p><strong>2. Motif Ekonomi:</strong> Alasan atau dorongan yang melatarbelakangi seseorang melakukan tindakan ekonomi. Motif dapat berupa mencari keuntungan, memperoleh penghargaan, membantu sesama (motif sosial), atau memperoleh kekuasaan ekonomi.</p>
          <p><strong>3. Tindakan Ekonomi:</strong> Setiap tindakan manusia yang dilandasi oleh prinsip dan motif ekonomi untuk memenuhi kebutuhan.</p>
        `,
        keyPoints: [
          'Tindakan ekonomi rasional mempertimbangkan perbandingan antara biaya (cost) dan manfaat (benefit).',
          'Tindakan ekonomi irasional dilakukan secara impulsif tanpa perhitungan biaya dan manfaat yang matang.',
          'Motif ekonomi tidak selalu egois; motif sosial dan filantropi juga merupakan bagian sah dari motif ekonomi.'
        ],
        example: `
          <div class="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-emerald-900 text-xs uppercase tracking-wider mb-1">Contoh Nyata Pasar:</h5>
            <p class="text-xs text-emerald-800 leading-relaxed">
              Seorang pedagang buku memilih membeli stok buku langsung dari penerbit (grosir) agar mendapatkan harga lebih murah sehingga dapat menjual kembali dengan margin laba yang wajar. Ini adalah contoh tindakan ekonomi rasional berdasarkan prinsip efisiensi.
            </p>
          </div>
        `,
        reflection: 'Pernahkah kamu membeli barang hanya karena diskon padahal sebenarnya tidak kamu butuhkan? Apakah itu tindakan rasional atau irasional?'
      },
      {
        id: 'ch-1-3',
        title: 'Pembagian Cabang Ilmu Ekonomi',
        duration: '8 min',
        summary: 'Mengenal ekonomi deskriptif, teori ekonomi (mikro & makro), serta ekonomi terapan.',
        theory: `
          <p>Ilmu ekonomi dikelompokkan ke dalam tiga kategori utama:</p>
          <p><strong>1. Ekonomi Deskriptif (Descriptive Economics):</strong> Menggambarkan kondisi ekonomi yang sebenarnya terjadi berdasarkan fakta, data statistik, atau sensus di masyarakat (contoh: data angka inflasi BPS, tingkat pengangguran Indonesia 2024).</p>
          <p><strong>2. Teori Ekonomi (Economic Theory):</strong> Kumpulan konsep, hukum, dan model analisis ekonomi yang dibagi menjadi:</p>
          <ul class="list-disc list-inside ml-2 space-y-1">
            <li><strong>Ekonomi Mikro:</strong> Mempelajari perilaku unit-unit ekonomi individual, seperti perilaku konsumen, penentuan harga barang di pasar tertentu, dan biaya produksi suatu perusahaan.</li>
            <li><strong>Ekonomi Makro:</strong> Mempelajari perekonomian secara agregat/keseluruhan, seperti pendapatan nasional (PDB), inflasi, pengangguran nasional, dan neraca pembayaran.</li>
          </ul>
          <p><strong>3. Ekonomi Terapan (Applied Economics):</strong> Penerapan teori ekonomi pada bidang-bidang praktis tertentu, seperti ekonomi perbankan, ekonomi syariah, dan ekonomi moneter.</p>
        `,
        keyPoints: [
          'Mikroekonomi berfokus pada individu dan perusahaan (pohon).',
          'Makroekonomi berfokus pada perekonomian agregat seluruh negara (hutan).',
          'Ekonomi terapan memberikan solusi kebijakan praktis bagi pemerintah dan pengusaha.'
        ],
        example: `
          <div class="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-amber-900 text-xs uppercase tracking-wider mb-1">Perbedaan Mikro vs Makro:</h5>
            <p class="text-xs text-amber-800 leading-relaxed">
              Analisis mengapa harga cabai naik di pasar tradisional saat musim hujan adalah kajian <strong>Ekonomi Mikro</strong>. Sedangkan penetapan suku bunga acuan oleh Bank Indonesia untuk menjaga stabilitas Rupiah adalah kajian <strong>Ekonomi Makro</strong>.
            </p>
          </div>
        `,
        reflection: 'Menurutmu, isu kenaikan harga bensin bersubsidi termasuk ke dalam ranah ekonomi mikro atau makro? Jelaskan alasannya!'
      }
    ]
  },
  {
    id: 'materi-2',
    chapterNum: 'Bab 2',
    title: 'Kelangkaan dan Alokasi Sumber Daya',
    category: 'Masalah Pokok Ekonomi',
    summary: 'Menganalisis inti masalah ekonomi, faktor kelangkaan, biaya peluang (opportunity cost), dan skala prioritas.',
    duration: '30 Menit',
    icon: 'AlertCircle',
    accentColor: 'indigo',
    chapters: [
      {
        id: 'ch-2-1',
        title: 'Konsep Kelangkaan (Scarcity)',
        duration: '10 min',
        summary: 'Penyebab kelangkaan dan mengapa kelangkaan menjadi inti dari seluruh ilmu ekonomi.',
        theory: `
          <p><strong>Kelangkaan (Scarcity)</strong> adalah kondisi di mana jumlah alat pemuas kebutuhan (barang dan jasa) tidak mencukupi untuk memenuhi kebutuhan manusia yang beraneka ragam dan tidak terbatas.</p>
          <p>Faktor-faktor penyebab kelangkaan meliputi:</p>
          <ul class="list-disc list-inside ml-2 space-y-1">
            <li>Keterbatasan kemampuan produksi dan kapasitas teknologi.</li>
            <li>Pertumbuhan penduduk yang lebih cepat dibandingkan laju produksi barang.</li>
            <li>Kerusakan sumber daya alam akibat eksploitasi berlebihan atau bencana alam.</li>
            <li>Keterbatasan kemampuan dan keahlian manusia (sumber daya manusia) dalam mengolah alam.</li>
          </ul>
        `,
        keyPoints: [
          'Kelangkaan adalah kondisi universal yang dihadapi individu miskin, kaya, bahkan negara maju.',
          'Kelangkaan memaksa manusia untuk selalu membuat pilihan (trade-off).',
          'Barang ekonomi memerlukan pengorbanan untuk mendapatkannya, berbeda dengan barang bebas seperti udara segar.'
        ],
        example: `
          <div class="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-indigo-900 text-xs uppercase tracking-wider mb-1">Contoh Nyata Kelangkaan:</h5>
            <p class="text-xs text-indigo-800 leading-relaxed">
              Saat antrean gas elpiji 3 kg terjadi di masyarakat, permintaan warga sangat banyak tetapi kuota distribusi harian terbatas. Inilah wujud nyata kelangkaan sumber daya energi.
            </p>
          </div>
        `,
        reflection: 'Identifikasi 3 hal di sekolahmu yang menurutmu mengalami kelangkaan dan bagaimana solusinya!'
      },
      {
        id: 'ch-2-2',
        title: 'Biaya Peluang (Opportunity Cost)',
        duration: '10 min',
        summary: 'Menghitung nilai kesempatan terbaik yang dikorbankan saat mengambil satu keputusan alternatif.',
        theory: `
          <p><strong>Biaya Peluang (Opportunity Cost)</strong> adalah nilai dari alternatif terbaik yang harus dikorbankan atau dilepaskan ketika seseorang memilih suatu pilihan lain.</p>
          <p>Biaya peluang tidak selalu berbentuk uang keluar (biaya riil/eksplisit), melainkan keuntungan atau manfaat potensial yang hilang karena tidak memilih opsi kedua terbaik.</p>
          <p>Ciri khas biaya peluang:</p>
          <ul class="list-disc list-inside ml-2 space-y-1">
            <li>Dihitung dari alternatif terbaik yang tidak dipilih (bukan akumulasi semua pilihan).</li>
            <li>Membantu individu dan perusahaan menghindari keputusan yang merugikan di masa depan.</li>
          </ul>
        `,
        keyPoints: [
          'Opportunity cost = Nilai manfaat dari alternatif terbaik yang dikorbankan.',
          'Setiap kali kamu memilih "Ya" untuk satu hal, kamu otomatis memilih "Tidak" untuk hal lainnya.',
          'Memahami opportunity cost melatih pola pikir ekonom yang bijaksana dan berorientasi jangka panjang.'
        ],
        example: `
          <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-blue-900 text-xs uppercase tracking-wider mb-1">Studi Kasus Lulusan SMA:</h5>
            <p class="text-xs text-blue-800 leading-relaxed">
              Andi baru lulus SMA dan mendapat 2 tawaran: (A) Bekerja di toko ritel dengan gaji Rp 3.500.000/bulan, atau (B) Melanjutkan kuliah S1. Jika Andi memilih kuliah, maka biaya peluang Andi adalah gaji kerja Rp 3.500.000/bulan yang ia lepaskan demi mengejar gelar sarjana.
            </p>
          </div>
        `,
        reflection: 'Bila kamu memilih menghabiskan akhir pekan bermain game daripada magang berbayar, apa biaya peluang yang kamu korbankan?'
      },
      {
        id: 'ch-2-3',
        title: 'Menyusun Skala Prioritas Kebutuhan',
        duration: '10 min',
        summary: 'Metode menyusun urutan kebutuhan dari yang paling mendesak hingga yang dapat ditunda.',
        theory: `
          <p>Karena sumber daya yang kita miliki terbatas, kita wajib menyusun <strong>Skala Prioritas Kebutuhan</strong>. Skala prioritas adalah urutan daftar kebutuhan yang disusun berdasarkan tingkat kepentingan dan urgensinya bagi kelangsungan hidup.</p>
          <p>Langkah penyusunan skala prioritas:</p>
          <ol class="list-decimal list-inside ml-2 space-y-1">
            <li><strong>Mendesak dan Penting:</strong> Kebutuhan primer yang harus segera dipenuhi (makanan, kesehatan, biaya pendidikan pokok).</li>
            <li><strong>Penting tapi Tidak Mendesak:</strong> Kebutuhan peningkatan kapasitas (tabungan, buku pengayaan).</li>
            <li><strong>Mendesak tapi Kurang Penting:</strong> Kebutuhan situasional yang bisa dicari substitusinya.</li>
            <li><strong>Tidak Penting dan Tidak Mendesak:</strong> Kebutuhan hiburan konsumtif berlebihan yang bisa diabaikan.</li>
          </ol>
        `,
        keyPoints: [
          'Skala prioritas mencegah perilaku boros dan defisit keuangan.',
          'Prioritas seseorang berbeda-beda tergantung profesi, pendapatan, dan situasi keluarga.',
          'Terapkan formula 50-30-20 (50% kebutuhan pokok, 30% keinginan, 20% tabungan/investasi).'
        ],
        example: `
          <div class="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-emerald-900 text-xs uppercase tracking-wider mb-1">Tips Mengelola Uang Jajan:</h5>
            <p class="text-xs text-emerald-800 leading-relaxed">
              Sebelum membeli sepatu merek terkenal yang mahal, dahulukan membeli buku teks pelajaran dan membayar transportasi ke sekolah. Sepatu baru bisa dimasukkan ke daftar prioritas ketiga setelah tabungan terkumpul.
            </p>
          </div>
        `,
        reflection: 'Tuliskan 3 kebutuhan teratasmu untuk minggu ini dan tentukan mana yang paling urgen!'
      }
    ]
  },
  {
    id: 'materi-3',
    chapterNum: 'Bab 3',
    title: 'Kebutuhan Manusia',
    category: 'Kebutuhan & Pemuas',
    summary: 'Klasifikasi kebutuhan primer, sekunder, tersier, serta berbagai jenis alat pemuas kebutuhan manusia.',
    duration: '20 Menit',
    icon: 'Package',
    accentColor: 'cyan',
    chapters: [
      {
        id: 'ch-3-1',
        title: 'Macam-macam Kebutuhan Manusia',
        duration: '6 min',
        summary: 'Klasifikasi kebutuhan menurut intensitas, waktu pemenuhan, sifat, dan subjeknya.',
        theory: `
          <p>Kebutuhan manusia dapat digolongkan berdasarkan empat kriteria utama:</p>
          <p><strong>1. Menurut Intensitas (Tingkat Kepentingan):</strong></p>
          <ul class="list-disc list-inside ml-2">
            <li><em>Primer:</em> Kebutuhan mutlak untuk bertahan hidup (sandang, pangan, papan).</li>
            <li><em>Sekunder:</em> Kebutuhan pelengkap setelah primer terpenuhi (alat elektronik, meja belajar).</li>
            <li><em>Tersier:</em> Kebutuhan mewah untuk prestise atau kesenangan (mobil sport, perhiasan mewah).</li>
          </ul>
          <p><strong>2. Menurut Waktu Pemenuhan:</strong> Sekarang (obat saat sakit) vs Masa Depan (tabungan hari tua).</p>
          <p><strong>3. Menurut Sifat:</strong> Jasmani (olahraga, makan) vs Rohani (ibadah, rekreasi mental).</p>
        `,
        keyPoints: [
          'Kebutuhan bersifat dinamis dan berkembang seiring waktu serta kemajuan peradaban.',
          'Barang yang merupakan kebutuhan sekunder bagi satu orang bisa menjadi primer bagi orang lain sesuai pekerjaannya.'
        ],
        example: `
          <div class="bg-cyan-50 border-l-4 border-cyan-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-cyan-900 text-xs uppercase tracking-wider mb-1">Relativitas Kebutuhan:</h5>
            <p class="text-xs text-cyan-800 leading-relaxed">
              Bagi pengemudi ojek online, sepeda motor dan smartphone adalah <strong>kebutuhan primer</strong> untuk mencari nafkah, sedangkan bagi orang lain mungkin sekadar alat bantu sekunder.
            </p>
          </div>
        `,
        reflection: 'Menurutmu, apakah laptop saat ini sudah bergeser menjadi kebutuhan primer bagi siswa SMA? Jelaskan pandanganmu!'
      },
      {
        id: 'ch-3-2',
        title: 'Barang dan Jasa sebagai Alat Pemuas Kebutuhan',
        duration: '7 min',
        summary: 'Perbedaan barang bebas, barang ekonomi, barang substitusi, dan barang komplementer.',
        theory: `
          <p>Alat pemuas kebutuhan dibedakan menjadi wujud <strong>barang</strong> (berwujud fisik) dan <strong>jasa</strong> (layanan non-fisik).</p>
          <p>Hubungan antar barang pemuas kebutuhan:</p>
          <ul class="list-disc list-inside ml-2 space-y-1">
            <li><strong>Barang Substitusi:</strong> Barang yang dapat saling menggantikan fungsinya (contoh: beras diganti jagung/roti, pulpen diganti pensil).</li>
            <li><strong>Barang Komplementer:</strong> Barang yang saling melengkapi dan penggunaannya harus bersamaan (contoh: bensin dengan sepeda motor, kopi dengan gula).</li>
          </ul>
        `,
        keyPoints: [
          'Kenaikan harga barang substitusi akan meningkatkan permintaan barang penggantinya.',
          'Kenaikan harga barang komplementer akan menurunkan permintaan barang pasangannya.'
        ],
        example: `
          <div class="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-emerald-900 text-xs uppercase tracking-wider mb-1">Contoh Substitusi vs Komplementer:</h5>
            <p class="text-xs text-emerald-800 leading-relaxed">
              Jika harga tiket bioskop melambung tinggi, orang beralih menonton film di layanan streaming online (substitusi). Jika harga bensin naik tajam, penjualan motor berbahan bakar boros cenderung turun (komplementer).
            </p>
          </div>
        `,
        reflection: 'Sebutkan 2 pasang barang komplementer yang selalu kamu gunakan saat belajar di sekolah!'
      },
      {
        id: 'ch-3-3',
        title: 'Faktor yang Mempengaruhi Kebutuhan',
        duration: '7 min',
        summary: 'Faktor geografis, pendapatan, peradaban, adat istiadat, dan usia dalam membentuk kebutuhan.',
        theory: `
          <p>Kebutuhan setiap manusia tidak seragam karena dipengaruhi oleh berbagai faktor eksternal dan internal:</p>
          <ul class="list-disc list-inside ml-2 space-y-1">
            <li><strong>Tingkat Pendapatan:</strong> Semakin tinggi pendapatan seseorang, semakin banyak jenis kebutuhan tersier yang ingin dipenuhi.</li>
            <li><strong>Kondisi Geografis/Lingkungan Alam:</strong> Orang di daerah pegunungan dingin butuh pakaian tebal, sedangkan di pesisir butuh pakaian tipis dan pendingin ruangan.</li>
            <li><strong>Kemajuan IPTEK:</strong> Smartphone yang 20 tahun lalu belum dibutuhkan sekarang menjadi kebutuhan utama komunikasi.</li>
          </ul>
        `,
        keyPoints: [
          'Hukum Engel: Ketika pendapatan naik, persentase pengeluaran untuk pangan cenderung menurun dibanding non-pangan.',
          'Kebutuhan manusia tidak pernah mencapai titik henti total.'
        ],
        example: `
          <div class="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-amber-900 text-xs uppercase tracking-wider mb-1">Pengaruh Lingkungan:</h5>
            <p class="text-xs text-amber-800 leading-relaxed">
              Masyarakat di negara 4 musim membutuhkan pemanas ruangan dan mantel bulu saat musim dingin, kebutuhan yang sama sekali tidak ada di negara tropis seperti Indonesia.
            </p>
          </div>
        `,
        reflection: 'Bagaimana tren media sosial saat ini mempengaruhi daftar keinginan dan kebutuhan generasi mudamu?'
      }
    ]
  },
  {
    id: 'materi-4',
    chapterNum: 'Bab 4',
    title: 'Produksi, Distribusi, dan Konsumsi',
    category: 'Kegiatan Ekonomi',
    summary: 'Memahami siklus arus kegiatan ekonomi, faktor produksi, jalur distribusi, dan perilaku konsumen rasional.',
    duration: '35 Menit',
    icon: 'Factory',
    accentColor: 'emerald',
    chapters: [
      {
        id: 'ch-4-1',
        title: 'Kegiatan dan Faktor Produksi',
        duration: '12 min',
        summary: 'Empat faktor produksi: Alam, Tenaga Kerja, Modal, dan Keahlian (Kewirausahaan).',
        theory: `
          <p><strong>Produksi</strong> adalah kegiatan menciptakan atau menambah nilai guna (utility) suatu barang atau jasa untuk memenuhi kebutuhan manusia.</p>
          <p>Empat faktor produksi utama:</p>
          <ol class="list-decimal list-inside ml-2 space-y-1">
            <li><strong>Faktor Alam (Tanah):</strong> Segala kekayaan alam yang disediakan bumi (tanah, air, mineral, tambang). Balas jasanya berupa <em>Sewa (Rent)</em>.</li>
            <li><strong>Faktor Tenaga Kerja (Labor):</strong> Usaha fisik maupun mental manusia. Balas jasanya berupa <em>Upah/Gaji (Wage)</em>.</li>
            <li><strong>Faktor Modal (Capital):</strong> Barang hasil produksi untuk menghasilkan barang lain (mesin, gedung, uang modal). Balas jasanya berupa <em>Bunga Modal (Interest)</em>.</li>
            <li><strong>Kewirausahaan (Entrepreneurship):</strong> Kemampuan mengombinasikan ketiga faktor produksi lain secara efisien. Balas jasanya berupa <em>Laba/Keuntungan (Profit)</em>.</li>
          </ol>
        `,
        keyPoints: [
          'Produksi menambah nilai bentuk (form utility), tempat (place utility), atau waktu (time utility).',
          'Law of Diminishing Returns menyatakan bahwa penambahan satu faktor produksi terus menerus pada akhirnya menghasilkan tambahan output yang menurun.'
        ],
        example: `
          <div class="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-emerald-900 text-xs uppercase tracking-wider mb-1">Contoh Penambahan Nilai Guna:</h5>
            <p class="text-xs text-emerald-800 leading-relaxed">
              Kayu gelondongan di hutan bernilai rendah. Ketika diolah oleh pengrajin mebel menjadi meja belajar yang indah (form utility), nilai jualnya melonjak berlipat ganda.
            </p>
          </div>
        `,
        reflection: 'Jika kamu ingin memulai bisnis rintisan saat SMA, faktor produksi mana yang paling menantang untuk kamu siapkan?'
      },
      {
        id: 'ch-4-2',
        title: 'Distribusi dan Saluran Pemasaran',
        duration: '11 min',
        summary: 'Peran perantara pedagang besar (grosir), pengecer (retailer), dan saluran langsung vs tidak langsung.',
        theory: `
          <p><strong>Distribusi</strong> adalah kegiatan menyalurkan barang atau jasa dari tangan produsen ke tangan konsumen akhir. Distribusi memastikan barang sampai pada waktu, tempat, dan jumlah yang tepat.</p>
          <p>Saluran distribusi dibagi menjadi:</p>
          <ul class="list-disc list-inside ml-2 space-y-1">
            <li><strong>Distribusi Langsung:</strong> Produsen langsung menjual ke konsumen tanpa perantara (contoh: petani menjual hasil panen di gerai miliknya sendiri).</li>
            <li><strong>Distribusi Semi Langsung:</strong> Penjualan melalui perantara milik produsen sendiri.</li>
            <li><strong>Distribusi Tidak Langsung:</strong> Menggunakan mata rantai perantara: Produsen -> Pedagang Besar (Grosir) -> Pengecer -> Konsumen.</li>
          </ul>
        `,
        keyPoints: [
          'Perantara distribusi menanggung risiko penyimpanan dan transportasi barang.',
          'Platform e-commerce masa kini memperpendek rantai distribusi konvensional.'
        ],
        example: `
          <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-blue-900 text-xs uppercase tracking-wider mb-1">Revolusi Digital:</h5>
            <p class="text-xs text-blue-800 leading-relaxed">
              Sebelum ada marketplace online, pengrajin sepatu di Cibaduyut harus menjual ke grosir besar untuk sampai ke toko mall. Kini, mereka bisa langsung menjual ke pembeli di seluruh Indonesia lewat aplikasi.
            </p>
          </div>
        `,
        reflection: 'Apa dampak positif dan tantangan dari saluran distribusi langsung via marketplace bagi pedagang pasar tradisional?'
      },
      {
        id: 'ch-4-3',
        title: 'Konsumsi dan Perilaku Konsumen Rasional',
        duration: '12 min',
        summary: 'Teori utilitas (Hukum Gossen I & II) dan ciri-ciri perilaku konsumen yang cerdas finansial.',
        theory: `
          <p><strong>Konsumsi</strong> adalah kegiatan menghabiskan atau mengurangi nilai guna barang dan jasa secara berangsur-angsur maupun sekaligus untuk memenuhi kebutuhan hidup.</p>
          <p>Teori Kepuasan Konsumen (Hukum Gossen):</p>
          <p><strong>Hukum Gossen I (The Law of Diminishing Marginal Utility):</strong> Jika pemenuhan suatu kebutuhan atas satu jenis barang dilakukan terus-menerus, maka tingkat kepuasan tambahan (marginal utility) yang diperoleh pada akhirnya akan semakin berkurang.</p>
          <p>Ciri konsumen rasional: Mengutamakan kebutuhan pokok, membandingkan kualitas dan harga, serta tidak mudah terpengaruh iklan semata.</p>
        `,
        keyPoints: [
          'Gelas air pertama saat berbuka puasa terasa sangat nikmat; gelas keempat sudah tidak memberikan kenikmatan yang sama (Hukum Gossen I).',
          'Konsumsi bertujuan mempertahankan kelangsungan hidup dan mencapai kesejahteraan fisik serta psikis.'
        ],
        example: `
          <div class="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-amber-900 text-xs uppercase tracking-wider mb-1">Studi Kasus Makanan Cepat Saji:</h5>
            <p class="text-xs text-amber-800 leading-relaxed">
              Memakan 1 porsi burger saat lapar memberikan kepuasan maksimal. Namun dipaksa memakan burger ketiga di waktu yang sama justru dapat menyebabkan mual dan ketidakpuasan.
            </p>
          </div>
        `,
        reflection: 'Bagaimana cara kamu mengendalikan diri agar tidak menjadi konsumen konsumtif yang terjebak tren FOMO?'
      }
    ]
  },
  {
    id: 'materi-5',
    chapterNum: 'Bab 5',
    title: 'Permintaan dan Penawaran',
    category: 'Mekanisme Pasar',
    summary: 'Hukum permintaan, hukum penawaran, kurva elastisitas, dan proses terbentuknya harga keseimbangan pasar.',
    duration: '40 Menit',
    icon: 'LineChart',
    accentColor: 'teal',
    chapters: [
      {
        id: 'ch-5-1',
        title: 'Hukum dan Faktor Permintaan (Demand)',
        duration: '13 min',
        summary: 'Bunyi hukum permintaan, pergeseran kurva permintaan, dan faktor ceteris paribus.',
        theory: `
          <p><strong>Permintaan (Demand)</strong> adalah jumlah barang atau jasa yang ingin dan mampu dibeli oleh konsumen pada berbagai tingkat harga dalam periode waktu tertentu.</p>
          <p><strong>Hukum Permintaan:</strong> <em>"Semakin tinggi harga suatu barang, maka semakin sedikit jumlah barang yang diminta; sebaliknya semakin rendah harga suatu barang, maka semakin banyak jumlah barang yang diminta"</em>, dengan asumsi faktor lain tetap (ceteris paribus).</p>
          <p>Kurva permintaan memiliki lereng (slope) <strong>negatif</strong> miring dari kiri atas ke kanan bawah.</p>
        `,
        keyPoints: [
          'Hubungan antara harga (P) dan jumlah barang yang diminta (Qd) adalah berbanding terbalik (negatif).',
          'Faktor selain harga: Pendapatan konsumen, selera, harga barang substitusi/komplementer, dan perkiraan harga masa depan.'
        ],
        example: `
          <div class="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-teal-900 text-xs uppercase tracking-wider mb-1">Contoh Promo Diskon:</h5>
            <p class="text-xs text-teal-800 leading-relaxed">
              Saat sebuah brand sepatu menurunkan harga dari Rp 500.000 menjadi Rp 250.000 saat diskon akhir tahun, antrean pembeli melonjak berkali lipat. Ini membuktikan hukum permintaan bekerja.
            </p>
          </div>
        `,
        reflection: 'Mengapa kurva permintaan memiliki kemiringan negatif? Coba jelaskan dengan logikamu sendiri!'
      },
      {
        id: 'ch-5-2',
        title: 'Hukum dan Faktor Penawaran (Supply)',
        duration: '13 min',
        summary: 'Bunyi hukum penawaran, perilaku penjual, dan kurva penawaran berlereng positif.',
        theory: `
          <p><strong>Penawaran (Supply)</strong> adalah jumlah barang atau jasa yang bersedia dijual oleh produsen pada berbagai tingkat harga dalam periode waktu tertentu.</p>
          <p><strong>Hukum Penawaran:</strong> <em>"Semakin tinggi harga suatu barang, maka semakin banyak jumlah barang yang ditawarkan oleh produsen; sebaliknya semakin rendah harga barang, maka semakin sedikit jumlah barang yang ditawarkan"</em> (ceteris paribus).</p>
          <p>Kurva penawaran memiliki lereng (slope) <strong>positif</strong> miring dari kiri bawah ke kanan atas.</p>
        `,
        keyPoints: [
          'Hubungan antara harga (P) dan jumlah penawaran (Qs) adalah berbanding lurus (positif).',
          'Faktor yang menggeser penawaran: Biaya produksi, kemajuan teknologi, jumlah produsen, dan kebijakan pajak/subsidi pemerintah.'
        ],
        example: `
          <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-blue-900 text-xs uppercase tracking-wider mb-1">Perilaku Petani:</h5>
            <p class="text-xs text-blue-800 leading-relaxed">
              Ketika harga cabai di pasaran sedang tinggi mencapai Rp 100.000/kg, para petani termotivasi memanen dan menjual sebanyak-banyaknya cabai ke pasar untuk meraih laba maksimal.
            </p>
          </div>
        `,
        reflection: 'Jika biaya pupuk dan pestisida melonjak mahal, apa yang akan terjadi pada kurva penawaran hasil pertanian?'
      },
      {
        id: 'ch-5-3',
        title: 'Harga Keseimbangan Pasar (Equilibrium)',
        duration: '14 min',
        summary: 'Titik potong kurva permintaan dan penawaran (Qd = Qs) serta kondisi surplus dan defisit.',
        theory: `
          <p><strong>Harga Keseimbangan (Equilibrium Price)</strong> terbentuk pada saat jumlah barang yang diminta oleh pembeli sama persis dengan jumlah barang yang ditawarkan oleh penjual (<strong>Qd = Qs</strong>).</p>
          <p>Kondisi ketidakseimbangan:</p>
          <ul class="list-disc list-inside ml-2 space-y-1">
            <li><strong>Kelebihan Penawaran (Surplus):</strong> Terjadi jika harga di atas titik ekuilibrium, barang menumpuk tidak laku, mendorong harga turun.</li>
            <li><strong>Kelebihan Permintaan (Shortage/Defisit):</strong> Terjadi jika harga di bawah titik ekuilibrium, pembeli berebut barang, mendorong harga naik kembali.</li>
          </ul>
        `,
        keyPoints: [
          'Titik temu kurva D dan S menghasilkan harga pasar dan kuantitas pasar yang stabil.',
          'Mekanisme pasar bekerja seperti "tangan tak terlihat" (invisible hand) menurut Adam Smith.'
        ],
        example: `
          <div class="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-amber-900 text-xs uppercase tracking-wider mb-1">Tawar Menawar di Pasar:</h5>
            <p class="text-xs text-amber-800 leading-relaxed">
              Penjual menawarkan baju Rp 100.000, pembeli menawar Rp 60.000. Setelah bernegosiasi, keduanya sepakat di harga Rp 80.000. Harga Rp 80.000 itulah titik kesepakatan keseimbangan transaksi.
            </p>
          </div>
        `,
        reflection: 'Jika pemerintah menetapkan batas harga tertinggi (ceiling price) untuk beras, apa kemungkinan dampaknya pada ketersediaan beras di pasar?'
      }
    ]
  },
  {
    id: 'materi-6',
    chapterNum: 'Bab 6',
    title: 'Pasar dan Struktur Pasar',
    category: 'Struktur Ekonomi',
    summary: 'Mengenal pasar persaingan sempurna, monopoli, oligopoli, dan persaingan monopolistik beserta dampaknya.',
    duration: '30 Menit',
    icon: 'Store',
    accentColor: 'orange',
    chapters: [
      {
        id: 'ch-6-1',
        title: 'Pengertian dan Fungsi Pasar',
        duration: '10 min',
        summary: 'Pasar konkret vs pasar abstrak serta fungsi distribusi, pembentukan harga, dan promosi.',
        theory: `
          <p><strong>Pasar</strong> tidak hanya berupa tempat fisik, melainkan setiap mekanisme yang mempertemukan pihak penjual dan pembeli untuk melakukan transaksi pertukaran barang atau jasa.</p>
          <p>Tiga fungsi utama pasar:</p>
          <ul class="list-disc list-inside ml-2 space-y-1">
            <li><strong>Fungsi Distribusi:</strong> Memperlancar penyaluran barang dari produsen ke konsumen.</li>
            <li><strong>Fungsi Pembentukan Harga:</strong> Menemukan kesepakatan nilai barang melalui hukum permintaan dan penawaran.</li>
            <li><strong>Fungsi Promosi:</strong> Tempat memperkenalkan barang baru dan keunggulannya kepada konsumen.</li>
          </ul>
        `,
        keyPoints: [
          'Pasar konkret mempertemukan penjual dan pembeli secara langsung (Pasar Tradisional).',
          'Pasar abstrak melakukan transaksi tanpa harus tatap muka fisik (Bursa Efek, Marketplace Online).'
        ],
        example: `
          <div class="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-orange-900 text-xs uppercase tracking-wider mb-1">Pasar Abstrak Modern:</h5>
            <p class="text-xs text-orange-800 leading-relaxed">
              Ketika kamu membeli buku melalui aplikasi belanja online dan membayar menggunakan dompet digital, transaksi tersebut terjadi di pasar abstrak secara sah.
            </p>
          </div>
        `,
        reflection: 'Menurutmu, apakah pasar fisik tradisional akan hilang digantikan oleh e-commerce sepenuhnya? Berikan analisismu!'
      },
      {
        id: 'ch-6-2',
        title: 'Pasar Persaingan Sempurna',
        duration: '10 min',
        summary: 'Karakteristik pasar persaingan sempurna di mana penjual dan pembeli bertindak sebagai price taker.',
        theory: `
          <p><strong>Pasar Persaingan Sempurna</strong> adalah struktur pasar ideal di mana terdapat banyak penjual dan pembeli, serta produk yang diperjualbelikan bersifat homogen (serupa identik).</p>
          <p>Ciri-ciri pasar persaingan sempurna:</p>
          <ul class="list-disc list-inside ml-2 space-y-1">
            <li>Barang yang dijual homogen (contoh: beras, gandum, komoditas hasil tani).</li>
            <li>Penjual dan pembeli tidak dapat menentukan harga secara sepihak (<em>Price Taker</em>).</li>
            <li>Bebas keluar masuk pasar (Free Entry and Exit).</li>
            <li>Informasi pasar sempurna dan simetris bagi kedua belah pihak.</li>
          </ul>
        `,
        keyPoints: [
          'Tidak ada satu pedagang pun yang bisa menaikkan harga di atas harga pasar karena pembeli akan langsung pindah.',
          'Pasar persaingan sempurna memaksa produsen beroperasi pada tingkat efisiensi paling tinggi.'
        ],
        example: `
          <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-blue-900 text-xs uppercase tracking-wider mb-1">Contoh Nyata Pasar Beras:</h5>
            <p class="text-xs text-blue-800 leading-relaxed">
              Di pasar induk beras Cipinang, ratusan pedagang menjual beras jenis setara. Jika satu kios menaikkan harga Rp 1.000 di atas harga pasar, pembeli akan beralih ke kios persis di sebelahnya.
            </p>
          </div>
        `,
        reflection: 'Mengapa di dunia nyata pasar persaingan sempurna murni sangat jarang ditemukan secara mutlak?'
      },
      {
        id: 'ch-6-3',
        title: 'Pasar Persaingan Tidak Sempurna (Monopoli, Oligopoli, Monopolistik)',
        duration: '10 min',
        summary: 'Perbedaan mendasar antara pasar monopoli, oligopoli, dan pasar monopolistik.',
        theory: `
          <p><strong>Pasar Persaingan Tidak Sempurna</strong> terjadi jika salah satu pihak (penjual/pembeli) memiliki kekuatan untuk mempengaruhi harga:</p>
          <p><strong>1. Pasar Monopoli:</strong> Hanya ada <strong>satu penjual</strong> yang menguasai pasar seluruhnya (<em>Price Maker</em>). Contoh: PT PLN untuk listrik rumah tangga, PT KAI untuk jalur rel kereta api.</p>
          <p><strong>2. Pasar Oligopoli:</strong> Dikuasai oleh <strong>beberapa perusahaan besar</strong> (2 hingga belasan). Contoh: Industri penyedia operator seluler (Telkomsel, Indosat, XL) dan industri semen.</p>
          <p><strong>3. Pasar Persaingan Monopolistik:</strong> Banyak penjual dengan produk sejenis namun memiliki diferensiasi merek, kemasan, atau aroma. Contoh: Industri sampo, sabun mandi, dan restoran cepat saji.</p>
        `,
        keyPoints: [
          'Monopoli alamiah diatur negara demi melindungi hajat hidup orang banyak (Pasal 33 UUD 1945).',
          'Pada pasar oligopoli, perang harga sangat dihindari; persaingan dilakukan melalui iklan masif.',
          'Diferensiasi produk pada monopolistik menciptakan loyalitas merek bagi konsumen.'
        ],
        example: `
          <div class="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-amber-900 text-xs uppercase tracking-wider mb-1">Perang Iklan Operator Seluler:</h5>
            <p class="text-xs text-amber-800 leading-relaxed">
              Provider internet di Indonesia bersaing ketat dalam paket kuota, kecepatan jaringan 5G, dan promosi artis terkenal untuk memikat pelanggan dalam struktur pasar oligopoli.
            </p>
          </div>
        `,
        reflection: 'Menurutmu, apa dampak negatif bagi konsumen jika sebuah pasar dikuasai oleh monopoli swasta tanpa pengawasan pemerintah?'
      }
    ]
  },
  {
    id: 'materi-7',
    chapterNum: 'Bab 7',
    title: 'Peran Pelaku Ekonomi',
    category: 'Arus Melingkar (Circular Flow)',
    summary: 'Interaksi Rumah Tangga Konsumen (RTK), Produsen (RTP), Pemerintah (RTG), dan Masyarakat Luar Negeri (RTLN).',
    duration: '25 Menit',
    icon: 'Users',
    accentColor: 'purple',
    chapters: [
      {
        id: 'ch-7-1',
        title: 'Empat Pelaku Utama Kegiatan Ekonomi',
        duration: '11 min',
        summary: 'Tugas dan peran RTK, RTP, RTG, dan RTLN dalam perekonomian nasional.',
        theory: `
          <p>Kegiatan ekonomi nasional digerakkan oleh 4 pelaku ekonomi utama:</p>
          <ol class="list-decimal list-inside ml-2 space-y-1">
            <li><strong>Rumah Tangga Konsumen (RTK):</strong> Pemilik faktor produksi (tanah, tenaga kerja, modal) dan pemakai barang/jasa hasil produksi.</li>
            <li><strong>Rumah Tangga Produsen (RTP):</strong> Pengguna faktor produksi dan penghasil barang/jasa untuk dijual ke pasar.</li>
            <li><strong>Rumah Tangga Pemerintah (RTG):</strong> Pengatur perekonomian melalui undang-undang, penarik pajak, dan penyedia barang publik (jalan, jembatan, pertahanan).</li>
            <li><strong>Masyarakat Luar Negeri (RTLN):</strong> Mitra dalam kegiatan ekspor, impor produk, tenaga kerja migran, dan penanaman modal asing.</li>
          </ol>
        `,
        keyPoints: [
          'RTK menerima pendapatan dari RTP berupa sewa, upah, bunga, dan laba.',
          'Pemerintah menjaga stabilitas dan mendistribusikan subsidi bagi masyarakat kurang mampu.'
        ],
        example: `
          <div class="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-purple-900 text-xs uppercase tracking-wider mb-1">Arus Pendapatan:</h5>
            <p class="text-xs text-purple-800 leading-relaxed">
              Ayahmu bekerja sebagai akuntan di sebuah pabrik tekstil (menyerahkan faktor tenaga kerja ke RTP), menerima gaji bulanan, dan menggunakan gaji tersebut untuk belanja sembako keluarga (konsumsi barang RTP).
            </p>
          </div>
        `,
        reflection: 'Sebagai siswa SMA yang belum bekerja, apa saja peran ekonomimu saat ini dalam diagram circular flow?'
      },
      {
        id: 'ch-7-2',
        title: 'Diagram Arus Melingkar (Circular Flow Diagram)',
        duration: '14 min',
        summary: 'Visualisasi aliran arus uang dan arus barang antara pasar faktor produksi dan pasar output.',
        theory: `
          <p><strong>Circular Flow Diagram</strong> menggambarkan perputaran timbal balik arus uang dan arus barang/jasa antar pelaku ekonomi:</p>
          <ul class="list-disc list-inside ml-2 space-y-1">
            <li><strong>Model 2 Sektor:</strong> Hubungan murni antara RTK dan RTP melalui pasar output dan pasar faktor produksi.</li>
            <li><strong>Model 3 Sektor:</strong> Memasukkan peran pemerintah (RTG) yang memungut pajak dan menyalurkan subsidi serta belanja negara.</li>
            <li><strong>Model 4 Sektor (Perekonomian Terbuka):</strong> Menghubungkan seluruh sektor domestik dengan perdagangan internasional (Ekspor dan Impor).</li>
          </ul>
        `,
        keyPoints: [
          'Arus barang bergerak searah jarum jam, sedangkan arus uang bergerak berlawanan arah.',
          'Pasar input adalah tempat jual beli faktor produksi; pasar output adalah tempat jual beli barang jadi.'
        ],
        example: `
          <div class="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-indigo-900 text-xs uppercase tracking-wider mb-1">Ekspor Impor:</h5>
            <p class="text-xs text-indigo-800 leading-relaxed">
              Indonesia mengekspor kelapa sawit dan bijih nikel ke luar negeri, lalu menerima devisa uang asing. Sebaliknya, Indonesia mengimpor mesin industri canggih dari Jerman.
            </p>
          </div>
        `,
        reflection: 'Mengapa sebuah negara modern hampir mustahil menjalankan perekonomian tertutup tanpa berdagang dengan luar negeri?'
      }
    ]
  },
  {
    id: 'materi-8',
    chapterNum: 'Bab 8',
    title: 'Uang dan Lembaga Keuangan',
    category: 'Sistem Moneter',
    summary: 'Sejarah uang, fungsi asli dan turunan uang, Bank Sentral, Bank Umum, serta lembaga keuangan bukan bank.',
    duration: '35 Menit',
    icon: 'Coins',
    accentColor: 'amber',
    chapters: [
      {
        id: 'ch-8-1',
        title: 'Sejarah dan Fungsi Uang',
        duration: '11 min',
        summary: 'Dari sistem barter menuju uang komoditas, uang kertas, hingga uang digital masa kini.',
        theory: `
          <p>Sebelum mengenal uang, manusia melakukan pertukaran melalui sistem <strong>barter</strong> (tukar menukar barang). Kelemahan barter adalah sulitnya menemukan kesamaan kehendak ganda (<em>double coincidence of wants</em>).</p>
          <p>Fungsi Uang:</p>
          <p><strong>1. Fungsi Asli:</strong></p>
          <ul class="list-disc list-inside ml-2">
            <li>Sebagai alat tukar umum (medium of exchange).</li>
            <li>Sebagai satuan hitung nilai barang (unit of account).</li>
          </ul>
          <p><strong>2. Fungsi Turunan:</strong> Sebagai alat pembayaran yang sah, penyimpan kekayaan, pemindah kekayaan, dan standar pembayaran utang masa depan.</p>
        `,
        keyPoints: [
          'Syarat uang: Diterima umum, bernilai stabil, mudah dibawa, tahan lama, dan dapat dibagi tanpa mengurangi nilai.',
          'Masa kini uang berevolusi menjadi uang giral dan uang elektronik (e-money/QRIS).'
        ],
        example: `
          <div class="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-amber-900 text-xs uppercase tracking-wider mb-1">Transaksi QRIS:</h5>
            <p class="text-xs text-amber-800 leading-relaxed">
              Saat ini siswa dapat membayar jajan di kantin hanya dengan memindai kode QRIS di smartphone tanpa perlu membawa uang tunai fisik. Nilai uang tetap sah tercatat di saldo digital perbankan.
            </p>
          </div>
        `,
        reflection: 'Apakah kamu lebih suka membawa uang tunai kertas atau uang digital saat bepergian? Apa kelebihan dan risikonya?'
      },
      {
        id: 'ch-8-2',
        title: 'Peran Bank Indonesia (Bank Sentral)',
        duration: '12 min',
        summary: 'Tujuan tunggal Bank Indonesia: Mencapai dan memelihara kestabilan nilai mata uang Rupiah.',
        theory: `
          <p><strong>Bank Indonesia (BI)</strong> adalah bank sentral Republik Indonesia yang memiliki status badan hukum independen bebas dari campur tangan pemerintah dalam menjalankan tugasnya.</p>
          <p>Tiga pilar tugas utama Bank Indonesia:</p>
          <ol class="list-decimal list-inside ml-2 space-y-1">
            <li>Menetapkan dan melaksanakan <strong>kebijakan moneter</strong> (mengatur jumlah uang beredar dan suku bunga).</li>
            <li>Mengatur dan menjaga kelancaran <strong>sistem pembayaran</strong> (menerbitkan uang kartal dan regulasi transfer/kliring).</li>
            <li>Menjaga <strong>stabilitas sistem keuangan</strong> bersama OJK dan LPS.</li>
          </ol>
        `,
        keyPoints: [
          'BI tidak melayani tabungan atau pinjaman nasabah individu masyarakat umum.',
          'BI bertindak sebagai lender of the last resort bagi bank umum yang mengalami krisis likuiditas.'
        ],
        example: `
          <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-blue-900 text-xs uppercase tracking-wider mb-1">Pencetakan Uang:</h5>
            <p class="text-xs text-blue-800 leading-relaxed">
              Hanya Bank Indonesia yang memiliki hak eksklusif (hak oktroi) untuk mencetak, mengedarkan, dan mencabut uang Rupiah di seluruh wilayah NKRI.
            </p>
          </div>
        `,
        reflection: 'Mengapa negara tidak boleh mencetak uang sebanyak-banyaknya untuk membagikannya secara gratis kepada semua warga miskin?'
      },
      {
        id: 'ch-8-3',
        title: 'Otoritas Jasa Keuangan (OJK) dan Lembaga Keuangan',
        duration: '12 min',
        summary: 'Fungsi OJK mengawasi perbankan, asuransi, pasar modal, dan melindungi konsumen keuangan.',
        theory: `
          <p><strong>Otoritas Jasa Keuangan (OJK)</strong> adalah lembaga independen yang bertugas mengatur, mengawasi, memeriksa, dan menyidik seluruh kegiatan di sektor jasa keuangan (Bank, Pasar Modal, Asuransi, Dana Pensiun, dan Fintech Lending).</p>
          <p>Lembaga Keuangan Bukan Bank (LKBB):</p>
          <ul class="list-disc list-inside ml-2 space-y-1">
            <li><strong>Perusahaan Asuransi:</strong> Menanggung risiko kerugian finansial di masa depan.</li>
            <li><strong>Pegadaian:</strong> Memberikan pinjaman dana dengan jaminan barang bergerak.</li>
            <li><strong>Pasar Modal (Bursa Efek):</strong> Tempat jual beli instrumen investasi jangka panjang (saham dan obligasi).</li>
          </ul>
        `,
        keyPoints: [
          'Selalu periksa izin legalitas OJK sebelum berinvestasi atau meminjam dana di internet.',
          'OJK melindungi masyarakat dari jeratan investasi bodong dan pinjaman online ilegal.'
        ],
        example: `
          <div class="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-emerald-900 text-xs uppercase tracking-wider mb-1">Cek Legalitas Finansial:</h5>
            <p class="text-xs text-emerald-800 leading-relaxed">
              Jika ada tawaran investasi yang menjanjikan keuntungan pasti 50% setiap minggu, OJK mengingatkan prinsip 2L: Legal (berizin resmi) dan Logis (masuk akal).
            </p>
          </div>
        `,
        reflection: 'Bagaimana cara kamu mengedukasi keluarga agar tidak mudah tergiur iming-iming investasi bodong?'
      }
    ]
  },
  {
    id: 'materi-9',
    chapterNum: 'Bab 9',
    title: 'Kebijakan Ekonomi',
    category: 'Makroekonomi',
    summary: 'Memahami kebijakan fiskal pemerintah dan kebijakan moneter Bank Indonesia untuk stabilitas perekonomian.',
    duration: '30 Menit',
    icon: 'Scale',
    accentColor: 'rose',
    chapters: [
      {
        id: 'ch-9-1',
        title: 'Kebijakan Fiskal (APBN & Perpajakan)',
        duration: '15 min',
        summary: 'Pengelolaan pendapatan dan pengeluaran pemerintah melalui Anggaran Pendapatan dan Belanja Negara.',
        theory: `
          <p><strong>Kebijakan Fiskal</strong> adalah kebijakan yang diambil oleh pemerintah (Kementerian Keuangan) untuk mempengaruhi perekonomian melalui pengaturan penerimaan negara (pajak) dan pengeluaran negara (APBN).</p>
          <p>Dua jenis kebijakan fiskal:</p>
          <ul class="list-disc list-inside ml-2 space-y-1">
            <li><strong>Fiskal Ekspansif:</strong> Menurunkan pajak dan meningkatkan belanja pemerintah saat ekonomi lesu/resesi untuk menggerakkan daya beli.</li>
            <li><strong>Fiskal Kontraktif:</strong> Menaikkan pajak dan memangkas belanja pemerintah saat ekonomi mengalami overheating/inflasi tinggi.</li>
          </ul>
        `,
        keyPoints: [
          'Pajak adalah sumber penerimaan terbesar APBN Indonesia (lebih dari 75%).',
          'Pajak digunakan untuk membiayai subsidi pendidikan (BOS), jalan tol, dan fasilitas kesehatan gratis.'
        ],
        example: `
          <div class="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-rose-900 text-xs uppercase tracking-wider mb-1">Contoh Nyata Belanja Negara:</h5>
            <p class="text-xs text-rose-800 leading-relaxed">
              Bantuan Langsung Tunai (BLT) dan Kartu Indonesia Pintar (KIP) yang diterima siswa adalah contoh alokasi riil dari kebijakan fiskal pemerintah untuk pemerataan kesejahteraan.
            </p>
          </div>
        `,
        reflection: 'Sebagai calon wajib pajak di masa depan, mengapa membayar pajak dengan tertib merupakan bentuk cinta tanah air?'
      },
      {
        id: 'ch-9-2',
        title: 'Kebijakan Moneter Bank Indonesia',
        duration: '15 min',
        summary: 'Instrumen politik diskonto, operasi pasar terbuka, dan giro wajib minimum (GWM).',
        theory: `
          <p><strong>Kebijakan Moneter</strong> adalah tindakan bank sentral untuk mengatur peredaran uang dan tingkat suku bunga perbankan demi menjaga stabilitas harga dan nilai tukar.</p>
          <p>Empat instrumen moneter utama:</p>
          <ol class="list-decimal list-inside ml-2 space-y-1">
            <li><strong>Politik Diskonto:</strong> Mengatur tingkat suku bunga acuan (BI-Rate).</li>
            <li><strong>Operasi Pasar Terbuka:</strong> Menjual atau membeli Surat Berharga Negara (SBN) di pasar uang.</li>
            <li><strong>Giro Wajib Minimum (Cash Ratio):</strong> Menentukan persentase cadangan kas minimum yang wajib disimpan bank umum di BI.</li>
            <li><strong>Himbauan Moral:</strong> Komunikasi persuasif pimpinan bank sentral kepada para direktur bank umum.</li>
          </ol>
        `,
        keyPoints: [
          'Saat inflasi tinggi: BI menaikkan suku bunga agar masyarakat giat menabung dan uang beredar berkurang.',
          'Saat ekonomi lesu: BI menurunkan suku bunga agar kredit usaha bergairah dan bisnis membuka lowongan kerja.'
        ],
        example: `
          <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-blue-900 text-xs uppercase tracking-wider mb-1">Dampak Suku Bunga:</h5>
            <p class="text-xs text-blue-800 leading-relaxed">
              Ketika suku bunga tabungan bank naik dari 3% menjadi 6%, orang tua lebih memilih menyimpan uang di deposito daripada belanja konsumtif, sehingga lonjakan inflasi harga barang dapat ditekan.
            </p>
          </div>
        `,
        reflection: 'Mengapa kestabilan inflasi sangat penting bagi kelangsungan hidup masyarakat berpendapatan tetap?'
      }
    ]
  },
  {
    id: 'materi-10',
    chapterNum: 'Bab 10',
    title: 'Sistem Ekonomi',
    category: 'Sistem & Ideologi Ekonomi',
    summary: 'Perbandingan sistem ekonomi tradisional, komando/terpusat, pasar/liberal, campuran, dan Sistem Ekonomi Pancasila.',
    duration: '30 Menit',
    icon: 'Globe',
    accentColor: 'slate',
    chapters: [
      {
        id: 'ch-10-1',
        title: 'Karakteristik Sistem Ekonomi Dunia',
        duration: '15 min',
        summary: 'Perbandingan bagaimana sistem tradisional, komando, pasar bebas, dan campuran menjawab 3 masalah pokok ekonomi.',
        theory: `
          <p><strong>Sistem Ekonomi</strong> adalah seperangkat aturan dan institusi yang disepakati suatu negara untuk memecahkan tiga masalah pokok ekonomi: <em>Apa yang diproduksi (What)</em>, <em>Bagaimana memproduksi (How)</em>, dan <em>Untuk siapa diproduksi (For Whom)</em>.</p>
          <p>Perbandingan 4 Sistem Ekonomi Dunia:</p>
          <ul class="list-disc list-inside ml-2 space-y-1">
            <li><strong>Tradisional:</strong> Berdasarkan adat kebiasaan turun temurun, teknologi sederhana, barter.</li>
            <li><strong>Komando (Sosialis/Terpusat):</strong> Seluruh sumber daya dan keputusan produksi diatur mutlak oleh pemerintah pusat; kepemilikan swasta tidak diakui.</li>
            <li><strong>Pasar (Liberal/Kapitalis):</strong> Mekanisme pasar bebas sepenuhnya menentukan produksi; inisiatif swasta maksimal, peran negara sangat minim.</li>
            <li><strong>Campuran:</strong> Kombinasi antara swasta dan pemerintah; swasta bebas berbisnis namun sektor vital dan regulasi diawasi oleh negara.</li>
          </ul>
        `,
        keyPoints: [
          'Tidak ada negara yang 100% menjalankan pasar murni atau komando murni di era modern.',
          'Mayoritas negara di dunia saat ini mengadopsi variasi sistem ekonomi campuran.'
        ],
        example: `
          <div class="bg-slate-100 border-l-4 border-slate-600 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-slate-900 text-xs uppercase tracking-wider mb-1">Perbandingan Nyata:</h5>
            <p class="text-xs text-slate-700 leading-relaxed">
              Di Amerika Serikat persaingan swasta sangat dominan (condong pasar), sedangkan di Korea Utara seluruh harga dan jatah makanan ditentukan oleh negara (condong komando).
            </p>
          </div>
        `,
        reflection: 'Apa kelebihan utama kreativitas individu dalam sistem pasar bebas dibandingkan sistem komando terpusat?'
      },
      {
        id: 'ch-10-2',
        title: 'Demokrasi Ekonomi Pancasila (Pasal 33 UUD 1945)',
        duration: '15 min',
        summary: 'Landasan perekonomian Indonesia: Asas kekeluargaan, peran BUMN, koperasi, dan penguasaan bumi & air untuk rakyat.',
        theory: `
          <p>Sistem perekonomian Indonesia berlandaskan pada Pancasila dan <strong>Pasal 33 UUD 1945</strong> yang berasaskan kekeluargaan dan gotong royong:</p>
          <ul class="list-disc list-inside ml-2 space-y-1">
            <li><strong>Ayat 1:</strong> Perekonomian disusun sebagai usaha bersama berdasar atas asas kekeluargaan (Wadah: Koperasi).</li>
            <li><strong>Ayat 2:</strong> Cabang-cabang produksi yang penting bagi negara dan menguasai hajat hidup orang banyak dikuasai oleh negara (Wadah: BUMN).</li>
            <li><strong>Ayat 3:</strong> Bumi dan air dan kekayaan alam yang terkandung di dalamnya dikuasai oleh negara dan dipergunakan untuk sebesar-besar kemakmuran rakyat.</li>
            <li><strong>Ayat 4:</strong> Perekonomian nasional diselenggarakan berdasar atas demokrasi ekonomi dengan prinsip kebersamaan, efisiensi berkeadilan, dan kemandirian.</li>
          </ul>
        `,
        keyPoints: [
          'Indonesia menolak sistem persaingan bebas yang menindas (free fight liberalism) dan sistem etatisme komando yang mematikan inisiatif swasta.',
          'Tiga pilar pelaku ekonomi di Indonesia: BUMN/BUMD, BUMS (Swasta), dan Koperasi.'
        ],
        example: `
          <div class="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-2xl my-3">
            <h5 class="font-black text-emerald-900 text-xs uppercase tracking-wider mb-1">Penerapan Pasal 33 Ayat 3:</h5>
            <p class="text-xs text-emerald-800 leading-relaxed">
              Minyak bumi, gas, dan tambang emas di Indonesia dikelola dengan regulasi negara melalui BUMN seperti Pertamina agar keuntungannya dapat kembali dinikmati rakyat melalui subsidi bahan bakar dan pembangunan infrastruktur nasional.
            </p>
          </div>
        `,
        reflection: 'Bagaimana peran koperasi sekolahmu dalam mempraktikkan nilai demokrasi ekonomi gotong royong di lingkungan belajar?'
      }
    ]
  }
];
