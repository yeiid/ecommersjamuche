import { getUsers } from "../../config/user.config";

/**
 * Authentication API
 * Maneja el inicio de sesión para Súper Admin (Maestro) y Admins (Clientes).
 */

const MASTER_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function POST({ request, cookies }) {
  try {
    const body = await request.json();
    const { username, password, action } = body;
    console.log(`[AUTH-DEBUG] POST /api/auth | Acción: ${action || 'login'} | Usuario: ${username || 'maestro'}`);

    if (action === "logout") {
      cookies.delete("admin_session", { path: "/" });
      cookies.delete("admin_session", { path: "/admin" }); // Limpiar rastro viejo si existe
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    // Limpiar cookie vieja de /admin antes de crear la nueva en /
    cookies.delete("admin_session", { path: "/admin" });

    // 1. Verificar si es el Súper Admin (Usando Contraseña Maestra de Env)
    // El Súper Admin entra sin username o con username 'superadmin'
    if (password === MASTER_PASSWORD) {
       cookies.set("admin_session", "role:super", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 horas
      });
      return new Response(JSON.stringify({ success: true, role: "super" }), { status: 200 });
    }

    // 2. Verificar en la base de datos de usuarios (Admins/Clientes)
    if (username) {
      const users = getUsers();
      const user = users.find(u => u.username === username && u.password === password);
      
      if (user) {
        cookies.set("admin_session", `role:admin:${user.username}`, {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24,
        });
        return new Response(JSON.stringify({ success: true, role: "admin" }), { status: 200 });
      }
    }

    return new Response(
      JSON.stringify({ success: false, message: "Credenciales incorrectas" }),
      { status: 401 }
    );
  } catch (error) {
    console.error("Auth Error:", error);
    return new Response(JSON.stringify({ error: "Error de servidor" }), {
      status: 500,
    });
  }
}
