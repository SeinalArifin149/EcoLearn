import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import CharacterIllustration from '../../components/common/CharacterIllustration';
import {
  Sparkles,
  Gamepad2,
  TrendingUp,
  BookOpen,
  Trophy,
  ArrowRight,
  CheckCircle2,
  Flame,
  Star,
  Play,
  Award,
  Coins,
  Store,
  LineChart,
} from 'lucide-react';

export default function LandingPage() {
  const mainFeatures = [
    {
      icon: Gamepad2,
      color: 'from-amber-400 to-orange-500',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      title: 'Game & Kuis Interaktif',
      desc: 'Berisi kuis pilihan ganda terstruktur dan tantangan studi kasus ekonomi di setiap akhir bab.',
    },
    {
      icon: TrendingUp,
      color: 'from-emerald-400 to-teal-500',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      title: 'Simulasi Ekonomi & Pasar',
      desc: 'Pelajari konsep penentuan harga pasar, biaya peluang (opportunity cost), dan pengambilan keputusan finansial.',
    },
    {
      icon: BookOpen,
      color: 'from-purple-400 to-indigo-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      title: 'Materi Lengkap SMA',
      desc: 'Seluruh kurikulum ekonomi dirancang berjenjang dari konsep dasar, mekanisme pasar, hingga kebijakan moneter.',
    },
    {
      icon: Trophy,
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      title: 'Sistem Level & Reward',
      desc: 'Tingkatkan motivasi belajar melalui akumulasi poin XP, perolehan bintang prestasi, dan predikat Ekonom Muda.',
    },
  ];

  const topics = [
    { num: '1', title: 'Konsep Dasar Ilmu Ekonomi', desc: 'Hakikat ilmu ekonomi, prinsip, motif, dan tindakan ekonomi rasional.', color: 'bg-blue-600' },
    { num: '2', title: 'Kelangkaan & Alokasi Sumber Daya', desc: 'Memahami kelangkaan (scarcity) dan biaya peluang (opportunity cost).', color: 'bg-indigo-600' },
    { num: '3', title: 'Kebutuhan Manusia', desc: 'Klasifikasi kebutuhan primer, sekunder, tersier, dan alat pemuas kebutuhan.', color: 'bg-cyan-600' },
    { num: '4', title: 'Produksi, Distribusi, & Konsumsi', desc: 'Kegiatan ekonomi, faktor produksi, dan saluran distribusi barang & jasa.', color: 'bg-emerald-600' },
    { num: '5', title: 'Permintaan dan Penawaran', desc: 'Hukum permintaan, hukum penawaran, kurva, dan harga keseimbangan pasar.', color: 'bg-teal-600' },
    { num: '6', title: 'Pasar dan Struktur Pasar', desc: 'Pasar persaingan sempurna, monopoli, oligopoli, dan monopolistik.', color: 'bg-amber-500' },
    { num: '7', title: 'Peran Pelaku Ekonomi', desc: 'Interaksi RTK, RTP, RTG, dan RTLN dalam diagram circular flow.', color: 'bg-orange-500' },
    { num: '8', title: 'Uang dan Lembaga Keuangan', desc: 'Fungsi uang, peran Bank Indonesia, OJK, dan perbankan nasional.', color: 'bg-purple-600' },
    { num: '9', title: 'Kebijakan Ekonomi', desc: 'Instrumen kebijakan fiskal (APBN & pajak) dan kebijakan moneter.', color: 'bg-rose-500' },
    { num: '10', title: 'Sistem Ekonomi', desc: 'Sistem ekonomi tradisional, komando, pasar, campuran, dan Pancasila.', color: 'bg-slate-700' },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-sky-100/90 via-blue-50/50 to-slate-50 border-b border-slate-200/60">
        {/* Soft background glow circles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -left-20 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 -right-20 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Gamification Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 shadow-xs border border-blue-200 text-blue-800 text-xs sm:text-sm font-black tracking-wide">
                <span className="flex h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                <span>GAME EDUKASI EKONOMI SISWA SMA</span>
                <span className="text-amber-500 font-extrabold">★ ★ ★</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Petualangan Seru <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                  Belajar Ekonomi Itu Seru!
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                <strong>EcoLearn (EconomyLearn)</strong> menggabungkan materi pembelajaran ekonomi interaktif, kuis bertingkat, dan simulasi pengambilan keputusan untuk membantu siswa memahami konsep-konsep ekonomi secara mendalam, aplikatif, dan menyenangkan.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link to="/register" className="w-full sm:w-auto">
                  <Button variant="amber" size="lg" fullWidth icon={Play} className="shadow-amber-500/30">
                    Mulai Belajar Sekarang
                  </Button>
                </Link>
                <Link to="/login" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" fullWidth>
                    Masuk ke Akun
                  </Button>
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <p className="text-2xl font-black text-slate-800">100%</p>
                  <p className="text-xs font-semibold text-slate-500">Interaktif & Gamifikasi</p>
                </div>
                <div className="text-center lg:text-left border-x border-slate-200 px-2">
                  <p className="text-2xl font-black text-blue-600">10 Topik</p>
                  <p className="text-xs font-semibold text-slate-500">Materi Ekonomi Lengkap</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-2xl font-black text-amber-500">Sistem XP</p>
                  <p className="text-xs font-semibold text-slate-500">Poin & Lencana Prestasi</p>
                </div>
              </div>
            </div>

            {/* Right Mascot & Interactive Card Illustration */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md">
                
                {/* Main Card Wrapper */}
                <div className="relative bg-gradient-to-b from-white to-blue-50/50 p-6 sm:p-8 rounded-3xl border-4 border-white shadow-2xl shadow-blue-950/10">
                  
                  {/* Mascot Character Avatar (Boy & Girl Duo SMA) */}
                  <div className="relative w-full h-56 sm:h-64 mx-auto flex items-center justify-center mb-4">
                    <CharacterIllustration
                      character="duo"
                      size="xl"
                      priority
                      className="w-full h-full"
                    />
                  </div>

                  {/* Mascot Description Card */}
                  <div className="text-center space-y-2">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-100/70 px-3 py-1 rounded-full">
                      Karakter Pelajar SMA
                    </span>
                    <h3 className="text-xl font-black text-slate-900">
                      "Belajar Ekonomi itu Seru!"
                    </h3>
                    <p className="text-xs text-slate-500">
                      Pahami prinsip pasar, kelola keputusan ekonomi, dan raih predikat Ekonom Muda berprestasi!
                    </p>
                  </div>

                  {/* Floating Gamification Pill 1 */}
                  <div className="absolute -top-4 -left-4 sm:-left-6 bg-white py-2.5 px-4 rounded-2xl border-2 border-amber-200 shadow-lg flex items-center gap-2.5 animate-bounce">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                      <Coins className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400">Reward Evaluasi</p>
                      <p className="text-xs font-black text-amber-600">+50 Poin XP</p>
                    </div>
                  </div>

                  {/* Floating Gamification Pill 2 */}
                  <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white py-2.5 px-4 rounded-2xl border-2 border-blue-200 shadow-lg flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400">Pencapaian Siswa</p>
                      <p className="text-xs font-black text-blue-700">Ekonom Muda Level 1</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* KONSEP DASAR SECTION */}
      <section id="tentang" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-emerald-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-blue-200 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">
                Konsep Dasar EcoLearn (EconomyLearn)
              </span>
              <h2 className="text-3xl sm:text-4xl font-black">
                Memahami Keputusan Ekonomi dan Pengelolaan Sumber Daya
              </h2>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                <strong>EcoLearn</strong> adalah aplikasi pembelajaran ekonomi interaktif yang membantu siswa kelas X SMA memahami konsep-konsep ekonomi melalui pengalaman belajar yang menyenangkan, interaktif, dan kontekstual terhadap kehidupan sehari-hari.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-blue-100">
                <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Kurikulum Ekonomi SMA Terstandar
                </span>
                <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Berbasis Gamifikasi & Evaluasi
                </span>
                <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Kuis & Simulasi Pengambilan Keputusan
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center space-y-3 w-full max-w-xs">
                <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-900 mx-auto flex items-center justify-center font-black text-2xl shadow-md">
                  📊
                </div>
                <h4 className="font-black text-lg">Mulai Sekarang</h4>
                <p className="text-xs text-white/80">
                  Daftar akun gratis dalam 30 detik dan mulai petualangan belajarmu.
                </p>
                <Link to="/register" className="block pt-2">
                  <Button variant="amber" fullWidth size="sm">
                    Daftar Akun Baru
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FITUR UTAMA SECTION */}
      <section id="fitur" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Fitur Utama Aplikasi
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Belajar Ekonomi Secara Menyenangkan
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Dirancang khusus untuk mempermudah siswa memahami teori ekonomi melalui visualisasi, tantangan kuis, dan reward.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white p-7 rounded-3xl border-2 border-slate-100 hover:border-blue-300 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${feat.color} flex items-center justify-center text-white mb-6 shadow-md transition-transform group-hover:scale-110`}>
                    <Icon className="w-7 h-7 drop-shadow" />
                  </div>
                  <h3 className="text-lg font-black text-slate-800 mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-blue-600 gap-1 group-hover:gap-2 transition-all">
                  <span>Pelajari lebih lanjut</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* STRUKTUR TOPIK MATERI SECTION */}
      <section id="materi" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Topik Materi Ekonomi Kelas X SMA
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            10 Bab Pembelajaran Lengkap
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Semua topik dikemas dalam bentuk level atau misi yang menarik dan mudah dipahami oleh siswa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((item) => (
            <div
              key={item.num}
              className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm hover:shadow-md transition-all flex items-start gap-4"
            >
              <div className={`w-11 h-11 shrink-0 rounded-2xl ${item.color} text-white font-black text-lg flex items-center justify-center shadow-md`}>
                {item.num}
              </div>
              <div className="space-y-1.5">
                <h4 className="font-black text-slate-800 text-base">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                <div className="pt-2 flex items-center gap-1 text-[11px] font-bold text-slate-400">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>Subtopik & Kuis Evaluasi Bab</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CALL TO ACTION BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 rounded-3xl p-8 sm:p-12 text-slate-950 text-center space-y-6 shadow-xl shadow-amber-500/20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/30 backdrop-blur-xs font-black text-xs uppercase tracking-wider">
            Petualangan Belajar Menanti!
          </span>
          <h2 className="text-3xl sm:text-4xl font-black max-w-xl mx-auto leading-tight">
            Siap Menguasai Ilmu Ekonomi Bersama EcoLearn?
          </h2>
          <p className="text-sm sm:text-base font-medium text-slate-900/80 max-w-lg mx-auto">
            Bergabunglah sekarang, taklukkan setiap bab materi, raih skor tinggi pada kuis, dan buktikan kemampuanmu!
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button variant="primary" size="lg" className="shadow-lg">
                Daftar Akun Gratis Sekarang
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Sudah Punya Akun? Masuk
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
