import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loading from '../components/common/Loading';

export default function PublicRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loading text="Memeriksa sesi..." />
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
