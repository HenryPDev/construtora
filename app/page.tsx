"use client";

import Link from "next/link";

const panels = [
  { image: "/images/casa2.jpg", label: "FUNDAÇÕES", num: "01" },
  { image: "/images/casa3.jpg", label: "ESTRUTURA", num: "02" },
  { image: "/images/casa4.jpg", label: "PROJETO", num: "03" },
  { image: "/images/casa5.jpg", label: "CONSTRUÇÃO", num: "04" },
  { image: "/images/casa6.jpg", label: "ENTREGA", num: "05" },
];

const services = [
  { num: "01", title: "Fundações", desc: "Base sólida para estruturas duradouras. Análise de solo e execução com tecnologia de ponta." },
  { num: "02", title: "Estrutura", desc: "Sistemas estruturais em concreto e aço projetados para máxima segurança e longevidade." },
  { num: "03", title: "Projeto", desc: "Arquitetura e engenharia integradas, do conceito ao detalhamento executivo." },
  { num: "04", title: "Construção", desc: "Execução rigorosa com equipes especializadas e controle de qualidade em cada etapa." },
  { num: "05", title: "Entrega", desc: "Finalização impecável, inspeção completa e acompanhamento pós-obra incluso." },
];

const stats = [
  { value: "30", label: "Anos de experiência" },
  { value: "340+", label: "Obras entregues" },
  { value: "98%", label: "Clientes satisfeitos" },
  { value: "12", label: "Regiões atendidas" },
];

const featuredProjects = [
  { image: "/images/casa2.jpg", title: "Residência Porto Madeiro", type: "Alto Padrão", area: "480m²" },
  { image: "/images/casa3.jpg", title: "Villa Ecoville", type: "Contemporâneo", area: "320m²" },
  { image: "/images/casa4.jpg", title: "Mansão Riviera", type: "Clássico", area: "650m²" },
];

