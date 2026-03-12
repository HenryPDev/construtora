'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';
import { Menu, X, LogOut, Home, Building2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#070707]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0d0d0d] border-b border-[rgba(196,160,80,0.1)] flex items-center justify-between px-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 hover:bg-[rgba(196,160,80,0.1)] rounded"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="font-cormorant text-xl text-[rgba(196,160,80,0.9)]">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-[rgba(196,160,80,0.7)] hover:text-[rgba(196,160,80,0.9)] transition-colors"
        >
          <LogOut size={20} />
          <span className="hidden sm:inline font-oswald text-xs tracking-wider">Sair</span>
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-[#0d0d0d] border-r border-[rgba(196,160,80,0.1)] transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } z-40`}
      >
        <nav className="p-6 space-y-2">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-2 rounded text-[rgba(196,160,80,0.7)] hover:text-[rgba(196,160,80,0.9)] hover:bg-[rgba(196,160,80,0.05)] transition-colors font-oswald text-sm"
          >
            <Home size={18} />
            Dashboard
          </Link>
          <Link
            href="/admin/casas"
            className="flex items-center gap-3 px-4 py-2 rounded text-[rgba(196,160,80,0.7)] hover:text-[rgba(196,160,80,0.9)] hover:bg-[rgba(196,160,80,0.05)] transition-colors font-oswald text-sm"
          >
            <Building2 size={18} />
            Gerenciar Imóveis
          </Link>
        </nav>
      </aside>

      {/* Close sidebar on mobile when clicking outside */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30 top-16"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16">{children}</main>
    </div>
  );
}
