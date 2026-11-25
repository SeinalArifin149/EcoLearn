import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Award, 
  TrendingUp, 
  Download, 
  Filter, 
  Eye, 
  AlertTriangle, 
  CheckCircle2, 
  Phone, 
  Mail, 
  FileText,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { siswaService } from '../../services/siswaService';
import { configService } from '../../services/configService';

export default function AdminSiswaPage() {
  const [siswaList, setSiswaList] = useState([]);
  const [search, setSearch] = useState('');
  const [filterKelas, setFilterKelas] = useState('all');
  const [filterStatusLulus, setFilterStatusLulus] = useState('all');

  // Modals
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSiswa, setSelectedSiswa] = useState(null);
  const [formMode, setFormMode] = useState('create'); // 'create' | 'edit'

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    nisn: '',
    email: '',
    phone: '',
    gender: 'Laki-laki',
    kelas: 'X-1',
    status: 'Aktif',
    pretest: '',
    posttest: '',
    catatan: '',
  });

  const [formError, setFormError] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [activeDetailTab, setActiveDetailTab] = useState('nilai'); // 'nilai' | 'profil'

  const config = configService.getConfig();
  const kkm = config.kkmScore || 70;

  useEffect(() => {
    loadSiswa();
  }, [search, filterKelas, filterStatusLulus]);

  const loadSiswa = () => {
    const list = siswaService.getAllSiswa({
      search,
      kelas: filterKelas,
      statusLulus: filterStatusLulus,
    });
    setSiswaList(list);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setFormMode('create');
    setSelectedSiswa(null);
    setFormData({
      name: '',
      nisn: '',
      email: '',
      phone: '',
      gender: 'Laki-laki',
      kelas: 'X-1',
      status: 'Aktif',
      pretest: '',
      posttest: '',
      catatan: '',
    });
    setFormError('');
    setIsFormModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (s) => {
    setFormMode('edit');
    setSelectedSiswa(s);
    setFormData({
      name: s.name || '',
      nisn: s.nisn || '',
      email: s.email || '',
      phone: s.phone || '',
      gender: s.gender || 'Laki-laki',
      kelas: s.kelas || 'X-1',
      status: s.status || 'Aktif',
      pretest: s.pretest !== undefined && s.pretest !== null ? s.pretest : '',
      posttest: s.posttest !== undefined && s.posttest !== null ? s.posttest : '',
      catatan: s.catatan || '',
    });
    setFormError('');
    setIsFormModalOpen(true);
  };

  // Open Detail Modal
  const handleOpenDetail = (s) => {
    setSelectedSiswa(s);
    setActiveDetailTab('nilai');
    setIsDetailModalOpen(true);
  };

  // Submit Form
  const handleSubmitForm = (e) => {
    e.preventDefault();
    setFormError('');

    try {
      if (formMode === 'create') {
        siswaService.createSiswa(formData);
        showToast(`Siswa "${formData.name}" berhasil ditambahkan.`);
      } else {
        siswaService.updateSiswa(selectedSiswa.id, formData);
        showToast(`Data siswa "${formData.name}" berhasil diperbarui.`);
      }

      setIsFormModalOpen(false);
      loadSiswa();
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan data siswa.');
    }
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!selectedSiswa) return;
    siswaService.deleteSiswa(selectedSiswa.id);
    setIsDeleteModalOpen(false);
    setSelectedSiswa(null);
    showToast('Data siswa berhasil dihapus.');
    loadSiswa();
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['ID,NISN,Nama Siswa,Kelas,Gender,Status,Pretest,Posttest,Gain,Rerata Kuis,XP'];
    const rows = siswaList.map(s => 
      `"${s.id}","${s.nisn}","${s.name}","${s.kelas}","${s.gender}","${s.status}",${s.pretest ?? 0},${s.posttest ?? 0},${s.gain ?? 0},${s.rataRataKuis ?? 0},${s.xp ?? 0}`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekap_Nilai_Siswa_EcoLearn_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Data nilai siswa berhasil diekspor ke CSV.');
  };

  return (
    <div className="space-y-5 animate-fadeIn max-w-6xl mx-auto">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-12 right-4 z-50 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-slideDown">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Data Siswa & Rekap Nilai Evaluasi
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Kelola data lengkap siswa, nilai pretest, posttest, 10 kuis bab, dan status kelulusan KKM ({kkm})
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
            title="Download Rekap CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm shadow-blue-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tambah Siswa
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, NISN, atau kelas..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Filter Kelas */}
          <select
            value={filterKelas}
            onChange={(e) => setFilterKelas(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="all">Semua Kelas</option>
            <option value="X-1">Kelas X-1</option>
            <option value="X-2">Kelas X-2</option>
            <option value="X-3">Kelas X-3</option>
          </select>

          {/* Filter Status Kelulusan */}
          <select
            value={filterStatusLulus}
            onChange={(e) => setFilterStatusLulus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="all">Status Nilai: Semua</option>
            <option value="lulus">Lulus KKM (≥ {kkm})</option>
            <option value="remedial">Remedial (&lt; {kkm})</option>
          </select>
        </div>
      </div>

      {/* Students List: Mobile Card View + Tablet/Desktop Layout */}
      <div className="space-y-3">
        {siswaList.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center text-slate-400 border border-dashed border-slate-200 text-xs">
            Tidak ada siswa yang sesuai dengan kriteria filter.
          </div>
        ) : (
          siswaList.map((s) => {
            const isLulus = (s.posttest ?? 0) >= kkm;
            const hasPosttest = s.posttest !== null && s.posttest !== undefined;

            return (
              <div
                key={s.id}
                className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-2xs hover:border-blue-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Siswa Info */}
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div className={`w-11 h-11 rounded-2xl ${s.avatarColor || 'bg-blue-600'} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs`}>
                    {s.name ? s.name[0] : 'S'}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-extrabold text-slate-900 truncate">
                        {s.name}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {s.kelas}
                      </span>
                      {hasPosttest && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isLulus 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {isLulus ? 'Lulus KKM' : 'Remedial'}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      NISN: {s.nisn} • {s.email}
                    </p>
                  </div>
                </div>

                {/* Score Pills (Pretest, Posttest, Gain) */}
                <div className="flex items-center gap-2.5 sm:gap-4 shrink-0 bg-slate-50 p-2.5 rounded-2xl border border-slate-100 text-center">
                  <div className="px-2">
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Pretest</span>
                    <span className="text-sm font-black text-blue-600">{s.pretest ?? '-'}</span>
                  </div>

                  <div className="h-6 w-px bg-slate-200" />

                  <div className="px-2">
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Posttest</span>
                    <span className={`text-sm font-black ${isLulus ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {s.posttest ?? '-'}
                    </span>
                  </div>

                  <div className="h-6 w-px bg-slate-200" />

                  <div className="px-2">
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Gain</span>
                    <span className="text-xs font-black text-amber-600">
                      {s.gain > 0 ? `+${s.gain}` : s.gain ?? 0}
                    </span>
                  </div>
                </div>

                {/* Action Controls */}
                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <button
                    onClick={() => handleOpenDetail(s)}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold inline-flex items-center gap-1 transition-colors"
                    title="Lihat Detail Nilai Lengkap"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-600" />
                    <span>Rincian</span>
                  </button>

                  <button
                    onClick={() => handleOpenEdit(s)}
                    className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors"
                    title="Edit Profil & Nilai"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedSiswa(s);
                      setIsDeleteModalOpen(true);
                    }}
                    className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
                    title="Hapus Siswa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal Form Tambah / Edit Siswa */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsFormModalOpen(false)} />
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                {formMode === 'create' ? 'Tambah Data Siswa Baru' : 'Edit Data Siswa'}
              </h3>
              <button onClick={() => setIsFormModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitForm} className="space-y-3.5 text-xs">
              {/* Nama & NISN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Nama Lengkap <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    NISN (10 Digit) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    value={formData.nisn}
                    onChange={(e) => setFormData({ ...formData, nisn: e.target.value.replace(/\D/g, '') })}
                    placeholder="0081234501"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Kelas & Gender */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kelas</label>
                  <select
                    value={formData.kelas}
                    onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none font-semibold"
                  >
                    <option value="X-1">Kelas X-1</option>
                    <option value="X-2">Kelas X-2</option>
                    <option value="X-3">Kelas X-3</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jenis Kelamin</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none font-semibold"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>

              {/* Email & No Telepon */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Siswa</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="siswa@ecolearn.id"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">No. WhatsApp / HP</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="081234567890"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Input Nilai Pretest & Posttest */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <span className="font-bold text-slate-800 block text-xs">
                  Nilai Evaluasi Ekonomi (0 - 100)
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-0.5">Nilai Pretest</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={formData.pretest}
                      onChange={(e) => setFormData({ ...formData, pretest: e.target.value })}
                      placeholder="Contoh: 55"
                      className="w-full p-2 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:outline-none font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-0.5">Nilai Posttest</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={formData.posttest}
                      onChange={(e) => setFormData({ ...formData, posttest: e.target.value })}
                      placeholder="Contoh: 88"
                      className="w-full p-2 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:outline-none font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Catatan Guru */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Catatan Tambahan Guru</label>
                <textarea
                  rows={2}
                  value={formData.catatan}
                  onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
                  placeholder="Catatan perkembangan belajar atau bimbingan..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none leading-relaxed"
                />
              </div>

              {/* Tombol Simpan */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm shadow-blue-200"
                >
                  Simpan Data Siswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Detail Lengkap Siswa */}
      {isDetailModalOpen && selectedSiswa && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsDetailModalOpen(false)} />
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-4 animate-scaleUp">
            {/* Header Detail */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl ${selectedSiswa.avatarColor || 'bg-blue-600'} text-white font-black flex items-center justify-center text-sm`}>
                  {selectedSiswa.name[0]}
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">{selectedSiswa.name}</h3>
                  <p className="text-[11px] text-slate-400">NISN: {selectedSiswa.nisn} • Kelas {selectedSiswa.kelas}</p>
                </div>
              </div>
              <button onClick={() => setIsDetailModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Nav */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl text-xs font-bold">
              <button
                onClick={() => setActiveDetailTab('nilai')}
                className={`flex-1 py-1.5 rounded-xl transition-all ${
                  activeDetailTab === 'nilai' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-500'
                }`}
              >
                📊 Rekap Nilai & Ujian
              </button>
              <button
                onClick={() => setActiveDetailTab('profil')}
                className={`flex-1 py-1.5 rounded-xl transition-all ${
                  activeDetailTab === 'profil' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-500'
                }`}
              >
                👤 Data Identitas & Kontak
              </button>
            </div>

            {/* Tab 1: Nilai & Ujian */}
            {activeDetailTab === 'nilai' && (
              <div className="space-y-4 text-xs">
                {/* Pretest vs Posttest Card */}
                <div className="grid grid-cols-3 gap-2 text-center p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Pretest</span>
                    <span className="text-xl font-black text-blue-600">{selectedSiswa.pretest ?? '-'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Posttest</span>
                    <span className={`text-xl font-black ${(selectedSiswa.posttest || 0) >= kkm ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {selectedSiswa.posttest ?? '-'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Gain ($\Delta$)</span>
                    <span className="text-xl font-black text-amber-600">
                      {selectedSiswa.gain > 0 ? `+${selectedSiswa.gain}` : selectedSiswa.gain ?? 0}
                    </span>
                  </div>
                </div>

                {/* Status KKM */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <span className="font-semibold text-slate-600">Status Kelulusan KKM ({kkm}):</span>
                  <span className={`font-bold px-2.5 py-0.5 rounded-full ${
                    (selectedSiswa.posttest || 0) >= kkm 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {(selectedSiswa.posttest || 0) >= kkm ? 'Lulus KKM' : 'Belum Lulus (Remedial)'}
                  </span>
                </div>

                {/* Nilai 10 Kuis Bab */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">Nilai Kuis Bab (1 - 10):</span>
                    <span className="text-[11px] text-slate-400">
                      Rata-rata: <strong>{selectedSiswa.rataRataKuis || '-'}</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-2 text-center">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(bab => {
                      const score = selectedSiswa.quizBab?.[bab];
                      return (
                        <div key={bab} className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="text-[10px] text-slate-400 block font-semibold">Bab {bab}</span>
                          <span className="font-bold text-slate-800 text-xs">
                            {score !== undefined ? score : '-'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Catatan Guru */}
                {selectedSiswa.catatan && (
                  <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100 text-slate-700">
                    <span className="font-bold text-blue-900 block text-[11px] mb-0.5">Catatan Bimbingan:</span>
                    <p className="text-xs leading-relaxed">{selectedSiswa.catatan}</p>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Profil & Kontak */}
            {activeDetailTab === 'profil' && (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">NISN:</span>
                    <span className="font-bold text-slate-800">{selectedSiswa.nisn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kelas:</span>
                    <span className="font-bold text-slate-800">{selectedSiswa.kelas}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Jenis Kelamin:</span>
                    <span className="font-bold text-slate-800">{selectedSiswa.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status Keaktifan:</span>
                    <span className="font-bold text-emerald-700">{selectedSiswa.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tanggal Terdaftar:</span>
                    <span className="font-bold text-slate-800">{selectedSiswa.joinedAt}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold text-slate-700">{selectedSiswa.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold text-slate-700">{selectedSiswa.phone}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Tutup Rincian
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Hapus Siswa */}
      {isDeleteModalOpen && selectedSiswa && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsDeleteModalOpen(false)} />
          <div className="relative bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl z-10 space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Hapus Data Siswa?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Data siswa "{selectedSiswa.name}" (NISN {selectedSiswa.nisn}) beserta seluruh rekap nilainya akan dihapus.
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
