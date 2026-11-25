import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getQuizByMateriId } from '../../data/quizData';
import { evaluateQuizResult } from '../../utils/calculateScore';
import { quizService } from '../../services/quizService';
import QuizInstructions from '../../components/ujian/QuizInstructions';
import QuestionCard from '../../components/ujian/QuestionCard';
import AnswerOption from '../../components/ujian/AnswerOption';
import QuestionNavigation from '../../components/ujian/QuestionNavigation';
import QuizTimer from '../../components/ujian/QuizTimer';
import QuizConfirmModal from '../../components/ujian/QuizConfirmModal';
import Button from '../../components/common/Button';
import CharacterIllustration from '../../components/common/CharacterIllustration';
import { ChevronLeft, ChevronRight, CheckCircle, Flag } from 'lucide-react';

export default function UjianPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const userId = user?.id || 'usr-001';

  // Ambil materiId dari router state atau searchParams
  const queryMateriId = searchParams.get('materi');
  const materiId = location.state?.materiId || queryMateriId || 'materi-1';
  const customMateriTitle = location.state?.materiTitle || null;

  // Dapatkan dataset kuis untuk topik ini
  const quiz = getQuizByMateriId(materiId);
  const materiTitle = customMateriTitle || quiz.title;

  // States pengerjaan
  const [isStarted, setIsStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  const [timeLeft, setTimeLeft] = useState(quiz.totalTime || 900);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Periksa apakah ada draft tersimpan sebelumnya saat pertama kali buka
  useEffect(() => {
    const savedDraft = quizService.getQuizDraft(userId, quiz.materiId);
    if (savedDraft) {
      setAnswers(savedDraft.answers || {});
      setFlagged(savedDraft.flagged || {});
      setCurrentIdx(savedDraft.currentIdx || 0);
      if (savedDraft.timeLeft > 0) {
        setTimeLeft(savedDraft.timeLeft);
        setIsStarted(true);
      }
    }
  }, [userId, quiz.materiId]);

  // Simpan draft secara berkala ke localStorage
  useEffect(() => {
    if (isStarted) {
      quizService.saveQuizDraft(userId, quiz.materiId, {
        answers,
        flagged,
        currentIdx,
        timeLeft,
      });
    }
  }, [answers, flagged, currentIdx, timeLeft, isStarted, userId, quiz.materiId]);

  // Countdown timer interval
  useEffect(() => {
    if (!isStarted) return;

    if (timeLeft <= 0) {
      handleFinishQuiz(true); // Auto-submit saat waktu habis
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishQuiz(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, timeLeft]);

  // Handler memilih opsi
  const handleSelectOption = (optionId) => {
    const currentQ = quiz.questions[currentIdx];
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  // Toggle tanda ragu-ragu
  const handleToggleFlag = () => {
    const currentQ = quiz.questions[currentIdx];
    setFlagged((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  // Selesaikan kuis dan simpan data
  const handleFinishQuiz = (isTimeUp = false) => {
    setIsConfirmOpen(false);
    const evaluation = evaluateQuizResult(answers, quiz.questions);
    const durationSeconds = (quiz.totalTime || 900) - timeLeft;

    const saveResult = quizService.saveQuizResult(userId, {
      ...evaluation,
      materiId: quiz.materiId,
      materiTitle: quiz.title,
      durationSeconds,
      answers,
    });

    // Navigasi ke halaman hasil evaluasi
    navigate('/ujian/hasil', {
      state: {
        score: evaluation.score,
        correctCount: evaluation.correctCount,
        wrongCount: evaluation.wrongCount,
        unansweredCount: evaluation.unansweredCount,
        totalQuestions: evaluation.totalQuestions,
        tier: evaluation.tier,
        tierTitle: evaluation.tierTitle,
        tierColor: evaluation.tierColor,
        xpEarned: evaluation.xpEarned,
        isPassed: evaluation.isPassed,
        durationSeconds,
        materiId: quiz.materiId,
        materiTitle: quiz.title,
        questions: quiz.questions,
        userAnswers: answers,
        newBadges: saveResult.newBadges || [],
        isTimeUp,
      },
    });
  };

  // Jika belum mulai ujian, tampilkan halaman instruksi
  if (!isStarted) {
    return (
      <QuizInstructions
        materiTitle={materiTitle}
        totalQuestions={quiz.questions.length}
        durationMinutes={Math.round((quiz.totalTime || 900) / 60)}
        passingScore={quiz.passingScore || 70}
        onStart={() => setIsStarted(true)}
        onBack={() => navigate(`/materi/${quiz.materiId}`)}
      />
    );
  }

  const currentQuestion = quiz.questions[currentIdx];
  const answeredCount = Object.keys(answers).filter(
    (k) => answers[k] !== undefined && answers[k] !== null && answers[k] !== ''
  ).length;
  const unansweredCount = quiz.questions.length - answeredCount;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;
  const isCurrentFlagged = !!flagged[currentQuestion.id];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16 animate-fadeIn">
      
      {/* Quiz Top Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center md:text-left">
          <CharacterIllustration
            expression="thinking"
            size="sm"
            alt="Karakter Siswa Berpikir Mengerjakan Soal"
            className="shrink-0 hidden sm:inline-flex"
          />
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                Ujian Evaluasi Bab
              </span>
              <span className="text-xs font-bold text-slate-400">
                KKM {quiz.passingScore || 70}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
              {quiz.title}
            </h2>
          </div>
        </div>

        {/* Live Timer Counter */}
        <div className="shrink-0">
          <QuizTimer
            timeLeft={timeLeft}
            totalSeconds={quiz.totalTime || 900}
            onTimeUp={() => handleFinishQuiz(true)}
          />
        </div>
      </div>

      {/* Main Examination Layout: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (8 cols): Question Card & Options */}
        <div className="lg:col-span-8 space-y-6">
          <QuestionCard
            currentQuestion={currentIdx + 1}
            totalQuestions={quiz.questions.length}
            question={currentQuestion}
            isFlagged={isCurrentFlagged}
          >
            {currentQuestion.options.map((opt, optIdx) => {
              const optId = typeof opt === 'object' ? opt.id : ['A', 'B', 'C', 'D', 'E'][optIdx];
              const isSelected = answers[currentQuestion.id] === optId;

              return (
                <AnswerOption
                  key={optId}
                  option={opt}
                  index={optIdx}
                  isSelected={isSelected}
                  onSelect={() => handleSelectOption(optId)}
                />
              );
            })}
          </QuestionCard>

          {/* Navigation Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <Button
              variant="secondary"
              onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
              disabled={currentIdx === 0}
              icon={ChevronLeft}
            >
              Sebelumnya
            </Button>

            <button
              type="button"
              onClick={handleToggleFlag}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border cursor-pointer ${
                isCurrentFlagged
                  ? 'bg-amber-500 text-white border-amber-500 shadow-2xs'
                  : 'bg-white text-amber-700 border-amber-300 hover:bg-amber-50'
              }`}
            >
              <Flag className="w-3.5 h-3.5 fill-current" />
              <span>{isCurrentFlagged ? 'Tanda Ragu Aktif' : 'Tandai Ragu-ragu'}</span>
            </button>

            {currentIdx < quiz.questions.length - 1 ? (
              <Button
                variant="primary"
                onClick={() => setCurrentIdx(currentIdx + 1)}
              >
                <span>Selanjutnya</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                variant="amber"
                icon={CheckCircle}
                onClick={() => setIsConfirmOpen(true)}
              >
                Selesaikan Ujian
              </Button>
            )}
          </div>
        </div>

        {/* Right Column (4 cols): Question Navigation Palette */}
        <div className="lg:col-span-4 space-y-6">
          <QuestionNavigation
            questions={quiz.questions}
            currentIndex={currentIdx}
            answers={answers}
            flagged={flagged}
            onSelectIndex={(targetIdx) => setCurrentIdx(targetIdx)}
            onToggleFlag={handleToggleFlag}
          />

          {/* Selesaikan Ujian Card Button */}
          <div className="bg-white rounded-3xl p-5 border-2 border-slate-100 shadow-sm space-y-3 text-center">
            <div className="space-y-1">
              <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Siap Mengumpulkan?
              </h5>
              <p className="text-[11px] text-slate-400">
                Kamu dapat mengakhiri sesi kapan saja jika seluruh jawaban sudah diperiksa.
              </p>
            </div>
            <Button
              variant="amber"
              fullWidth
              icon={CheckCircle}
              onClick={() => setIsConfirmOpen(true)}
            >
              Selesaikan & Kumpulkan
            </Button>
          </div>
        </div>

      </div>

      {/* Confirmation Modal */}
      <QuizConfirmModal
        isOpen={isConfirmOpen}
        totalQuestions={quiz.questions.length}
        answeredCount={answeredCount}
        unansweredCount={unansweredCount}
        flaggedCount={flaggedCount}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={() => handleFinishQuiz(false)}
      />

    </div>
  );
}
