import React from 'react';
import { Package, Store, TrendingUp, DollarSign, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

export default function SellerPanel({
  commodities = [],
  selectedCommodity,
  sellingPrice,
  stock = 10,
  virtualBuyers = [],
  selectedBuyer,
  onSelectCommodity,
  onPriceChange,
  onSelectBuyer,
  onSubmitOffer,
}) {
  const itemCost = selectedCommodity.productionCost;
  const marginPerUnit = sellingPrice - itemCost;
  const isLoss = marginPerUnit < 0;
  const marginPercent = itemCost > 0 ? Math.round((marginPerUnit / itemCost) * 100) : 0;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-100 shadow-sm space-y-6">
      
      {/* 1. Pilih Komoditas Dagangan */}
      <div className="space-y-3 pb-4 border-b border-slate-100">
        <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Store className="w-4 h-4 text-emerald-600" />
          Pilih Barang Dagangan:
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {commodities.map((item) => {
            const isSelected = selectedCommodity.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectCommodity(item)}
                className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50/80 border-emerald-500 shadow-2xs ring-2 ring-emerald-500/20'
                    : 'bg-slate-50 border-slate-200 hover:border-emerald-300'
                }`}
              >
                <span className="text-xs font-black text-slate-900 block truncate">
                  {item.name}
                </span>
                <span className="text-[11px] font-bold text-slate-400 block mt-1">
                  Biaya: Rp {(item.productionCost / 1000).toFixed(0)}k
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Informasi Biaya & Penetapan Harga Jual */}
      <div className="space-y-4 pb-4 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-black text-slate-900">Tentukan Harga Jual</h4>
            <p className="text-[11px] text-slate-400 font-medium">
              Biaya Pokok Produksi (HPP): <strong>Rp {itemCost.toLocaleString('id-ID')}</strong> • Stok: {stock} unit
            </p>
          </div>

          <div className="text-right">
            <span className={`text-xl font-black ${isLoss ? 'text-rose-600' : 'text-emerald-700'}`}>
              Rp {sellingPrice.toLocaleString('id-ID')}
            </span>
            <span className={`text-[11px] font-bold block ${isLoss ? 'text-rose-500' : 'text-emerald-600'}`}>
              Margin: {marginPerUnit > 0 ? `+Rp ${marginPerUnit.toLocaleString('id-ID')} (${marginPercent}%)` : `Rugi Rp ${Math.abs(marginPerUnit).toLocaleString('id-ID')}`}
            </span>
          </div>
        </div>

        {/* Price Slider */}
        <div className="space-y-2">
          <input
            type="range"
            min={Math.round(itemCost * 0.7)}
            max={Math.round(itemCost * 1.8)}
            step={500}
            value={sellingPrice}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-[10px] font-bold text-slate-400">
            <span>Rp {Math.round(itemCost * 0.7).toLocaleString('id-ID')} (Rugi)</span>
            <span className="text-slate-600">HPP: Rp {itemCost.toLocaleString('id-ID')}</span>
            <span>Rp {Math.round(itemCost * 1.8).toLocaleString('id-ID')} (Untung Tinggi)</span>
          </div>
        </div>
      </div>

      {/* 3. Pilih Calon Pembeli Virtual */}
      <div className="space-y-3">
        <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
          Pilih Calon Pembeli Target:
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {virtualBuyers.map((b) => {
            const isSelected = selectedBuyer.id === b.id;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => onSelectBuyer(b)}
                className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-500 shadow-2xs ring-2 ring-blue-500/20'
                    : 'bg-slate-50 border-slate-200 hover:border-blue-300'
                }`}
              >
                <span className="text-2xl">{b.avatar}</span>
                <div className="min-w-0">
                  <h5 className="text-xs font-black text-slate-900 truncate">{b.name}</h5>
                  <p className="text-[10px] text-slate-500 truncate">{b.personality}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Submit Offer Button */}
        <div className="pt-2">
          <Button
            variant="green"
            icon={ArrowRight}
            fullWidth
            onClick={onSubmitOffer}
            disabled={stock <= 0}
          >
            {stock <= 0 ? 'Stok Habis!' : `Tawarkan Rp ${sellingPrice.toLocaleString('id-ID')} ke ${selectedBuyer.name}`}
          </Button>
        </div>
      </div>

    </div>
  );
}
