import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, statusConfig } from "@/lib/projects";
import { Bed, Bath, Waves, Ruler, MapPin, ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} – Zeferino & Correa`,
    description: project.description,
  };
}

export default async function ProjetoDetalhe({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const cfg = statusConfig[project.status];
  const [hero, ...rest] = project.images;

  return (
    <div className="bg-[#070707] min-h-screen">
      {/* Full-screen hero image */}
      <div className="relative w-full h-screen overflow-hidden">
        <img
          src={hero}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,7,7,1)_0%,rgba(7,7,7,0.4)_50%,rgba(7,7,7,0.2)_100%)]" />

        {/* Back button */}
        <Link
          href="/projetos"
          className="absolute top-28 left-10 flex items-center gap-3 font-oswald font-[200] text-[0.6rem] tracking-[0.35em] text-[rgba(255,255,255,0.6)] uppercase transition-colors duration-300 hover:text-[rgba(196,160,80,0.9)] no-underline"
        >
          <ArrowLeft size={14} />
          Todos os projetos
        </Link>

        {/* Status badge */}
        <div className={`absolute top-28 right-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-md font-oswald font-[300] text-[0.58rem] tracking-[0.2em] uppercase ${cfg.color} ${cfg.shadow}`}>
          <div className={`w-1 h-1 rounded-full ${cfg.dot}`} />
          {project.status}
        </div>

        {/* Bottom text over hero */}
        <div className="absolute bottom-0 left-0 right-0 max-w-[1200px] mx-auto px-10 pb-16">
          <p className="font-oswald font-[200] text-[0.6rem] tracking-[0.5em] text-[rgba(196,160,80,0.8)] uppercase mb-4">
            {project.location} · {project.year}
          </p>
          <h1 className="font-cormorant font-[300] text-[clamp(3rem,6vw,6rem)] text-white tracking-[0.06em] leading-[0.95]">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Info + specs */}
      <div className="max-w-[1200px] mx-auto px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-16 items-start">
          {/* Description */}
          <div>
            <p className="font-oswald font-[200] text-[0.6rem] tracking-[0.55em] text-[rgba(196,160,80,0.8)] uppercase mb-5">
              Sobre o projeto
            </p>
            <p className="font-oswald font-[200] text-[0.85rem] leading-[2] tracking-[0.04em] text-[rgba(255,255,255,0.55)]">
              {project.description}
            </p>
          </div>

          {/* Specs panel */}
          <div className="bg-[#0d0d0d] border border-[rgba(196,160,80,0.12)] p-6 flex flex-col gap-5">
            <p className="font-oswald font-[300] text-[0.6rem] tracking-[0.45em] text-[rgba(196,160,80,0.8)] uppercase pb-4 border-b border-b-[rgba(196,160,80,0.12)]">
              Especificações
            </p>

            {[
              { icon: <Ruler size={15} />, label: "Área", value: project.area },
              { icon: <MapPin size={15} />, label: "Localização", value: project.location },
              ...(project.bedrooms !== undefined ? [{ icon: <Bed size={15} />, label: "Quartos", value: String(project.bedrooms) }] : []),
              ...(project.bathrooms !== undefined ? [{ icon: <Bath size={15} />, label: "Banheiros", value: String(project.bathrooms) }] : []),
              ...(project.hasPool !== undefined ? [{ icon: <Waves size={15} />, label: "Piscina", value: project.hasPool ? "Sim" : "Não" }] : []),
              { icon: null, label: "Estilo", value: project.style ?? "—" },
              { icon: null, label: "Ano", value: project.year },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[rgba(196,160,80,0.6)]">
                  {icon}
                  <span className="font-oswald font-[200] text-[0.6rem] tracking-[0.25em] text-[rgba(255,255,255,0.35)] uppercase">
                    {label}
                  </span>
                </div>
                <span className="font-oswald font-[300] text-[0.72rem] tracking-[0.1em] text-[rgba(255,255,255,0.75)]">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Photo gallery */}
      {rest.length > 0 && (
        <div className="max-w-[1200px] mx-auto px-10 pb-20">
          <p className="font-oswald font-[200] text-[0.6rem] tracking-[0.55em] text-[rgba(196,160,80,0.8)] uppercase mb-8">
            Galeria de fotos
          </p>

          {/* First photo wide */}
          <div className="relative overflow-hidden aspect-[16/7] mb-3 group/g0">
            <img
              src={rest[0]}
              alt={`${project.title} – foto 1`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/g0:scale-[1.04]"
            />
          </div>

          {/* Remaining in a 3-col grid */}
          {rest.slice(1).length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {rest.slice(1).map((img, idx) => (
                <div key={idx} className="relative overflow-hidden aspect-square group/g">
                  <img
                    src={img}
                    alt={`${project.title} – foto ${idx + 2}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/g:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)] opacity-0 group-hover/g:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bottom nav */}
      <div className="border-t border-t-[rgba(196,160,80,0.12)]">
        <div className="max-w-[1200px] mx-auto px-10 py-10 flex justify-between items-center flex-wrap gap-4">
          <Link
            href="/projetos"
            className="flex items-center gap-3 font-oswald font-[200] text-[0.6rem] tracking-[0.35em] text-[rgba(255,255,255,0.4)] uppercase no-underline hover:text-[rgba(196,160,80,0.8)] transition-colors duration-300"
          >
            <ArrowLeft size={13} />
            Voltar aos projetos
          </Link>
          <Link
            href="/contatos"
            className="font-oswald font-[300] text-[0.6rem] tracking-[0.35em] uppercase text-[rgba(196,160,80,0.9)] border border-[rgba(196,160,80,0.4)] px-8 py-3 no-underline transition-all duration-300 hover:bg-[rgba(196,160,80,0.1)] hover:border-[rgba(196,160,80,0.8)]"
          >
            Fale conosco
          </Link>
        </div>
      </div>
    </div>
  );
}
