import { supabase } from "../lib/supabase";

/**
 * Realiza operaciones por lotes para insertar múltiples productos a la vez
 * Esto reduce el número de peticiones a Supabase
 * @param {Array} products - Array de productos a insertar
 * @returns {Promise<Array>} - Los productos insertados
 */
export async function bulkInsertProducts(products) {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert(products)
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error al insertar productos en lote:", error);
    throw error;
  }
}

/**
 * Actualiza múltiples productos a la vez usando upsert
 * @param {Array} products - Array de productos con sus IDs
 * @returns {Promise<Array>} - Los productos actualizados
 */
export async function bulkUpdateProducts(products) {
  try {
    const { data, error } = await supabase
      .from("products")
      .upsert(products)
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error al actualizar productos en lote:", error);
    throw error;
  }
}

/**
 * Elimina múltiples productos por sus IDs
 * @param {Array} productIds - Array de IDs de productos a eliminar
 * @returns {Promise<boolean>} - True si se eliminaron correctamente
 */
export async function bulkDeleteProducts(productIds) {
  try {
    const { error } = await supabase
      .from("products")
      .delete()
      .in("id", productIds);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error al eliminar productos en lote:", error);
    return false;
  }
}

/**
 * Obtiene productos con filtrado avanzado y paginación
 * @param {Object} options - Opciones de filtrado
 * @returns {Promise<Object>} - Productos y metadatos de paginación
 */
export async function getProductsAdvanced(options = {}) {
  const {
    page = 1,
    limit = 10,
    category = null,
    especieId = null,
    search = null,
    minPrice = null,
    maxPrice = null,
    inStock = null,
    sortBy = "name",
    sortOrder = "asc",
  } = options;

  try {
    let query = supabase
      .from("products")
      .select("*, especies(*)", { count: "exact" });

    // Aplicar filtros
    if (category) query = query.eq("category", category);
    if (especieId) query = query.eq("especieid", especieId);
    if (search) query = query.ilike("name", `%${search}%`);
    if (minPrice) query = query.gte("price", minPrice);
    if (maxPrice) query = query.lte("price", maxPrice);
    if (inStock === true) query = query.gt("stock", 0);

    // Aplicar ordenamiento
    query = query.order(sortBy, { ascending: sortOrder === "asc" });

    // Aplicar paginación
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, count, error } = await query;

    if (error) throw error;

    return {
      products: data || [],
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    };
  } catch (error) {
    console.error("Error al obtener productos con filtrado avanzado:", error);
    return {
      products: [],
      pagination: { page, limit, total: 0, totalPages: 0 },
    };
  }
}
