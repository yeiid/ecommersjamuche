import { c as createAstro, a as createComponent, m as maybeRenderHead, b as addAttribute, r as renderScript, d as renderTemplate } from './astro/server_W1JgSjoG.mjs';
import { g as getAllEspecies } from './especiesStore_DaOR-YoS.mjs';

const $$Astro = createAstro("https://jamuchee.com");
const $$ProductForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProductForm;
  const especies = await getAllEspecies();
  const especiesList = Array.isArray(especies) ? especies : [];
  const { product = null } = Astro2.props;
  const isEditing = !!product;
  const defaultValues = {
    id: product?.id || "",
    name: product?.name || "",
    price: product?.price || 0,
    discountprice: product?.discountprice || 0,
    image: product?.image || "",
    description: product?.description || "",
    category: product?.category || "Aceites esenciales",
    stock: product?.stock || 10,
    isnew: product?.isnew || false,
    rating: product?.rating || 4,
    features: product?.features || [],
    ingredients: product?.ingredients || [],
    especieid: product?.especieid || ""
  };
  const categories = [
    "Aceites esenciales",
    "Cuidado de piel",
    "Infusiones",
    "Aromaterapia",
    "Productos capilares",
    "Suplementos"
  ];
  return renderTemplate`${maybeRenderHead()}<div class="max-w-4xl mx-auto"> <form id="product-form" class="space-y-6"> <!-- ID del producto (oculto si es nuevo) --> <input type="hidden" id="product-id" name="id"${addAttribute(defaultValues.id, "value")}> <!-- Notificación de error --> <div id="error-message" class="bg-red-50 border-l-4 border-red-500 p-4 mb-6 hidden"> <div class="flex"> <div class="flex-shrink-0"> <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path> </svg> </div> <div class="ml-3"> <p id="error-text" class="text-sm text-red-700">
Error al guardar el producto.
</p> </div> </div> </div> <!-- Información básica --> <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"> <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
Información Básica
</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <!-- Nombre del producto --> <div> <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
Nombre del producto *
</label> <input type="text" id="name" name="name"${addAttribute(defaultValues.name, "value")} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-900 dark:text-white" required> <div class="error-field text-red-500 text-xs mt-1 hidden" data-field="name"></div> </div> <!-- Categoría --> <div> <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
Categoría *
</label> <select id="category" name="category" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-900 dark:text-white" required> <option value="">Seleccionar categoría</option> ${categories.map((category) => renderTemplate`<option${addAttribute(category, "value")}${addAttribute(defaultValues.category === category, "selected")}> ${category} </option>`)} </select> <div class="error-field text-red-500 text-xs mt-1 hidden" data-field="category"></div> </div> <!-- Precio --> <div> <label for="price" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
Precio (COP) *
</label> <input type="number" id="price" name="price"${addAttribute(defaultValues.price, "value")} min="0" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-900 dark:text-white" required> <div class="error-field text-red-500 text-xs mt-1 hidden" data-field="price"></div> </div> <!-- Precio de descuento --> <div> <label for="discountprice" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
Precio de descuento
</label> <input type="number" id="discountprice" name="discountprice"${addAttribute(defaultValues.discountprice, "value")} min="0" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-900 dark:text-white"> <div class="error-field text-red-500 text-xs mt-1 hidden" data-field="discountprice"></div> </div> <!-- Stock --> <div> <label for="stock" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
Stock disponible *
</label> <input type="number" id="stock" name="stock"${addAttribute(defaultValues.stock, "value")} min="0" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-900 dark:text-white" required> <div class="error-field text-red-500 text-xs mt-1 hidden" data-field="stock"></div> </div> <!-- Calificación --> <div> <label for="rating" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
Calificación
</label> <input type="number" id="rating" name="rating"${addAttribute(defaultValues.rating, "value")} min="0" max="5" step="0.1" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-900 dark:text-white"> <div class="error-field text-red-500 text-xs mt-1 hidden" data-field="rating"></div> </div> <!-- URL de la imagen --> <div class="md:col-span-2"> <label for="image" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
URL de la imagen *
</label> <input type="text" id="image" name="image"${addAttribute(defaultValues.image, "value")} class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-900 dark:text-white" required> <div class="error-field text-red-500 text-xs mt-1 hidden" data-field="image"></div> </div> <!-- Especie relacionada --> <div class="md:col-span-2"> <label for="especieid" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
Especie relacionada
</label> <select id="especieid" name="especieid" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-900 dark:text-white"> <option value="">Seleccionar especie...</option> ${especiesList.map((especie) => renderTemplate`<option${addAttribute(especie.id, "value")}${addAttribute(defaultValues.especieid === especie.id, "selected")}> ${especie.nombre} </option>`)} </select> <div class="error-field text-red-500 text-xs mt-1 hidden" data-field="especieid"></div> </div> <!-- Descripción --> <div class="md:col-span-2"> <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
Descripción *
</label> <textarea id="description" name="description" rows="4" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-900 dark:text-white" required>${defaultValues.description}</textarea> <div class="error-field text-red-500 text-xs mt-1 hidden" data-field="description"></div> </div> </div> </div> <!-- Características y detalles adicionales --> <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"> <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
Características y Detalles
</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <!-- Producto nuevo --> <div class="flex items-center"> <input type="checkbox" id="isnew" name="isnew"${addAttribute(defaultValues.isnew, "checked")} class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"> <label for="isnew" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
Marcar como producto nuevo
</label> </div> <!-- Características --> <div class="md:col-span-2"> <label for="features" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
Características (una por línea)
</label> <textarea id="features" name="features" rows="4" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-900 dark:text-white">${defaultValues.features.join("\n")}</textarea> <div class="error-field text-red-500 text-xs mt-1 hidden" data-field="features"></div> </div> <!-- Ingredientes --> <div class="md:col-span-2"> <label for="ingredients" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
Ingredientes (uno por línea)
</label> <textarea id="ingredients" name="ingredients" rows="4" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-900 dark:text-white">${defaultValues.ingredients.join("\n")}</textarea> <div class="error-field text-red-500 text-xs mt-1 hidden" data-field="ingredients"></div> </div> </div> </div> <!-- Botones de acción --> <div class="flex justify-end space-x-3"> <a href="/admin/productos" class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
Cancelar
</a> <button type="submit" class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors flex items-center" id="submit-button"> <span id="submit-text">${isEditing ? "Actualizar Producto" : "Crear Producto"}</span> <span id="submit-spinner" class="hidden ml-2"> <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg> </span> </button> </div> </form> <!-- Notificaciones --> <div id="notifications" class="fixed top-4 right-4 z-50 space-y-2 max-w-md"></div> </div> ${renderScript($$result, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/components/admin/ProductForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/components/admin/ProductForm.astro", void 0);

export { $$ProductForm as $ };
