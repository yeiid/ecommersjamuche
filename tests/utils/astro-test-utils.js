/**
 * Utilidades para facilitar el testing de componentes Astro
 */
import { vi } from "vitest";

/**
 * Prepara un entorno Astro simulado para testing
 * @param {Object} options - Opciones de configuración
 * @param {Object} options.props - Props para el componente Astro
 * @param {Object} options.request - Opciones para la solicitud
 * @param {String} options.request.method - Método HTTP (GET, POST, etc.)
 * @param {Map|null} options.request.formData - Datos de formulario simulados
 * @param {Function} options.redirect - Función de redirección mock
 * @returns {Object} - El objeto global con Astro configurado
 */
export function setupAstroTest({
  props = {},
  request = { method: "GET", formData: null },
  redirect = vi.fn(),
} = {}) {
  // Configurar un objeto Astro simulado en global
  global.Astro = {
    props,
    request: {
      method: request.method,
      formData: vi.fn().mockResolvedValue(request.formData || null),
    },
    redirect: redirect || vi.fn(),
  };

  // Configurar utilidades comunes para tests
  if (!global.crypto) {
    global.crypto = {
      randomUUID: vi.fn().mockReturnValue("test-uuid"),
    };
  }

  // Configurar window si no existe
  if (typeof window === "undefined") {
    global.window = {};
  }

  // Configurar document si no existe pero estamos en un entorno que lo soporta
  if (typeof document === "undefined" && typeof window !== "undefined") {
    global.document = {
      createElement: vi.fn(() => ({
        addEventListener: vi.fn(),
        appendChild: vi.fn(),
        querySelector: vi.fn(),
      })),
      getElementById: vi.fn(() => ({
        addEventListener: vi.fn(),
        appendChild: vi.fn(),
        querySelector: vi.fn(),
        parentElement: {
          querySelector: vi.fn(),
          appendChild: vi.fn(),
        },
      })),
      querySelector: vi.fn(),
      querySelectorAll: vi.fn(() => []),
    };
  }

  return global;
}

/**
 * Crea un FormData simulado para pruebas
 * @param {Object} data - Datos para el FormData
 * @returns {Map} - Un Map que simula un FormData
 */
export function createMockFormData(data = {}) {
  const formData = new Map();

  Object.entries(data).forEach(([key, value]) => {
    formData.set(key, value);
  });

  return formData;
}

/**
 * Limpia el entorno de testing de Astro
 */
export function cleanupAstroTest() {
  delete global.Astro;
  vi.restoreAllMocks();
}
