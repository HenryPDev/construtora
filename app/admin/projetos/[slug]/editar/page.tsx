'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import HouseForm from '@/components/admin/house-form';
import { House, getHouseBySlug } from '@/lib/api';
import AdminProtected from '@/components/admin-protected';

function EditarContent() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<House | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadProject() {
      try {
        const data = await getHouseBySlug(slug);
        if (!data) {
          setNotFound(true);
        } else {
          setProject(data);
        }
      } catch (error) {
        console.error('Error loading project:', error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadProject();
  }, [slug]);

  function handleSuccess(updatedProject: House) {
    // Apenas mostra mensagem de sucesso, não redireciona
  }

  function handleBack() {
    router.push('/admin/projetos');
  }

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p className="text-[rgba(196,160,80,0.7)]">Carregando...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto bg-[#0d0d0d] border border-[rgba(239,68,68,0.5)] rounded p-8 text-center">
          <h1 className="font-cormorant text-2xl text-white mb-2">Projeto não encontrado</h1>
          <p className="text-[rgba(255,255,255,0.5)] font-oswald mb-6">O projeto que você está procurando não existe.</p>
          <button
            onClick={handleBack}
            className="font-oswald font-[300] text-[0.6rem] tracking-[0.35em] uppercase text-[rgba(196,160,80,0.9)] border border-[rgba(196,160,80,0.4)] px-6 py-3 transition-all duration-300 hover:bg-[rgba(196,160,80,0.1)] hover:border-[rgba(196,160,80,0.8)]"
          >
            Voltar para Lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-cormorant text-4xl text-white mb-2">Editar Projeto</h1>
        <p className="text-[rgba(255,255,255,0.5)] font-oswald text-sm tracking-wider mb-8">
          {project?.title}
        </p>

        <div className="bg-[#0d0d0d] border border-[rgba(196,160,80,0.2)] rounded p-8">
          {project && <HouseForm house={project} onSuccess={handleSuccess} onBack={handleBack} />}
        </div>
      </div>
    </div>
  );
}

export default function EditarPage() {
  return (
    <AdminProtected>
      <EditarContent />
    </AdminProtected>
  );
}
