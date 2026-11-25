import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, BarChart3, RotateCcw } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { evaluasiService } from '../../services/evaluasiService';
import { PRETEST_QUESTIONS, POSTTEST_QUESTIONS } from '../../data/evaluasiData';
import EvaluasiResult from '../../components/evaluasi/EvaluasiResult';
import EvaluasiReview from '../../components/evaluasi/EvaluasiReview';
import TopicPerformanceAnalysis from '../../components/evaluasi/TopicPerformanceAnalysis';

export default function HasilEvaluasiPage() {
  const { attemptId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const userId = user?.id || 'guest_user';

  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);
  const reviewRef = useRef(null);

  useEffect(() => {
    if (!attemptId) {
      setLoading(false);
      return;
    }
    const data = evaluasiService.getEvaluasiAttemptById(userId, attemptId);
    setAttempt(data);
    setLoading(false);
  }, [userId, attemptId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center text-slate-500">
        Memuat data hasil evaluasi...
      </div>
    );
  }

  if (!attempt) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-800">Hasil Evaluasi Tidak Ditemukan</h2>
          <p className="text-sm text-slate-500">
            Data pengerjaan ujian dengan ID tersebut tidak ditemukan pada riwayat akunmu.
          </p>
          <div className="pt-2">
            <Link
              to="/evaluasi"
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors inline-block"
            >
              Kembali ke Menu Evaluasi
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isPosttest = attempt.testType === 'posttest';
  const questions = isPosttest ? POSTTEST_QUESTIONS : PRETEST_QUESTIONS;

  const handleRetest = () => {
    navigate(`/evaluasi/${attempt.testType}`);
  };

  const handleScrollToReview = () => {
    if (reviewRef.current) {
      reviewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Build simplified topic breakdown from attempt.topicPerformance
  const topicList = attempt.topicPerformance 
    ? Object.values(attempt.topicPerformance).map(tp => ({
        topicId: tp.topicId,
        topicName: tp.topicName,
        pretestCorrect: tp.correct,
        pretestTotal: tp.total,
        pretestRate: tp.percentage,
        posttestCorrect: tp.correct,
        posttestTotal: tp.total,
        posttestRate: tp.percentage,
        rateDifference: 0,
        status: tp.percentage >= 80 ? 'Sangat Baik' : tp.percentage >= 60 ? 'Cukup' : 'Perlu Penguatan'
      }))
    : [];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn pb-16">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/evaluasi"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Hub Evaluasi
        </Link>
      </div>

      {/* Primary Score & Result Summary */}
      <EvaluasiResult 
        attempt={attempt}
        onRetest={handleRetest}
        onViewReview={handleScrollToReview}
      />

      {/* Topic Mastery Summary */}
      {topicList.length > 0 && (
        <div className="space-y-4">
          <TopicPerformanceAnalysis topicComparisons={topicList} />
        </div>
      )}

      {/* Full Question Review */}
      <div ref={reviewRef} className="pt-4">
        <EvaluasiReview 
          questions={questions}
          userAnswers={attempt.userAnswers || {}}
          testType={attempt.testType}
        />
      </div>
    </div>
  );
}
