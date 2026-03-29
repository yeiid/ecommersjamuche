/**
 * Authentication API
 * Maneja el inicio de sesión del administrador mediante cookies seguras.
 */

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function POST({ request, cookies }) {
  try {
    const { password, action } = await request.json();

    if (action === "logout") {
      cookies.delete("admin_session", { path: "/admin" });
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    if (password === ADMIN_PASSWORD) {
      // Establecer cookie de sesión por 24 horas
      cookies.set("admin_session", "authenticated", {
        path: "/admin",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 horas
      });

      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    return new Response(
      JSON.stringify({ success: false, message: "Contraseña incorrecta" }),
      { status: 401 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error de servidor" }), {
      status: 500,
    });
  }
}
