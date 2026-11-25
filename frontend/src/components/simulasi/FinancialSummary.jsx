import React from 'react';
import { Lightbulb, ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function FinancialSummary({
  financialHealth,
  healthColor,
  advice,
  isDeficit,
  meetsSavingsTarget,
  meetsNeedsPriority,
}) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-100 shadow-sm space-y-4">
      {/* Header & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <h4 className="text-sm font-black text-slate-900">Diagnosis Kesehatan Finansial</h4>
        </div>

        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${healthColor}`}>
          {isDeficit ? (
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          ) : (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          )}
          <span>{financialHealth}</span>
        </span>
      </div>

      {/* Advice Box */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-black text-amber-900">
          <Lightbulb className="w-4 h-4 text-amber-600" />
          <span>Saran & Rekomendasi Finansial:</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
          {advice}
        </p>
      </div>

      {/* Key Principles Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
        <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
          !isDeficit ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
        }`}>
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span className="font-bold">Bebas Defisit ({!isDeficit ? 'Terpenuhi' : 'Gagal'})</span>
        </div>

        <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
          meetsSavingsTarget ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'
        }`}>
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span className="font-bold">Tabungan $\ge 20\%$ ({meetsSavingsTarget ? 'Lolos' : 'Kurang'})</span>
        </div>

        <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
          meetsNeedsPriority ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'
        }`}>
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span className="font-bold">Prioritas Kebutuhan ({meetsNeedsPriority ? 'Lolos' : 'Perlu Ditata'})</span>
        </div>
      </div>

    </div>
  );
}
