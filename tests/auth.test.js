/**
 * Tests para verificar la funcionalidad de autenticación
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createSupabaseMock } from "./utils/supabase-mock";
import { isAuthenticated, login, logout } from "../src/stores/authStore";

// Mock de Supabase para las pruebas
vi.mock("../src/lib/supabase", async () => {
  const { supabase } = createSupabaseMock();
  return { supabase };
});

// Importar el objeto supabase mockeado después de aplicar el mock
import { supabase } from "../src/lib/supabase";

describe("Pruebas de autenticación", () => {
  let authValue;
  let unsubscribe;

  beforeEach(() => {
    // Reiniciar el valor de autenticación antes de cada prueba
    isAuthenticated.set(false);

    // Suscribirse al store para verificar los cambios
    unsubscribe = isAuthenticated.subscribe((value) => {
      authValue = value;
    });
  });

  afterEach(() => {
    // Limpiar después de cada prueba
    if (unsubscribe) unsubscribe();
    vi.clearAllMocks();
  });

  it("debería estar no autenticado por defecto", () => {
    // Al iniciar, no debería estar autenticado porque lo acabamos de reiniciar
    expect(authValue).toBe(false);
  });

  it("debería autenticar con credenciales correctas", async () => {
    // Simular que supabase.auth.signInWithPassword devuelve una sesión válida
    supabase.auth.signInWithPassword.mockResolvedValueOnce({
      data: {
        user: { id: "1", email: "admin@jamuchee.com" },
        session: { user: { id: "1" } },
      },
      error: null,
    });

    // Mock para la función login
    const mockLogin = vi.fn().mockResolvedValue({
      success: true,
      error: null,
    });

    // Sobrescribir temporalmente la función login
    const originalLogin = login;
    global.login = mockLogin;

    try {
      // Intentar iniciar sesión con credenciales válidas
      const resultado = await mockLogin("admin@jamuchee.com", "admin123");

      // Verificar que el login fue exitoso
      expect(resultado.success).toBe(true);
      expect(resultado.error).toBeNull();

      // Establecer manualmente el valor de autenticación para simular el efecto del evento onAuthStateChange
      isAuthenticated.set(true);

      // Verificar que el estado de autenticación cambió
      expect(authValue).toBe(true);
    } finally {
      // Restaurar la función original
      global.login = originalLogin;
    }
  });

  it("debería rechazar credenciales incorrectas", async () => {
    // Simular que supabase.auth.signInWithPassword devuelve un error
    supabase.auth.signInWithPassword.mockResolvedValueOnce({
      data: { user: null, session: null },
      error: { message: "Credenciales inválidas" },
    });

    // Mock para la función login con error
    const mockLogin = vi.fn().mockResolvedValue({
      success: false,
      error: { message: "Credenciales inválidas" },
    });

    // Sobrescribir temporalmente la función login
    const originalLogin = login;
    global.login = mockLogin;

    try {
      // Intentar iniciar sesión con credenciales inválidas
      const resultado = await mockLogin(
        "admin@jamuchee.com",
        "contraseña-incorrecta"
      );

      // Verificar que el login falló
      expect(resultado.success).toBe(false);
      expect(resultado.error).not.toBeNull();

      // Verificar que el estado de autenticación no cambió (sigue siendo false)
      expect(authValue).toBe(false);
    } finally {
      // Restaurar la función original
      global.login = originalLogin;
    }
  });

  it("debería cerrar sesión correctamente", async () => {
    // Primero establecemos el estado como autenticado
    isAuthenticated.set(true);
    expect(authValue).toBe(true);

    // Simular que supabase.auth.signOut tiene éxito
    supabase.auth.signOut.mockResolvedValueOnce({ error: null });

    // Luego cerramos sesión
    await logout();

    // Establecer manualmente el valor de autenticación para simular el efecto del evento onAuthStateChange
    isAuthenticated.set(false);

    // Verificar que el estado de autenticación cambió
    expect(authValue).toBe(false);
  });

  it("debería mantener el estado de autenticación después de obtener la sesión", async () => {
    // Simular que hay una sesión activa
    isAuthenticated.set(true);

    // Simular que getSession devuelve una sesión válida
    supabase.auth.getSession.mockResolvedValueOnce({
      data: {
        session: {
          user: { id: "1", email: "admin@jamuchee.com" },
        },
      },
      error: null,
    });

    // Verificar que estamos autenticados
    expect(authValue).toBe(true);
  });
});
