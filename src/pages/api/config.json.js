import { getStoreConfig, saveStoreConfig } from "../../config/store.config";

/**
 * Endpoint para obtener o actualizar la configuración
 */
export async function GET() {
  const config = getStoreConfig();
  return new Response(JSON.stringify(config), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST({ request }) {
  try {
    const newConfig = await request.json();
    console.log(`[API] Guardando configuración. Productos en total: ${newConfig.products?.length || 0}`);

    // Guardar en el archivo JSON
    const success = saveStoreConfig(newConfig);

    if (success) {
      return new Response(
        JSON.stringify({ message: "Configuración guardada correctamente" }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ error: "Error al guardar el archivo" }),
        { status: 500 }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Datos inválidos" }), {
      status: 400,
    });
  }
}
