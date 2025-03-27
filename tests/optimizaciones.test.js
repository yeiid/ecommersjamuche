import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  addToCart,
  removeFromCart,
  clearCart,
  cartItems,
  cartCount,
  cartTotal,
} from "../src/stores/cartStore";
import {
  addToWishlist,
  removeFromWishlist,
  wishlistItems,
  wishlistCount,
} from "../src/stores/wishlistStore";
import { setTestMode } from "../src/schemas/client.schema";

// Mock para localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    _getStore: () => store,
  };
})();

// Reemplazar implementación de window y localStorage para pruebas
beforeEach(() => {
  global.localStorage = localStorageMock;
  global.window = { localStorage: localStorageMock };
  // Activar el modo de prueba para permitir IDs simples
  setTestMode(true);
});

// Limpiar después de cada prueba
afterEach(() => {
  localStorage.clear();
  cartItems.set({});
  wishlistItems.set({});
  // Desactivar el modo de prueba al finalizar
  setTestMode(false);
});

describe("Optimizaciones de stores", () => {
  describe("CartStore", () => {
    it("debe agregar productos al carrito correctamente", () => {
      const producto = {
        id: "test1",
        name: "Producto Test",
        price: 10000,
        image: "/test.jpg",
        category: "Test",
      };

      addToCart(producto, 2);

      const items = cartItems.get();
      expect(items["test1"]).toBeDefined();
      expect(items["test1"].quantity).toBe(2);
      expect(cartCount.get()).toBe(2);
      expect(cartTotal.get()).toBe(20000);
    });

    it("debe eliminar productos del carrito correctamente", () => {
      // Agregar dos productos
      addToCart(
        {
          id: "test1",
          name: "Producto 1",
          price: 10000,
          image: "/test1.jpg",
          category: "Test",
        },
        1
      );
      addToCart(
        {
          id: "test2",
          name: "Producto 2",
          price: 15000,
          image: "/test2.jpg",
          category: "Test",
        },
        2
      );

      // Verificar estado inicial
      expect(cartCount.get()).toBe(3);

      // Eliminar un producto
      removeFromCart("test1");

      // Verificar estado final
      const items = cartItems.get();
      expect(items["test1"]).toBeUndefined();
      expect(items["test2"]).toBeDefined();
      expect(cartCount.get()).toBe(2);
      expect(cartTotal.get()).toBe(30000);
    });

    it("debe limpiar todo el carrito", () => {
      // Agregar productos
      addToCart(
        {
          id: "test1",
          name: "Producto 1",
          price: 10000,
          image: "/test1.jpg",
          category: "Test",
        },
        1
      );
      addToCart(
        {
          id: "test2",
          name: "Producto 2",
          price: 15000,
          image: "/test2.jpg",
          category: "Test",
        },
        2
      );

      // Limpiar carrito
      clearCart();

      // Verificar estado
      expect(cartItems.get()).toEqual({});
      expect(cartCount.get()).toBe(0);
      expect(cartTotal.get()).toBe(0);
    });
  });

  describe("WishlistStore", () => {
    it("debe agregar productos a favoritos correctamente", () => {
      const producto = {
        id: "test1",
        name: "Producto Test",
        price: 10000,
        image: "/test.jpg",
        category: "Test",
      };

      addToWishlist(producto);

      const items = wishlistItems.get();
      expect(items["test1"]).toBeDefined();
      expect(wishlistCount.get()).toBe(1);
    });

    it("debe eliminar productos de favoritos correctamente", () => {
      // Agregar dos productos
      addToWishlist({
        id: "test1",
        name: "Producto 1",
        price: 10000,
        image: "/test1.jpg",
        category: "Test",
      });
      addToWishlist({
        id: "test2",
        name: "Producto 2",
        price: 15000,
        image: "/test2.jpg",
        category: "Test",
      });

      // Verificar estado inicial
      expect(wishlistCount.get()).toBe(2);

      // Eliminar un producto
      removeFromWishlist("test1");

      // Verificar estado final
      const items = wishlistItems.get();
      expect(items["test1"]).toBeUndefined();
      expect(items["test2"]).toBeDefined();
      expect(wishlistCount.get()).toBe(1);
    });
  });
});
