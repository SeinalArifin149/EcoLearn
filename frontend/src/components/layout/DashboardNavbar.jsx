import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  Menu,
  Bell,
  Coins,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Sparkles,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';

export default function DashboardNavbar({ onOpenSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard Pembelajaran';
      case '/materi':
        return 'Materi Ekonomi SMA';
      case '/pretest':
        return 'Pretest Siswa (Padlet)';
      case '/posttest':
        return 'Posttest Kelulusan (Padlet)';
      case '/profile':
        return 'Profil Pengguna';
      case '/settings':
        return 'Pengaturan Akun';
      default:
        return 'EcoLearn';
    }
  };

  const notifications = [
    {
      id: 1,
      title: 'Selamat! Kuis Evaluasi Selesai',
      desc: 'Kamu mendapatkan nilai 100 di Kuis Kelangkaan & Biaya Peluang.',
      time: '2 jam lalu',
      unread: true,
    },
    {
      id: 2,
      title: 'Lencana Baru Terbuka!',
      desc: 'Lencana "Analis Pasar" berhasil ditambahkan ke profilmu.',
      time: 'Kemarin',
      unread: false,
    },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 shadow-xs">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Hamburger & Page Title / Sapaan */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-2 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Buka Menu Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-800 leading-tight">
              {getPageTitle()}
            </h1>
            <p className="hidden sm:block text-xs font-semibold text-slate-400">
              Halo, <span className="text-blue-600 font-bold">{user?.name || 'Siswa'}</span>! Selamat belajar ekonomi 📈
            </p>
          </div>
        </div>

        {/* Right: XP Badge, Notification & Profile Dropdown */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* XP Poin Badge (gamification coin badge as seen in ALDICAP) */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-amber-400/15 to-orange-400/20 border border-amber-300/80 text-amber-800 shadow-xs">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-amber-500 text-white flex items-center justify-center shadow-xs">
              <Coins className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-black text-amber-900">
              {user?.xp || 1450} <span className="text-[11px] font-bold text-amber-700 hidden xs:inline">XP</span>
            </span>
          </div>

          {/* Notification Button & Popover */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              aria-label="Notifikasi"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-3xl shadow-xl border border-slate-100 p-4 space-y-3 z-50 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="text-sm font-black text-slate-800">Pemberitahuan</h4>
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    2 Baru
                  </span>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`p-2.5 rounded-2xl text-xs transition-colors ${
                        item.unread ? 'bg-blue-50/60 border border-blue-100' : 'bg-slate-50'
                      }`}
                    >
                      <p className="font-bold text-slate-800 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        {item.title}
                      </p>
                      <p className="text-slate-500 mt-0.5 text-[11px] leading-relaxed">{item.desc}</p>
                      <span className="text-[10px] text-slate-400 block mt-1">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
                {user?.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-black text-slate-800 truncate max-w-[120px]">
                  {user?.name || 'Siswa'}
                </p>
                <p className="text-[10px] font-bold text-blue-600 leading-none">
                  {user?.level || 'Ekonom Muda'}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-3xl shadow-xl border border-slate-100 p-2 space-y-1 z-50 animate-fadeIn">
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <p className="text-xs font-bold text-slate-400">Masuk sebagai</p>
                  <p className="text-sm font-black text-slate-800 truncate">{user?.name || 'Siswa'}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email || 'email@ecolearn.id'}</p>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                >
                  <User className="w-4 h-4 text-blue-500" />
                  <span>Profil Saya</span>
                </Link>

                <Link
                  to="/admin"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-bold text-indigo-700 bg-indigo-50/70 hover:bg-indigo-100 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                    <span>Panel Guru (Admin)</span>
                  </div>
                  <span className="text-[9px] font-black bg-indigo-200 text-indigo-800 px-1.5 py-0.5 rounded">NEW</span>
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                >
                  <Settings className="w-4 h-4 text-slate-500" />
                  <span>Pengaturan</span>
                </Link>

                <div className="pt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-2xl text-xs font-bold text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar Akun</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
