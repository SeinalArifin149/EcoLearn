import React from 'react';
import { Wallet, PiggyBank, ShoppingCart, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';

export default function BudgetPanel({
  initialAllowance = 500000,
  totalNeeds = 0,
  totalWants = 0,
  totalSavings = 0,
  remainingBalance = 0,
  savingsRatio = 0,
  isDeficit = false,
  meetsSavingsTarget = false,
}) {
  const totalAllocated = totalNeeds + totalWants + totalSavings;
  const targetSavingsAmount = initialAllowance * 0.2; // 20%

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-100 shadow-sm space-y-6">
      
      {/* 1. Saldo & Alokasi Banner */}
      <div className={`p-5 rounded-3xl border-2 transition-all ${
        isDeficit
          ? 'bg-rose-50/80 border-rose-200 text-rose-950'
          : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/10'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
              isDeficit ? 'bg-rose-100 text-rose-600' : 'bg-white/20 text-white'
            }`}>
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <span className={`text-[11px] font-extrabold uppercase tracking-wider block ${
                isDeficit ? 'text-rose-500' : 'text-blue-200'
              }`}>
                {isDeficit ? 'Peringatan: Anggaran Defisit!' : 'Sisa Saldo Kas Siswa'}
              </span>
              <h3 className={`text-2xl sm:text-3xl font-black ${isDeficit ? 'text-rose-600' : 'text-white'}`}>
                Rp {remainingBalance.toLocaleString('id-ID')}
              </h3>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className={`text-xs font-semibold block ${isDeficit ? 'text-rose-600' : 'text-blue-100'}`}>
              Uang Saku Awal: Rp {initialAllowance.toLocaleString('id-ID')}
            </span>
            <span className={`text-[11px] font-bold block mt-0.5 ${isDeficit ? 'text-rose-500' : 'text-blue-200'}`}>
              Dialokasikan: Rp {totalAllocated.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Tiga Pos Anggaran Utama */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        
        {/* Kebutuhan (Needs) */}
        <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100">
          <div className="flex items-center justify-between text-xs font-bold text-blue-900 mb-1">
            <span>Kebutuhan Primer</span>
            <span className="text-[10px] bg-blue-200/80 text-blue-800 px-2 py-0.5 rounded-full font-black">
              Pokok
            </span>
          </div>
          <span className="text-lg font-black text-blue-800 block">
            Rp {totalNeeds.toLocaleString('id-ID')}
          </span>
          <span className="text-[11px] text-blue-600 font-semibold block">
            Makan, transport, sekolah
          </span>
        </div>

        {/* Keinginan (Wants) */}
        <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100">
          <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-1">
            <span>Keinginan (Wants)</span>
            <span className="text-[10px] bg-amber-200/80 text-amber-800 px-2 py-0.5 rounded-full font-black">
              Sekunder
            </span>
          </div>
          <span className="text-lg font-black text-amber-800 block">
            Rp {totalWants.toLocaleString('id-ID')}
          </span>
          <span className="text-[11px] text-amber-600 font-semibold block">
            Jajan, hiburan santai
          </span>
        </div>

        {/* Tabungan (Savings) */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-1">
            <span>Tabungan Masa Depan</span>
            <span className="text-[10px] bg-emerald-200/80 text-emerald-800 px-2 py-0.5 rounded-full font-black">
              {savingsRatio}%
            </span>
          </div>
          <span className="text-lg font-black text-emerald-800 block">
            Rp {totalSavings.toLocaleString('id-ID')}
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold block">
            {meetsSavingsTarget ? 'Target 20% Tercapai ✓' : `Target min Rp ${targetSavingsAmount.toLocaleString('id-ID')}`}
          </span>
        </div>

      </div>

      {/* 3. Progress Bar Target Tabungan 20% */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-600 flex items-center gap-1.5">
            <PiggyBank className="w-4 h-4 text-emerald-600" />
            Pencapaian Target Tabungan (Minimal 20% / Rp {targetSavingsAmount.toLocaleString('id-ID')}):
          </span>
          <span className={meetsSavingsTarget ? 'text-emerald-600 font-black' : 'text-amber-600 font-black'}>
            {savingsRatio}% dari uang saku
          </span>
        </div>

        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              meetsSavingsTarget ? 'bg-emerald-500' : 'bg-amber-500'
            }`}
            style={{ width: `${Math.min(100, (totalSavings / targetSavingsAmount) * 100)}%` }}
          />
        </div>
      </div>

    </div>
  );
}
