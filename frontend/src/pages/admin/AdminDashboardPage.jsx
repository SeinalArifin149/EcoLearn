import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ShieldCheck, 
  Settings, 
  ExternalLink, 
  ArrowRight, 
  Plus, 
  Sparkles,
  BarChart3,
  Layers,
  GraduationCap
} from 'lucide-react';
import { siswaService } from '../../services/siswaService';
import { adminMateriService } from '../../services/adminMateriService';
import { configService } from '../../services/configService';
import CharacterIllustration from '../../components/common/CharacterIllustration';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalSiswa: 0,
    totalAktif: 0,
    avgPretest: 0,
    avgPosttest: 0,
    avgGain: 0,
    persentaseLulus: 0,
    lulusCount: 0,
    remedialCount: 0,
  });

  const [topSiswa, setTopSiswa] = useState([]);
  const [remedialSiswa, setRemedialSiswa] = useState([]);
  const [materiList, setMateriList] = useState([]);
  const [config, setConfig] = useState(configService.getConfig());

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const s = siswaService.getStatistics();
    setStats(s);

    const allSiswa = siswaService.getAllSiswa();
    // Top 3 siswa
    const sorted = [...allSiswa].sort((a, b) => (b.posttest || 0) - (a.posttest || 0));
    setTopSiswa(sorted.slice(0, 3));

    // Remedial (< KKM)
    const kkm = configService.getConfig().kkmScore || 70;
    const needHelp = allSiswa.filter(s => (s.posttest || 0) < kkm);
    setRemedialSiswa(needHelp.slice(0, 3));

    // Materi
    setMateriList(adminMateriService.getAllMateri());
    setConfig(configService.getConfig());
  };

  return (
    <div className="space-y-5 animate-fadeIn max-w-6xl mx-auto">
      {/* 1. Hero Greeting Banner (Mobile-First Card) */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-emerald-700 text-white rounded-3xl p-5 sm:p-7 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-blue-100 text-[11px] font-bold border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Tahun Ajaran {config.academicYear} • Semester {config.semester}
            </span>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
              Selamat Datang, {config.teacherName || 'Bapak/Ibu Guru'} 👋
            </h2>

            <p className="text-xs sm:text-sm text-blue-100/90 max-w-xl leading-relaxed">
              Pantau rekapitulasi nilai evaluasi siswa, kelola materi ekonomi SMA Kelas X, dan atur tautan Padlet kelas secara terpusat.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 justify-center sm:justify-start">
              <Link
                to="/admin/siswa"
                className="px-3.5 py-2 rounded-xl bg-white text-blue-800 font-bold text-xs shadow-sm hover:bg-blue-50 transition-colors inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-blue-600" />
                Tambah / Input Siswa
              </Link>

              <Link
                to="/admin/materi"
                className="px-3.5 py-2 rounded-xl bg-blue-600/60 text-white font-bold text-xs border border-white/20 hover:bg-blue-600 transition-colors inline-flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Kelola 10 Bab Materi
              </Link>
            </div>
          </div>

          <div className="shrink-0 flex items-center justify-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center">
              <CharacterIllustration 
                expression="explaining"
                size="md"
                alt="Karakter Pengampu"
                className="drop-shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Grid (Statistik Utama) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Siswa */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Siswa</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{stats.totalSiswa}</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            ✓ {stats.totalAktif} siswa aktif belajar
          </p>
        </div>

        {/* Rata-Rata Posttest */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Rerata Posttest</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <p className="text-2xl font-black text-emerald-600">{stats.avgPosttest}</p>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            KKM: <strong className="text-slate-700">{config.kkmScore}</strong> ({stats.persentaseLulus}% tuntas)
          </p>
        </div>

        {/* Peningkatan (Gain) Rata-Rata */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Gain Peningkatan</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <p className="text-2xl font-black text-amber-600">+{stats.avgGain}</p>
            <span className="text-xs text-slate-400">Poin</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            Pre: {stats.avgPretest} → Post: {stats.avgPosttest}
          </p>
        </div>

        {/* Total Materi */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Modul Materi</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">{materiList.length}</p>
          <p className="text-[11px] text-indigo-600 font-semibold mt-1">
            Bab Ekonomi SMA Kelas X
          </p>
        </div>
      </div>

      {/* 3. Status Integrasi Padlet Kelas */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Tautan Padlet Lembar Kerja Siswa</h3>
              <p className="text-xs text-slate-400">Siswa mengakses papan Padlet ini di menu Pretest & Posttest</p>
            </div>
          </div>

          <Link
            to="/admin/konfigurasi"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 self-start sm:self-auto"
          >
            Ubah Link Padlet <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <span className="font-bold text-blue-700 block">Pretest Padlet URL:</span>
              <p className="text-slate-500 font-mono truncate text-[11px]">{config.padletPretestUrl}</p>
            </div>
            <a
              href={config.padletPretestUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300"
              title="Buka Padlet"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <span className="font-bold text-emerald-700 block">Posttest Padlet URL:</span>
              <p className="text-slate-500 font-mono truncate text-[11px]">{config.padletPosttestUrl}</p>
            </div>
            <a
              href={config.padletPosttestUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-emerald-600 hover:border-emerald-300"
              title="Buka Padlet"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* 4. Rekap Nilai: Siswa Berprestasi & Siswa Remedial */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Siswa Capaian Tertinggi */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              Siswa Nilai Tertinggi (Posttest)
            </h4>
            <Link to="/admin/siswa" className="text-xs font-bold text-blue-600 hover:underline">
              Semua ({stats.totalSiswa})
            </Link>
          </div>

          <div className="space-y-2">
            {topSiswa.map((s, idx) => (
              <div key={s.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-xs">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="font-bold text-slate-800">{s.name}</p>
                    <p className="text-[10px] text-slate-400">Kelas {s.kelas} • NISN {s.nisn}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black text-emerald-600">{s.posttest}</span>
                  <span className="text-[10px] text-slate-400 block">Pre: {s.pretest} (+{s.gain})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Siswa Perlu Pendampingan (< KKM) */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500" />
              Perlu Penguatan / Remedial ({stats.remedialCount})
            </h4>
            <span className="text-[11px] text-slate-400">Standar KKM: {config.kkmScore}</span>
          </div>

          {remedialSiswa.length === 0 ? (
            <div className="p-6 text-center text-emerald-600 font-semibold text-xs bg-emerald-50/50 rounded-2xl border border-emerald-100">
              🎉 Luar biasa! Seluruh siswa telah mencapai standar kelulusan KKM.
            </div>
          ) : (
            <div className="space-y-2">
              {remedialSiswa.map((s) => (
                <div key={s.id} className="p-3 rounded-2xl bg-rose-50/40 border border-rose-100 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-800">{s.name}</p>
                    <p className="text-[10px] text-slate-400">Kelas {s.kelas} • Butuh +{config.kkmScore - (s.posttest || 0)} poin</p>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-black text-rose-600">{s.posttest ?? '-'}</span>
                    <span className="text-[10px] text-rose-700 bg-rose-100 px-2 py-0.5 rounded font-bold block mt-0.5">
                      Remedial
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 5. Keamanan Sistem & Status Validasi Input */}
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5 text-emerald-900 font-semibold">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Keamanan Data Aktif: Seluruh formulir siswa dan materi dilindungi dengan sanitasi string anti-SQLi & anti-XSS.</span>
        </div>
        <Link
          to="/admin/konfigurasi"
          className="text-xs font-bold text-emerald-700 hover:underline shrink-0 ml-3"
        >
          Lihat Pengaturan →
        </Link>
      </div>
    </div>
  );
}
