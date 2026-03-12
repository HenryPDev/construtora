'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllHouses } from '@/lib/api';
import { Building2, Plus } from 'lucide-react';
import AdminProtected from '@/components/admin-protected';

function DashboardContent() {
  const [totalHouses, setTotalHouses] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const houses = await getAllHouses();
        setTotalHouses(houses.length);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p className="text-[rgba(196,160,80,0.7)]">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-cormorant text-4xl text-white mb-2">Dashboard</h1>
        <p className="text-[rgba(255,255,255,0.5)] font-oswald text-sm tracking-wider mb-12">
          Bem-vindo ao painel de administração
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#0d0d0d] border border-[rgba(196,160,80,0.2)] p-6 rounded">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-oswald text-[0.7rem] tracking-[0.2em] text-[rgba(196,160,80,0.7)] uppercase mb-2">
                  Total de Imóveis
                </p>
                <p className="font-cormorant text-4xl text-white">{totalHouses}</p>
              </div>
              <Building2 size={48} className="text-[rgba(196,160,80,0.3)]" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#0d0d0d] border border-[rgba(196,160,80,0.2)] p-6 rounded">
          <h2 className="font-oswald text-[0.75rem] tracking-[0.2em] text-[rgba(196,160,80,0.9)] uppercase mb-6">
            Ações Rápidas
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/admin/casas/novo"
              className="flex items-center justify-center gap-2 font-oswald font-[300] text-[0.6rem] tracking-[0.35em] uppercase text-[rgba(196,160,80,0.9)] border border-[rgba(196,160,80,0.4)] px-6 py-3 transition-all duration-300 hover:bg-[rgba(196,160,80,0.1)] hover:border-[rgba(196,160,80,0.8)]"
            >
              <Plus size={18} />
              Novo Imóvel
            </Link>
            <Link
              href="/admin/casas"
              className="flex items-center justify-center font-oswald font-[300] text-[0.6rem] tracking-[0.35em] uppercase text-[rgba(196,160,80,0.9)] border border-[rgba(196,160,80,0.4)] px-6 py-3 transition-all duration-300 hover:bg-[rgba(196,160,80,0.1)] hover:border-[rgba(196,160,80,0.8)]"
            >
              Gerenciar Imóveis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AdminProtected>
      <DashboardContent />
    </AdminProtected>
  );
}
