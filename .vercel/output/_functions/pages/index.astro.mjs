/* empty css                                     */
import { a as createComponent, e as renderComponent, r as renderScript, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_W1JgSjoG.mjs';
import { $ as $$Layout } from '../chunks/Layout_CHj6NFB5.mjs';
import { $ as $$ProductCard } from '../chunks/ProductCard_BPgcnW2f.mjs';
import { $ as $$RecommendationCarousel } from '../chunks/RecommendationCarousel_DPrJ-9Fu.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const products = [
    {
      id: "1",
      name: "Collar Premium para Perro",
      price: 89900,
      discountPrice: 69900,
      image: "https://placehold.co/300x300/FF6B6B/FFFFFF.png?text=Collar+Premium",
      description: "Collar de alta calidad para perros de todos los tama\xF1os, resistente al agua y c\xF3modo.",
      rating: 4.5,
      category: "Perros",
      isNew: true,
      isFeatured: false
    },
    {
      id: "2",
      name: "Juguete Interactivo para Gatos",
      price: 55e3,
      image: "https://placehold.co/300x300/4ECDC4/FFFFFF.png?text=Juguete+Gatos",
      description: "Juguete interactivo que estimula la actividad f\xEDsica y mental de tu gato.",
      rating: 4.8,
      category: "Gatos",
      isNew: false,
      isFeatured: true
    },
    {
      id: "3",
      name: "Cama Ortop\xE9dica para Mascotas",
      price: 145e3,
      discountPrice: 119900,
      image: "https://placehold.co/300x300/C7F464/000000.png?text=Cama+Ortop\xE9dica",
      description: "Cama ortop\xE9dica que proporciona soporte y comodidad a mascotas con problemas articulares.",
      rating: 4.7,
      category: "Camas",
      isNew: false,
      isFeatured: true
    },
    {
      id: "4",
      name: "Alimento Premium para Perros",
      price: 78e3,
      image: "https://placehold.co/300x300/556270/FFFFFF.png?text=Alimento+Premium",
      description: "Alimento premium formulado para satisfacer las necesidades nutricionales de tu perro.",
      rating: 4.2,
      category: "Alimentos",
      isNew: true,
      isFeatured: false
    },
    {
      id: "5",
      name: "Transportadora de Viaje para Gatos",
      price: 129900,
      discountPrice: 99900,
      image: "https://placehold.co/300x300/1F3A5F/FFFFFF.png?text=Transportadora",
      description: "Transportadora c\xF3moda y segura para viajes con tu gato.",
      rating: 4.1,
      category: "Accesorios",
      isNew: true,
      isFeatured: false
    },
    {
      id: "6",
      name: "Arn\xE9s de Control para Perros",
      price: 65e3,
      image: "https://placehold.co/300x300/F9DC5C/000000.png?text=Arn\xE9s",
      description: "Arn\xE9s de control para paseos c\xF3modos y seguros con tu perro.",
      rating: 4.6,
      category: "Perros",
      isNew: false,
      isFeatured: true
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-12"> <div class="container mx-auto px-4"> <h1 class="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">
Bienvenido a JAMUCHEE
</h1> <p class="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
Tu tienda de confianza para todas las necesidades de tus mascotas.
        Encuentra productos de alta calidad a precios increíbles.
</p> <div class="flex justify-between items-center mb-8"> <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
Productos Destacados
</h2> <a href="/productos" class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
Ver todos →
</a> </div> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> ${products.map((product) => renderTemplate`${renderComponent($$result2, "ProductCard", $$ProductCard, { ...product })}`)} </div> </div> </section> <section class="py-12 bg-gray-50 dark:bg-gray-800"> <div class="container mx-auto px-4"> <h2 class="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">
¿Por qué elegirnos?
</h2> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm"> <div class="mb-4 text-primary-600 dark:text-primary-400"> <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> </div> <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">
Calidad Garantizada
</h3> <p class="text-gray-600 dark:text-gray-300">
Todos nuestros productos son cuidadosamente seleccionados para
            asegurar la mejor calidad.
</p> </div> <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm"> <div class="mb-4 text-primary-600 dark:text-primary-400"> <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">
Precios Competitivos
</h3> <p class="text-gray-600 dark:text-gray-300">
Ofrecemos los mejores precios del mercado sin comprometer la calidad
            de nuestros productos.
</p> </div> <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm"> <div class="mb-4 text-primary-600 dark:text-primary-400"> <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path> </svg> </div> <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">
Entrega Rápida
</h3> <p class="text-gray-600 dark:text-gray-300">
Envíos rápidos y seguros a cualquier parte del país, para que
            recibas tus productos cuando los necesites.
</p> </div> </div> </div> </section> <section class="py-12"> <div class="container mx-auto px-4"> ${renderComponent($$result2, "RecommendationCarousel", $$RecommendationCarousel, {})} </div> </section> ` })} ${renderScript($$result, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/index.astro", void 0);

const $$file = "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
