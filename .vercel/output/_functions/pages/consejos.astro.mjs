/* empty css                                     */
import { a as createComponent, e as renderComponent, r as renderScript, d as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_W1JgSjoG.mjs';
import { $ as $$Layout } from '../chunks/Layout_CHj6NFB5.mjs';
import { w as writable } from '../chunks/index_DEom4rlB.mjs';
import { s as supabase } from '../chunks/supabase_DCsDQftD.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

// Almacén de tips
const tipsStore = writable([]);

// Cargar todos los tips
async function getAllTips() {
  try {
    const { data, error } = await supabase
      .from("tips")
      .select("*, especies(*)");

    if (error) throw error;

    tipsStore.set(data || []);
    return data || [];
  } catch (error) {
    console.error("Error al cargar tips:", error);
    return [];
  }
}

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const categorias = [
    "Cactus",
    "Suculentas",
    "Materas",
    "Riego",
    "Plagas",
    "General"
  ];
  const tipsPorCategoria = {};
  const todosLosTips = await getAllTips();
  for (const categoria of categorias) {
    tipsPorCategoria[categoria] = todosLosTips.filter(
      (tip) => tip.categoria === categoria
    );
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Consejos de Cuidado | JAMUCHEE", "data-astro-cid-2x7ploon": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" data-astro-cid-2x7ploon> <div class="text-center mb-12" data-astro-cid-2x7ploon> <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4" data-astro-cid-2x7ploon>
Consejos para el Cuidado de tus Plantas
</h1> <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto" data-astro-cid-2x7ploon>
Aprende a cuidar tus cactus, suculentas y materas con nuestros consejos
        prácticos. Mantén tus plantas saludables y hermosas con estos tips
        especializados.
</p> </div> <!-- Filtro de categorías --> <div class="flex flex-wrap justify-center gap-3 mb-8" data-astro-cid-2x7ploon> <button class="px-4 py-2 rounded-full bg-primary-100 text-primary-800 font-medium category-filter active" data-category="todos" data-astro-cid-2x7ploon>
Todos
</button> ${categorias.map((categoria) => renderTemplate`<button class="px-4 py-2 rounded-full bg-gray-100 hover:bg-primary-100 text-gray-800 hover:text-primary-800 font-medium category-filter"${addAttribute(categoria, "data-category")} data-astro-cid-2x7ploon> ${categoria} </button>`)} </div> <!-- Tips organizados por categoría --> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="all-tips-container" data-astro-cid-2x7ploon> ${todosLosTips.map((tip) => renderTemplate`<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden tip-card"${addAttribute(tip.categoria, "data-category")} data-astro-cid-2x7ploon> ${tip.imagen && renderTemplate`<img${addAttribute(tip.imagen, "src")}${addAttribute(tip.titulo, "alt")} class="w-full h-48 object-cover" data-astro-cid-2x7ploon>`} <div class="p-6" data-astro-cid-2x7ploon> <span class="inline-block px-3 py-1 text-xs font-semibold text-primary-800 bg-primary-100 rounded-full mb-3" data-astro-cid-2x7ploon> ${tip.categoria} </span> <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3" data-astro-cid-2x7ploon> ${tip.titulo} </h3> <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3" data-astro-cid-2x7ploon> ${tip.contenido} </p> <a${addAttribute(`/consejos/${tip.id}`, "href")} class="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium inline-flex items-center" data-astro-cid-2x7ploon>
Leer más
<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-2x7ploon> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" data-astro-cid-2x7ploon></path> </svg> </a> </div> </div>`)} </div> <!-- Contenedores de categorías filtradas (inicialmente ocultos) --> ${categorias.map((categoria) => renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 hidden category-container"${addAttribute(`${categoria.toLowerCase()}-container`, "id")} data-astro-cid-2x7ploon> ${tipsPorCategoria[categoria].map((tip) => renderTemplate`<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden" data-astro-cid-2x7ploon> ${tip.imagen && renderTemplate`<img${addAttribute(tip.imagen, "src")}${addAttribute(tip.titulo, "alt")} class="w-full h-48 object-cover" data-astro-cid-2x7ploon>`} <div class="p-6" data-astro-cid-2x7ploon> <span class="inline-block px-3 py-1 text-xs font-semibold text-primary-800 bg-primary-100 rounded-full mb-3" data-astro-cid-2x7ploon> ${tip.categoria} </span> <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3" data-astro-cid-2x7ploon> ${tip.titulo} </h3> <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3" data-astro-cid-2x7ploon> ${tip.contenido} </p> <a${addAttribute(`/consejos/${tip.id}`, "href")} class="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium inline-flex items-center" data-astro-cid-2x7ploon>
Leer más
<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-2x7ploon> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" data-astro-cid-2x7ploon></path> </svg> </a> </div> </div>`)} </div>`)} <!-- Mensaje de no hay consejos --> <div id="no-tips-message" class="text-center py-10 hidden" data-astro-cid-2x7ploon> <p class="text-xl text-gray-600 dark:text-gray-400" data-astro-cid-2x7ploon>
Lo sentimos, aún no tenemos consejos en esta categoría.
</p> </div> </main> ` })} ${renderScript($$result, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/consejos/index.astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/consejos/index.astro", void 0);

const $$file = "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/consejos/index.astro";
const $$url = "/consejos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
