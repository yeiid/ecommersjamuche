import { writable } from "svelte/store";
import { supabase } from "../lib/supabase";
import { 
  validateProduct, 
  prepareProductForSave, 
  generateProductId,
  productIdSchema,
  DatabaseError,
  formatSupabaseError
} from "../schemas";

// Almacén de productos
export const productsStore = writable([]);

// Store para el estado de carga
export const productsLoading = writable(false);

// Store para mensajes de error
export const productsError = writable("");

// Productos iniciales de ejemplo
const initialProducts = [
  {
    id: "c07b85f8-6a3d-4a5e-a321-987654321001",
    name: "Aceite Esencial de Lavanda",
    price: 25000,
    discountprice: 0,
    image: "/productos/aceite-lavanda.jpg",
    description:
      "Aceite esencial 100% puro de lavanda, ideal para aromaterapia y relajación.",
    category: "Aceites esenciales",
    stock: 50,
    isnew: false,
    rating: 4.5,
    features: ["100% puro", "Sin químicos", "Relajante", "Aroma duradero"],
    ingredients: ["Aceite de lavanda", "Extracto de flores"],
    especieid: "c07b85f8-6a3d-4a5e-a321-987654321011",
  },
  {
    id: "c07b85f8-6a3d-4a5e-a321-987654321002",
    name: "Crema Hidratante de Aloe Vera",
    price: 35000,
    discountprice: 29000,
    image: "/productos/crema-aloe.jpg",
    description:
      "Crema hidratante con aloe vera para pieles sensibles, hidrata profundamente.",
    category: "Cuidado de piel",
    stock: 30,
    isnew: true,
    rating: 4.8,
    features: [
      "Hidratación profunda",
      "Para piel sensible",
      "Sin parabenos",
      "No testado en animales",
    ],
    ingredients: [
      "Aloe vera",
      "Glicerina",
      "Vitamina E",
      "Extractos botánicos",
    ],
    especieid: "c07b85f8-6a3d-4a5e-a321-987654321012",
  },
  {
    id: "c07b85f8-6a3d-4a5e-a321-987654321003",
    name: "Infusión de Manzanilla",
    price: 15000,
    discountprice: 0,
    image: "/productos/infusion-manzanilla.jpg",
    description:
      "Infusión de manzanilla 100% natural, ideal para relajarse y mejorar la digestión.",
    category: "Infusiones",
    stock: 100,
    isnew: false,
    rating: 4.3,
    features: ["100% natural", "Propiedades calmantes", "Mejora la digestión"],
    ingredients: ["Flores de manzanilla secas"],
    especieid: "c07b85f8-6a3d-4a5e-a321-987654321013",
  },
];

// Cargar productos
export async function loadProducts() {
  productsLoading.set(true);
  productsError.set("");

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, especies(*)");

    if (error) throw new DatabaseError("Error al cargar productos", error);

    productsStore.set(data || []);
  } catch (error) {
    const errorMessage = error instanceof DatabaseError 
      ? error.message 
      : "Error al cargar los productos: " + error.message;
    
    productsError.set(errorMessage);
    console.error(errorMessage, error);
  } finally {
    productsLoading.set(false);
  }
}

// Cargar todos los productos
export async function getAllProducts() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, especies(*)");

    if (error) throw new DatabaseError("Error al cargar productos", error);

    productsStore.set(data || []);
    return data || [];
  } catch (error) {
    console.error("Error al cargar productos:", error);
    return [];
  }
}

// Obtener un producto por ID
export async function getProductById(id) {
  try {
    // Validar formato de ID
    productIdSchema.parse({ id });

    const { data, error } = await supabase
      .from("products")
      .select("*, especies(*)")
      .eq("id", id)
      .single();

    if (error) throw new DatabaseError(`Error al obtener producto ${id}`, error);
    
    return data;
  } catch (error) {
    console.error(`Error al obtener producto ${id}:`, error);
    return null;
  }
}

// Guardar un producto (crear o actualizar)
export async function saveProduct(product) {
  try {
    // Determinar si es una inserción o actualización
    const isNew = !product.id;
    
    // Preparar y validar el producto
    const validatedProduct = prepareProductForSave(product, !isNew);
    
    // Extraer el ID si existe
    const { id, ...productData } = validatedProduct;

    if (id) {
      // Actualizar producto existente
      const { data, error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        const formattedError = formatSupabaseError(error);
        throw new DatabaseError(formattedError._error, error);
      }

      // Actualizar el store
      productsStore.update((products) => {
        const index = products.findIndex((p) => p.id === id);
        if (index !== -1) {
          products[index] = data;
        }
        return products;
      });

      return data;
    } else {
      // Generar ID para nuevo producto si no lo tiene
      const productWithId = {
        ...productData,
        id: generateProductId()
      };
      
      // Crear nuevo producto
      const { data, error } = await supabase
        .from("products")
        .insert(productWithId)
        .select()
        .single();

      if (error) {
        const formattedError = formatSupabaseError(error);
        throw new DatabaseError(formattedError._error, error);
      }

      // Actualizar el store
      productsStore.update((products) => [...products, data]);

      return data;
    }
  } catch (error) {
    console.error("Error al guardar producto:", error);
    throw error;
  }
}

// Eliminar un producto
export async function deleteProduct(id) {
  try {
    // Validar formato de ID
    productIdSchema.parse({ id });
    
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) throw new DatabaseError(`Error al eliminar producto ${id}`, error);

    // Actualizar el store
    productsStore.update((products) => products.filter((p) => p.id !== id));

    return true;
  } catch (error) {
    console.error(`Error al eliminar producto ${id}:`, error);
    return false;
  }
}

// Obtener productos destacados
export async function getFeaturedProducts() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("featured", true)
      .limit(6);

    if (error) throw new DatabaseError("Error al cargar productos destacados", error);
    
    return data || [];
  } catch (error) {
    console.error("Error al cargar productos destacados:", error);
    return [];
  }
}

// Obtener productos nuevos
export async function getNewProducts() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("isnew", true)
      .limit(8);

    if (error) throw new DatabaseError("Error al cargar productos nuevos", error);
    
    return data || [];
  } catch (error) {
    console.error("Error al cargar productos nuevos:", error);
    return [];
  }
}

// Obtener productos con descuento
export async function getDiscountProducts() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .gt("discountprice", 0)
      .limit(8);

    if (error) throw new DatabaseError("Error al cargar productos con descuento", error);
    
    return data || [];
  } catch (error) {
    console.error("Error al cargar productos con descuento:", error);
    return [];
  }
}

// Buscar productos
export async function searchProducts(query) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .ilike("name", `%${query}%`);

    if (error) throw new DatabaseError(`Error al buscar productos con "${query}"`, error);
    
    return data || [];
  } catch (error) {
    console.error(`Error al buscar productos con "${query}":`, error);
    return [];
  }
}

// Obtener productos por categoría
export async function getProductsByCategory(category) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category);

    if (error) throw new DatabaseError(`Error al cargar productos de categoría ${category}`, error);
    
    return data || [];
  } catch (error) {
    console.error(`Error al cargar productos de categoría ${category}:`, error);
    return [];
  }
}

// Obtener productos por especie
export async function getProductsByEspecie(especieId) {
  try {
    // Validar formato de ID
    productIdSchema.parse({ id: especieId });
    
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("especieid", especieId);

    if (error) throw new DatabaseError(`Error al cargar productos de especie ${especieId}`, error);
    
    return data || [];
  } catch (error) {
    console.error(`Error al cargar productos de especie ${especieId}:`, error);
    return [];
  }
}

// Inicializar los productos
loadProducts();
