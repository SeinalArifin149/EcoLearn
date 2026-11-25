import React from 'react';
import { Sparkles, Trophy, Award, Flame, RotateCcw, ArrowRight, LayoutDashboard, CheckCircle2 } from 'lucide-react';
import Button from '../common/Button';
import CharacterIllustration from '../common/CharacterIllustration';

export default function SimulationResultModal({
  isOpen,
  simulationTitle = 'Simulasi Ekonomi',
  score = 0,
  xpEarned = 0,
  newBadges = [],
  challenges = [],
  completedChallenges = {},
  onRetry,
  onBackToMenu,
  onGoToDashboard,
}) {
  if (!isOpen) return null;

  const isPassed = score >= 70;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border-2 border-slate-100 space-y-6 my-8 animate-scaleUp text-center">
        
        {/* Character Illustration */}
        <div className="flex justify-center -mt-2">
          <CharacterIllustration
            expression={isPassed ? 'celebrating' : 'motivating'}
            size="lg"
            alt={isPassed ? 'Karakter Merayakan Eksperimen' : 'Karakter Memberikan Semangat'}
            className="drop-shadow-xl"
          />
        </div>

        {/* Title & Status */}
        <div className="space-y-1.5">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full border ${
              isPassed
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isPassed ? 'SIMULASI BERHASIL DITUNTASKAN' : 'EKSPERIMEN PERLU DITINGKATKAN'}
          </span>

          <h2 className="text-2xl font-black text-slate-900">
            {isPassed ? 'Hebat! Eksperimen Selesai!' : 'Bagus! Coba Selesaikan Misi Lainnya!'}
          </h2>

          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {simulationTitle}
          </p>
        </div>

        {/* Score & Reward Box */}
        <div className="p-5 rounded-3xl bg-gradient-to-b from-blue-50/70 to-slate-50 border-2 border-blue-100 space-y-2.5">
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
            Skor Pencapaian
          </span>

          <div className="flex items-baseline justify-center gap-1">
            <span className="text-5xl font-black text-blue-600">{score}</span>
            <span className="text-lg font-bold text-slate-400">/ 100</span>
          </div>

          {xpEarned > 0 && (
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-black px-3.5 py-1 rounded-full border border-amber-200 shadow-2xs">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-600" />
              <span>+{xpEarned} XP Berhasil Ditambahkan!</span>
            </div>
          )}
        </div>

        {/* Unlocked Badges (if any) */}
        {newBadges && newBadges.length > 0 && (
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2 text-left">
            <span className="text-xs font-black text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600" />
              Lencana Baru Dibuka!
            </span>
            <div className="space-y-2">
              {newBadges.map((badge) => (
                <div key={badge.id} className="p-2.5 rounded-xl bg-white border border-amber-200 flex items-center gap-2.5 shadow-2xs">
                  <span className="text-2xl">{badge.icon || '🏅'}</span>
                  <div>
                    <h5 className="text-xs font-black text-slate-900">{badge.title}</h5>
                    <p className="text-[10px] text-slate-500 leading-tight">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenge Checklist Overview */}
        <div className="space-y-1.5 text-left bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <span className="text-xs font-bold text-slate-700 block mb-2">
            Ringkasan Misi Tantangan:
          </span>
          {challenges.map((c, idx) => {
            const isDone = !!completedChallenges[c.id];
            return (
              <div key={c.id || idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60 last:border-0">
                <span className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isDone ? 'text-emerald-500' : 'text-slate-300'}`} />
                  <span className={isDone ? 'font-bold' : 'text-slate-400'}>{c.title}</span>
                </span>
                <span className={`text-[11px] font-bold ${isDone ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {isDone ? `+${c.points}` : '0'} Poin
                </span>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
          {onRetry && (
            <Button variant="secondary" icon={RotateCcw} onClick={onRetry} fullWidth>
              Ulangi Simulasi
            </Button>
          )}

          {onBackToMenu && (
            <Button variant="primary" icon={ArrowRight} onClick={onBackToMenu} fullWidth>
              Menu Simulasi
            </Button>
          )}
        </div>

      </div>
    </div>
  );
}
