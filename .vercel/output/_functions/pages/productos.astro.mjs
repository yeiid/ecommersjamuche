/* empty css                                     */
import { a as createComponent, e as renderComponent, r as renderScript, d as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_W1JgSjoG.mjs';
import { $ as $$Layout } from '../chunks/Layout_CHj6NFB5.mjs';
import { $ as $$ProductCard } from '../chunks/ProductCard_BPgcnW2f.mjs';
export { renderers } from '../renderers.mjs';

const $$Productos = createComponent(($$result, $$props, $$slots) => {
  const categories = [
    { id: "todos", name: "Todos los productos" },
    { id: "extractos", name: "Extractos" },
    { id: "plantas", name: "Plantas" },
    { id: "semillas", name: "Semillas" },
    { id: "accesorios", name: "Accesorios" }
  ];
  const products = [
    {
      id: "1",
      name: "Extracto de Cannabis",
      price: 85e3,
      discountPrice: 75e3,
      image: "https://images.unsplash.com/photo-1628542065089-1f1587564502?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Extracto natural de cannabis con propiedades medicinales. Ideal para tratamientos terap\xE9uticos.",
      rating: 4.5,
      category: "extractos",
      isNew: true,
      isFeatured: true
    },
    {
      id: "2",
      name: "Semillas de Marihuana",
      price: 45e3,
      discountPrice: 0,
      image: "https://images.unsplash.com/photo-1616407746534-a58befda7d83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Pack de semillas org\xE1nicas de marihuana para cultivo personal.",
      rating: 5,
      category: "semillas",
      isNew: false,
      isFeatured: true
    },
    {
      id: "3",
      name: "Planta de Cannabis Medicinal",
      price: 12e4,
      discountPrice: 99e3,
      image: "https://images.unsplash.com/photo-1536689318884-51b09dfe7e74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Planta viva de cannabis medicinal lista para trasplantar.",
      rating: 4,
      category: "plantas",
      isNew: true,
      isFeatured: false
    },
    {
      id: "4",
      name: "Grinder de Aluminio",
      price: 35e3,
      discountPrice: 29e3,
      image: "https://images.unsplash.com/photo-1508963493744-76fce69379c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Grinder de aluminio de alta calidad, dise\xF1o de 4 piezas.",
      rating: 4.8,
      category: "accesorios",
      isNew: false,
      isFeatured: true
    },
    {
      id: "5",
      name: "Aceite de CBD",
      price: 65e3,
      discountPrice: 0,
      image: "https://images.unsplash.com/photo-1614859465898-24a1f9f1c175?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Aceite de CBD puro, 500mg, para uso terap\xE9utico.",
      rating: 4.6,
      category: "extractos",
      isNew: false,
      isFeatured: true
    },
    {
      id: "6",
      name: "Kit de Cultivo Completo",
      price: 25e4,
      discountPrice: 199e3,
      image: "https://images.unsplash.com/photo-1523246224990-496e9a19113a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Kit completo para cultivo indoor: luces, macetas, sustrato y m\xE1s.",
      rating: 4.9,
      category: "accesorios",
      isNew: true,
      isFeatured: true
    },
    {
      id: "7",
      name: "Semillas Autoflorecientes",
      price: 55e3,
      discountPrice: 49e3,
      image: "https://images.unsplash.com/photo-1568043477799-700c9615b640?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Pack de semillas autoflorecientes de alta calidad.",
      rating: 4.7,
      category: "semillas",
      isNew: false,
      isFeatured: false
    },
    {
      id: "8",
      name: "Planta CBD Sativa",
      price: 11e4,
      discountPrice: 0,
      image: "https://images.unsplash.com/photo-1632255086813-ceab95b99b00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      description: "Planta de cannabis Sativa con alto contenido de CBD.",
      rating: 4.4,
      category: "plantas",
      isNew: true,
      isFeatured: false
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Productos | JAMUCHEE" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-12"> <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
Nuestros Productos
</h1> <div class="grid grid-cols-1 lg:grid-cols-4 gap-8"> <!-- Sidebar con filtros --> <div class="lg:col-span-1"> <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6"> <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
Filtrar por categoría
</h2> <div class="space-y-2" id="category-filters"> ${categories.map((category) => renderTemplate`<div class="flex items-center"> <input type="radio"${addAttribute(`category-${category.id}`, "id")} name="category"${addAttribute(category.id, "value")} class="h-4 w-4 text-primary-600 focus:ring-primary-500"${addAttribute(category.id === "todos", "checked")}> <label${addAttribute(`category-${category.id}`, "for")} class="ml-2 text-gray-700 dark:text-gray-300"> ${category.name} </label> </div>`)} </div> </div> <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"> <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
Búsqueda
</h2> <div class="relative"> <input type="text" id="search-input" placeholder="Buscar productos..." class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"> <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path> </svg> </span> </div> </div> </div> <!-- Lista de productos --> <div class="lg:col-span-3"> <div id="products-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> ${products.map((product) => renderTemplate`${renderComponent($$result2, "ProductCard", $$ProductCard, { "id": product.id, "name": product.name, "price": product.price, "discountPrice": product.discountPrice, "image": product.image, "description": product.description, "rating": product.rating, "category": product.category, "isNew": product.isNew, "isFeatured": product.isFeatured })}`)} </div> <!-- Mensaje cuando no hay resultados --> <div id="no-results" class="hidden text-center py-12"> <p class="text-xl font-medium text-gray-600 dark:text-gray-400">
No se encontraron productos que coincidan con tu búsqueda.
</p> <p class="mt-2 text-gray-500 dark:text-gray-500">
Intenta con otros términos o categorías.
</p> </div> </div> </div> </div> ` })} ${renderScript($$result, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/productos.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/productos.astro", void 0);

const $$file = "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/productos.astro";
const $$url = "/productos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Productos,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
