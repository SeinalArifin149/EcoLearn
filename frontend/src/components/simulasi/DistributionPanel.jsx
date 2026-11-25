import React from 'react';
import { Truck, Store, DollarSign, CheckCircle2 } from 'lucide-react';
import Button from '../common/Button';

export default function DistributionPanel({
  isProduced = false,
  isDistributed = false,
  totalUnits = 50,
  factoryPricePerUnit = 4000,
  distributorMarkup = 1000,
  distributorLogisticsTotal = 30000,
  wholesalePricePerUnit = 5000,
  distributorRevenue = 0,
  distributorProfit = 0,
  onMarkupChange,
  onDistribute,
}) {
  return (
    <div className={`bg-white rounded-3xl p-5 sm:p-6 border-2 shadow-sm space-y-6 transition-all ${
      !isProduced ? 'opacity-60 border-slate-200' : 'border-slate-100'
    }`}>
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900">Tahap 2: Distribusi Logistik</h4>
            <p className="text-[11px] text-slate-400 font-medium">Pengangkutan & penyaluran ke toko ritel</p>
          </div>
        </div>

        <span className={`text-xs font-black px-3 py-1 rounded-full border ${
          isDistributed
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : isProduced
            ? 'bg-amber-50 text-amber-700 border-amber-200'
            : 'bg-slate-100 text-slate-400 border-slate-200'
        }`}>
          {isDistributed ? 'Tersalurkan ✓' : isProduced ? 'Siap Angkut' : 'Menunggu Produksi'}
        </span>
      </div>

      {/* Rincian Logistik & Margin Grosir */}
      <div className="space-y-4">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
          <div className="flex justify-between text-slate-600">
            <span>Harga Beli dari Pabrik (per roti):</span>
            <span className="font-bold text-slate-800">
              Rp {factoryPricePerUnit.toLocaleString('id-ID')}
            </span>
          </div>

          <div className="flex justify-between text-slate-600">
            <span>Biaya Logistik & Armada Angkut:</span>
            <span className="font-bold text-slate-800">
              Rp {distributorLogisticsTotal.toLocaleString('id-ID')}
            </span>
          </div>

          {/* Slider Margin Grosir */}
          <div className="pt-2 border-t border-slate-200 space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Margin Keuntungan Distributor per Roti:</span>
              <span className="text-amber-700 font-black">
                +Rp {distributorMarkup.toLocaleString('id-ID')}
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={2500}
              step={250}
              value={distributorMarkup}
              disabled={!isProduced || isDistributed}
              onChange={(e) => onMarkupChange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
          </div>

          {/* Hasil Harga Grosir */}
          <div className="pt-2 border-t border-slate-300 flex items-center justify-between font-black text-slate-900">
            <span>Harga Grosir ke Toko Ritel:</span>
            <span className="text-sm text-amber-800">
              Rp {wholesalePricePerUnit.toLocaleString('id-ID')} / pcs
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-500 font-bold text-[11px]">
            <span>Estimasi Laba Distributor:</span>
            <span className="text-emerald-700 font-black">
              +Rp {distributorProfit.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div>
        <Button
          variant={isDistributed ? 'outline' : 'amber'}
          icon={CheckCircle2}
          fullWidth
          onClick={onDistribute}
          disabled={!isProduced || isDistributed}
        >
          {isDistributed ? 'Roti Telah Didistribusikan ✓' : `Salurkan ${totalUnits} Roti ke Ritel`}
        </Button>
      </div>

    </div>
  );
}
