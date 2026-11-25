import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Settings,
  LogOut,
  Smartphone,
  Monitor,
  GraduationCap,
  ShieldCheck,
  Menu,
  X,
  ChevronRight,
  Bell,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import EcoLogo from '../components/common/EcoLogo';

export default function AdminLayout() {
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Mode pratinjau smartphone (memudahkan guru melihat tampilan HP di laptop)
  const [phoneFrameMode, setPhoneFrameMode] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/siswa', label: 'Data Siswa & Nilai', icon: Users },
    { to: '/admin/materi', label: 'Kelola Materi', icon: BookOpen },
    { to: '/admin/konfigurasi', label: 'Konfigurasi', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSwitchToStudent = () => {
    switchRole('student');
    navigate('/dashboard');
  };

  const getPageTitle = () => {
    if (location.pathname === '/admin') return 'Dashboard Administrator';
    if (location.pathname.startsWith('/admin/siswa')) return 'Kelola Siswa & Rekap Nilai';
    if (location.pathname.startsWith('/admin/materi')) return 'Manajemen & Edit Materi';
    if (location.pathname.startsWith('/admin/konfigurasi')) return 'Pengaturan & Konfigurasi Sistem';
    return 'Panel Admin EcoLearn';
  };

  return (
    <div className={`min-h-screen bg-slate-100 flex flex-col ${phoneFrameMode ? 'p-2 sm:p-6 bg-slate-800' : ''}`}>
      {/* Top Bar Pengalih Mode & Status Keamanan (Khusus Laptop / Layar Lebar) */}
      <header className="bg-slate-900 text-white px-4 py-2.5 text-xs flex items-center justify-between border-b border-slate-800 z-40 sticky top-0">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 font-bold uppercase tracking-wider text-[10px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Admin Panel • SQLi & XSS Protected
          </span>
          <span className="hidden md:inline text-slate-400">
            SMA Negeri 1 EcoLearn
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Tombol Toggle Pratinjau HP */}
          <button
            onClick={() => setPhoneFrameMode(!phoneFrameMode)}
            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors flex items-center gap-1.5 ${
              phoneFrameMode 
                ? 'bg-amber-500 text-slate-950 font-black' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            title="Ubah pratinjau antara layar Handphone dan Layar Penuh Laptop"
          >
            {phoneFrameMode ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{phoneFrameMode ? 'Tampilan Laptop Penuh' : 'Pratinjau Layar Handphone'}</span>
          </button>

          {/* Beralih ke Portal Siswa */}
          <button
            onClick={handleSwitchToStudent}
            className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] transition-colors flex items-center gap-1"
            title="Lihat aplikasi dari sudut pandang siswa"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mode Siswa</span>
          </button>
        </div>
      </header>

      {/* Frame Container (Responsif: Jika Phone Frame Mode aktif, batasi max-width seperti HP fisik) */}
      <div className={`flex-1 flex w-full mx-auto transition-all duration-300 ${
        phoneFrameMode 
          ? 'max-w-[430px] my-4 rounded-[40px] shadow-2xl border-8 border-slate-900 bg-white overflow-hidden relative flex-col' 
          : 'max-w-7xl'
      }`}>

        {/* 1. Desktop Persistent Sidebar (Hanya tampil di Laptop dan saat bukan mode frame HP) */}
        {!phoneFrameMode && (
          <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200/80 sticky top-10 h-[calc(100vh-40px)] shrink-0 select-none">
            {/* Header Sidebar */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <Link to="/admin">
                <EcoLogo size="sm" />
              </Link>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                ADMIN
              </span>
            </div>

            {/* Admin Profile Mini Card */}
            <div className="p-4 mx-3 mt-3 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-xs border border-white/20">
                  ADM
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-100 truncate">{user?.name || 'Administrator'}</p>
                  <p className="text-[10px] text-indigo-300 truncate">Guru Pengampu Ekonomi</p>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
              <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                Manajemen Sistem
              </p>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/admin'}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all duration-200
                      ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-3 border-t border-slate-100 space-y-1">
              <button
                onClick={handleSwitchToStudent}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-blue-700 hover:bg-blue-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Buka Portal Siswa
                </span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar Akun Admin</span>
              </button>
            </div>
          </aside>
        )}

        {/* 2. Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50">
          
          {/* Mobile Top Header (Gaya ALDIPOST Handphone) */}
          <div className="bg-white px-4 py-3 border-b border-slate-200/80 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-2.5">
              {!phoneFrameMode && (
                <button
                  onClick={() => setMobileDrawerOpen(true)}
                  className="lg:hidden p-1.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
                  aria-label="Menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}

              <div>
                <h1 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                  {getPageTitle()}
                </h1>
                <p className="text-[10px] text-slate-500 font-medium">
                  EcoLearn • Portal Guru & Administrator
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden xs:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Aktif
              </span>

              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                A
              </div>
            </div>
          </div>

          {/* Main Workspace Body */}
          <main className="flex-1 p-3 sm:p-5 lg:p-6 pb-20 lg:pb-6 overflow-y-auto">
            <Outlet />
          </main>

          {/* 3. Mobile Bottom Navigation Bar (Persis seperti referensi desain ALDIPOST) */}
          <nav className="fixed lg:hidden bottom-0 left-0 right-0 bg-white border-t border-slate-200/80 px-2 py-2 flex items-center justify-around z-30 shadow-lg select-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/admin'}
                  className={({ isActive }) => `
                    flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                      isActive 
                        ? 'text-blue-600 font-bold scale-105' 
                        : 'text-slate-400 hover:text-slate-600 font-medium'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 mb-0.5" />
                  <span className="text-[10px]">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

      </div>

      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white z-10 shadow-2xl p-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <EcoLogo size="sm" />
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 py-4 space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/admin'}
                    onClick={() => setMobileDrawerOpen(false)}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-3.5 py-3 rounded-xl font-bold text-sm ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-600 hover:bg-slate-100'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setMobileDrawerOpen(false);
                  handleSwitchToStudent();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs"
              >
                <GraduationCap className="w-4 h-4" />
                Buka Mode Siswa
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 font-bold text-xs"
              >
                <LogOut className="w-4 h-4" />
                Keluar Akun
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
