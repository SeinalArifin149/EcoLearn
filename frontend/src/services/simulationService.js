import { storageService } from './storageService.js';
import { authService } from './authService.js';
import { simulationList } from '../data/simulationData.js';

const getProgressKey = (userId) => `ecolearn_simulation_progress_${userId || 'guest'}`;
const getHistoryKey = (userId) => `ecolearn_simulation_history_${userId || 'guest'}`;

export const simulationService = {
  // Ambil daftar seluruh simulasi dilengkapi status progres pengguna saat ini
  getSimulationList(userId) {
    const progressMap = this.getAllUserProgress(userId);

    return simulationList.map((sim) => {
      const itemProgress = progressMap[sim.id] || {
        status: 'Belum Dimulai',
        bestScore: 0,
        lastScore: 0,
        attempts: 0,
        completedAt: null,
      };

      return {
        ...sim,
        status: itemProgress.status,
        bestScore: itemProgress.bestScore,
        lastScore: itemProgress.lastScore,
        attempts: itemProgress.attempts,
        completedAt: itemProgress.completedAt,
      };
    });
  },

  // Ambil data satu simulasi dengan progres pengguna
  getSimulationByIdWithProgress(simId, userId) {
    const progressMap = this.getAllUserProgress(userId);
    const sim = simulationList.find((s) => s.id === simId || s.slug === simId);
    if (!sim) return null;

    const itemProgress = progressMap[sim.id] || {
      status: 'Belum Dimulai',
      bestScore: 0,
      lastScore: 0,
      attempts: 0,
      completedAt: null,
      draftState: null,
    };

    return {
      ...sim,
      ...itemProgress,
    };
  },

  // Ambil seluruh map progress user dari localStorage
  getAllUserProgress(userId) {
    const key = getProgressKey(userId);
    return storageService.get(key, {});
  },

  // Simpan draft/state interaksi simulasi yang sedang berjalan
  saveSimulationDraft(userId, simId, draftData) {
    const key = getProgressKey(userId);
    const progressMap = this.getAllUserProgress(userId);

    const currentItem = progressMap[simId] || {
      status: 'Sedang Berlangsung',
      bestScore: 0,
      lastScore: 0,
      attempts: 0,
      completedAt: null,
    };

    progressMap[simId] = {
      ...currentItem,
      status: currentItem.status === 'Selesai' ? 'Selesai' : 'Sedang Berlangsung',
      draftState: draftData,
      updatedAt: Date.now(),
    };

    storageService.set(key, progressMap);
  },

  // Ambil draft tersimpan jika ada
  getSimulationDraft(userId, simId) {
    const progressMap = this.getAllUserProgress(userId);
    return progressMap[simId]?.draftState || null;
  },

  // Catat penyelesaian simulasi, kalkulasi reward XP, dan penganugerahan badge
  recordSimulationCompletion(userId, simId, { score = 80, challengeResults = [], summary = {} }) {
    const progressKey = getProgressKey(userId);
    const historyKey = getHistoryKey(userId);

    const progressMap = this.getAllUserProgress(userId);
    const historyList = storageService.get(historyKey, []);

    const prevItem = progressMap[simId];
    const isFirstTimeCompletion = !prevItem || prevItem.status !== 'Selesai';
    const prevBestScore = prevItem?.bestScore || 0;
    const isNewHighScore = score > prevBestScore;

    // Hitung XP yang sah (Anti-Duplikasi XP saat refresh/re-run)
    let xpEarned = 0;

    if (isFirstTimeCompletion) {
      // Reward dasar pertama kali menyelesaikan simulasi
      xpEarned += 20;

      // Bonus skor
      if (score >= 90) {
        xpEarned += 20;
      } else if (score >= 70) {
        xpEarned += 10;
      }
    } else if (isNewHighScore) {
      // Jika sebelumnya skor rendah (<70) lalu kini mencapai nilai tinggi (>=70 atau >=90)
      if (prevBestScore < 70 && score >= 90) {
        xpEarned += 20;
      } else if (prevBestScore < 70 && score >= 70) {
        xpEarned += 10;
      } else if (prevBestScore < 90 && score >= 90) {
        xpEarned += 10;
      }
    }

    // Perbarui map progress
    const newBestScore = Math.max(prevBestScore, score);
    progressMap[simId] = {
      status: 'Selesai',
      bestScore: newBestScore,
      lastScore: score,
      attempts: (prevItem?.attempts || 0) + 1,
      completedAt: new Date().toISOString(),
      draftState: null, // bersihkan draft
    };
    storageService.set(progressKey, progressMap);

    // Periksa status penyelesaian seluruh 4 simulasi untuk bonus master
    const allCompletedCount = Object.keys(progressMap).filter(
      (k) => progressMap[k]?.status === 'Selesai'
    ).length;

    let isGrandmasterBonus = false;
    if (allCompletedCount === 4 && isFirstTimeCompletion) {
      // Cek apakah baru pertama kali menuntaskan keempatnya
      const hasGrandmasterAwarded = historyList.some((h) => h.isGrandmasterBonus);
      if (!hasGrandmasterAwarded) {
        xpEarned += 50;
        isGrandmasterBonus = true;
      }
    }

    // Catat ke riwayat
    const simInfo = simulationList.find((s) => s.id === simId) || { title: 'Simulasi Ekonomi' };
    const historyItem = {
      id: `sim-hist-${Date.now()}`,
      simId,
      simTitle: simInfo.title,
      score,
      xpEarned,
      isGrandmasterBonus,
      challengeResults,
      summary,
      completedAt: new Date().toISOString(),
    };

    const updatedHistory = [historyItem, ...historyList];
    storageService.set(historyKey, updatedHistory);

    // Update Pengguna (XP & Badges)
    const newBadges = [];
    const currentUser = authService.getCurrentUser();

    if (currentUser) {
      const existingBadgeIds = (currentUser.badges || []).map((b) => b.id);

      // 1. Badge Penjelajah Ekonomi: menyelesaikan simulasi pertama
      if (!existingBadgeIds.includes('b-sim-explorer')) {
        newBadges.push({
          id: 'b-sim-explorer',
          title: 'Penjelajah Ekonomi',
          desc: 'Menyelesaikan modul simulasi ekonomi interaktif pertama di EcoLearn',
          icon: '🧭',
          color: 'bg-blue-100 text-blue-800 border-blue-300',
          unlockedAt: 'Hari ini',
        });
      }

      // 2. Badge Ahli Pasar: menyelesaikan simulasi permintaan-penawaran & pasar
      const isSupplyDemandDone = progressMap['sim-supply-demand']?.status === 'Selesai';
      const isMarketDone = progressMap['sim-market']?.status === 'Selesai';
      if (isSupplyDemandDone && isMarketDone && !existingBadgeIds.includes('b-sim-market-master')) {
        newBadges.push({
          id: 'b-sim-market-master',
          title: 'Ahli Pasar',
          desc: 'Menguasai simulasi mekanisme harga dan interaksi jual-beli pasar',
          icon: '🏪',
          color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          unlockedAt: 'Hari ini',
        });
      }

      // 3. Badge Manajer Keuangan: simulasi keuangan skor >= 80
      const isFinanceDone = progressMap['sim-finance']?.status === 'Selesai';
      const financeScore = progressMap['sim-finance']?.bestScore || 0;
      if (isFinanceDone && financeScore >= 80 && !existingBadgeIds.includes('b-sim-finance-manager')) {
        newBadges.push({
          id: 'b-sim-finance-manager',
          title: 'Manajer Keuangan',
          desc: 'Mengelola anggaran uang saku dengan skor di atas 80 dan target menabung terpenuhi',
          icon: '💰',
          color: 'bg-amber-100 text-amber-800 border-amber-300',
          unlockedAt: 'Hari ini',
        });
      }

      // 4. Badge Penggerak Ekonomi: simulasi kegiatan ekonomi selesai
      const isFlowDone = progressMap['sim-circular-flow']?.status === 'Selesai';
      if (isFlowDone && !existingBadgeIds.includes('b-sim-flow-mover')) {
        newBadges.push({
          id: 'b-sim-flow-mover',
          title: 'Penggerak Ekonomi',
          desc: 'Menjalankan mata rantai produksi, distribusi logistik, dan konsumsi pasar',
          icon: '⚙️',
          color: 'bg-purple-100 text-purple-800 border-purple-300',
          unlockedAt: 'Hari ini',
        });
      }

      // 5. Badge Master Ekonomi: menyelesaikan seluruh 4 simulasi
      if (allCompletedCount === 4 && !existingBadgeIds.includes('b-sim-grandmaster')) {
        newBadges.push({
          id: 'b-sim-grandmaster',
          title: 'Master Ekonomi',
          desc: 'Berhasil menuntaskan seluruh 4 eksperimen simulasi ekonomi EcoLearn!',
          icon: '👑',
          color: 'bg-amber-100 text-amber-900 border-amber-400',
          unlockedAt: 'Hari ini',
        });
      }

      // Update Akun Pengguna
      const updatedXp = (currentUser.xp || 1450) + xpEarned;
      const newActivity = {
        id: `act-sim-${Date.now()}`,
        type: 'simulation',
        title: `Menyelesaikan ${simInfo.title}`,
        detail: `Skor ${score}/100 • ${xpEarned > 0 ? `+${xpEarned} XP` : 'Evaluasi Berhasil'}`,
        xp: xpEarned > 0 ? `+${xpEarned} XP` : '+0 XP',
        time: 'Baru saja',
        iconType: 'gamepad',
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
      historyItem,
      newBadges,
      xpEarned,
      newBestScore,
      isFirstTimeCompletion,
    };
  },

  // Statistik akumulatif simulasi pengguna
  getSimulationStats(userId) {
    const progressMap = this.getAllUserProgress(userId);
    const historyList = storageService.get(getHistoryKey(userId), []);

    const totalSimulations = simulationList.length; // 4
    const completedSimulations = Object.values(progressMap).filter(
      (item) => item.status === 'Selesai'
    ).length;

    const scores = Object.values(progressMap)
      .filter((item) => item.status === 'Selesai')
      .map((item) => item.bestScore || 0);

    const averageScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    const totalSimulationXp = historyList.reduce((acc, h) => acc + (h.xpEarned || 0), 0);

    // Cari simulasi berikutnya yang disarankan (yang belum selesai)
    const nextRecommended = simulationList.find(
      (s) => !progressMap[s.id] || progressMap[s.id].status !== 'Selesai'
    ) || simulationList[0];

    return {
      totalSimulations,
      completedSimulations,
      averageScore,
      totalSimulationXp,
      nextRecommended,
      recentHistory: historyList.slice(0, 5),
    };
  },
};
