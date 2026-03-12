import Link from "next/link";
import { notFound } from "next/navigation";
import { getHouseBySlug, getHouses } from "@/lib/api";
import { Bed, Bath, Waves, Ruler, MapPin, Sofa, ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  try {
    const response = await getHouses();
    return response?.data?.map((h) => ({ slug: h.slug })) || [];
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const house = await getHouseBySlug(slug);
  if (!house) return {};
  return {
    title: `${house.title} – Zeferino & Correa`,
    description: house.description,
  };
}

export default async function CasaDetalhe({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const house = await getHouseBySlug(slug);
  if (!house) notFound();

  const [hero, ...gallery] = house.images;

  const statusColor = house.status === 'Em construção'
    ? 'bg-[rgba(255,140,0,0.25)] border-[rgba(255,180,0,0.7)] text-[rgba(255,180,0,1)] shadow-[0_0_12px_rgba(255,165,0,0.4)]'
    : 'bg-[rgba(34,197,94,0.25)] border-[rgba(34,197,94,0.7)] text-[rgba(60,220,100,1)] shadow-[0_0_12px_rgba(34,197,94,0.4)]';
  const statusDot = house.status === 'Em construção' ? 'bg-[rgba(255,180,0,1)]' : 'bg-[rgba(60,220,100,1)]';

  return (
    <div className="bg-[#070707] min-h-screen">
      {/* Hero */}
      <div className="relative w-full h-screen overflow-hidden">
        <img src={hero} alt={house.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,7,7,1)_0%,rgba(7,7,7,0.35)_55%,rgba(7,7,7,0.15)_100%)]" />

        {/* Back */}
        <Link
          href="/catalogo"
          className="absolute top-28 left-10 flex items-center gap-3 font-oswald font-[200] text-[0.6rem] tracking-[0.35em] text-[rgba(255,255,255,0.6)] uppercase no-underline hover:text-[rgba(196,160,80,0.9)] transition-colors duration-300"
        >
          <ArrowLeft size={14} />
          Catálogo
        </Link>

        {/* Status badge */}
        {house.status && (
          <div className={`absolute top-28 right-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-md font-oswald font-[300] text-[0.58rem] tracking-[0.2em] uppercase ${statusColor}`}>
            <div className={`w-1 h-1 rounded-full ${statusDot}`} />
            {house.status}
          </div>
        )}

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 max-w-[1200px] mx-auto px-10 pb-16">
          {house.location && (
            <div className="flex items-center gap-2 font-oswald font-[200] text-[0.6rem] tracking-[0.5em] text-[rgba(196,160,80,0.8)] uppercase mb-4">
              <MapPin size={12} />
              {house.location}
              {house.yearDelivery && <span className="text-[rgba(255,255,255,0.3)]">· Entrega {house.yearDelivery}</span>}
            </div>
          )}
          <h1 className="font-cormorant font-[300] text-[clamp(3rem,6vw,6rem)] text-white tracking-[0.06em] leading-[0.95]">
            {house.title}
          </h1>
        </div>
      </div>

      {/* Description + specs */}
      <div className="max-w-[1200px] mx-auto px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-16 items-start">
          <div>
            <p className="font-oswald font-[200] text-[0.6rem] tracking-[0.55em] text-[rgba(196,160,80,0.8)] uppercase mb-5">
              Sobre o imóvel
            </p>
            <p className="font-oswald font-[200] text-[0.85rem] leading-[2] tracking-[0.04em] text-[rgba(255,255,255,0.55)]">
              {house.description}
            </p>
          </div>

          {/* Specs */}
          <div className="bg-[#0d0d0d] border border-[rgba(196,160,80,0.12)] p-6 flex flex-col gap-5">
            <p className="font-oswald font-[300] text-[0.6rem] tracking-[0.45em] text-[rgba(196,160,80,0.8)] uppercase pb-4 border-b border-b-[rgba(196,160,80,0.12)]">
              Especificações
            </p>

            {[
              { icon: <Ruler size={15} />, label: "Área", value: house.area ? `${house.area}m²` : null },
              { icon: <MapPin size={15} />, label: "Localização", value: house.location },
              { icon: <Bed size={15} />, label: "Quartos", value: house.bedrooms !== undefined ? String(house.bedrooms) : null },
              { icon: <Bath size={15} />, label: "Banheiros", value: house.bathrooms !== undefined ? String(house.bathrooms) : null },
              { icon: <Waves size={15} />, label: "Piscina", value: house.hasPool !== undefined ? (house.hasPool ? "Sim" : "Não") : null },
              { icon: <Sofa size={15} />, label: "Mobiliado", value: house.isFurnished !== undefined ? (house.isFurnished ? "Sim" : "Não") : null },
              { icon: null, label: "Estilo", value: house.style },
              { icon: null, label: "Entrega", value: house.yearDelivery },
            ]
              .filter((r) => r.value !== null && r.value !== undefined)
              .map(({ icon, label, value }) => (
                <div key={label} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[rgba(196,160,80,0.6)]">
                    {icon}
                    <span className="font-oswald font-[200] text-[0.6rem] tracking-[0.25em] text-[rgba(255,255,255,0.35)] uppercase">
                      {label}
                    </span>
                  </div>
                  <span className="font-oswald font-[300] text-[0.72rem] tracking-[0.1em] text-[rgba(255,255,255,0.75)]">
                    {value}
                  </span>
                </div>
              ))}

            <div className="pt-4 border-t border-t-[rgba(196,160,80,0.12)] flex flex-col gap-3">
              <Link
                href="/contatos"
                className="block w-full text-center font-oswald font-[300] text-[0.6rem] tracking-[0.35em] uppercase text-[rgba(196,160,80,0.9)] border border-[rgba(196,160,80,0.4)] px-4 py-3 no-underline transition-all duration-300 hover:bg-[rgba(196,160,80,0.1)] hover:border-[rgba(196,160,80,0.8)]"
              >
                Converse com o construtor
              </Link>
              <Link
                href="/contatos"
                className="block w-full text-center font-oswald font-[200] text-[0.6rem] tracking-[0.35em] uppercase text-[rgba(255,255,255,0.3)] border border-[rgba(255,255,255,0.08)] px-4 py-3 no-underline transition-all duration-300 hover:text-[rgba(255,255,255,0.6)] hover:border-[rgba(255,255,255,0.2)]"
              >
                Mais informações
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      {gallery.length > 0 && (
        <div className="max-w-[1200px] mx-auto px-10 pb-20">
          <p className="font-oswald font-[200] text-[0.6rem] tracking-[0.55em] text-[rgba(196,160,80,0.8)] uppercase mb-8">
            Galeria de fotos
          </p>

          {/* First wide */}
          <div className="relative overflow-hidden aspect-[16/7] mb-3 group/g0">
            <img
              src={gallery[0]}
              alt={`${house.title} – foto 1`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/g0:scale-[1.04]"
            />
          </div>

          {/* Rest in grid */}
          {gallery.slice(1).length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {gallery.slice(1).map((img, idx) => (
                <div key={idx} className="relative overflow-hidden aspect-square group/g">
                  <img
                    src={img}
                    alt={`${house.title} – foto ${idx + 2}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/g:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)] opacity-0 group-hover/g:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bottom nav */}
      <div className="border-t border-t-[rgba(196,160,80,0.12)]">
        <div className="max-w-[1200px] mx-auto px-10 py-10 flex justify-between items-center flex-wrap gap-4">
          <Link
            href="/catalogo"
            className="flex items-center gap-3 font-oswald font-[200] text-[0.6rem] tracking-[0.35em] text-[rgba(255,255,255,0.4)] uppercase no-underline hover:text-[rgba(196,160,80,0.8)] transition-colors duration-300"
          >
            <ArrowLeft size={13} />
            Voltar ao catálogo
          </Link>
          <Link
            href="/contatos"
            className="font-oswald font-[300] text-[0.6rem] tracking-[0.35em] uppercase text-[rgba(196,160,80,0.9)] border border-[rgba(196,160,80,0.4)] px-8 py-3 no-underline transition-all duration-300 hover:bg-[rgba(196,160,80,0.1)] hover:border-[rgba(196,160,80,0.8)]"
          >
            Fale conosco
          </Link>
        </div>
      </div>
    </div>
  );
}
