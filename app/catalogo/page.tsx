import House from "@/components/house";
import FilterDrawer from "@/components/filter-drawer";
import CatalogNav from "@/components/catalog-nav";
import Pagination from "@/components/pagination";
import Footer from "@/components/footer";
import { getHouses } from "@/lib/api";

export const metadata = {
  title: "Catálogo – Zeferino & Correa",
  description: "Explore nosso portfólio de projetos residenciais de alto padrão.",
};

interface CatalogoProps {
  searchParams: Promise<Record<string, string | string[]>>;
}

export default async function Catalogo({ searchParams }: CatalogoProps) {
  const params = await searchParams;

  // Convert params to proper format for API
  const apiParams: Record<string, string> = {};
  let currentPage = 1;

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === 'string') {
      if (key === 'page') {
        currentPage = Math.max(1, parseInt(value) || 1);
      } else {
        apiParams[key] = value;
      }
    }
  });

  // Fetch houses from API with filters and pagination (catalog view)
  const response = await getHouses(apiParams, currentPage, 'catalog');

  // Convert params to initialValues format for Filters component
  const initialValues = Object.entries(params).reduce(
    (acc, [key, value]) => {
      if (typeof value === 'string' && key !== 'page') {
        acc[key as keyof typeof acc] = value;
      }
      return acc;
    },
    {} as Record<string, string>
  );

  return (
    <div className="bg-[#000000] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-10 pt-[10rem] pb-20 border-b border-b-[rgba(196,160,80,0.12)]">
        <p className="font-oswald font-[200] text-[0.6rem] tracking-[0.55em] text-[rgba(196,160,80,0.8)] uppercase mb-4">
          Portfólio
        </p>
        <h1 className="font-cormorant font-[300] text-[clamp(2.5rem,5vw,4.5rem)] text-white tracking-[0.06em] leading-none">
          Catálogo de<br /><em className="italic text-[rgba(255,255,255,0.65)]">Casas</em>
        </h1>
        <p className="font-oswald font-[200] text-[0.72rem] tracking-[0.15em] text-[rgba(255,255,255,0.4)] mt-6 max-w-[500px]">
          Explore nossas obras residenciais de alto padrão — cada projeto, uma história.
        </p>
      </div>

      <CatalogNav />

      <div className="max-w-[1200px] mx-auto px-10 py-12 pb-24 grid grid-cols-1 min-[900px]:grid-cols-[280px_1fr] gap-12 items-start">
        <FilterDrawer initialValues={initialValues} />
        <main>
          <div className="flex flex-col gap-6">
            {response?.data && response.data.length > 0 ? (
              response.data.map((house) => (
                <House key={house.slug} {...house} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="font-oswald font-[200] text-[0.85rem] tracking-[0.05em] text-[rgba(255,255,255,0.4)]">
                  {response?.data === undefined
                    ? 'Erro ao carregar imóveis. Por favor, tente novamente.'
                    : 'Nenhum imóvel encontrado com os filtros selecionados.'}
                </p>
              </div>
            )}

            {/* Pagination */}
            {response?.pagination && response.pagination.totalPages > 0 && (
              <Pagination
                currentPage={response.pagination.page}
                totalPages={response.pagination.totalPages}
                total={response.pagination.total}
                limit={response.pagination.limit}
                searchParams={initialValues}
              />
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
