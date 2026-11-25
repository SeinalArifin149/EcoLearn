import React from 'react';
import { ArrowLeft, Clock, Award, Sparkles, BookOpen } from 'lucide-react';
import CharacterIllustration from '../common/CharacterIllustration';

export default function SimulationHeader({
  title,
  category = 'Mekanisme Pasar',
  duration = '10-15 Menit',
  summary,
  learningObjectives = [],
  characterExpression = 'learning',
  onBack,
}) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-sm space-y-6">
      {/* Back button & Category badge */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Menu Simulasi
          </button>
        )}

        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            {category}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {duration}
          </span>
        </div>
      </div>

      {/* Main Banner with Mascot */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center sm:text-left flex-1">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl">
            {summary}
          </p>

          {/* Learning Objectives Pill List */}
          {learningObjectives.length > 0 && (
            <div className="pt-2 space-y-1.5 text-left">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                Tujuan Eksperimen:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600 font-medium">
                {learningObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Character Illustration Mascot */}
        <div className="shrink-0 flex items-center justify-center">
          <CharacterIllustration
            expression={characterExpression}
            size="lg"
            alt="Karakter Siswa Simulasi Ekonomi"
            className="drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}
