'use client';

import { useRouter } from 'next/navigation';
import HouseForm from '@/components/admin/house-form';
import { House } from '@/lib/api';
import AdminProtected from '@/components/admin-protected';

function NovoContent() {
  const router = useRouter();

  function handleSuccess(house: House) {
    // Apenas mostra mensagem de sucesso, não redireciona
  }

  function handleBack() {
    router.push('/admin/projetos');
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-cormorant text-4xl text-white mb-2">Novo Projeto</h1>
        <p className="text-[rgba(255,255,255,0.5)] font-oswald text-sm tracking-wider mb-8">
          Preencha o formulário abaixo para criar um novo projeto
        </p>

        <div className="bg-[#0d0d0d] border border-[rgba(196,160,80,0.2)] rounded p-8">
          <HouseForm onSuccess={handleSuccess} onBack={handleBack} />
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
