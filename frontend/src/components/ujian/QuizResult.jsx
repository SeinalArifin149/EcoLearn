import React from 'react';
import {
  Award,
  CheckCircle,
  RotateCcw,
  Flame,
  Sparkles,
  ArrowRight,
  BookOpen,
  LayoutDashboard,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
} from 'lucide-react';
import Button from '../common/Button';
import CharacterIllustration from '../common/CharacterIllustration';

export default function QuizResult({
  score = 0,
  correctCount = 0,
  wrongCount = 0,
  unansweredCount = 0,
  totalQuestions = 10,
  tier = 'Baik',
  tierTitle = 'Paham Konsep',
  tierColor = 'bg-blue-50 text-blue-700 border-blue-200',
  xpEarned = 30,
  durationSeconds = 0,
  newBadges = [],
  materiTitle = 'Evaluasi Ekonomi',
  onRetry,
  onBack,
  onGoToDashboard,
  onViewReview,
}) {
  const isPassed = score >= 70;

  // Format durasi pengerjaan
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = durationSeconds % 60;
  const timeFormatted = `${minutes}m ${seconds}s`;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-100 shadow-xl space-y-8 animate-fadeIn">
      
      {/* Character Illustration & Celebration Header */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="flex justify-center -mt-2">
          <CharacterIllustration
            expression={isPassed ? 'celebrating' : 'motivating'}
            size="lg"
            alt={isPassed ? 'Karakter Merayakan Kelulusan' : 'Karakter Memberi Semangat'}
            className="drop-shadow-xl"
          />
        </div>

        <div className="space-y-2">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full border ${
              isPassed
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isPassed ? 'STATUS: LULUS EVALUASI BAB' : 'STATUS: BELUM MENCAPAI KKM (70)'}
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {isPassed ? 'Luar Biasa! Kamu Berhasil Lulus!' : 'Jangan Menyerah, Coba Sekali Lagi!'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
            {isPassed
              ? `Selamat! Kamu telah menguasai materi ${materiTitle} dengan hasil yang sangat memuaskan.`
              : `Kamu memperoleh skor ${score}. Pelajari kembali materi ${materiTitle} dan ulangi kuis untuk menembus batas kelulusan KKM.`}
          </p>
        </div>
      </div>

      {/* Gamified Score Box inspired by ALDICAP Reward Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-b from-blue-50/70 via-indigo-50/40 to-slate-50 border-2 border-blue-100 text-center space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
          Skor Akhir Evaluasi
        </span>

        <div className="flex items-baseline justify-center gap-1.5 text-slate-900">
          <span className="text-5xl sm:text-6xl font-black text-blue-600 tracking-tight">
            {score}
          </span>
          <span className="text-xl sm:text-2xl font-bold text-slate-400">/ 100</span>
        </div>

        {/* Predikat & XP Reward */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <span className={`text-xs font-black px-3 py-1 rounded-full border ${tierColor}`}>
            Predikat: {tier} ({tierTitle})
          </span>

          <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-black px-3 py-1 rounded-full border border-amber-200 shadow-2xs">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
            <span>+{xpEarned} Poin XP Didapatkan!</span>
          </div>
        </div>
      </div>

      {/* 4 Performance Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
          <div className="flex items-center justify-center gap-1 text-emerald-600 mb-0.5">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-lg font-black">{correctCount}</span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500">Jawaban Benar</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-100 text-center">
          <div className="flex items-center justify-center gap-1 text-rose-500 mb-0.5">
            <XCircle className="w-4 h-4" />
            <span className="text-lg font-black">{wrongCount}</span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500">Jawaban Salah</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
          <div className="flex items-center justify-center gap-1 text-slate-500 mb-0.5">
            <HelpCircle className="w-4 h-4" />
            <span className="text-lg font-black">{unansweredCount}</span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500">Tidak Dijawab</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-center">
          <div className="flex items-center justify-center gap-1 text-blue-600 mb-0.5">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-black pt-0.5">{timeFormatted}</span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500">Waktu Tempuh</span>
        </div>
      </div>

      {/* Unlocked Badges Notification (if any) */}
      {newBadges && newBadges.length > 0 && (
        <div className="p-4 rounded-3xl bg-amber-50/80 border-2 border-amber-200 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-800">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Lencana Baru Berhasil Dibuka!</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {newBadges.map((badge) => (
              <div
                key={badge.id}
                className="p-3 rounded-2xl bg-white border border-amber-200 flex items-center gap-3 shadow-2xs"
              >
                <span className="text-2xl">{badge.icon || '🏅'}</span>
                <div>
                  <h5 className="text-xs font-black text-slate-900">{badge.title}</h5>
                  <p className="text-[11px] text-slate-500 leading-snug">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {onViewReview && (
            <Button
              variant="amber"
              onClick={onViewReview}
              icon={Sparkles}
              fullWidth
            >
              Lihat Pembahasan Lengkap
            </Button>
          )}

          {onRetry && (
            <Button
              variant="outline"
              onClick={onRetry}
              icon={RotateCcw}
              fullWidth
            >
              Ulangi Kuis
            </Button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          {onBack && (
            <Button
              variant="secondary"
              onClick={onBack}
              icon={BookOpen}
              fullWidth
            >
              Kembali ke Materi
            </Button>
          )}

          {onGoToDashboard && (
            <Button
              variant="primary"
              onClick={onGoToDashboard}
              icon={LayoutDashboard}
              fullWidth
            >
              Buka Dashboard
            </Button>
          )}
        </div>
      </div>

    </div>
  );
}
