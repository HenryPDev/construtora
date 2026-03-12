'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CatalogNav() {
  const pathname = usePathname();
  const isCatalog = pathname === '/catalogo';
  const isProjects = pathname === '/projetos';

  return (
    <div className="md:hidden flex gap-2 px-10 pt-4 pb-4 border-b border-b-[rgba(196,160,80,0.2)] sticky top-0 bg-[#000000] z-20">
      <Link
        href="/catalogo"
        className={`flex-1 py-3 px-4 text-center font-oswald font-[300] text-[0.7rem] tracking-[0.2em] uppercase rounded transition-all duration-300 ${
          isCatalog
            ? 'bg-[rgba(196,160,80,0.9)] text-black'
            : 'bg-[rgba(196,160,80,0.1)] text-[rgba(196,160,80,0.7)] hover:bg-[rgba(196,160,80,0.2)]'
        }`}
      >
        Catálogo
      </Link>
      <Link
        href="/projetos"
        className={`flex-1 py-3 px-4 text-center font-oswald font-[300] text-[0.7rem] tracking-[0.2em] uppercase rounded transition-all duration-300 ${
          isProjects
            ? 'bg-[rgba(196,160,80,0.9)] text-black'
            : 'bg-[rgba(196,160,80,0.1)] text-[rgba(196,160,80,0.7)] hover:bg-[rgba(196,160,80,0.2)]'
        }`}
      >
        Ver Projetos
      </Link>
    </div>
  );
}
