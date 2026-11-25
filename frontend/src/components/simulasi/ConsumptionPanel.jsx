import React from 'react';
import { ShoppingBag, Users, CheckCircle2, DollarSign, Sparkles } from 'lucide-react';
import Button from '../common/Button';

export default function ConsumptionPanel({
  isDistributed = false,
  isConsumed = false,
  totalUnits = 50,
  wholesalePricePerUnit = 5000,
  retailPricePerUnit = 6500,
  consumerSpending = 0,
  retailerProfit = 0,
  totalValueAdded = 0,
  onConsume,
}) {
  return (
    <div className={`bg-white rounded-3xl p-5 sm:p-6 border-2 shadow-sm space-y-6 transition-all ${
      !isDistributed ? 'opacity-60 border-slate-200' : 'border-slate-100'
    }`}>
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900">Tahap 3: Konsumsi Pasar</h4>
            <p className="text-[11px] text-slate-400 font-medium">Pemenuhan kebutuhan konsumen akhir</p>
          </div>
        </div>

        <span className={`text-xs font-black px-3 py-1 rounded-full border ${
          isConsumed
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : isDistributed
            ? 'bg-purple-50 text-purple-700 border-purple-200'
            : 'bg-slate-100 text-slate-400 border-slate-200'
        }`}>
          {isConsumed ? 'Konsumsi Tuntas ✓' : isDistributed ? 'Toko Ritel Buka' : 'Menunggu Distribusi'}
        </span>
      </div>

      {/* Rincian Konsumsi */}
      <div className="space-y-4">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Harga Beli Toko dari Distributor:</span>
            <span className="font-bold text-slate-800">
              Rp {wholesalePricePerUnit.toLocaleString('id-ID')} / pcs
            </span>
          </div>

          <div className="flex justify-between text-slate-600">
            <span>Harga Jual Eceran ke Konsumen:</span>
            <span className="font-black text-purple-700">
              Rp {retailPricePerUnit.toLocaleString('id-ID')} / pcs
            </span>
          </div>

          <div className="flex justify-between text-slate-600">
            <span>Total Pengeluaran Belanja Konsumen:</span>
            <span className="font-bold text-slate-800">
              Rp {consumerSpending.toLocaleString('id-ID')}
            </span>
          </div>

          {/* Laba Ritel & Nilai Tambah */}
          <div className="pt-2 border-t border-slate-300 flex items-center justify-between font-black text-slate-900">
            <span>Keuntungan Toko Ritel:</span>
            <span className="text-sm text-emerald-700">
              +Rp {retailerProfit.toLocaleString('id-ID')}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-500 font-bold text-[11px]">
            <span>Total Nilai Tambah Ekonomi (Value Added):</span>
            <span className="text-blue-700 font-black">
              Rp {totalValueAdded.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div>
        <Button
          variant={isConsumed ? 'outline' : 'primary'}
          icon={CheckCircle2}
          fullWidth
          onClick={onConsume}
          disabled={!isDistributed || isConsumed}
        >
          {isConsumed ? 'Semua Roti Laku Terjual ke Konsumen ✓' : `Jual ${totalUnits} Roti ke Konsumen Akhir`}
        </Button>
      </div>

    </div>
  );
}
