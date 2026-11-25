import React from 'react';
import { BookOpen, CheckCircle, Award, Flame, TrendingUp } from 'lucide-react';

export default function ProgressCard({ user }) {
  const completedMateri = user?.completedMateri || 6;
  const totalMateri = user?.totalMateri || 10;
  const completedExams = user?.completedExams || 4;
  const totalExams = user?.totalExams || 10;
  const xp = user?.xp || 1450;
  const averageScore = user?.averageScore || 92;

  const progressPercentage = Math.round((completedMateri / totalMateri) * 100);

  const stats = [
    {
      label: 'Materi Selesai',
      value: `${completedMateri} / ${totalMateri}`,
      subtext: `${totalMateri - completedMateri} materi tersisa`,
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-700',
    },
    {
      label: 'Ujian Diselesaikan',
      value: `${completedExams} / ${totalExams}`,
      subtext: `Rata-rata skor: ${averageScore}%`,
      icon: CheckCircle,
      color: 'from-emerald-400 to-teal-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      iconColor: 'text-emerald-700',
    },
    {
      label: 'Total Poin XP',
      value: `${xp} XP`,
      subtext: 'Poin prestasi belajar',
      icon: Flame,
      color: 'from-amber-400 to-orange-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      iconColor: 'text-amber-700',
    },
    {
      label: 'Rata-rata Skor',
      value: `${averageScore}%`,
      subtext: 'Kategori: Sangat Baik',
      icon: Award,
      color: 'from-purple-400 to-violet-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-700',
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* 4 Colorful Gamified Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`p-5 rounded-3xl border-2 ${stat.borderColor} ${stat.bgColor} shadow-xs hover:shadow-md transition-all duration-200 flex items-center gap-4`}
            >
              <div className={`w-13 h-13 rounded-2xl bg-gradient-to-tr ${stat.color} text-white flex items-center justify-center shadow-md shrink-0`}>
                <Icon className="w-6 h-6 drop-shadow" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-500 truncate">{stat.label}</p>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                  {stat.value}
                </h3>
                <p className="text-[11px] font-semibold text-slate-400 truncate">{stat.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Card Section */}
      <div className="p-6 rounded-3xl bg-white border-2 border-slate-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Progress Kurikulum Ekonomi Kelas X
            </h3>
            <p className="text-xs text-slate-500">
              Kamu telah menyelesaikan <strong>{completedMateri}</strong> dari total <strong>{totalMateri}</strong> bab pembelajaran ekonomi SMA.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-blue-50 text-blue-800 px-3.5 py-1.5 rounded-2xl border border-blue-200 w-fit">
            <span className="text-xs font-bold">Kelulusan:</span>
            <span className="text-base font-black text-blue-700">{progressPercentage}%</span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-2">
          <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 rounded-full transition-all duration-700"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] font-bold text-slate-400">
            <span>Bab 1: Konsep Dasar</span>
            <span>Bab 5: Permintaan & Penawaran</span>
            <span>Bab 10: Sistem Ekonomi</span>
          </div>
        </div>
      </div>

    </div>
  );
}
