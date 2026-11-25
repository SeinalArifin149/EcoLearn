import { storageService } from './storageService';
import { initialSiswaList } from '../data/siswaData';
import { 
  sanitizeInput, 
  sanitizeTextarea, 
  validateSecurity, 
  isValidEmail, 
  isValidNISN, 
  isValidPhone, 
  safeFilter 
} from '../utils/security';
import { configService } from './configService';

const SISWA_STORAGE_KEY = 'ecolearn_siswa_list';

export const siswaService = {
  // Ambil semua siswa dari storage (atau inisialisasi awal)
  getAllSiswa(filters = {}) {
    let list = storageService.get(SISWA_STORAGE_KEY, null);
    if (!list || !Array.isArray(list)) {
      list = [...initialSiswaList];
      storageService.set(SISWA_STORAGE_KEY, list);
    }

    const { search = '', kelas = 'all', statusLulus = 'all' } = filters;
    const kkm = configService.getConfig().kkmScore || 70;

    // Filter pencarian aman (Anti-XSS / Injeksi)
    if (search && search.trim()) {
      list = safeFilter(list, search, ['name', 'nisn', 'email', 'kelas']);
    }

    // Filter kelas
    if (kelas && kelas !== 'all') {
      list = list.filter((s) => s.kelas === kelas);
    }

    // Filter status kelulusan posttest
    if (statusLulus && statusLulus !== 'all') {
      if (statusLulus === 'lulus') {
        list = list.filter((s) => (s.posttest ?? 0) >= kkm);
      } else if (statusLulus === 'remedial') {
        list = list.filter((s) => (s.posttest ?? 0) < kkm);
      }
    }

    return list;
  },

  getSiswaById(id) {
    const list = this.getAllSiswa();
    return list.find((s) => s.id === id) || null;
  },

  createSiswa(formData) {
    // Validasi keamanan input
    const secName = validateSecurity(formData.name);
    const secNisn = validateSecurity(formData.nisn);
    if (!secName.isValid) throw new Error(secName.error);
    if (!secNisn.isValid) throw new Error(secNisn.error);

    if (!formData.name || formData.name.trim().length < 3) {
      throw new Error('Nama lengkap wajib diisi minimal 3 karakter.');
    }

    const cleanNisn = (formData.nisn || '').trim();
    if (cleanNisn && !isValidNISN(cleanNisn)) {
      throw new Error('NISN harus terdiri dari 10 digit angka.');
    }

    const cleanEmail = (formData.email || '').trim();
    if (cleanEmail && !isValidEmail(cleanEmail)) {
      throw new Error('Format email tidak valid.');
    }

    const cleanPhone = (formData.phone || '').trim();
    if (cleanPhone && !isValidPhone(cleanPhone)) {
      throw new Error('Format nomor telepon / WhatsApp tidak valid.');
    }

    const list = this.getAllSiswa();
    
    // Cek duplikasi NISN
    if (cleanNisn && list.some(s => s.nisn === cleanNisn)) {
      throw new Error(`Siswa dengan NISN ${cleanNisn} sudah terdaftar.`);
    }

    const pretestScore = formData.pretest !== undefined && formData.pretest !== '' 
      ? Math.min(100, Math.max(0, Number(formData.pretest))) 
      : 0;
    const posttestScore = formData.posttest !== undefined && formData.posttest !== '' 
      ? Math.min(100, Math.max(0, Number(formData.posttest))) 
      : null;

    const gain = posttestScore !== null ? posttestScore - pretestScore : 0;

    const newSiswa = {
      id: `sis-${Date.now().toString(36)}`,
      nisn: cleanNisn || `008${Math.floor(1000000 + Math.random() * 9000000)}`,
      name: sanitizeInput(formData.name, 80),
      email: cleanEmail || `${formData.name.toLowerCase().replace(/\s+/g, '.')}@ecolearn.id`,
      phone: cleanPhone || '081234567890',
      gender: formData.gender === 'Perempuan' ? 'Perempuan' : 'Laki-laki',
      kelas: formData.kelas || 'X-1',
      status: formData.status || 'Aktif',
      joinedAt: new Date().toISOString().split('T')[0],
      avatarColor: formData.gender === 'Perempuan' ? 'bg-pink-600' : 'bg-blue-600',
      pretest: pretestScore,
      posttest: posttestScore,
      gain,
      rataRataKuis: 0,
      quizBab: formData.quizBab || {},
      xp: 100,
      lencanaCount: 1,
      catatan: sanitizeTextarea(formData.catatan || '', 500)
    };

    const updatedList = [newSiswa, ...list];
    storageService.set(SISWA_STORAGE_KEY, updatedList);
    return newSiswa;
  },

  updateSiswa(id, updatedData) {
    const list = this.getAllSiswa();
    const index = list.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new Error('Data siswa tidak ditemukan.');
    }

    if (updatedData.name) {
      const sec = validateSecurity(updatedData.name);
      if (!sec.isValid) throw new Error(sec.error);
    }

    const current = list[index];

    const pretest = updatedData.pretest !== undefined 
      ? Number(updatedData.pretest) 
      : current.pretest;
    const posttest = updatedData.posttest !== undefined && updatedData.posttest !== null && updatedData.posttest !== ''
      ? Number(updatedData.posttest)
      : current.posttest;

    const gain = posttest !== null && pretest !== null ? posttest - pretest : 0;

    // Hitung rata-rata kuis jika ada quizBab baru
    let rataRataKuis = current.rataRataKuis;
    const mergedQuiz = { ...current.quizBab, ...(updatedData.quizBab || {}) };
    const quizValues = Object.values(mergedQuiz).filter(v => typeof v === 'number');
    if (quizValues.length > 0) {
      rataRataKuis = Math.round((quizValues.reduce((a, b) => a + b, 0) / quizValues.length) * 10) / 10;
    }

    const updated = {
      ...current,
      ...updatedData,
      name: sanitizeInput(updatedData.name || current.name, 80),
      nisn: sanitizeInput(updatedData.nisn || current.nisn, 12),
      email: (updatedData.email || current.email).trim(),
      phone: sanitizeInput(updatedData.phone || current.phone, 16),
      kelas: updatedData.kelas || current.kelas,
      status: updatedData.status || current.status,
      catatan: sanitizeTextarea(updatedData.catatan || current.catatan || '', 500),
      pretest,
      posttest,
      gain,
      quizBab: mergedQuiz,
      rataRataKuis,
    };

    list[index] = updated;
    storageService.set(SISWA_STORAGE_KEY, list);
    return updated;
  },

  deleteSiswa(id) {
    const list = this.getAllSiswa();
    const filtered = list.filter((s) => s.id !== id);
    storageService.set(SISWA_STORAGE_KEY, filtered);
    return true;
  },

  // Statistik ringkasan untuk dashboard admin
  getStatistics() {
    const list = this.getAllSiswa();
    const total = list.length;
    const kkm = configService.getConfig().kkmScore || 70;

    if (total === 0) {
      return {
        totalSiswa: 0,
        totalAktif: 0,
        avgPretest: 0,
        avgPosttest: 0,
        avgGain: 0,
        persentaseLulus: 0,
        lulusCount: 0,
        remedialCount: 0,
      };
    }

    const aktifList = list.filter((s) => s.status === 'Aktif');
    const withPretest = list.filter((s) => typeof s.pretest === 'number');
    const withPosttest = list.filter((s) => typeof s.posttest === 'number');

    const avgPretest = withPretest.length > 0
      ? Math.round(withPretest.reduce((a, b) => a + b.pretest, 0) / withPretest.length)
      : 0;

    const avgPosttest = withPosttest.length > 0
      ? Math.round(withPosttest.reduce((a, b) => a + b.posttest, 0) / withPosttest.length)
      : 0;

    const avgGain = withPosttest.length > 0
      ? Math.round(withPosttest.reduce((a, b) => a + (b.gain || 0), 0) / withPosttest.length)
      : 0;

    const lulusCount = withPosttest.filter((s) => s.posttest >= kkm).length;
    const remedialCount = withPosttest.filter((s) => s.posttest < kkm).length;
    const persentaseLulus = withPosttest.length > 0
      ? Math.round((lulusCount / withPosttest.length) * 100)
      : 0;

    return {
      totalSiswa: total,
      totalAktif: aktifList.length,
      avgPretest,
      avgPosttest,
      avgGain,
      persentaseLulus,
      lulusCount,
      remedialCount,
    };
  },

  resetToDefault() {
    storageService.set(SISWA_STORAGE_KEY, [...initialSiswaList]);
    return [...initialSiswaList];
  }
};
