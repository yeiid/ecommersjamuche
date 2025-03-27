/* empty css                                     */
import { a as createComponent, e as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_W1JgSjoG.mjs';
import { $ as $$Layout } from '../chunks/Layout_CHj6NFB5.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const $$Especies = createComponent(($$result, $$props, $$slots) => {
  const especies = [
    {
      id: 1,
      nombre: "Aloe Vera",
      nombreCientifico: "Aloe barbadensis miller",
      imagen: "/especies/aloe-vera.jpg",
      descripcion: "Planta suculenta con propiedades medicinales y regeneradoras. Sus hojas contienen un gel que se utiliza en productos de cuidado personal y medicinal.",
      usos: [
        "Hidrataci\xF3n de la piel",
        "Tratamiento de quemaduras",
        "Productos medicinales",
        "Suplementos alimenticios"
      ],
      habitat: "Climas c\xE1lidos y secos, originaria de la Pen\xEDnsula Ar\xE1biga pero cultivada en todo el mundo."
    },
    {
      id: 2,
      nombre: "Lavanda",
      nombreCientifico: "Lavandula angustifolia",
      imagen: "/especies/lavanda.jpg",
      descripcion: "Planta arom\xE1tica de la familia de las lami\xE1ceas, conocida por su fragancia relajante y propiedades calmantes.",
      usos: [
        "Aceites esenciales",
        "Perfumer\xEDa",
        "Aromaterapia",
        "Productos de belleza y cuidado"
      ],
      habitat: "Regiones mediterr\xE1neas con suelos calc\xE1reos y bien drenados."
    },
    {
      id: 3,
      nombre: "Manzanilla",
      nombreCientifico: "Matricaria chamomilla",
      imagen: "/especies/manzanilla.jpg",
      descripcion: "Hierba medicinal con flores similares a margaritas peque\xF1as. Conocida por sus propiedades antiinflamatorias y calmantes.",
      usos: [
        "Infusiones medicinales",
        "Cosm\xE9ticos",
        "Tratamientos para la piel",
        "Productos capilares"
      ],
      habitat: "Crece en Europa, Asia occidental y norte de \xC1frica. Prefiere suelos bien drenados y sol directo."
    },
    {
      id: 4,
      nombre: "Eucalipto",
      nombreCientifico: "Eucalyptus globulus",
      imagen: "/especies/eucalipto.jpg",
      descripcion: "\xC1rbol de r\xE1pido crecimiento originario de Australia. Sus hojas contienen aceites esenciales con propiedades antis\xE9pticas y descongestionantes.",
      usos: [
        "Aceites esenciales",
        "Productos respiratorios",
        "Aromaterapia",
        "Productos de limpieza"
      ],
      habitat: "Nativo de Australia, adaptado a climas templados y subtropicales en todo el mundo."
    },
    {
      id: 5,
      nombre: "Romero",
      nombreCientifico: "Rosmarinus officinalis",
      imagen: "/especies/romero.jpg",
      descripcion: "Arbusto arom\xE1tico perenne de la familia de las lami\xE1ceas. Tiene propiedades antioxidantes y estimulantes.",
      usos: [
        "Cocina",
        "Aceites esenciales",
        "Productos capilares",
        "Medicina tradicional"
      ],
      habitat: "Nativo de la regi\xF3n mediterr\xE1nea, prefiere climas c\xE1lidos y suelos bien drenados."
    },
    {
      id: 6,
      nombre: "Cal\xE9ndula",
      nombreCientifico: "Calendula officinalis",
      imagen: "/especies/calendula.jpg",
      descripcion: "Planta herb\xE1cea anual con flores amarillas o naranjas. Conocida por sus propiedades antiinflamatorias y cicatrizantes.",
      usos: [
        "Tratamientos de piel",
        "Cosm\xE9ticos naturales",
        "Medicina tradicional",
        "Tinturas"
      ],
      habitat: "Originaria de Europa central, meridional y oriental. Se adapta a diversos climas templados."
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-poqp6pz2": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-12" data-astro-cid-poqp6pz2> <h1 class="text-3xl md:text-4xl font-bold mb-3 text-center text-gray-900 dark:text-white" data-astro-cid-poqp6pz2>
Nuestras Especies
</h1> <p class="text-gray-600 dark:text-gray-400 text-center mb-10 max-w-3xl mx-auto" data-astro-cid-poqp6pz2>
En JAMUCHEE trabajamos con especies seleccionadas por sus propiedades
      beneficiosas y alta calidad. Conoce más sobre las plantas que dan origen a
      nuestros productos naturales.
</p> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-astro-cid-poqp6pz2> ${especies.map((especie) => renderTemplate`<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105" data-astro-cid-poqp6pz2> <div class="relative h-48 bg-gray-200 dark:bg-gray-700" data-astro-cid-poqp6pz2> <div class="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400" data-astro-cid-poqp6pz2> <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-poqp6pz2> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-astro-cid-poqp6pz2></path> </svg> </div> </div> <div class="p-6" data-astro-cid-poqp6pz2> <div class="flex justify-between items-start mb-2" data-astro-cid-poqp6pz2> <h2 class="text-xl font-semibold text-gray-900 dark:text-white" data-astro-cid-poqp6pz2> ${especie.nombre} </h2> <span class="text-xs text-gray-500 dark:text-gray-400 italic" data-astro-cid-poqp6pz2> ${especie.nombreCientifico} </span> </div> <p class="text-gray-700 dark:text-gray-300 mb-4" data-astro-cid-poqp6pz2> ${especie.descripcion} </p> <div class="mb-4" data-astro-cid-poqp6pz2> <h3 class="font-medium text-gray-900 dark:text-white mb-2" data-astro-cid-poqp6pz2>
Usos principales:
</h3> <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1" data-astro-cid-poqp6pz2> ${especie.usos.map((uso) => renderTemplate`<li data-astro-cid-poqp6pz2>${uso}</li>`)} </ul> </div> <div data-astro-cid-poqp6pz2> <h3 class="font-medium text-gray-900 dark:text-white mb-2" data-astro-cid-poqp6pz2>
Hábitat natural:
</h3> <p class="text-gray-700 dark:text-gray-300" data-astro-cid-poqp6pz2> ${especie.habitat} </p> </div> </div> </div>`)} </div> <div class="mt-16 bg-primary-50 dark:bg-gray-800 p-8 rounded-lg" data-astro-cid-poqp6pz2> <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white text-center" data-astro-cid-poqp6pz2>
Compromiso con la Sostenibilidad
</h2> <div class="max-w-3xl mx-auto" data-astro-cid-poqp6pz2> <p class="text-gray-700 dark:text-gray-300 mb-4" data-astro-cid-poqp6pz2>
En JAMUCHEE estamos comprometidos con prácticas sostenibles y
          respetuosas con el medio ambiente. Nuestro proceso de cultivo y
          recolección sigue estas directrices:
</p> <div class="grid md:grid-cols-2 gap-6 mt-6" data-astro-cid-poqp6pz2> <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm" data-astro-cid-poqp6pz2> <h3 class="text-lg font-medium text-primary-600 dark:text-primary-400 mb-3" data-astro-cid-poqp6pz2>
Cultivo Responsable
</h3> <p class="text-gray-700 dark:text-gray-300" data-astro-cid-poqp6pz2>
Trabajamos con agricultores que utilizan métodos de cultivo
              orgánico, sin pesticidas ni fertilizantes químicos que dañen el
              ecosistema.
</p> </div> <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm" data-astro-cid-poqp6pz2> <h3 class="text-lg font-medium text-primary-600 dark:text-primary-400 mb-3" data-astro-cid-poqp6pz2>
Conservación de Especies
</h3> <p class="text-gray-700 dark:text-gray-300" data-astro-cid-poqp6pz2>
Promovemos la conservación de la biodiversidad y evitamos la
              sobreexplotación de especies vulnerables o en peligro de
              extinción.
</p> </div> <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm" data-astro-cid-poqp6pz2> <h3 class="text-lg font-medium text-primary-600 dark:text-primary-400 mb-3" data-astro-cid-poqp6pz2>
Comercio Justo
</h3> <p class="text-gray-700 dark:text-gray-300" data-astro-cid-poqp6pz2>
Garantizamos un precio justo a los productores locales, apoyando a
              las comunidades rurales y promoviendo prácticas laborales éticas.
</p> </div> <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm" data-astro-cid-poqp6pz2> <h3 class="text-lg font-medium text-primary-600 dark:text-primary-400 mb-3" data-astro-cid-poqp6pz2>
Embalaje Eco-amigable
</h3> <p class="text-gray-700 dark:text-gray-300" data-astro-cid-poqp6pz2>
Utilizamos materiales biodegradables o reciclables en nuestros
              empaques para reducir el impacto ambiental de nuestros productos.
</p> </div> </div> </div> </div> <div class="mt-16 text-center" data-astro-cid-poqp6pz2> <h2 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-white" data-astro-cid-poqp6pz2>
¿Quieres conocer nuestros productos?
</h2> <a href="/productos" class="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md transition-colors" data-astro-cid-poqp6pz2>
Ver catálogo de productos
</a> </div> </div> ` })} `;
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/especies.astro", void 0);

const $$file = "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/especies.astro";
const $$url = "/especies";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Especies,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
