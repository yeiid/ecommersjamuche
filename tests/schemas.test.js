import { describe, it, expect, beforeEach } from "vitest";
import {
  validateProduct,
  validateEspecie,
  validatePedido,
  productSchema,
  especieSchema,
  pedidoSchema,
  generateProductId,
  generateEspecieId,
  generatePedidoId,
  formDataToProduct,
  formDataToEspecie,
  cartToPedido,
} from "../src/schemas";
import {
  ValidationError,
  DatabaseError,
  formatZodError,
} from "../src/schemas/errors";

// Mock para FormData
class MockFormData {
  constructor() {
    this.data = new Map();
  }

  get(key) {
    return this.data.get(key);
  }

  set(key, value) {
    this.data.set(key, value);
  }

  has(key) {
    return this.data.has(key);
  }
}

describe("Validación de esquemas con Zod", () => {
  // Product schema tests
  describe("Esquema de Producto", () => {
    it("debería validar un producto válido", () => {
      const producto = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Producto de prueba",
        price: 10000,
        image: "/images/producto.jpg",
        description: "Descripción del producto",
        category: "Prueba",
        discountprice: 0,
        stock: 10,
        isnew: false,
        featured: false,
        rating: 4.5,
        features: ["Característica 1", "Característica 2"],
        ingredients: ["Ingrediente 1", "Ingrediente 2"],
      };

      const validated = validateProduct(producto);
      expect(validated).toEqual(producto);
    });

    it("debería rechazar un producto con campos obligatorios faltantes", () => {
      const productoInvalido = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        // name faltante
        price: 10000,
        // image faltante
        // description faltante
        // category faltante
      };

      expect(() => validateProduct(productoInvalido)).toThrow();
    });

    it("debería rechazar un producto con ID inválido", () => {
      const productoInvalido = {
        id: "123", // ID inválido, no es UUID
        name: "Producto de prueba",
        price: 10000,
        image: "/images/producto.jpg",
        description: "Descripción del producto",
        category: "Prueba",
      };

      expect(() => validateProduct(productoInvalido)).toThrow();
    });

    it("debería generar un UUID válido", () => {
      const uuid = generateProductId();
      expect(uuid).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      );
    });
  });

  // Especie schema tests
  describe("Esquema de Especie", () => {
    it("debería validar una especie válida", () => {
      const especie = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        nombre: "Especie de prueba",
        nombreCientifico: "Testus especium",
        descripcion: "Descripción de la especie",
        imagen: "/images/especie.jpg",
        featured: false, // Incluir valor predeterminado que Zod agrega
      };

      const validated = validateEspecie(especie);
      expect(validated).toEqual(especie);
    });

    it("debería rechazar una especie con campos obligatorios faltantes", () => {
      const especieInvalida = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        // nombre faltante
        // nombreCientifico faltante
        // descripcion faltante
        // imagen faltante
      };

      expect(() => validateEspecie(especieInvalida)).toThrow();
    });
  });

  // Pedido schema tests
  describe("Esquema de Pedido", () => {
    it("debería validar un pedido válido", () => {
      const pedido = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        usuario_nombre: "Usuario Test",
        usuario_email: "test@example.com",
        direccion: "Calle de prueba, 123",
        ciudad: "Ciudad Test",
        estado: "Estado Test",
        productos: [
          {
            id: "123e4567-e89b-12d3-a456-426614174001",
            name: "Producto de prueba",
            price: 10000,
            quantity: 2,
            total: 20000,
            discountprice: 0, // Incluir valor predeterminado que Zod agrega
          },
        ],
        total: 20000,
        estado_pedido: "pendiente", // Incluir valor predeterminado que Zod agrega
      };

      const validated = validatePedido(pedido);
      expect(validated).toEqual(pedido);
    });

    it("debería rechazar un pedido sin productos", () => {
      const pedidoInvalido = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        usuario_nombre: "Usuario Test",
        usuario_email: "test@example.com",
        direccion: "Calle de prueba, 123",
        ciudad: "Ciudad Test",
        estado: "Estado Test",
        productos: [], // Sin productos
        total: 0,
      };

      expect(() => validatePedido(pedidoInvalido)).toThrow();
    });

    it("debería rechazar un pedido con email inválido", () => {
      const pedidoInvalido = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        usuario_nombre: "Usuario Test",
        usuario_email: "email-invalido", // Email inválido
        direccion: "Calle de prueba, 123",
        ciudad: "Ciudad Test",
        estado: "Estado Test",
        productos: [
          {
            id: "123e4567-e89b-12d3-a456-426614174001",
            name: "Producto de prueba",
            price: 10000,
            quantity: 2,
            total: 20000,
          },
        ],
        total: 20000,
      };

      expect(() => validatePedido(pedidoInvalido)).toThrow();
    });
  });

  // Error handling tests
  describe("Manejo de errores", () => {
    it("debería formatear errores de Zod correctamente", () => {
      try {
        productSchema.parse({
          // Datos inválidos para provocar un error
        });
      } catch (error) {
        const formattedErrors = formatZodError(error);

        // Verificar formato de errores
        expect(formattedErrors).toBeTypeOf("object");
        expect(Object.keys(formattedErrors).length).toBeGreaterThan(0);
      }
    });

    it("debería crear una instancia de ValidationError", () => {
      const error = new ValidationError("Error de validación", {
        field1: ["Error en campo 1"],
      });

      expect(error).toBeInstanceOf(ValidationError);
      expect(error.name).toBe("ValidationError");
      expect(error.errors).toEqual({ field1: ["Error en campo 1"] });
    });

    it("debería crear una instancia de DatabaseError", () => {
      const originalError = new Error("Error original");
      const error = new DatabaseError("Error de base de datos", originalError);

      expect(error).toBeInstanceOf(DatabaseError);
      expect(error.name).toBe("DatabaseError");
      expect(error.cause).toBe(originalError);
    });
  });
});
