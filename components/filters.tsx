'use client';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Filters() {
  const [areaValue, setAreaValue] = useState(50);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>('Todas');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState<string | null>(null);
  const [selectedBathrooms, setSelectedBathrooms] = useState<string | null>(null);
  const [hasPool, setHasPool] = useState(false);
  const [hasFurniture, setHasFurniture] = useState(false);

  const locations = ['Todas', 'Riviera', 'Ecoville 1', 'Ecoville 2', 'Porto Madeiro', 'Porto Seguro', 'Porto Unique', 'Porto Fino', 'Bourbon', 'Hectares'];

  const formatPrice = (value: number | null) => {
    if (value === null || value === undefined) return '';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setIsLocationOpen(false);
  };

  return (
    <aside className="lg:w-1/4 bg-gray-100 p-4 rounded-lg sticky top-4 h-fit">
      <h2 className="text-lg poppins-semibold mb-4">Filtros</h2>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm poppins-medium">Preço Mínimo</label>
          {minPrice !== null && <span className="text-sm poppins-semibold text-yellow-600">{formatPrice(minPrice)}</span>}
        </div>
        <input 
          type="number" 
          value={minPrice || ''}
          onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : null)}
          className="w-full p-2 bg-white rounded-lg border border-slate-300" 
          placeholder="R$ 0" 
        />
      </div>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm poppins-medium">Preço Máximo</label>
          {maxPrice !== null && <span className="text-sm poppins-semibold text-yellow-600">{formatPrice(maxPrice)}</span>}
        </div>
        <input 
          type="number" 
          value={maxPrice || ''}
          onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : null)}
          className="w-full p-2 bg-white rounded-lg border border-slate-300" 
          placeholder="R$ 1.000.000" 
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm poppins-medium mb-2">Localização</label>
        <div className="relative">
          <button
            onClick={() => setIsLocationOpen(!isLocationOpen)}
            className="w-full p-2 bg-white rounded-lg border border-slate-300 text-left flex justify-between items-center poppins-medium hover:border-yellow-500 transition"
          >
            {selectedLocation}
            <span className={`transform transition-transform ${isLocationOpen ? 'rotate-180' : ''}`}>
                <ChevronDown size={16} />
            </span>
          </button>
          <div
            className={`absolute top-full left-0 right-0 mt-1 bg-white rounded-lg border border-slate-300 shadow-lg overflow-hidden transition-all duration-300 ease-out origin-top z-50 ${
              isLocationOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95 pointer-events-none'
            }`}
            style={{
              transformOrigin: 'top',
              transform: isLocationOpen ? 'scaleY(1)' : 'scaleY(0)',
            }}
          >
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => handleLocationSelect(location)}
                className={`w-full px-4 py-2 text-left poppins-medium transition-colors ${
                  selectedLocation === location
                    ? 'bg-yellow-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm poppins-medium">Área (m²)</label>
          <span className="text-sm poppins-semibold text-yellow-600">{areaValue}m²</span>
        </div>
        <input 
          type="range" 
          min="50" 
          max="2000" 
          step="10" 
          value={areaValue}
          onChange={(e) => setAreaValue(Number(e.target.value))}
          className="w-full" 
        />
        <div className="text-xs text-gray-600 flex justify-between">
          <span>50m²</span>
          <span>2000m²</span>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm poppins-medium mb-2">Quartos</label>
        <div className="flex gap-2">
          <button 
            onClick={() => setSelectedRooms(selectedRooms === '2+' ? null : '2+')}
            className={`flex-1 py-2 px-2 rounded-lg text-sm poppins-medium transition ${
              selectedRooms === '2+' 
                ? 'bg-yellow-600 text-white' 
                : 'bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            2+
          </button>
          <button 
            onClick={() => setSelectedRooms(selectedRooms === '3+' ? null : '3+')}
            className={`flex-1 py-2 px-2 rounded-lg text-sm poppins-medium transition ${
              selectedRooms === '3+' 
                ? 'bg-yellow-600 text-white' 
                : 'bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            3+
          </button>
          <button 
            onClick={() => setSelectedRooms(selectedRooms === '4+' ? null : '4+')}
            className={`flex-1 py-2 px-2 rounded-lg text-sm poppins-medium transition ${
              selectedRooms === '4+' 
                ? 'bg-yellow-600 text-white' 
                : 'bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            4+
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm poppins-medium mb-2">Banheiros</label>
        <div className="flex gap-2">
          <button 
            onClick={() => setSelectedBathrooms(selectedBathrooms === '2+' ? null : '2+')}
            className={`flex-1 py-2 px-2 rounded-lg text-sm poppins-medium transition ${
              selectedBathrooms === '2+' 
                ? 'bg-yellow-600 text-white' 
                : 'bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            2+
          </button>
          <button 
            onClick={() => setSelectedBathrooms(selectedBathrooms === '3+' ? null : '3+')}
            className={`flex-1 py-2 px-2 rounded-lg text-sm poppins-medium transition ${
              selectedBathrooms === '3+' 
                ? 'bg-yellow-600 text-white' 
                : 'bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            3+
          </button>
          <button 
            onClick={() => setSelectedBathrooms(selectedBathrooms === '4+' ? null : '4+')}
            className={`flex-1 py-2 px-2 rounded-lg text-sm poppins-medium transition ${
              selectedBathrooms === '4+' 
                ? 'bg-yellow-600 text-white' 
                : 'bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            4+
          </button>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="pool"
            checked={hasPool}
            onChange={(e) => setHasPool(e.target.checked)}
            className="cursor-pointer"
          />
          <label htmlFor="pool" className="text-sm poppins-medium cursor-pointer">Piscina</label>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="furniture"
            checked={hasFurniture}
            onChange={(e) => setHasFurniture(e.target.checked)}
            className="cursor-pointer"
          />
          <label htmlFor="furniture" className="text-sm poppins-medium cursor-pointer">Mobíliado</label>
        </div>
      </div>
      <button className="w-full bg-yellow-600 text-white p-2 rounded-lg poppins-medium hover:scale-105 transition">Aplicar Filtros</button>
    </aside>
  );
}
