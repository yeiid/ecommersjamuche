/**
 * Script para acceso directo al panel administrador
 *
 * Versión modernizada que utiliza prácticas actuales de JavaScript
 * y mejora la seguridad del proceso de acceso administrativo.
 */

// Constantes para autenticación
const AUTH_KEY = "jamuchee_admin_auth";
const SESSION_KEY = "session_checked";
let authInitialized = false;

// Usar una función más segura para la activación
window.activarAdmin = () => {
  if (authInitialized) return; // Evitar activaciones repetidas

  try {
    // Configurar autenticación en localStorage
    localStorage.setItem(AUTH_KEY, "true");
    sessionStorage.setItem(SESSION_KEY, "true");

    console.log("✅ Acceso administrativo activado");
    authInitialized = true;

    // Redireccionar al dashboard si no estamos ya allí
    if (!window.location.pathname.includes("/dashboard")) {
      window.location.href = "/admin/dashboard";
    }
  } catch (error) {
    console.error("Error al activar acceso administrativo:", error);
  }
};

// Función para desactivar acceso, también modernizada
window.borrarAccesoAdmin = () => {
  try {
    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(SESSION_KEY);

    console.log("🚫 Acceso administrativo desactivado");
    authInitialized = false;
    window.location.href = "/admin";
  } catch (error) {
    console.error("Error al desactivar acceso administrativo:", error);
  }
};

// Usar DOMContentLoaded para inicialización
document.addEventListener("DOMContentLoaded", initAuth);

function initAuth() {
  // Evitar inicialización repetida
  if (authInitialized) return;

  const isDev =
    import.meta.env?.DEV ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  // Si ya está autenticado, marcar como inicializado
  if (localStorage.getItem(AUTH_KEY) === "true") {
    authInitialized = true;
    return;
  }

  // Auto-activar en desarrollo en páginas admin que no sean la principal de login
  if (
    isDev &&
    window.location.pathname.startsWith("/admin") &&
    window.location.pathname !== "/admin"
  ) {
    localStorage.setItem(AUTH_KEY, "true");
    sessionStorage.setItem(SESSION_KEY, "true");
    authInitialized = true;
    console.log("✅ Modo desarrollo: autenticación automática activada");
  } else if (isDev && window.location.pathname === "/admin") {
    console.log("🔐 Estás en la página de login en modo desarrollo");
    console.log(
      "💡 Puedes usar 'activarAdmin()' en la consola para acceder automáticamente"
    );
  }
}
