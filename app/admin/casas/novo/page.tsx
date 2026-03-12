'use client';

import { useRouter } from 'next/navigation';
import HouseForm from '@/components/admin/house-form';
import { House } from '@/lib/api';
import AdminProtected from '@/components/admin-protected';

function NovoContent() {
  const router = useRouter();

  function handleSuccess(house: House) {
    setTimeout(() => {
      router.push('/admin/casas');
    }, 1500);
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-cormorant text-4xl text-white mb-2">Novo Imóvel</h1>
        <p className="text-[rgba(255,255,255,0.5)] font-oswald text-sm tracking-wider mb-8">
          Preencha o formulário abaixo para criar um novo imóvel
        </p>

        <div className="bg-[#0d0d0d] border border-[rgba(196,160,80,0.2)] rounded p-8">
          <HouseForm onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
}

export default function NovoPage() {
  return (
    <AdminProtected>
      <NovoContent />
    </AdminProtected>
  );
}
