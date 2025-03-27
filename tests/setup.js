/**
 * Configuración global para pruebas
 */
import { vi } from "vitest";
import dotenv from "dotenv";

// Cargar variables de entorno para pruebas
dotenv.config({ path: ".env.test" });

// Si no existe .env.test, usar .env
if (!process.env.PUBLIC_SUPABASE_URL) {
  dotenv.config();
}

// Verificar que las variables de entorno estén cargadas
console.log("Variables de entorno cargadas para pruebas:");
console.log(
  "- PUBLIC_SUPABASE_URL:",
  process.env.PUBLIC_SUPABASE_URL ? "✓" : "✗"
);

// Si no está definida, establecer un valor de prueba
if (!process.env.PUBLIC_SUPABASE_URL) {
  process.env.PUBLIC_SUPABASE_URL = "https://mock-supabase-url.co";
}

console.log(
  "- PUBLIC_SUPABASE_ANON_KEY:",
  process.env.PUBLIC_SUPABASE_ANON_KEY ? "✓" : "✗"
);

// Si no está definida, establecer un valor de prueba
if (!process.env.PUBLIC_SUPABASE_ANON_KEY) {
  process.env.PUBLIC_SUPABASE_ANON_KEY = "mock-anon-key";
}

// Mock para localStorage en el entorno de pruebas
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    getAll: () => store,
    length: Object.keys(store).length,
  };
})();

// Asignar el mock a global
if (typeof window === "undefined") {
  global.localStorage = localStorageMock;
}

// Mock para fetch si es necesario
if (typeof fetch === "undefined") {
  global.fetch = vi.fn();
}

// Mock para objetos de navegador comunes si no existe window
if (typeof window === "undefined") {
  global.window = {};
  global.document = {
    createElement: vi.fn(() => ({
      style: {},
      setAttribute: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      appendChild: vi.fn(),
      querySelector: vi.fn(),
      querySelectorAll: vi.fn(() => []),
    })),
    body: {
      appendChild: vi.fn(),
      removeChild: vi.fn(),
    },
    head: {
      appendChild: vi.fn(),
    },
    getElementById: vi.fn(),
    querySelector: vi.fn(),
    querySelectorAll: vi.fn(() => []),
    getElementsByClassName: vi.fn(() => []),
  };
  global.navigator = {
    userAgent: "node",
  };
}

// Funciones globales de timeout
if (typeof setTimeout === "undefined") {
  global.setTimeout = vi.fn();
  global.clearTimeout = vi.fn();
}

// Activar automáticamente los mocks de vi
vi.mock("svelte/store", async () => {
  const actual = await vi.importActual("svelte/store");
  return {
    ...actual,
    // Si necesitas algún mock específico para svelte/store
  };
});
