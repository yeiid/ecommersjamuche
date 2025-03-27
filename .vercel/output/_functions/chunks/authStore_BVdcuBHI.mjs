import { w as writable } from './index_DEom4rlB.mjs';
import { s as supabase } from './supabase_DCsDQftD.mjs';

// Almacén de estado de autenticación
const isAuthenticated = writable(false);
const currentUser = writable(null);
const authLoading = writable(true);
const authError = writable(null);

// Inicializar sesión y escuchar cambios de autenticación
async function initAuth() {
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

// Inicializar autenticación
if (typeof window !== "undefined") {
  initAuth();
}

export { isAuthenticated as i };
