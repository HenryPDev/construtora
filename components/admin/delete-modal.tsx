'use client';

interface DeleteModalProps {
  isOpen: boolean;
  title: string;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteModal({ isOpen, title, isLoading, onConfirm, onCancel }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0d0d0d] border border-[rgba(196,160,80,0.2)] rounded p-6 max-w-md w-full">
        <h2 className="font-cormorant text-2xl text-white mb-4">Confirmar Exclusão</h2>
        <p className="text-[rgba(255,255,255,0.7)] mb-6">
          Tem certeza que deseja excluir <strong>{title}</strong>? Esta ação não pode ser desfeita.
        </p>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 font-oswald font-[200] text-[0.75rem] tracking-[0.2em] uppercase text-[rgba(196,160,80,0.9)] border border-[rgba(196,160,80,0.4)] px-4 py-2 transition-all hover:bg-[rgba(196,160,80,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 font-oswald font-[200] text-[0.75rem] tracking-[0.2em] uppercase text-white bg-[rgba(239,68,68,0.8)] border border-[rgba(239,68,68,0.8)] px-4 py-2 transition-all hover:bg-[rgba(239,68,68,1)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Excluindo...' : 'Excluir'}
          </button>
        </div>
      </div>
    </div>
  );
}
