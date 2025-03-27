import { atom, map } from "nanostores";
import {
  validateCartItem,
  prepareProductForCart,
  calculateItemTotal,
} from "../schemas/client.schema.js";

// Definir el tipo de elemento del carrito
// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
// }

// Stores para los items del carrito y totales
export const cartItems = map({});
export const cartCount = atom(0);
export const cartTotal = atom(0);
export const cartErrors = atom(null);

// Clave para localStorage
const CART_STORAGE_KEY = "jamuche-cart";
// Variable para prevenir múltiples inicializaciones
let isInitialized = false;
// Variable para controlar la escritura en localStorage para evitar ciclos
let isSavingToStorage = false;

/**
 * Añadir producto al carrito
 * @param {Object} product - Producto a añadir
 * @param {number} quantity - Cantidad a añadir (por defecto 1)
 * @returns {boolean} - Verdadero si se añadió correctamente
 */
export function addToCart(product, quantity = 1) {
  try {
    const currentItems = cartItems.get();

    // Si el producto ya tiene una propiedad quantity, usarla (para añadir múltiples unidades a la vez)
    // Si no, usar el parámetro quantity
    const quantityToAdd = product.quantity ? product.quantity : quantity;

    // Obtener cantidad actual en el carrito (si existe)
    const currentQuantity = currentItems[product.id]?.quantity || 0;

    // Crear copia del producto sin la propiedad quantity
    const productWithoutQuantity = { ...product };
    if ("quantity" in productWithoutQuantity) {
      delete productWithoutQuantity.quantity;
    }

    // Preparar el producto para agregar al carrito
    // Si ya existe, sumamos la cantidad
    const cartItem = prepareProductForCart(
      productWithoutQuantity,
      currentQuantity + quantityToAdd
    );

    // Actualizar el item en el carrito
    cartItems.setKey(product.id, cartItem);

    // Actualizar contadores
    updateCartCountAndTotal();

    // Limpiar errores previos
    cartErrors.set(null);

    // Guardar explícitamente en localStorage para asegurar persistencia
    saveCartToLocalStorage(cartItems.get());

    return true;
  } catch (error) {
    console.error("Error al añadir al carrito:", error);
    cartErrors.set(error.message || "Error al añadir producto al carrito");
    return false;
  }
}

/**
 * Actualizar cantidad de un producto
 * @param {string} productId - ID del producto
 * @param {number} quantity - Nueva cantidad
 * @returns {boolean} - Verdadero si se actualizó correctamente
 */
export function updateCartItemQuantity(productId, quantity) {
  try {
    const items = cartItems.get();
    const item = items[productId];

    if (!item) {
      throw new Error("Producto no encontrado en el carrito");
    }

    if (quantity > 0) {
      // Recalcular el total con la nueva cantidad
      const cartItem = {
        ...item,
        quantity,
        total: calculateItemTotal({ ...item, quantity }),
      };

      // Validar el item actualizado
      const validatedItem = validateCartItem(cartItem);

      // Actualizar el carrito
      cartItems.setKey(productId, validatedItem);
    } else {
      // Si la cantidad es 0 o negativa, eliminar del carrito
      removeFromCart(productId);
    }

    updateCartCountAndTotal();
    cartErrors.set(null);

    // Guardar explícitamente en localStorage
    saveCartToLocalStorage(cartItems.get());

    return true;
  } catch (error) {
    console.error("Error al actualizar cantidad:", error);
    cartErrors.set(error.message || "Error al actualizar cantidad");
    return false;
  }
}

/**
 * Remover una unidad del producto del carrito
 * @param {string} productId - ID del producto a eliminar
 * @returns {boolean} - Verdadero si se eliminó correctamente
 */
export function removeFromCart(productId) {
  try {
    const items = cartItems.get();
    const item = items[productId];

    if (!item) {
      throw new Error("Producto no encontrado en el carrito");
    }

    if (item.quantity > 1) {
      // Si hay más de uno, solo reducir la cantidad
      const updatedItem = {
        ...item,
        quantity: item.quantity - 1,
        total: calculateItemTotal({ ...item, quantity: item.quantity - 1 }),
      };

      // Validar el item actualizado
      const validatedItem = validateCartItem(updatedItem);

      // Actualizar el carrito
      cartItems.setKey(productId, validatedItem);
    } else {
      // Si solo queda uno, eliminar completamente
      cartItems.setKey(productId, undefined);
    }

    updateCartCountAndTotal();
    cartErrors.set(null);

    // Guardar explícitamente en localStorage
    saveCartToLocalStorage(cartItems.get());

    return true;
  } catch (error) {
    console.error("Error al eliminar del carrito:", error);
    cartErrors.set(error.message || "Error al eliminar del carrito");
    return false;
  }
}

/**
 * Remover completamente un producto del carrito, sin importar su cantidad
 * @param {string} productId - ID del producto a eliminar completamente
 * @returns {boolean} - Verdadero si se eliminó correctamente
 */
