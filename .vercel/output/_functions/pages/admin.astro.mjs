/* empty css                                     */
import { c as createAstro, a as createComponent, d as renderTemplate, r as renderScript, b as addAttribute, m as maybeRenderHead, g as renderHead, e as renderComponent } from '../chunks/astro/server_W1JgSjoG.mjs';
import { t as testSupabaseConnection, s as supabase, c as connectionState } from '../chunks/supabase_DCsDQftD.mjs';
import { i as isAuthenticated } from '../chunks/authStore_BVdcuBHI.mjs';
/* empty css                                     */
/* empty css                                 */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://jamuchee.com");
const $$LoginForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LoginForm;
  let errorMessage = "";
  let loadingState = false;
  let connectionError = null;
  let retryCount = 0;
  async function checkConnection() {
    try {
      const connectionStatus = await testSupabaseConnection();
      if (!connectionStatus.success) {
        connectionError = connectionStatus.error;
        retryCount = connectionState.retryCount;
      }
      return connectionStatus;
    } catch (err) {
      console.error("Error al verificar conexi\xF3n inicial:", err);
      return { success: false, error: err };
    }
  }
  if (Astro2.request.method === "GET") {
    await checkConnection();
  }
  if (Astro2.request.method === "POST") {
    loadingState = true;
    try {
      const formData = await Astro2.request.formData();
      const email = formData.get("email")?.toString() || "";
      const password = formData.get("password")?.toString() || "";
      const connectionStatus = await testSupabaseConnection();
      if (!connectionStatus.success) {
        throw new Error(
          `Error de conexi\xF3n: No se puede conectar con Supabase. ${connectionStatus.error?.message || ""}`
        );
      }
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) {
        throw error;
      }
      isAuthenticated.set(true);
      return Astro2.redirect("/admin/dashboard");
    } catch (error) {
      console.error("Error en inicio de sesi\xF3n:", error);
      if (typeof error === "object" && error !== null) {
        if ("message" in error && typeof error.message === "string" && error.message.includes("fetch failed")) {
          errorMessage = "Error de conexi\xF3n: No se pudo conectar con el servidor de Supabase. Por favor, verifica tu conexi\xF3n a internet o int\xE9ntalo de nuevo m\xE1s tarde.";
        } else if ("message" in error && typeof error.message === "string") {
          const errorMsg = error.message;
          if (errorMsg.includes("Invalid login credentials")) {
            errorMessage = "Credenciales inv\xE1lidas: El correo electr\xF3nico o la contrase\xF1a son incorrectos.";
          } else if (errorMsg.includes("Error de conexi\xF3n")) {
            errorMessage = errorMsg;
          } else {
            errorMessage = `Error: ${errorMsg}`;
          }
        } else {
          errorMessage = "Error desconocido al iniciar sesi\xF3n.";
        }
      } else {
        errorMessage = "Error desconocido al iniciar sesi\xF3n.";
      }
    } finally {
      loadingState = false;
    }
  }
  return renderTemplate(_a || (_a = __template(["", '<div class="flex min-h-screen bg-gray-100 dark:bg-gray-900"> <!-- Incluir script de acceso administrador --> <script src="/admin-access.js"><\/script> <!-- Contenedor centrado para el formulario (funciona en todas las pantallas) --> <div class="w-full max-w-md mx-auto my-auto p-6"> <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"> <div class="p-6 sm:p-8"> <div class="text-center mb-6"> <img src="/logo.svg" alt="JAMUCHEE" class="h-12 mx-auto mb-4"> <h2 class="text-2xl font-bold text-gray-900 dark:text-white">\nIniciar Sesi\xF3n\n</h2> <p class="text-gray-600 dark:text-gray-400 mt-1">\nPanel de Administraci\xF3n JAMUCHEE\n</p> </div> ', " ", ' <form id="login-form" class="space-y-6"> <div> <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">\nCorreo electr\xF3nico\n</label> <input type="email" id="email" name="email" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-900 dark:text-white" required value="admin@jamuchee.com"> </div> <div> <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">\nContrase\xF1a\n</label> <input type="password" id="password" name="password" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-900 dark:text-white" required value="admin123"> </div> <div> <button type="submit" id="login-button" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"', '> <span id="login-text">Iniciar sesi\xF3n</span> <span id="login-spinner"', '> <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg>\nProcesando...\n</span> </button> </div> <div class="flex items-center mt-2"> <div class="flex items-center flex-1"> <input id="remember-me" name="remember-me" type="checkbox" checked class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800"> <label for="remember-me" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">\nRecordarme\n</label> </div> <a href="#" class="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">\nAyuda\n</a> </div> </form> <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-center"> <p class="text-sm text-gray-600 dark:text-gray-400">\n\xA9 ', " JAMUCHEE - Todos los derechos reservados\n</p> </div> </div> </div> </div> </div> ", ""])), maybeRenderHead(), connectionError && renderTemplate`<div class="bg-amber-100 border-l-4 border-amber-500 text-amber-700 p-4 mb-4" role="alert"> <p class="font-bold">Advertencia de conexión</p> <p>
Detectamos problemas para conectar con el servidor de Supabase.
${connectionState.retryCount > 0 && renderTemplate`<span>
Intentos de reconexión: ${connectionState.retryCount} de 3
</span>`} </p> <button id="retry-connection" class="mt-2 bg-amber-500 hover:bg-amber-600 text-white py-1 px-3 rounded text-sm">
Probar conexión
</button> </div>`, errorMessage && renderTemplate`<div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert"> <p id="error-message-text">${errorMessage}</p> </div>`, addAttribute(loadingState, "disabled"), addAttribute(loadingState ? "" : "hidden", "class"), (/* @__PURE__ */ new Date()).getFullYear(), renderScript($$result, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/components/admin/LoginForm.astro?astro&type=script&index=0&lang.ts"));
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/components/admin/LoginForm.astro", void 0);

const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const isDevelopment = false;
  return renderTemplate`<html lang="es" data-astro-cid-u2h3djql> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Admin Login | JAMUCHEE</title><link rel="icon" href="/favicon.svg" type="image/svg+xml">${renderHead()}</head> <body class="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center" data-astro-cid-u2h3djql> <div class="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md" data-astro-cid-u2h3djql> <div class="text-center mb-8" data-astro-cid-u2h3djql> <a href="/" class="inline-block" data-astro-cid-u2h3djql> <img src="/logo.svg" alt="JAMUCHEE" class="h-12 mx-auto mb-2" data-astro-cid-u2h3djql> </a> <h1 class="text-2xl font-bold text-gray-900 dark:text-white" data-astro-cid-u2h3djql>
Panel Administrativo
</h1> <p class="text-gray-600 dark:text-gray-300 mt-2" data-astro-cid-u2h3djql>
Ingresa tus credenciales para acceder
</p> </div> ${isDevelopment} ${renderComponent($$result, "LoginForm", $$LoginForm, { "data-astro-cid-u2h3djql": true })} <div class="text-center mt-6" data-astro-cid-u2h3djql> <a href="/" class="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300" data-astro-cid-u2h3djql>
Volver a la tienda
</a> </div> </div> ${renderScript($$result, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/admin/index.astro?astro&type=script&index=0&lang.ts")} </body> </html> `;
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/admin/index.astro", void 0);
const $$file = "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
