import { c as createAstro, a as createComponent, m as maybeRenderHead, b as addAttribute, r as renderScript, d as renderTemplate } from './astro/server_W1JgSjoG.mjs';

const $$Astro = createAstro("https://jamuchee.com");
const $$ProductCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProductCard;
  const {
    id,
    name,
    price,
    discountPrice = 0,
    image,
    description = "Sin descripci\xF3n disponible",
    rating = 0,
    category = "",
    isNew = false
  } = Astro2.props;
  const formatPrice = (price2) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0
    }).format(price2);
  };
  const hasDiscount = discountPrice > 0;
  const formattedPrice = formatPrice(price);
  const formattedDiscountPrice = hasDiscount ? formatPrice(discountPrice) : "";
  return renderTemplate`${maybeRenderHead()}<div class="product-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"${addAttribute(id, "data-product-id")}${addAttribute(name, "data-product-name")}${addAttribute(category, "data-product-category")}${addAttribute(description, "data-product-description")}${addAttribute(price, "data-product-price")}${addAttribute(discountPrice, "data-product-discount-price")}> <div class="relative"> <a${addAttribute(`/producto/${id}`, "href")} class="block"> <img${addAttribute(image, "src")}${addAttribute(name, "alt")} class="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"> </a> ${hasDiscount && renderTemplate`<span class="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
OFERTA
</span>`} ${isNew && renderTemplate`<span class="absolute top-2 left-2 bg-primary-500 text-white text-xs font-semibold px-2 py-1 rounded">
NUEVO
</span>`} <button class="wishlist-btn absolute top-2 right-2 bg-white dark:bg-gray-900 p-1.5 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"${addAttribute(id, "data-product-id")}> <svg class="h-5 w-5 wishlist-icon text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path> </svg> </button> </div> <div class="p-4"> <a${addAttribute(`/producto/${id}`, "href")} class="block hover:text-primary-600 transition-colors"> <h3 class="text-lg font-semibold text-gray-800 dark:text-white"> ${name} </h3> </a> <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 mt-1"> ${description} </p> <div class="flex items-center justify-between mt-2"> <div> ${hasDiscount ? renderTemplate`<div> <span class="text-gray-500 dark:text-gray-400 text-sm line-through"> ${formattedPrice} </span> <div class="text-lg font-bold text-gray-800 dark:text-white"> ${formattedDiscountPrice} </div> </div>` : renderTemplate`<div class="text-lg font-bold text-gray-800 dark:text-white"> ${formattedPrice} </div>`} </div> <button class="add-to-cart-btn inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors" aria-label="Añadir al carrito"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path> </svg>
Agregar
</button> </div> </div> <!-- Contenedor de notificaciones para este producto --> <div class="product-notification hidden fixed top-4 right-4 p-4 rounded-lg shadow-lg max-w-md z-50"></div> </div> ${renderScript($$result, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/components/cards/ProductCard.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/yeiid/cursos/pata-git/Proyectos_full/jamuche-astro/ecommersjamuche/src/components/cards/ProductCard.astro", void 0);

export { $$ProductCard as $ };
