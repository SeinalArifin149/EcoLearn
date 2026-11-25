import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertCircle, Lightbulb, Check, X, Filter } from 'lucide-react';

export default function QuizReview({ questions = [], userAnswers = {} }) {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'correct' | 'wrong'

  // Hitung jumlah benar dan salah untuk tab counter
  const correctCount = questions.filter(
    (q) => String(userAnswers[q.id] || '').toUpperCase() === String(q.correctAnswer).toUpperCase()
  ).length;
  const wrongOrEmptyCount = questions.length - correctCount;

  const filteredQuestions = questions.filter((q) => {
    const isCorrect = String(userAnswers[q.id] || '').toUpperCase() === String(q.correctAnswer).toUpperCase();
    if (filterType === 'correct') return isCorrect;
    if (filterType === 'wrong') return !isCorrect;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            Pembahasan & Analisis Soal
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Pelajari penjelasan konsep ekonomi pada setiap nomor untuk memperdalam pemahamanmu.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Semua ({questions.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('correct')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterType === 'correct'
                ? 'bg-emerald-500 text-white shadow-2xs'
                : 'text-slate-500 hover:text-emerald-700'
            }`}
          >
            Benar ({correctCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('wrong')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterType === 'wrong'
                ? 'bg-rose-500 text-white shadow-2xs'
                : 'text-slate-500 hover:text-rose-700'
            }`}
          >
            Salah / Kosong ({wrongOrEmptyCount})
          </button>
        </div>
      </div>

      {/* List Soal & Pembahasan */}
      <div className="space-y-6">
        {filteredQuestions.map((q, qIndex) => {
          const userChoice = userAnswers[q.id];
          const isAnswered = userChoice !== undefined && userChoice !== null && userChoice !== '';
          const isCorrect = isAnswered && String(userChoice).toUpperCase() === String(q.correctAnswer).toUpperCase();
          const originalIndex = questions.findIndex((item) => item.id === q.id) + 1;

          return (
            <div
              key={q.id || qIndex}
              className={`bg-white rounded-3xl p-6 sm:p-7 border-2 transition-all space-y-5 shadow-2xs ${
                isCorrect ? 'border-emerald-100' : 'border-rose-100'
              }`}
            >
              {/* Question Item Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-black text-xs flex items-center justify-center">
                    {originalIndex}
                  </span>
                  <span className="text-xs font-bold text-slate-400">Nomor {originalIndex}</span>
                </div>

                {isCorrect ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Jawaban Benar
                  </span>
                ) : isAnswered ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-50 text-rose-700 border border-rose-200">
                    <XCircle className="w-3.5 h-3.5" />
                    Jawaban Kurang Tepat
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-slate-100 text-slate-600 border border-slate-300">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Tidak Dijawab
                  </span>
                )}
              </div>

              {/* Question Text */}
              <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed whitespace-pre-line">
                {q.question}
              </h4>

              {/* Options List */}
              <div className="space-y-2 pt-1">
                {q.options.map((opt) => {
                  const optId = typeof opt === 'object' ? opt.id : opt;
                  const optText = typeof opt === 'object' ? opt.text : opt;
                  const isUserSelection = String(userChoice).toUpperCase() === String(optId).toUpperCase();
                  const isTheCorrectOption = String(q.correctAnswer).toUpperCase() === String(optId).toUpperCase();

                  let optCardStyle = 'bg-white border-slate-200 text-slate-700';
                  let badgeStyle = 'bg-slate-100 text-slate-600';

                  if (isTheCorrectOption) {
                    optCardStyle = 'bg-emerald-50/90 border-emerald-500 text-emerald-950 font-bold';
                    badgeStyle = 'bg-emerald-600 text-white';
                  } else if (isUserSelection && !isCorrect) {
                    optCardStyle = 'bg-rose-50/90 border-rose-400 text-rose-950 font-medium';
                    badgeStyle = 'bg-rose-500 text-white';
                  }

                  return (
                    <div
                      key={optId}
                      className={`p-3.5 rounded-2xl border-2 flex items-start gap-3 text-xs sm:text-sm ${optCardStyle}`}
                    >
                      <span
                        className={`shrink-0 w-6 h-6 rounded-lg font-black text-xs flex items-center justify-center ${badgeStyle}`}
                      >
                        {optId}
                      </span>
                      <span className="flex-1 pt-0.5 leading-relaxed">{optText}</span>

                      {/* Status Badges on Option */}
                      {isTheCorrectOption && (
                        <span className="shrink-0 text-emerald-600 font-black text-xs flex items-center gap-1 pt-0.5">
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span className="hidden sm:inline">Kunci Benar</span>
                        </span>
                      )}

                      {isUserSelection && !isCorrect && (
                        <span className="shrink-0 text-rose-600 font-bold text-xs flex items-center gap-1 pt-0.5">
                          <X className="w-4 h-4 stroke-[3]" />
                          <span className="hidden sm:inline">Pilihanmu</span>
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Educational Explanation Box */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border-2 border-amber-200/80 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-black text-amber-900">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Pembahasan Edukatif:</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                  {q.explanation}
                </p>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
