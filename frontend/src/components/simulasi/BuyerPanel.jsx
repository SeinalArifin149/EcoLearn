import React from 'react';
import { ShoppingCart, Wallet, Store, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

export default function BuyerPanel({
  commodities = [],
  selectedCommodity,
  bidPrice,
  walletBalance = 150000,
  virtualSellers = [],
  selectedSeller,
  onSelectCommodity,
  onPriceChange,
  onSelectSeller,
  onSubmitOffer,
}) {
  const suggestedPrice = selectedCommodity.suggestedPrice;
  const isOverBudget = bidPrice > walletBalance;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-100 shadow-sm space-y-6">
      
      {/* 1. Saldo Dompet Pembeli */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-blue-100 uppercase tracking-wider block">
              Saldo Uang Belanja
            </span>
            <span className="text-lg sm:text-xl font-black">
              Rp {walletBalance.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-bold">
          Peran: Pembeli
        </span>
      </div>

      {/* 2. Pilih Barang Belanjaan */}
      <div className="space-y-3 pb-4 border-b border-slate-100">
        <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <ShoppingCart className="w-4 h-4 text-blue-600" />
          Pilih Kebutuhan Barang:
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
                    ? 'bg-blue-50/80 border-blue-500 shadow-2xs ring-2 ring-blue-500/20'
                    : 'bg-slate-50 border-slate-200 hover:border-blue-300'
                }`}
              >
                <span className="text-xs font-black text-slate-900 block truncate">
                  {item.name}
                </span>
                <span className="text-[11px] font-bold text-slate-400 block mt-1">
                  Pasar: Rp {(item.suggestedPrice / 1000).toFixed(0)}k
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Tentukan Harga Tawaran Beli */}
      <div className="space-y-4 pb-4 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-black text-slate-900">Batas Harga Penawaran</h4>
            <p className="text-[11px] text-slate-400 font-medium">
              Harga Acuan Pasar: <strong>Rp {suggestedPrice.toLocaleString('id-ID')}</strong>
            </p>
          </div>

          <div className="text-right">
            <span className={`text-xl font-black ${isOverBudget ? 'text-rose-600' : 'text-blue-700'}`}>
              Rp {bidPrice.toLocaleString('id-ID')}
            </span>
            <span className="text-[11px] font-bold text-slate-400 block">
              {bidPrice < suggestedPrice ? `Hemat Rp ${(suggestedPrice - bidPrice).toLocaleString('id-ID')}` : 'Di atas harga acuan'}
            </span>
          </div>
        </div>

        {/* Price Slider */}
        <div className="space-y-2">
          <input
            type="range"
            min={Math.round(suggestedPrice * 0.6)}
            max={Math.round(suggestedPrice * 1.3)}
            step={500}
            value={bidPrice}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-[10px] font-bold text-slate-400">
            <span>Rp {Math.round(suggestedPrice * 0.6).toLocaleString('id-ID')} (Tawar Murah)</span>
            <span className="text-slate-600">Acuan: Rp {suggestedPrice.toLocaleString('id-ID')}</span>
            <span>Rp {Math.round(suggestedPrice * 1.3).toLocaleString('id-ID')} (Tinggi)</span>
          </div>
        </div>
      </div>

      {/* 4. Pilih Toko Penjual */}
      <div className="space-y-3">
        <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
          Pilih Toko / Penjual Tujuan:
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {virtualSellers.map((s) => {
            const isSelected = selectedSeller.id === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelectSeller(s)}
                className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-500 shadow-2xs ring-2 ring-blue-500/20'
                    : 'bg-slate-50 border-slate-200 hover:border-blue-300'
                }`}
              >
                <span className="text-2xl">{s.avatar}</span>
                <div className="min-w-0">
                  <h5 className="text-xs font-black text-slate-900 truncate">{s.name}</h5>
                  <p className="text-[10px] text-slate-500 truncate">{s.policy}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Submit Offer */}
        <div className="pt-2">
          <Button
            variant="primary"
            icon={ArrowRight}
            fullWidth
            onClick={onSubmitOffer}
            disabled={isOverBudget || walletBalance < bidPrice}
          >
            {isOverBudget ? 'Uang Belanja Tidak Cukup!' : `Tawar Rp ${bidPrice.toLocaleString('id-ID')} ke ${selectedSeller.name}`}
          </Button>
        </div>
      </div>

    </div>
  );
}
