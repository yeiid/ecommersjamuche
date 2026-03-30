import { getUsers } from "../../config/user.config";

/**
 * Authentication API
 * Maneja el inicio de sesión para Súper Admin (Maestro) y Admins (Clientes).
 */

// En Astro, las variables de entorno se acceden preferiblemente vía import.meta.env
// proceso.env es para compatibilidad con Node puro, pero Astro prefiere import.meta.env
const MASTER_PASSWORD = import.meta.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "admin123";

export async function POST({ request, cookies }) {
  try {
    const body = await request.json();
    const { username, password, action } = body;
    
    // Log de confirmación de versión
    console.log(`[AUTH-SYSTEM-v2] Procesando petición...`);
    console.log(`[AUTH-DEBUG] Acción: ${action || 'login'} | Usuario: ${username || '(vacío)'}`);

    if (action === "logout") {
      // Usar cookies.set con fecha 1970 es más efectivo que delete en localhost
      cookies.set("admin_session", "", { 
        path: "/", 
        expires: new Date(0), 
        httpOnly: true, 
        sameSite: "lax" 
      });
      // También limpiar /admin por si acaso quedó rastro
      cookies.set("admin_session", "", { 
        path: "/admin", 
        expires: new Date(0), 
        httpOnly: true, 
        sameSite: "lax" 
      });
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    // 1. Verificar si es el Súper Admin (Usando Contraseña Maestra)
    // El Súper Admin entra sin username (vacío) y con la contraseña del .env
    if (password === MASTER_PASSWORD) {
      console.log("[AUTH-DEBUG] Súper Admin detectado con Clave Maestra");
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
