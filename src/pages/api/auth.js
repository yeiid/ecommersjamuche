import { getUsers } from "../../config/user.config";
import bcrypt from "bcryptjs";

/**
 * Authentication API — v3 con bcrypt
 * Maneja el inicio de sesión para Súper Admin (Maestro) y Admins (Clientes).
 * Las contraseñas se comparan usando bcrypt para evitar exposición en texto plano.
 */

const MASTER_EMAIL = import.meta.env.ADMIN_EMAIL || process.env.ADMIN_EMAIL || "yeifran67@gmail.com";
const MASTER_PASSWORD = import.meta.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "$2b$10$j9j9OHApeTTLzjM0bm6dXuqzN9qDN5LH0hAmk1mPcfB6hBvNSERne";

export async function POST({ request, cookies }) {
  try {
    const body = await request.json();
    const { username, password, action } = body;

    // ── Logout ──
    if (action === "logout") {
      const expired = { path: "/", expires: new Date(0), httpOnly: true, sameSite: "lax" };
      cookies.set("admin_session", "", expired);
      cookies.set("admin_session", "", { ...expired, path: "/admin" });
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    if (!username || !password) {
      return new Response(JSON.stringify({ success: false, message: "Credenciales requeridas" }), { status: 400 });
    }

    // ── 1. Verificar Súper Admin (Tu acceso universal VIP) ──
    // Acceso infalible para el desarrollador (ignora configuración del servidor)
    const DEV_EMAIL = "yeifran67@gmail.com";
    const DEV_HASH = "$2b$10$j9j9OHApeTTLzjM0bm6dXuqzN9qDN5LH0hAmk1mPcfB6hBvNSERne";

    const isDevUser = username.toLowerCase() === DEV_EMAIL.toLowerCase();
    let isMaster = false;

    if (isDevUser) {
      isMaster = await bcrypt.compare(password, DEV_HASH);
    } else if (username.toLowerCase() === MASTER_EMAIL.toLowerCase()) {
      // Acceso alternativo por variable de entorno
      const masterIsHashed = MASTER_PASSWORD.startsWith("$2");
      isMaster = masterIsHashed
        ? await bcrypt.compare(password, MASTER_PASSWORD)
        : password === MASTER_PASSWORD;
    }

    if (isMaster) {
      console.log(`[AUTH] Súper Admin (${username}) autenticado`);
      cookies.set("admin_session", "role:super", {
        path: "/",
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 horas
      });
      return new Response(JSON.stringify({ success: true, role: "super" }), { status: 200 });
    }

    // ── 2. Verificar usuario admin desde la base de datos ──
    if (username) {
      const cleanUsername = username.trim().toLowerCase();
      const users = getUsers();
      
      // Buscamos comparando limpiamente
      const user = users.find((u) => u.username.trim().toLowerCase() === cleanUsername);

      if (user) {
        // Soporta contraseñas hasheadas y planas (migración gradual)
        const passwordIsHashed = user.password.startsWith("$2");
        const isValid = passwordIsHashed
          ? await bcrypt.compare(password, user.password)
          : password === user.password;

        if (isValid) {
          console.log(`[AUTH] Admin '${cleanUsername}' autenticado`);
          cookies.set("admin_session", `role:admin:${user.username}`, {
            path: "/",
            httpOnly: true,
            secure: import.meta.env.PROD,
            sameSite: "lax",
            maxAge: 60 * 60 * 24, // 24 horas
          });
          return new Response(JSON.stringify({ success: true, role: "admin" }), { status: 200 });
        }
      }
    }

    // Pequeña demora para evitar brute force timing attacks
    await new Promise((r) => setTimeout(r, 300));

    return new Response(
      JSON.stringify({ success: false, message: "Credenciales incorrectas" }),
      { status: 401 }
    );
  } catch (error) {
    console.error("[AUTH] Error:", error);
    return new Response(JSON.stringify({ error: "Error de servidor" }), { status: 500 });
  }
}
