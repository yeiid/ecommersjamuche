import { defineMiddleware } from "astro:middleware";

/**
 * ═══════════════════════════════════════════════════════════
 * MIDDLEWARE DE AUTENTICACIÓN
 * ═══════════════════════════════════════════════════════════
 * Protege todas las rutas /admin/* y /api/* que requieren sesión.
 * Centraliza la validación de cookies en un solo lugar.
 */

// Rutas de la API que NO necesitan autenticación
const PUBLIC_API_ROUTES = ["/api/auth"];

// Rutas públicas que NO deben ser verificadas
const PUBLIC_ROUTES = ["/admin/login"];

export const onRequest = defineMiddleware(async ({ url, cookies, redirect }, next) => {
  const pathname = url.pathname;

  // ── Solo actuar en rutas /admin y /api protegidas ──
  const isAdminRoute = pathname.startsWith("/admin") && !PUBLIC_ROUTES.includes(pathname);
  const isProtectedApi =
    (pathname.startsWith("/api/config") || pathname.startsWith("/api/users")) &&
    !PUBLIC_API_ROUTES.some((r) => pathname.startsWith(r));

  if (!isAdminRoute && !isProtectedApi) {
    return next(); // Ruta pública → continuar sin verificar
  }

  // ── Validar sesión ──
  const session = cookies.get("admin_session")?.value;

  if (!session || !isValidSession(session)) {
    // Si es API → devolver 401 JSON
    if (isProtectedApi) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    // Si es página admin → redirigir al login
    return redirect("/admin/login?expired=1");
  }

  return next();
});

/**
 * Valida que el valor de la cookie sea un formato de sesión legítimo.
 * Formato válido: "role:super" | "role:admin:username"
 */
function isValidSession(session: string): boolean {
  if (!session || session.trim() === "") return false;
  return session.startsWith("role:super") || /^role:admin:[a-zA-Z0-9_\-\.]+$/.test(session);
}
