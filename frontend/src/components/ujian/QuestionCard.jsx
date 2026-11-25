import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function QuestionCard({
  currentQuestion,
  totalQuestions,
  question,
  isFlagged = false,
  children,
}) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-sm space-y-6">
      {/* Header Nomor Soal & Status */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-sm">
            {currentQuestion}
          </span>
          <span className="text-xs font-bold text-slate-400">
            dari {totalQuestions} Soal
          </span>
        </div>

        {isFlagged && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Ditandai Ragu-ragu
          </span>
        )}
      </div>

      {/* Pertanyaan */}
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed whitespace-pre-line">
          {question?.question}
        </h3>
      </div>

      {/* Kontainer Pilihan Jawaban */}
      <div className="space-y-3 pt-2">
        {children}
      </div>
    </div>
  );
}
