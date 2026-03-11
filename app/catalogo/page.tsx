import House from "@/components/house";
import Filters from "@/components/filters";
import { houses } from "@/lib/houses";

export const metadata = {
  title: "Catálogo – Zeferino & Correa",
  description: "Explore nosso portfólio de projetos residenciais de alto padrão.",
};

export default function Catalogo() {
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
        <Filters />
        <main>
          <div className="flex flex-col gap-6">
            {houses.map((house) => (
              <House key={house.slug} {...house} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
