'use client';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface FiltersProps {
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

export default function Filters({ initialValues }: FiltersProps) {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<string>(initialValues?.location || 'Todas');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [areaValue, setAreaValue] = useState(Number(initialValues?.minArea) || 50);
  const [selectedRooms, setSelectedRooms] = useState<string | null>(initialValues?.bedrooms || null);
  const [selectedBathrooms, setSelectedBathrooms] = useState<string | null>(initialValues?.bathrooms || null);
  const [hasPool, setHasPool] = useState(initialValues?.hasPool === 'true');
  const [hasFurniture, setHasFurniture] = useState(initialValues?.isFurnished === 'true');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(initialValues?.status || null);

  const locations = ['Todas', 'Riviera', 'Ecoville 1', 'Ecoville 2', 'Porto Madeiro', 'Porto Seguro'];

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (selectedLocation && selectedLocation !== 'Todas') params.append('location', selectedLocation);
    if (areaValue > 50) params.append('minArea', String(areaValue));
    if (selectedRooms) params.append('bedrooms', selectedRooms.replace('+', ''));
    if (selectedBathrooms) params.append('bathrooms', selectedBathrooms.replace('+', ''));
    if (hasPool) params.append('hasPool', 'true');
    if (hasFurniture) params.append('isFurnished', 'true');
    if (selectedStatus) params.append('status', selectedStatus);

    router.push(`/catalogo?${params.toString()}`);
  };

  const inputCls = "w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.7)] px-[0.8rem] py-[0.6rem] font-oswald font-[200] text-[0.72rem] tracking-[0.05em] outline-none transition-[border-color] duration-[250ms] focus:border-[rgba(196,160,80,0.4)] placeholder:text-[rgba(255,255,255,0.2)]";

  const labelCls = "font-oswald font-[200] text-[0.58rem] tracking-[0.3em] text-[rgba(255,255,255,0.4)] uppercase mb-[0.7rem] flex justify-between items-center";

  const divider = <div className="h-px bg-[rgba(196,160,80,0.08)] my-6" />;

  return (
    <aside className="bg-[#0d0d0d] border border-[rgba(196,160,80,0.12)] p-8 sticky top-[90px]">
      <div className="font-oswald font-[300] text-[0.65rem] tracking-[0.45em] text-[rgba(196,160,80,0.8)] uppercase mb-8 pb-[1.2rem] border-b border-b-[rgba(196,160,80,0.12)]">
        Filtros
      </div>


      {/* Location */}
      <div className="mb-5">
        <div className={labelCls}>Localização</div>
        <div className="relative">
          <button
            className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.7)] px-[0.8rem] py-[0.6rem] font-oswald font-[200] text-[0.72rem] tracking-[0.05em] cursor-pointer flex justify-between items-center transition-[border-color] duration-[250ms] hover:border-[rgba(196,160,80,0.4)]"
            onClick={() => setIsLocationOpen(!isLocationOpen)}
          >
            {selectedLocation}
            <ChevronDown
              size={14}
              style={{ transform: isLocationOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s ease', color: 'rgba(196,160,80,0.6)' }}
            />
          </button>
          {isLocationOpen && (
            <div className="absolute top-full left-0 right-0 bg-[#111] border border-[rgba(196,160,80,0.2)] border-t-0 z-50 max-h-[220px] overflow-y-auto">
              {locations.map((loc) => (
                <button
                  key={loc}
                  className={`w-full px-[0.8rem] py-[0.6rem] font-oswald font-[200] text-[0.7rem] tracking-[0.05em] bg-transparent border-none cursor-pointer text-left transition-all duration-200 hover:bg-[rgba(196,160,80,0.06)] hover:text-[rgba(255,255,255,0.85)] ${selectedLocation === loc ? 'text-[rgba(196,160,80,0.9)] bg-[rgba(196,160,80,0.06)]' : 'text-[rgba(255,255,255,0.55)]'}`}
                  onClick={() => { setSelectedLocation(loc); setIsLocationOpen(false); }}
                >
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {divider}

      {/* Area */}
      <div className="mb-5">
        <div className={labelCls}>
          Área mínima
          <span className="text-[rgba(196,160,80,0.8)] tracking-[0.1em]">{areaValue}m²</span>
        </div>
        <input
          type="range"
          min="50"
          max="2000"
          step="10"
          value={areaValue}
          onChange={(e) => setAreaValue(Number(e.target.value))}
          className="filter-range"
        />
        <div className="flex justify-between mt-[0.4rem]">
          <span className="font-oswald font-[200] text-[0.55rem] tracking-[0.15em] text-[rgba(255,255,255,0.2)]">50m²</span>
          <span className="font-oswald font-[200] text-[0.55rem] tracking-[0.15em] text-[rgba(255,255,255,0.2)]">2000m²</span>
        </div>
      </div>

      {divider}

      {/* Rooms */}
      <div className="mb-5">
        <div className={labelCls}>Quartos</div>
        <div className="flex gap-2">
          {['2+', '3+', '4+'].map((v) => (
            <button
              key={v}
              className={`flex-1 py-2 font-oswald font-[200] text-[0.65rem] tracking-[0.15em] cursor-pointer transition-all duration-200 text-center border ${selectedRooms === v ? 'border-[rgba(196,160,80,0.6)] bg-[rgba(196,160,80,0.1)] text-[rgba(196,160,80,0.9)]' : 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.4)] hover:border-[rgba(196,160,80,0.3)] hover:text-[rgba(255,255,255,0.6)]'}`}
              onClick={() => setSelectedRooms(selectedRooms === v ? null : v)}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div className="mb-5">
        <div className={labelCls}>Banheiros</div>
        <div className="flex gap-2">
          {['2+', '3+', '4+'].map((v) => (
            <button
              key={v}
              className={`flex-1 py-2 font-oswald font-[200] text-[0.65rem] tracking-[0.15em] cursor-pointer transition-all duration-200 text-center border ${selectedBathrooms === v ? 'border-[rgba(196,160,80,0.6)] bg-[rgba(196,160,80,0.1)] text-[rgba(196,160,80,0.9)]' : 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.4)] hover:border-[rgba(196,160,80,0.3)] hover:text-[rgba(255,255,255,0.6)]'}`}
              onClick={() => setSelectedBathrooms(selectedBathrooms === v ? null : v)}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {divider}

      {/* Pool & Furnished */}
      <div className="flex flex-col gap-[0.9rem] mb-5">
        <div className="flex items-center gap-[0.8rem] cursor-pointer group/poolcheck" onClick={() => setHasPool(!hasPool)}>
          <div className={`filter-check-box w-[18px] h-[18px] min-w-[18px] border flex items-center justify-center transition-all duration-200 cursor-pointer ${hasPool ? 'checked border-[rgba(196,160,80,0.6)] bg-[rgba(196,160,80,0.1)]' : 'border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.03)]'}`} />
          <span className="font-oswald font-[200] text-[0.68rem] tracking-[0.2em] text-[rgba(255,255,255,0.5)] uppercase cursor-pointer transition-colors duration-200 group-hover/poolcheck:text-[rgba(255,255,255,0.75)]">
            Piscina
          </span>
        </div>
        <div className="flex items-center gap-[0.8rem] cursor-pointer group/furncheck" onClick={() => setHasFurniture(!hasFurniture)}>
          <div className={`filter-check-box w-[18px] h-[18px] min-w-[18px] border flex items-center justify-center transition-all duration-200 cursor-pointer ${hasFurniture ? 'checked border-[rgba(196,160,80,0.6)] bg-[rgba(196,160,80,0.1)]' : 'border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.03)]'}`} />
          <span className="font-oswald font-[200] text-[0.68rem] tracking-[0.2em] text-[rgba(255,255,255,0.5)] uppercase cursor-pointer transition-colors duration-200 group-hover/furncheck:text-[rgba(255,255,255,0.75)]">
            Mobiliado
          </span>
        </div>
      </div>

      {divider}

      {/* Status */}
      <div className="mb-5">
        <div className={labelCls}>Status</div>
        <div className="flex flex-col gap-2">
          {['Em construção', 'Finalizado'].map((status) => (
            <button
              key={status}
              className={`w-full px-[0.8rem] py-[0.5rem] font-oswald font-[200] text-[0.65rem] tracking-[0.15em] cursor-pointer transition-all duration-200 text-center border ${selectedStatus === status ? 'border-[rgba(196,160,80,0.6)] bg-[rgba(196,160,80,0.1)] text-[rgba(196,160,80,0.9)]' : 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.4)] hover:border-[rgba(196,160,80,0.3)] hover:text-[rgba(255,255,255,0.6)]'}`}
              onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="w-full mt-8 py-[0.8rem] bg-[rgba(196,160,80,0.08)] border border-[rgba(196,160,80,0.35)] text-[rgba(196,160,80,0.85)] font-oswald font-[300] text-[0.6rem] tracking-[0.45em] uppercase cursor-pointer transition-all duration-[250ms] hover:bg-[rgba(196,160,80,0.14)] hover:border-[rgba(196,160,80,0.7)] hover:text-[rgba(196,160,80,1)]"
      >
        Aplicar filtros
      </button>
    </aside>
  );
}
