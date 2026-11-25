import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import EcoLogo from '../../components/common/EcoLogo';
import CharacterIllustration from '../../components/common/CharacterIllustration';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { User, Lock, ArrowRight, Sparkles, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('budi@ecolearn.id');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleFillDemo = () => {
    setIdentifier('budi@ecolearn.id');
    setPassword('password123');
    setError('');
  };

  const handleFillAdmin = () => {
    setIdentifier('admin@ecolearn.id');
    setPassword('admin123');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!identifier.trim()) {
      setError('Silakan masukkan email atau nama pengguna.');
      return;
    }

    if (!password) {
      setError('Silakan masukkan kata sandi.');
      return;
    }

    if (password.length < 6) {
      setError('Kata sandi minimal 6 karakter.');
      return;
    }

    setIsSubmitting(true);
    try {
      const loggedUser = await login(identifier, password);
      const isAdmin = loggedUser?.role === 'admin' || identifier.toLowerCase().includes('admin');
      
      setSuccess(isAdmin ? 'Berhasil masuk sebagai Guru (Admin)! Mengarahkan ke Portal Admin...' : 'Berhasil masuk! Mengarahkan ke dashboard...');
      setTimeout(() => {
        if (isAdmin) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }, 600);
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat masuk. Periksa kembali akun Anda.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-sky-100/70 via-blue-50/50 to-slate-100">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-24 left-0 right-0 h-72 bg-gradient-to-t from-blue-100/60 to-transparent rounded-[100%] scale-150"></div>
        <div className="absolute top-12 left-10 w-24 h-24 bg-blue-200/40 rounded-full blur-2xl"></div>
        <div className="absolute top-1/4 right-12 w-36 h-36 bg-amber-200/40 rounded-full blur-2xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        
        {/* Main Login Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 border-2 border-slate-100 shadow-2xl shadow-blue-950/10 space-y-6">
          
          {/* Logo & Welcome Header with Welcoming Student Character */}
          <div className="text-center space-y-3">
            <div className="flex justify-center pb-1">
              <EcoLogo size="md" />
            </div>

            <div className="flex justify-center -my-1">
              <CharacterIllustration character="boy" expression="happy" size="md" alt="Siswa Menyambut Login" />
            </div>
            
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                Selamat Datang!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Masuk untuk melanjutkan petualangan belajar atau kelola kelas.
              </p>
            </div>
          </div>

          {/* Error & Success Feedback Banners */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-red-600 text-xs font-semibold animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-emerald-700 text-xs font-semibold animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          {/* Form Inputs */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email atau Nama Pengguna"
              id="identifier"
              type="text"
              icon={User}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Contoh: admin@ecolearn.id"
              required
            />

            <Input
              label="Kata Sandi (Password)"
              id="password"
              type="password"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan kata sandi kamu"
              required
            />

            <div className="pt-2 space-y-3">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                disabled={isSubmitting}
                className="shadow-blue-500/25"
              >
                {isSubmitting ? 'Memeriksa Akun...' : 'Masuk'}
              </Button>

              <Link to="/register" className="block">
                <Button variant="outline" fullWidth size="md">
                  Daftar Akun Baru
                </Button>
              </Link>
            </div>
          </form>

          {/* Demo Account Quick-Fill Card */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 text-center">
              Pilihan Cepat Masuk Demo
            </p>

            {/* Demo Guru / Admin */}
            <div className="bg-indigo-50/70 p-3 rounded-2xl border border-indigo-200/80 flex items-center justify-between">
              <div className="text-left">
                <p className="text-[11px] font-bold text-indigo-900 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" /> Akun Guru (Admin)
                </p>
                <p className="text-[10px] text-indigo-600/80 font-medium">admin@ecolearn.id • Sandi: admin123</p>
              </div>
              <button
                type="button"
                onClick={handleFillAdmin}
                className="text-xs font-black text-indigo-700 hover:text-indigo-800 bg-indigo-200/70 px-3 py-1.5 rounded-xl hover:bg-indigo-200 transition-colors cursor-pointer"
              >
                Pilih Admin
              </button>
            </div>

            {/* Demo Siswa */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 flex items-center justify-between">
              <div className="text-left">
                <p className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Akun Siswa (Budi)
                </p>
                <p className="text-[10px] text-slate-400 font-medium">budi@ecolearn.id • Sandi: password123</p>
              </div>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-xs font-black text-blue-600 hover:text-blue-700 bg-blue-100/60 px-3 py-1.5 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer"
              >
                Pilih Siswa
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
