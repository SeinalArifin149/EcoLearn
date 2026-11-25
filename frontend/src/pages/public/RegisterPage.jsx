import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import EcoLogo from '../../components/common/EcoLogo';
import CharacterIllustration from '../../components/common/CharacterIllustration';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { User, AtSign, Mail, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { name, username, email, password, confirmPassword } = formData;

    // Validations
    if (!name.trim()) {
      setError('Nama lengkap wajib diisi.');
      return;
    }
    if (!username.trim()) {
      setError('Nama pengguna (username) wajib diisi.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Masukkan format alamat email yang valid.');
      return;
    }
    if (!password) {
      setError('Kata sandi wajib diisi.');
      return;
    }
    if (password.length < 6) {
      setError('Kata sandi minimal 6 karakter.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    setIsSubmitting(true);
    try {
      await register(name.trim(), username.trim(), email.trim(), password);
      setSuccess('Pendaftaran berhasil! Mengarahkan ke dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 700);
    } catch (err) {
      setError(err.message || 'Gagal melakukan pendaftaran. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-sky-100/70 via-emerald-50/50 to-slate-100">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-24 left-0 right-0 h-72 bg-gradient-to-t from-emerald-100/60 to-transparent rounded-[100%] scale-150"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-amber-200/40 rounded-full blur-2xl"></div>
        <div className="absolute top-1/3 left-10 w-40 h-40 bg-teal-200/40 rounded-full blur-2xl"></div>
      </div>

      <div className="relative w-full max-w-lg">
        
        {/* Main Register Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 border-2 border-slate-100 shadow-2xl shadow-emerald-950/10 space-y-6">
          
          {/* Header with Friendly Character Carrying Economics Book */}
          <div className="text-center space-y-3">
            <div className="flex justify-center pb-1">
              <EcoLogo size="md" />
            </div>

            <div className="flex justify-center -my-1">
              <CharacterIllustration character="girl" size="md" alt="Siswi Membawa Buku Pelajaran" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                Daftar Akun Baru
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Mulai petualangan belajarmu dan raih lencana Ekonom Muda!
              </p>
            </div>
          </div>

          {/* Feedback Banners */}
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nama Lengkap"
              id="name"
              type="text"
              icon={User}
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Contoh: Budi Santoso"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nama Pengguna"
                id="username"
                type="text"
                icon={AtSign}
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value)}
                placeholder="budisantoso"
                required
              />

              <Input
                label="Alamat Email"
                id="email"
                type="email"
                icon={Mail}
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="budi@sekolah.id"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Kata Sandi"
                id="password"
                type="password"
                icon={Lock}
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="Min. 6 karakter"
                required
              />

              <Input
                label="Konfirmasi Sandi"
                id="confirmPassword"
                type="password"
                icon={Lock}
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                placeholder="Ulangi kata sandi"
                required
              />
            </div>

            <div className="pt-2 space-y-3">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                disabled={isSubmitting}
                className="shadow-blue-500/25"
              >
                {isSubmitting ? 'Mendaftarkan Akun...' : 'Daftar Sekarang'}
              </Button>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-500 font-medium">
                  Sudah memiliki akun?{' '}
                  <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700 hover:underline">
                    Masuk di sini
                  </Link>
                </p>
              </div>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
}
