/* empty css                                        */
import { a as createComponent, e as renderComponent, r as renderScript, d as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_W1JgSjoG.mjs';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_DPn-Xsdm.mjs';
import { g as getAllProducts } from '../../chunks/productStore_DtJKtsz8.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const products = await getAllProducts();
  const productsList = Array.isArray(products) ? products : [];
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div> <div class="flex justify-between items-center mb-6"> <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
Gestión de Productos
</h1> <a href="/admin/productos/nuevo" class="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md inline-flex items-center transition-colors"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg>
Nuevo Producto
</a> </div> <!-- Filtros y búsqueda --> <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6"> <div class="flex flex-col md:flex-row gap-4"> <div class="flex-1"> <label for="search" class="sr-only">Buscar</label> <div class="relative"> <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"> <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path> </svg> </div> <input id="search-input" type="text" class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="Buscar productos..."> </div> </div> <div class="flex space-x-2"> <select id="category-filter" class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-900 dark:text-white"> <option value="">Todas las categorías</option> <option value="Aceites esenciales">Aceites esenciales</option> <option value="Cuidado de piel">Cuidado de piel</option> <option value="Infusiones">Infusiones</option> <option value="Aromaterapia">Aromaterapia</option> </select> <select id="status-filter" class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-gray-900 dark:text-white"> <option value="">Todos los estados</option> <option value="offer">En oferta</option> <option value="new">Nuevos</option> <option value="normal">Normales</option> </select> </div> </div> </div> <!-- Notificaciones --> <div id="notifications" class="fixed top-4 right-4 z-50 space-y-2 max-w-md"></div> <!-- Tabla de productos --> <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"> <div class="overflow-x-auto"> <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700" id="products-table"> <thead class="bg-gray-50 dark:bg-gray-700"> <tr> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Producto</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Categoría</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Precio</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estado</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Stock</th> <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th> </tr> </thead> <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"> ${productsList.map((product) => renderTemplate`<tr class="hover:bg-gray-50 dark:hover:bg-gray-700"${addAttribute(product.id, "data-id")}${addAttribute(product.category, "data-category")}${addAttribute(product.name.toLowerCase(), "data-name")}${addAttribute(
    product.discountPrice > 0 ? "offer" : product.isNew ? "new" : "normal",
    "data-status"
  )}> <td class="px-6 py-4 whitespace-nowrap"> <div class="flex items-center"> <div class="flex-shrink-0 h-10 w-10"> <img class="h-10 w-10 rounded-md object-cover"${addAttribute(product.image, "src")}${addAttribute(product.name, "alt")}> </div> <div class="ml-4"> <div class="text-sm font-medium text-gray-900 dark:text-white"> ${product.name} </div> <div class="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs"> ${product.description.substring(0, 60)}...
</div> </div> </div> </td> <td class="px-6 py-4 whitespace-nowrap"> <div class="text-sm text-gray-900 dark:text-white"> ${product.category} </div> </td> <td class="px-6 py-4 whitespace-nowrap"> ${product.discountPrice > 0 ? renderTemplate`<div> <div class="text-sm text-gray-500 dark:text-gray-400 line-through">
$${product.price.toLocaleString("es-CO")} </div> <div class="text-sm font-medium text-gray-900 dark:text-white">
$${product.discountPrice.toLocaleString("es-CO")} </div> </div>` : renderTemplate`<div class="text-sm text-gray-900 dark:text-white">
$${product.price.toLocaleString("es-CO")} </div>`} </td> <td class="px-6 py-4 whitespace-nowrap"> ${product.discountPrice > 0 ? renderTemplate`<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
Oferta
</span>` : product.isNew ? renderTemplate`<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
Nuevo
</span>` : renderTemplate`<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
Normal
</span>`} </td> <td class="px-6 py-4 whitespace-nowrap"> <div class="text-sm text-gray-900 dark:text-white"> ${product.stock} </div> </td> <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"> <div class="flex justify-end space-x-2"> <a${addAttribute(`/admin/productos/editar/${product.id}`, "href")} class="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path> </svg> </a> <button class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 delete-product"${addAttribute(product.id, "data-id")}> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path> </svg> </button> </div> </td> </tr>`)} </tbody> </table> </div> <!-- Estado vacío --> ${productsList.length === 0 && renderTemplate`<div class="text-center py-10"> <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path> </svg> <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">
No hay productos
</h3> <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
Comienza añadiendo un nuevo producto.
</p> <div class="mt-6"> <a href="/admin/productos/nuevo" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"> <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg>
Nuevo Producto
</a> </div> </div>`} </div> </div>  <div id="delete-modal" class="hidden fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true"> <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"> <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div> <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span> <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"> <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4"> <div class="sm:flex sm:items-start"> <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"> <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path> </svg> </div> <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"> <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
Eliminar producto
</h3> <div class="mt-2"> <p class="text-sm text-gray-500 dark:text-gray-400">
¿Estás seguro de que quieres eliminar este producto? Esta
                  acción no se puede deshacer.
</p> </div> </div> </div> </div> <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"> <button type="button" id="confirm-delete" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
Eliminar
</button> <button type="button" id="cancel-delete" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
Cancelar
</button> </div> </div> </div> </div> ` })} ${renderScript($$result, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/admin/productos/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/admin/productos/index.astro", void 0);

const $$file = "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/admin/productos/index.astro";
const $$url = "/admin/productos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
