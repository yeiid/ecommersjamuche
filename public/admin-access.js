/**
 * Script para acceso directo al panel administrador
 *
 * Versión optimizada que evita múltiples intentos de autenticación
 * y simplifica el proceso de acceso administrativo.
 */

// Variables para control de autenticación
const AUTH_KEY = "jamuchee_admin_auth";
const DEV_KEY = "devModeAuth";
const SESSION_KEY = "session_checked";
let authInitialized = false;

// Función para activar acceso administrativo
window.activarAdmin = function () {
  if (authInitialized) return; // Evitar activaciones repetidas

  // Configurar autenticación en localStorage
  localStorage.setItem(DEV_KEY, "true");
  localStorage.setItem(AUTH_KEY, "true");
  localStorage.setItem("authStatus", "authenticated");
  sessionStorage.setItem(SESSION_KEY, "true");

  console.log("✅ Acceso administrativo activado");
  authInitialized = true;

  // Redireccionar al dashboard si no estamos ya allí
  if (!window.location.pathname.includes("/dashboard")) {
    window.location.href = "/admin/dashboard";
  }
};

// Función para desactivar acceso administrativo
window.borrarAccesoAdmin = function () {
  localStorage.removeItem(DEV_KEY);
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem("authStatus");
  sessionStorage.removeItem(SESSION_KEY);

  console.log("🚫 Acceso administrativo desactivado");
  authInitialized = false;
  window.location.href = "/admin";
};

// Ejecutar cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAuth);
} else {
  initAuth();
}

function initAuth() {
  // Evitar inicialización repetida
  if (authInitialized) return;

  const isDev =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  // Si ya está autenticado, marcar como inicializado
  if (localStorage.getItem(AUTH_KEY) === "true") {
    authInitialized = true;
    return;
  }

  // Auto-activar en desarrollo y en páginas admin que no sean la página principal de login
  if (
    isDev &&
    window.location.pathname.startsWith("/admin") &&
    window.location.pathname !== "/admin"
  ) {
    // Si ya está en dashboard u otra página admin, solo marcar como autenticado sin redireccionar
    localStorage.setItem(DEV_KEY, "true");
    localStorage.setItem(AUTH_KEY, "true");
    localStorage.setItem("authStatus", "authenticated");
    sessionStorage.setItem(SESSION_KEY, "true");
    authInitialized = true;
    console.log("✅ Modo desarrollo: autenticación automática activada");
  } else if (isDev && window.location.pathname === "/admin") {
    // En la página principal de login en desarrollo, ofrecer login automático después de 3 segundos
    console.log("🔐 Estás en la página de login en modo desarrollo");
    console.log(
      "💡 Puedes usar 'activarAdmin()' en la consola para acceder automáticamente"
    );

    // No activar automáticamente para permitir pruebas del flujo normal
    // setTimeout(window.activarAdmin, 3000);
  }
}
