/**
 * Cart Store — Nanostores
 * Gestión del carrito de compras con persistencia en localStorage.
 */
import { atom, map } from "nanostores";

// ─── Stores ───
export const cartItems = map({});
export const cartCount = atom(0);
export const cartTotal = atom(0);

// ─── Constants ───
const CART_STORAGE_KEY = "ecommerce-cart";
let isInitialized = false;
let isSaving = false;

// ─── Add to Cart ───
export function addToCart(product, quantity = 1) {
  const current = cartItems.get();
  const existing = current[product.id];

  if (existing) {
    const updated = {
      ...existing,
      quantity: existing.quantity + quantity,
    };
    updated.total = getItemPrice(updated) * updated.quantity;
    cartItems.setKey(product.id, updated);
  } else {
    const price = getItemPrice(product);
    cartItems.setKey(product.id, {
      id: product.id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice || 0,
      image: product.image,
      category: product.category || "",
      quantity,
      total: price * quantity,
    });
  }

  updateTotals();
  save();
}

// ─── Update Quantity ───
export function updateCartItemQuantity(productId, quantity) {
  const items = cartItems.get();
  const item = items[productId];
  if (!item) return;

  if (quantity <= 0) {
    removeItemCompletely(productId);
    return;
  }

  const updated = {
    ...item,
    quantity,
    total: getItemPrice(item) * quantity,
  };
  cartItems.setKey(productId, updated);
  updateTotals();
  save();
}

// ─── Remove One Unit ───
export function removeFromCart(productId) {
  const items = cartItems.get();
  const item = items[productId];
  if (!item) return;

  if (item.quantity > 1) {
    const updated = {
      ...item,
      quantity: item.quantity - 1,
      total: getItemPrice(item) * (item.quantity - 1),
    };
    cartItems.setKey(productId, updated);
  } else {
    cartItems.setKey(productId, undefined);
  }

  updateTotals();
  save();
}

// ─── Remove Completely ───
export function removeItemCompletely(productId) {
  cartItems.setKey(productId, undefined);
  updateTotals();
  save();
}

// ─── Clear Cart ───
export function clearCart() {
  cartItems.set({});
  updateTotals();
  save();
}

// ─── Helpers ───
function getItemPrice(item) {
  return item.discountPrice && item.discountPrice > 0
    ? item.discountPrice
    : item.price;
}

function updateTotals() {
  const items = cartItems.get();
  let count = 0;
  let total = 0;

  Object.values(items).forEach((item) => {
    // Validamos que el producto tenga un ID y una cantidad válida
    if (item && typeof item === 'object' && item.id && item.quantity > 0) {
      count += item.quantity;
      total += getItemPrice(item) * item.quantity;
    }
  });

  cartCount.set(count);
  cartTotal.set(total);
}

// ─── Persistence ───
function save() {
  if (typeof window === "undefined" || isSaving) return;
  try {
    isSaving = true;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems.get()));
  } catch (e) {
    console.error("Error saving cart:", e);
  } finally {
    isSaving = false;
  }
}

function load() {
  if (typeof window === "undefined") return {};
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

// ─── Initialize ───
export function initCart() {
  if (typeof window === "undefined" || isInitialized) return;
  isInitialized = true;

  const saved = load();
  if (saved && typeof saved === "object") {
    const cleanItems = {};
    Object.entries(saved).forEach(([key, item]) => {
      // Solo restaurar si el item es válido y tiene contenido
      if (item && typeof item === 'object' && item.id) {
        cleanItems[key] = item;
      }
    });
    cartItems.set(cleanItems);
    updateTotals();
  }

  cartItems.listen((items) => {
    if (!isSaving) save();
  });
}

// Auto-init on client (faster hydration)
if (typeof window !== "undefined") {
  initCart();
}
