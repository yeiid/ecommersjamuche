import { withAdmin } from "./supabase.js";

/**
 * Inserta múltiples productos en la base de datos de forma eficiente
 * @param {Array} products - Array de objetos producto a insertar
 * @param {Object} options - Opciones de configuración
 * @param {number} options.batchSize - Tamaño de cada lote (por defecto 50)
 * @returns {Promise<Array>} - Los productos insertados con sus IDs
 */
export async function bulkInsertProducts(
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
 * Actualiza múltiples productos en la base de datos de forma eficiente
 * @param {Array} products - Array de objetos producto a actualizar (deben incluir ID)
 * @param {Object} options - Opciones de configuración
 * @param {number} options.batchSize - Tamaño de cada lote (por defecto 50)
 * @returns {Promise<Array>} - Los productos actualizados
 */
export async function bulkUpdateProducts(
  products,
  options = { batchSize: 50 }
) {
  if (!Array.isArray(products) || products.length === 0) {
    return [];
  }

  // Verificar que todos los productos tengan ID
  if (products.some((product) => !product.id)) {
    throw new Error(
      "Todos los productos deben tener un ID para actualización masiva"
    );
  }

  const { batchSize = 50 } = options;
  const results = [];

  // Dividir los productos en lotes
  const batches = [];
  for (let i = 0; i < products.length; i += batchSize) {
    batches.push(products.slice(i, i + batchSize));
  }

  // Utilizar el cliente admin para la operación
  await withAdmin(async (adminClient) => {
    for (const batch of batches) {
      // Para cada producto en el lote, realizar una actualización
      const batchPromises = batch.map((product) => {
        const { id, ...updateData } = product;
        return adminClient
          .from("products")
          .update(updateData)
          .eq("id", id)
          .select()
          .single();
      });

      const batchResults = await Promise.all(batchPromises);

      for (const result of batchResults) {
        if (result.error) {
          console.error("Error al actualizar producto:", result.error);
        } else if (result.data) {
          results.push(result.data);
        }
      }
    }
  });

  return results;
}

/**
 * Elimina múltiples productos en la base de datos de forma eficiente
 * @param {Array<string>} productIds - Array de IDs de productos a eliminar
 * @param {Object} options - Opciones de configuración
 * @param {number} options.batchSize - Tamaño de cada lote (por defecto 50)
 * @returns {Promise<number>} - Número de productos eliminados
 */
export async function bulkDeleteProducts(
  productIds,
  options = { batchSize: 50 }
) {
  if (!Array.isArray(productIds) || productIds.length === 0) {
    return 0;
  }

  const { batchSize = 50 } = options;
  let deletedCount = 0;

  // Dividir los IDs en lotes
  const batches = [];
  for (let i = 0; i < productIds.length; i += batchSize) {
    batches.push(productIds.slice(i, i + batchSize));
  }

  // Utilizar el cliente admin para la operación
  await withAdmin(async (adminClient) => {
    for (const batch of batches) {
      const { error, count } = await adminClient
        .from("products")
        .delete({ count: "exact" })
        .in("id", batch);

      if (error) {
        console.error("Error al eliminar lote de productos:", error);
        throw error;
      }

      deletedCount += count || 0;
    }
  });

  return deletedCount;
}

/**
 * Importa productos desde un archivo CSV o JSON
 * @param {string|Object} source - Contenido del archivo o objeto JSON
 * @param {string} format - Formato del archivo: 'csv' o 'json'
 * @returns {Promise<Array>} - Productos importados con sus IDs
 */
export async function importProducts(source, format = "json") {
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

/**
 * Exporta productos a formato JSON o CSV
 * @param {Array} products - Productos a exportar
 * @param {string} format - Formato de salida: 'csv' o 'json'
 * @returns {string} - Datos en el formato solicitado
 */
export function exportProducts(products, format = "json") {
  if (!Array.isArray(products)) {
    throw new Error("Los productos deben ser un array");
  }

  if (format === "json") {
    return JSON.stringify(products, null, 2);
  } else if (format === "csv") {
    if (products.length === 0) {
      return "";
    }

    // Obtener todos los headers posibles
    const headers = Array.from(
      new Set(products.flatMap((product) => Object.keys(product)))
    );

    // Crear la línea de cabecera
    let csv = headers.join(",") + "\n";

    // Agregar cada producto
    for (const product of products) {
      const row = headers.map((header) => {
        const value = product[header];
        // Manejar valores especiales (undefined, null, strings con comas)
        if (value === undefined || value === null) {
          return "";
        } else if (typeof value === "string" && value.includes(",")) {
          return `"${value}"`;
        } else if (typeof value === "object") {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        }
        return value;
      });

      csv += row.join(",") + "\n";
    }

    return csv;
  } else {
    throw new Error(`Formato no soportado: ${format}. Use 'json' o 'csv'`);
  }
}
