import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { quizService } from '../../services/quizService';
import { getQuizByMateriId } from '../../data/quizData';
import QuizResult from '../../components/ujian/QuizResult';
import QuizReview from '../../components/ujian/QuizReview';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function HasilUjianPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id || 'usr-001';
  const reviewRef = useRef(null);

  // Fallback data jika dibuka langsung tanpa router state
  const latestHistory = quizService.getQuizHistory(userId)?.[0] || null;
  const stateData = location.state || {};

  const materiId = stateData.materiId || latestHistory?.materiId || 'materi-1';
  const quizDataset = getQuizByMateriId(materiId);

  const materiTitle = stateData.materiTitle || latestHistory?.materiTitle || quizDataset.title;
  const score = stateData.score ?? latestHistory?.score ?? 80;
  const correctCount = stateData.correctCount ?? latestHistory?.correctCount ?? 8;
  const wrongCount = stateData.wrongCount ?? latestHistory?.wrongCount ?? 2;
  const unansweredCount = stateData.unansweredCount ?? latestHistory?.unansweredCount ?? 0;
  const totalQuestions = stateData.totalQuestions ?? latestHistory?.totalQuestions ?? 10;
  const tier = stateData.tier ?? (score >= 90 ? 'Sangat Baik' : score >= 80 ? 'Baik' : score >= 70 ? 'Cukup' : 'Perlu Belajar Lagi');
  const tierTitle = stateData.tierTitle ?? (score >= 90 ? 'Ekonom Handal' : score >= 80 ? 'Paham Konsep' : score >= 70 ? 'Lulus KKM' : 'Tetap Semangat!');
  const tierColor = stateData.tierColor ?? (score >= 90 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-blue-50 text-blue-700 border-blue-200');
  const xpEarned = stateData.xpEarned ?? latestHistory?.xpEarned ?? 40;
  const durationSeconds = stateData.durationSeconds ?? latestHistory?.durationSeconds ?? 385;
  const newBadges = stateData.newBadges || [];

  const questions = stateData.questions || quizDataset.questions;
  const userAnswers = stateData.userAnswers || latestHistory?.answers || {};

  const handleScrollToReview = () => {
    if (reviewRef.current) {
      reviewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRetry = () => {
    quizService.clearQuizDraft(userId, materiId);
    navigate('/ujian', { state: { materiId, materiTitle } });
  };

  const handleBackToMateri = () => {
    navigate(`/materi/${materiId}`);
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 animate-fadeIn">
      
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleBackToMateri}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Pembelajaran: {materiTitle}
        </button>

        <span className="text-xs font-bold text-slate-400">
          Evaluasi Selesai • Skor {score}/100
        </span>
      </div>

      {/* Main Result Card */}
      <QuizResult
        score={score}
        correctCount={correctCount}
        wrongCount={wrongCount}
        unansweredCount={unansweredCount}
        totalQuestions={totalQuestions}
        tier={tier}
        tierTitle={tierTitle}
        tierColor={tierColor}
        xpEarned={xpEarned}
        durationSeconds={durationSeconds}
        newBadges={newBadges}
        materiTitle={materiTitle}
        onRetry={handleRetry}
        onBack={handleBackToMateri}
        onGoToDashboard={handleGoToDashboard}
        onViewReview={handleScrollToReview}
      />

      {/* Pembahasan & Review Soal */}
      <div ref={reviewRef} className="pt-4">
        <QuizReview questions={questions} userAnswers={userAnswers} />
      </div>

    </div>
  );
}
