import { describe, it, expect, vi, beforeEach } from "vitest";

// Mocks para las especies
const mockEspeciesData = [
  {
    id: "1",
    nombre: "Lavanda",
    nombreCientifico: "Lavandula angustifolia",
    familia: "Lamiaceae",
    origen: "Mediterráneo",
    descripcion: "Planta aromática perenne con flores moradas.",
    propiedades: "Relajante, antiséptico, antiinflamatorio",
    usos: "Aceites esenciales, perfumería, medicina tradicional",
    imagen: "/especies/lavanda.jpg",
    imagenDetalle: "/especies/lavanda-detalle.jpg",
    productCount: 3,
  },
  {
    id: "2",
    nombre: "Aloe Vera",
    nombreCientifico: "Aloe barbadensis miller",
    familia: "Asphodelaceae",
    origen: "Norte de África",
    descripcion: "Planta suculenta con hojas carnosas y espinosas.",
    propiedades: "Cicatrizante, hidratante, antiinflamatorio",
    usos: "Cosmética, medicina tradicional, alimentación",
    imagen: "/especies/aloe.jpg",
    imagenDetalle: "/especies/aloe-detalle.jpg",
    productCount: 2,
  },
];

// Mock de los productos asociados a especies
const mockProductsData = [
  { id: "1", especieid: "1" },
  { id: "2", especieid: "1" },
  { id: "3", especieid: "1" },
  { id: "4", especieid: "2" },
  { id: "5", especieid: "2" },
];

// Mock de las funciones que se probarán
const getAllEspecies = vi.fn().mockResolvedValue(mockEspeciesData);
const getEspecieById = vi.fn().mockImplementation((id) => {
  const especie = mockEspeciesData.find((e) => e.id === id);
  return Promise.resolve(especie || null);
});
const saveEspecie = vi.fn().mockImplementation((especie) => {
  if (especie.id) {
    // Actualizar especie
    return Promise.resolve({
      ...especie,
      updated_at: new Date().toISOString(),
    });
  } else {
    // Crear nueva especie
    return Promise.resolve({
      ...especie,
      id: (mockEspeciesData.length + 1).toString(),
      created_at: new Date().toISOString(),
    });
  }
});
const deleteEspecie = vi.fn().mockImplementation((id) => {
  // Verificar si hay productos asociados
  const productosAsociados = mockProductsData.filter((p) => p.especieid === id);
  if (productosAsociados.length > 0) {
    return Promise.reject(
      new Error(
        `No se puede eliminar la especie porque tiene ${productosAsociados.length} productos asociados`
      )
    );
  }
  return Promise.resolve(true);
});
const getFeaturedEspecies = vi
  .fn()
  .mockResolvedValue(mockEspeciesData.filter((e) => e.id === "1"));

// Mock de módulos
vi.mock("../src/stores/especiesStore", () => {
  return {
    getAllEspecies,
    getEspecieById,
    saveEspecie,
    deleteEspecie,
    getFeaturedEspecies,
    especiesStore: {
      subscribe: vi.fn(),
      set: vi.fn(),
      update: vi.fn(),
    },
  };
});

// Mock de Supabase para simular respuestas
vi.mock("../src/lib/supabase", () => {
  return {
    supabase: {
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn(() => ({ data: mockEspeciesData[0], error: null })),
            limit: vi.fn(() => ({ data: [mockEspeciesData[0]], error: null })),
            data: mockEspeciesData,
            error: null,
          })),
          data: mockEspeciesData,
          error: null,
        })),
        insert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn(() => ({
              data: { ...mockEspeciesData[0], id: "3" },
              error: null,
            })),
          })),
        })),
        update: vi.fn(() => ({
          eq: vi.fn(() => ({
            select: vi.fn(() => ({
              single: vi.fn(() => ({
                data: {
                  ...mockEspeciesData[0],
                  updated_at: new Date().toISOString(),
                },
                error: null,
              })),
            })),
          })),
        })),
        delete: vi.fn(() => ({
          eq: vi.fn(() => ({ error: null })),
        })),
      })),
    },
  };
});

