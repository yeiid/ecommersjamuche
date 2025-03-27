/* empty css                                              */
import { c as createAstro, a as createComponent, e as renderComponent, r as renderScript, d as renderTemplate, m as maybeRenderHead } from '../../../../chunks/astro/server_W1JgSjoG.mjs';
import { $ as $$AdminLayout } from '../../../../chunks/AdminLayout_DPn-Xsdm.mjs';
import { $ as $$EspecieForm } from '../../../../chunks/EspecieForm_ClmrENFR.mjs';
import { i as isAuthenticated } from '../../../../chunks/authStore_BVdcuBHI.mjs';
import { a as getEspecieById } from '../../../../chunks/especiesStore_DaOR-YoS.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro("https://jamuchee.com");
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  let isAuth = false;
  if (typeof isAuthenticated !== "undefined") {
    isAuthenticated.subscribe((value) => {
      isAuth = value;
    })();
  }
  if (!isAuth && Astro2.request.headers.get("sec-fetch-dest") !== "document") {
    return Astro2.redirect("/admin");
  }
  const { id } = Astro2.params;
  const especie = await getEspecieById(id);
  if (!especie) {
    return Astro2.redirect("/admin/especies");
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div> <div class="flex justify-between items-center mb-6"> <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
Editar Especie
</h1> <a href="/admin/especies" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 flex items-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg>
Volver a la lista
</a> </div> ${renderComponent($$result2, "EspecieForm", $$EspecieForm, { "especie": especie })} </div> ` })} ${renderScript($$result, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/admin/especies/editar/[id].astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/admin/especies/editar/[id].astro", void 0);
const $$file = "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/admin/especies/editar/[id].astro";
const $$url = "/admin/especies/editar/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
