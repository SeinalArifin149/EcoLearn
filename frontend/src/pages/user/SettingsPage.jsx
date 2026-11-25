import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import { Settings, Volume2, Bell, Info, HelpCircle, LogOut, CheckCircle2 } from 'lucide-react';
import { appConfig } from '../../data/appConfig';

export default function SettingsPage() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-sm space-y-6">
        
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-600" />
            Pengaturan Aplikasi
          </h2>
          <p className="text-xs text-slate-500">
            Kelola preferensi suara, notifikasi, dan sesi belajar akun kamu.
          </p>
        </div>

        {saveSuccess && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-emerald-700 text-xs font-semibold animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>Pengaturan berhasil disimpan!</span>
          </div>
        )}

        {/* Toggle Preferences */}
        <div className="divide-y divide-slate-100 space-y-3">
          
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Efek Suara Gamifikasi</p>
                <p className="text-xs text-slate-400">Putar suara saat menjawab kuis dan meraih XP</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Notifikasi Pembelajaran</p>
                <p className="text-xs text-slate-400">Pengingat berkala untuk melanjutkan bab materi</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifEnabled}
                onChange={(e) => setNotifEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

        </div>

        {/* Application Information Box */}
        <div className="pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-500" /> Informasi Aplikasi
            </p>
            <div className="text-xs text-slate-500 space-y-1">
              <p><strong>Aplikasi:</strong> {appConfig.appName} ({appConfig.fullName})</p>
              <p><strong>Target Siswa:</strong> Kelas X SMA Kurikulum Merdeka</p>
              <p><strong>Versi:</strong> {appConfig.version}</p>
            </div>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
          <Button variant="primary" onClick={handleSave} className="w-full sm:w-auto">
            Simpan Pengaturan
          </Button>

          <Button
            variant="danger"
            onClick={handleLogout}
            icon={LogOut}
            className="w-full sm:w-auto"
          >
            Keluar dari Akun
          </Button>
        </div>

      </div>
    </div>
  );
}
