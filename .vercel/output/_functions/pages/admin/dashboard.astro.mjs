/* empty css                                        */
import { c as createAstro, a as createComponent, e as renderComponent, r as renderScript, d as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_W1JgSjoG.mjs';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_60b9Z0vy.mjs';
import { i as isAuthenticated } from '../../chunks/authStore_BVdcuBHI.mjs';
import { g as getAllProducts } from '../../chunks/productStore_Dh91h6xp.mjs';
import { g as getAllEspecies } from '../../chunks/especiesStore_DaOR-YoS.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://jamuchee.com");
const prerender = false;
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const isDevelopment = false;
  let authValue = false;
  const unsubscribe = isAuthenticated.subscribe((value) => {
    authValue = value;
  });
  unsubscribe();
  if (!authValue && Astro2.request.headers.get("sec-fetch-dest") === "document") {
    console.log("Redirigiendo al login desde dashboard - no autenticado");
    return Astro2.redirect("/admin");
  }
  let products = [];
  let especies = [];
  let totalProducts = 0;
  let totalEspecies = 0;
  let productsWithDiscount = 0;
  let newProducts = 0;
  let recentProducts = [];
  try {
    if (isDevelopment) ; else {
      products = await getAllProducts();
      especies = await getAllEspecies();
    }
    totalProducts = products.length;
    totalEspecies = especies.length;
    productsWithDiscount = products.filter((p) => p.discountPrice > 0).length;
    newProducts = products.filter((p) => p.isNew).length;
    recentProducts = products.slice(0, 5);
  } catch (error) {
    console.error("Error al cargar datos para el dashboard:", error);
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div> ${isDevelopment} <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
Dashboard
</h1> <!-- Estadísticas --> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"> <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"> <div class="flex items-center"> <div class="p-3 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 mr-4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path> </svg> </div> <div> <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">
Productos Totales
</p> <p class="text-2xl font-bold text-gray-900 dark:text-white"> ${totalProducts} </p> </div> </div> </div> <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"> <div class="flex items-center"> <div class="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 mr-4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path> </svg> </div> <div> <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">
Especies Totales
</p> <p class="text-2xl font-bold text-gray-900 dark:text-white"> ${totalEspecies} </p> </div> </div> </div> <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"> <div class="flex items-center"> <div class="p-3 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 mr-4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> </div> <div> <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">
Productos en Oferta
</p> <p class="text-2xl font-bold text-gray-900 dark:text-white"> ${productsWithDiscount} </p> </div> </div> </div> <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"> <div class="flex items-center"> <div class="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 mr-4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path> </svg> </div> <div> <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">
Productos Nuevos
</p> <p class="text-2xl font-bold text-gray-900 dark:text-white"> ${newProducts} </p> </div> </div> </div> </div> <!-- Acciones rápidas --> <div class="mb-8"> <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">
Acciones Rápidas
</h2> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"> <a href="/admin/productos/nuevo" class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-4 flex items-center shadow-md transition-colors"> <div class="p-2 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 mr-3"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg> </div> <span class="text-gray-800 dark:text-white font-medium">Nuevo Producto</span> </a> <a href="/admin/especies/nueva" class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-4 flex items-center shadow-md transition-colors"> <div class="p-2 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 mr-3"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg> </div> <span class="text-gray-800 dark:text-white font-medium">Nueva Especie</span> </a> <a href="/admin/productos" class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-4 flex items-center shadow-md transition-colors"> <div class="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 mr-3"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path> </svg> </div> <span class="text-gray-800 dark:text-white font-medium">Gestionar Productos</span> </a> <a href="/admin/pedidos" class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-4 flex items-center shadow-md transition-colors"> <div class="p-2 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 mr-3"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path> </svg> </div> <span class="text-gray-800 dark:text-white font-medium">Ver Pedidos</span> </a> </div> </div> <!-- Productos recientes --> <div> <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">
Productos Recientes
</h2> <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"> <div class="overflow-x-auto"> <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"> <thead class="bg-gray-50 dark:bg-gray-700"> <tr> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Producto</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Precio</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estado</th> <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Stock</th> <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th> </tr> </thead> <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700"> ${recentProducts.map((product) => renderTemplate`<tr class="hover:bg-gray-50 dark:hover:bg-gray-700"> <td class="px-6 py-4 whitespace-nowrap"> <div class="flex items-center"> <div class="flex-shrink-0 h-10 w-10"> <img class="h-10 w-10 rounded-md object-cover"${addAttribute(product.image, "src")}${addAttribute(product.name, "alt")}> </div> <div class="ml-4"> <div class="text-sm font-medium text-gray-900 dark:text-white"> ${product.name} </div> <div class="text-sm text-gray-500 dark:text-gray-400"> ${product.category} </div> </div> </div> </td> <td class="px-6 py-4 whitespace-nowrap"> ${product.discountPrice > 0 ? renderTemplate`<div> <div class="text-sm text-gray-500 dark:text-gray-400 line-through">
$${product.price.toLocaleString("es-CO")} </div> <div class="text-sm font-medium text-gray-900 dark:text-white">
$${product.discountPrice.toLocaleString("es-CO")} </div> </div>` : renderTemplate`<div class="text-sm font-medium text-gray-900 dark:text-white">
$${product.price.toLocaleString("es-CO")} </div>`} </td> <td class="px-6 py-4 whitespace-nowrap"> ${product.discountPrice > 0 ? renderTemplate`<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
Oferta
</span>` : product.isNew ? renderTemplate`<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
Nuevo
</span>` : renderTemplate`<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
Normal
</span>`} </td> <td class="px-6 py-4 whitespace-nowrap"> <div class="text-sm text-gray-900 dark:text-white"> ${product.stock} </div> </td> <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"> <a${addAttribute(`/admin/productos/editar/${product.id}`, "href")} class="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 mr-3">
Editar
</a> <a${addAttribute(`/producto/${product.id}`, "href")} class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" target="_blank">
Ver
</a> </td> </tr>`)} </tbody> </table> </div> <div class="bg-gray-50 dark:bg-gray-700 px-6 py-3 border-t border-gray-200 dark:border-gray-800"> <a href="/admin/productos" class="text-primary-600 hover:text-primary-500 dark:text-primary-400 text-sm font-medium">
Ver todos los productos →
</a> </div> </div> </div> </div> ` })} ${renderScript($$result, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/admin/dashboard.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/admin/dashboard.astro", void 0);
const $$file = "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/admin/dashboard.astro";
const $$url = "/admin/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
