import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import EcoLogo from '../common/EcoLogo';
import {
  LayoutDashboard,
  BookOpen,
  Gamepad2,
  Trophy,
  ClipboardCheck,
  HelpCircle,
  Award,
  User,
  Settings,
  LogOut,
  X,
  Sparkles,
  Flame,
  ShieldCheck,
} from 'lucide-react';

export default function Sidebar({ onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (onClose) onClose();
  };

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/materi', label: 'Materi Pembelajaran', icon: BookOpen },
    { to: '/pretest', label: 'Pretest', icon: HelpCircle },
    { to: '/posttest', label: 'Posttest', icon: Award },
    { to: '/profile', label: 'Profil Saya', icon: User },
    { to: '/settings', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <aside className="w-64 sm:w-72 bg-white h-full flex flex-col border-r border-slate-200/80 shadow-xs select-none">
      {/* Sidebar Header with EcoLogo */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <NavLink to="/dashboard" onClick={onClose} className="transition-transform active:scale-95">
          <EcoLogo size="sm" />
        </NavLink>

        {/* Mobile close drawer button */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* User Quick Gamification Banner */}
      <div className="p-4 mx-4 mt-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center font-black text-lg border border-white/30">
            {user?.name ? user.name[0].toUpperCase() : 'E'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-blue-100 truncate">
              {user?.level || 'Ekonom Muda'}
            </p>
            <p className="text-sm font-black truncate">{user?.name || 'Siswa'}</p>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-xs font-bold">
          <span className="flex items-center gap-1 text-amber-300">
            <Flame className="w-3.5 h-3.5 fill-amber-300" />
            <span>{user?.xp || 1450} XP</span>
          </span>
          <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full">
            Level {user?.levelNumber || 3}
          </span>
        </div>
      </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5">
          <p className="px-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
            Menu Pembelajaran
          </p>

          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3.5 py-3 rounded-2xl font-bold text-sm transition-all duration-200
                  ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }
                `}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          <div className="pt-4 mt-3 border-t border-slate-100">
            <p className="px-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
              Akses Pendidik
            </p>
            <NavLink
              to="/admin"
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-sm transition-all duration-200
                ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                    : 'text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 shrink-0 text-indigo-600" />
                <span>Panel Guru / Admin</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-indigo-200/60 text-indigo-800">
                Admin
              </span>
            </NavLink>
          </div>
        </nav>

      {/* Logout Action Footer */}
      <div className="p-4 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-bold text-sm text-rose-600 hover:bg-rose-50 transition-colors duration-200 cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          <span>Keluar Akun</span>
        </button>
      </div>
    </aside>
  );
}
