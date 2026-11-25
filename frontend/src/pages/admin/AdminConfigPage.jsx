import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Layers, 
  ExternalLink, 
  ShieldCheck, 
  Save, 
  RotateCcw, 
  Download, 
  CheckCircle2, 
  School, 
  UserCheck, 
  Clock, 
  Award,
  AlertTriangle,
  Smartphone
} from 'lucide-react';
import { configService } from '../../services/configService';
import { siswaService } from '../../services/siswaService';
import { adminMateriService } from '../../services/adminMateriService';

export default function AdminConfigPage() {
  const [config, setConfig] = useState(configService.getConfig());
  const [toastMessage, setToastMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setConfig(configService.getConfig());
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleChange = (field, val) => {
    setConfig(prev => ({ ...prev, [field]: val }));
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const updated = configService.updateConfig(config);
      setConfig(updated);
      showToast('Konfigurasi sistem berhasil disimpan dan diperbarui.');
    } catch (err) {
      setErrorMessage(err.message || 'Gagal menyimpan konfigurasi.');
    }
  };

  const handleResetConfig = () => {
    if (window.confirm('Kembalikan konfigurasi sistem ke pengaturan awal bawaan?')) {
      const reset = configService.resetConfig();
      setConfig(reset);
      showToast('Konfigurasi sistem dikembalikan ke default.');
    }
  };

  // Backup data JSON
  const handleExportBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      config: configService.getConfig(),
      siswa: siswaService.getAllSiswa(),
      materi: adminMateriService.getAllMateri(),
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `Backup_EcoLearn_${new Date().toISOString().split('T')[0]}.json`);
    dlAnchor.click();
    showToast('File backup data EcoLearn berhasil diunduh.');
  };

  return (
    <div className="space-y-5 animate-fadeIn max-w-4xl mx-auto pb-12">
      {/* Toast Notification */}
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
              <Settings className="w-4 h-4" />
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Konfigurasi Sistem EcoLearn
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Atur tautan Padlet, standar KKM, identitas sekolah, dan keamanan data input
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportBackup}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Backup Data JSON</span>
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSaveConfig} className="space-y-5">
        {/* 1. Pengaturan Tautan Padlet Pretest & Posttest */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Layers className="w-4 h-4 text-blue-600" />
            <h3 className="font-black text-slate-900 text-sm">Integrasi Tautan Padlet Kelas</h3>
          </div>
          <p className="text-xs text-slate-500 -mt-2">
            Tautan ini akan langsung disematkan dan dibuka oleh siswa saat mengakses menu Pretest dan Posttest.
          </p>

          <div className="space-y-3 text-xs">
            {/* Padlet Pretest */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Tautan Padlet Pretest (Evaluasi Awal)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  required
                  value={config.padletPretestUrl}
                  onChange={(e) => handleChange('padletPretestUrl', e.target.value)}
                  placeholder="https://padlet.com/username/pretest-ekonomi"
                  className="flex-1 p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none font-mono text-xs"
                />
                <a
                  href={config.padletPretestUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 inline-flex items-center gap-1 font-bold text-xs shrink-0"
                  title="Uji Buka Padlet Pretest"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Uji Buka</span>
                </a>
              </div>
            </div>

            {/* Padlet Posttest */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Tautan Padlet Posttest (Evaluasi Akhir)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="url"
                  required
                  value={config.padletPosttestUrl}
                  onChange={(e) => handleChange('padletPosttestUrl', e.target.value)}
                  placeholder="https://padlet.com/username/posttest-ekonomi"
                  className="flex-1 p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none font-mono text-xs"
                />
                <a
                  href={config.padletPosttestUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 inline-flex items-center gap-1 font-bold text-xs shrink-0"
                  title="Uji Buka Padlet Posttest"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Uji Buka</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Standar Kelulusan KKM & Durasi Ujian */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Award className="w-4 h-4 text-emerald-600" />
            <h3 className="font-black text-slate-900 text-sm">Standar Penilaian & Ujian</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Standar KKM Kelulusan (0 - 100)
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={config.kkmScore}
                onChange={(e) => handleChange('kkmScore', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none font-bold"
              />
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                Siswa dengan nilai di bawah KKM otomatis masuk daftar remedial.
              </span>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Batas Waktu Ujian (Menit)
              </label>
              <input
                type="number"
                min={10}
                max={180}
                value={config.examDurationMinutes}
                onChange={(e) => handleChange('examDurationMinutes', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none font-bold"
              />
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                Standar waktu pengerjaan 50 soal pilihan ganda.
              </span>
            </div>
          </div>
        </div>

        {/* 3. Identitas Sekolah & Guru Pengampu */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <School className="w-4 h-4 text-indigo-600" />
            <h3 className="font-black text-slate-900 text-sm">Identitas Sekolah & Pengampu</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Nama Sekolah</label>
              <input
                type="text"
                value={config.schoolName}
                onChange={(e) => handleChange('schoolName', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Nama Guru Pengampu</label>
              <input
                type="text"
                value={config.teacherName}
                onChange={(e) => handleChange('teacherName', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Tahun Ajaran</label>
              <input
                type="text"
                value={config.academicYear}
                onChange={(e) => handleChange('academicYear', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Semester</label>
              <select
                value={config.semester}
                onChange={(e) => handleChange('semester', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none font-semibold"
              >
                <option value="Ganjil">Semester Ganjil</option>
                <option value="Genap">Semester Genap</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4. Keamanan & Sanitasi Data (Proteksi SQL Injection & XSS) */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h3 className="font-black text-slate-900 text-sm">Status Keamanan & Validasi Input</h3>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between">
              <span className="font-semibold text-emerald-900">
                🛡️ Sanitasi Input Otomatis (Anti-SQLi & XSS):
              </span>
              <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                AKTIF
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed px-1">
              Semua data nama siswa, materi, NISN, dan input teks diproteksi melalui fungsi sanitasi string di modul security.js untuk mencegah injeksi kode berbahaya ke local storage dan rendering HTML.
            </p>
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleResetConfig}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Pengaturan Bawaan
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center justify-center gap-2 shadow-md shadow-blue-200 transition-colors"
          >
            <Save className="w-4 h-4" />
            Simpan Konfigurasi
          </button>
        </div>
      </form>
    </div>
  );
}
