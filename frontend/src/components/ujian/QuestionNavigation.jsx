import React from 'react';
import { Flag, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

export default function QuestionNavigation({
  questions = [],
  currentIndex = 0,
  answers = {},
  flagged = {},
  onSelectIndex,
  onToggleFlag,
}) {
  const currentQuestionId = questions[currentIndex]?.id;
  const isCurrentFlagged = !!flagged[currentQuestionId];

  // Hitung ringkasan status
  const answeredCount = Object.keys(answers).filter(
    (key) => answers[key] !== undefined && answers[key] !== null
  ).length;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;
  const totalCount = questions.length;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-100 shadow-sm space-y-5">
      {/* Header Palet */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h4 className="text-sm font-black text-slate-900">Palet Nomor Soal</h4>
          <p className="text-[11px] text-slate-400 font-medium">
            Terjawab {answeredCount} dari {totalCount} soal
          </p>
        </div>

        {/* Tombol Ragu-ragu untuk nomor aktif */}
        <button
          type="button"
          onClick={onToggleFlag}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
            isCurrentFlagged
              ? 'bg-amber-500 text-white border-amber-500 hover:bg-amber-600'
              : 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
          }`}
          title="Tandai soal ini jika masih ragu"
        >
          <Flag className="w-3.5 h-3.5 fill-current" />
          <span>{isCurrentFlagged ? 'Ragu Aktif' : 'Tandai Ragu'}</span>
        </button>
      </div>

      {/* Grid Nomor Soal */}
      <div className="grid grid-cols-5 gap-2.5">
        {questions.map((q, idx) => {
          const isCurrent = idx === currentIndex;
          const isAnswered = answers[q.id] !== undefined && answers[q.id] !== null;
          const isRagu = !!flagged[q.id];

          let btnClass = 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200';

          if (isCurrent) {
            btnClass = 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-300 shadow-sm';
          } else if (isRagu) {
            btnClass = 'bg-amber-400 text-amber-950 border-amber-500 font-black';
          } else if (isAnswered) {
            btnClass = 'bg-emerald-500 text-white border-emerald-500';
          }

          return (
            <button
              key={q.id || idx}
              type="button"
              onClick={() => onSelectIndex(idx)}
              className={`relative h-11 rounded-xl text-xs font-extrabold flex items-center justify-center border transition-all cursor-pointer ${btnClass}`}
            >
              <span>{idx + 1}</span>

              {/* Icon marker kecil di sudut */}
              {isRagu && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-600 text-white rounded-full flex items-center justify-center text-[8px]">
                  <Flag className="w-2 h-2 fill-white" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Petunjuk Warna (Legenda) */}
      <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-md bg-blue-600 shrink-0" />
          <span>Sedang Aktif</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-md bg-emerald-500 shrink-0" />
          <span>Sudah Dijawab</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-md bg-amber-400 shrink-0" />
          <span>Ragu-ragu ({flaggedCount})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-md bg-slate-200 shrink-0" />
          <span>Belum Dijawab</span>
        </div>
      </div>
    </div>
  );
}
