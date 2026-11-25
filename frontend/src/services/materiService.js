import { storageService } from './storageService';
import { materiList as fallbackMateriList } from '../data/materiData';
import { adminMateriService } from './adminMateriService';
import { authService } from './authService';

const getBaseMateriList = () => {
  try {
    return adminMateriService.getAllMateri();
  } catch {
    return fallbackMateriList;
  }
};

const getProgressStorageKey = (userId) => `ecolearn_materi_progress_${userId || 'guest'}`;

export const materiService = {
  // Get all user progress map from localStorage
  getUserProgress(userId) {
    const key = getProgressStorageKey(userId);
    return storageService.get(key, {});
  },

  // Save progress map to localStorage
  saveUserProgress(userId, progressData) {
    const key = getProgressStorageKey(userId);
    storageService.set(key, progressData);
  },

  // Get single materi by ID (supports '1' or 'materi-1') with live progress attached
  getMateriById(id, userId) {
    const cleanId = String(id).replace('materi-', '');
    const currentList = getBaseMateriList();
    const materi = currentList.find(
      (m) => m.id === id || m.id === `materi-${cleanId}` || m.id === cleanId
    );

    if (!materi) return null;

    const userProgress = this.getUserProgress(userId);
    const itemProgress = userProgress[materi.id] || {
      completedChapters: [],
      lastChapterId: materi.chapters?.[0]?.id || null,
      status: 'not_started',
      updatedAt: null,
    };

    const totalChapters = materi.chapters?.length || 1;
    const completedCount = itemProgress.completedChapters?.length || 0;
    const progress = Math.min(100, Math.round((completedCount / totalChapters) * 100));

    let status = 'not_started';
    if (progress === 100) {
      status = 'completed';
    } else if (progress > 0) {
      status = 'in_progress';
    }

    return {
      ...materi,
      progress,
      status,
      completedChapters: itemProgress.completedChapters || [],
      lastChapterId: itemProgress.lastChapterId || materi.chapters?.[0]?.id,
    };
  },

  // Get all 10 materi list with merged dynamic progress for the current user
  getAllMateriWithProgress(userId) {
    const userProgress = this.getUserProgress(userId);

    return getBaseMateriList().map((materi) => {
      const itemProgress = userProgress[materi.id];
      const totalChapters = materi.chapters?.length || 1;

      if (!itemProgress) {
        // Default initial state: Bab 1 has some initial progress if not yet tracked
        return {
          ...materi,
          progress: materi.progress || 0,
          status: materi.status || 'Belum Dimulai',
          completedChapters: [],
          lastChapterId: materi.chapters?.[0]?.id,
        };
      }

      const completedCount = itemProgress.completedChapters?.length || 0;
      const progress = Math.min(100, Math.round((completedCount / totalChapters) * 100));

      let status = 'Belum Dimulai';
      let badgeColor = 'bg-slate-100 text-slate-700 border-slate-300';

      if (progress === 100) {
        status = 'Selesai';
        badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
      } else if (progress > 0) {
        status = 'Sedang Berjalan';
        badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
      }

      return {
        ...materi,
        progress,
        status,
        badgeColor,
        completedChapters: itemProgress.completedChapters || [],
        lastChapterId: itemProgress.lastChapterId || materi.chapters?.[0]?.id,
      };
    });
  },

  // Mark a chapter/subbab as completed
  markChapterCompleted(materiId, chapterId, userId) {
    const userProgress = this.getUserProgress(userId);
    const materi = materiList.find((m) => m.id === materiId || m.id === `materi-${materiId}`);

    if (!materi) return null;

    const currentMateriProgress = userProgress[materi.id] || {
      completedChapters: [],
      lastChapterId: chapterId,
      status: 'in_progress',
    };

    const completedSet = new Set(currentMateriProgress.completedChapters || []);
    const isNewCompletion = !completedSet.has(chapterId);

    completedSet.add(chapterId);
    const updatedCompletedList = Array.from(completedSet);
    const totalChapters = materi.chapters?.length || 1;
    const progress = Math.min(100, Math.round((updatedCompletedList.length / totalChapters) * 100));

    let status = progress === 100 ? 'completed' : 'in_progress';

    userProgress[materi.id] = {
      completedChapters: updatedCompletedList,
      lastChapterId: chapterId,
      status,
      updatedAt: new Date().toISOString(),
    };

    this.saveUserProgress(userId, userProgress);

    // If new completion, award XP to the user in localStorage
    if (isNewCompletion) {
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        const xpEarned = progress === 100 ? 50 : 15;
        const updatedUser = {
          ...currentUser,
          xp: (currentUser.xp || 1450) + xpEarned,
          completedMateri: this.getCompletedMateriCount(userId),
        };
        storageService.set('ecolearn_auth_user', updatedUser);
      }
    }

    return {
      progress,
      status,
      completedChapters: updatedCompletedList,
    };
  },

  // Save last opened chapter
  saveLastOpenedChapter(materiId, chapterId, userId) {
    const userProgress = this.getUserProgress(userId);
    const materi = materiList.find((m) => m.id === materiId || m.id === `materi-${materiId}`);
    if (!materi) return;

    if (!userProgress[materi.id]) {
      userProgress[materi.id] = {
        completedChapters: [],
        lastChapterId: chapterId,
        status: 'in_progress',
        updatedAt: new Date().toISOString(),
      };
    } else {
      userProgress[materi.id].lastChapterId = chapterId;
      userProgress[materi.id].updatedAt = new Date().toISOString();
    }

    this.saveUserProgress(userId, userProgress);
  },

  // Count total completed topics
  getCompletedMateriCount(userId) {
    const userProgress = this.getUserProgress(userId);
    let count = 0;

    materiList.forEach((m) => {
      const p = userProgress[m.id];
      if (p && p.completedChapters?.length === m.chapters?.length) {
        count += 1;
      }
    });

    return count;
  },

  // Calculate learning progress statistics
  getProgressStatistics(userId) {
    const list = this.getAllMateriWithProgress(userId);
    const totalMateri = list.length;
    let completed = 0;
    let inProgress = 0;
    let notStarted = 0;
    let totalProgressSum = 0;

    list.forEach((item) => {
      totalProgressSum += item.progress || 0;
      if (item.progress === 100) {
        completed += 1;
      } else if (item.progress > 0) {
        inProgress += 1;
      } else {
        notStarted += 1;
      }
    });

    const overallPercentage = totalMateri > 0 ? Math.round(totalProgressSum / totalMateri) : 0;

    return {
      totalMateri,
      completed,
      inProgress,
      notStarted,
      overallPercentage,
    };
  },
};
