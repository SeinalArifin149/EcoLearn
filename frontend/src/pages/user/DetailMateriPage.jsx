import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { materiService } from '../../services/materiService';
import ChapterCard from '../../components/materi/ChapterCard';
import MateriContent from '../../components/materi/MateriContent';
import ChapterNavigation from '../../components/materi/ChapterNavigation';
import CharacterIllustration from '../../components/common/CharacterIllustration';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';
import {
  ArrowLeft,
  Clock,
  BookOpen,
  CheckCircle2,
  Award,
  Sparkles,
  Trophy,
} from 'lucide-react';

export default function DetailMateriPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const userId = user?.id || 'usr-001';
  const navigate = useNavigate();

  // Load materi data with user progress
  const [materi, setMateri] = useState(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [completionNotice, setCompletionNotice] = useState('');

  useEffect(() => {
    const loadedMateri = materiService.getMateriById(id, userId);
    if (loadedMateri) {
      setMateri(loadedMateri);

      // Restore last opened chapter if available
      const lastChapterIdx = loadedMateri.chapters.findIndex(
        (ch) => ch.id === loadedMateri.lastChapterId
      );
      if (lastChapterIdx >= 0) {
        setActiveChapterIndex(lastChapterIdx);
      }
    }
  }, [id, userId]);

  if (!materi) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <EmptyState
          character="boy"
          expression="curious"
          title="Topik Materi Tidak Ditemukan"
          description="Materi dengan kode atau ID tersebut tidak terdaftar di kurikulum Ekonomi SMA."
          actionText="Kembali ke Daftar Materi"
          onAction={() => navigate('/materi')}
        />
      </div>
    );
  }

  const activeChapter = materi.chapters[activeChapterIndex] || materi.chapters[0];
  const isCurrentCompleted = materi.completedChapters.includes(activeChapter.id);
  const isAllCompleted = materi.chapters.every((ch) =>
    materi.completedChapters.includes(ch.id)
  );

  // Switch Subbab
  const handleSelectChapter = (chapter) => {
    const idx = materi.chapters.findIndex((ch) => ch.id === chapter.id);
    if (idx >= 0) {
      setActiveChapterIndex(idx);
      materiService.saveLastOpenedChapter(materi.id, chapter.id, userId);
    }
  };

  // Mark Subbab Completed
  const handleMarkComplete = () => {
    const result = materiService.markChapterCompleted(materi.id, activeChapter.id, userId);
    if (result) {
      setMateri((prev) => ({
        ...prev,
        progress: result.progress,
        status: result.status,
        completedChapters: result.completedChapters,
      }));

      if (result.progress === 100) {
        setCompletionNotice('🎉 Selamat! Kamu telah menuntaskan seluruh subbab pada materi ini! (+50 XP)');
      } else {
        setCompletionNotice('✓ Subbab berhasil ditandai selesai! (+15 XP)');
      }

      setTimeout(() => {
        setCompletionNotice('');
      }, 3500);
    }
  };

  const handlePrevious = () => {
    if (activeChapterIndex > 0) {
      const prevIdx = activeChapterIndex - 1;
      setActiveChapterIndex(prevIdx);
      const prevChapter = materi.chapters[prevIdx];
      materiService.saveLastOpenedChapter(materi.id, prevChapter.id, userId);
    }
  };

  const handleNext = () => {
    if (activeChapterIndex < materi.chapters.length - 1) {
      const nextIdx = activeChapterIndex + 1;
      setActiveChapterIndex(nextIdx);
      const nextChapter = materi.chapters[nextIdx];
      materiService.saveLastOpenedChapter(materi.id, nextChapter.id, userId);
    }
  };

  const handleGoToQuiz = () => {
    navigate('/ujian', { state: { materiId: materi.id, materiTitle: materi.title } });
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      
      {/* Back Link */}
      <div>
        <Link
          to="/materi"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Materi
        </Link>
      </div>

      {/* Header Topic Banner with Explaining Character */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="space-y-3 text-center md:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="text-xs font-black px-3 py-1 rounded-full bg-blue-100 text-blue-700">
              {materi.chapterNum}
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
              {materi.category}
            </span>
            <span
              className={`text-xs font-black px-3 py-1 rounded-full border ${
                materi.progress === 100
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : materi.progress > 0
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-slate-50 text-slate-500 border-slate-200'
              }`}
            >
              {materi.progress === 100 ? 'Materi Tuntas ✓' : `${materi.progress}% Dipelajari`}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            {materi.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl">
            {materi.summary}
          </p>

          {/* Quick Progress Bar on Header */}
          <div className="pt-1 max-w-md space-y-1">
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${materi.progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-bold text-slate-400">
              <span>{materi.completedChapters.length} dari {materi.chapters.length} Subbab Tuntas</span>
              <span>{materi.progress}%</span>
            </div>
          </div>
        </div>

        <div className="shrink-0 flex items-center justify-center">
          <CharacterIllustration
            expression="explaining"
            size="lg"
            alt="Karakter Menjelaskan Konsep Ekonomi"
            className="drop-shadow-xl"
          />
        </div>

      </div>

      {/* Completion Toast Notification */}
      {completionNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-emerald-800 text-xs sm:text-sm font-black flex items-center gap-2.5 shadow-sm animate-fadeIn">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{completionNotice}</span>
        </div>
      )}

      {/* Main Study Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Subchapters Sidebar */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              Daftar Subtopik
            </h3>
            <span className="text-xs font-bold text-slate-400">
              {activeChapterIndex + 1} / {materi.chapters.length}
            </span>
          </div>

          <div className="space-y-2">
            {materi.chapters.map((ch, idx) => (
              <ChapterCard
                key={ch.id}
                chapter={ch}
                index={idx}
                isCurrent={activeChapter.id === ch.id}
                isCompleted={materi.completedChapters.includes(ch.id)}
                onSelect={handleSelectChapter}
              />
            ))}
          </div>

          {/* Quick Quiz Shortcut Card on Sidebar */}
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 space-y-2">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <h5 className="text-xs font-black text-blue-900">Uji Pemahaman Bab</h5>
            </div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Setelah membaca seluruh subtopik, ukur pemahamanmu dengan kuis berbatas waktu.
            </p>
            <Button
              variant={isAllCompleted ? 'amber' : 'outline'}
              size="sm"
              fullWidth
              onClick={handleGoToQuiz}
              className="mt-1"
            >
              {isAllCompleted ? 'Kerjakan Ujian Bab Sekarang!' : 'Lihat Kuis Bab'}
            </Button>
          </div>
        </div>

        {/* Right Column: Active Content Reader & Navigation */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-sm space-y-8">
          
          {/* Subchapter Content */}
          <MateriContent
            chapter={activeChapter}
            htmlFallback={materi.content}
          />

          {/* Bottom Interactive Navigation Controls */}
          <ChapterNavigation
            currentIndex={activeChapterIndex}
            totalChapters={materi.chapters.length}
            isCurrentCompleted={isCurrentCompleted}
            isAllCompleted={isAllCompleted}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onMarkComplete={handleMarkComplete}
            onGoToQuiz={handleGoToQuiz}
          />

        </div>

      </div>

    </div>
  );
}
