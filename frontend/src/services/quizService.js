import { storageService } from './storageService';
import { authService } from './authService';

const getHistoryKey = (userId) => `ecolearn_quiz_history_${userId || 'guest'}`;
const getDraftKey = (userId, materiId) => `ecolearn_quiz_draft_${userId || 'guest'}_${materiId || 'default'}`;

export const quizService = {
  // Ambil riwayat seluruh pengerjaan kuis pengguna
  getQuizHistory(userId) {
    const key = getHistoryKey(userId);
    return storageService.get(key, []);
  },

  // Simpan riwayat hasil kuis dan update poin XP serta lencana
  saveQuizResult(userId, resultData) {
    const key = getHistoryKey(userId);
    const history = this.getQuizHistory(userId);

    const historyItem = {
      id: `quiz-res-${Date.now()}`,
      materiId: resultData.materiId,
      materiTitle: resultData.materiTitle || 'Evaluasi Ekonomi',
      score: resultData.score,
      correctCount: resultData.correctCount,
      wrongCount: resultData.wrongCount,
      unansweredCount: resultData.unansweredCount,
      totalQuestions: resultData.totalQuestions,
      isPassed: resultData.isPassed,
      xpEarned: resultData.xpEarned || 0,
      durationSeconds: resultData.durationSeconds || 0,
      submittedAt: new Date().toISOString(),
      answers: resultData.answers || {},
    };

    // Tambahkan ke riwayat
    const updatedHistory = [historyItem, ...history];
    storageService.set(key, updatedHistory);

    // Hapus draft pengerjaan
    this.clearQuizDraft(userId, resultData.materiId);

    // Periksa pencapaian / lencana baru
    const newBadges = [];
    const currentUser = authService.getCurrentUser();

    if (currentUser) {
      const existingBadgeIds = (currentUser.badges || []).map((b) => b.id);

      // 1. Badge Kuis Perdana
      if (!existingBadgeIds.includes('b-quiz-first')) {
        newBadges.push({
          id: 'b-quiz-first',
          title: 'Kuis Perdana',
          desc: 'Berhasil menyelesaikan evaluasi kuis pertama di EcoLearn',
          icon: '🎯',
          color: 'bg-blue-100 text-blue-800 border-blue-300',
          unlockedAt: 'Hari ini',
        });
      }

      // 2. Badge Nilai Unggul (>= 80)
      if (resultData.score >= 80 && !existingBadgeIds.includes('b-quiz-good')) {
        newBadges.push({
          id: 'b-quiz-good',
          title: 'Analis Berbakat',
          desc: 'Meraih skor 80 atau lebih pada evaluasi ekonomi',
          icon: '⭐',
          color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          unlockedAt: 'Hari ini',
        });
      }

      // 3. Badge Skor Sempurna (100)
      if (resultData.score === 100 && !existingBadgeIds.includes('b-quiz-perfect')) {
        newBadges.push({
          id: 'b-quiz-perfect',
          title: 'Ekonom Sempurna',
          desc: 'Menuntaskan seluruh soal kuis dengan nilai 100 tanpa salah!',
          icon: '👑',
          color: 'bg-amber-100 text-amber-800 border-amber-300',
          unlockedAt: 'Hari ini',
        });
      }

      // Update XP dan riwayat aktivitas pengguna
      const newXp = (currentUser.xp || 1450) + (resultData.xpEarned || 0);
      const newActivities = [
        {
          id: `act-quiz-${Date.now()}`,
          type: 'quiz',
          title: `Menyelesaikan Kuis: ${resultData.materiTitle}`,
          detail: `Skor ${resultData.score}/100 • ${resultData.isPassed ? 'Lulus' : 'Belum Lulus'}`,
          xp: `+${resultData.xpEarned} XP`,
          time: 'Baru saja',
          iconType: 'trophy',
        },
        ...(currentUser.recentActivities || []),
      ].slice(0, 8); // Simpan 8 aktivitas terakhir

      const updatedUser = {
        ...currentUser,
        xp: newXp,
        badges: [...(currentUser.badges || []), ...newBadges],
        recentActivities: newActivities,
        completedExams: updatedHistory.filter((h) => h.isPassed).length,
      };

      storageService.set('ecolearn_auth_user', updatedUser);
    }

    return {
      historyItem,
      newBadges,
    };
  },

  // Statistik akumulatif pengerjaan kuis pengguna
  getQuizStats(userId) {
    const history = this.getQuizHistory(userId);
    if (!history || history.length === 0) {
      return {
        totalExams: 0,
        passedExams: 0,
        averageScore: 0,
        highestScore: 0,
        totalXp: 0,
        recentResults: [],
      };
    }

    const totalExams = history.length;
    const passedExams = history.filter((h) => h.isPassed).length;
    const totalScore = history.reduce((acc, curr) => acc + (curr.score || 0), 0);
    const averageScore = Math.round(totalScore / totalExams);
    const highestScore = Math.max(...history.map((h) => h.score || 0));
    const totalXp = history.reduce((acc, curr) => acc + (curr.xpEarned || 0), 0);

    return {
      totalExams,
      passedExams,
      averageScore,
      highestScore,
      totalXp,
      recentResults: history.slice(0, 5),
    };
  },

  // Simpan draft pengerjaan kuis (agar saat refresh tidak hilang)
  saveQuizDraft(userId, materiId, draftData) {
    const key = getDraftKey(userId, materiId);
    storageService.set(key, {
      ...draftData,
      updatedAt: Date.now(),
    });
  },

  // Ambil draft pengerjaan kuis jika tersedia
  getQuizDraft(userId, materiId) {
    const key = getDraftKey(userId, materiId);
    return storageService.get(key, null);
  },

  // Bersihkan draft
  clearQuizDraft(userId, materiId) {
    const key = getDraftKey(userId, materiId);
    storageService.remove(key);
  },
};
