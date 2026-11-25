import React from 'react';
import { Factory, Truck, Users, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';

export default function EconomicFlowDiagram({
  currentStage = 'production', // 'production' | 'distribution' | 'consumption' | 'completed'
  totalUnits = 50,
  producerRevenue = 0,
  distributorRevenue = 0,
  consumerSpending = 0,
}) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-100 shadow-sm space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-purple-600" />
          <h4 className="text-sm font-black text-slate-900">Diagram Aliran Arus Kegiatan Ekonomi</h4>
        </div>
        <span className="text-xs font-bold text-slate-400">
          Siklus Arus Barang & Arus Uang
        </span>
      </div>

      {/* 3 Circular Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
        
        {/* Node 1: Produsen */}
        <div className={`p-4 rounded-2xl border-2 transition-all space-y-2 text-center ${
          currentStage === 'production'
            ? 'bg-blue-50 border-blue-500 shadow-sm ring-2 ring-blue-500/20'
            : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <Factory className="w-6 h-6" />
          </div>
          <div>
            <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">1. Produsen</h5>
            <span className="text-[11px] text-slate-500 font-medium block">Pabrik EcoBakery</span>
          </div>
          <div className="p-2 rounded-xl bg-white border border-slate-200/80 text-[11px] text-slate-600 font-semibold">
            Input: Bahan Baku + Tenaga Kerja<br />
            Output: {totalUnits} Roti Siap Kirim
          </div>
        </div>

        {/* Node 2: Distributor */}
        <div className={`p-4 rounded-2xl border-2 transition-all space-y-2 text-center ${
          currentStage === 'distribution'
            ? 'bg-amber-50 border-amber-500 shadow-sm ring-2 ring-amber-500/20'
            : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">2. Distributor</h5>
            <span className="text-[11px] text-slate-500 font-medium block">Armada Logistik Pasar</span>
          </div>
          <div className="p-2 rounded-xl bg-white border border-slate-200/80 text-[11px] text-slate-600 font-semibold">
            Menghubungkan jarak & waktu<br />
            Penyaluran ke toko ritel kota
          </div>
        </div>

        {/* Node 3: Konsumen */}
        <div className={`p-4 rounded-2xl border-2 transition-all space-y-2 text-center ${
          currentStage === 'consumption' || currentStage === 'completed'
            ? 'bg-purple-50 border-purple-500 shadow-sm ring-2 ring-purple-500/20'
            : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="w-12 h-12 mx-auto rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">3. Konsumen</h5>
            <span className="text-[11px] text-slate-500 font-medium block">Masyarakat Pembeli</span>
          </div>
          <div className="p-2 rounded-xl bg-white border border-slate-200/80 text-[11px] text-slate-600 font-semibold">
            Menghabiskan nilai guna roti<br />
            Total Belanja: Rp {consumerSpending.toLocaleString('id-ID')}
          </div>
        </div>

      </div>

      {/* Legend & Explanation of Flows */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
        <div className="flex items-center gap-2 font-bold text-slate-800">
          <span className="w-3 h-3 rounded-full bg-blue-600 shrink-0" />
          <span>Arus Barang Fisik (Barang & Jasa):</span>
          <span className="text-slate-500 font-normal">
            Bahan Baku $\rightarrow$ Pabrik Produsen $\rightarrow$ Distributor $\rightarrow$ Toko Ritel $\rightarrow$ Konsumen Akhir.
          </span>
        </div>
        <div className="flex items-center gap-2 font-bold text-slate-800">
          <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
          <span>Arus Uang (Pembayaran Finansial):</span>
          <span className="text-slate-500 font-normal">
            Konsumen Membayar Harga Ritel $\rightarrow$ Penerimaan Distributor $\rightarrow$ Penerimaan Produsen $\rightarrow$ Balas Jasa Faktor Produksi.
          </span>
        </div>
      </div>

    </div>
  );
}
