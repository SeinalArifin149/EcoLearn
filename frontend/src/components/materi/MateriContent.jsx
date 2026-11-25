import React from 'react';
import { BookOpen, CheckCircle, HelpCircle, Lightbulb, Clock, Sparkles } from 'lucide-react';
import CharacterIllustration from '../common/CharacterIllustration';

export default function MateriContent({ chapter, htmlFallback }) {
  if (!chapter) {
    return (
      <div className="p-8 text-center text-slate-400 text-sm">
        Pilih subtopik di menu samping untuk memulai pembelajaran.
      </div>
    );
  }

  return (
    <article className="space-y-6">
      
      {/* Chapter Title & Header */}
      <div className="border-b border-slate-100 pb-5 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            Subbab Pembelajaran
          </span>
          <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
            <Clock className="w-3.5 h-3.5" /> Estimasi {chapter.duration}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
          {chapter.title}
        </h2>

        {chapter.summary && (
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {chapter.summary}
          </p>
        )}
      </div>

      {/* 1. Teori & Penjelasan Konsep */}
      {chapter.theory ? (
        <div className="space-y-4 text-slate-700 text-sm leading-relaxed prose prose-slate max-w-none">
          <div
            dangerouslySetInnerHTML={{ __html: chapter.theory }}
            className="space-y-3 [&_p]:leading-relaxed [&_p]:mb-3 [&_strong]:text-slate-900 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
          />
        </div>
      ) : htmlFallback ? (
        <div
          dangerouslySetInnerHTML={{ __html: htmlFallback }}
          className="space-y-3 text-slate-700 text-sm leading-relaxed"
        />
      ) : null}

      {/* 2. Poin-Poin Penting (Key Points) */}
      {chapter.keyPoints && chapter.keyPoints.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50/60 p-5 sm:p-6 rounded-3xl border border-blue-200/80 space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-blue-900 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            Poin Penting yang Wajib Kamu Ingat:
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-blue-950 font-medium">
            {chapter.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 3. Contoh Kasus Nyata dalam Kehidupan Sehari-hari */}
      {chapter.example && (
        <div
          dangerouslySetInnerHTML={{ __html: chapter.example }}
          className="my-4"
        />
      )}

      {/* 4. Pertanyaan Refleksi Siswa dengan Maskot Thinking */}
      {chapter.reflection && (
        <div className="bg-amber-50/70 border-2 border-amber-200/80 p-5 sm:p-6 rounded-3xl space-y-3">
          <div className="flex items-start gap-4">
            <CharacterIllustration
              expression="thinking"
              size="sm"
              alt="Karakter Siswa Berpikir Refleksi"
              className="shrink-0 hidden sm:inline-flex"
            />
            <div className="space-y-1.5 flex-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Tantangan Berpikir Ekonom Muda
              </span>
              <h5 className="text-sm font-black text-slate-900">Pertanyaan Refleksi Mandiri:</h5>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                "{chapter.reflection}"
              </p>
            </div>
          </div>
        </div>
      )}

    </article>
  );
}
