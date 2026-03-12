'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllHouses, deleteHouse } from '@/lib/api';
import { House } from '@/lib/api';
import { Edit2, Trash2, Plus, Eye } from 'lucide-react';
import DeleteModal from '@/components/admin/delete-modal';
import AdminProtected from '@/components/admin-protected';

function ProjetosContent() {
  const [projects, setProjects] = useState<House[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; project?: House }>({ isOpen: false });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      setIsLoading(true);
      const data = await getAllHouses();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    if (!deleteModal.project) return;

    setIsDeleting(true);
    try {
      await deleteHouse(deleteModal.project.slug);
      setProjects((prev) => prev.filter((p) => p.slug !== deleteModal.project?.slug));
      setDeleteModal({ isOpen: false });
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Erro ao excluir projeto');
    } finally {
      setIsDeleting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <p className="text-[rgba(196,160,80,0.7)]">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-cormorant text-4xl text-white mb-2">Projetos</h1>
            <p className="text-[rgba(255,255,255,0.5)] font-oswald text-sm tracking-wider">
              Total: {projects.length} projeto(s)
            </p>
          </div>
          <Link
            href="/admin/projetos/novo"
            className="flex items-center gap-2 font-oswald font-[300] text-[0.6rem] tracking-[0.35em] uppercase text-[rgba(196,160,80,0.9)] border border-[rgba(196,160,80,0.4)] px-6 py-3 transition-all duration-300 hover:bg-[rgba(196,160,80,0.1)] hover:border-[rgba(196,160,80,0.8)]"
          >
            <Plus size={18} />
            Novo Projeto
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="bg-[#0d0d0d] border border-[rgba(196,160,80,0.2)] rounded p-12 text-center">
            <p className="text-[rgba(255,255,255,0.5)] font-oswald mb-4">Nenhum projeto cadastrado</p>
            <Link
              href="/admin/projetos/novo"
              className="inline-flex items-center gap-2 font-oswald font-[300] text-[0.6rem] tracking-[0.35em] uppercase text-[rgba(196,160,80,0.9)] border border-[rgba(196,160,80,0.4)] px-6 py-3 transition-all duration-300 hover:bg-[rgba(196,160,80,0.1)] hover:border-[rgba(196,160,80,0.8)]"
            >
              <Plus size={18} />
              Criar Primeiro Projeto
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(196,160,80,0.2)]">
                  <th className="text-left py-4 px-4 font-oswald font-[200] text-[0.7rem] tracking-[0.2em] text-[rgba(196,160,80,0.7)] uppercase">
                    Título
                  </th>
                  <th className="text-left py-4 px-4 font-oswald font-[200] text-[0.7rem] tracking-[0.2em] text-[rgba(196,160,80,0.7)] uppercase">
                    Localização
                  </th>
                  <th className="text-left py-4 px-4 font-oswald font-[200] text-[0.7rem] tracking-[0.2em] text-[rgba(196,160,80,0.7)] uppercase">
                    Status
                  </th>
                  <th className="text-left py-4 px-4 font-oswald font-[200] text-[0.7rem] tracking-[0.2em] text-[rgba(196,160,80,0.7)] uppercase">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project.slug}
                    className="border-b border-[rgba(196,160,80,0.1)] hover:bg-[rgba(196,160,80,0.05)] transition-colors"
                  >
                    <td className="py-4 px-4 text-white font-oswald text-sm">{project.title}</td>
                    <td className="py-4 px-4 text-[rgba(255,255,255,0.7)] font-oswald text-sm">
                      {project.location || '—'}
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-block px-3 py-1 rounded text-[0.65rem] font-oswald tracking-wide bg-[rgba(196,160,80,0.1)] text-[rgba(196,160,80,0.8)]">
                        {project.status || '—'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/projetos/${project.slug}`}
                          target="_blank"
                          title="Visualizar"
                          className="p-2 hover:bg-[rgba(196,160,80,0.1)] rounded transition-colors"
                        >
                          <Eye size={16} className="text-[rgba(196,160,80,0.6)]" />
                        </Link>
                        <Link
                          href={`/admin/projetos/${project.slug}/editar`}
                          title="Editar"
                          className="p-2 hover:bg-[rgba(196,160,80,0.1)] rounded transition-colors"
                        >
                          <Edit2 size={16} className="text-[rgba(196,160,80,0.6)]" />
                        </Link>
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, project })}
                          title="Excluir"
                          className="p-2 hover:bg-[rgba(239,68,68,0.1)] rounded transition-colors"
                        >
                          <Trash2 size={16} className="text-[rgba(239,68,68,0.6)]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        title={deleteModal.project?.title || ''}
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ isOpen: false })}
      />
    </div>
  );
}

export default function ProjetosPage() {
  return (
    <AdminProtected>
      <ProjetosContent />
    </AdminProtected>
  );
}
