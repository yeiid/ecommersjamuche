/* empty css                                     */
import { a as createComponent, e as renderComponent, r as renderScript, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_W1JgSjoG.mjs';
import { $ as $$Layout } from '../chunks/Layout_CHj6NFB5.mjs';
export { renderers } from '../renderers.mjs';

const $$ListaDeseos = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Lista de Deseos | JAMUCHEE" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-12"> <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
Mi Lista de Deseos
</h1> <div id="wishlist-container"> <!-- Mensaje cuando la lista está vacía --> <div id="empty-wishlist-message" class="hidden text-center py-8"> <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path> </svg> <p class="text-xl font-medium text-gray-600 dark:text-gray-400">
Tu lista de deseos está vacía
</p> <div class="mt-6"> <a href="/productos" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
Explorar productos
</a> </div> </div> <!-- Contenedor de productos --> <div id="wishlist-items-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> <!-- Aquí se cargarán dinámicamente los productos --> </div> </div> </div> ` })} ${renderScript($$result, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/lista-deseos.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/lista-deseos.astro", void 0);

const $$file = "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/lista-deseos.astro";
const $$url = "/lista-deseos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ListaDeseos,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
