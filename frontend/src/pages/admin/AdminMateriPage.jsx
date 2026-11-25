import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Clock, 
  Tag, 
  Sparkles, 
  RotateCcw, 
  Layers, 
  AlertTriangle,
  ChevronRight,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { adminMateriService } from '../../services/adminMateriService';

export default function AdminMateriPage() {
  const [materiList, setMateriList] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMateri, setSelectedMateri] = useState(null);
  const [formMode, setFormMode] = useState('create'); // 'create' | 'edit'

  // Form Fields
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '45 Menit',
    difficulty: 'Sedang',
    category: 'Ekonomi SMA Kelas X',
    status: 'Aktif',
    indicator: '',
    chapters: [],
  });

  const [formError, setFormError] = useState('');
  const [successToast, setSuccessToast] = useState('');

  useEffect(() => {
    loadMateri();
  }, []);

  const loadMateri = () => {
    const list = adminMateriService.getAllMateri();
    setMateriList(list);
  };

  const showToast = (msg) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  // Filter & Search
  const filteredList = materiList.filter((m) => {
    const matchSearch = (m.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (m.description || '').toLowerCase().includes(search.toLowerCase()) ||
      String(m.number).includes(search);
    const matchStatus = filterStatus === 'all' || m.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Open Create Modal
  const handleOpenCreate = () => {
    setFormMode('create');
    setSelectedMateri(null);
    setFormData({
      title: '',
      description: '',
      duration: '45 Menit',
      difficulty: 'Sedang',
      category: 'Ekonomi SMA Kelas X',
      status: 'Aktif',
      indicator: '',
      chapters: [
        { id: `ch-1`, title: 'Subbab 1: Pengantar Materi', duration: '15 Menit', summary: 'Pengantar konsep' },
        { id: `ch-2`, title: 'Subbab 2: Analisis & Pembahasan', duration: '20 Menit', summary: 'Penerapan konsep' },
        { id: `ch-3`, title: 'Subbab 3: Rangkuman & Kuis Bab', duration: '10 Menit', summary: 'Uji pemahaman' },
      ],
    });
    setFormError('');
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (m) => {
    setFormMode('edit');
    setSelectedMateri(m);
    setFormData({
      title: m.title || '',
      description: m.description || '',
      duration: m.duration || '45 Menit',
      difficulty: m.difficulty || 'Sedang',
      category: m.category || 'Ekonomi SMA Kelas X',
      status: m.status || 'Aktif',
      indicator: m.indicator || '',
      chapters: m.chapters && m.chapters.length > 0 ? [...m.chapters] : [
        { id: `${m.id}-ch-1`, title: 'Subbab 1: Konsep Dasar', duration: '15 Menit', summary: '' }
      ],
    });
    setFormError('');
    setIsModalOpen(true);
  };

  // Chapter management inside modal
  const handleAddChapter = () => {
    const nextIdx = formData.chapters.length + 1;
    setFormData(prev => ({
      ...prev,
      chapters: [
        ...prev.chapters,
        { id: `ch-${Date.now()}`, title: `Subbab ${nextIdx}: Materi Baru`, duration: '15 Menit', summary: '' }
      ]
    }));
  };

  const handleUpdateChapterTitle = (idx, newTitle) => {
    setFormData(prev => {
      const updated = [...prev.chapters];
      updated[idx] = { ...updated[idx], title: newTitle };
      return { ...prev, chapters: updated };
    });
  };

  const handleRemoveChapter = (idx) => {
    if (formData.chapters.length <= 1) {
      alert('Minimal materi harus memiliki 1 subbab.');
      return;
    }
    setFormData(prev => ({
      ...prev,
      chapters: prev.chapters.filter((_, i) => i !== idx)
    }));
  };

  // Submit Form
  const handleSubmitForm = (e) => {
    e.preventDefault();
    setFormError('');

    try {
      if (formMode === 'create') {
        adminMateriService.createMateri(formData);
        showToast('Materi baru berhasil ditambahkan.');
      } else {
        adminMateriService.updateMateri(selectedMateri.id, formData);
        showToast(`Materi "${formData.title}" berhasil diperbarui.`);
      }

      setIsModalOpen(false);
      loadMateri();
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan data materi.');
    }
  };

  // Delete Handler
  const handleConfirmDelete = () => {
    if (!selectedMateri) return;
    adminMateriService.deleteMateri(selectedMateri.id);
    setIsDeleteModalOpen(false);
    setSelectedMateri(null);
    showToast('Materi berhasil dihapus.');
    loadMateri();
  };

  // Reset Default
  const handleResetDefault = () => {
    if (window.confirm('Kembalikan seluruh 10 materi ke kurikulum bawaan awal? Perubahan kustom akan di-reset.')) {
      adminMateriService.resetToDefault();
      loadMateri();
      showToast('Seluruh materi di-reset ke standar Kurikulum Merdeka.');
    }
  };

  return (
    <div className="space-y-5 animate-fadeIn max-w-6xl mx-auto">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-12 right-4 z-50 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-slideDown">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Kelola & Edit Materi Ekonomi
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Ubah judul bab, deskripsi, subtopik, dan indikator materi ekonomi SMA Kelas X
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleResetDefault}
            className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
            title="Reset ke materi kurikulum bawaan"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Default</span>
          </button>

          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm shadow-blue-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tambah Bab Materi
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari materi atau bab..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-medium text-slate-500 hidden sm:inline">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="all">Semua Status ({materiList.length})</option>
            <option value="Aktif">Status Aktif</option>
            <option value="Draft">Draft / Nonaktif</option>
          </select>
        </div>
      </div>

      {/* Cards List of Materi (Mobile-First Friendly) */}
      <div className="space-y-3">
        {filteredList.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center text-slate-400 border border-dashed border-slate-200 text-xs">
            Tidak ada materi yang cocok dengan pencarian "{search}".
          </div>
        ) : (
          filteredList.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-2xs hover:border-blue-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left Info */}
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                  {m.number || m.id.replace('materi-', '')}
                </div>

                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      Bab {m.number || m.id.replace('materi-', '')}
                    </span>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      m.status === 'Aktif' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {m.status || 'Aktif'}
                    </span>

                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {m.duration || '45 Menit'}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
                    {m.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {m.description}
                  </p>

                  <div className="pt-1 flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="font-medium text-blue-600">
                      📚 {m.chapters?.length || 0} Subbab Materi
                    </span>
                    {m.difficulty && (
                      <span>Tingkat: <strong>{m.difficulty}</strong></span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 w-full md:w-auto justify-end">
                <button
                  onClick={() => handleOpenEdit(m)}
                  className="px-3.5 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs inline-flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Materi</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedMateri(m);
                    setIsDeleteModalOpen(true);
                  }}
                  className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
                  title="Hapus Bab"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Form Tambah / Edit Materi */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                {formMode === 'create' ? 'Tambah Bab Materi Baru' : `Edit Bab Materi`}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              {/* Judul Bab */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Judul Bab Materi <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: Konsep Dasar Ilmu Ekonomi"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Deskripsi */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Deskripsi / Pengantar Materi
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ringkasan konsep yang akan dipelajari siswa..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none leading-relaxed"
                />
              </div>

              {/* Durasi & Tingkat Kesulitan */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Estimasi Waktu</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="45 Menit"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tingkat Kesulitan</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none font-semibold"
                  >
                    <option value="Mudah">Mudah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Sulit">Sulit</option>
                  </select>
                </div>
              </div>

              {/* Indikator Pencapaian */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Indikator Pembelajaran / Capaian
                </label>
                <input
                  type="text"
                  value={formData.indicator}
                  onChange={(e) => setFormData({ ...formData, indicator: e.target.value })}
                  placeholder="Siswa mampu mengidentifikasi masalah kelangkaan..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Subbab / Chapters Editor */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700 block">
                    Daftar Subbab / Materi Pokok ({formData.chapters.length})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddChapter}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Subbab
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {formData.chapters.map((ch, idx) => (
                    <div key={ch.id || idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={ch.title}
                        onChange={(e) => handleUpdateChapterTitle(idx, e.target.value)}
                        className="flex-1 p-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none"
                        placeholder="Nama Subbab..."
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveChapter(idx)}
                        className="p-1 text-slate-400 hover:text-rose-500 rounded"
                        title="Hapus Subbab"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm shadow-blue-200"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {isDeleteModalOpen && selectedMateri && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsDeleteModalOpen(false)} />
          <div className="relative bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl z-10 space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Hapus Bab Materi Ini?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Bab "{selectedMateri.title}" akan dihapus dari daftar belajar siswa.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="w-1/2 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
