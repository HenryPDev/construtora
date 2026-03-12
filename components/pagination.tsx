import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
  searchParams: Record<string, string>;
}

export default function Pagination({
  currentPage,
  totalPages,
  total,
  limit,
  searchParams,
}: PaginationProps) {
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  function buildUrl(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `/catalogo?${params.toString()}`;
  }

  const pages = [];
  const maxVisible = 5;
  const halfVisible = Math.floor(maxVisible / 2);

  let startPage = Math.max(1, currentPage - halfVisible);
  let endPage = Math.min(totalPages, currentPage + halfVisible);

  if (currentPage - halfVisible <= 1) {
    endPage = Math.min(totalPages, startPage + maxVisible - 1);
  }
  if (currentPage + halfVisible > totalPages) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col gap-6 items-center mt-12">
      {/* Counter */}
      <div className="text-center">
        <p className="font-oswald font-[200] text-[0.75rem] tracking-[0.05em] text-[rgba(255,255,255,0.5)]">
          Mostrando <span className="text-[rgba(196,160,80,0.9)]">{startItem}</span> a{' '}
          <span className="text-[rgba(196,160,80,0.9)]">{endItem}</span> de{' '}
          <span className="text-[rgba(196,160,80,0.9)]">{total}</span> imóveis
        </p>
        <p className="font-oswald font-[200] text-[0.65rem] tracking-[0.15em] text-[rgba(196,160,80,0.6)] uppercase mt-2">
          Página {currentPage} de {totalPages}
        </p>
      </div>

      {/* Pagination buttons */}
      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          {/* Previous button */}
          {currentPage > 1 ? (
            <Link
              href={buildUrl(currentPage - 1)}
              className="flex items-center justify-center w-10 h-10 border border-[rgba(196,160,80,0.3)] text-[rgba(196,160,80,0.7)] hover:border-[rgba(196,160,80,0.8)] hover:text-[rgba(196,160,80,1)] transition-colors duration-200"
            >
              <ChevronLeft size={16} />
            </Link>
          ) : (
            <div className="flex items-center justify-center w-10 h-10 border border-[rgba(196,160,80,0.1)] text-[rgba(196,160,80,0.2)] opacity-50 cursor-not-allowed">
              <ChevronLeft size={16} />
            </div>
          )}

          {/* Page numbers */}
          {startPage > 1 && (
            <>
              <Link
                href={buildUrl(1)}
                className="w-10 h-10 flex items-center justify-center font-oswald font-[300] text-[0.7rem] border border-[rgba(196,160,80,0.2)] text-[rgba(255,255,255,0.5)] hover:border-[rgba(196,160,80,0.6)] hover:text-[rgba(196,160,80,0.9)] transition-colors duration-200"
              >
                1
              </Link>
              {startPage > 2 && (
                <span className="font-oswald font-[200] text-[0.7rem] text-[rgba(255,255,255,0.3)]">...</span>
              )}
            </>
          )}

          {pages.map((page) => (
            <Link
              key={page}
              href={buildUrl(page)}
              className={`w-10 h-10 flex items-center justify-center font-oswald font-[300] text-[0.7rem] border transition-all duration-200 ${
                page === currentPage
                  ? 'bg-[rgba(196,160,80,0.1)] border-[rgba(196,160,80,0.8)] text-[rgba(196,160,80,0.9)]'
                  : 'border-[rgba(196,160,80,0.2)] text-[rgba(255,255,255,0.5)] hover:border-[rgba(196,160,80,0.6)] hover:text-[rgba(196,160,80,0.9)]'
              }`}
            >
              {page}
            </Link>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="font-oswald font-[200] text-[0.7rem] text-[rgba(255,255,255,0.3)]">...</span>
              )}
              <Link
                href={buildUrl(totalPages)}
                className="w-10 h-10 flex items-center justify-center font-oswald font-[300] text-[0.7rem] border border-[rgba(196,160,80,0.2)] text-[rgba(255,255,255,0.5)] hover:border-[rgba(196,160,80,0.6)] hover:text-[rgba(196,160,80,0.9)] transition-colors duration-200"
              >
                {totalPages}
              </Link>
            </>
          )}

          {/* Next button */}
          {currentPage < totalPages ? (
            <Link
              href={buildUrl(currentPage + 1)}
              className="flex items-center justify-center w-10 h-10 border border-[rgba(196,160,80,0.3)] text-[rgba(196,160,80,0.7)] hover:border-[rgba(196,160,80,0.8)] hover:text-[rgba(196,160,80,1)] transition-colors duration-200"
            >
              <ChevronRight size={16} />
            </Link>
          ) : (
            <div className="flex items-center justify-center w-10 h-10 border border-[rgba(196,160,80,0.1)] text-[rgba(196,160,80,0.2)] opacity-50 cursor-not-allowed">
              <ChevronRight size={16} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
