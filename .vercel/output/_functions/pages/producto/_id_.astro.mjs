/* empty css                                        */
import { c as createAstro, a as createComponent, m as maybeRenderHead, b as addAttribute, r as renderScript, d as renderTemplate, e as renderComponent, u as unescapeHTML } from '../../chunks/astro/server_W1JgSjoG.mjs';
import { $ as $$Layout } from '../../chunks/Layout_CHj6NFB5.mjs';
import { $ as $$Button } from '../../chunks/Button_0F-bVXWL.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$2 = createAstro("https://jamuchee.com");
const $$ReviewForm = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ReviewForm;
  const { productId } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="review-form bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"> <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-white">
Escribe una reseña
</h3> <form id="review-form"> <input type="hidden" name="productId"${addAttribute(productId, "value")}> <div class="mb-4"> <label for="author" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label> <input type="text" id="author" name="author" required class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"> </div> <div class="mb-4"> <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Calificación</label> <div class="flex items-center space-x-1" id="rating-stars"> <button type="button" class="rating-star text-gray-300 dark:text-gray-600 hover:text-yellow-400" data-rating="1"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"> <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path> </svg> </button> <button type="button" class="rating-star text-gray-300 dark:text-gray-600 hover:text-yellow-400" data-rating="2"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"> <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path> </svg> </button> <button type="button" class="rating-star text-gray-300 dark:text-gray-600 hover:text-yellow-400" data-rating="3"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"> <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path> </svg> </button> <button type="button" class="rating-star text-gray-300 dark:text-gray-600 hover:text-yellow-400" data-rating="4"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"> <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path> </svg> </button> <button type="button" class="rating-star text-gray-300 dark:text-gray-600 hover:text-yellow-400" data-rating="5"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"> <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path> </svg> </button> </div> <input type="hidden" id="rating" name="rating" value="0" required> </div> <div class="mb-4"> <label for="comment" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Comentario</label> <textarea id="comment" name="comment" rows="4" required class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"></textarea> </div> <div class="flex justify-end"> <button type="submit" id="submit-review" class="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
Enviar reseña
</button> </div> </form> <div id="review-success" class="hidden mt-4"> <div class="p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md">
¡Gracias por tu reseña! Tu comentario ha sido enviado correctamente.
</div> </div> <div id="review-error" class="hidden mt-4"> <div class="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md">
Ha ocurrido un error al enviar tu reseña. Por favor, intenta nuevamente.
</div> </div> </div> ${renderScript($$result, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/components/ui/ReviewForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/components/ui/ReviewForm.astro", void 0);

const $$Astro$1 = createAstro("https://jamuchee.com");
const $$ReviewList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ReviewList;
  const { productId } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="reviews-container mt-8"> <h3 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
Reseñas de clientes
</h3> <div id="reviews-list"> <!-- Aquí se cargarán dinámicamente las reseñas --> <div class="text-center py-8 text-gray-500 dark:text-gray-400" id="no-reviews"> <p>Este producto aún no tiene reseñas.</p> <p class="mt-2">¡Sé el primero en compartir tu experiencia!</p> </div> </div> </div> ${renderScript($$result, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/components/ui/ReviewList.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/components/ui/ReviewList.astro", void 0);

const $$Astro = createAstro("https://jamuchee.com");
async function getStaticPaths() {
  const products = [
    {
      id: "1",
      name: "Extracto de Cannabis",
      price: 85e3,
      discountPrice: 75e3,
      image: "https://images.unsplash.com/photo-1628542065089-1f1587564502?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1628542065089-1f1587564502?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1579612830432-9967fea3ac22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1503262028195-93c528f03218?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Extracto natural de cannabis con propiedades medicinales. Ideal para tratamientos terap\xE9uticos. Contiene CBD de alta calidad que proporciona alivio para diversas condiciones.",
      longDescription: `
        <p>Este extracto de cannabis es un producto premium elaborado con las mejores plantas cultivadas de manera org\xE1nica. Cada lote se somete a rigurosos controles de calidad para garantizar la pureza y potencia.</p>
        <p>Beneficios principales:</p>
        <ul>
          <li>Alivio del dolor cr\xF3nico</li>
          <li>Reducci\xF3n de la ansiedad y el estr\xE9s</li>
          <li>Mejora de la calidad del sue\xF1o</li>
          <li>Propiedades antiinflamatorias</li>
          <li>100% natural y org\xE1nico</li>
        </ul>
        <p>Modo de uso: Aplicar 2-3 gotas bajo la lengua y mantener durante 60 segundos antes de tragar. Iniciar con dosis bajas e ir aumentando gradualmente seg\xFAn necesidad.</p>
        <p>Contenido: 30ml (aproximadamente 600 gotas)</p>
      `,
      rating: 4.5,
      category: "extractos",
      isNew: true,
      isFeatured: true,
      stock: 15,
      specifications: [
        { name: "Contenido", value: "30ml" },
        { name: "Concentraci\xF3n CBD", value: "10%" },
        { name: "THC", value: "<0.2%" },
        { name: "Origen", value: "Colombia" },
        { name: "M\xE9todo de extracci\xF3n", value: "CO2" }
      ]
    },
    {
      id: "2",
      name: "Semillas de Marihuana",
      price: 45e3,
      discountPrice: 0,
      image: "https://images.unsplash.com/photo-1616407746534-a58befda7d83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1616407746534-a58befda7d83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1543156632-dc21c84b271e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1585516471814-34719467fddb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Pack de semillas org\xE1nicas de marihuana para cultivo personal.",
      longDescription: `
        <p>Nuestras semillas de marihuana est\xE1n gen\xE9ticamente seleccionadas para ofrecer plantas robustas con alto rendimiento. Cada paquete contiene 5 semillas feminizadas de la variedad Sativa, perfectas para cultivo interior o exterior.</p>
        <p>Caracter\xEDsticas principales:</p>
        <ul>
          <li>Gen\xE9tica estable y probada</li>
          <li>Altos niveles de CBD</li>
          <li>Feminizadas (99% de probabilidad)</li>
          <li>Resistentes a plagas comunes</li>
          <li>Tiempo de floraci\xF3n: 8-10 semanas</li>
        </ul>
        <p>Estas semillas son ideales tanto para cultivadores principiantes como experimentados. Vienen en un empaque herm\xE9tico que garantiza su frescura y viabilidad.</p>
        <p>Nota legal: Estas semillas se venden como producto coleccionable y para conservaci\xF3n gen\xE9tica. Consulta la normativa local antes de germinar.</p>
      `,
      rating: 5,
      category: "semillas",
      isNew: false,
      isFeatured: true,
      stock: 50,
      specifications: [
        { name: "Cantidad", value: "5 semillas" },
        { name: "Tipo", value: "Feminizadas" },
        { name: "Variedad", value: "Sativa" },
        { name: "Floraci\xF3n", value: "8-10 semanas" },
        { name: "Altura", value: "150-180cm" }
      ]
    },
    {
      id: "3",
      name: "Planta de Cannabis Medicinal",
      price: 12e4,
      discountPrice: 99e3,
      image: "https://images.unsplash.com/photo-1536689318884-51b09dfe7e74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1536689318884-51b09dfe7e74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1536767472578-992f1637421c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1603909223429-69bb7209c90d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
      ],
      description: "Planta viva de cannabis medicinal lista para trasplantar.",
      longDescription: `
        <p>Esta planta de cannabis medicinal viene en una maceta biodegradable de 15cm y est\xE1 lista para ser trasplantada a su ubicaci\xF3n final. La variedad seleccionada es rica en CBD con bajo contenido de THC, ideal para uso medicinal.</p>
        <p>Caracter\xEDsticas de la planta:</p>
        <ul>
          <li>Edad: 4 semanas</li>
          <li>Altura actual: 25-30cm</li>
          <li>Variedad: CBD Therapy (medicinal)</li>
          <li>Gen\xE9tica: Predominantemente indica</li>
          <li>Contenido de CBD: Alto</li>
          <li>Contenido de THC: Bajo (<0.5%)</li>
        </ul>
        <p>Cada planta viene con una gu\xEDa de cuidados completa para maximizar su desarrollo y producci\xF3n. Recomendamos trasplantarla a una maceta de al menos 7 galones para su desarrollo \xF3ptimo.</p>
        <p>Nota: El env\xEDo incluye medidas especiales para garantizar que la planta llegue en perfecto estado.</p>
      `,
      rating: 4,
      category: "plantas",
      isNew: true,
      isFeatured: false,
      stock: 8,
      specifications: [
        { name: "Edad", value: "4 semanas" },
        { name: "Altura", value: "25-30cm" },
        { name: "Variedad", value: "CBD Therapy" },
        { name: "Gen\xE9tica", value: "Indica dominante" },
        { name: "Maceta", value: "15cm biodegradable" }
      ]
    }
  ];
  return products.map((product) => {
    return {
      params: { id: product.id },
      props: { product }
    };
  });
}
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { product } = Astro2.props;
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0
    }).format(price);
  };
  const hasDiscount = product.discountPrice > 0;
  const discountPercentage = hasDiscount ? Math.round((product.price - product.discountPrice) / product.price * 100) : 0;
  const formattedPrice = formatPrice(product.price);
  const formattedDiscountPrice = hasDiscount ? formatPrice(product.discountPrice) : "";
  const stars = Math.min(Math.max(Math.round(product.rating), 0), 5);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${product.name} | JAMUCHEE` }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-12"> <!-- Breadcrumb --> <nav class="flex mb-8 text-sm"> <a href="/" class="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Inicio</a> <span class="mx-2 text-gray-500 dark:text-gray-400">/</span> <a href="/productos" class="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Productos</a> <span class="mx-2 text-gray-500 dark:text-gray-400">/</span> <span class="text-gray-800 dark:text-gray-200">${product.name}</span> </nav> <div class="grid grid-cols-1 lg:grid-cols-2 gap-12"> <!-- Galería de imágenes --> <div> <div class="mb-4 relative"> <img id="main-image"${addAttribute(product.images[0], "src")}${addAttribute(product.name, "alt")} class="w-full h-96 object-cover rounded-lg"> <!-- Botón de lista de deseos --> <button id="wishlist-btn" class="absolute top-4 right-4 bg-white dark:bg-gray-900 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Añadir a lista de deseos"${addAttribute(product.id, "data-product-id")}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="wishlist-icon text-gray-500 dark:text-gray-400"> <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path> </svg> </button> </div> <div class="grid grid-cols-3 gap-3"> ${product.images.map((image, index) => renderTemplate`<button${addAttribute(["thumbnail-button border-2 rounded overflow-hidden hover:opacity-80 transition-opacity cursor-pointer", [
    index === 0 ? "border-primary-500" : "border-transparent"
  ]], "class:list")}${addAttribute(index, "data-index")}> <img${addAttribute(image, "src")} alt="" class="w-full h-24 object-cover"> </button>`)} </div> </div> <!-- Información del producto --> <div> <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2"> ${product.name} </h1> <div class="flex items-center mb-4"> <div class="flex"> ${[...Array(5)].map((_, index) => renderTemplate`<svg xmlns="http://www.w3.org/2000/svg"${addAttribute(`h-5 w-5 ${index < stars ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`, "class")} viewBox="0 0 20 20" fill="currentColor"> <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path> </svg>`)} </div> <span class="ml-2 text-gray-600 dark:text-gray-400"> <span id="avg-rating">${product.rating.toFixed(1)}</span>/5 (${product.stock} en stock)
</span> </div> <div class="mb-6"> ${hasDiscount ? renderTemplate`<div class="flex items-center"> <span class="text-gray-500 dark:text-gray-400 line-through text-lg"> ${formattedPrice} </span> <span class="ml-2 text-3xl font-bold text-gray-800 dark:text-white"> ${formattedDiscountPrice} </span> <span class="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded"> ${discountPercentage}% OFF
</span> </div>` : renderTemplate`<span class="text-3xl font-bold text-gray-800 dark:text-white"> ${formattedPrice} </span>`} <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">
Impuestos incluidos. Envío calculado al finalizar la compra.
</p> </div> <div class="mb-6"> <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">
Descripción
</h2> <p class="text-gray-700 dark:text-gray-300">${product.description}</p> </div> <div class="mb-6"> <div class="flex space-x-4"> <div> <label for="quantity" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
Cantidad
</label> <div class="custom-number-input h-10 w-32"> <div class="flex flex-row h-full w-full rounded-lg relative bg-transparent"> <button id="decrement" class="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 h-full w-10 rounded-l-lg flex items-center justify-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path> </svg> </button> <input type="number" id="quantity" class="outline-none focus:outline-none text-center w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-md hover:text-black dark:hover:text-white focus:text-black dark:focus:text-white md:text-base" name="quantity" value="1" min="1"${addAttribute(product.stock, "max")}> <button id="increment" class="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 h-full w-10 rounded-r-lg flex items-center justify-center"> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path> </svg> </button> </div> </div> </div> </div> </div> <div class="flex space-x-4 mb-8"> ${renderComponent($$result2, "Button", $$Button, { "id": "add-to-cart", "class": "flex-grow", "variant": "primary", "size": "lg" }, { "default": ($$result3) => renderTemplate` <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path> </svg>
Añadir al carrito
` })} </div> <div class="border-t border-gray-200 dark:border-gray-700 pt-6"> <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">
Especificaciones
</h2> <dl class="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2"> ${product.specifications.map((spec) => renderTemplate`<div class="sm:col-span-1"> <dt class="text-sm font-medium text-gray-500 dark:text-gray-400"> ${spec.name} </dt> <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100"> ${spec.value} </dd> </div>`)} </dl> </div> </div> </div> <!-- Descripción larga --> <div class="mt-16"> <h2 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
Información detallada
</h2> <div class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">${unescapeHTML(product.longDescription)}</div> </div> <!-- Sección de reseñas --> <div class="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8" id="review-section"${addAttribute(product.id, "data-product-id")}> <div class="lg:col-span-2"> ${renderComponent($$result2, "ReviewList", $$ReviewList, { "productId": product.id })} </div> <div class="lg:col-span-1"> ${renderComponent($$result2, "ReviewForm", $$ReviewForm, { "productId": product.id })} </div> </div> <!-- Productos relacionados - se implementará en una futura actualización --> <div class="mt-16"> <h2 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
También te puede interesar
</h2> <p class="text-center text-gray-500 dark:text-gray-400 py-8">
Próximamente podrás ver recomendaciones personalizadas.
</p> </div> </div> ` })} ${renderScript($$result, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/producto/[id].astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/producto/[id].astro", void 0);

const $$file = "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/pages/producto/[id].astro";
const $$url = "/producto/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
