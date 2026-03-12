import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#040404] border-t border-t-[rgba(196,160,80,0.12)] pt-16 pb-10 z-50">
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="flex justify-between items-start pb-12 border-b border-b-[rgba(255,255,255,0.06)] gap-12 flex-wrap">
          <div>
            <div className="font-cormorant font-[300] text-[1.6rem] tracking-[0.15em] text-white mb-[0.6rem]">
              ZEFERINO <em className="italic text-[rgba(255,255,255,0.65)]">&amp; CORREA</em>
            </div>
            <div className="font-oswald font-[200] text-[0.55rem] tracking-[0.4em] text-[rgba(196,160,80,0.6)] uppercase">
              Construtora · Desde 1994
            </div>
          </div>

          <div>
            <div className="font-oswald font-[300] text-[0.6rem] tracking-[0.35em] text-[rgba(255,255,255,0.4)] uppercase mb-[1.2rem]">Navegação</div>
            <div className="flex flex-col gap-[0.8rem]">
              {[{ href: "/", label: "Início" }, { href: "/catalogo", label: "Catálogo" }, { href: "/contatos", label: "Contatos" }].map((l) => (
                <Link key={l.href} href={l.href} className="font-oswald font-[200] text-[0.7rem] tracking-[0.2em] text-[rgba(255,255,255,0.4)] no-underline uppercase transition-colors duration-[250ms] hover:text-[rgba(196,160,80,0.8)]">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="font-oswald font-[300] text-[0.6rem] tracking-[0.35em] text-[rgba(255,255,255,0.4)] uppercase mb-[1.2rem]">Contato</div>
            <div className="flex flex-col gap-[0.8rem]">
              <span className="font-oswald font-[200] text-[0.7rem] tracking-[0.2em] text-[rgba(255,255,255,0.4)] uppercase">(47) 99999-0000</span>
              <span className="font-oswald font-[200] text-[0.7rem] tracking-[0.2em] text-[rgba(255,255,255,0.4)] uppercase">contato@zeferinocorrea.com.br</span>
            </div>
          </div>
        </div>

        <div className="pt-8 flex justify-between items-center flex-wrap gap-4">
          <span className="font-oswald font-[200] text-[0.55rem] tracking-[0.2em] text-[rgba(255,255,255,0.2)] uppercase">
            © 2024 Zeferino &amp; Correa. Todos os direitos reservados.
          </span>
          <div className="h-px w-[60px] bg-[linear-gradient(90deg,rgba(196,160,80,0.4),transparent)]" />
        </div>
      </div>
    </footer>
  );
}
