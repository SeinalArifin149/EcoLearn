import React from 'react';
import { BookOpen, CheckCircle, Clock, BookCheck, TrendingUp } from 'lucide-react';

export default function MateriProgressOverview({ stats }) {
  const { totalMateri, completed, inProgress, notStarted, overallPercentage } = stats;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-sm space-y-6">
      
      {/* Top Title & Percentage Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Ringkasan Progress Belajar Kamu
          </h3>
          <p className="text-xs text-slate-500">
            Pantau perkembangan pemahamanmu terhadap seluruh 10 bab ekonomi SMA Kelas X.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 w-fit">
          <span className="text-xs font-bold text-slate-600">Total Progres:</span>
          <span className="text-xl font-black text-blue-600">{overallPercentage}%</span>
        </div>
      </div>

      {/* Overarching Progress Bar */}
      <div className="space-y-1.5">
        <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 rounded-full transition-all duration-700"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
      </div>

      {/* 4 Stats Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-1">
        
        {/* Total Materi */}
        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-left">
          <div className="flex items-center justify-between mb-1">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span className="text-[10px] font-black uppercase text-blue-500">Total</span>
          </div>
          <p className="text-2xl font-black text-blue-900">{totalMateri}</p>
          <p className="text-xs font-bold text-blue-700">Topik Materi</p>
        </div>

        {/* Materi Selesai */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-left">
          <div className="flex items-center justify-between mb-1">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-black uppercase text-emerald-500">Tuntas</span>
          </div>
          <p className="text-2xl font-black text-emerald-900">{completed}</p>
          <p className="text-xs font-bold text-emerald-700">Materi Selesai</p>
        </div>

        {/* Sedang Berjalan */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-left">
          <div className="flex items-center justify-between mb-1">
            <Clock className="w-4 h-4 text-amber-600" />
            <span className="text-[10px] font-black uppercase text-amber-500">Aktif</span>
          </div>
          <p className="text-2xl font-black text-amber-900">{inProgress}</p>
          <p className="text-xs font-bold text-amber-700">Sedang Dipelajari</p>
        </div>

        {/* Belum Dipelajari */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left">
          <div className="flex items-center justify-between mb-1">
            <BookCheck className="w-4 h-4 text-slate-400" />
            <span className="text-[10px] font-black uppercase text-slate-400">Antrean</span>
          </div>
          <p className="text-2xl font-black text-slate-700">{notStarted}</p>
          <p className="text-xs font-bold text-slate-500">Belum Dimulai</p>
        </div>

      </div>

    </div>
  );
}
