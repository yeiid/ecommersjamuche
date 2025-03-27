import { c as createAstro, a as createComponent, m as maybeRenderHead, b as addAttribute, r as renderScript, d as renderTemplate } from './astro/server_W1JgSjoG.mjs';
import { s as saveEspecie } from './especiesStore_DaOR-YoS.mjs';

const $$Astro = createAstro("https://jamuchee.com");
const $$EspecieForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$EspecieForm;
  const { especie } = Astro2.props;
  const defaultValues = {
    id: especie?.id || "",
    nombre: especie?.nombre || "",
    nombreCientifico: especie?.nombreCientifico || "",
    familia: especie?.familia || "",
    origen: especie?.origen || "",
    descripcion: especie?.descripcion || "",
    propiedades: especie?.propiedades || "",
    usos: especie?.usos || "",
    imagen: especie?.imagen || "",
    imagenDetalle: especie?.imagenDetalle || ""
  };
  let error = "";
  if (Astro2.request.method === "POST") {
    try {
      const formData = await Astro2.request.formData();
      const especieData = {
        id: formData.get("id")?.toString() || crypto.randomUUID(),
        nombre: formData.get("nombre")?.toString() || "",
        nombreCientifico: formData.get("nombreCientifico")?.toString() || "",
        familia: formData.get("familia")?.toString() || "",
        origen: formData.get("origen")?.toString() || "",
        descripcion: formData.get("descripcion")?.toString() || "",
        propiedades: formData.get("propiedades")?.toString() || "",
        usos: formData.get("usos")?.toString() || "",
        imagen: formData.get("imagen")?.toString() || "",
        imagenDetalle: formData.get("imagenDetalle")?.toString() || ""
      };
      await saveEspecie(especieData);
      return Astro2.redirect("/admin/especies");
    } catch (e) {
      console.error("Error al guardar la especie:", e);
      error = "Error al guardar la especie. Por favor, intenta nuevamente.";
    }
  }
  return renderTemplate`${maybeRenderHead()}<div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"> ${error && renderTemplate`<div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert"> <p>${error}</p> </div>`} <form method="POST" id="especieForm" class="space-y-6"> <!-- ID oculto para edición --> <input type="hidden" name="id"${addAttribute(defaultValues.id, "value")}> <!-- Nombre de la especie --> <div> <label for="nombre" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
Nombre de la Especie *
</label> <input type="text" id="nombre" name="nombre"${addAttribute(defaultValues.nombre, "value")} required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"> </div> <!-- Nombre Científico --> <div> <label for="nombreCientifico" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
Nombre Científico *
</label> <input type="text" id="nombreCientifico" name="nombreCientifico"${addAttribute(defaultValues.nombreCientifico, "value")} required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white italic"> </div> <!-- Familia --> <div> <label for="familia" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
Familia
</label> <input type="text" id="familia" name="familia"${addAttribute(defaultValues.familia, "value")} class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"> </div> <!-- Origen --> <div> <label for="origen" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
Origen
</label> <input type="text" id="origen" name="origen"${addAttribute(defaultValues.origen, "value")} class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"> </div> <!-- Descripción --> <div> <label for="descripcion" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
Descripción *
</label> <textarea id="descripcion" name="descripcion" rows="4" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white">${defaultValues.descripcion}</textarea> </div> <!-- Propiedades --> <div> <label for="propiedades" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
Propiedades
</label> <textarea id="propiedades" name="propiedades" rows="3" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white">${defaultValues.propiedades}</textarea> </div> <!-- Usos --> <div> <label for="usos" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
Usos
</label> <textarea id="usos" name="usos" rows="3" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white">${defaultValues.usos}</textarea> </div> <!-- Imagen --> <div> <label for="imagen" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
URL de Imagen *
</label> <input type="url" id="imagen" name="imagen"${addAttribute(defaultValues.imagen, "value")} required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"> ${defaultValues.imagen && renderTemplate`<div class="mt-2"> <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">
Vista previa:
</p> <img${addAttribute(defaultValues.imagen, "src")} alt="Vista previa" class="h-24 w-36 object-cover rounded-lg"> </div>`} </div> <!-- Imagen Detalle --> <div> <label for="imagenDetalle" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
URL de Imagen Detalle
</label> <input type="url" id="imagenDetalle" name="imagenDetalle"${addAttribute(defaultValues.imagenDetalle, "value")} class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"> ${defaultValues.imagenDetalle && renderTemplate`<div class="mt-2"> <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">
Vista previa:
</p> <img${addAttribute(defaultValues.imagenDetalle, "src")} alt="Vista previa" class="h-24 w-36 object-cover rounded-lg"> </div>`} </div> <!-- Botones de acción --> <div class="flex justify-end space-x-4 pt-4"> <a href="/admin/especies" class="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg">
Cancelar
</a> <button type="submit" class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg" id="submitButton"> ${especie ? "Actualizar Especie" : "Crear Especie"} </button> </div> </form> </div> ${renderScript($$result, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/components/admin/EspecieForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/components/admin/EspecieForm.astro", void 0);

export { $$EspecieForm as $ };
