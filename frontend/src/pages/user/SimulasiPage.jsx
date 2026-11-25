import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { simulationService } from '../../services/simulationService';
import {
  LineChart,
  Store,
  Wallet,
  RefreshCw,
  Clock,
  Award,
  Sparkles,
  Flame,
  ArrowRight,
  CheckCircle2,
  Play,
  History,
} from 'lucide-react';
import Button from '../../components/common/Button';
import CharacterIllustration from '../../components/common/CharacterIllustration';

const iconMap = {
  LineChart,
  Store,
  Wallet,
  RefreshCw,
};

export default function SimulasiPage() {
  const { user } = useAuth();
  const userId = user?.id || 'usr-001';
  const navigate = useNavigate();

  // Ambil data daftar simulasi dengan progres pengguna
  const simulations = useMemo(() => {
    return simulationService.getSimulationList(userId);
  }, [userId]);

  // Statistik simulasi
  const stats = useMemo(() => {
    return simulationService.getSimulationStats(userId);
  }, [userId]);

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* 1. Header Banner dengan Karakter Edukasi */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-800 via-teal-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-teal-900/15">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-xs text-emerald-200 text-xs font-black tracking-wide border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>LABORATORIUM EKSPERIMEN EKONOMI SISWA</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              Katalog Simulasi Ekonomi
            </h1>

            <p className="text-xs sm:text-sm text-teal-100 max-w-xl leading-relaxed">
              Eksperimenkan teori ekonomi menjadi keputusan nyata! Uji hukum pasar, tawar-menawar transaksi, pengelolaan uang saku, dan mata rantai kegiatan ekonomi secara interaktif.
            </p>

            {/* Quick Stats Pill */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-bold text-teal-100">
              <span className="bg-black/25 px-3.5 py-1.5 rounded-xl border border-white/10">
                🎮 Total: <strong>{stats.totalSimulations} Simulasi</strong>
              </span>
              <span className="bg-black/25 px-3.5 py-1.5 rounded-xl border border-white/10 text-emerald-300">
                ✓ Selesai: <strong>{stats.completedSimulations} Modul</strong>
              </span>
              <span className="bg-black/25 px-3.5 py-1.5 rounded-xl border border-white/10 text-amber-300 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-amber-300" />
                <span>+{stats.totalSimulationXp} XP Diperoleh</span>
              </span>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center">
            <CharacterIllustration
              expression="explaining"
              size="lg"
              alt="Karakter Siswa Menjelaskan Simulasi"
              className="drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* 2. Grid Kartu 4 Simulasi Utama */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900">Pilih Modul Simulasi</h3>
            <p className="text-xs text-slate-500">Pilih skenario ekonomi yang ingin kamu eksplorasi hari ini</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {simulations.map((sim) => {
            const Icon = iconMap[sim.icon] || LineChart;
            const isCompleted = sim.status === 'Selesai';
            const isInProgress = sim.status === 'Sedang Berlangsung';

            return (
              <div
                key={sim.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold shadow-2xs group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                          {sim.category}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-black px-3 py-1 rounded-full border ${
                        isCompleted
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : isInProgress
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-slate-50 text-slate-500 border-slate-200'
                      }`}
                    >
                      {isCompleted ? 'Selesai ✓' : isInProgress ? 'Sedang Dimainkan' : 'Belum Dimulai'}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <div>
                    <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      {sim.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-1">
                      {sim.summary}
                    </p>
                  </div>

                  {/* Learning Objectives Preview */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
                      Target Pembelajaran:
                    </span>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {sim.learningObjectives.slice(0, 2).map((obj, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                          <span className="truncate">{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Duration & Score if completed */}
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {sim.duration}
                    </span>
                    {isCompleted && (
                      <span className="text-emerald-600 font-black">
                        Skor Terbaik: {sim.bestScore}/100
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-2 border-t border-slate-100">
                  <Link to={`/simulasi/${sim.slug}`} className="block">
                    <Button
                      variant={isCompleted ? 'outline' : 'primary'}
                      fullWidth
                      icon={isCompleted ? CheckCircle2 : Play}
                    >
                      {isCompleted ? 'Eksperimen Ulang' : isInProgress ? 'Lanjutkan Simulasi' : 'Mulai Simulasi'}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Riwayat Aktivitas Eksperimen Terkini */}
      {stats.recentHistory && stats.recentHistory.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <History className="w-4 h-4 text-blue-600" />
              Riwayat Eksperimen Terakhir
            </h4>
            <span className="text-xs font-bold text-slate-400">
              {stats.recentHistory.length} sesi tercatat
            </span>
          </div>

          <div className="space-y-2">
            {stats.recentHistory.map((h) => (
              <div
                key={h.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
              >
                <div>
                  <h5 className="font-bold text-slate-900">{h.simTitle}</h5>
                  <span className="text-[10px] text-slate-400">
                    Selesai: {new Date(h.completedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-black text-blue-600 block">Skor: {h.score}/100</span>
                  <span className="text-[10px] font-bold text-amber-600">+{h.xpEarned} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
