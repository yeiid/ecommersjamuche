import { getUsers, saveUsers } from "../../config/user.config";

/**
 * Users API (Solo accesible para Súper Admin)
 */
export async function GET({ cookies }) {
  const session = cookies.get("admin_session");
  console.log("[AUTH-DEBUG] GET /api/users.json | Session:", session?.value || "MISSING");
  
  if (!session || session.value !== "role:super") {
    return new Response(JSON.stringify({ error: "No autorizado" }), { status: 403 });
  }

  const users = getUsers();
  return new Response(JSON.stringify(users), { status: 200 });
}

export async function POST({ request, cookies }) {
  const session = cookies.get("admin_session");
  console.log("[AUTH-DEBUG] POST /api/users.json | Session:", session?.value || "MISSING");
  
  if (!session || session.value !== "role:super") {
    return new Response(JSON.stringify({ error: "No autorizado" }), { status: 403 });
  }

  try {
    const newUser = await request.json();
    const users = getUsers();
    
    // Evitar duplicados
    if (users.find(u => u.username === newUser.username)) {
      return new Response(JSON.stringify({ error: "El usuario ya existe" }), { status: 400 });
    }

    users.push(newUser);
    saveUsers(users);
    
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error procesando solicitud" }), { status: 500 });
  }
}

export async function DELETE({ url, cookies }) {
  const session = cookies.get("admin_session");
  console.log("[AUTH-DEBUG] DELETE /api/users.json | Session:", session?.value || "MISSING");

  if (!session || session.value !== "role:super") {
    return new Response(JSON.stringify({ error: "No autorizado" }), { status: 403 });
  }

  const id = url.searchParams.get("id");
  if (!id) return new Response(null, { status: 400 });

  const users = getUsers();
  const filtered = users.filter(u => u.id !== id);
  
  if (saveUsers(filtered)) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }
  
  return new Response(null, { status: 500 });
}
