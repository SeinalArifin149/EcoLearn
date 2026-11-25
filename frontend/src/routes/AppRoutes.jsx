import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

// Public Pages
import LandingPage from '../pages/public/LandingPage';
import LoginPage from '../pages/public/LoginPage';
import RegisterPage from '../pages/public/RegisterPage';

// User Pages
import DashboardPage from '../pages/user/DashboardPage';
import MateriPage from '../pages/user/MateriPage';
import DetailMateriPage from '../pages/user/DetailMateriPage';
import UjianPage from '../pages/user/UjianPage';
import HasilUjianPage from '../pages/user/HasilUjianPage';
import PretestPage from '../pages/user/PretestPage';
import PosttestPage from '../pages/user/PosttestPage';
import ProfilePage from '../pages/user/ProfilePage';
import SettingsPage from '../pages/user/SettingsPage';

// Evaluasi Pages (Tahap 4)
import EvaluasiPage from '../pages/user/EvaluasiPage';
import EvaluasiTestPage from '../pages/user/EvaluasiTestPage';
import HasilEvaluasiPage from '../pages/user/HasilEvaluasiPage';
import PerbandinganEvaluasiPage from '../pages/user/PerbandinganEvaluasiPage';

// Admin Portal Pages
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminMateriPage from '../pages/admin/AdminMateriPage';
import AdminSiswaPage from '../pages/admin/AdminSiswaPage';
import AdminConfigPage from '../pages/admin/AdminConfigPage';

// Simulation Pages
import SimulasiPage from '../pages/user/SimulasiPage';
import SimulasiPermintaanPenawaranPage from '../pages/user/SimulasiPermintaanPenawaranPage';
import SimulasiPasarPage from '../pages/user/SimulasiPasarPage';
import SimulasiKeuanganPage from '../pages/user/SimulasiKeuanganPage';
import SimulasiKegiatanEkonomiPage from '../pages/user/SimulasiKegiatanEkonomiPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages Layout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        
        {/* Only accessible if NOT logged in (redirects to /dashboard if logged in) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

      {/* Protected User Dashboard Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/materi" element={<MateriPage />} />
          <Route path="/materi/:id" element={<DetailMateriPage />} />
          <Route path="/simulasi" element={<SimulasiPage />} />
          <Route path="/simulasi/permintaan-penawaran" element={<SimulasiPermintaanPenawaranPage />} />
          <Route path="/simulasi/pasar" element={<SimulasiPasarPage />} />
          <Route path="/simulasi/keuangan" element={<SimulasiKeuanganPage />} />
          <Route path="/simulasi/kegiatan-ekonomi" element={<SimulasiKegiatanEkonomiPage />} />
          <Route path="/ujian" element={<UjianPage />} />
          <Route path="/ujian/hasil" element={<HasilUjianPage />} />
          
          {/* Pretest & Posttest Evaluasi Routes (Tahap 4) */}
          <Route path="/evaluasi" element={<EvaluasiPage />} />
          <Route path="/evaluasi/perbandingan" element={<PerbandinganEvaluasiPage />} />
          <Route path="/evaluasi/hasil/:attemptId" element={<HasilEvaluasiPage />} />
          <Route path="/evaluasi/:testType" element={<EvaluasiTestPage />} />
          
          <Route path="/pretest" element={<PretestPage />} />
          <Route path="/posttest" element={<PosttestPage />} />
          
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* Admin Portal Routes (Mobile & Desktop Responsive) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="siswa" element={<AdminSiswaPage />} />
        <Route path="materi" element={<AdminMateriPage />} />
        <Route path="konfigurasi" element={<AdminConfigPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
