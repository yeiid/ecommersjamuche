/* empty css                                     */
import { a as createComponent, e as renderComponent, r as renderScript, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_W1JgSjoG.mjs';
import { $ as $$Layout } from '../chunks/Layout_CHj6NFB5.mjs';
import { $ as $$RecommendationCarousel } from '../chunks/RecommendationCarousel_DPrJ-9Fu.mjs';
export { renderers } from '../renderers.mjs';

const $$Recomendaciones = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-12"> <div class="container mx-auto px-4"> <h1 class="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">
Recomendaciones Personalizadas
</h1> <p class="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
Basado en tu historial de navegación, preferencias y compras, hemos
        seleccionado estos productos especialmente para ti.
</p> <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8"> ${renderComponent($$result2, "RecommendationCarousel", $$RecommendationCarousel, {})} </div> <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-8"> <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
¿Cómo funcionan nuestras recomendaciones?
</h2> <div class="text-gray-700 dark:text-gray-300 space-y-4"> <p>
Nuestro sistema de recomendaciones analiza varios factores para
            ofrecerte productos que podrían interesarte:
</p> <ul class="list-disc pl-6 space-y-2"> <li>Los productos que has visto recientemente</li> <li>Artículos que has añadido a tu carrito</li> <li>Productos que has guardado en tu lista de deseos</li> <li>Categorías populares y relacionadas con tus intereses</li> </ul> <p>
Mientras más interactúes con nuestra tienda, mejores serán las
            recomendaciones personalizadas que podamos ofrecerte.
</p> </div> </div> <div class="text-center"> <a href="/productos" class="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
Explorar todos los productos
</a> </div> </div> </section> ` })} ${renderScript($$result, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/recomendaciones.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/recomendaciones.astro", void 0);

const $$file = "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/recomendaciones.astro";
const $$url = "/recomendaciones";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Recomendaciones,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
