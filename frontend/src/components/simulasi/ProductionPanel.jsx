import React from 'react';
import { Factory, Package, Users, DollarSign, CheckCircle2 } from 'lucide-react';
import Button from '../common/Button';

export default function ProductionPanel({
  batches = 2,
  rawMaterials = [],
  laborCostPerBatch = 20000,
  unitsPerBatch = 25,
  totalProductionCost = 0,
  hppPerUnit = 0,
  onBatchesChange,
  onProduce,
  isProduced = false,
}) {
  const totalUnits = batches * unitsPerBatch;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-100 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Factory className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900">Tahap 1: Produksi Pabrik Roti</h4>
            <p className="text-[11px] text-slate-400 font-medium">Penggabungan bahan baku & tenaga kerja</p>
          </div>
        </div>

        <span className={`text-xs font-black px-3 py-1 rounded-full border ${
          isProduced ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'
        }`}>
          {isProduced ? 'Produksi Selesai ✓' : 'Siap Diproduksi'}
        </span>
      </div>

      {/* Input Batch Control */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span>Jumlah Batch Produksi:</span>
          <span className="text-sm font-black text-blue-600">
            {batches} Batch ({totalUnits} Roti)
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              type="button"
              disabled={isProduced}
              onClick={() => onBatchesChange(n)}
              className={`py-2 rounded-xl text-xs font-black border transition-all cursor-pointer ${
                batches === n
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
              } ${isProduced ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {n} Batch ({n * unitsPerBatch} pcs)
            </button>
          ))}
        </div>
      </div>

      {/* Rincian Biaya Input Produksi */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
          Rincian Biaya per Batch:
        </span>

        <div className="space-y-1.5">
          {rawMaterials.map((mat) => (
            <div key={mat.id} className="flex justify-between text-slate-600">
              <span>{mat.name} ({mat.requiredPerBatch} unit):</span>
              <span className="font-bold text-slate-800">
                Rp {(mat.costPerUnit * mat.requiredPerBatch * batches).toLocaleString('id-ID')}
              </span>
            </div>
          ))}
          <div className="flex justify-between text-slate-600 pt-1 border-t border-slate-200">
            <span>Upah Tenaga Kerja Produksi:</span>
            <span className="font-bold text-slate-800">
              Rp {(laborCostPerBatch * batches).toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Total Cost & HPP */}
        <div className="pt-2 border-t border-slate-300 flex items-center justify-between font-black text-slate-900">
          <span>Total Biaya Produksi:</span>
          <span className="text-sm text-blue-700">
            Rp {totalProductionCost.toLocaleString('id-ID')}
          </span>
        </div>
        <div className="flex items-center justify-between text-slate-500 font-bold text-[11px]">
          <span>Harga Pokok Produksi (HPP per roti):</span>
          <span className="text-emerald-700 font-black">
            Rp {hppPerUnit.toLocaleString('id-ID')} / pcs
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div>
        <Button
          variant={isProduced ? 'outline' : 'primary'}
          icon={CheckCircle2}
          fullWidth
          onClick={onProduce}
          disabled={isProduced}
        >
          {isProduced ? 'Roti Sudah Diproduksi ✓' : `Mulai Produksi (${totalUnits} Roti)`}
        </Button>
      </div>

    </div>
  );
}
