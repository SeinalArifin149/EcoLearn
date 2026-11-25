import React from 'react';
import { Tag, HelpCircle, Flag } from 'lucide-react';

export default function EvaluasiQuestionCard({
  currentQuestion = 1,
  totalQuestions = 50,
  question,
  isFlagged = false,
  children,
}) {
  const getDifficultyBadge = (diff) => {
    switch (diff) {
      case 'mudah':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'sulit':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-sm space-y-5">
      {/* Question Header */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-sm">
            {currentQuestion}
          </span>
          <span className="text-xs font-bold text-slate-400">
            dari {totalQuestions} Soal
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Topic Badge */}
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 truncate max-w-[200px]">
            {question?.topic || 'Ekonomi Kelas X'}
          </span>

          {/* Difficulty Badge */}
          {question?.difficulty && (
            <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${getDifficultyBadge(question.difficulty)}`}>
              {question.difficulty}
            </span>
          )}

          {/* Flag Indicator */}
          {isFlagged && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              <Flag className="w-3 h-3 fill-amber-500 text-amber-600" />
              <span>Ragu</span>
            </span>
          )}
        </div>
      </div>

      {/* Indicator Text */}
      {question?.indicator && (
        <div className="text-[11px] text-slate-400 font-semibold italic flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span>Indikator: {question.indicator}</span>
        </div>
      )}

      {/* Question Statement */}
      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed whitespace-pre-line pt-1">
        {question?.question}
      </h3>

      {/* Options Container */}
      <div className="space-y-3 pt-2">
        {children}
      </div>
    </div>
  );
}
