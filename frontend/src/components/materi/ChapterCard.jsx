import React from 'react';
import { CheckCircle2, PlayCircle, Clock } from 'lucide-react';

export default function ChapterCard({
  chapter,
  index,
  isCurrent,
  isCompleted,
  onSelect,
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(chapter)}
      className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${
        isCurrent
          ? 'bg-blue-50/90 border-blue-500 shadow-sm shadow-blue-500/10'
          : isCompleted
          ? 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-300'
          : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/80'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Status Indicator Icon / Number */}
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
            isCompleted
              ? 'bg-emerald-500 text-white'
              : isCurrent
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-500'
          }`}
        >
          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
        </div>

        <div className="min-w-0">
          <h4
            className={`text-xs sm:text-sm font-black truncate leading-snug ${
              isCurrent ? 'text-blue-900' : isCompleted ? 'text-emerald-900' : 'text-slate-800'
            }`}
          >
            {chapter.title}
          </h4>
          <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 mt-0.5">
            <Clock className="w-3 h-3" /> {chapter.duration}
          </span>
        </div>
      </div>

      <div className="shrink-0">
        {isCompleted ? (
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
            Selesai
          </span>
        ) : isCurrent ? (
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
          </span>
        ) : (
          <PlayCircle className="w-4 h-4 text-slate-300 hover:text-slate-500" />
        )}
      </div>
    </button>
  );
}
