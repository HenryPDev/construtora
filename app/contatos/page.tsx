import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: "Contato – Zeferino & Correa",
  description: "Entre em contato conosco para orçamentos e informações.",
};

const team = [
  {
    image: "https://via.placeholder.com/400x400?text=Eng.+José+Zeferino",
    name: "Antonio Zeferino",
    title: "Diretor Executivo",
    description: "Com mais de 25 anos de experiência em grandes projetos residenciais.",
    phone: "(67) 98126-9304",
    email: "@.com.br",
  },
  {
    image: "https://via.placeholder.com/400x400?text=Arq.+Roberto+Correa",
    name: "Everton Correa",
    title: "Diretor Executivo",
    description: "Com mais de 25 anos de experiência em grandes projetos residenciais.",
    phone: "(47) 99999-2222",
    email: "@.com.br",
  },
];

const office = {
  image: "https://via.placeholder.com/800x600?text=Escritório+Zeferino+%26+Correa",
  name: "Escritório Principal",
  address: "Rua Exemplo, 1000 - Centro",
  city: "Dourados, MS 79804-000",
  phone: "(67) 98126-9304",
  email: "contato@zeferinocorrea.com.br",
};

export default function Contatos() {
  return (
    <div className="bg-[#070707] min-h-screen">
      {/* Hero section */}
      <div className="max-w-[1200px] mx-auto px-10 pt-[10rem] pb-20 border-b border-b-[rgba(196,160,80,0.12)]">
        <p className="font-oswald font-[200] text-[0.6rem] tracking-[0.55em] text-[rgba(196,160,80,0.8)] uppercase mb-4">
          Fale Conosco
        </p>
        <h1 className="font-cormorant font-[300] text-[clamp(2.5rem,5vw,4.5rem)] text-white tracking-[0.06em] leading-none">
          Entre em <em className="italic text-[rgba(255,255,255,0.65)]">contato</em>
        </h1>
        <p className="font-oswald font-[200] text-[0.72rem] tracking-[0.15em] text-[rgba(255,255,255,0.4)] mt-6 max-w-[600px]">
          Estamos prontos para transformar seus projetos em realidade. Entre em contato com nossa equipe para orçamentos, dúvidas ou informações sobre nossos serviços.
        </p>
      </div>

      {/* Team section */}
      <div className="max-w-[1200px] mx-auto px-10 py-16">
        <p className="font-oswald font-[200] text-[0.6rem] tracking-[0.55em] text-[rgba(196,160,80,0.8)] uppercase mb-4">
          Nossa Equipe
        </p>
        <h2 className="font-cormorant font-[300] text-[clamp(2rem,4vw,3.5rem)] text-white tracking-[0.06em] leading-[1.1] mb-12">
          Profissionais <em className="italic text-[rgba(255,255,255,0.65)]">experientes</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {team.map((member) => (
            <article key={member.name} className="bg-[#0d0d0d] border border-[rgba(196,160,80,0.1)] overflow-hidden transition-[border-color] duration-300 hover:border-[rgba(196,160,80,0.3)] group/card">
              <div className="relative overflow-hidden h-[300px]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] group-hover/card:scale-[1.06]"
                />
              </div>

              <div className="p-6">
                <h3 className="font-cormorant font-[300] text-[1.8rem] text-white tracking-[0.05em] leading-[1.1] mb-1">
                  {member.name}
                </h3>
                <p className="font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(196,160,80,0.7)] uppercase mb-3">
                  {member.title}
                </p>
                <p className="font-oswald font-[200] text-[0.72rem] leading-[1.8] tracking-[0.04em] text-[rgba(255,255,255,0.4)] mb-6 pb-6 border-b border-b-[rgba(196,160,80,0.1)]">
                  {member.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-[rgba(196,160,80,0.7)]" />
                    <span className="font-oswald font-[200] text-[0.7rem] tracking-[0.1em] text-[rgba(255,255,255,0.6)]">
                      {member.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-[rgba(196,160,80,0.7)]" />
                    <a href={`mailto:${member.email}`} className="font-oswald font-[200] text-[0.7rem] tracking-[0.1em] text-[rgba(196,160,80,0.8)] hover:text-[rgba(196,160,80,1)] no-underline transition-colors duration-200">
                      {member.email}
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-[600px] mx-auto px-10 py-16 border-t border-t-[rgba(196,160,80,0.12)]">
        <p className="font-oswald font-[200] text-[0.6rem] tracking-[0.55em] text-[rgba(196,160,80,0.8)] uppercase mb-4">
          Enviar Mensagem
        </p>
        <h2 className="font-cormorant font-[300] text-[clamp(2rem,4vw,3.5rem)] text-white tracking-[0.06em] leading-[1.1] mb-8">
          Deixe sua <em className="italic text-[rgba(255,255,255,0.65)]">mensagem</em>
        </h2>
        <ContactForm />
      </div>

      {/* Office section */}
      <div className="max-w-[1200px] mx-auto px-10 pb-16">
        <p className="font-oswald font-[200] text-[0.6rem] tracking-[0.55em] text-[rgba(196,160,80,0.8)] uppercase mb-4">
          Localização
        </p>
        <h2 className="font-cormorant font-[300] text-[clamp(2rem,4vw,3.5rem)] text-white tracking-[0.06em] leading-[1.1] mb-12">
          Escritório <em className="italic text-[rgba(255,255,255,0.65)]">Principal</em>
        </h2>

        <article className="bg-[#0d0d0d] border border-[rgba(196,160,80,0.1)] grid grid-cols-1 md:grid-cols-[400px_1fr] overflow-hidden transition-[border-color] duration-300 hover:border-[rgba(196,160,80,0.3)] group/office">
          <div className="relative overflow-hidden h-[300px] md:h-auto">
            <img
              src={office.image}
              alt={office.name}
              className="w-full h-full object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] group-hover/office:scale-[1.06]"
            />
          </div>

          <div className="p-8 flex flex-col justify-center">
            <h3 className="font-cormorant font-[300] text-[2.2rem] text-white tracking-[0.05em] leading-[1.1] mb-2">
              {office.name}
            </h3>

            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-[rgba(196,160,80,0.7)] shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span className="font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(255,255,255,0.4)] uppercase mb-1">
                    Endereço
                  </span>
                  <span className="font-oswald font-[200] text-[0.85rem] tracking-[0.05em] text-[rgba(255,255,255,0.7)]">
                    {office.address}<br />{office.city}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone size={20} className="text-[rgba(196,160,80,0.7)] shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span className="font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(255,255,255,0.4)] uppercase mb-1">
                    Telefone
                  </span>
                  <a href={`tel:${office.phone.replace(/\D/g, '')}`} className="font-oswald font-[200] text-[0.85rem] tracking-[0.05em] text-[rgba(196,160,80,0.8)] hover:text-[rgba(196,160,80,1)] no-underline transition-colors duration-200">
                    {office.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail size={20} className="text-[rgba(196,160,80,0.7)] shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span className="font-oswald font-[200] text-[0.6rem] tracking-[0.3em] text-[rgba(255,255,255,0.4)] uppercase mb-1">
                    Email
                  </span>
                  <a href={`mailto:${office.email}`} className="font-oswald font-[200] text-[0.85rem] tracking-[0.05em] text-[rgba(196,160,80,0.8)] hover:text-[rgba(196,160,80,1)] no-underline transition-colors duration-200">
                    {office.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-fit font-oswald font-[300] text-[0.6rem] tracking-[0.35em] uppercase text-[rgba(196,160,80,0.8)] border border-[rgba(196,160,80,0.3)] px-8 py-3 transition-all duration-[250ms] hover:bg-[rgba(196,160,80,0.08)] hover:border-[rgba(196,160,80,0.7)] hover:text-[rgba(196,160,80,1)]">
                Abrir no Maps
              </button>
              <Link
                href="https://wa.me/5567981269304?text=Olá%2C%20gostaria%20de%20mais%20informações%20sobre%20os%20serviços%20da%20Zeferino%20%26%20Correa."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-fit font-oswald font-[300] text-[0.6rem] tracking-[0.35em] uppercase text-[rgba(34,197,94,0.9)] border border-[rgba(34,197,94,0.4)] px-8 py-3 no-underline transition-all duration-[250ms] hover:bg-[rgba(34,197,94,0.1)] hover:border-[rgba(34,197,94,0.8)] hover:text-[rgba(34,197,94,1)]"
              >
                <MessageCircle size={14} />
                Conversar no WhatsApp
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
