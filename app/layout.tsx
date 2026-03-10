import "./globals.css";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minha Construtora",
  description: "Construtora especializada em projetos residenciais e comerciais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </head>
      <body 
        className={`bg-[#E5ECE9] antialiased poppins-regular`}
      >
        <header className="bg-yellow-600 flex justify-center text-white p-4 poppins-semibold">
          <nav className="flex space-x-4">
            <Link href="/" className="hover:underline">Início</Link>
            <Link href="/contatos" className="hover:underline">Contato</Link>
            <Link href="/catalogo" className="hover:underline">Catálogo</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
