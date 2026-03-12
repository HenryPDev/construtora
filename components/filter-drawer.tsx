'use client';

import { useState } from 'react';
import { X, Filter } from 'lucide-react';
import Filters from './filters';

interface FilterDrawerProps {
  initialValues?: {
    location?: string;
    minArea?: string;
    bedrooms?: string;
    bathrooms?: string;
    hasPool?: string;
    isFurnished?: string;
    status?: string;
  };
}

export default function FilterDrawer({ initialValues }: FilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Botão de Filtro - Visível apenas no mobile */}
      <button
        onClick={toggleDrawer}
        className="fixed bottom-6 right-6 z-30 md:hidden flex items-center gap-2 bg-[rgba(196,160,80,0.9)] text-black rounded-full px-4 py-3 font-oswald font-[300] text-[0.7rem] tracking-[0.2em] uppercase hover:bg-[rgba(196,160,80,1)] transition-all duration-300 shadow-lg"
      >
        <Filter size={18} />
        Filtros
      </button>

      {/* Overlay - Visível quando drawer está aberto */}
      {isOpen && (
        <div
          onClick={closeDrawer}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Drawer - Desliza da esquerda para direita */}
      <div
        className={`fixed left-0 top-0 h-full w-[280px] bg-[#000000] z-50 transform transition-transform duration-300 ease-in-out border-r border-r-[rgba(196,160,80,0.2)] md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header do Drawer */}
        <div className="flex items-center justify-between p-6 border-b border-b-[rgba(196,160,80,0.2)]">
          <h3 className="font-oswald font-[300] text-[0.85rem] tracking-[0.2em] uppercase text-[rgba(196,160,80,0.9)]">
            Filtros
          </h3>
          <button
            onClick={closeDrawer}
            className="p-1 hover:bg-[rgba(196,160,80,0.1)] rounded transition-colors"
          >
            <X size={20} className="text-[rgba(196,160,80,0.7)]" />
          </button>
        </div>

        {/* Conteúdo do Drawer */}
        <div className="overflow-y-auto h-[calc(100vh-80px)] p-6">
          <Filters initialValues={initialValues} />
        </div>
      </div>

      {/* Filtros Desktop - Visível apenas em telas >= md */}
      <div className="hidden md:block">
        <Filters initialValues={initialValues} />
      </div>
    </>
  );
}
