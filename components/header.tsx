'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Início', href: '/' },
  { label: 'Catálogo', href: '/catalogo' },
  { label: 'Contatos', href: '/contatos' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isSolid = scrolled || pathname !== '/';

  const linkBase =
    "font-oswald font-[300] text-[0.65rem] tracking-[0.35em] uppercase relative pb-1 transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px after:bg-[rgba(196,160,80,0.8)] after:transition-[width] after:duration-300";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-[background,backdrop-filter,box-shadow] duration-[400ms] ease-linear ${
        isSolid
          ? 'bg-[rgba(7,7,7,0.96)] backdrop-blur-[12px] shadow-[0_1px_0_rgba(196,160,80,0.15)]'
          : 'bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55)_0%,transparent_100%)]'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-10 h-[72px] flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none no-underline">
          <span className="font-oswald font-[200] text-[0.45rem] tracking-[0.5em] text-[rgba(196,160,80,0.85)] uppercase mb-[2px]">
            Construtora
          </span>
          <span className="font-cormorant font-[300] text-[1.35rem] tracking-[0.18em] text-white">
            ZEFERINO <em className="italic text-[rgba(255,255,255,0.75)]">&amp; CORREA</em>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-[2.8rem]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${linkBase} ${
                  isActive
                    ? 'text-[rgba(196,160,80,0.95)] after:w-full'
                    : 'text-[rgba(255,255,255,0.6)] after:w-0 hover:text-[rgba(255,255,255,0.95)] hover:after:w-full'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/projetos"
            className="font-oswald font-[300] text-[0.6rem] tracking-[0.3em] uppercase text-[rgba(196,160,80,0.9)] border border-[rgba(196,160,80,0.4)] px-[1.2rem] py-2 no-underline transition-all duration-300 hover:bg-[rgba(196,160,80,0.1)] hover:border-[rgba(196,160,80,0.8)] hover:text-[rgba(196,160,80,1)]"
          >
            Ver Projetos
          </Link>
        </nav>

        <button
          className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className="block w-[22px] h-px bg-[rgba(255,255,255,0.7)] transition-all duration-300" />
          <span className="block w-[22px] h-px bg-[rgba(255,255,255,0.7)] transition-all duration-300" />
          <span className="block w-[22px] h-px bg-[rgba(255,255,255,0.7)] transition-all duration-300" />
        </button>
      </div>

      {menuOpen && (
        <div className="flex flex-col bg-[rgba(7,7,7,0.98)] border-t border-t-[rgba(196,160,80,0.15)] px-10 pt-6 pb-8 gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${linkBase} ${
                  isActive
                    ? 'text-[rgba(196,160,80,0.95)] after:w-full'
                    : 'text-[rgba(255,255,255,0.6)] after:w-0 hover:text-[rgba(255,255,255,0.95)] hover:after:w-full'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
