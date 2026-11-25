import { storageService } from './storageService';
import { materiList as defaultMateriList } from '../data/materiData';
import { sanitizeInput, sanitizeTextarea, validateSecurity } from '../utils/security';

const ADMIN_MATERI_KEY = 'ecolearn_admin_materi_list';

export const adminMateriService = {
  // Ambil semua daftar materi (menggabungkan materi bawaan & perubahan tersimpan admin)
  getAllMateri() {
    const saved = storageService.get(ADMIN_MATERI_KEY, null);
    if (saved && Array.isArray(saved) && saved.length > 0) {
      return saved;
    }
    // Jika belum ada modifikasi, salin materi bawaan
    storageService.set(ADMIN_MATERI_KEY, defaultMateriList);
    return defaultMateriList;
  },

  getMateriById(id) {
    const list = this.getAllMateri();
    const cleanId = String(id).replace('materi-', '');
    return list.find(m => m.id === id || m.id === `materi-${cleanId}` || m.id === cleanId) || null;
  },

  updateMateri(id, updatedData) {
    if (updatedData.title) {
      const sec = validateSecurity(updatedData.title);
      if (!sec.isValid) throw new Error(sec.error);
    }
    if (updatedData.description) {
      const sec = validateSecurity(updatedData.description);
      if (!sec.isValid) throw new Error(sec.error);
    }

    const list = this.getAllMateri();
    const cleanId = String(id).replace('materi-', '');
    const index = list.findIndex(m => m.id === id || m.id === `materi-${cleanId}` || m.id === cleanId);

    if (index === -1) {
      throw new Error(`Materi dengan ID ${id} tidak ditemukan.`);
    }

    const current = list[index];

    const updated = {
      ...current,
      ...updatedData,
      title: sanitizeInput(updatedData.title || current.title, 120),
      description: sanitizeTextarea(updatedData.description || current.description, 1000),
      duration: sanitizeInput(updatedData.duration || current.duration, 30),
      indicator: sanitizeInput(updatedData.indicator || current.indicator || '', 200),
      status: updatedData.status || current.status || 'Aktif',
      chapters: Array.isArray(updatedData.chapters) ? updatedData.chapters : current.chapters,
      updatedAt: new Date().toISOString(),
    };

    list[index] = updated;
    storageService.set(ADMIN_MATERI_KEY, list);
    return updated;
  },

  createMateri(formData) {
    const secTitle = validateSecurity(formData.title);
    if (!secTitle.isValid) throw new Error(secTitle.error);

    if (!formData.title || formData.title.trim().length < 3) {
      throw new Error('Judul materi wajib diisi minimal 3 karakter.');
    }

    const list = this.getAllMateri();
    const nextBabNumber = list.length + 1;
    const newId = `materi-${nextBabNumber}`;

    const newMateri = {
      id: newId,
      number: nextBabNumber,
      title: sanitizeInput(formData.title, 120),
      description: sanitizeTextarea(formData.description || '', 1000),
      duration: sanitizeInput(formData.duration || '45 menit', 30),
      difficulty: formData.difficulty || 'Sedang',
      category: formData.category || 'Ekonomi SMA Kelas X',
      icon: formData.icon || 'BookOpen',
      color: formData.color || 'from-blue-600 to-indigo-600',
      status: formData.status || 'Aktif',
      chapters: Array.isArray(formData.chapters) && formData.chapters.length > 0 
        ? formData.chapters 
        : [
            { id: `${newId}-sub-1`, title: 'Subbab 1: Pengantar Konsep', duration: '15 Menit', summary: 'Pengantar materi awal' },
            { id: `${newId}-sub-2`, title: 'Subbab 2: Analisis & Studi Kasus', duration: '20 Menit', summary: 'Penerapan konsep' },
            { id: `${newId}-sub-3`, title: 'Subbab 3: Rangkuman & Kuis', duration: '10 Menit', summary: 'Evaluasi pemahaman' },
          ],
      createdAt: new Date().toISOString(),
    };

    const updatedList = [...list, newMateri];
    storageService.set(ADMIN_MATERI_KEY, updatedList);
    return newMateri;
  },

  deleteMateri(id) {
    const list = this.getAllMateri();
    const cleanId = String(id).replace('materi-', '');
    const filtered = list.filter(m => m.id !== id && m.id !== `materi-${cleanId}` && m.id !== cleanId);
    
    // Re-number
    const renumbered = filtered.map((m, idx) => ({
      ...m,
      number: idx + 1
    }));

    storageService.set(ADMIN_MATERI_KEY, renumbered);
    return true;
  },

  resetToDefault() {
    storageService.set(ADMIN_MATERI_KEY, defaultMateriList);
    return defaultMateriList;
  }
};