export function removeItemCompletely(productId) {
  try {
    cartItems.setKey(productId, undefined);
    updateCartCountAndTotal();
    cartErrors.set(null);

    // Guardar explícitamente en localStorage
    saveCartToLocalStorage(cartItems.get());

    return true;
  } catch (error) {
    console.error("Error al eliminar completamente:", error);
    cartErrors.set(error.message || "Error al eliminar completamente");
    return false;
  }
}

/**
 * Verificar si un producto está en el carrito
 * @param {string} productId - ID del producto a verificar
 * @returns {boolean} - Verdadero si el producto está en el carrito
 */
export function isInCart(productId) {
  return Boolean(cartItems.get()[productId]);
}

/**
 * Limpiar todo el carrito
 * @returns {boolean} - Verdadero si se limpió correctamente
 */
export function clearCart() {
  try {
    cartItems.set({});
    updateCartCountAndTotal();
    cartErrors.set(null);

    // Guardar explícitamente en localStorage (carrito vacío)
    saveCartToLocalStorage({});

    return true;
  } catch (error) {
    console.error("Error al limpiar carrito:", error);
    cartErrors.set(error.message || "Error al limpiar el carrito");
    return false;
  }
}

/**
 * Actualizar contador y total
 */
export function updateCartCountAndTotal() {
  const items = cartItems.get();
  let count = 0;
  let total = 0;

  Object.values(items).forEach((item) => {
    if (item) {
      count += item.quantity;

      // Usar precio con descuento si existe y es mayor que cero
      const price = item.discountprice > 0 ? item.discountprice : item.price;
      total += price * item.quantity;
    }
  });

  cartCount.set(count);
  cartTotal.set(total);
}

/**
 * Guardar carrito en localStorage
 * @param {Object} items - Items del carrito
 */
function saveCartToLocalStorage(items) {
  if (typeof window === "undefined" || isSavingToStorage) return;

  try {
    isSavingToStorage = true;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Error al guardar carrito en localStorage:", error);
  } finally {
    isSavingToStorage = false;
  }
}

/**
 * Recuperar carrito desde localStorage
 * @returns {Object} - Items del carrito
 */
function loadCartFromLocalStorage() {
  if (typeof window === "undefined") return {};

  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (!savedCart) return {};

    const parsedCart = JSON.parse(savedCart);
    if (parsedCart && typeof parsedCart === "object") {
      return parsedCart;
    }
    return {};
  } catch (error) {
    console.error("Error al cargar carrito desde localStorage:", error);
    return {};
  }
}

/**
 * Inicializar carrito desde localStorage
 */
export function initCart() {
  if (typeof window === "undefined" || isInitialized) return;

  try {
    // Marcar como inicializado para evitar múltiples inicializaciones
    isInitialized = true;

    const savedItems = loadCartFromLocalStorage();

    // Verificar que sea un objeto válido
    if (savedItems && typeof savedItems === "object") {
      // Limpiar carrito actual antes de cargar desde localStorage
      cartItems.set({});

      Object.entries(savedItems).forEach(([key, item]) => {
        if (item) {
          try {
            // Validar cada item antes de añadirlo al store
            const validatedItem = validateCartItem(item);
            cartItems.setKey(key, validatedItem);
          } catch (error) {
            console.warn(
              `Item inválido en carrito guardado (ID: ${key}):`,
              error
            );
          }
        }
      });

      // Actualizar contadores después de cargar
      updateCartCountAndTotal();
    }

    // Suscribirse a cambios para guardar en localStorage
    const unsubscribe = cartItems.listen((items) => {
      if (typeof window !== "undefined" && !isSavingToStorage) {
        saveCartToLocalStorage(items);
      }
    });

    // Guardar la función para cancelar la suscripción (por si acaso se necesita)
    window.__cartUnsubscribe = unsubscribe;

    // Intentar guardar inmediatamente para asegurar persistencia
    saveCartToLocalStorage(cartItems.get());

    // Función para detectar cambios de enfoque en la ventana
    // Útil para sincronizar carrito entre pestañas
    window.addEventListener("focus", () => {
      // Al volver a la pestaña, recargar el carrito
      const reloadedItems = loadCartFromLocalStorage();

      if (reloadedItems && typeof reloadedItems === "object") {
        Object.entries(reloadedItems).forEach(([key, item]) => {
          if (item) {
            try {
              cartItems.setKey(key, validateCartItem(item));
            } catch (error) {
              console.warn(`Error al recargar item (ID: ${key}):`, error);
            }
          }
        });

        updateCartCountAndTotal();
      }
    });
  } catch (error) {
    console.error("Error al inicializar carrito:", error);
    // En caso de error, reiniciar el carrito
    cartItems.set({});
    updateCartCountAndTotal();
  }
}

// Función para garantizar que el carrito se inicialice en el cliente
export function ensureCartInitialized() {
  if (typeof window !== "undefined" && !isInitialized) {
    initCart();
    return true;
  }
  return isInitialized;
}

// Inicializar carrito en el cliente
if (typeof window !== "undefined") {
  // Usar un pequeño retraso para asegurar que todo el DOM está listo
  setTimeout(() => {
    initCart();
  }, 50);
}
