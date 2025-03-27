import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest";

// Mocks para las funciones
const mockProductsData = [
  {
    id: "1",
    name: "Aceite Esencial de Lavanda",
    price: 25000,
    discountPrice: 0,
    image: "/productos/aceite-lavanda.jpg",
    description: "Aceite esencial 100% puro de lavanda.",
    category: "Aceites esenciales",
    stock: 10,
  },
  {
    id: "2",
    name: "Crema Hidratante de Aloe Vera",
    price: 35000,
    discountPrice: 29000,
    image: "/productos/crema-aloe.jpg",
    description: "Crema hidratante con aloe vera para pieles sensibles.",
    category: "Cuidado de piel",
    stock: 5,
  },
];

// Mock de las funciones que se probarán
const getAllProducts = vi.fn().mockResolvedValue(mockProductsData);
const getProductById = vi.fn().mockImplementation((id) => {
  const product = mockProductsData.find((p) => p.id === id);
  return Promise.resolve(product || null);
});
const saveProduct = vi.fn().mockImplementation((product) => {
  if (product.id) {
    // Actualizar producto
    return Promise.resolve({
      ...product,
      updated_at: new Date().toISOString(),
    });
  } else {
    // Crear nuevo producto
    return Promise.resolve({
      ...product,
      id: (mockProductsData.length + 1).toString(),
      created_at: new Date().toISOString(),
    });
  }
});
const deleteProduct = vi.fn().mockImplementation((id) => {
  const productExists = mockProductsData.some((p) => p.id === id);
  return Promise.resolve(productExists);
});

// Mock para las operaciones por lotes
const bulkUpdateProducts = vi.fn().mockImplementation((products) => {
  return Promise.resolve(
    products.map((p) => ({ ...p, updated_at: new Date().toISOString() }))
  );
});

// Mock de módulos enteros
vi.mock("../src/stores/productStore", () => {
  return {
    getAllProducts,
    getProductById,
    saveProduct,
    deleteProduct,
  };
});

vi.mock("../src/utils/bulkOperations", () => {
  return {
    bulkUpdateProducts,
  };
});

describe("Pruebas de Gestión de Productos", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Operaciones CRUD básicas", () => {
    it("obtiene todos los productos", async () => {
      const { getAllProducts } = await import("../src/stores/productStore");
      const products = await getAllProducts();

      expect(getAllProducts).toHaveBeenCalledTimes(1);
      expect(products).toHaveLength(2);
      expect(products[0].name).toBe("Aceite Esencial de Lavanda");
      expect(products[1].name).toBe("Crema Hidratante de Aloe Vera");
    });

    it("obtiene un producto por ID", async () => {
      const { getProductById } = await import("../src/stores/productStore");
      const product = await getProductById("2");

      expect(getProductById).toHaveBeenCalledWith("2");
      expect(product.name).toBe("Crema Hidratante de Aloe Vera");
      expect(product.price).toBe(35000);
    });

    it("retorna null si el producto no existe", async () => {
      const { getProductById } = await import("../src/stores/productStore");
      const product = await getProductById("999");

      expect(getProductById).toHaveBeenCalledWith("999");
      expect(product).toBeNull();
    });

    it("crea un nuevo producto", async () => {
      const { saveProduct } = await import("../src/stores/productStore");
      const newProduct = {
        name: "Nuevo Producto",
        price: 15000,
        image: "/productos/nuevo.jpg",
        description: "Descripción del nuevo producto",
        category: "Aceites esenciales",
        stock: 20,
      };

      const savedProduct = await saveProduct(newProduct);

      expect(saveProduct).toHaveBeenCalledWith(newProduct);
      expect(savedProduct.id).toBeDefined();
      expect(savedProduct.name).toBe("Nuevo Producto");
      expect(savedProduct.created_at).toBeDefined();
    });

    it("actualiza un producto existente", async () => {
      const { saveProduct } = await import("../src/stores/productStore");
      const updatedProduct = {
        id: "1",
        name: "Aceite Esencial de Lavanda Actualizado",
        price: 27000,
        image: "/productos/aceite-lavanda.jpg",
        description: "Nueva descripción actualizada",
        category: "Aceites esenciales",
        stock: 15,
      };

      const result = await saveProduct(updatedProduct);

      expect(saveProduct).toHaveBeenCalledWith(updatedProduct);
      expect(result.id).toBe("1");
      expect(result.name).toBe("Aceite Esencial de Lavanda Actualizado");
      expect(result.price).toBe(27000);
      expect(result.updated_at).toBeDefined();
    });

    it("elimina un producto existente", async () => {
      const { deleteProduct } = await import("../src/stores/productStore");
      const result = await deleteProduct("2");

      expect(deleteProduct).toHaveBeenCalledWith("2");
      expect(result).toBe(true);
    });

    it("falla al eliminar un producto que no existe", async () => {
      const { deleteProduct } = await import("../src/stores/productStore");
      const result = await deleteProduct("999");

      expect(deleteProduct).toHaveBeenCalledWith("999");
      expect(result).toBe(false);
    });
  });

  describe("Operaciones por lotes", () => {
    it("actualiza múltiples productos a la vez", async () => {
      const { bulkUpdateProducts } = await import(
        "../src/utils/bulkOperations"
      );
      const productsToUpdate = [
        {
          id: "1",
          stock: 25,
        },
        {
          id: "2",
          stock: 30,
        },
      ];

      const updatedProducts = await bulkUpdateProducts(productsToUpdate);

      expect(bulkUpdateProducts).toHaveBeenCalledWith(productsToUpdate);
      expect(updatedProducts).toHaveLength(2);
      expect(updatedProducts[0].id).toBe("1");
      expect(updatedProducts[0].stock).toBe(25);
      expect(updatedProducts[0].updated_at).toBeDefined();
      expect(updatedProducts[1].id).toBe("2");
      expect(updatedProducts[1].stock).toBe(30);
      expect(updatedProducts[1].updated_at).toBeDefined();
    });
  });
});
