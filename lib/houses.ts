export type HouseStatus = "Finalizado" | "Em construção";

export interface House {
  slug: string;
  image: string;
  images: string[];
  title: string;
  description: string;
  location?: string;
  area?: number;
  bedrooms?: number;
  bathrooms?: number;
  hasPool?: boolean;
  isFurnished?: boolean;
  status?: HouseStatus;
  style?: string;
  yearDelivery?: string;
}

export const houses: House[] = [
  {
    slug: "residencia-porto-madeiro",
    image: "https://via.placeholder.com/800x600?text=Residência+Porto+Madeiro",
    images: [
      "https://via.placeholder.com/1200x800?text=Porto+Madeiro+–+Fachada",
      "https://via.placeholder.com/1200x800?text=Porto+Madeiro+–+Sala",
      "https://via.placeholder.com/1200x800?text=Porto+Madeiro+–+Cozinha",
      "https://via.placeholder.com/1200x800?text=Porto+Madeiro+–+Área+Externa",
    ],
    title: "Residência Porto Madeiro",
    description: "Projeto contemporâneo com vista privilegiada para o lago, acabamentos importados e amplos espaços de convívio social. Arquitetura integrada à paisagem natural do condomínio, com uso de materiais sustentáveis e iluminação natural abundante em todos os ambientes.",
    location: "Porto Madeiro",
    area: 350,
    bedrooms: 4,
    bathrooms: 3,
    hasPool: true,
    isFurnished: true,
    status: "Finalizado",
    style: "Contemporâneo",
    yearDelivery: "2023",
  },
  {
    slug: "villa-ecoville-i",
    image: "https://via.placeholder.com/800x600?text=Villa+Ecoville",
    images: [
      "https://via.placeholder.com/1200x800?text=Ecoville+–+Fachada",
      "https://via.placeholder.com/1200x800?text=Ecoville+–+Sala",
      "https://via.placeholder.com/1200x800?text=Ecoville+–+Piscina",
      "https://via.placeholder.com/1200x800?text=Ecoville+–+Jardim",
    ],
    title: "Villa Ecoville I",
    description: "Casa moderna com jardim amplo, garagem coberta para dois veículos e área gourmet integrada. Projeto desenvolvido para maximizar o aproveitamento do lote com amplas varandas, jardim de inverno e piscina com deck de madeira.",
    location: "Ecoville 1",
    area: 250,
    bedrooms: 3,
    bathrooms: 2,
    hasPool: true,
    isFurnished: false,
    status: "Em construção",
    style: "Moderno",
    yearDelivery: "2025",
  },
  {
    slug: "casa-riviera",
    image: "https://via.placeholder.com/800x600?text=Casa+Riviera",
    images: [
      "https://via.placeholder.com/1200x800?text=Riviera+–+Fachada",
      "https://via.placeholder.com/1200x800?text=Riviera+–+Sala+de+Estar",
      "https://via.placeholder.com/1200x800?text=Riviera+–+Suite+Master",
      "https://via.placeholder.com/1200x800?text=Riviera+–+Área+Gourmet",
    ],
    title: "Casa Riviera",
    description: "Arquitetura clássica em condomínio fechado, com materiais nobres e excelente localização. Acabamentos de alto padrão com mármore importado, madeiras nobres e esquadrias em alumínio de última geração.",
    
    location: "Riviera",
    area: 200,
    bedrooms: 3,
    bathrooms: 2,
    hasPool: false,
    isFurnished: false,
    status: "Finalizado",
    style: "Clássico",
    yearDelivery: "2022",
  },
  {
    slug: "compacto-ecoville-ii",
    image: "https://via.placeholder.com/800x600?text=Compacto+Ecoville+II",
    images: [
      "https://via.placeholder.com/1200x800?text=Ecoville+II+–+Fachada",
      "https://via.placeholder.com/1200x800?text=Ecoville+II+–+Living",
      "https://via.placeholder.com/1200x800?text=Ecoville+II+–+Quarto",
      "https://via.placeholder.com/1200x800?text=Ecoville+II+–+Varanda",
    ],
    title: "Compacto Ecoville II",
    description: "Projeto inteligente e funcional, ideal para casais ou pequenas famílias que valorizam praticidade. Layout otimizado com aproveitamento máximo dos espaços sem abrir mão do conforto e do estilo contemporâneo.",
    
    location: "Ecoville 2",
    area: 120,
    bedrooms: 2,
    bathrooms: 1,
    hasPool: false,
    isFurnished: true,
    status: "Em construção",
    style: "Compacto",
    yearDelivery: "2025",
  },
  {
    slug: "mansao-porto-seguro",
    image: "https://via.placeholder.com/800x600?text=Mansão+Porto+Seguro",
    images: [
      "https://via.placeholder.com/1200x800?text=Porto+Seguro+–+Fachada",
      "https://via.placeholder.com/1200x800?text=Porto+Seguro+–+Piscina",
      "https://via.placeholder.com/1200x800?text=Porto+Seguro+–+Sala+Jantar",
      "https://via.placeholder.com/1200x800?text=Porto+Seguro+–+Suíte",
    ],
    title: "Mansão Porto Seguro",
    description: "Obra de alto padrão com área de lazer completa, piscina aquecida e acabamento de luxo. Cinco suítes, adega climatizada, home theater e espaço gourmet com churrasqueira e forno de pizza.",
    
    location: "Porto Seguro",
    area: 320,
    bedrooms: 4,
    bathrooms: 3,
    hasPool: true,
    isFurnished: false,
    status: "Finalizado",
    style: "Alto Padrão",
    yearDelivery: "2023",
  },
];
