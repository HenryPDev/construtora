'use client';

import { FormEvent, useState, useEffect } from 'react';
import { House, createHouse, updateHouse, isSlugAvailable } from '@/lib/api';
import { X } from 'lucide-react';


interface HouseFormProps {
  house?: House;
  onSuccess: (house: House) => void;
  onBack?: () => void;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 100);
}

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        // Calcular novas dimensões (max 400px para compressão MUITO agressiva)
        let width = img.width;
        let height = img.height;
        const maxWidth = 400;
        const maxHeight = 400;

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Comprimir para JPEG com qualidade 0.5 (MUITO agressivo para suportar 30 imagens)
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.5);
        resolve(compressedBase64);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
    };
    reader.onerror = reject;
  });
}

export default function HouseForm({ house, onSuccess, onBack }: HouseFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<House>>(
    house || {
      slug: '',
      title: '',
      description: '',
      image: '',
      images: [],
      location: '',
      area: undefined,
      bedrooms: undefined,
      bathrooms: undefined,
      hasPool: false,
      isFurnished: false,
      showInCatalog: true,
      showInProject: true,
      status: 'Disponível',
      style: '',
      yearDelivery: new Date().getFullYear().toString(),
    }
  );

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'main' | 'additional') => {
    const files = e.target.files;
    if (!files) return;

    try {
      if (type === 'main') {
        // Para imagem principal, apenas a primeira
        const file = files[0];
        const base64 = await compressImage(file);
        setFormData((prev) => ({ ...prev, image: base64 }));
      } else {
        // Para imagens adicionais, processar todas
        const newImages: string[] = [];
        for (let i = 0; i < files.length; i++) {
          const base64 = await compressImage(files[i]);
          newImages.push(base64);
        }
        setFormData((prev) => ({
          ...prev,
          images: [...(prev.images || []), ...newImages],
        }));
        setMessage({
          type: 'success',
          text: `${files.length} imagem(ns) adicionada(s) com sucesso!`
        });
      }
      // Reset input
      e.target.value = '';
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage({ type: 'error', text: 'Erro ao fazer upload da(s) imagem(ns). Tente imagens menores.' });
    }
  };

  const handleTitleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      title: value,
      slug: !house ? generateSlug(value) : prev.slug,
    }));
  };

  const handleSlugChange = async (value: string) => {
    setFormData((prev) => ({ ...prev, slug: value }));
    setSlugError(null);

    if (value && (!house || house.slug !== value)) {
      const available = await isSlugAvailable(value);
      if (!available) {
        setSlugError('Este slug já está em uso');
      }
    }
  };

  const handleImageArrayChange = (index: number, value: string) => {
    const newImages = [...(formData.images || [])];
    newImages[index] = value;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const addImage = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), ''],
    }));
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }));
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (slugError) {
      setMessage({ type: 'error', text: 'Corrija os erros de validação' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const dataToSubmit: Omit<House, 'id' | 'createdAt' | 'updatedAt'> = {
        slug: formData.slug!,
        title: formData.title!,
        description: formData.description!,
        image: formData.image!,
        images: formData.images || [],
        location: formData.location,
        area: formData.area ? parseInt(String(formData.area)) : undefined,
        bedrooms: formData.bedrooms ? parseInt(String(formData.bedrooms)) : undefined,
        bathrooms: formData.bathrooms ? parseInt(String(formData.bathrooms)) : undefined,
        hasPool: formData.hasPool || false,
        isFurnished: formData.isFurnished || false,
        showInCatalog: formData.showInCatalog !== false,
        showInProject: formData.showInProject !== false,
        status: formData.status,
        style: formData.style,
        yearDelivery: formData.yearDelivery,
      };

      if (house) {
        await updateHouse(house.slug, dataToSubmit);
        setMessage({ type: 'success', text: 'Imóvel atualizado com sucesso!' });
      } else {
        await createHouse(dataToSubmit);
        setMessage({ type: 'success', text: 'Imóvel criado com sucesso!' });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao processar imóvel';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto p-6">
      {/* IMAGEM PRINCIPAL - TOPO */}
      <div className="space-y-4">
        <h2 className="font-oswald text-lg text-[rgba(196,160,80,0.9)] tracking-wide">Imagem Principal *</h2>
        <div className="flex gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, 'main')}
            className="flex-1 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-oswald file:bg-[rgba(196,160,80,0.2)] file:text-[rgba(196,160,80,0.9)] hover:file:bg-[rgba(196,160,80,0.3)] cursor-pointer"
          />
          {formData.image && (
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, image: '' }))}
              className="px-4 py-2 text-[0.7rem] font-oswald tracking-widest uppercase text-[rgba(239,68,68,0.9)] border border-[rgba(239,68,68,0.4)] hover:bg-[rgba(239,68,68,0.1)] transition-colors"
            >
              Limpar
            </button>
          )}
        </div>
        {formData.image && (
          <div className="p-4 bg-[rgba(255,255,255,0.05)] rounded border border-[rgba(196,160,80,0.2)]">
            <img src={formData.image} alt="Preview" className="w-full max-h-96 object-cover rounded" />
          </div>
        )}
      </div>

      {/* Informações Básicas */}
      <div className="space-y-6">
        <h2 className="font-oswald text-lg text-[rgba(196,160,80,0.9)] tracking-wide">Informações Básicas *</h2>

        <div>
          <label className="block font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(196,160,80,0.8)] uppercase mb-2">
            Título
          </label>
          <input
            type="text"
            required
            value={formData.title || ''}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(196,160,80,0.2)] px-4 py-3 font-oswald font-[200] text-[0.85rem] tracking-[0.04em] text-white placeholder-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[rgba(196,160,80,0.6)] transition-colors"
            placeholder="Título do imóvel"
          />
        </div>

        <div>
          <label className="block font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(196,160,80,0.8)] uppercase mb-2">
            Slug {slugError && <span className="text-red-500">- {slugError}</span>}
          </label>
          <input
            type="text"
            required
            value={formData.slug || ''}
            onChange={(e) => handleSlugChange(e.target.value)}
            className={`w-full bg-[rgba(255,255,255,0.03)] border px-4 py-3 font-oswald font-[200] text-[0.85rem] tracking-[0.04em] text-white placeholder-[rgba(255,255,255,0.2)] focus:outline-none transition-colors ${
              slugError ? 'border-red-500' : 'border-[rgba(196,160,80,0.2)] focus:border-[rgba(196,160,80,0.6)]'
            }`}
            placeholder="slug-do-imovel"
          />
          <p className="text-[0.7rem] text-[rgba(255,255,255,0.4)] mt-1">
            Gerado automaticamente, pode ser editado
          </p>
        </div>

        <div>
          <label className="block font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(196,160,80,0.8)] uppercase mb-2">
            Descrição
          </label>
          <textarea
            required
            rows={6}
            value={formData.description || ''}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(196,160,80,0.2)] px-4 py-3 font-oswald font-[200] text-[0.85rem] tracking-[0.04em] text-white placeholder-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[rgba(196,160,80,0.6)] transition-colors resize-none"
            placeholder="Descrição detalhada do imóvel"
          />
        </div>
      </div>

      {/* Images Array */}
      <div className="space-y-4">
        <h2 className="font-oswald text-lg text-[rgba(196,160,80,0.9)] tracking-wide">Imagens Adicionais</h2>
        <div>
          <label className="block font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(196,160,80,0.8)] uppercase mb-2">
            Adicionar Imagens (pode selecionar múltiplas com Ctrl/Cmd + Click)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleImageUpload(e, 'additional')}
            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-oswald file:bg-[rgba(196,160,80,0.2)] file:text-[rgba(196,160,80,0.9)] hover:file:bg-[rgba(196,160,80,0.3)] cursor-pointer"
          />
        </div>
        {formData.images && formData.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {formData.images.map((img, idx) => (
              <div key={idx} className="relative group">
                <img src={img} alt={`Imagem ${idx + 1}`} className="w-full h-32 object-cover rounded border border-[rgba(196,160,80,0.2)]" />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-2 right-2 p-1 bg-[rgba(239,68,68,0.8)] hover:bg-[rgba(239,68,68,1)] rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="space-y-6">
        <h2 className="font-oswald text-lg text-[rgba(196,160,80,0.9)] tracking-wide">Informações Adicionais</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(196,160,80,0.8)] uppercase mb-2">
              Localização
            </label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
              className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(196,160,80,0.2)] px-4 py-3 font-oswald font-[200] text-[0.85rem] tracking-[0.04em] text-white placeholder-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[rgba(196,160,80,0.6)] transition-colors"
              placeholder="ex: Bairro, Cidade"
            />
          </div>

          <div>
            <label className="block font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(196,160,80,0.8)] uppercase mb-2">
              Área (m²)
            </label>
            <input
              type="number"
              value={formData.area || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, area: e.target.value ? parseInt(e.target.value) : undefined }))}
              className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(196,160,80,0.2)] px-4 py-3 font-oswald font-[200] text-[0.85rem] tracking-[0.04em] text-white placeholder-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[rgba(196,160,80,0.6)] transition-colors"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(196,160,80,0.8)] uppercase mb-2">
              Quartos
            </label>
            <input
              type="number"
              value={formData.bedrooms || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, bedrooms: e.target.value ? parseInt(e.target.value) : undefined }))}
              className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(196,160,80,0.2)] px-4 py-3 font-oswald font-[200] text-[0.85rem] tracking-[0.04em] text-white placeholder-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[rgba(196,160,80,0.6)] transition-colors"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(196,160,80,0.8)] uppercase mb-2">
              Banheiros
            </label>
            <input
              type="number"
              value={formData.bathrooms || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, bathrooms: e.target.value ? parseInt(e.target.value) : undefined }))}
              className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(196,160,80,0.2)] px-4 py-3 font-oswald font-[200] text-[0.85rem] tracking-[0.04em] text-white placeholder-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[rgba(196,160,80,0.6)] transition-colors"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(196,160,80,0.8)] uppercase mb-2">
              Estilo
            </label>
            <input
              type="text"
              value={formData.style || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, style: e.target.value }))}
              className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(196,160,80,0.2)] px-4 py-3 font-oswald font-[200] text-[0.85rem] tracking-[0.04em] text-white placeholder-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[rgba(196,160,80,0.6)] transition-colors"
              placeholder="ex: Moderno, Clássico"
            />
          </div>

          <div>
            <label className="block font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(196,160,80,0.8)] uppercase mb-2">
              Ano de Entrega
            </label>
            <input
              type="text"
              value={formData.yearDelivery || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, yearDelivery: e.target.value }))}
              className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(196,160,80,0.2)] px-4 py-3 font-oswald font-[200] text-[0.85rem] tracking-[0.04em] text-white placeholder-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[rgba(196,160,80,0.6)] transition-colors"
              placeholder="2025"
            />
          </div>
        </div>

        <div>
          <label className="block font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(196,160,80,0.8)] uppercase mb-2">
            Status
          </label>
          <select
            value={formData.status || ''}
            onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
            className="w-full bg-[#070707] border border-[rgba(196,160,80,0.2)] px-4 py-3 font-oswald font-[200] text-[0.85rem] tracking-[0.04em] text-white focus:outline-none focus:border-[rgba(196,160,80,0.6)] transition-colors"
          >
            <option value="">Selecione um status</option>
            <option value="Disponível">Disponível</option>
            <option value="Em Construção">Em Construção</option>
            <option value="Vendido">Vendido</option>
            <option value="Aluguel">Aluguel</option>
          </select>
        </div>

        <div className="flex gap-6 flex-wrap">
          <label className="flex items-center gap-2 font-oswald text-sm text-[rgba(196,160,80,0.7)] cursor-pointer hover:text-[rgba(196,160,80,0.9)]">
            <input
              type="checkbox"
              checked={formData.hasPool || false}
              onChange={(e) => setFormData((prev) => ({ ...prev, hasPool: e.target.checked }))}
              className="w-4 h-4"
            />
            Piscina
          </label>
          <label className="flex items-center gap-2 font-oswald text-sm text-[rgba(196,160,80,0.7)] cursor-pointer hover:text-[rgba(196,160,80,0.9)]">
            <input
              type="checkbox"
              checked={formData.isFurnished || false}
              onChange={(e) => setFormData((prev) => ({ ...prev, isFurnished: e.target.checked }))}
              className="w-4 h-4"
            />
            Mobiliado
          </label>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 font-oswald text-sm text-[rgba(34,197,94,0.7)] cursor-pointer hover:text-[rgba(34,197,94,0.9)]">
              <input
                type="checkbox"
                checked={formData.showInCatalog !== false}
                onChange={(e) => setFormData((prev) => ({ ...prev, showInCatalog: e.target.checked }))}
                className="w-4 h-4"
              />
              Catálogo
            </label>
            <p className="text-xs text-[rgba(255,255,255,0.4)] ml-6">
              {formData.showInCatalog ? '✓ Visível no catálogo público' : '✗ Oculto do catálogo público'}
            </p>

            <label className="flex items-center gap-2 font-oswald text-sm text-[rgba(34,197,94,0.7)] cursor-pointer hover:text-[rgba(34,197,94,0.9)]">
              <input
                type="checkbox"
                checked={formData.showInProject !== false}
                onChange={(e) => setFormData((prev) => ({ ...prev, showInProject: e.target.checked }))}
                className="w-4 h-4"
              />
              Projeto
            </label>
            <p className="text-xs text-[rgba(255,255,255,0.4)] ml-6">
              {formData.showInProject ? '✓ Visível no painel de projetos' : '✗ Oculto do painel de projetos'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      {message && (
        <div
          className={`p-4 font-oswald font-[200] text-[0.85rem] tracking-[0.04em] ${
            message.type === 'success'
              ? 'bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.5)] text-[rgba(34,197,94,0.9)]'
              : 'bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.5)] text-[rgba(239,68,68,0.9)]'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Submit and Back Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading || !!slugError}
          className="flex-1 font-oswald font-[300] text-[0.6rem] tracking-[0.35em] uppercase text-[rgba(196,160,80,0.9)] border border-[rgba(196,160,80,0.4)] px-8 py-3 transition-all duration-300 hover:bg-[rgba(196,160,80,0.1)] hover:border-[rgba(196,160,80,0.8)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Salvando...' : house ? 'Atualizar Imóvel' : 'Criar Imóvel'}
        </button>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex-1 font-oswald font-[300] text-[0.6rem] tracking-[0.35em] uppercase text-[rgba(255,255,255,0.6)] border border-[rgba(255,255,255,0.2)] px-8 py-3 transition-all duration-300 hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.4)]"
          >
            Voltar
          </button>
        )}
      </div>
    </form>
  );
}
