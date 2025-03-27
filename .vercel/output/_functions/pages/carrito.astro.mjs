/* empty css                                     */
import { a as createComponent, e as renderComponent, r as renderScript, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_W1JgSjoG.mjs';
import { $ as $$Layout } from '../chunks/Layout_CHj6NFB5.mjs';
import { $ as $$Button } from '../chunks/Button_0F-bVXWL.mjs';
export { renderers } from '../renderers.mjs';

const $$Carrito = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Carrito de Compras | JAMUCHEE" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-12"> <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
Carrito de Compras
</h1> <div id="cart-container" class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <!-- Lista de productos --> <div id="cart-items" class="lg:col-span-2 space-y-4"> <div id="empty-cart-message" class="hidden text-center py-8"> <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path> </svg> <p class="text-xl font-medium text-gray-600 dark:text-gray-400">
Tu carrito está vacío
</p> <div class="mt-6"> <a href="/productos" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
Ver productos
</a> </div> </div> <!-- Mensaje de error del carrito --> <div id="cart-error" class="hidden bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md"> <div class="flex items-center"> <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path> </svg> <span id="cart-error-message">Error en el carrito</span> </div> </div> <!-- Aquí se cargarán dinámicamente los productos --> <div id="cart-items-container"></div> </div> <!-- Resumen del pedido --> <div class="lg:col-span-1"> <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"> <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
Resumen del pedido
</h2> <div class="space-y-3 mb-6"> <div class="flex justify-between"> <span class="text-gray-600 dark:text-gray-400">Subtotal</span> <span id="cart-subtotal" class="font-medium text-gray-800 dark:text-white">$0</span> </div> <div class="flex justify-between"> <span class="text-gray-600 dark:text-gray-400">Envío</span> <span class="font-medium text-gray-800 dark:text-white">Calculado en el checkout</span> </div> <div class="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3"> <div class="flex justify-between"> <span class="font-semibold text-gray-800 dark:text-white">Total</span> <span id="cart-total" class="font-semibold text-gray-800 dark:text-white">$0</span> </div> </div> </div> ${renderComponent($$result2, "Button", $$Button, { "id": "checkout-button", "fullWidth": true, "disabled": true, "class": "mb-4" }, { "default": ($$result3) => renderTemplate`
Proceder al pago
` })} ${renderComponent($$result2, "Button", $$Button, { "id": "whatsapp-button", "variant": "accent", "fullWidth": true, "disabled": true, "class": "mb-4" }, { "default": ($$result3) => renderTemplate` <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24"> <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path> </svg>
Pedir por WhatsApp
` })} <a href="/productos" class="block text-center text-primary-600 dark:text-primary-400 hover:underline">
Continuar comprando
</a> </div> </div> </div> </div> ` })} ${renderScript($$result, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/carrito.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/carrito.astro", void 0);

const $$file = "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/carrito.astro";
const $$url = "/carrito";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Carrito,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
