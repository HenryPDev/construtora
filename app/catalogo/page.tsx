import House from "@/components/house";
import Filters from "@/components/filters";
import { houses } from "@/lib/houses";

export const metadata = {
  title: "Catálogo – Zeferino & Correa",
  description: "Explore nosso portfólio de projetos residenciais de alto padrão.",
};

interface CatalogoProps {
  searchParams: Promise<Record<string, string | string[]>>;
}

export default async function Catalogo({ searchParams }: CatalogoProps) {
  const params = await searchParams;

  // Convert params to filter criteria
  const filteredHouses = houses.filter((house) => {
    if (params.location && params.location !== 'Todas' && house.location !== params.location) return false;
    if (params.minArea && house.area && house.area < Number(params.minArea)) return false;
    if (params.bedrooms && house.bedrooms && house.bedrooms < Number(params.bedrooms)) return false;
    if (params.bathrooms && house.bathrooms && house.bathrooms < Number(params.bathrooms)) return false;
    if (params.hasPool === 'true' && !house.hasPool) return false;
    if (params.isFurnished === 'true' && !house.isFurnished) return false;
    if (params.status && house.status !== params.status) return false;
    return true;
  });

  // Convert params to initialValues format for Filters component
  const initialValues = Object.entries(params).reduce(
    (acc, [key, value]) => {
      if (typeof value === 'string') {
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

      <div className="max-w-[1200px] mx-auto px-10 py-12 pb-24 grid grid-cols-1 min-[900px]:grid-cols-[280px_1fr] gap-12 items-start">
        <Filters initialValues={initialValues} />
        <main>
          <div className="flex flex-col gap-6">
            {filteredHouses.length > 0 ? (
              filteredHouses.map((house) => (
                <House key={house.slug} {...house} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="font-oswald font-[200] text-[0.85rem] tracking-[0.05em] text-[rgba(255,255,255,0.4)]">
                  Nenhum imóvel encontrado com os filtros selecionados.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
