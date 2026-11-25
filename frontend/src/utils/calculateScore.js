/**
 * Utilitas Penghitungan Skor dan Evaluasi Kuis Interaktif EcoLearn
 */

/**
 * Evaluasi komprehensif hasil kuis: skor, rincian benar/salah, tier, kelulusan, dan poin XP
 */
export function evaluateQuizResult(userAnswers = {}, questions = []) {
  if (!questions || questions.length === 0) {
    return {
      score: 0,
      totalQuestions: 0,
      correctCount: 0,
      wrongCount: 0,
      unansweredCount: 0,
      isPassed: false,
      tier: 'Perlu Belajar Lagi',
      tierTitle: 'Tetap Semangat!',
      tierColor: 'bg-rose-50 text-rose-700 border-rose-200',
      xpEarned: 10,
    };
  }

  const totalQuestions = questions.length;
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  questions.forEach((q) => {
    const userChoice = userAnswers[q.id];
    if (userChoice === undefined || userChoice === null || userChoice === '') {
      unansweredCount += 1;
    } else if (String(userChoice).toUpperCase() === String(q.correctAnswer).toUpperCase()) {
      correctCount += 1;
    } else {
      wrongCount += 1;
    }
  });

  const score = Math.round((correctCount / totalQuestions) * 100);
  const isPassed = score >= 70;

  let tier = 'Perlu Belajar Lagi';
  let tierTitle = 'Tetap Semangat!';
  let tierColor = 'bg-rose-50 text-rose-700 border-rose-200';
  let xpEarned = 10; // Partisipasi minimal

  if (score >= 90) {
    tier = 'Sangat Baik';
    tierTitle = 'Ekonom Handal';
    tierColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    xpEarned = 50;
  } else if (score >= 80) {
    tier = 'Baik';
    tierTitle = 'Paham Konsep';
    tierColor = 'bg-blue-50 text-blue-700 border-blue-200';
    xpEarned = 40;
  } else if (score >= 70) {
    tier = 'Cukup';
    tierTitle = 'Lulus KKM';
    tierColor = 'bg-amber-50 text-amber-700 border-amber-200';
    xpEarned = 30;
  }

  return {
    score,
    totalQuestions,
    correctCount,
    wrongCount,
    unansweredCount,
    isPassed,
    tier,
    tierTitle,
    tierColor,
    xpEarned,
  };
}

/**
 * Fungsi kalkulasi dasar untuk kompatibilitas kode sebelumnya
 */
export function calculateScore(userAnswers = {}, questions = []) {
  const result = evaluateQuizResult(userAnswers, questions);
  return result.score;
}
