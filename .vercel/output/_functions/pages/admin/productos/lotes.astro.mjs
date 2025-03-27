/* empty css                                           */
import { a as createComponent, d as renderTemplate, r as renderScript, b as addAttribute, m as maybeRenderHead, e as renderComponent } from '../../../chunks/astro/server_W1JgSjoG.mjs';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_DPn-Xsdm.mjs';
export { renderers } from '../../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$BulkProductManager = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["import ", ' from "../../stores/productStore";\nimport ', ' from "../../stores/especiesStore";\nimport ', ` from '../../lib/bulkOperations.js';

// Obtener todos los productos y especies
const productos = await getAllProducts();
const especies = await getAllEspecies();

// Categor\xEDas disponibles
const categorias = [
  "Aceites esenciales",
  "Cuidado de piel",
  "Infusiones",
  "Aromaterapia",
  "Productos capilares",
  "Suplementos",
];
`, '<div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"> <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">\nGesti\xF3n de Productos en Lote\n</h2> <!-- Operaciones por lotes --> <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"> <div> <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">\nActualizaci\xF3n Masiva\n</h3> <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-md"> <div class="mb-4"> <label for="bulk-category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">\nCategor\xEDa a actualizar\n</label> <select id="bulk-category" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"> <option value="">Seleccionar categor\xEDa</option> ', ' </select> </div> <div class="mb-4"> <label for="bulk-field" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">\nCampo a actualizar\n</label> <select id="bulk-field" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"> <option value="">Seleccionar campo</option> <option value="discountPrice">Precio de descuento</option> <option value="stock">Stock</option> <option value="isNew">Marcar como nuevo</option> <option value="featured">Destacar producto</option> <option value="especieid">Especie relacionada</option> </select> </div> <div class="mb-4"> <label for="bulk-value" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">\nNuevo valor\n</label> <input type="text" id="bulk-value" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800" placeholder="Nuevo valor para el campo seleccionado"> </div> <button id="btn-bulk-update" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">\nActualizar en lote\n</button> </div> </div> <div> <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">\nEliminar Productos\n</h3> <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-md"> <div class="mb-4"> <label for="delete-condition" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">\nCondici\xF3n para eliminar\n</label> <select id="delete-condition" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"> <option value="">Seleccionar condici\xF3n</option> <option value="stock">Sin stock (stock = 0)</option> <option value="category">Por categor\xEDa</option> <option value="especie">Por especie</option> <option value="selected">Selecci\xF3n manual</option> </select> </div> <div id="condition-value-container" class="mb-4 hidden"> <label for="condition-value" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">\nValor de la condici\xF3n\n</label> <select id="condition-value" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"> <option value="">Seleccionar valor</option> </select> </div> <button id="btn-bulk-delete" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">\nEliminar productos\n</button> </div> </div> </div> <!-- Importaci\xF3n y exportaci\xF3n --> <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"> <div> <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">\nImportar Productos\n</h3> <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-md"> <div class="mb-4"> <label for="import-file" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">\nArchivo CSV/JSON\n</label> <input type="file" id="import-file" accept=".csv, .json" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"> </div> <button id="btn-import" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">\nImportar productos\n</button> </div> </div> <div> <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">\nExportar Productos\n</h3> <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-md"> <div class="mb-4"> <label for="export-format" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">\nFormato de exportaci\xF3n\n</label> <select id="export-format" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"> <option value="csv">CSV</option> <option value="json">JSON</option> </select> </div> <button id="btn-export" class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">\nExportar productos\n</button> </div> </div> </div> <!-- Resultados y visualizaci\xF3n --> <div class="mb-6"> <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">\nVista previa de productos seleccionados\n</h3> <div id="preview-container" class="bg-gray-50 dark:bg-gray-700 p-4 rounded-md min-h-40 max-h-80 overflow-y-auto"> <p class="text-gray-500 dark:text-gray-400 text-center">\nNo hay productos seleccionados\n</p> </div> </div> <!-- Mensajes y notificaciones --> <div id="notification" class="hidden bg-green-100 dark:bg-green-900 border-l-4 border-green-500 text-green-700 dark:text-green-200 p-4 rounded-md mb-6">\nOperaci\xF3n completada con \xE9xito.\n</div> </div> ', ' <!-- Datos para JavaScript --> <script id="productos-data" type="application/json">\n  {JSON.stringify(productos)}\n<\/script> <script id="especies-data" type="application/json">\n  {JSON.stringify(especies)}\n<\/script>'])), getAllProducts, getAllEspecies, (bulkInsertProducts, bulkUpdateProducts, bulkDeleteProducts, exportProducts), maybeRenderHead(), categorias.map((cat) => renderTemplate`<option${addAttribute(cat, "value")}>${cat}</option>`), renderScript($$result, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/components/admin/BulkProductManager.astro?astro&type=script&index=0&lang.ts"));
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/components/admin/BulkProductManager.astro", void 0);

const prerender = false;
const $$Lotes = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div> <div class="flex justify-between items-center mb-6"> <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
Gestión de Productos en Lote
</h1> <a href="/admin/productos" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 flex items-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg>
Volver a la lista
</a> </div> <div class="mb-6"> <p class="text-gray-600 dark:text-gray-300 mb-4">
Esta herramienta te permite realizar operaciones masivas sobre tus
        productos, como actualizar precios, gestionar stock, y más, todo en una
        sola operación.
</p> <p class="text-gray-600 dark:text-gray-300">
También puedes importar nuevos productos desde archivos CSV o JSON, y
        exportar tu catálogo actual.
</p> </div> ${renderComponent($$result2, "BulkProductManager", $$BulkProductManager, {})} </div> ` })}`;
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/admin/productos/lotes.astro", void 0);

const $$file = "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/admin/productos/lotes.astro";
const $$url = "/admin/productos/lotes";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Lotes,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
