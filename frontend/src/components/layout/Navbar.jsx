import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import EcoLogo from '../common/EcoLogo';
import Button from '../common/Button';
import { Menu, X, ArrowRight, User, LogOut, Compass } from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Beranda' },
    { to: '/#tentang', label: 'Tentang' },
    { to: '/#fitur', label: 'Fitur Unggulan' },
    { to: '/#materi', label: 'Topik Materi' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center transition-transform hover:scale-[1.02] active:scale-95">
            <EcoLogo />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-2xl border border-slate-200/60">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.to}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive(link.to)
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard">
                  <Button variant="primary" size="sm" icon={Compass}>
                    Buka Dashboard
                  </Button>
                </Link>
                <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                    {user?.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <button
                    onClick={logout}
                    className="p-2 text-slate-400 hover:text-red-500 rounded-xl hover:bg-red-50 transition-colors"
                    title="Keluar"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Masuk
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="amber" size="sm" icon={ArrowRight}>
                    Mulai Belajar
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors focus:outline-none"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-2xl text-base font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" fullWidth icon={Compass}>
                    Buka Dashboard
                  </Button>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-center text-sm font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-colors"
                >
                  Keluar dari Akun
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" fullWidth>
                    Masuk ke Akun
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="amber" fullWidth icon={ArrowRight}>
                    Daftar & Mulai Belajar
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
