import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Flag, 
  Send, 
  RotateCcw,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { PRETEST_QUESTIONS, POSTTEST_QUESTIONS } from '../../data/evaluasiData';
import { evaluasiService } from '../../services/evaluasiService';
import EvaluasiInstructions from '../../components/evaluasi/EvaluasiInstructions';
import EvaluasiTimer from '../../components/evaluasi/EvaluasiTimer';
import EvaluasiQuestionCard from '../../components/evaluasi/EvaluasiQuestionCard';
import EvaluasiAnswerOption from '../../components/evaluasi/EvaluasiAnswerOption';
import EvaluasiNavigation from '../../components/evaluasi/EvaluasiNavigation';
import EvaluasiConfirmModal from '../../components/evaluasi/EvaluasiConfirmModal';

const TEST_DURATION_MINUTES = 60;

export default function EvaluasiTestPage({ forcedType }) {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id || 'guest_user';

  // Determine testType: prop -> url params -> fallback 'pretest'
  const rawType = forcedType || params.testType || 'pretest';
  const testType = rawType.toLowerCase().includes('post') ? 'posttest' : 'pretest';

  const questions = useMemo(() => {
    return testType === 'posttest' ? POSTTEST_QUESTIONS : PRETEST_QUESTIONS;
  }, [testType]);

  const [phase, setPhase] = useState('instructions'); // 'instructions' | 'active'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [endTime, setEndTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasExistingDraft, setHasExistingDraft] = useState(false);

  // Check for existing draft on load
  useEffect(() => {
    const draft = evaluasiService.loadEvaluasiDraft(userId, testType);
    if (draft && draft.endTime && draft.endTime > Date.now()) {
      setHasExistingDraft(true);
    } else {
      setHasExistingDraft(false);
    }
  }, [userId, testType]);

  // Start fresh test
  const handleStartNewTest = () => {
    const durationMs = TEST_DURATION_MINUTES * 60 * 1000;
    const calculatedEndTime = Date.now() + durationMs;
    
    setEndTime(calculatedEndTime);
    setStartTime(Date.now());
    setUserAnswers({});
    setFlaggedQuestions([]);
    setCurrentIndex(0);
    setPhase('active');

    // Save initial draft
    evaluasiService.saveEvaluasiDraft(userId, testType, {
      currentIndex: 0,
      userAnswers: {},
      flaggedQuestions: [],
      endTime: calculatedEndTime,
      startTime: Date.now()
    });
  };

  // Resume test from draft
  const handleResumeDraft = () => {
    const draft = evaluasiService.loadEvaluasiDraft(userId, testType);
    if (draft && draft.endTime && draft.endTime > Date.now()) {
      setEndTime(draft.endTime);
      setStartTime(draft.startTime || Date.now());
      setUserAnswers(draft.userAnswers || {});
      setFlaggedQuestions(draft.flaggedQuestions || []);
      setCurrentIndex(draft.currentIndex || 0);
      setPhase('active');
    } else {
      // Draft expired, start new
      handleStartNewTest();
    }
  };

  // Autosave draft on changes
  useEffect(() => {
    if (phase === 'active' && endTime) {
      evaluasiService.saveEvaluasiDraft(userId, testType, {
        currentIndex,
        userAnswers,
        flaggedQuestions,
        endTime,
        startTime: startTime || Date.now()
      });
    }
  }, [phase, currentIndex, userAnswers, flaggedQuestions, endTime, startTime, userId, testType]);

  // Answer selection handler
  const handleSelectAnswer = (optionKey) => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionKey
    }));
  };

  // Toggle flag (ragu-ragu)
  const handleToggleFlag = () => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    setFlaggedQuestions(prev => {
      if (prev.includes(currentQ.id)) {
        return prev.filter(id => id !== currentQ.id);
      } else {
        return [...prev, currentQ.id];
      }
    });
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSelectQuestion = (index) => {
    if (index >= 0 && index < questions.length) {
      setCurrentIndex(index);
    }
  };

  // Submit test
  const handleFinalSubmit = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const now = Date.now();
    const actualDurationSeconds = startTime ? Math.round((now - startTime) / 1000) : 0;

    // Save through evaluasiService (handles scoring, XP, badges, and history)
    const result = evaluasiService.saveEvaluasiAttempt(
      userId, 
      testType, 
      userAnswers, 
      actualDurationSeconds
    );

    // Clear draft
    evaluasiService.clearEvaluasiDraft(userId, testType);

    // Redirect to result page
    navigate(`/evaluasi/hasil/${result.attemptId}`, { replace: true });
  };

  // Timer expired handler
  const handleTimerExpire = useCallback(() => {
    // Automatically submit when time is up
    handleFinalSubmit();
  }, [handleFinalSubmit]);

  // Show instructions phase
  if (phase === 'instructions') {
    return (
      <div className="max-w-4xl mx-auto py-4">
        <EvaluasiInstructions 
          testType={testType}
          onStart={handleStartNewTest}
          onBack={() => navigate('/evaluasi')}
          onResume={hasExistingDraft ? handleResumeDraft : null}
          hasDraft={hasExistingDraft}
        />
      </div>
    );
  }

  const flaggedMap = useMemo(() => {
    return Object.fromEntries(flaggedQuestions.map(id => [id, true]));
  }, [flaggedQuestions]);

  const currentQuestion = questions[currentIndex];
  const isFlagged = currentQuestion ? !!flaggedMap[currentQuestion.id] : false;
  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Top Test Header Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm flex flex-wrap items-center justify-between gap-4 sticky top-16 z-20">
        <div className="flex items-center gap-3">
          <Link
            to="/evaluasi"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
            title="Keluar ke Menu Evaluasi (Draft tersimpan)"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div>
            <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
              testType === 'posttest' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {testType.toUpperCase()} EKONOMI
            </span>
            <h1 className="text-base sm:text-lg font-bold text-slate-800">
              {testType === 'posttest' ? 'Posttest Evaluasi Akhir' : 'Pretest Evaluasi Awal'}
            </h1>
          </div>
        </div>

        {/* Timer Component */}
        {endTime && (
          <EvaluasiTimer 
            endTime={endTime} 
            onExpire={handleTimerExpire} 
          />
        )}
      </div>

      {/* Main Test Layout (Question + Sidebar Navigation) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Active Question & Action Controls */}
        <div className="lg:col-span-8 space-y-4">
          {currentQuestion && (
            <EvaluasiQuestionCard 
              question={currentQuestion}
              currentQuestion={currentIndex + 1}
              totalQuestions={questions.length}
              isFlagged={isFlagged}
            >
              {(Array.isArray(currentQuestion.options)
                ? currentQuestion.options
                : Object.entries(currentQuestion.options || {}).map(([key, text]) => ({ id: key, text }))
              ).map((opt, optIdx) => {
                const optId = typeof opt === 'object' && opt.id ? opt.id : ['A', 'B', 'C', 'D', 'E'][optIdx];
                return (
                  <EvaluasiAnswerOption
                    key={optId}
                    option={opt}
                    index={optIdx}
                    isSelected={userAnswers[currentQuestion.id] === optId}
                    onSelect={() => handleSelectAnswer(optId)}
                  />
                );
              })}
            </EvaluasiQuestionCard>
          )}

          {/* Question Action Bar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-wrap items-center justify-between gap-3">
            {/* Prev button */}
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm inline-flex items-center gap-1.5 transition-colors ${
                currentIndex === 0
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Sebelumnya
            </button>

            {/* Ragu-ragu (Flag) button */}
            <button
              onClick={handleToggleFlag}
              className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm inline-flex items-center gap-1.5 transition-all ${
                isFlagged
                  ? 'bg-amber-500 text-white shadow-sm shadow-amber-200'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <Flag className="w-4 h-4" />
              {isFlagged ? 'Tanda Ragu Aktif' : 'Ragu-ragu'}
            </button>

            {/* Next or Finish button */}
            <div className="flex items-center gap-2">
              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-sm shadow-blue-200 transition-colors"
                >
                  Selanjutnya
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-md shadow-emerald-200 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Kumpulkan Ujian
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Question Palette Navigation */}
        <div className="lg:col-span-4 space-y-4">
          <EvaluasiNavigation 
            questions={questions}
            currentIndex={currentIndex}
            answers={userAnswers}
            flagged={flaggedMap}
            onSelectIndex={handleSelectQuestion}
            onToggleFlag={handleToggleFlag}
          />

          {/* Quick Submit Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-800 text-sm">Siap Menyelesaikan?</h4>
            <p className="text-xs text-slate-500">
              Periksa kembali seluruh nomor sebelum mengumpulkan. Kamu telah menjawab <strong>{answeredCount}</strong> dari <strong>{questions.length}</strong> soal.
            </p>
            <button
              onClick={() => setShowConfirmModal(true)}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm shadow-emerald-200 transition-colors inline-flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Selesai & Kumpulkan Jawaban
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <EvaluasiConfirmModal 
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleFinalSubmit}
        answeredCount={answeredCount}
        unansweredCount={unansweredCount}
        flaggedCount={flaggedQuestions.length}
        totalQuestions={questions.length}
        testType={testType}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
