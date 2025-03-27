/**
 * Pruebas para los esquemas de validación del lado del cliente
 * Verifica que la validación de datos en el cliente funcione correctamente
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  validateClientProduct,
  validateCartItem,
  validateContactInfo,
  prepareProductForCart,
  calculateItemTotal,
  validatePrice,
} from "../src/schemas/client.schema";

// Mock para crypto.randomUUID
vi.stubGlobal("crypto", {
  randomUUID: vi.fn().mockReturnValue("123e4567-e89b-12d3-a456-426614174999"),
});

describe("Validación del lado del cliente", () => {
  describe("Validación de productos", () => {
    it("debería validar un producto válido", () => {
      const product = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Producto de prueba",
        price: 10000,
        image: "/images/producto.jpg",
      };

      const validated = validateClientProduct(product);
      expect(validated).toEqual({
        ...product,
        description: "",
        category: "",
        discountprice: 0,
      });
    });

    it("debería rechazar un producto con ID inválido", () => {
      const product = {
        id: "123", // ID inválido, no es UUID
        name: "Producto de prueba",
        price: 10000,
        image: "/images/producto.jpg",
      };

      expect(() => validateClientProduct(product)).toThrow();
    });

    it("debería rechazar un producto con precio inválido", () => {
      const product = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Producto de prueba",
        price: -100, // Precio negativo
        image: "/images/producto.jpg",
      };

      expect(() => validateClientProduct(product)).toThrow();
    });

    it("debería rechazar un producto sin imagen", () => {
      const product = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Producto de prueba",
        price: 10000,
        // Sin imagen
      };

      expect(() => validateClientProduct(product)).toThrow();
    });
  });

  describe("Validación de ítems del carrito", () => {
    it("debería validar un ítem de carrito válido", () => {
      const cartItem = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Producto de prueba",
        price: 10000,
        image: "/images/producto.jpg",
        quantity: 2,
        total: 20000,
      };

      const validated = validateCartItem(cartItem);
      expect(validated).toEqual({
        ...cartItem,
        description: "",
        category: "",
        discountprice: 0,
      });
    });

    it("debería rechazar un ítem con cantidad cero o negativa", () => {
      const cartItem = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Producto de prueba",
        price: 10000,
        image: "/images/producto.jpg",
        quantity: 0, // Cantidad inválida
        total: 0,
      };

      expect(() => validateCartItem(cartItem)).toThrow();
    });

    it("debería calcular correctamente el total del ítem", () => {
      const item = {
        price: 10000,
        quantity: 2,
        discountprice: 0,
      };

      const total = calculateItemTotal(item);
      expect(total).toBe(20000);
    });

    it("debería calcular correctamente el total con precio de descuento", () => {
      const item = {
        price: 10000,
        quantity: 2,
        discountprice: 8000,
      };

      const total = calculateItemTotal(item);
      expect(total).toBe(16000); // 8000 * 2
    });

    it("debería preparar correctamente un producto para el carrito", () => {
      const product = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Producto de prueba",
        price: 10000,
        image: "/images/producto.jpg",
      };

      const cartItem = prepareProductForCart(product, 3);

      expect(cartItem).toEqual({
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Producto de prueba",
        price: 10000,
        image: "/images/producto.jpg",
        description: "",
        category: "",
        discountprice: 0,
        quantity: 3,
        total: 30000,
      });
    });
  });

  describe("Validación de información de contacto", () => {
    it("debería validar información de contacto válida", () => {
      const contactInfo = {
        nombre: "Juan Pérez",
        email: "juan@example.com",
        telefono: "3001234567",
        direccion: "Calle 123 # 45-67",
        ciudad: "Bogotá",
        estado: "Cundinamarca",
      };

      const validated = validateContactInfo(contactInfo);
      expect(validated).toEqual(contactInfo);
    });

    it("debería rechazar un email inválido", () => {
      const contactInfo = {
        nombre: "Juan Pérez",
        email: "email-invalido", // Email inválido
        telefono: "3001234567",
        direccion: "Calle 123 # 45-67",
        ciudad: "Bogotá",
        estado: "Cundinamarca",
      };

      expect(() => validateContactInfo(contactInfo)).toThrow();
    });

    it("debería rechazar un nombre muy corto", () => {
      const contactInfo = {
        nombre: "Ju", // Nombre muy corto
        email: "juan@example.com",
        telefono: "3001234567",
        direccion: "Calle 123 # 45-67",
        ciudad: "Bogotá",
        estado: "Cundinamarca",
      };

      expect(() => validateContactInfo(contactInfo)).toThrow();
    });
  });

  describe("Validación y formateo de precios", () => {
    it("debería validar un precio numérico válido", () => {
      const price = 10000;
      const validated = validatePrice(price);
      expect(validated).toBe(10000);
    });

    it("debería convertir un string de precio a número", () => {
      const price = "10000";
      const validated = validatePrice(price);
      expect(validated).toBe(10000);
    });

    it("debería convertir un string con formato de moneda a número", () => {
      const price = "$10,000.00";
      const validated = validatePrice(price);
      expect(validated).toBe(10000);
    });

    it("debería rechazar un precio negativo", () => {
      const price = -100;
      expect(() => validatePrice(price)).toThrow();
    });
  });
});
