import House from "@/components/house";
import Filters from "@/components/filters";


export const metadata = {
  title: "Catálogo – Minha Construtora",
  description: "Veja os projetos e obras da nossa construtora.",
};

const houses = [
  {
    image: "https://via.placeholder.com/400x300?text=Casa+1",
    title: "Casa Moderna 1",
    description: "Uma casa moderna com 3 quartos e 2 banheiros, ideal para famílias.",
    price: "R$ 500.000",
    location: "São Paulo, SP"
  },
  {
    image: "https://via.placeholder.com/400x300?text=Casa+2",
    title: "Casa Clássica 2",
    description: "Casa clássica com jardim amplo e garagem para 2 carros.",
    price: "R$ 450.000",
    location: "Rio de Janeiro, RJ"
  },
  {
    image: "https://via.placeholder.com/400x300?text=Casa+3",
    title: "Apartamento Luxo 3",
    description: "Apartamento de luxo com vista para o mar e piscina privativa.",
    price: "R$ 800.000",
    location: "Florianópolis, SC"
  },
  {
    image: "https://via.placeholder.com/400x300?text=Casa+4",
    title: "Casa Pequena 4",
    description: "Casa compacta perfeita para casais jovens, com 2 quartos.",
    price: "R$ 300.000",
    location: "Belo Horizonte, MG"
  },
  {
    image: "https://via.placeholder.com/400x300?text=Casa+5",
    title: "Casa Familiar 5",
    description: "Espaçosa casa familiar com 4 quartos e área de lazer.",
    price: "R$ 600.000",
    location: "Porto Alegre, RS"
  }
];

//Filtros: preço mínimo, preço máximo, localização, tipo (casa/apartamento)
export default function Catalogo(){
    return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl poppins-semibold mb-4">Catálogo de Casas</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        <Filters />
        <main className="lg:w-3/4">
          <div className="space-y-4">
            {houses.map((house, index) => (
              <House key={index} {...house} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
