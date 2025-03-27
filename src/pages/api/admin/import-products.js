import { importProducts } from "../../../lib/bulkOperations.js";

// Endpoint para importar productos desde JSON o CSV
// Solo accesible para administradores autenticados
export async function POST({ request }) {
  try {
    // Verificar autenticación (idealmente se implementaría middleware de autenticación)
    // Por ahora, es una implementación básica

    // Obtener datos de la solicitud
    const data = await request.json();
    const { content, format } = data;

    if (!content) {
      return new Response(
        JSON.stringify({ error: "No se proporcionó contenido para importar" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Importar productos usando la función de bulkOperations
    const importedProducts = await importProducts(content, format);

    // Devolver respuesta exitosa
    return new Response(
      JSON.stringify({
        success: true,
        count: importedProducts.length,
        products: importedProducts.map((p) => p.id), // Solo devolver IDs por seguridad
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error al importar productos:", error);

    return new Response(
      JSON.stringify({
        error: "Error al importar productos",
        message: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
