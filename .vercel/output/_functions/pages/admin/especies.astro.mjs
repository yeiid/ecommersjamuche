/* empty css                                        */
import { c as createAstro, a as createComponent, e as renderComponent, r as renderScript, d as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_W1JgSjoG.mjs';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_DPn-Xsdm.mjs';
import { i as isAuthenticated } from '../../chunks/authStore_BVdcuBHI.mjs';
import { g as getAllEspecies } from '../../chunks/especiesStore_DaOR-YoS.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://jamuchee.com");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  let authValue = false;
  const unsubscribe = isAuthenticated.subscribe((value) => {
    authValue = value;
  });
  unsubscribe();
  if (!authValue && Astro2.request.headers.get("sec-fetch-dest") !== "document") {
    return Astro2.redirect("/admin");
  }
  const especies = await getAllEspecies();
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div> <div class="flex justify-between items-center mb-6"> <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
Gestión de Especies
</h1> <a href="/admin/especies/nuevo" class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg"> <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path> </svg>
Nueva Especie
</a> </div> <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"> <div class="overflow-x-auto"> <table class="w-full text-sm text-left text-gray-700 dark:text-gray-300"> <thead class="text-xs uppercase bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"> <tr> <th scope="col" class="px-6 py-3">ID</th> <th scope="col" class="px-6 py-3">Nombre</th> <th scope="col" class="px-6 py-3">Nombre Científico</th> <th scope="col" class="px-6 py-3">Imagen</th> <th scope="col" class="px-6 py-3">Productos</th> <th scope="col" class="px-6 py-3">Acciones</th> </tr> </thead> <tbody> ${especies.map((especie) => renderTemplate`<tr class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"> <td class="px-6 py-4">${especie.id}</td> <td class="px-6 py-4">${especie.nombre}</td> <td class="px-6 py-4 italic">${especie.nombreCientifico}</td> <td class="px-6 py-4"> ${especie.imagen && renderTemplate`<img${addAttribute(especie.imagen, "src")}${addAttribute(especie.nombre, "alt")} class="h-12 w-16 object-cover rounded">`} </td> <td class="px-6 py-4">${especie.productCount || 0}</td> <td class="px-6 py-4 flex space-x-2"> <a${addAttribute(`/admin/especies/editar/${especie.id}`, "href")} class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path> </svg> </a> <button class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 delete-especie"${addAttribute(especie.id, "data-id")}> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path> </svg> </button> </td> </tr>`)} </tbody> </table> </div> </div> </div>  <div id="deleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden"> <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"> <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
Confirmar eliminación
</h3> <p class="text-gray-700 dark:text-gray-300 mb-6">
¿Estás seguro de que deseas eliminar esta especie? Esta acción no se
        puede deshacer.
</p> <div class="flex justify-end space-x-4"> <button id="cancelDelete" class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg">Cancelar</button> <button id="confirmDelete" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">Eliminar</button> </div> </div> </div> ` })} ${renderScript($$result, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/admin/especies/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/admin/especies/index.astro", void 0);
const $$file = "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/admin/especies/index.astro";
const $$url = "/admin/especies";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