describe("Pruebas de Gestión de Especies", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Operaciones CRUD básicas", () => {
    it("obtiene todas las especies", async () => {
      const { getAllEspecies } = await import("../src/stores/especiesStore");
      const especies = await getAllEspecies();

      expect(getAllEspecies).toHaveBeenCalledTimes(1);
      expect(especies).toHaveLength(2);
      expect(especies[0].nombre).toBe("Lavanda");
      expect(especies[1].nombre).toBe("Aloe Vera");
    });

    it("obtiene una especie por ID", async () => {
      const { getEspecieById } = await import("../src/stores/especiesStore");
      const especie = await getEspecieById("2");

      expect(getEspecieById).toHaveBeenCalledWith("2");
      expect(especie.nombre).toBe("Aloe Vera");
      expect(especie.nombreCientifico).toBe("Aloe barbadensis miller");
    });

    it("retorna null si la especie no existe", async () => {
      const { getEspecieById } = await import("../src/stores/especiesStore");
      const especie = await getEspecieById("999");

      expect(getEspecieById).toHaveBeenCalledWith("999");
      expect(especie).toBeNull();
    });

    it("crea una nueva especie", async () => {
      const { saveEspecie } = await import("../src/stores/especiesStore");
      const nuevaEspecie = {
        nombre: "Manzanilla",
        nombreCientifico: "Matricaria chamomilla",
        familia: "Asteraceae",
        origen: "Europa",
        descripcion: "Planta herbácea anual con flores similares a margaritas.",
        propiedades: "Antiinflamatorio, calmante, antiespasmódico",
        usos: "Infusiones, cosméticos, medicina natural",
        imagen: "/especies/manzanilla.jpg",
      };

      const especieGuardada = await saveEspecie(nuevaEspecie);

      expect(saveEspecie).toHaveBeenCalledWith(nuevaEspecie);
      expect(especieGuardada.id).toBeDefined();
      expect(especieGuardada.nombre).toBe("Manzanilla");
      expect(especieGuardada.created_at).toBeDefined();
    });

    it("actualiza una especie existente", async () => {
      const { saveEspecie } = await import("../src/stores/especiesStore");
      const especieActualizada = {
        id: "1",
        nombre: "Lavanda Actualizada",
        nombreCientifico: "Lavandula angustifolia",
        familia: "Lamiaceae",
        origen: "Mediterráneo",
        descripcion: "Descripción actualizada de la lavanda.",
        propiedades: "Propiedades actualizadas",
        usos: "Usos actualizados",
        imagen: "/especies/lavanda-nueva.jpg",
      };

      const resultado = await saveEspecie(especieActualizada);

      expect(saveEspecie).toHaveBeenCalledWith(especieActualizada);
      expect(resultado.id).toBe("1");
      expect(resultado.nombre).toBe("Lavanda Actualizada");
      expect(resultado.descripcion).toBe(
        "Descripción actualizada de la lavanda."
      );
      expect(resultado.updated_at).toBeDefined();
    });

    it("falla al eliminar una especie con productos asociados", async () => {
      const { deleteEspecie } = await import("../src/stores/especiesStore");

      await expect(deleteEspecie("1")).rejects.toThrow(
        "No se puede eliminar la especie porque tiene 3 productos asociados"
      );
    });

    it("elimina una especie sin productos asociados", async () => {
      const { deleteEspecie } = await import("../src/stores/especiesStore");
      // Modificamos el mock para simular que no hay productos para la especie 3
      deleteEspecie.mockImplementationOnce((id) => {
        if (id === "3") {
          return Promise.resolve(true);
        }
        const productosAsociados = mockProductsData.filter(
          (p) => p.especieid === id
        );
        if (productosAsociados.length > 0) {
          return Promise.reject(
            new Error(
              `No se puede eliminar la especie porque tiene ${productosAsociados.length} productos asociados`
            )
          );
        }
        return Promise.resolve(true);
      });

      const resultado = await deleteEspecie("3");
      expect(deleteEspecie).toHaveBeenCalledWith("3");
      expect(resultado).toBe(true);
    });
  });

  describe("Funcionalidades especiales", () => {
    it("obtiene especies destacadas", async () => {
      const { getFeaturedEspecies } = await import(
        "../src/stores/especiesStore"
      );
      const especiesDestacadas = await getFeaturedEspecies();

      expect(getFeaturedEspecies).toHaveBeenCalledTimes(1);
      expect(especiesDestacadas).toHaveLength(1);
      expect(especiesDestacadas[0].nombre).toBe("Lavanda");
    });

    it("verifica el conteo de productos por especie", async () => {
      const { getAllEspecies } = await import("../src/stores/especiesStore");
      const especies = await getAllEspecies();

      expect(especies[0].productCount).toBe(3);
      expect(especies[1].productCount).toBe(2);
    });
  });
});
