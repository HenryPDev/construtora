'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const ADMIN_USER = 'admin';
  const ADMIN_PASSWORD = 'admin123';

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const user = formData.get('user') as string;
    const password = formData.get('password') as string;

    if (user === ADMIN_USER && password === ADMIN_PASSWORD) {
      // Store simple token
      try {
        const token = btoa(`${user}:${password}`);
        localStorage.setItem('admin_token', token);
        router.push('/admin/dashboard');
      } catch (err) {
        setError('Erro ao fazer login. Tente novamente.');
        setIsLoading(false);
      }
    } else {
      setError('Usuário ou senha incorretos');
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#070707] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0d0d0d] border border-[rgba(196,160,80,0.2)] p-8 rounded">
        <h1 className="font-cormorant text-4xl text-[rgba(196,160,80,0.9)] mb-2 text-center">Zeferino & Correa</h1>
        <h2 className="font-oswald text-[0.75rem] tracking-[0.2em] text-[rgba(196,160,80,0.6)] uppercase text-center mb-8">
          Painel de Administração
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="user" className="block font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(196,160,80,0.8)] uppercase mb-2">
              Usuário
            </label>
            <input
              type="text"
              id="user"
              name="user"
              required
              autoFocus
              className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(196,160,80,0.2)] px-4 py-3 font-oswald font-[200] text-[0.85rem] tracking-[0.04em] text-white placeholder-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[rgba(196,160,80,0.6)] transition-colors"
              placeholder="admin"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(196,160,80,0.8)] uppercase mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(196,160,80,0.2)] px-4 py-3 font-oswald font-[200] text-[0.85rem] tracking-[0.04em] text-white placeholder-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[rgba(196,160,80,0.6)] transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-4 font-oswald font-[200] text-[0.85rem] tracking-[0.04em] bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.5)] text-[rgba(239,68,68,0.9)] rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full font-oswald font-[300] text-[0.6rem] tracking-[0.35em] uppercase text-[rgba(196,160,80,0.9)] border border-[rgba(196,160,80,0.4)] px-8 py-3 transition-all duration-300 hover:bg-[rgba(196,160,80,0.1)] hover:border-[rgba(196,160,80,0.8)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Autenticando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-center font-oswald text-[0.7rem] text-[rgba(255,255,255,0.4)] mt-8 tracking-wider">
          Credenciais: admin / admin123
        </p>
      </div>
    </div>
  );
}
