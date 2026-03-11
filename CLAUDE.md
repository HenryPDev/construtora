# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

## Architecture

This is a **Next.js 16 App Router** project for a Brazilian construction company ("Zeferino & Correa") website. Uses React 19, TypeScript, and Tailwind CSS v4.

### Pages (`app/`)
- `/` (`app/page.tsx`) — Hero landing page with animated skewed panels, client component with inline `<style>` blocks. Uses Google Fonts (Cormorant Garamond + Oswald) loaded per-component.
- `/catalogo` (`app/catalogo/page.tsx`) — Property listings page with a hardcoded `houses` array (placeholder data). Renders `<Filters>` sidebar + `<House>` cards.
- `/contatos` (`app/contatos/page.tsx`) — Contact page stub.

### Components (`components/`)
- `house.tsx` — Card component displaying property details (image, price, area, bedrooms, bathrooms, pool, furnished). Uses `next/image` and `lucide-react` icons.
- `filters.tsx` — Client-side filter sidebar with state for min/max price, location dropdown, area range slider, rooms/bathrooms toggles, and pool/furnished checkboxes. **Filters are UI-only and not yet wired to the house list.**

### Styling
- **Tailwind v4** — imported via `@import "tailwindcss"` in `globals.css` (no `tailwind.config.js` file).
- **Poppins** font is loaded via Google Fonts in `layout.tsx` and used through CSS utility classes (`.poppins-regular`, `.poppins-semibold`, etc.) defined in `globals.css`.
- The hero page (`app/page.tsx`) uses a different font pair (Cormorant Garamond + Oswald) loaded inline within the component.
- Brand accent color is gold `rgba(196, 160, 80, ...)` / Tailwind `yellow-600` (`#eab308`).
- Body background is `#E5ECE9` (light sage green).

### Images
- Property images in `/public/images/` (local files like `casa2.jpg`–`casa6.jpg` used in the hero).
- Catalog items currently use `via.placeholder.com` URLs.
- `next/image` requires external image domains to be configured in `next.config` if added.
