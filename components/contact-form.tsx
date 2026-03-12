'use client';

import { FormEvent, useState } from 'react';
import { submitContact } from '@/lib/api';

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: (formData.get('phone') as string) || undefined,
      subject: (formData.get('subject') as string) || undefined,
      message: formData.get('message') as string,
    };

    try {
      await submitContact(data);
      setMessage({ type: 'success', text: 'Mensagem enviada com sucesso!' });
      e.currentTarget.reset();
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao enviar mensagem. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(196,160,80,0.8)] uppercase mb-2">
          Nome *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(196,160,80,0.2)] px-4 py-3 font-oswald font-[200] text-[0.85rem] tracking-[0.04em] text-white placeholder-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[rgba(196,160,80,0.6)] transition-colors"
          placeholder="Seu nome"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(196,160,80,0.8)] uppercase mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(196,160,80,0.2)] px-4 py-3 font-oswald font-[200] text-[0.85rem] tracking-[0.04em] text-white placeholder-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[rgba(196,160,80,0.6)] transition-colors"
            placeholder="seu@email.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(196,160,80,0.8)] uppercase mb-2">
            Telefone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(196,160,80,0.2)] px-4 py-3 font-oswald font-[200] text-[0.85rem] tracking-[0.04em] text-white placeholder-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[rgba(196,160,80,0.6)] transition-colors"
            placeholder="(00) 99999-9999"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(196,160,80,0.8)] uppercase mb-2">
          Assunto
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(196,160,80,0.2)] px-4 py-3 font-oswald font-[200] text-[0.85rem] tracking-[0.04em] text-white placeholder-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[rgba(196,160,80,0.6)] transition-colors"
          placeholder="Assunto da sua mensagem"
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(196,160,80,0.8)] uppercase mb-2">
          Mensagem *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(196,160,80,0.2)] px-4 py-3 font-oswald font-[200] text-[0.85rem] tracking-[0.04em] text-white placeholder-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[rgba(196,160,80,0.6)] transition-colors resize-none"
          placeholder="Sua mensagem..."
        />
      </div>

      {message && (
        <div className={`p-4 font-oswald font-[200] text-[0.85rem] tracking-[0.04em] ${
          message.type === 'success'
            ? 'bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.5)] text-[rgba(34,197,94,0.9)]'
            : 'bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.5)] text-[rgba(239,68,68,0.9)]'
        }`}>
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full font-oswald font-[300] text-[0.6rem] tracking-[0.35em] uppercase text-[rgba(196,160,80,0.9)] border border-[rgba(196,160,80,0.4)] px-8 py-3 transition-all duration-300 hover:bg-[rgba(196,160,80,0.1)] hover:border-[rgba(196,160,80,0.8)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
      </button>
    </form>
  );
}
