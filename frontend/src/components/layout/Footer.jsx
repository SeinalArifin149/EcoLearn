import React from 'react';
import { Link } from 'react-router-dom';
import EcoLogo from '../common/EcoLogo';
import { Globe2, ShieldCheck, Sparkles, TrendingUp, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t-4 border-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <EcoLogo size="lg" className="[&_span]:text-white [&_span.text-blue-600]:text-blue-400" />
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              <strong>EcoLearn (EconomyLearn)</strong> adalah aplikasi game edukasi ekonomi interaktif untuk membantu siswa SMA memahami konsep dasar ekonomi, kelangkaan, mekanisme pasar, dan literasi finansial melalui pengalaman belajar yang menyenangkan.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 bg-blue-950/60 w-fit px-3 py-1.5 rounded-full border border-blue-800">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Modern Educational Gamification • Ekonomi SMA</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-black uppercase tracking-wider">Navigasi Pembelajaran</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">Beranda</Link>
              </li>
              <li>
                <a href="#tentang" className="hover:text-blue-400 transition-colors">Tentang EcoLearn</a>
              </li>
              <li>
                <a href="#fitur" className="hover:text-blue-400 transition-colors">Fitur Gamifikasi</a>
              </li>
              <li>
                <a href="#materi" className="hover:text-blue-400 transition-colors">Topik Materi Ekonomi</a>
              </li>
            </ul>
          </div>

          {/* Akun & Evaluasi */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-black uppercase tracking-wider">Akses Siswa</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="hover:text-blue-400 transition-colors">Masuk Akun Siswa</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-blue-400 transition-colors">Daftar Akun Baru</Link>
              </li>
              <li>
                <span className="text-slate-500 text-xs">Evaluasi: Kuis Bab, Pretest & Posttest</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} EcoLearn (EconomyLearn). Dirancang untuk pembelajaran siswa SMA.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Globe2 className="w-4 h-4 text-emerald-500" /> Kurikulum Nasional
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-blue-400" /> Ramah Pelajar SMA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
