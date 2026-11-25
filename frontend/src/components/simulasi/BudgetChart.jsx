import React from 'react';
import { PieChart } from 'lucide-react';

export default function BudgetChart({
  totalNeeds = 0,
  totalWants = 0,
  totalSavings = 0,
  remainingBalance = 0,
  initialAllowance = 500000,
}) {
  const safeAllowance = Math.max(1, initialAllowance);
  const safeRemaining = Math.max(0, remainingBalance);

  const pctNeeds = Math.max(0, Math.round((totalNeeds / safeAllowance) * 100));
  const pctWants = Math.max(0, Math.round((totalWants / safeAllowance) * 100));
  const pctSavings = Math.max(0, Math.round((totalSavings / safeAllowance) * 100));
  const pctRemaining = Math.max(0, Math.round((safeRemaining / safeAllowance) * 100));

  // Visual SVG Donut segments calculations
  const total = totalNeeds + totalWants + totalSavings + safeRemaining;
  const radius = 55;
  const circumference = 2 * Math.PI * radius;

  const getStrokeDash = (amount) => {
    if (total <= 0) return `0 ${circumference}`;
    const ratio = Math.max(0, amount) / total;
    const strokeLength = ratio * circumference;
    return `${strokeLength} ${circumference - strokeLength}`;
  };

  const offsetNeeds = 0;
  const offsetWants = -((totalNeeds / (total || 1)) * circumference);
  const offsetSavings = -(
    ((totalNeeds + totalWants) / (total || 1)) *
    circumference
  );
  const offsetRemaining = -(
    ((totalNeeds + totalWants + totalSavings) / (total || 1)) *
    circumference
  );

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-100 shadow-sm space-y-5">
      {/* Header */}
      <div className="pb-3 border-b border-slate-100">
        <h4 className="text-sm font-black text-slate-900">Komposisi Alokasi Anggaran</h4>
        <p className="text-[11px] text-slate-400 font-medium">Distribusi proporsional penggunaan uang saku</p>
      </div>

      {/* Donut Chart & Percentages */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        
        {/* SVG Donut */}
        <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
            {/* Background ring */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="transparent"
              stroke="#F1F5F9"
              strokeWidth="20"
            />
            {/* Needs segment */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="transparent"
              stroke="#2563EB"
              strokeWidth="20"
              strokeDasharray={getStrokeDash(totalNeeds)}
              strokeDashoffset={offsetNeeds}
            />
            {/* Wants segment */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="transparent"
              stroke="#F59E0B"
              strokeWidth="20"
              strokeDasharray={getStrokeDash(totalWants)}
              strokeDashoffset={offsetWants}
            />
            {/* Savings segment */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="transparent"
              stroke="#10B981"
              strokeWidth="20"
              strokeDasharray={getStrokeDash(totalSavings)}
              strokeDashoffset={offsetSavings}
            />
            {/* Remaining segment */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="transparent"
              stroke="#94A3B8"
              strokeWidth="20"
              strokeDasharray={getStrokeDash(safeRemaining)}
              strokeDashoffset={offsetRemaining}
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tabungan</span>
            <span className="text-xl font-black text-emerald-600">{pctSavings}%</span>
          </div>
        </div>

        {/* Legend Breakdown */}
        <div className="space-y-2 text-xs font-bold flex-1 w-full sm:w-auto">
          <div className="flex items-center justify-between p-2 rounded-xl bg-blue-50/70 border border-blue-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-600" />
              <span className="text-slate-700">Kebutuhan (Needs)</span>
            </div>
            <span className="text-blue-700 font-black">{pctNeeds}%</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-amber-50/70 border border-amber-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-slate-700">Keinginan (Wants)</span>
            </div>
            <span className="text-amber-700 font-black">{pctWants}%</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50/70 border border-emerald-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-slate-700">Tabungan Masa Depan</span>
            </div>
            <span className="text-emerald-700 font-black">{pctSavings}%</span>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-400" />
              <span className="text-slate-700">Sisa Kas Tersedia</span>
            </div>
            <span className="text-slate-600 font-black">{pctRemaining}%</span>
          </div>
        </div>

      </div>

    </div>
  );
}
