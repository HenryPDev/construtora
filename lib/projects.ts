export type Status = "Em andamento" | "Em planejamento" | "Concluído";

export interface Project {
  slug: string;
  image: string;
  images: string[];
  title: string;
  location: string;
  status: Status;
  area: string;
  year: string;
  description: string;
  bedrooms?: number;
  bathrooms?: number;
  hasPool?: boolean;
  style?: string;
}

export const projects: Project[] = [
  {
    slug: "residencia-porto-madeiro",
    image: "/images/casa2.jpg",
    images: ["/images/casa2.jpg", "/images/casa3.jpg", "/images/casa4.jpg", "/images/casa5.jpg"],
    title: "Residência Porto Madeiro",
    location: "Porto Madeiro",
    status: "Em andamento",
    area: "480m²",
    year: "2024",
    description: "Projeto contemporâneo com vista privilegiada para o lago, acabamentos importados e amplos espaços de convívio social. Arquitetura integrada à paisagem natural do condomínio, com uso de materiais sustentáveis e iluminação natural abundante.",
    bedrooms: 4,
    bathrooms: 3,
    hasPool: true,
    style: "Contemporâneo",
  },
  {
    slug: "villa-ecoville-i",
    image: "/images/casa3.jpg",
    images: ["/images/casa3.jpg", "/images/casa4.jpg", "/images/casa5.jpg", "/images/casa6.jpg"],
    title: "Villa Ecoville I",
    location: "Ecoville",
    status: "Em planejamento",
    area: "320m²",
    year: "2025",
    description: "Casa moderna com jardim amplo, garagem coberta para dois veículos e área gourmet integrada. Projeto desenvolvido para maximizar o aproveitamento do lote com amplas varandas e jardim de inverno.",
    bedrooms: 3,
    bathrooms: 2,
    hasPool: true,
    style: "Moderno",
  },
  {
    slug: "mansao-riviera",
    image: "/images/casa4.jpg",
    images: ["/images/casa4.jpg", "/images/casa5.jpg", "/images/casa6.jpg", "/images/casa2.jpg"],
    title: "Mansão Riviera",
    location: "Riviera",
    status: "Concluído",
    area: "650m²",
    year: "2023",
    description: "Arquitetura clássica em condomínio fechado, com materiais nobres e excelente localização. Ampla área de lazer com piscina aquecida, churrasqueira e espaço gourmet de alto padrão.",
    bedrooms: 5,
    bathrooms: 5,
    hasPool: true,
    style: "Clássico",
  },
  {
    slug: "residencia-bourbon",
    image: "/images/casa5.jpg",
    images: ["/images/casa5.jpg", "/images/casa6.jpg", "/images/casa2.jpg", "/images/casa3.jpg"],
    title: "Residência Bourbon",
    location: "Bourbon",
    status: "Em andamento",
    area: "290m²",
    year: "2024",
    description: "Residência de alto padrão com design minimalista, voltada para famílias que valorizam funcionalidade e elegância. Destaque para o living integrado com cozinha gourmet e varanda.",
    bedrooms: 3,
    bathrooms: 3,
    hasPool: false,
    style: "Minimalista",
  },
  {
    slug: "compacto-ecoville-ii",
    image: "/images/casa6.jpg",
    images: ["/images/casa6.jpg", "/images/casa2.jpg", "/images/casa3.jpg", "/images/casa4.jpg"],
    title: "Compacto Ecoville II",
    location: "Ecoville",
    status: "Em planejamento",
    area: "180m²",
    year: "2025",
    description: "Projeto inteligente e funcional para casais ou pequenas famílias. Layout otimizado com aproveitamento máximo dos espaços, sem abrir mão do conforto e do estilo contemporâneo.",
    bedrooms: 2,
    bathrooms: 2,
    hasPool: false,
    style: "Compacto",
  },
  {
    slug: "casa-porto-unico",
    image: "/images/casa2.jpg",
    images: ["/images/casa2.jpg", "/images/casa4.jpg", "/images/casa6.jpg", "/images/casa3.jpg"],
    title: "Casa Porto Único",
    location: "Porto Unique",
    status: "Concluído",
    area: "410m²",
    year: "2023",
    description: "Projeto exclusivo em condomínio de alto padrão, com fachada em pedra natural e vidro temperado. Interior amplo com pé-direito duplo na sala e escadaria em madeira de lei.",
    bedrooms: 4,
    bathrooms: 4,
    hasPool: true,
    style: "Alto Padrão",
  },
  {
    slug: "residencia-hectares",
    image: "/images/casa3.jpg",
    images: ["/images/casa3.jpg", "/images/casa5.jpg", "/images/casa2.jpg", "/images/casa6.jpg"],
    title: "Residência Hectares",
    location: "Hectares",
    status: "Em andamento",
    area: "520m²",
    year: "2024",
    description: "Residência rural de alto padrão integrada à natureza, com amplas áreas abertas, deck sobre espelho d'água e jardins paisagísticos. Construção com técnicas sustentáveis e reaproveitamento de água.",
    bedrooms: 4,
    bathrooms: 4,
    hasPool: true,
    style: "Rural Contemporâneo",
  },
  {
    slug: "mansao-porto-fino",
    image: "/images/casa4.jpg",
    images: ["/images/casa4.jpg", "/images/casa2.jpg", "/images/casa5.jpg", "/images/casa3.jpg"],
    title: "Mansão Porto Fino",
    location: "Porto Fino",
    status: "Em planejamento",
    area: "700m²",
    year: "2025",
    description: "O maior projeto da construtora nesta temporada. Mansão com 700m² de área construída, adega climatizada, home theater, academia e área de spa completa. Entrega prevista para 2025.",
    bedrooms: 6,
    bathrooms: 6,
    hasPool: true,
    style: "Luxo",
  },
  {
    slug: "villa-porto-seguro",
    image: "/images/casa5.jpg",
    images: ["/images/casa5.jpg", "/images/casa3.jpg", "/images/casa6.jpg", "/images/casa2.jpg"],
    title: "Villa Porto Seguro",
    location: "Porto Seguro",
    status: "Concluído",
    area: "380m²",
    year: "2022",
    description: "Villa com arquitetura mediterrânea, telhado de duas águas com telha colonial e paredes em alvenaria revestida. Piscina com raia de 15m, churrasqueira coberta e área de jogos.",
    bedrooms: 4,
    bathrooms: 3,
    hasPool: true,
    style: "Mediterrâneo",
  },
];

export const statusConfig: Record<Status, { color: string; dot: string; shadow: string }> = {
  "Em andamento": {
    color: "text-[rgba(255,180,0,1)] border-[rgba(255,180,0,0.7)] bg-[rgba(255,140,0,0.25)]",
    dot: "bg-[rgba(255,180,0,1)]",
    shadow: "shadow-[0_0_12px_rgba(255,165,0,0.4)]",
  },
  "Em planejamento": {
    color: "text-[rgba(120,180,255,1)] border-[rgba(100,160,255,0.7)] bg-[rgba(80,140,255,0.25)]",
    dot: "bg-[rgba(120,180,255,1)]",
    shadow: "shadow-[0_0_12px_rgba(100,160,255,0.4)]",
  },
  "Concluído": {
    color: "text-[rgba(60,220,100,1)] border-[rgba(34,197,94,0.7)] bg-[rgba(34,197,94,0.25)]",
    dot: "bg-[rgba(60,220,100,1)]",
    shadow: "shadow-[0_0_12px_rgba(34,197,94,0.4)]",
  },
};
