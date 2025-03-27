import { w as withAdmin } from '../../../chunks/supabase_DCsDQftD.mjs';
export { renderers } from '../../../renderers.mjs';

/**
 * Inserta múltiples productos en la base de datos de forma eficiente
 * @param {Array} products - Array de objetos producto a insertar
 * @param {Object} options - Opciones de configuración
 * @param {number} options.batchSize - Tamaño de cada lote (por defecto 50)
 * @returns {Promise<Array>} - Los productos insertados con sus IDs
 */
async function bulkInsertProducts(
  products,
  options = { batchSize: 50 }
) {
  if (!Array.isArray(products) || products.length === 0) {
    return [];
  }

  const { batchSize = 50 } = options;
  const results = [];

  // Dividir los productos en lotes para evitar sobrecargar la API
  const batches = [];
  for (let i = 0; i < products.length; i += batchSize) {
    batches.push(products.slice(i, i + batchSize));
  }

  // Utilizar el cliente admin para la operación
  await withAdmin(async (adminClient) => {
    for (const batch of batches) {
      const { data, error } = await adminClient
        .from("products")
        .insert(batch)
        .select();

      if (error) {
        console.error("Error al insertar lote de productos:", error);
        throw error;
      }

      if (data) {
        results.push(...data);
      }
    }
  });

  return results;
}

/**
 * Importa productos desde un archivo CSV o JSON
 * @param {string|Object} source - Contenido del archivo o objeto JSON
 * @param {string} format - Formato del archivo: 'csv' o 'json'
 * @returns {Promise<Array>} - Productos importados con sus IDs
 */
async function importProducts(source, format = "json") {
  let products = [];

  if (format === "json") {
    if (typeof source === "string") {
      try {
        products = JSON.parse(source);
      } catch (e) {
        throw new Error(`Error al parsear JSON: ${e.message}`);
      }
    } else if (Array.isArray(source)) {
      products = source;
    } else {
      throw new Error("La fuente JSON debe ser un string o un array");
    }
  } else if (format === "csv") {
    if (typeof source !== "string") {
      throw new Error("La fuente CSV debe ser un string");
    }

    // Parseo básico de CSV (para un parseo más robusto, usar una librería)
    const lines = source.trim().split("\n");
    const headers = lines[0].split(",").map((h) => h.trim());

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim());
      const product = {};

      headers.forEach((header, index) => {
        // Intentar convertir valores numéricos
        if (values[index] && !isNaN(values[index])) {
          product[header] = Number(values[index]);
        } else {
          product[header] = values[index];
        }
      });

      products.push(product);
    }
  } else {
    throw new Error(`Formato no soportado: ${format}. Use 'json' o 'csv'`);
  }

  // Insertar los productos importados
  return await bulkInsertProducts(products);
}

// Endpoint para importar productos desde JSON o CSV
// Solo accesible para administradores autenticados
async function POST({ request }) {
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
