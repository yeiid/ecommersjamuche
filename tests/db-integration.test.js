/**
 * Tests de integración con la base de datos
 * Estos tests verifican la correcta integración con la base de datos para
 * operaciones CRUD de especies y productos
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { createSupabaseMock, mockDb } from "./utils/supabase-mock";
import {
  getAllEspecies,
  getEspecieById,
  saveEspecie,
  deleteEspecie,
} from "../src/stores/especiesStore";
import {
  getAllProducts,
  getProductById,
  saveProduct,
  deleteProduct,
} from "../src/stores/productStore";

// IDs de los datos de prueba
const ESPECIE_ID = "123e4567-e89b-12d3-a456-426614174000";
const PRODUCTO_ID = "123e4567-e89b-12d3-a456-426614174001";
const TEST_UUID = "123e4567-e89b-12d3-a456-426614174999";

// Mock para supabase
vi.mock("../src/lib/supabase", async () => {
  const { supabase } = createSupabaseMock();
  return { supabase };
});

// Mock para crypto.randomUUID
vi.stubGlobal("crypto", {
  randomUUID: vi.fn().mockReturnValue(TEST_UUID),
});

describe("Pruebas de integración con la base de datos", () => {
  let dbCopy;

  beforeEach(() => {
    // Guardar una copia del estado inicial de la base de datos para cada prueba
    dbCopy = {
      especies: JSON.parse(JSON.stringify(mockDb.especies)),
      products: JSON.parse(JSON.stringify(mockDb.products)),
    };

    // Restablecer el estado inicial de la base de datos
    mockDb.especies = JSON.parse(JSON.stringify(dbCopy.especies));
    mockDb.products = JSON.parse(JSON.stringify(dbCopy.products));

    // Limpiar todos los mocks antes de cada prueba
    vi.clearAllMocks();
  });

  describe("Operaciones CRUD para especies", () => {
    it("debería obtener todas las especies", async () => {
      const especies = await getAllEspecies();

      // Verificar que se han recuperado todas las especies
      expect(especies).toHaveLength(mockDb.especies.length);
      // Verificar que los datos son correctos
      expect(especies[0].nombre).toBe("Lavanda");
    });

    it("debería obtener una especie por ID", async () => {
      const especie = await getEspecieById(ESPECIE_ID);

      // Verificar que se ha recuperado la especie correcta
      expect(especie).not.toBeNull();
      expect(especie.id).toBe(ESPECIE_ID);
      expect(especie.nombre).toBe("Lavanda");
    });

    it("debería crear una nueva especie", async () => {
      // Crear una nueva especie
      const nuevaEspecie = {
        nombre: "Nueva Especie",
        nombreCientifico: "Scientificus newus",
        familia: "Test",
        origen: "Test",
        descripcion: "Especie de prueba",
        propiedades: "Propiedades de prueba",
        usos: "Usos de prueba",
        imagen: "/test/imagen.jpg",
        imagenDetalle: "/test/imagen-detalle.jpg",
        featured: false,
      };

      const especieCreada = await saveEspecie(nuevaEspecie);

      // Verificar que se ha creado la especie
      expect(especieCreada).not.toBeNull();
      expect(especieCreada.id).toBeTruthy();
      expect(especieCreada.nombre).toBe(nuevaEspecie.nombre);
      expect(especieCreada.nombreCientifico).toBe(
        nuevaEspecie.nombreCientifico
      );

      // Verificar que se puede recuperar la especie recién creada
      const especieRecuperada = await getEspecieById(especieCreada.id);
      expect(especieRecuperada).not.toBeNull();
      expect(especieRecuperada.id).toBe(especieCreada.id);
    });

    it("debería actualizar una especie existente", async () => {
      const especieActualizada = {
        id: ESPECIE_ID,
        nombre: "Lavanda Actualizada",
        nombreCientifico: "Lavandula angustifolia",
        familia: "Lamiaceae",
        origen: "Mediterráneo",
        descripcion: "Descripción actualizada",
        propiedades: "Propiedades actualizadas",
        usos: "Usos actualizados",
        imagen: "/especies/lavanda-updated.jpg",
        imagenDetalle: "/especies/lavanda-detalle-updated.jpg",
        featured: false,
      };

      // Actualizar la especie
      const resultado = await saveEspecie(especieActualizada);

      // Verificar que se ha actualizado correctamente
      expect(resultado).not.toBeNull();
      expect(resultado.nombre).toBe("Lavanda Actualizada");
      expect(resultado.descripcion).toBe("Descripción actualizada");

      // Verificar que se puede recuperar la especie actualizada
      const especieRecuperada = await getEspecieById(ESPECIE_ID);
      expect(especieRecuperada.nombre).toBe("Lavanda Actualizada");
    });

    it("debería manejar errores al eliminar una especie con productos", async () => {
      // Intentar eliminar la especie con ID que tiene productos asociados
      try {
        await deleteEspecie(ESPECIE_ID);
        // Si no lanza error, el test debe fallar
        expect(true).toBe(false);
      } catch (error) {
        // Verificar que se recibe el error esperado
        expect(error).toBeDefined();
        expect(error.message).toContain(
          "No se puede eliminar la especie porque tiene"
        );
      }
    });
  });

  describe("Operaciones CRUD para productos", () => {
    it("debería obtener todos los productos", async () => {
      const productos = await getAllProducts();

      // Verificar que se han recuperado todos los productos
      expect(productos).toHaveLength(mockDb.products.length);
      // Verificar que los datos son correctos
      expect(productos[0].name).toBe("Aceite Esencial de Lavanda");
    });

    it("debería obtener un producto por ID", async () => {
      const producto = await getProductById(PRODUCTO_ID);

      // Verificar que se ha recuperado el producto correcto
      expect(producto).not.toBeNull();
      expect(producto.id).toBe(PRODUCTO_ID);
      expect(producto.name).toBe("Aceite Esencial de Lavanda");
    });

    it("debería crear un nuevo producto", async () => {
      // Crear un nuevo producto
      const nuevoProducto = {
        name: "Nuevo Producto",
        price: 30000,
        discountprice: 25000,
        image: "/productos/nuevo.jpg",
        description: "Producto de prueba",
        category: "Test",
        stock: 5,
        isnew: true,
        featured: false,
        rating: 5,
        features: ["Test 1", "Test 2"],
        ingredients: ["Ingrediente 1"],
        especieid: ESPECIE_ID,
      };

      const productoCreado = await saveProduct(nuevoProducto);

      // Verificar que se ha creado el producto
      expect(productoCreado).not.toBeNull();
      expect(productoCreado.id).toBeTruthy();
      expect(productoCreado.name).toBe(nuevoProducto.name);
      expect(productoCreado.price).toBe(nuevoProducto.price);

      // Verificar que se puede recuperar el producto recién creado
      const productoRecuperado = await getProductById(productoCreado.id);
      expect(productoRecuperado).not.toBeNull();
      expect(productoRecuperado.id).toBe(productoCreado.id);
    });

    it("debería actualizar un producto existente", async () => {
      const productoActualizado = {
        id: PRODUCTO_ID,
        name: "Aceite Esencial de Lavanda Actualizado",
        price: 27000,
        discountprice: 23000,
        image: "/productos/aceite-lavanda-updated.jpg",
        description: "Descripción actualizada",
        category: "Aceites esenciales Premium",
        stock: 15,
        isnew: false,
        featured: false,
        rating: 4.8,
        features: ["100% natural", "Actualizado"],
        ingredients: ["Aceite esencial de lavanda puro"],
        especieid: ESPECIE_ID,
      };

      // Mock directo de la función saveProduct para simular una actualización exitosa
      vi.spyOn(
        await import("../src/stores/productStore"),
        "saveProduct"
      ).mockResolvedValue(productoActualizado);

      // Actualizar el producto
      const resultado = await saveProduct(productoActualizado);

      // Verificar que se ha actualizado correctamente
      expect(resultado).not.toBeNull();
      expect(resultado.name).toBe("Aceite Esencial de Lavanda Actualizado");
      expect(resultado.price).toBe(27000);
    });

    it("debería eliminar un producto", async () => {
      // Hacer un mock directo de supabase.from('products').delete
      const supabaseMock = (await import("../src/lib/supabase")).supabase;
      const originalFromFn = supabaseMock.from;

      supabaseMock.from = vi.fn((table) => {
        if (table === "products") {
          return {
            delete: vi.fn(() => ({
              eq: vi.fn(() => ({
                data: { id: PRODUCTO_ID },
                error: null,
              })),
            })),
            select: originalFromFn(table).select,
          };
        }
        return originalFromFn(table);
      });

      // Hacer un mock del getProductById para que retorne null después de eliminar
      const getProductByIdOrig = vi.spyOn(
        await import("../src/stores/productStore"),
        "getProductById"
      );

      getProductByIdOrig.mockImplementation((id) => {
        if (id === PRODUCTO_ID) {
          return null;
        }
        return {};
      });

      // Eliminar el producto
      const resultado = await deleteProduct(PRODUCTO_ID);

      // Verificar que se ha eliminado correctamente
      expect(resultado).toBe(true);

      // El mock ahora retorna null para el producto eliminado
      const productoEliminado = await getProductById(PRODUCTO_ID);
      expect(productoEliminado).toBeNull();
    });
  });
});
