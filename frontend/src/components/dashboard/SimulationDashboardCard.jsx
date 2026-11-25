import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowRight, Play, CheckCircle2, Flame, Sparkles } from 'lucide-react';
import Button from '../common/Button';

export default function SimulationDashboardCard({ simStats }) {
  const { totalSimulations = 4, completedSimulations = 0, averageScore = 0, totalSimulationXp = 0, nextRecommended } = simStats || {};
  const progressPercent = Math.round((completedSimulations / totalSimulations) * 100);

  return (
    <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">Simulasi Ekonomi Interaktif</h3>
            <p className="text-xs text-slate-500">Eksperimen mekanisme pasar, keuangan, dan arus ekonomi</p>
          </div>
        </div>

        <Link
          to="/simulasi"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          <span>Buka Semua Simulasi</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 3 Metric Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-center">
          <span className="text-[11px] font-bold text-slate-400 block">Modul Tuntas</span>
          <span className="text-lg font-black text-blue-700">
            {completedSimulations} / {totalSimulations}
          </span>
          <div className="w-full h-1.5 bg-blue-200 rounded-full mt-1.5 overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
          <span className="text-[11px] font-bold text-slate-400 block">Rata-rata Skor</span>
          <span className="text-lg font-black text-emerald-700">
            {averageScore}%
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold block mt-1">
            Kategori: {averageScore >= 80 ? 'Sangat Baik' : averageScore > 0 ? 'Baik' : 'Belum Ada Skor'}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100 text-center">
          <span className="text-[11px] font-bold text-slate-400 block">Total Hadiah XP</span>
          <div className="inline-flex items-center gap-1 text-lg font-black text-amber-700">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-600" />
            <span>+{totalSimulationXp} XP</span>
          </div>
          <span className="text-[10px] text-amber-600 font-semibold block mt-1">
            Dari tantangan simulasi
          </span>
        </div>
      </div>

      {/* Recommended Next Simulation Banner */}
      {nextRecommended && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50/40 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                Rekomendasi Simulasi
              </span>
              <span className="text-xs font-bold text-slate-400">{nextRecommended.duration}</span>
            </div>
            <h4 className="text-sm font-black text-slate-900">{nextRecommended.title}</h4>
            <p className="text-xs text-slate-500 line-clamp-1">{nextRecommended.summary}</p>
          </div>

          <Link to={`/simulasi/${nextRecommended.slug}`} className="shrink-0">
            <Button variant="primary" size="sm" icon={Play}>
              Mulai Eksperimen
            </Button>
          </Link>
        </div>
      )}

    </div>
  );
}
