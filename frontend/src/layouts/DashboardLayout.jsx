import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import DashboardNavbar from '../components/layout/DashboardNavbar';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800">
      
      {/* 1. Desktop Persistent Sidebar */}
      <div className="hidden lg:flex shrink-0 sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* 2. Mobile Drawer Sidebar & Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fadeIn"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white z-10 shadow-2xl animate-slideRight">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* 3. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardNavbar onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
