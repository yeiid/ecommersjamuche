import { atom, map } from "nanostores";
import { validateClientProduct } from "../schemas/client.schema.js";

// Store para items y conteo del wishlist
export const wishlistItems = map({});
export const wishlistCount = atom(0);
export const wishlistErrors = atom(null);

// Clave para localStorage
const WISHLIST_STORAGE_KEY = "jamuche-wishlist";

/**
 * Añadir un producto al wishlist
 * @param {Object} product - Producto a añadir a la lista de deseos
 * @returns {boolean} - Verdadero si se añadió correctamente
 */
export function addToWishlist(product) {
  try {
    // Validar el producto antes de añadirlo
    const validatedProduct = validateClientProduct(product);

    wishlistItems.setKey(validatedProduct.id, {
      id: validatedProduct.id,
      name: validatedProduct.name,
      price: validatedProduct.price,
      discountprice: validatedProduct.discountprice || 0,
      image: validatedProduct.image,
      category: validatedProduct.category || "",
      description: validatedProduct.description || "",
    });

    updateWishlistCount();
    wishlistErrors.set(null);
    return true;
  } catch (error) {
    console.error("Error al añadir a la lista de deseos:", error);
    wishlistErrors.set(error.message || "Error al añadir a la lista de deseos");
    return false;
  }
}

/**
 * Remover un producto del wishlist
 * @param {string} productId - ID del producto a eliminar
 * @returns {boolean} - Verdadero si se eliminó correctamente
 */
export function removeFromWishlist(productId) {
  try {
    wishlistItems.setKey(productId, undefined);
    updateWishlistCount();
    wishlistErrors.set(null);
    return true;
  } catch (error) {
    console.error("Error al eliminar de la lista de deseos:", error);
    wishlistErrors.set(
      error.message || "Error al eliminar de la lista de deseos"
    );
    return false;
  }
}

/**
 * Verificar si un producto está en el wishlist
 * @param {string} productId - ID del producto a verificar
 * @returns {boolean} - Verdadero si el producto está en el wishlist
 */
export function isInWishlist(productId) {
  return Boolean(wishlistItems.get()[productId]);
}

/**
 * Limpiar toda la lista de deseos
 * @returns {boolean} - Verdadero si se limpió correctamente
 */
export function clearWishlist() {
  try {
    wishlistItems.set({});
    updateWishlistCount();
    wishlistErrors.set(null);
    return true;
  } catch (error) {
    console.error("Error al limpiar la lista de deseos:", error);
    wishlistErrors.set(error.message || "Error al limpiar la lista de deseos");
    return false;
  }
}

/**
 * Actualizar el contador de items en el wishlist
 */
export function updateWishlistCount() {
  const items = wishlistItems.get();
  const count = Object.keys(items).filter(
    (key) => items[key] !== undefined
  ).length;
  wishlistCount.set(count);
}

/**
 * Obtener todos los productos de la lista de deseos como un array
 * @returns {Array} - Array con los productos de la lista de deseos
 */
export function getWishlistAsArray() {
  const items = wishlistItems.get();
  return Object.values(items).filter((item) => item !== undefined);
}

/**
 * Cargar el wishlist desde localStorage
 */
export function initWishlist() {
  if (typeof window === "undefined") return;

  try {
    const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);

    if (savedWishlist) {
      const parsedWishlist = JSON.parse(savedWishlist);

      if (parsedWishlist && typeof parsedWishlist === "object") {
        // Cargar items guardados
        Object.entries(parsedWishlist).forEach(([key, item]) => {
          if (item) {
            try {
              // Validar cada item antes de añadirlo al store
              const validatedItem = validateClientProduct(item);
              wishlistItems.setKey(key, validatedItem);
            } catch (error) {
              console.warn(
                `Item inválido en wishlist guardado (ID: ${key}):`,
                error
              );
            }
          }
        });

        updateWishlistCount();
      }
    }

    // Suscribirse a cambios para guardar en localStorage
    wishlistItems.listen((items) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
      }
    });
  } catch (error) {
    console.error("Error al inicializar wishlist:", error);
    // En caso de error, reiniciar el wishlist
    wishlistItems.set({});
    updateWishlistCount();
  }
}

// Inicializar wishlist en el cliente
if (typeof window !== "undefined") {
  initWishlist();
}
