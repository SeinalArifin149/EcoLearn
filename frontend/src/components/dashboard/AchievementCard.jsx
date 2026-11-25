import React from 'react';
import { Award, Sparkles, Trophy, Star } from 'lucide-react';

export default function AchievementCard({ badges = [], user }) {
  return (
    <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          Pencapaian & Lencana Siswa
        </h3>
        <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          {badges.length} Terbuka
        </span>
      </div>

      <p className="text-xs text-slate-500">
        Koleksi lencana prestasi yang berhasil kamu raih melalui kuis dan tantangan analisis ekonomi.
      </p>

      {/* Grid of badges */}
      <div className="grid grid-cols-2 gap-3">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`p-3.5 rounded-2xl border ${badge.color} flex flex-col justify-between transition-transform hover:scale-[1.02] shadow-2xs`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl">{badge.icon}</span>
              <Sparkles className="w-3.5 h-3.5 opacity-60" />
            </div>

            <div>
              <h5 className="text-xs font-black leading-snug">{badge.title}</h5>
              <p className="text-[10px] opacity-80 line-clamp-1 mt-0.5">{badge.desc}</p>
            </div>

            <span className="text-[9px] opacity-60 font-semibold block mt-2">
              Diraih: {badge.unlockedAt}
            </span>
          </div>
        ))}
      </div>

      {/* Summary Level Progress */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
        <span className="flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-amber-500" />
          {user?.level || 'Ekonom Muda'}
        </span>
        <span className="text-blue-600 font-black">
          Total: {user?.xp || 1450} XP
        </span>
      </div>
    </div>
  );
}
