import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Award, Sparkles } from 'lucide-react';
import Button from '../common/Button';

export default function ChapterNavigation({
  currentIndex,
  totalChapters,
  isCurrentCompleted,
  isAllCompleted,
  onPrevious,
  onNext,
  onMarkComplete,
  onGoToQuiz,
}) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalChapters - 1;

  return (
    <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
      
      {/* Tombol Sebelumnya */}
      <Button
        variant="secondary"
        size="md"
        icon={ArrowLeft}
        onClick={onPrevious}
        disabled={isFirst}
        className="w-full sm:w-auto"
      >
        Sebelumnya
      </Button>

      {/* Action Center: Tandai Selesai / Ujian */}
      <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto justify-center">
        <Button
          variant={isCurrentCompleted ? 'outline' : 'green'}
          size="md"
          icon={CheckCircle2}
          onClick={onMarkComplete}
          className="w-full sm:w-auto"
        >
          {isCurrentCompleted ? 'Subbab Selesai ✓' : 'Tandai Selesai (+15 XP)'}
        </Button>

        {isAllCompleted && (
          <Button
            variant="amber"
            size="md"
            icon={Award}
            onClick={onGoToQuiz}
            className="w-full sm:w-auto animate-bounce"
          >
            Kerjakan Ujian Bab!
          </Button>
        )}
      </div>

      {/* Tombol Selanjutnya */}
      <Button
        variant="primary"
        size="md"
        onClick={isLast ? onGoToQuiz : onNext}
        className="w-full sm:w-auto"
      >
        <span>{isLast ? 'Ujian Materi' : 'Selanjutnya'}</span>
        <ArrowRight className="w-4 h-4 ml-1" />
      </Button>

    </div>
  );
}
