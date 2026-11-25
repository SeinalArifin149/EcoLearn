import React from 'react';
import { Lightbulb, Scale, AlertTriangle, CheckCircle2, TrendingUp, TrendingDown } from 'lucide-react';

export default function EquilibriumResult({
  qDemand,
  qSupply,
  difference,
  marketStatus,
  statusLabel,
  statusColor,
  explanation,
  equilibriumPrice,
  equilibriumQuantity,
}) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-100 shadow-sm space-y-5">
      {/* Status Badge & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900">Analisis Keseimbangan Pasar</h4>
            <p className="text-[11px] text-slate-400 font-medium">Interaksi jumlah permintaan dan penawaran</p>
          </div>
        </div>

        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${statusColor}`}>
          {marketStatus === 'equilibrium' ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          )}
          <span>{statusLabel}</span>
        </span>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Permintaan (Qd) */}
        <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-center">
          <span className="text-[11px] font-bold text-slate-400 block mb-0.5">Permintaan (Qd)</span>
          <span className="text-xl sm:text-2xl font-black text-blue-700">{qDemand}</span>
          <span className="text-[10px] font-semibold text-slate-400 block">kg beras</span>
        </div>

        {/* Penawaran (Qs) */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
          <span className="text-[11px] font-bold text-slate-400 block mb-0.5">Penawaran (Qs)</span>
          <span className="text-xl sm:text-2xl font-black text-emerald-700">{qSupply}</span>
          <span className="text-[10px] font-semibold text-slate-400 block">kg beras</span>
        </div>

        {/* Selisih Pasar */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
          <span className="text-[11px] font-bold text-slate-400 block mb-0.5">Selisih (Qd - Qs)</span>
          <span className={`text-xl sm:text-2xl font-black ${
            difference === 0 ? 'text-emerald-600' : difference > 0 ? 'text-rose-600' : 'text-amber-600'
          }`}>
            {difference > 0 ? `+${difference}` : difference}
          </span>
          <span className="text-[10px] font-semibold text-slate-400 block">unit selisih</span>
        </div>

        {/* Target Ekuilibrium */}
        <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100 text-center">
          <span className="text-[11px] font-bold text-slate-400 block mb-0.5">Titik Ekuilibrium</span>
          <span className="text-sm sm:text-base font-black text-amber-900 block pt-0.5">
            Rp {(equilibriumPrice / 1000).toFixed(0)}k
          </span>
          <span className="text-[10px] font-semibold text-slate-400 block">{equilibriumQuantity} unit</span>
        </div>
      </div>

      {/* Dynamic Educational Explanation Box */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/60 border border-blue-200/80 space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-black text-blue-900">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span>Penjelasan Konsep Ekonomi:</span>
        </div>
        <p className="text-xs sm:text-sm text-blue-950 font-medium leading-relaxed">
          {explanation}
        </p>
      </div>

    </div>
  );
}
