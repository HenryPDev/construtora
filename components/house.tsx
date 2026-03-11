import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Waves, Sofa, Ruler, Bath, Bed } from 'lucide-react';

interface HouseProps {
  slug: string;
  image: string;
  title: string;
  description: string;
  price?: string;
  location?: string;
  area?: number;
  bedrooms?: number;
  bathrooms?: number;
  hasPool?: boolean;
  isFurnished?: boolean;
  status?: 'Em construção' | 'Finalizado';
}

export default function House({
  slug,
  image,
  title,
  description,
  price,
  location,
  area,
  bedrooms,
  bathrooms,
  hasPool,
  isFurnished,
  status,
}: HouseProps) {
  return (
    <article className="bg-[#0d0d0d] border border-[rgba(196,160,80,0.1)] grid grid-cols-1 md:grid-cols-[340px_1fr] overflow-hidden transition-[border-color] duration-300 hover:border-[rgba(196,160,80,0.3)] group/house">
      <div className="relative overflow-hidden md:h-auto h-[220px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] group-hover/house:scale-[1.06]"
        />
        {status && (
          <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.55rem] font-oswald font-[300] tracking-[0.2em] uppercase backdrop-blur-md border ${
            status === 'Em construção'
              ? 'bg-[rgba(255,140,0,0.25)] border-[rgba(255,180,0,0.7)] text-[rgba(255,180,0,1)] shadow-[0_0_12px_rgba(255,165,0,0.4)]'
              : 'bg-[rgba(34,197,94,0.25)] border-[rgba(34,197,94,0.7)] text-[rgba(60,220,100,1)] shadow-[0_0_12px_rgba(34,197,94,0.4)]'
          }`}>
            <div className={`w-1 h-1 rounded-full ${status === 'Em construção' ? 'bg-[rgba(255,180,0,1)]' : 'bg-[rgba(60,220,100,1)]'}`} />
            {status}
          </div>
        )}
      </div>

      <div className="p-6 md:px-10 md:py-9 flex flex-col justify-between">
        <div>
          {location && (
            <div className="flex items-center gap-[0.4rem] font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(196,160,80,0.7)] uppercase mb-[0.8rem]">
              <MapPin size={11} />
              {location}
            </div>
          )}
          <h2 className="font-cormorant font-[300] text-[1.9rem] text-white tracking-[0.05em] leading-[1.1] mb-4">{title}</h2>
          <p className="font-oswald font-[200] text-[0.72rem] leading-[1.9] tracking-[0.04em] text-[rgba(255,255,255,0.4)] mb-[1.8rem]">{description}</p>

          <div className="flex flex-wrap gap-6 py-6 border-t border-t-[rgba(196,160,80,0.1)] border-b border-b-[rgba(196,160,80,0.1)] mb-[1.8rem]">
            {area && (
              <div className="flex items-center gap-2">
                <Ruler size={16} className="text-[rgba(196,160,80,0.7)] shrink-0" />
                <div>
                  <span className="font-oswald font-[200] text-[0.55rem] tracking-[0.25em] text-[rgba(255,255,255,0.3)] uppercase block">Área</span>
                  <span className="font-oswald font-[300] text-[0.75rem] tracking-[0.1em] text-[rgba(255,255,255,0.75)]">{area}m²</span>
                </div>
              </div>
            )}
            {bedrooms !== undefined && (
              <div className="flex items-center gap-2">
                <Bed size={16} className="text-[rgba(196,160,80,0.7)] shrink-0" />
                <div>
                  <span className="font-oswald font-[200] text-[0.55rem] tracking-[0.25em] text-[rgba(255,255,255,0.3)] uppercase block">Quartos</span>
                  <span className="font-oswald font-[300] text-[0.75rem] tracking-[0.1em] text-[rgba(255,255,255,0.75)]">{bedrooms}</span>
                </div>
              </div>
            )}
            {bathrooms !== undefined && (
              <div className="flex items-center gap-2">
                <Bath size={16} className="text-[rgba(196,160,80,0.7)] shrink-0" />
                <div>
                  <span className="font-oswald font-[200] text-[0.55rem] tracking-[0.25em] text-[rgba(255,255,255,0.3)] uppercase block">Banheiros</span>
                  <span className="font-oswald font-[300] text-[0.75rem] tracking-[0.1em] text-[rgba(255,255,255,0.75)]">{bathrooms}</span>
                </div>
              </div>
            )}
            <div className={`flex items-center gap-2 ${!hasPool ? 'opacity-30' : ''}`}>
              <Waves size={16} className="text-[rgba(196,160,80,0.7)] shrink-0" />
              <div>
                <span className="font-oswald font-[200] text-[0.55rem] tracking-[0.25em] text-[rgba(255,255,255,0.3)] uppercase block">Piscina</span>
                <span className="font-oswald font-[300] text-[0.75rem] tracking-[0.1em] text-[rgba(255,255,255,0.75)]">{hasPool ? 'Sim' : 'Não'}</span>
              </div>
            </div>
            <div className={`flex items-center gap-2 ${!isFurnished ? 'opacity-30' : ''}`}>
              <Sofa size={16} className="text-[rgba(196,160,80,0.7)] shrink-0" />
              <div>
                <span className="font-oswald font-[200] text-[0.55rem] tracking-[0.25em] text-[rgba(255,255,255,0.3)] uppercase block">Mobiliado</span>
                <span className="font-oswald font-[300] text-[0.75rem] tracking-[0.1em] text-[rgba(255,255,255,0.75)]">{isFurnished ? 'Sim' : 'Não'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {price && (
            <div className="font-cormorant font-[300] text-[2rem] text-[rgba(196,160,80,0.9)] tracking-[0.05em]">{price}</div>
          )}
          <Link
            href={`/catalogo/${slug}`}
            className="font-oswald font-[300] text-[0.6rem] tracking-[0.35em] uppercase text-[rgba(196,160,80,0.8)] border border-[rgba(196,160,80,0.3)] px-[1.4rem] py-[0.6rem] transition-all duration-[250ms] hover:bg-[rgba(196,160,80,0.08)] hover:border-[rgba(196,160,80,0.7)] hover:text-[rgba(196,160,80,1)] no-underline"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </article>
  );
}
