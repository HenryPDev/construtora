import Link from "next/link";
import Footer from "@/components/footer";
import CatalogNav from "@/components/catalog-nav";
import { getHouses } from "@/lib/api";
import { statusConfig, Status } from "@/lib/projects";

export const metadata = {
  title: "Projetos – Zeferino & Correa",
  description: "Conheça os projetos em andamento e planejamento da Zeferino & Correa.",
};

// Default config for invalid status
const defaultStatusConfig = {
  color: "text-[rgba(196,160,80,0.9)] border-[rgba(196,160,80,0.4)] bg-[rgba(196,160,80,0.15)]",
  dot: "bg-[rgba(196,160,80,0.9)]",
  shadow: "shadow-[0_0_12px_rgba(196,160,80,0.3)]",
};

export default async function Projetos() {
  const response = await getHouses({}, 1, 'project');
  const projects = response.data;

  return (
    <div className="bg-[#070707] min-h-screen">
      {/* Hero header */}
      <div className="max-w-[1400px] mx-auto px-10 pt-[10rem] pb-16 border-b border-b-[rgba(196,160,80,0.12)]">
        <p className="font-oswald font-[200] text-[0.6rem] tracking-[0.55em] text-[rgba(196,160,80,0.8)] uppercase mb-4">
          Portfólio
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h1 className="font-cormorant font-[300] text-[clamp(2.5rem,5vw,4.5rem)] text-white tracking-[0.06em] leading-none">
            Projetos em <em className="italic text-[rgba(255,255,255,0.65)]">destaque</em>
          </h1>
          <div className="flex items-center gap-6 shrink-0">
            {(["Em andamento", "Em planejamento", "Concluído"] as Status[]).map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${statusConfig[s].dot}`} />
                <span className="font-oswald font-[200] text-[0.58rem] tracking-[0.2em] text-[rgba(255,255,255,0.4)] uppercase">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CatalogNav />

      {/* Projects grid */}
      <div className="max-w-[1400px] mx-auto px-10 py-16 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(196,160,80,0.1)]">
          {projects.map((project, i) => {
            const config = statusConfig[project.status as keyof typeof statusConfig] || defaultStatusConfig;
            return (
            <Link
              key={project.slug}
              href={`/projetos/${project.slug}`}
              className="relative aspect-square overflow-hidden bg-[#0a0a0a] cursor-pointer group/proj block"
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] group-hover/proj:scale-[1.08]"
              />

              {/* Base overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.3)_50%,rgba(0,0,0,0.1)_100%)] transition-opacity duration-500 group-hover/proj:opacity-80" />

              {/* Status badge */}
              <div className={`absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-md font-oswald font-[300] text-[0.58rem] tracking-[0.2em] uppercase ${config.color} ${config.shadow}`}>
                <div className={`w-1 h-1 rounded-full ${config.dot}`} />
                {project.status || 'Sem status'}
              </div>

              {/* Index */}
              <span className="absolute top-4 left-4 font-oswald font-[200] text-[0.55rem] tracking-[0.3em] text-[rgba(255,255,255,0.2)] group-hover/proj:text-[rgba(196,160,80,0.6)] transition-colors duration-300">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover/proj:translate-y-0 transition-transform duration-500">
                <p className="font-oswald font-[200] text-[0.55rem] tracking-[0.35em] text-[rgba(196,160,80,0.7)] uppercase mb-2">
                  {project.location} · {project.yearDelivery || '—'}
                </p>
                <h2 className="font-cormorant font-[300] text-[1.5rem] text-white tracking-[0.05em] leading-[1.1] mb-4">
                  {project.title}
                </h2>
                <div className="flex items-center justify-between">
                  <span className="font-oswald font-[200] text-[0.6rem] tracking-[0.2em] text-[rgba(255,255,255,0.4)] uppercase">
                    {project.area ? `${project.area}m²` : '—'}
                  </span>
                  {/* Ver detalhes button */}
                  <span className="flex items-center gap-2 font-oswald font-[300] text-[0.58rem] tracking-[0.25em] text-[rgba(196,160,80,0.9)] uppercase border border-[rgba(196,160,80,0.4)] px-3 py-1.5 opacity-0 group-hover/proj:opacity-100 transition-all duration-400 bg-[rgba(196,160,80,0.08)] backdrop-blur-sm">
                    Ver detalhes
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5H9M9 5L5.5 1.5M9 5L5.5 8.5" stroke="rgba(196,160,80,0.9)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>

              {/* Gold bottom line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,rgba(196,160,80,0.6),transparent)] scale-x-0 group-hover/proj:scale-x-100 transition-transform duration-500" />
            </Link>
            );
          })}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="max-w-[1400px] mx-auto px-10 pb-24 flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="h-px w-16 bg-[linear-gradient(90deg,transparent,rgba(196,160,80,0.4))]" />
          <div className="w-1 h-1 bg-[rgba(196,160,80,0.5)] [transform:rotate(45deg)]" />
          <div className="h-px w-16 bg-[linear-gradient(90deg,rgba(196,160,80,0.4),transparent)]" />
        </div>
        <p className="font-oswald font-[200] text-[0.65rem] tracking-[0.35em] text-[rgba(255,255,255,0.3)] uppercase text-center">
          Quer fazer parte do nosso portfólio?
        </p>
        <Link
          href="/contatos"
          className="font-oswald font-[300] text-[0.65rem] tracking-[0.4em] uppercase text-[rgba(196,160,80,0.9)] border border-[rgba(196,160,80,0.4)] px-12 py-4 no-underline transition-all duration-300 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[rgba(196,160,80,0.08)] before:[transform:scaleX(0)] before:[transform-origin:left] before:transition-transform before:duration-300 hover:border-[rgba(196,160,80,0.85)] hover:text-[rgba(196,160,80,1)] hover:before:[transform:scaleX(1)]"
        >
          Entre em contato
        </Link>
      </div>

      <Footer />
    </div>
  );
}
