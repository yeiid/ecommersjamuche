import { getStoreConfig, saveStoreConfig } from "../../config/store.config";
import path from "node:path";

/**
 * Endpoint para obtener o actualizar la configuración
 */
export async function GET() {
  const config = getStoreConfig();
  return new Response(JSON.stringify(config), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}

export async function POST({ request }) {
  try {
    const newConfig = await request.json();
    
    // Log para debuggear en producción/dokploy
    const filePath = path.resolve(process.cwd(), "data/store.json");
    console.log(`[API] Recibida actualización. Productos: ${newConfig.products?.length}. Ruta: ${filePath}`);

    // Guardar en el archivo JSON
    const success = saveStoreConfig(newConfig);

    if (success) {
      return new Response(
        JSON.stringify({ message: "Configuración guardada correctamente", count: newConfig.products?.length }),
        { 
          status: 200,
          headers: { "Content-Type": "application/json" }
        }
      );
    } else {
      return new Response(
        JSON.stringify({ error: "Error al escribir en el disco" }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("[API ERROR]", error);
    return new Response(JSON.stringify({ error: "Datos inválidos o error de servidor" }), {
      status: 400,
    });
  }
}
