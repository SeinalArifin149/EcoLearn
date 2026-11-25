import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { dummyUser } from '../../data/userData';
import { User, Mail, Award, BookCheck, Flame, Coins, Trophy, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const currentUser = { ...dummyUser, ...user };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Profile Header Card (ALDICAP Card #10 inspired) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 text-white flex items-center justify-center font-black text-3xl shadow-lg shadow-blue-500/20">
            {currentUser?.name ? currentUser.name[0].toUpperCase() : 'B'}
          </div>

          <div className="space-y-1.5 flex-1">
            <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              {currentUser?.level || 'Ekonom Muda Level 3'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {currentUser?.name || 'Budi Santoso'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              @{currentUser?.username || 'budisantoso'} • {currentUser?.email || 'budi@ecolearn.id'}
            </p>
          </div>
        </div>

        {/* 3 Gamified Stats Badges: Poin, Badge, Selesai */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
            <Coins className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <p className="text-base sm:text-xl font-black text-amber-900">{currentUser?.xp || 1450}</p>
            <p className="text-[10px] sm:text-xs font-bold text-amber-700">Poin XP</p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center">
            <Trophy className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <p className="text-base sm:text-xl font-black text-blue-900">{currentUser?.badges?.length || 4}</p>
            <p className="text-[10px] sm:text-xs font-bold text-blue-700">Lencana</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <BookCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
            <p className="text-base sm:text-xl font-black text-emerald-900">{currentUser?.completedMateri || 6}</p>
            <p className="text-[10px] sm:text-xs font-bold text-emerald-700">Bab Selesai</p>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-sm space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          Lencana Prestasi Ekonomi
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentUser?.badges?.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border ${badge.color} flex items-center gap-3`}
            >
              <span className="text-3xl">{badge.icon}</span>
              <div>
                <h5 className="text-xs font-black">{badge.title}</h5>
                <p className="text-[11px] opacity-80">{badge.desc}</p>
                <span className="text-[9px] opacity-60 font-semibold block mt-1">
                  Diraih: {badge.unlockedAt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
