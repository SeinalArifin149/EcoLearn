import React from 'react';
import { History, BookOpen, Trophy, Award, CheckCircle2, Clock } from 'lucide-react';
import EmptyState from '../common/EmptyState';

export default function ActivityCard({ activities = [] }) {
  const getIcon = (type) => {
    switch (type) {
      case 'quiz':
        return <Trophy className="w-4 h-4 text-amber-500" />;
      case 'materi':
        return <BookOpen className="w-4 h-4 text-emerald-500" />;
      case 'badge':
        return <Award className="w-4 h-4 text-purple-500" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-blue-500" />;
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case 'quiz':
        return 'bg-amber-100/70 border-amber-200';
      case 'materi':
        return 'bg-emerald-100/70 border-emerald-200';
      case 'badge':
        return 'bg-purple-100/70 border-purple-200';
      default:
        return 'bg-blue-100/70 border-blue-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <History className="w-5 h-5 text-emerald-600" />
          Aktivitas Belajar Terakhir
        </h3>
        <span className="text-[11px] font-bold text-slate-400">Riwayat Terkini</span>
      </div>

      <div className="divide-y divide-slate-100">
        {activities.length > 0 ? (
          activities.map((item) => (
            <div
              key={item.id}
              className="py-3.5 first:pt-1 last:pb-1 flex items-start gap-3.5 hover:bg-slate-50/70 p-2 rounded-2xl transition-colors"
            >
              <div
                className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${getIconBg(
                  item.type
                )}`}
              >
                {getIcon(item.type)}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-black text-slate-800 leading-snug">
                  {item.title}
                </p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 font-medium">
                  <span>{item.detail}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3 h-3" /> {item.time}
                  </span>
                </div>
              </div>

              <div className="shrink-0 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-xl text-xs font-black border border-emerald-200">
                {item.xp}
              </div>
            </div>
          ))
        ) : (
          <EmptyState
            character="boy"
            expression="curious"
            title="Belum Ada Riwayat Aktivitas"
            description="Kamu belum memiliki riwayat belajar yang tercatat. Selesaikan bab materi pertamamu hari ini!"
          />
        )}
      </div>
    </div>
  );
}
