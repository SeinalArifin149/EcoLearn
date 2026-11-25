import React from 'react';
import { MessageSquare, CheckCircle2, XCircle, ArrowRight, CornerDownRight, Handshake } from 'lucide-react';
import Button from '../common/Button';

export default function MarketTransaction({
  lastTransaction,
  role = 'seller',
  onAcceptCounterOffer,
  onDismiss,
}) {
  if (!lastTransaction) return null;

  const { isAccepted, reason, counterOffer, revenue, totalCost, profit, savings, totalSpending, commodity, dealPrice } = lastTransaction;

  return (
    <div className={`p-5 sm:p-6 rounded-3xl border-2 transition-all space-y-4 animate-scaleUp ${
      isAccepted
        ? 'bg-emerald-50/70 border-emerald-300'
        : counterOffer
        ? 'bg-amber-50/80 border-amber-300'
        : 'bg-rose-50/70 border-rose-200'
    }`}>
      
      {/* Header Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isAccepted ? (
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
              <Handshake className="w-4 h-4" />
            </div>
          ) : counterOffer ? (
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          )}

          <h4 className="text-sm font-black text-slate-900">
            {isAccepted
              ? 'Kesepakatan Tercapai! (Deal)'
              : counterOffer
              ? 'Tawaran Balik dari Lawan Transaksi'
              : 'Transaksi Belum Berhasil'}
          </h4>
        </div>

        <span className={`text-xs font-black px-3 py-1 rounded-full border ${
          isAccepted
            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
            : counterOffer
            ? 'bg-amber-100 text-amber-800 border-amber-300'
            : 'bg-rose-100 text-rose-800 border-rose-300'
        }`}>
          {isAccepted ? 'Transaksi Sukses' : counterOffer ? 'Bisa Dinegosiasikan' : 'Ditolak'}
        </span>
      </div>

      {/* Description / Dialog */}
      <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-1">
        <p className="font-medium">{reason}</p>
      </div>

      {/* Financial Details if Deal is accepted */}
      {isAccepted && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
          <div className="p-2.5 rounded-xl bg-white border border-emerald-200 text-center">
            <span className="text-[10px] text-slate-400 font-bold block">Harga Sepakat</span>
            <span className="text-sm font-black text-emerald-700">
              Rp {dealPrice?.toLocaleString('id-ID')}
            </span>
          </div>

          {role === 'seller' ? (
            <>
              <div className="p-2.5 rounded-xl bg-white border border-emerald-200 text-center">
                <span className="text-[10px] text-slate-400 font-bold block">Pendapatan</span>
                <span className="text-sm font-black text-blue-700">
                  Rp {revenue?.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-emerald-200 text-center">
                <span className="text-[10px] text-slate-400 font-bold block">Laba Bersih</span>
                <span className={`text-sm font-black ${profit >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                  {profit >= 0 ? `+Rp ${profit?.toLocaleString('id-ID')}` : `-Rp ${Math.abs(profit)?.toLocaleString('id-ID')}`}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="p-2.5 rounded-xl bg-white border border-emerald-200 text-center">
                <span className="text-[10px] text-slate-400 font-bold block">Total Belanja</span>
                <span className="text-sm font-black text-blue-700">
                  Rp {totalSpending?.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-emerald-200 text-center">
                <span className="text-[10px] text-slate-400 font-bold block">Hemat Belanja</span>
                <span className="text-sm font-black text-emerald-700">
                  +Rp {savings?.toLocaleString('id-ID')}
                </span>
              </div>
            </>
          )}
        </div>
      )}

      {/* Counter-offer Action buttons */}
      {counterOffer && (
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
          <Button
            variant="amber"
            icon={Handshake}
            fullWidth
            onClick={() => onAcceptCounterOffer(counterOffer)}
          >
            Setujui Tawaran Damai Rp {counterOffer.toLocaleString('id-ID')}
          </Button>
          <Button
            variant="secondary"
            fullWidth
            onClick={onDismiss}
          >
            Tolak & Pasang Harga Baru
          </Button>
        </div>
      )}

    </div>
  );
}
