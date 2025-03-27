import { writable } from "svelte/store";
import { supabase } from "../lib/supabase";

// Almacén de estado de autenticación
export const isAuthenticated = writable(false);
export const currentUser = writable(null);
export const authLoading = writable(true);
export const authError = writable(null);

// Inicializar sesión y escuchar cambios de autenticación
export async function initAuth() {
  try {
    authLoading.set(true);

    // Verificar si hay una sesión activa
    console.log("initAuth: Verificando sesión con Supabase...");
    const { data: sessionData } = await supabase.auth.getSession();

    if (sessionData.session) {
      console.log("initAuth: Sesión activa encontrada");
    } else {
      console.log("initAuth: No hay sesión activa");
    }

    updateAuthStores(sessionData.session);

    // Escuchar cambios en la autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log(
        "Auth state changed:",
        _event,
        session ? "Con sesión" : "Sin sesión"
      );
      updateAuthStores(session);
    });

    // Asegurarse de que la suscripción se limpia cuando la aplicación se cierra
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", () => {
        subscription.unsubscribe();
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error al inicializar autenticación:", error);
    authError.set(error.message);
    return { success: false, error };
  } finally {
    authLoading.set(false);
  }
}

// Actualizar los stores basados en el estado de la sesión
function updateAuthStores(session) {
  console.log(
    "Actualizando stores de auth:",
    session ? "Autenticado" : "No autenticado"
  );

  if (session) {
    isAuthenticated.set(true);
    currentUser.set(session.user);

    // Guardar un indicador en localStorage para detectar sesiones entre recargas
    if (typeof window !== "undefined") {
      localStorage.setItem("authStatus", "authenticated");
    }
  } else {
    isAuthenticated.set(false);
    currentUser.set(null);

    // Limpiar el indicador de localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("authStatus");
    }
  }
}

// Iniciar sesión con email y contraseña
export async function login(email, password) {
  try {
    authLoading.set(true);
    authError.set(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { success: true, user: data.user };
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    authError.set(error.message);
    return { success: false, error: error.message };
  } finally {
    authLoading.set(false);
  }
}

// Cerrar sesión
export async function logout() {
  try {
    authLoading.set(true);

    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return { success: false, error: error.message };
  } finally {
    authLoading.set(false);
  }
}

// Verificar si el usuario es admin
export function isAdmin(user) {
  if (!user) return false;

  // Verificar si el usuario tiene el rol de admin en los metadatos
  return user.app_metadata?.role === "admin";
}

// Inicializar autenticación
if (typeof window !== "undefined") {
  initAuth();
}
