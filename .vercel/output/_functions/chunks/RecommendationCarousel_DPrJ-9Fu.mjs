import { a as createComponent, m as maybeRenderHead, r as renderScript, d as renderTemplate } from './astro/server_W1JgSjoG.mjs';

const $$RecommendationCarousel = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="recommendations-container mt-8"> <h3 class="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
Recomendado para ti
</h3> <div id="recommendations-list" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"> <!-- Aquí se cargarán dinámicamente las recomendaciones --> <div class="loader flex justify-center py-8"> <div class="animate-pulse flex space-x-4"> <div class="rounded-full bg-gray-300 dark:bg-gray-700 h-12 w-12"></div> <div class="flex-1 space-y-4 py-1"> <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div> <div class="space-y-2"> <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div> <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div> </div> </div> </div> </div> </div> </div> ${renderScript($$result, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/components/ui/RecommendationCarousel.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/components/ui/RecommendationCarousel.astro", void 0);

export { $$RecommendationCarousel as $ };
