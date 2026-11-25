import React from 'react';
import { History, TrendingUp, CheckCircle, Package } from 'lucide-react';

export default function MarketSummary({ transactions = [], role = 'seller' }) {
  const successfulDeals = transactions.filter((t) => t.isAccepted);
  const totalRevenue = successfulDeals.reduce((acc, t) => acc + (t.revenue || 0), 0);
  const totalCost = successfulDeals.reduce((acc, t) => acc + (t.totalCost || 0), 0);
  const totalProfit = totalRevenue - totalCost;
  const totalSpending = successfulDeals.reduce((acc, t) => acc + (t.totalSpending || 0), 0);
  const totalSavings = successfulDeals.reduce((acc, t) => acc + (t.savings || 0), 0);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-100 shadow-sm space-y-5">
      
      {/* Header & Metrics */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-slate-500" />
          <h4 className="text-sm font-black text-slate-900">Rekapitulasi Pasar</h4>
        </div>
        <span className="text-xs font-bold text-slate-400">
          {successfulDeals.length} dari {transactions.length} Transaksi Deal
        </span>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
          <span className="text-[10px] font-bold text-slate-400 block">Transaksi Sukses</span>
          <span className="text-lg font-black text-slate-800">{successfulDeals.length}</span>
        </div>

        {role === 'seller' ? (
          <>
            <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100 text-center">
              <span className="text-[10px] font-bold text-slate-400 block">Total Omzet</span>
              <span className="text-sm sm:text-base font-black text-blue-700">
                Rp {totalRevenue.toLocaleString('id-ID')}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
              <span className="text-[10px] font-bold text-slate-400 block">Laba Bersih</span>
              <span className={`text-sm sm:text-base font-black ${totalProfit >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                Rp {totalProfit.toLocaleString('id-ID')}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100 text-center">
              <span className="text-[10px] font-bold text-slate-400 block">Total Belanja</span>
              <span className="text-sm sm:text-base font-black text-blue-700">
                Rp {totalSpending.toLocaleString('id-ID')}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
              <span className="text-[10px] font-bold text-slate-400 block">Total Penghematan</span>
              <span className="text-sm sm:text-base font-black text-emerald-700">
                Rp {totalSavings.toLocaleString('id-ID')}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Transaction History Rows */}
      <div className="space-y-2">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
          Riwayat Tawar Menawar:
        </span>

        {transactions.length === 0 ? (
          <div className="p-4 rounded-2xl bg-slate-50 text-center text-xs text-slate-400">
            Belum ada transaksi yang dilakukan. Silakan tentukan harga dan ajukan penawaran.
          </div>
        ) : (
          <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
            {transactions.map((tx, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-900 block">
                    {tx.commodity?.name || 'Komoditas'}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {role === 'seller' ? `Pembeli: ${tx.partnerName}` : `Penjual: ${tx.partnerName}`}
                  </span>
                </div>

                <div className="text-right">
                  <span className={`font-black ${tx.isAccepted ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {tx.isAccepted ? `Deal Rp ${tx.dealPrice?.toLocaleString('id-ID')}` : 'Gagal Sepakat'}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    Tawaran: Rp {tx.proposedPrice?.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
