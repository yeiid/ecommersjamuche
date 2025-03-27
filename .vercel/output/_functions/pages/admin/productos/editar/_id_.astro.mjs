/* empty css                                              */
import { c as createAstro, a as createComponent, e as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../../../../chunks/astro/server_W1JgSjoG.mjs';
import { $ as $$AdminLayout } from '../../../../chunks/AdminLayout_60b9Z0vy.mjs';
import { $ as $$ProductForm } from '../../../../chunks/ProductForm_Cdlu-eq2.mjs';
import { a as getProductById } from '../../../../chunks/productStore_Dh91h6xp.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro("https://jamuchee.com");
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const product = await getProductById(id);
  if (!product) {
    return Astro2.redirect("/admin/productos");
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div> <div class="flex justify-between items-center mb-6"> <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
Editar Producto
</h1> <a href="/admin/productos" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 flex items-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg>
Volver a la lista
</a> </div> ${renderComponent($$result2, "ProductForm", $$ProductForm, { "product": product })} </div> ` })}`;
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/admin/productos/editar/[id].astro", void 0);

const $$file = "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/admin/productos/editar/[id].astro";
const $$url = "/admin/productos/editar/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
