import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Clock, 
  Award, 
  ArrowRight, 
  RefreshCw, 
  BookOpen, 
  Sparkles,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import CharacterIllustration from '../common/CharacterIllustration';

const EvaluasiResult = ({ 
  attempt, 
  onRetest, 
  onViewReview, 
  showReviewButton = true 
}) => {
  if (!attempt) return null;

  const { 
    testType, 
    score, 
    isPassed, 
    correctCount, 
    incorrectCount, 
    unansweredCount, 
    totalQuestions, 
    accuracy,
    durationSeconds, 
    xpEarned, 
    badgesEarned = [],
    completedAt 
  } = attempt;

  const isPretest = testType === 'pretest';
  const testTitle = isPretest ? 'Pretest Ekonomi Kelas X' : 'Posttest Ekonomi Kelas X';
  const formattedDate = completedAt 
    ? new Date(completedAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : '-';

  const formatDuration = (seconds = 0) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} menit ${secs} detik`;
  };

  const mascotMood = score >= 80 ? 'celebrating' : score >= 60 ? 'happy' : 'motivating';

  return (
    <div className="space-y-6">
      {/* Primary Result Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm relative overflow-hidden">
        {/* Background accent */}
        <div className={`absolute -right-16 -top-16 w-56 h-56 rounded-full blur-3xl opacity-20 pointer-events-none ${
          isPassed ? 'bg-emerald-500' : 'bg-blue-500'
        }`} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left / Mascot Column */}
          <div className="lg:col-span-4 flex flex-col items-center text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="w-36 h-36 md:w-44 md:h-44 flex items-center justify-center">
              <CharacterIllustration 
                expression={mascotMood}
                size="md"
                alt="Karakter Evaluasi Belajar"
                className="drop-shadow-md"
              />
            </div>
            <div className="mt-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                isPassed 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                {isPassed ? 'Memenuhi KKM (≥ 70)' : 'Perlu Peningkatan (< 70)'}
              </span>
              <p className="text-xs text-slate-500 mt-2">
                {isPretest 
                  ? 'Nilai awal sebagai tolok ukur sebelum mempelajari materi ekonomi.' 
                  : 'Nilai akhir untuk mengukur capaian dan penguasaan materi ekonomi.'}
              </p>
            </div>
          </div>

          {/* Center Column: Score & Details */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-4">
                <div>
                  <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                    isPretest ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {testType.toUpperCase()}
                  </span>
                  <h1 className="text-2xl font-bold text-slate-900 mt-1">{testTitle}</h1>
                  <p className="text-xs text-slate-400 mt-0.5">Selesai pada: {formattedDate}</p>
                </div>

                {xpEarned > 0 && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <div>
                      <p className="text-xs text-amber-600 font-medium">Hadiah Belajar</p>
                      <p className="text-base font-bold text-amber-700">+{xpEarned} XP</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Big Score Display */}
              <div className="flex items-baseline gap-4 mb-6">
                <div>
                  <span className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">
                    {score}
                  </span>
                  <span className="text-slate-400 font-medium text-xl ml-1">/ 100</span>
                </div>
                <div className="text-sm">
                  <p className="text-slate-500">Tingkat Akurasi</p>
                  <p className="font-bold text-slate-800">{accuracy}% Benar</p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-xs font-semibold">Benar</span>
                  </div>
                  <p className="text-xl font-bold text-slate-800">{correctCount}</p>
                  <p className="text-[11px] text-slate-400">dari {totalQuestions} soal</p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 text-rose-500 mb-1">
                    <XCircle className="w-4 h-4" />
                    <span className="text-xs font-semibold">Salah</span>
                  </div>
                  <p className="text-xl font-bold text-slate-800">{incorrectCount}</p>
                  <p className="text-[11px] text-slate-400">jawaban keliru</p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-xs font-semibold">Kosong</span>
                  </div>
                  <p className="text-xl font-bold text-slate-800">{unansweredCount}</p>
                  <p className="text-[11px] text-slate-400">tidak dijawab</p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5 text-blue-600 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-semibold">Durasi</span>
                  </div>
                  <p className="text-base font-bold text-slate-800 truncate">{formatDuration(durationSeconds)}</p>
                  <p className="text-[11px] text-slate-400">waktu pengerjaan</p>
                </div>
              </div>
            </div>

            {/* Badges Earned Section (if any) */}
            {badgesEarned && badgesEarned.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-600 mb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  Lencana Baru Didapatkan:
                </p>
                <div className="flex flex-wrap gap-2">
                  {badgesEarned.map((badge, idx) => (
                    <span 
                      key={idx}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold rounded-lg shadow-2xs"
                    >
                      🏆 {badge}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/evaluasi"
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-sm transition-colors"
            >
              Kembali ke Menu Evaluasi
            </Link>

            {onRetest && (
              <button
                onClick={onRetest}
                className="px-4 py-2.5 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-50 font-medium text-sm transition-colors inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Ulangi {isPretest ? 'Pretest' : 'Posttest'}
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {showReviewButton && onViewReview && (
              <button
                onClick={onViewReview}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-white hover:bg-slate-900 font-medium text-sm transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                <BookOpen className="w-4 h-4" />
                Lihat Pembahasan Soal
              </button>
            )}

            {isPretest ? (
              <Link
                to="/materi"
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-semibold text-sm transition-colors inline-flex items-center gap-2 shadow-sm shadow-blue-200"
              >
                Lanjut Belajar Materi
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                to="/evaluasi/perbandingan"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-semibold text-sm transition-colors inline-flex items-center gap-2 shadow-sm shadow-emerald-200"
              >
                <TrendingUp className="w-4 h-4" />
                Bandingkan dengan Pretest
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluasiResult;
