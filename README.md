# 🛒 E-commerce Template — WhatsApp Checkout

Plantilla de e-commerce replicable construida con **Astro + Svelte + Tailwind**. Los pedidos se envían directamente por WhatsApp, sin necesidad de pasarelas de pago ni bases de datos.

## 🚀 Stack

- **Astro** — Framework web de alto rendimiento con SSR
- **Svelte** — Componentes reactivos (carrito)
- **Tailwind CSS** — Design system moderno
- **Nanostores** — Estado global ligero
- **@astrojs/node** — Deploy en VPS con Dokploy

## 📁 Estructura

```
src/
├── config/
│   └── store.config.ts    ← ⚡ EDITA ESTE ARCHIVO PARA PERSONALIZAR
├── components/
│   ├── layout/            ← Header, Footer
│   ├── cards/             ← ProductCard
│   ├── cart/              ← CartView (Svelte)
│   └── ui/                ← ThemeToggle, ScrollToTop, CartButton
├── layouts/
│   └── Layout.astro       ← Layout principal con SEO
├── pages/
│   ├── index.astro        ← Landing page
│   ├── productos.astro    ← Catálogo con filtros
│   ├── carrito.astro      ← Carrito + checkout WhatsApp
│   └── nosotros.astro     ← Quiénes somos
├── stores/
│   └── cartStore.js       ← Estado del carrito
└── styles/
    └── globals.css        ← Design system
```

## 🔧 Personalizar para un nuevo cliente

1. Edita `src/config/store.config.ts`:
   - Nombre de la tienda
   - Número de WhatsApp
   - Productos y categorías
   - Colores y redes sociales

2. Cambia las imágenes en `public/`

3. (Opcional) Ajusta colores en `tailwind.config.mjs` y `globals.css`

## 🏃 Desarrollo

```bash
pnpm install
pnpm run dev
```

## 🚢 Deploy (Dokploy)

```bash
pnpm run build
pnpm run start
```

El servidor Node escucha en el puerto definido por `PORT` (default: 4321).

## 🌿 Ramas Git

- `master` — Base del proyecto original
- `template/cuidado-corporal` — Template para productos de cuidado corporal
- Para cada nuevo cliente: `client/nombre-cliente`
