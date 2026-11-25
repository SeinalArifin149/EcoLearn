import React from 'react';
import { Target, CheckCircle2, Circle, Trophy, Sparkles } from 'lucide-react';
import Button from '../common/Button';

export default function SimulationChallenge({
  challenges = [],
  completedChallenges = {}, // map of challengeId -> boolean
  onFinishSimulation,
  isFinished = false,
}) {
  const totalPoints = challenges.reduce((acc, c) => acc + (c.points || 0), 0);
  const earnedPoints = challenges.reduce((acc, c) => {
    return acc + (completedChallenges[c.id] ? c.points || 0 : 0);
  }, 0);

  const completedCount = challenges.filter((c) => completedChallenges[c.id]).length;
  const isAllCompleted = completedCount === challenges.length && challenges.length > 0;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-100 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900">Misi & Tantangan</h3>
            <p className="text-[11px] text-slate-400 font-medium">
              Selesaikan misi untuk mendapatkan skor & poin XP
            </p>
          </div>
        </div>

        {/* Score indicator */}
        <div className="text-right">
          <span className="text-xs font-bold text-slate-400">Poin Misi:</span>
          <div className="text-sm font-black text-blue-600">
            {earnedPoints} / {totalPoints}
          </div>
        </div>
      </div>

      {/* Challenge Items List */}
      <div className="space-y-3">
        {challenges.map((c, idx) => {
          const isDone = !!completedChallenges[c.id];

          return (
            <div
              key={c.id || idx}
              className={`p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 ${
                isDone
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div className="pt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className={`text-xs font-black ${isDone ? 'text-emerald-900 line-through opacity-85' : 'text-slate-900'}`}>
                    {c.title}
                  </h4>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ${
                      isDone
                        ? 'bg-emerald-200/80 text-emerald-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    +{c.points} Poin
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                  {c.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="pt-2">
        <Button
          variant={isAllCompleted ? 'amber' : 'primary'}
          icon={Trophy}
          fullWidth
          onClick={onFinishSimulation}
          disabled={isFinished}
        >
          {isAllCompleted
            ? 'Semua Misi Tuntas! Selesaikan & Klaim XP'
            : `Selesaikan Simulasi (${completedCount}/${challenges.length} Misi)`}
        </Button>
      </div>
    </div>
  );
}
