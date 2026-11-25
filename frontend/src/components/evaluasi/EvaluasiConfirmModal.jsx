import React from 'react';
import { AlertTriangle, CheckCircle2, Flag, X } from 'lucide-react';
import Button from '../common/Button';

export default function EvaluasiConfirmModal({
  isOpen,
  totalQuestions = 50,
  answeredCount = 0,
  unansweredCount = 0,
  flaggedCount = 0,
  testType = 'pretest',
  onCancel,
  onConfirm,
}) {
  if (!isOpen) return null;

  const hasUnanswered = unansweredCount > 0;
  const hasFlagged = flaggedCount > 0;
  const testTitle = testType === 'pretest' ? 'Pretest' : 'Posttest';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-2 border-slate-100 space-y-6 relative animate-scaleUp">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              hasUnanswered
                ? 'bg-amber-100 text-amber-600'
                : 'bg-emerald-100 text-emerald-600'
            }`}
          >
            {hasUnanswered ? (
              <AlertTriangle className="w-7 h-7" />
            ) : (
              <CheckCircle2 className="w-7 h-7" />
            )}
          </div>

          <h3 className="text-xl font-black text-slate-900">
            {hasUnanswered ? `Kumpulkan Lembar ${testTitle}?` : `Selesaikan ${testTitle} Sekarang?`}
          </h3>

          <p className="text-xs text-slate-500 max-w-xs">
            Pastikan seluruh lembar evaluasi telah ditinjau dengan cermat sebelum pengumpulan akhir.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="text-center p-2 rounded-xl bg-white border border-slate-100 shadow-2xs">
            <span className="block text-lg font-black text-emerald-600">{answeredCount}</span>
            <span className="text-[10px] font-bold text-slate-400">Terjawab</span>
          </div>

          <div className="text-center p-2 rounded-xl bg-white border border-slate-100 shadow-2xs">
            <span className="block text-lg font-black text-rose-500">{unansweredCount}</span>
            <span className="text-[10px] font-bold text-slate-400">Kosong</span>
          </div>

          <div className="text-center p-2 rounded-xl bg-white border border-slate-100 shadow-2xs">
            <span className="block text-lg font-black text-amber-500">{flaggedCount}</span>
            <span className="text-[10px] font-bold text-slate-400">Ragu-ragu</span>
          </div>
        </div>

        {/* Warning or Success message */}
        {hasUnanswered ? (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Masih terdapat <strong>{unansweredCount} nomor kosong</strong>. Soal yang tidak terisi akan dihitung salah.
            </span>
          </div>
        ) : hasFlagged ? (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-start gap-2.5">
            <Flag className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Seluruh 50 soal telah terisi, namun masih ada <strong>{flaggedCount} nomor bertanda ragu-ragu</strong>.
            </span>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Luar biasa! Seluruh <strong>50 butir soal telah dijawab dengan lengkap</strong>.
            </span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Button variant="secondary" onClick={onCancel} fullWidth>
            Kembali Periksa
          </Button>
          <Button variant="primary" onClick={onConfirm} fullWidth>
            Kumpulkan Sekarang
          </Button>
        </div>

      </div>
    </div>
  );
}
