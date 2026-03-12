'use client';
import { useState } from 'react';

type FormState = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to submit form');
      }

      setFormState('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setFormState('idle'), 5000);
    } catch (err) {
      setFormState('error');
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const inputCls = "w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] text-white px-4 py-3 font-oswald font-[200] text-[0.8rem] tracking-[0.05em] outline-none transition-[border-color] duration-250 focus:border-[rgba(196,160,80,0.4)] placeholder:text-[rgba(255,255,255,0.2)]";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(255,255,255,0.4)] uppercase mb-2">
          Nome
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={inputCls}
          placeholder="Seu nome"
        />
      </div>

      <div>
        <label className="block font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(255,255,255,0.4)] uppercase mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={inputCls}
          placeholder="seu@email.com"
        />
      </div>

      <div>
        <label className="block font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(255,255,255,0.4)] uppercase mb-2">
          Telefone (opcional)
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={inputCls}
          placeholder="(11) 99999-9999"
        />
      </div>

      <div>
        <label className="block font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(255,255,255,0.4)] uppercase mb-2">
          Assunto (opcional)
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={inputCls}
          placeholder="Assunto da mensagem"
        />
      </div>

      <div>
        <label className="block font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(255,255,255,0.4)] uppercase mb-2">
          Mensagem
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className={`${inputCls} resize-none`}
          placeholder="Sua mensagem..."
        />
      </div>

      <button
        type="submit"
        disabled={formState === 'sending'}
        className="w-full mt-6 py-3 bg-[rgba(196,160,80,0.08)] border border-[rgba(196,160,80,0.35)] text-[rgba(196,160,80,0.85)] font-oswald font-[300] text-[0.6rem] tracking-[0.45em] uppercase cursor-pointer transition-all duration-250 hover:bg-[rgba(196,160,80,0.14)] hover:border-[rgba(196,160,80,0.7)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {formState === 'sending' ? 'Enviando...' : 'Enviar mensagem'}
      </button>

      {formState === 'success' && (
        <div className="p-4 bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.5)] text-[rgba(60,220,100,1)] font-oswald font-[200] text-[0.8rem] tracking-[0.05em]">
          Mensagem enviada com sucesso!
        </div>
      )}

      {formState === 'error' && (
        <div className="p-4 bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.5)] text-[rgba(252,165,165,1)] font-oswald font-[200] text-[0.8rem] tracking-[0.05em]">
          Erro ao enviar: {error}
        </div>
      )}
    </form>
  );
}
