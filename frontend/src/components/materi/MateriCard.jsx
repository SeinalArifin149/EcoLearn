import React from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  BookOpen,
  CheckCircle2,
  Play,
  TrendingUp,
  AlertCircle,
  Package,
  Factory,
  LineChart,
  Store,
  Users,
  Coins,
  Scale,
  Globe,
  ArrowRight,
} from 'lucide-react';
import Button from '../common/Button';

// Dynamic icon selector for each economics topic
const iconMap = {
  TrendingUp,
  AlertCircle,
  Package,
  Factory,
  LineChart,
  Store,
  Users,
  Coins,
  Scale,
  Globe,
};

export default function MateriCard({ materi }) {
  const IconComponent = iconMap[materi.icon] || BookOpen;

  const getAccentStyles = (accent) => {
    switch (accent) {
      case 'emerald':
      case 'teal':
        return {
          iconBg: 'bg-emerald-100 text-emerald-700',
          borderHover: 'hover:border-emerald-300',
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        };
      case 'orange':
      case 'amber':
        return {
          iconBg: 'bg-amber-100 text-amber-700',
          borderHover: 'hover:border-amber-300',
          badge: 'bg-amber-50 text-amber-700 border-amber-200',
        };
      case 'purple':
      case 'rose':
        return {
          iconBg: 'bg-purple-100 text-purple-700',
          borderHover: 'hover:border-purple-300',
          badge: 'bg-purple-50 text-purple-700 border-purple-200',
        };
      default:
        return {
          iconBg: 'bg-blue-100 text-blue-700',
          borderHover: 'hover:border-blue-300',
          badge: 'bg-blue-50 text-blue-700 border-blue-200',
        };
    }
  };

  const styles = getAccentStyles(materi.accentColor);
  const isCompleted = materi.progress === 100;
  const isInProgress = materi.progress > 0 && materi.progress < 100;

  return (
    <div
      className={`group bg-white rounded-3xl p-6 border-2 border-slate-100 ${styles.borderHover} shadow-sm hover:shadow-xl hover:shadow-blue-950/5 transition-all duration-300 flex flex-col justify-between`}
    >
      <div className="space-y-4">
        
        {/* Top Badges & Icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-2xl ${styles.iconBg} flex items-center justify-center shadow-xs transition-transform group-hover:scale-110`}>
              <IconComponent className="w-5 h-5" />
            </div>
            <span className="text-xs font-black text-slate-700 px-3 py-1 bg-slate-100 rounded-xl">
              {materi.chapterNum}
            </span>
          </div>

          <span
            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
              isCompleted
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : isInProgress
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-slate-50 text-slate-500 border-slate-200'
            }`}
          >
            {materi.status || (isCompleted ? 'Selesai' : isInProgress ? 'Sedang Berjalan' : 'Belum Dimulai')}
          </span>
        </div>

        {/* Title & Category */}
        <div className="space-y-1">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            {materi.category}
          </span>
          <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
            {materi.title}
          </h3>
        </div>

        {/* Summary Description */}
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
          {materi.summary}
        </p>

        {/* Metadata (Duration & Subbab) */}
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 pt-1">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {materi.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            {materi.chapters?.length || 0} Subtopik
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between items-center text-[11px] font-bold">
            <span className="text-slate-400">Progres Bab</span>
            <span className={isCompleted ? 'text-emerald-600 font-black' : isInProgress ? 'text-amber-600' : 'text-slate-400'}>
              {materi.progress || 0}%
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/80">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isCompleted
                  ? 'bg-emerald-500'
                  : isInProgress
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                  : 'bg-transparent'
              }`}
              style={{ width: `${materi.progress || 0}%` }}
            />
          </div>
        </div>

      </div>

      {/* Action CTA Button */}
      <div className="pt-5 mt-4 border-t border-slate-100">
        <Link to={`/materi/${materi.id}`} className="block">
          <Button
            variant={isCompleted ? 'outline' : isInProgress ? 'amber' : 'primary'}
            size="sm"
            fullWidth
            icon={isCompleted ? CheckCircle2 : Play}
          >
            {isCompleted ? 'Pelajari Ulang' : isInProgress ? 'Lanjutkan Belajar' : 'Mulai Belajar'}
          </Button>
        </Link>
      </div>
    </div>
  );
}
