// Data Konfigurasi dan Skenario Simulasi Ekonomi Interaktif EcoLearn (EconomyLearn)
// 4 Simulasi Utama untuk Siswa SMA Kelas X

export const simulationList = [
  {
    id: 'sim-supply-demand',
    title: 'Simulasi Permintaan & Penawaran',
    slug: 'permintaan-penawaran',
    category: 'Mekanisme Pasar',
    accentColor: 'blue',
    icon: 'LineChart',
    duration: '10-15 Menit',
    summary: 'Eksperimen pembentukan harga keseimbangan pasar beras melalui kurva permintaan dan penawaran interaktif.',
    learningObjectives: [
      'Memahami pengaruh tingkat harga terhadap jumlah permintaan (Qd) dan penawaran (Qs)',
      'Mengamati pergeseran kurva akibat faktor nonharga (pendapatan, biaya produksi, teknologi)',
      'Menemukan titik keseimbangan pasar (Equilibrium: Qd = Qs)',
      'Menganalisis kondisi shortage (kelebihan permintaan) dan surplus (kelebihan penawaran)',
    ],
    defaultParameters: {
      marketName: 'Pasar Beras Nasional',
      productName: 'Beras Medium (per kg)',
      baseA: 120, // konstanta permintaan
      baseB: 0.005, // sensitivitas harga permintaan
      baseC: 20, // konstanta penawaran
      baseD: 0.005, // sensitivitas harga penawaran
      minPrice: 6000,
      maxPrice: 18000,
      defaultPrice: 10000,
      priceStep: 500,
      initialIncome: 100, // 100%
      initialBuyers: 100, // 100%
      initialCost: 100, // 100%
      initialTech: 100, // 100%
    },
    challenges: [
      {
        id: 'c-sd-1',
        title: 'Temukan Titik Keseimbangan (Equilibrium)',
        description: 'Sesuaikan harga pasar hingga jumlah permintaan (Qd) sama persis dengan jumlah penawaran (Qs).',
        targetCondition: 'equilibrium',
        points: 40,
      },
      {
        id: 'c-sd-2',
        title: 'Ciptakan Kondisi Kelebihan Permintaan (Shortage)',
        description: 'Atur harga pasar agar jumlah permintaan lebih besar daripada penawaran (Qd > Qs minimal selisih 15 unit).',
        targetCondition: 'shortage',
        points: 30,
      },
      {
        id: 'c-sd-3',
        title: 'Ciptakan Kondisi Kelebihan Penawaran (Surplus)',
        description: 'Atur harga pasar agar pasokan produsen melebihi daya beli konsumen (Qs > Qd minimal selisih 15 unit).',
        targetCondition: 'surplus',
        points: 30,
      },
    ],
  },
  {
    id: 'sim-market',
    title: 'Simulasi Pasar (Penjual & Pembeli)',
    slug: 'pasar',
    category: 'Transaksi & Harga',
    accentColor: 'emerald',
    icon: 'Store',
    duration: '10-15 Menit',
    summary: 'Praktik tawar menawar dan transaksi jual beli nyata sebagai Penjual atau Pembeli di pasar komoditas.',
    learningObjectives: [
      'Memahami mekanisme tawar-menawar dalam pembentukan harga kesepakatan',
      'Menghitung pendapatan, total biaya produksi, dan margin laba bersih bagi penjual',
      'Mengelola alokasi anggaran belanja dan sisa uang bagi pembeli',
      'Menilai pengaruh preferensi pembeli virtual terhadap keberhasilan transaksi',
    ],
    commodities: [
      {
        id: 'beras',
        name: 'Beras Premium (5 kg)',
        productionCost: 55000,
        suggestedPrice: 70000,
        minAcceptableSeller: 58000,
        maxBuyerBudget: 80000,
        icon: 'Package',
      },
      {
        id: 'buku',
        name: 'Paket Buku Tulis Sekolah (10 pcs)',
        productionCost: 28000,
        suggestedPrice: 40000,
        minAcceptableSeller: 32000,
        maxBuyerBudget: 48000,
        icon: 'BookOpen',
      },
      {
        id: 'roti',
        name: 'Roti Gandum Manis (per bungkus)',
        productionCost: 6000,
        suggestedPrice: 10000,
        minAcceptableSeller: 7000,
        maxBuyerBudget: 12000,
        icon: 'Coffee',
      },
      {
        id: 'air',
        name: 'Air Mineral Galon (19 L)',
        productionCost: 12000,
        suggestedPrice: 19000,
        minAcceptableSeller: 14000,
        maxBuyerBudget: 22000,
        icon: 'Droplet',
      },
    ],
    virtualBuyers: [
      {
        id: 'buyer-1',
        name: 'Pak Budi (Pedagang Hemat)',
        avatar: '👨‍💼',
        personality: 'Cermat dan menawar ketat',
        willingnessPercent: 0.92, // menawar di bawah harga acuan
      },
      {
        id: 'buyer-2',
        name: 'Ibu Ratna (Ibu Rumah Tangga)',
        avatar: '👩‍🦰',
        personality: 'Rasional dan mengikuti harga pasar',
        willingnessPercent: 1.0, // harga wajar
      },
      {
        id: 'buyer-3',
        name: 'Kak Dito (Mahasiswa Terburu-buru)',
        avatar: '🧑‍🎓',
        personality: 'Fleksibel, mementingkan kecepatan beli',
        willingnessPercent: 1.12, // bersedia bayar lebih tinggi
      },
    ],
    challenges: [
      {
        id: 'c-mkt-1',
        title: 'Selesaikan 3 Transaksi Berhasil',
        description: 'Capai kesepakatan harga dan tuntaskan minimal 3 transaksi jual-beli.',
        targetCondition: 'transactions_count',
        targetValue: 3,
        points: 40,
      },
      {
        id: 'c-mkt-2',
        title: 'Raih Laba Bersih Positif',
        description: 'Dapatkan akumulasi laba bersih minimal Rp 30.000 tanpa menjual di bawah harga pokok.',
        targetCondition: 'min_profit',
        targetValue: 30000,
        points: 30,
      },
      {
        id: 'c-mkt-3',
        title: 'Efisiensi Transaksi Pembeli',
        description: 'Sebagai pembeli, berhasil membeli barang dengan harga di bawah batas anggaran maksimum.',
        targetCondition: 'buyer_bargain',
        points: 30,
      },
    ],
  },
  {
    id: 'sim-finance',
    title: 'Simulasi Pengelolaan Keuangan',
    slug: 'keuangan',
    category: 'Manajemen Finansial',
    accentColor: 'amber',
    icon: 'Wallet',
    duration: '10-15 Menit',
    summary: 'Kelola anggaran uang saku bulanan Rp 500.000 secara bijak berdasarkan skala prioritas dan target menabung.',
    learningObjectives: [
      'Membedakan pos pengeluaran kebutuhan (needs) dengan keinginan (wants)',
      'Menyusun skala prioritas alokasi uang saku siswa',
      'Menerapkan prinsip menabung minimal 20% sejak awal penerimaan uang',
      'Mencegah terjadinya defisit atau pengeluaran melebihi anggaran',
    ],
    initialAllowance: 500000,
    categories: [
      { id: 'makan', name: 'Makanan & Bekal Sekolah', defaultType: 'kebutuhan', icon: 'Utensils' },
      { id: 'transpor', name: 'Ongkos Transportasi', defaultType: 'kebutuhan', icon: 'Bus' },
      { id: 'pendidikan', name: 'Buku & Alat Tulis', defaultType: 'kebutuhan', icon: 'BookOpen' },
      { id: 'komunikasi', name: 'Paket Data / Internet', defaultType: 'kebutuhan', icon: 'Wifi' },
      { id: 'hiburan', name: 'Jajan & Hiburan Teman', defaultType: 'keinginan', icon: 'Film' },
      { id: 'tabungan', name: 'Tabungan Masa Depan', defaultType: 'tabungan', icon: 'PiggyBank' },
      { id: 'lainnya', name: 'Pengeluaran Lain-lain', defaultType: 'keinginan', icon: 'ShoppingBag' },
    ],
    challenges: [
      {
        id: 'c-fin-1',
        title: 'Target Tabungan Disiplin (≥ 20%)',
        description: 'Alokasikan minimal 20% (Rp 100.000) dari total uang saku ke pos Tabungan.',
        targetCondition: 'savings_ratio',
        targetValue: 20,
        points: 40,
      },
      {
        id: 'c-fin-2',
        title: 'Skala Prioritas Kebutuhan Utama',
        description: 'Pastikan alokasi pos Kebutuhan Primer minimal 60% dari total pengeluaran belanja.',
        targetCondition: 'needs_priority',
        targetValue: 60,
        points: 30,
      },
      {
        id: 'c-fin-3',
        title: 'Bebas Defisit & Anggaran Sehat',
        description: 'Kelola keuangan hingga sisa saldo tidak minus (≥ 0) dan tidak terjadi kelebihan anggaran.',
        targetCondition: 'no_deficit',
        points: 30,
      },
    ],
  },
  {
    id: 'sim-circular-flow',
    title: 'Simulasi Kegiatan Ekonomi',
    slug: 'kegiatan-ekonomi',
    category: 'Arus Lingkar Ekonomi',
    accentColor: 'purple',
    icon: 'RefreshCw',
    duration: '10-15 Menit',
    summary: 'Jalankan rantai kegiatan ekonomi terintegrasi dari produksi pabrik, distribusi logistik, hingga konsumsi pasar.',
    learningObjectives: [
      'Memahami alur perubahan nilai tambah dari input bahan baku menjadi output produk siap konsumsi',
      'Mengenal peran produsen, distributor, dan konsumen dalam rantai ekonomi',
      'Mengamati hubungan timbal balik arus barang fisik dan arus uang pembayaran',
      'Menghitung keuntungan di setiap tahapan kegiatan ekonomi',
    ],
    scenario: {
      enterpriseName: 'Industri Roti Manis EcoBakery',
      productName: 'Roti Cokelat Keju',
      rawMaterials: [
        { id: 'tepung', name: 'Tepung Terigu Protein Tinggi', costPerUnit: 12000, requiredPerBatch: 2 }, // 24.000
        { id: 'telur', name: 'Telur Ayam & Mentega', costPerUnit: 15000, requiredPerBatch: 1 }, // 15.000
        { id: 'cokelat', name: 'Isian Cokelat & Keju', costPerUnit: 18000, requiredPerBatch: 1 }, // 18.000
      ],
      laborCostPerBatch: 20000, // ongkos tenaga kerja
      outputUnitsPerBatch: 25, // 1 batch = 25 bungkus roti
      distributorLogisticsCost: 15000, // biaya angkut per 25 pcs
      suggestedRetailPrice: 6000, // harga eceran per roti
    },
    challenges: [
      {
        id: 'c-flow-1',
        title: 'Tuntaskan Produksi Efisien',
        description: 'Beli bahan baku dan produksi minimal 2 batch (50 unit roti) dengan perhitungan HPP tepat.',
        targetCondition: 'production_batches',
        targetValue: 2,
        points: 35,
      },
      {
        id: 'c-flow-2',
        title: 'Distribusi Logistik Tepat Waktu',
        description: 'Salurkan seluruh stok roti ke distributor dan tetapkan margin grosir sehat.',
        targetCondition: 'distributed_all',
        points: 35,
      },
      {
        id: 'c-flow-3',
        title: 'Penjualan Konsumen Menguntungkan',
        description: 'Jual habis stok roti ke konsumen akhir dan capai laba bersih kumulatif positif.',
        targetCondition: 'profitable_cycle',
        points: 30,
      },
    ],
  },
];

export function getSimulationById(idOrSlug) {
  if (!idOrSlug) return simulationList[0];
  const query = String(idOrSlug).toLowerCase().trim();
  return (
    simulationList.find(
      (s) => s.id === query || s.slug === query || s.id === `sim-${query}`
    ) || simulationList[0]
  );
}
