# 🏗️ Zeferino & Correa - Frontend

Frontend Next.js para a plataforma de imóveis Zeferino & Correa.

## 🔄 Arquitetura

Este repositório contém **APENAS** o frontend. O backend está completamente separado em:
👉 **[backend-construtora](https://github.com/seu-usuario/backend-construtora)**

```
┌─────────────────────────────────────────────────┐
│              Zeferino & Correa                  │
├─────────────────────────────────────────────────┤
│                                                 │
│  Frontend (construtora)    Backend              │
│  ├── Pages                 backend-construtora  │
│  ├── Components            ├── Express.js API  │
│  ├── Styles               ├── Prisma ORM      │
│  └── Filters              ├── PostgreSQL      │
│      ↓                     └── Email (Resend) │
│      └─── Calls API at http://localhost:3001 ──┘
│
```

## 🚀 Setup Rápido

### 1️⃣ Backend (em outro terminal/diretório)

```bash
cd ../backend-construtora
npm install
cp .env.example .env
# Configure DATABASE_URL, RESEND_API_KEY, etc no .env
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

O backend rodará em `http://localhost:3001`

### 2️⃣ Frontend (neste diretório)

```bash
npm install
npm run dev
```

O frontend rodará em `http://localhost:3000`

## 🔧 Configuração

### Variáveis de Ambiente Frontend

Crie um arquivo `.env` baseado em `.env.example`:

```env
# Desenvolvimento
NEXT_PUBLIC_API_URL=http://localhost:3001

# Produção
# NEXT_PUBLIC_API_URL=https://api.zeferinocorrea.com.br
```

**Importante:** A variável `NEXT_PUBLIC_API_URL` deve ser acessível no browser (por isso `NEXT_PUBLIC_`). O frontend a usa para chamar a API.

## 📚 O que está aqui

### Frontend (Este Repositório)
- ✅ Pages (Landing, Catálogo, Contato)
- ✅ Componentes (Card de imóvel, Filtros, Formulário de contato)
- ✅ Estilos (Tailwind CSS v4)
- ✅ Design responsivo

### Backend (backend-construtora)
- ✅ API REST em Express.js
- ✅ Banco de dados PostgreSQL com Prisma
- ✅ CRUD de imóveis
- ✅ Filtros de imóveis
- ✅ Formulário de contato com email
- ✅ Seed com 5 propriedades de exemplo

## 🔗 Endpoints Utilizados

### Imóveis
- `GET /api/houses` - Lista imóveis com filtros
- `GET /api/houses/:slug` - Detalhes de um imóvel
- `POST /api/houses` - Criar (admin)
- `PUT /api/houses/:slug` - Editar (admin)
- `DELETE /api/houses/:slug` - Deletar (admin)

### Contato
- `POST /api/contact` - Enviar formulário de contato

Veja documentação completa em [backend-construtora/README.md](../backend-construtora/README.md)

## 🛠️ Scripts Disponíveis

```bash
npm run dev      # Inicia desenvolvimento (localhost:3000)
npm run build    # Build para produção
npm run start    # Inicia servidor compilado
npm run lint     # Executa ESLint
```

## 📁 Estrutura de Pastas

```
src/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Landing page
│   ├── catalogo/
│   │   ├── page.tsx         # Listagem de imóveis
│   │   └── [slug]/
│   │       └── page.tsx     # Detalhes do imóvel
│   ├── contatos/
│   │   └── page.tsx         # Página de contato
│   └── layout.tsx           # Layout global
│
├── components/              # Componentes React
│   ├── filters.tsx          # Filtros de imóvel
│   ├── house.tsx            # Card de imóvel
│   ├── header.tsx           # Header/Nav
│   └── ContactForm.tsx      # Formulário de contato
│
├── lib/
│   └── houses.ts            # Dados estáticos (temp)
│
└── globals.css              # Estilos globais
```

## 🎨 Styling

- **Tailwind CSS v4** - Utility-first CSS
- **Google Fonts** - Cormorant Garamond + Oswald
- **Cor de marca** - Gold `rgba(196, 160, 80, ...)`
- **Background** - Dark `#070707`

## 📱 Responsividade

- Mobile first
- Breakpoints: `min-[900px]`, `md`, `lg`
- 100% responsivo em todos os tamanhos

## 🔐 Considerações de Segurança

- ✅ Frontend é público (sem dados sensíveis)
- ✅ Backend valida todas as requisições
- ✅ CORS configurado para seu domínio
- ✅ Variáveis sensíveis (RESEND_API_KEY) apenas no backend

## 🚀 Deploy

### Frontend
Opções recomendadas:
- **Vercel** (recomendado para Next.js)
- **Netlify**
- **AWS Amplify**

```bash
npm run build  # Gera .next/
# Deploy a pasta para seu host
```

### Backend
Veja [backend-construtora/README.md](../backend-construtora/README.md) para deploy

## 🤝 Contribuindo

1. Cria uma branch: `git checkout -b feature/minha-feature`
2. Commit: `git commit -m "feat: descrição"`
3. Push: `git push origin feature/minha-feature`
4. Abre um PR

## 📞 Suporte

- 📧 Email: contato@zeferinocorrea.com.br
- 📱 WhatsApp: (67) 98126-9304

## 📄 Licença

Privado - Zeferino & Correa © 2026
