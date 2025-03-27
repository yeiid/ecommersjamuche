/* empty css                                        */
import { c as createAstro, a as createComponent, e as renderComponent, r as renderScript, d as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../../chunks/astro/server_W1JgSjoG.mjs';
import { $ as $$Layout } from '../../chunks/Layout_CHj6NFB5.mjs';
import { a as supabaseUrl } from '../../chunks/supabase_DCsDQftD.mjs';
import { i as isAuthenticated } from '../../chunks/authStore_BVdcuBHI.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://jamuchee.com");
const $$Diagnostico = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Diagnostico;
  let authValue = false;
  const unsubscribe = isAuthenticated.subscribe((value) => {
    authValue = value;
  });
  unsubscribe();
  if (!authValue && Astro2.request.headers.get("sec-fetch-dest") !== "document") {
    return Astro2.redirect("/admin");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Diagnóstico del Sistema - JAMUCHEE" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-8"> <div class="max-w-4xl mx-auto"> <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
Herramientas de Diagnóstico del Sistema
</h1> <!-- Información de configuración --> <section class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8"> <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
Información de Configuración
</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"> <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-md"> <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
Entorno
</p> <p class="font-medium text-gray-900 dark:text-white"> ${"Producción"} </p> </div> <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-md"> <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
Supabase URL
</p> <p class="font-medium text-gray-900 dark:text-white break-all"> ${supabaseUrl} </p> </div> <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-md"> <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
Supabase Anon Key
</p> <p class="font-medium text-gray-900 dark:text-white"> ${"Configurado correctamente" } </p> </div> <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-md"> <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
Service Role Key
</p> <p class="font-medium text-gray-900 dark:text-white"> ${"Configurado correctamente" } </p> </div> </div> </section> <!-- Pruebas de conectividad --> <section class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8"> <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
Pruebas de Conectividad
</h2> <div class="space-y-6"> <!-- Prueba 1: Conexión básica --> <div> <h3 class="font-medium text-gray-900 dark:text-white mb-2">
1. Conexión básica con Supabase
</h3> <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">
Verifica si se puede establecer una conexión básica con el
              servidor de Supabase.
</p> <div class="flex space-x-3 mb-2"> <button id="test-connection" class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md">
Probar conexión
</button> </div> <div id="connection-result" class="hidden p-4 rounded-md mt-2"></div> </div> <!-- Prueba 2: Autenticación --> <div> <h3 class="font-medium text-gray-900 dark:text-white mb-2">
2. Verificar sesión de autenticación
</h3> <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">
Comprueba si existe una sesión de autenticación válida.
</p> <div class="flex space-x-3 mb-2"> <button id="test-auth" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
Verificar autenticación
</button> </div> <div id="auth-result" class="hidden p-4 rounded-md mt-2"></div> </div> <!-- Prueba 3: Acceso a la base de datos --> <div> <h3 class="font-medium text-gray-900 dark:text-white mb-2">
3. Acceso a la base de datos
</h3> <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">
Intenta consultar la tabla de especies para verificar el acceso a
              datos.
</p> <div class="flex space-x-3 mb-2"> <button id="test-db" class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md">
Probar acceso a datos
</button> </div> <div id="db-result" class="hidden p-4 rounded-md mt-2"></div> </div> </div> </section> <!-- Enlaces útiles --> <section class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"> <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
Enlaces Útiles
</h2> <ul class="space-y-2 list-disc pl-5 text-gray-600 dark:text-gray-400"> <li> <a${addAttribute(supabaseUrl, "href")} target="_blank" class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 underline">
Panel de control de Supabase
</a> </li> <li> <a href="https://supabase.com/docs" target="_blank" class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 underline">
Documentación de Supabase
</a> </li> <li> <a href="/admin/dashboard" class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 underline">
Volver al Dashboard
</a> </li> </ul> </section> </div> </div> ` })} ${renderScript($$result, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/admin/diagnostico.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/admin/diagnostico.astro", void 0);
const $$file = "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/admin/diagnostico.astro";
const $$url = "/admin/diagnostico";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Diagnostico,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