function Divider({ rev }: { rev?: boolean }) {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className={`h-px w-10 ${rev ? "bg-[linear-gradient(90deg,rgba(196,160,80,0.5),transparent)]" : "bg-[linear-gradient(90deg,transparent,rgba(196,160,80,0.5))]"}`} />
      <div className="w-1 h-1 bg-[rgba(196,160,80,0.6)] [transform:rotate(45deg)]" />
      <div className={`h-px w-10 ${rev ? "bg-[linear-gradient(90deg,transparent,rgba(196,160,80,0.5))]" : "bg-[linear-gradient(90deg,rgba(196,160,80,0.5),transparent)]"}`} />
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <main className="w-screen h-screen overflow-hidden bg-[#070707] relative">
        {/* Panels */}
        <div className="flex w-[calc(100%+140px)] -ml-[70px] h-full max-md:h-[400px] max-md:overflow-x-auto max-md:w-full max-md:ml-0">
          {panels.map((panel, i) => (
            <div
              key={i}
              className={`flex-1 overflow-hidden relative [transform:skewX(-7deg)] -mx-px max-md:-mx-0 max-md:min-w-[200px] md:hover:[flex:2.8] transition-[flex] duration-[650ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)] md:cursor-pointer animate-panel-reveal group/panel animate-delay-${i}`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  className="w-[calc(100%+180px)] h-full object-cover object-center -ml-[90px] [transform:skewX(7deg)] transition-transform duration-[650ms] [transition-timing-function:cubic-bezier(0.77,0,0.175,1)] select-none pointer-events-none md:group-hover/panel:[transform:skewX(7deg)_scale(1.06)]"
                  src={panel.image}
                  alt={panel.label}
                  draggable={false}
                />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.18)_40%,rgba(0,0,0,0.72)_100%)] transition-[background] duration-[650ms] ease-linear md:group-hover/panel:bg-[linear-gradient(160deg,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.05)_40%,rgba(0,0,0,0.5)_100%)]" />
              <span className="absolute top-8 left-1/2 [transform:translateX(-50%)_skewX(7deg)] font-oswald font-[200] text-[0.6rem] tracking-[0.35em] text-[rgba(255,255,255,0.2)] transition-colors duration-[400ms] ease-linear whitespace-nowrap md:group-hover/panel:text-[rgba(196,160,80,0.75)]">
                {panel.num}
              </span>
              <span className="absolute bottom-[2.8rem] left-1/2 [transform:translateX(-50%)_skewX(7deg)_rotate(-90deg)] [transform-origin:center_center] font-oswald font-[300] text-[0.65rem] tracking-[0.45em] text-[rgba(255,255,255,0.35)] uppercase whitespace-nowrap transition-all duration-[500ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] md:group-hover/panel:[transform:translateX(-50%)_skewX(7deg)_rotate(0deg)] md:group-hover/panel:text-[rgba(196,160,80,0.95)] md:group-hover/panel:tracking-[0.5em] md:group-hover/panel:bottom-[2.2rem]">
                {panel.label}
              </span>
              <span className="absolute bottom-0 left-1/2 [transform:translateX(-50%)_skewX(7deg)] w-px h-0 bg-[linear-gradient(to_top,rgba(196,160,80,0.7),transparent)] transition-[height] duration-[500ms] ease-linear md:group-hover/panel:h-8" />
            </div>
          ))}
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(0,0,0,0.72)_100%)] pointer-events-none z-[15]" />
        <div className="absolute top-0 left-0 right-0 h-[70px] bg-[linear-gradient(to_bottom,rgba(7,7,7,0.65)_0%,transparent_100%)] z-[16] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[90px] bg-[linear-gradient(to_top,rgba(7,7,7,1)_0%,transparent_100%)] z-[16] pointer-events-none" />

        {/* Center brand */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-20 pointer-events-none px-10">
            <p className="font-oswald font-[200] text-[clamp(0.5rem,0.9vw,0.68rem)] tracking-[0.7em] text-[#ffae00] uppercase mb-8 text-center">
              Desde 2020
            </p>
            <h1 className="font-cormorant font-[300] italic text-[clamp(4rem,9vw,9.5rem)] text-white tracking-[0.08em] leading-[0.9] [text-shadow:0_4px_60px_rgba(0,0,0,0.95),0_0_120px_rgba(0,0,0,0.7)] mb-6 text-center">
              Zeferino<br /><span className="font-[200] not-italic">&amp;</span><br />Correa
            </h1>
            <div className="flex items-center gap-[1.2rem] justify-center my-8">
              <div className="h-px w-[60px] bg-[linear-gradient(90deg,transparent,rgba(196,160,80,0.6))]" />
              <div className="w-[5px] h-[5px] bg-[rgba(196,160,80,0.75)] [transform:rotate(45deg)]" />
              <div className="h-px w-[60px] bg-[linear-gradient(90deg,rgba(196,160,80,0.6),transparent)]" />
            </div>
            <p className="font-oswald font-[200] text-[clamp(0.5rem,0.85vw,0.7rem)] tracking-[0.55em] text-[rgba(255,255,255,0.75)] uppercase text-center">
              Construindo o futuro com excelência
            </p>
        
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-[1.8rem] left-1/2 z-20 flex flex-col items-center gap-2 animate-fade-up-late">
          <span className="font-oswald font-[200] text-[0.55rem] tracking-[0.5em] text-[rgba(255,255,255,0.7)] uppercase">Conheça</span>
          <div className="w-px h-[28px] bg-[linear-gradient(to_bottom,rgba(196,160,80,0.9),transparent)] animate-scroll-pulse" />
        </div>
      </main>

      {/* ── SOBRE ── */}
      <section className="bg-[#070707] py-[7rem]">
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="grid grid-cols-1 min-[900px]:grid-cols-2 gap-24 items-center">
            <div>
              <p className="font-oswald font-[200] text-[0.6rem] tracking-[0.55em] text-[rgba(196,160,80,0.8)] uppercase mb-[1.2rem]">
                Quem somos
              </p>
              <h2 className="font-cormorant font-[300] text-[clamp(2.2rem,4vw,3.8rem)] text-white tracking-[0.06em] leading-[1.1]">
                Mais de duas décadas<br /><em className="italic text-[rgba(255,255,255,0.7)]">construindo histórias</em>
              </h2>
              <Divider />
              <div className="font-oswald font-[200] text-[0.8rem] leading-loose tracking-[0.05em] text-[rgba(255,255,255,0.55)] [&>p+p]:mt-6">
                <p>
                  Fundada em 2020, construindo desde 1994, a Zeferino &amp; Correa nasceu com um propósito: construir com rigor,
                  entregar com excelência. Em mais de 30 anos de atuação, tornamo-nos referência em
                  obras residenciais de alto padrão em Dourados.
                </p>
                <p>
                  Nossa equipe de engenheiros, arquitetos e mestres de obra trabalha de forma integrada
                  desde a concepção do projeto até a entrega das chaves — garantindo que cada detalhe
                  reflita o padrão que nossos clientes merecem.
                </p>
              </div>
            </div>

            <div className="relative h-[340px] min-[900px]:h-[480px]">
              <img className="absolute right-0 top-0 w-[80%] h-[85%] object-cover [filter:grayscale(20%)]" src="/images/casa5.jpg" alt="Obra de alto padrão" />
              <img className="absolute left-0 bottom-0 w-1/2 h-1/2 object-cover border-[3px] border-[#070707] [filter:grayscale(20%)]" src="/images/casa3.jpg" alt="Detalhe construtivo" />
              <div className="absolute left-1/2 top-1/2 [transform:translate(-50%,-50%)] bg-[rgba(7,7,7,0.9)] border border-[rgba(196,160,80,0.3)] px-[1.8rem] py-[1.2rem] text-center z-[5]">
                <div className="font-cormorant font-[300] text-[3rem] text-[rgba(196,160,80,0.9)] leading-none">30</div>
                <div className="font-oswald font-[200] text-[0.55rem] tracking-[0.35em] text-[rgba(255,255,255,0.5)] uppercase mt-[0.3rem]">Anos de mercado</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="bg-[rgba(196,160,80,0.06)] border-t border-t-[rgba(196,160,80,0.15)] border-b border-b-[rgba(196,160,80,0.15)] py-16">
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="grid grid-cols-2 min-[700px]:grid-cols-4">
            {stats.map((stat) => (
              <div className="text-center p-8 border-r border-r-[rgba(196,160,80,0.12)] last:border-r-0" key={stat.label}>
                <div className="font-cormorant font-[300] text-[clamp(2.8rem,4vw,4rem)] text-[rgba(196,160,80,0.9)] leading-none mb-[0.6rem]">{stat.value}</div>
                <div className="font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(196,160,80,0.9)] uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVIÇOS ── */}
      <section className="bg-[#0d0d0d] py-[7rem]">
        <div className="max-w-[1200px] mx-auto px-10">
          <p className="font-oswald font-[200] text-[0.6rem] tracking-[0.55em] text-[rgba(196,160,80,0.8)] uppercase mb-[1.2rem]">
            O que fazemos
          </p>
          <h2 className="font-cormorant font-[300] text-[clamp(2.2rem,4vw,3.8rem)] text-white tracking-[0.06em] leading-[1.1]">
            Do terreno à <em className="italic text-[rgba(255,255,255,0.7)]">entrega das chaves</em>
          </h2>
          <Divider />
          <div className="mt-14">
            <div className="grid grid-cols-1 min-[560px]:grid-cols-2 min-[900px]:grid-cols-5 border border-[rgba(196,160,80,0.12)]">
              {services.map((svc) => (
                <div
                  key={svc.num}
                  className="px-8 py-10 border-r border-[rgba(196,160,80,0.12)] last:border-r-0 relative transition-[background] duration-300 cursor-default hover:bg-[rgba(196,160,80,0.04)] before:content-[''] before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[2px] before:bg-[linear-gradient(90deg,transparent,rgba(196,160,80,0.6),transparent)] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 group/svc"
                >
                  <div className="font-cormorant font-[300] text-[3rem] text-[rgba(196,160,80,0.15)] leading-none mb-6 transition-colors duration-300 group-hover/svc:text-[rgba(196,160,80,0.4)]">{svc.num}</div>
                  <div className="font-oswald font-[300] text-[0.8rem] tracking-[0.3em] text-[rgba(255,255,255,0.85)] uppercase mb-4">{svc.title}</div>
                  <p className="font-oswald font-[200] text-[0.72rem] leading-[1.8] tracking-[0.03em] text-[rgba(255,255,255,0.4)]">{svc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJETOS EM DESTAQUE ── */}
      <section className="bg-[#070707] py-[7rem]">
        <div className="max-w-[1200px] mx-auto px-10">
          <p className="font-oswald font-[200] text-[0.6rem] tracking-[0.55em] text-[rgba(196,160,80,0.8)] uppercase mb-[1.2rem]">
            Portfólio
          </p>
          <h2 className="font-cormorant font-[300] text-[clamp(2.2rem,4vw,3.8rem)] text-white tracking-[0.06em] leading-[1.1]">
            Projetos em <em className="italic text-[rgba(255,255,255,0.7)]">destaque</em>
          </h2>
          <Divider />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 max-md:max-w-[420px] max-md:mx-auto">
            {featuredProjects.map((proj) => (
              <div className="relative overflow-hidden aspect-[3/4] cursor-pointer group/fcard" key={proj.title}>
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] group-hover/fcard:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.1)_55%,transparent_100%)] transition-[background] duration-[400ms] group-hover/fcard:bg-[linear-gradient(to_top,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.3)_55%,rgba(0,0,0,0.1)_100%)]" />
                <div className="absolute bottom-0 left-0 right-0 p-[1.8rem]">
                  <div className="font-oswald font-[200] text-[0.55rem] tracking-[0.4em] text-[rgba(196,160,80,0.85)] uppercase mb-2">{proj.type}</div>
                  <div className="font-cormorant font-[300] text-[1.4rem] text-white tracking-[0.06em] mb-[0.4rem]">{proj.title}</div>
                  <div className="font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(255,255,255,0.45)]">{proj.area}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <Link
              href="/catalogo"
              className="font-oswald font-[300] text-[0.65rem] tracking-[0.4em] uppercase text-[rgba(196,160,80,0.9)] border border-[rgba(196,160,80,0.4)] px-12 py-4 no-underline transition-all duration-300 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[rgba(196,160,80,0.08)] before:[transform:scaleX(0)] before:[transform-origin:left] before:transition-transform before:duration-300 hover:border-[rgba(196,160,80,0.85)] hover:text-[rgba(196,160,80,1)] hover:before:[transform:scaleX(1)]"
            >
              Ver catálogo completo
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#040404] border-t border-t-[rgba(196,160,80,0.12)] pt-16 pb-10">
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
    </>
  );
}
