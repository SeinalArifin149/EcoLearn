import React from 'react';
import { AlertTriangle, CheckCircle2, HelpCircle, Flag, X } from 'lucide-react';
import Button from '../common/Button';

export default function QuizConfirmModal({
  isOpen,
  totalQuestions = 10,
  answeredCount = 0,
  unansweredCount = 0,
  flaggedCount = 0,
  onCancel,
  onConfirm,
}) {
  if (!isOpen) return null;

  const hasUnanswered = unansweredCount > 0;
  const hasFlagged = flaggedCount > 0;

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
            {hasUnanswered ? 'Kumpulkan Jawaban?' : 'Selesaikan Ujian Sekarang?'}
          </h3>

          <p className="text-xs text-slate-500 max-w-xs">
            Pastikan kamu telah memeriksa seluruh lembar soal sebelum mengakhiri sesi ujian ini.
          </p>
        </div>

        {/* Progress Breakdown Cards */}
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

        {/* Warning / Encouragement Message */}
        {hasUnanswered ? (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Masih terdapat <strong>{unansweredCount} soal yang belum dijawab</strong>. Soal yang kosong akan dihitung salah.
            </span>
          </div>
        ) : hasFlagged ? (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-start gap-2.5">
            <Flag className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Semua soal sudah terjawab, namun masih ada <strong>{flaggedCount} nomor yang ditandai ragu-ragu</strong>.
            </span>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Luar biasa! Seluruh <strong>{totalQuestions} soal telah terjawab dengan yakin</strong>.
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Button variant="secondary" onClick={onCancel} fullWidth>
            Kembali Memeriksa
          </Button>
          <Button variant="primary" onClick={onConfirm} fullWidth>
            Ya, Kumpulkan Jawaban
          </Button>
        </div>

      </div>
    </div>
  );
}
