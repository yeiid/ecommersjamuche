/* empty css                                     */
import { a as createComponent, e as renderComponent, r as renderScript, d as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_W1JgSjoG.mjs';
import { $ as $$Layout } from '../chunks/Layout_CHj6NFB5.mjs';
import { w as writable } from '../chunks/index_DEom4rlB.mjs';
import { s as supabase } from '../chunks/supabase_DCsDQftD.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

// Almacén de proyectos de materas
const proyectosStore = writable([]);

// Cargar todos los proyectos
async function getAllProyectos() {
  try {
    const { data, error } = await supabase
      .from("proyectos_materas")
      .select("*");

    if (error) throw error;

    proyectosStore.set(data || []);
    return data || [];
  } catch (error) {
    console.error("Error al cargar proyectos:", error);
    return [];
  }
}

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const dificultades = ["F\xE1cil", "Intermedio", "Avanzado"];
  const proyectosPorDificultad = {};
  const todosLosProyectos = await getAllProyectos();
  for (const dificultad of dificultades) {
    proyectosPorDificultad[dificultad] = todosLosProyectos.filter(
      (proyecto) => proyecto.dificultad === dificultad
    );
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Proyectos DIY Materas | JAMUCHEE", "data-astro-cid-y22iwnlk": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" data-astro-cid-y22iwnlk> <div class="text-center mb-12" data-astro-cid-y22iwnlk> <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4" data-astro-cid-y22iwnlk>
Proyectos DIY para Materas
</h1> <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto" data-astro-cid-y22iwnlk>
Aprende a crear tus propias materas artesanales con cemento y yeso.
        Proyectos paso a paso para todos los niveles de habilidad.
</p> </div> <!-- Filtro de dificultad --> <div class="flex flex-wrap justify-center gap-3 mb-8" data-astro-cid-y22iwnlk> <button class="px-4 py-2 rounded-full bg-primary-100 text-primary-800 font-medium dificultad-filter active" data-dificultad="todos" data-astro-cid-y22iwnlk>
Todos
</button> ${dificultades.map((dificultad) => renderTemplate`<button class="px-4 py-2 rounded-full bg-gray-100 hover:bg-primary-100 text-gray-800 hover:text-primary-800 font-medium dificultad-filter"${addAttribute(dificultad, "data-dificultad")} data-astro-cid-y22iwnlk> ${dificultad} </button>`)} </div> <!-- Proyectos organizados en tarjetas --> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="all-proyectos-container" data-astro-cid-y22iwnlk> ${todosLosProyectos.map((proyecto) => renderTemplate`<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden proyecto-card"${addAttribute(proyecto.dificultad, "data-dificultad")} data-astro-cid-y22iwnlk> ${proyecto.imagenes && proyecto.imagenes[0] && renderTemplate`<div class="relative" data-astro-cid-y22iwnlk> <img${addAttribute(proyecto.imagenes[0], "src")}${addAttribute(proyecto.titulo, "alt")} class="w-full h-56 object-cover" data-astro-cid-y22iwnlk> <div class="absolute top-0 right-0 m-3" data-astro-cid-y22iwnlk> <span${addAttribute(`inline-block px-3 py-1 text-xs font-semibold rounded-full ${proyecto.dificultad === "F\xE1cil" ? "bg-green-100 text-green-800" : proyecto.dificultad === "Intermedio" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`, "class")} data-astro-cid-y22iwnlk> ${proyecto.dificultad} </span> </div> </div>`} <div class="p-6" data-astro-cid-y22iwnlk> <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3" data-astro-cid-y22iwnlk> ${proyecto.titulo} </h3> <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3" data-astro-cid-y22iwnlk> ${proyecto.descripcion} </p> <div class="flex justify-between items-center" data-astro-cid-y22iwnlk> <div class="text-sm text-gray-500 dark:text-gray-400" data-astro-cid-y22iwnlk> <span class="flex items-center" data-astro-cid-y22iwnlk> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-y22iwnlk> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-y22iwnlk></path> </svg> ${proyecto.tiempo_estimado} </span> </div> <a${addAttribute(`/proyectos/${proyecto.id}`, "href")} class="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium inline-flex items-center" data-astro-cid-y22iwnlk>
Ver proyecto
<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-y22iwnlk> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" data-astro-cid-y22iwnlk></path> </svg> </a> </div> </div> </div>`)} </div> <!-- Contenedores de proyectos filtrados (inicialmente ocultos) --> ${dificultades.map((dificultad) => renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 hidden dificultad-container"${addAttribute(`${dificultad.toLowerCase()}-container`, "id")} data-astro-cid-y22iwnlk> ${proyectosPorDificultad[dificultad].map((proyecto) => renderTemplate`<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden" data-astro-cid-y22iwnlk> ${proyecto.imagenes && proyecto.imagenes[0] && renderTemplate`<div class="relative" data-astro-cid-y22iwnlk> <img${addAttribute(proyecto.imagenes[0], "src")}${addAttribute(proyecto.titulo, "alt")} class="w-full h-56 object-cover" data-astro-cid-y22iwnlk> <div class="absolute top-0 right-0 m-3" data-astro-cid-y22iwnlk> <span${addAttribute(`inline-block px-3 py-1 text-xs font-semibold rounded-full ${proyecto.dificultad === "F\xE1cil" ? "bg-green-100 text-green-800" : proyecto.dificultad === "Intermedio" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`, "class")} data-astro-cid-y22iwnlk> ${proyecto.dificultad} </span> </div> </div>`} <div class="p-6" data-astro-cid-y22iwnlk> <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3" data-astro-cid-y22iwnlk> ${proyecto.titulo} </h3> <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3" data-astro-cid-y22iwnlk> ${proyecto.descripcion} </p> <div class="flex justify-between items-center" data-astro-cid-y22iwnlk> <div class="text-sm text-gray-500 dark:text-gray-400" data-astro-cid-y22iwnlk> <span class="flex items-center" data-astro-cid-y22iwnlk> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-y22iwnlk> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-y22iwnlk></path> </svg> ${proyecto.tiempo_estimado} </span> </div> <a${addAttribute(`/proyectos/${proyecto.id}`, "href")} class="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium inline-flex items-center" data-astro-cid-y22iwnlk>
Ver proyecto
<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-y22iwnlk> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" data-astro-cid-y22iwnlk></path> </svg> </a> </div> </div> </div>`)} </div>`)} <!-- Mensaje de no hay proyectos --> <div id="no-proyectos-message" class="text-center py-10 hidden" data-astro-cid-y22iwnlk> <p class="text-xl text-gray-600 dark:text-gray-400" data-astro-cid-y22iwnlk>
Lo sentimos, aún no tenemos proyectos en esta dificultad.
</p> </div> </main> ` })} ${renderScript($$result, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/proyectos/index.astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/proyectos/index.astro", void 0);

const $$file = "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/proyectos/index.astro";
const $$url = "/proyectos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
