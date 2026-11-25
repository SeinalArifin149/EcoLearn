import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Filter, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Tag
} from 'lucide-react';

const EvaluasiReview = ({ 
  questions = [], 
  userAnswers = {}, 
  testType = 'pretest' 
}) => {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'correct' | 'incorrect' | 'unanswered'
  const [expandedId, setExpandedId] = useState(null);

  // Compute status for each question
  const reviewedQuestions = useMemo(() => {
    return questions.map((q, index) => {
      const selected = userAnswers[q.id];
      const isUnanswered = selected === undefined || selected === null || selected === '';
      const isCorrect = !isUnanswered && selected === q.correctAnswer;
      const isIncorrect = !isUnanswered && selected !== q.correctAnswer;

      return {
        ...q,
        indexNumber: index + 1,
        selectedAnswer: selected,
        isCorrect,
        isIncorrect,
        isUnanswered
      };
    });
  }, [questions, userAnswers]);

  const counts = useMemo(() => {
    return {
      all: reviewedQuestions.length,
      correct: reviewedQuestions.filter(q => q.isCorrect).length,
      incorrect: reviewedQuestions.filter(q => q.isIncorrect).length,
      unanswered: reviewedQuestions.filter(q => q.isUnanswered).length,
    };
  }, [reviewedQuestions]);

  const filteredQuestions = useMemo(() => {
    switch (activeFilter) {
      case 'correct':
        return reviewedQuestions.filter(q => q.isCorrect);
      case 'incorrect':
        return reviewedQuestions.filter(q => q.isIncorrect);
      case 'unanswered':
        return reviewedQuestions.filter(q => q.isUnanswered);
      default:
        return reviewedQuestions;
    }
  }, [reviewedQuestions, activeFilter]);

  return (
    <div className="space-y-6">
      {/* Header and Filter bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Pembahasan & Pembelajaran Soal
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Pelajari setiap kunci jawaban dan konsep penting untuk memperdalam pemahamanmu.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua ({counts.all})
          </button>

          <button
            onClick={() => setActiveFilter('correct')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeFilter === 'correct'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Benar ({counts.correct})
          </button>

          <button
            onClick={() => setActiveFilter('incorrect')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeFilter === 'incorrect'
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            Salah ({counts.incorrect})
          </button>

          <button
            onClick={() => setActiveFilter('unanswered')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              activeFilter === 'unanswered'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            Kosong ({counts.unanswered})
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-100 text-slate-500">
            Tidak ada soal dalam kategori filter ini.
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isSelected = (key) => q.selectedAnswer === key;
            const isTargetCorrect = (key) => q.correctAnswer === key;

            return (
              <div 
                key={q.id}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-all"
              >
                {/* Question Top Row: Index, Topic, Status */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 font-bold text-sm flex items-center justify-center">
                      {q.indexNumber}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                      <Tag className="w-3 h-3 text-slate-400" />
                      {q.topic || q.topicName || `Bab ${q.topicId || ''}`}
                    </span>
                  </div>

                  <div>
                    {q.isCorrect && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Benar
                      </span>
                    )}
                    {q.isIncorrect && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        <XCircle className="w-3.5 h-3.5" /> Salah
                      </span>
                    )}
                    {q.isUnanswered && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        <AlertCircle className="w-3.5 h-3.5" /> Tidak Dijawab
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Stem */}
                <p className="text-slate-800 font-medium text-base leading-relaxed mb-4">
                  {q.question}
                </p>

                {/* Options Review */}
                <div className="space-y-2 mb-4">
                  {(Array.isArray(q.options)
                    ? q.options.map(opt => ({ key: opt.id, text: opt.text }))
                    : Object.entries(q.options || {}).map(([key, text]) => ({ key, text }))
                  ).map(({ key, text }) => {
                    const isUserChoice = isSelected(key);
                    const isCorrectAnswer = isTargetCorrect(key);

                    let optionStyle = 'border-slate-200 bg-white text-slate-700';
                    let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';

                    if (isCorrectAnswer) {
                      optionStyle = 'border-emerald-300 bg-emerald-50/70 text-emerald-950 font-medium ring-1 ring-emerald-300';
                      badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
                    } else if (isUserChoice && !isCorrectAnswer) {
                      optionStyle = 'border-rose-300 bg-rose-50/70 text-rose-950 font-medium ring-1 ring-rose-300';
                      badgeStyle = 'bg-rose-600 text-white border-rose-600';
                    }

                    return (
                      <div
                        key={key}
                        className={`flex items-start gap-3 p-3 rounded-xl border text-sm transition-all ${optionStyle}`}
                      >
                        <span className={`w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${badgeStyle}`}>
                          {key}
                        </span>
                        <div className="flex-1 leading-snug">
                          {text}
                        </div>
                        {isCorrectAnswer && (
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded shrink-0">
                            Kunci Jawaban
                          </span>
                        )}
                        {isUserChoice && !isCorrectAnswer && (
                          <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded shrink-0">
                            Pilihan Anda
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Pembahasan Box */}
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-sm">
                  <div className="flex items-start gap-2.5">
                    <BookOpen className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold text-blue-900 text-xs uppercase tracking-wider">
                        Pembahasan Konsep
                      </p>
                      <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
                        {q.pembahasan || q.explanation || 'Pembahasan materi belum tersedia.'}
                      </p>
                      {q.indikator && (
                        <p className="text-[11px] text-blue-800 font-medium pt-1">
                          📌 Indikator: {q.indikator}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default EvaluasiReview;
