import React from 'react';
import { RotateCcw, Sliders, DollarSign, Users, Factory, Cpu, Wallet } from 'lucide-react';

export default function PriceControl({
  price,
  income,
  buyers,
  productionCost,
  technology,
  minPrice = 6000,
  maxPrice = 18000,
  priceStep = 500,
  onPriceChange,
  onFactorChange,
  onResetFactors,
}) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-100 shadow-sm space-y-6">
      
      {/* 1. Pengaturan Harga Utama (Price Variable) */}
      <div className="space-y-3 pb-5 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900">Tingkat Harga Pasar (P)</h4>
              <p className="text-[11px] text-slate-400 font-medium">Variabel penentu permintaan & penawaran</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-lg sm:text-xl font-black text-blue-600">
              Rp {price.toLocaleString('id-ID')}
            </span>
            <span className="text-[11px] font-bold text-slate-400 block">/ kg beras</span>
          </div>
        </div>

        {/* Price Slider */}
        <div className="space-y-2">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={priceStep}
            value={price}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-[11px] font-bold text-slate-400">
            <span>Rp {minPrice.toLocaleString('id-ID')}</span>
            <span>Rp {((minPrice + maxPrice) / 2).toLocaleString('id-ID')}</span>
            <span>Rp {maxPrice.toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* Quick Stepper Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => onPriceChange(Math.max(minPrice, price - priceStep))}
            className="flex-1 py-1.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
          >
            - Rp {priceStep.toLocaleString('id-ID')}
          </button>
          <button
            type="button"
            onClick={() => onPriceChange(Math.min(maxPrice, price + priceStep))}
            className="flex-1 py-1.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
          >
            + Rp {priceStep.toLocaleString('id-ID')}
          </button>
        </div>
      </div>

      {/* 2. Faktor-Faktor Non-Harga (Ceteris Paribus Shifters) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-slate-500" />
            <h5 className="text-xs font-black uppercase tracking-wider text-slate-700">
              Faktor Non-Harga (Pergeseran Kurva)
            </h5>
          </div>

          <button
            type="button"
            onClick={onResetFactors}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Normal (100%)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Pendapatan Konsumen */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5 text-blue-500" />
                Pendapatan Warga
              </span>
              <span className="text-blue-600 font-black">{income}%</span>
            </div>
            <input
              type="range"
              min={70}
              max={150}
              step={5}
              value={income}
              onChange={(e) => onFactorChange('income', Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-[10px] text-slate-400 block">Menggeser Kurva Permintaan (Qd)</span>
          </div>

          {/* Jumlah Konsumen */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-500" />
                Jumlah Pembeli
              </span>
              <span className="text-blue-600 font-black">{buyers}%</span>
            </div>
            <input
              type="range"
              min={70}
              max={150}
              step={5}
              value={buyers}
              onChange={(e) => onFactorChange('buyers', Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-[10px] text-slate-400 block">Mempengaruhi total permintaan</span>
          </div>

          {/* Biaya Produksi */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Factory className="w-3.5 h-3.5 text-emerald-500" />
                Biaya Produksi
              </span>
              <span className="text-emerald-600 font-black">{productionCost}%</span>
            </div>
            <input
              type="range"
              min={70}
              max={140}
              step={5}
              value={productionCost}
              onChange={(e) => onFactorChange('productionCost', Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <span className="text-[10px] text-slate-400 block">Biaya naik $\rightarrow$ penawaran turun</span>
          </div>

          {/* Teknologi Produksi */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-emerald-500" />
                Teknologi Pabrik
              </span>
              <span className="text-emerald-600 font-black">{technology}%</span>
            </div>
            <input
              type="range"
              min={80}
              max={160}
              step={5}
              value={technology}
              onChange={(e) => onFactorChange('technology', Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <span className="text-[10px] text-slate-400 block">Teknologi maju $\rightarrow$ penawaran naik</span>
          </div>

        </div>
      </div>

    </div>
  );
}
