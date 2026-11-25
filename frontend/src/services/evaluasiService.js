import { storageService } from './storageService';
import { authService } from './authService';
import { compareLearningGrowth } from '../utils/evaluasiScoring';

const getHistoryKey = (userId) => `ecolearn_evaluasi_history_${userId || 'guest'}`;
const getDraftKey = (userId, testType) => `ecolearn_evaluasi_draft_${userId || 'guest'}_${testType || 'pretest'}`;
const getSummaryKey = (userId) => `ecolearn_evaluasi_summary_${userId || 'guest'}`;

export const evaluasiService = {
  // Ambil riwayat seluruh pengerjaan evaluasi pengguna
  getEvaluasiHistory(userId) {
    const key = getHistoryKey(userId);
    return storageService.get(key, []);
  },

  // Ambil satu record pengerjaan berdasarkan attemptId
  getAttemptById(userId, attemptId) {
    const history = this.getEvaluasiHistory(userId);
    return history.find((h) => h.id === attemptId) || null;
  },

  // Ambil ringkasan status Pretest & Posttest pengguna
  getEvaluasiSummary(userId) {
    const history = this.getEvaluasiHistory(userId);

    const pretestList = history.filter((h) => h.testType === 'pretest');
    const posttestList = history.filter((h) => h.testType === 'posttest');

    // Gunakan pretest pertama sebagai acuan awal, dan posttest terbaik untuk pengukuran perkembangan
    const initialPretest = pretestList[pretestList.length - 1] || null;
    const latestPretest = pretestList[0] || null;

    const bestPosttest = posttestList.length > 0
      ? [...posttestList].sort((a, b) => b.score - a.score)[0]
      : null;
    const latestPosttest = posttestList[0] || null;

    // Komparasi perkembangan
    const comparison = compareLearningGrowth(initialPretest, bestPosttest);

    return {
      hasPretest: !!latestPretest,
      hasPosttest: !!latestPosttest,
      isBothCompleted: !!latestPretest && !!latestPosttest,
      initialPretest,
      latestPretest,
      bestPosttest,
      latestPosttest,
      comparison,
      totalAttempts: history.length,
    };
  },

  // Simpan draft pengerjaan evaluasi (termasuk timestamp endTime mutlak)
  saveEvaluasiDraft(userId, testType, draftData) {
    const key = getDraftKey(userId, testType);
    storageService.set(key, {
      ...draftData,
      updatedAt: Date.now(),
    });
  },

  // Ambil draft evaluasi jika masih aktif
  getEvaluasiDraft(userId, testType) {
    const key = getDraftKey(userId, testType);
    const draft = storageService.get(key, null);
    if (!draft) return null;

    // Periksa apakah waktu pengerjaan sudah habis (expired)
    const now = Date.now();
    if (draft.endTime && now >= draft.endTime) {
      return {
        ...draft,
        isExpired: true,
      };
    }

    return {
      ...draft,
      isExpired: false,
    };
  },

  // Bersihkan draft setelah tes selesai dikumpulkan
  clearEvaluasiDraft(userId, testType) {
    const key = getDraftKey(userId, testType);
    storageService.remove(key);
  },

  // Simpan hasil pengerjaan tes, update XP dan lencana
  recordEvaluasiCompletion(userId, {
    testType = 'pretest',
    score = 0,
    correctCount = 0,
    wrongCount = 0,
    unansweredCount = 0,
    totalQuestions = 50,
    isPassed = false,
    category = 'Cukup',
    categoryColor = '',
    durationSeconds = 0,
    answers = {},
    topicPerformance = [],
  }) {
    const historyKey = getHistoryKey(userId);
    const history = this.getEvaluasiHistory(userId);

    const attemptId = `eval-${testType}-${Date.now()}`;
    const completedAt = new Date().toISOString();

    const attempt = {
      id: attemptId,
      testType,
      score,
      correctCount,
      wrongCount,
      unansweredCount,
      totalQuestions,
      isPassed,
      category,
      categoryColor,
      durationSeconds,
      answers,
      topicPerformance,
      completedAt,
    };

    // Tambahkan ke riwayat
    const updatedHistory = [attempt, ...history];
    storageService.set(historyKey, updatedHistory);

    // Hapus draft aktif
    this.clearEvaluasiDraft(userId, testType);

    // Aturan Perhitungan Reward XP (Anti-duplikasi saat refresh / re-run)
    const isFirstTimeTestType = !history.some((h) => h.testType === testType);
    const prevBestScore = history
      .filter((h) => h.testType === testType)
      .reduce((max, h) => Math.max(max, h.score), 0);
    const isNewHighScore = score > prevBestScore;

    let xpEarned = 0;

    if (testType === 'pretest') {
      // Pretest: +10 XP satu kali saat pertama kali selesai
      if (isFirstTimeTestType) {
        xpEarned += 10;
      }
    } else {
      // Posttest:
      if (isFirstTimeTestType) {
        xpEarned += 20; // reward dasar
        if (score >= 90) xpEarned += 20;
        else if (score >= 70) xpEarned += 10;
      } else if (isNewHighScore) {
        if (prevBestScore < 70 && score >= 90) xpEarned += 20;
        else if (prevBestScore < 70 && score >= 70) xpEarned += 10;
        else if (prevBestScore < 90 && score >= 90) xpEarned += 10;
      }
    }

    // Periksa bonus penyelesaian kedua tes (Pretest + Posttest)
    const hasPre = testType === 'pretest' || history.some((h) => h.testType === 'pretest');
    const hasPost = testType === 'posttest' || history.some((h) => h.testType === 'posttest');
    const hasBothAwarded = history.some((h) => h.isBothCompletedBonus);

    let isBothCompletedBonus = false;
    if (hasPre && hasPost && !hasBothAwarded && isFirstTimeTestType) {
      xpEarned += 20;
      isBothCompletedBonus = true;
    }

    attempt.xpEarned = xpEarned;
    attempt.isBothCompletedBonus = isBothCompletedBonus;

    // Periksa dan berikan Lencana (Badges)
    const newBadges = [];
    const currentUser = authService.getCurrentUser();

    if (currentUser) {
      const existingBadgeIds = (currentUser.badges || []).map((b) => b.id);

      // 1. Peserta Evaluasi: menyelesaikan Pretest
      if (testType === 'pretest' && !existingBadgeIds.includes('b-eval-pretest')) {
        newBadges.push({
          id: 'b-eval-pretest',
          title: 'Peserta Evaluasi',
          desc: 'Menuntaskan tes diagnostik awal (Pretest) Ekonomi Kelas X',
          icon: '📝',
          color: 'bg-blue-100 text-blue-800 border-blue-300',
          unlockedAt: 'Hari ini',
        });
      }

      // 2. Pejuang Belajar: menyelesaikan Posttest
      if (testType === 'posttest' && !existingBadgeIds.includes('b-eval-posttest')) {
        newBadges.push({
          id: 'b-eval-posttest',
          title: 'Pejuang Belajar',
          desc: 'Berhasil menyelesaikan tes akhir (Posttest) Ekonomi SMA',
          icon: '🎓',
          color: 'bg-indigo-100 text-indigo-800 border-indigo-300',
          unlockedAt: 'Hari ini',
        });
      }

      // 3. Peningkatan Hebat: nilai Posttest lebih tinggi dari Pretest
      const pretestRecord = history.find((h) => h.testType === 'pretest');
      if (
        testType === 'posttest' &&
        pretestRecord &&
        score > pretestRecord.score &&
        !existingBadgeIds.includes('b-eval-improved')
      ) {
        newBadges.push({
          id: 'b-eval-improved',
          title: 'Peningkatan Hebat',
          desc: 'Mencapai skor Posttest yang lebih tinggi dibandingkan Pretest',
          icon: '📈',
          color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          unlockedAt: 'Hari ini',
        });
      }

      // 4. Tuntas Belajar: Posttest >= 70
      if (testType === 'posttest' && score >= 70 && !existingBadgeIds.includes('b-eval-passed')) {
        newBadges.push({
          id: 'b-eval-passed',
          title: 'Tuntas Belajar',
          desc: 'Memenuhi batas KKM kelulusan materi Ekonomi Kelas X (skor >= 70)',
          icon: '🌟',
          color: 'bg-amber-100 text-amber-800 border-amber-300',
          unlockedAt: 'Hari ini',
        });
      }

      // 5. Bintang Ekonomi: Posttest >= 90
      if (testType === 'posttest' && score >= 90 && !existingBadgeIds.includes('b-eval-star')) {
        newBadges.push({
          id: 'b-eval-star',
          title: 'Bintang Ekonomi',
          desc: 'Meraih skor gemilang di atas 90 pada ujian akhir Posttest',
          icon: '👑',
          color: 'bg-amber-100 text-amber-900 border-amber-400',
          unlockedAt: 'Hari ini',
        });
      }

      // Update akun pengguna di localStorage
      const updatedXp = (currentUser.xp || 1450) + xpEarned;
      const newActivity = {
        id: `act-eval-${Date.now()}`,
        type: 'evaluation',
        title: `Menyelesaikan ${testType === 'pretest' ? 'Pretest' : 'Posttest'} Ekonomi`,
        detail: `Skor ${score}/100 • ${isPassed ? 'Tuntas' : 'Perlu Peningkatan'}`,
        xp: xpEarned > 0 ? `+${xpEarned} XP` : '+0 XP',
        time: 'Baru saja',
        iconType: 'award',
      };

      const updatedUser = {
        ...currentUser,
        xp: updatedXp,
        badges: [...(currentUser.badges || []), ...newBadges],
        recentActivities: [newActivity, ...(currentUser.recentActivities || [])].slice(0, 8),
      };

      storageService.set('ecolearn_auth_user', updatedUser);
    }

    return {
      attempt,
      newBadges,
      xpEarned,
      isFirstTimeTestType,
    };
  },
};
