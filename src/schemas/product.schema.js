/**
 * Esquemas de validación para productos utilizando Zod
 * Versión moderna con mejores prácticas de validación, tipos más estrictos,
 * y un enfoque más consistente para los campos opcionales.
 */

import { z } from "zod";

// Validación específica para el precio
const priceSchema = z
  .number()
  .int("El precio debe ser un número entero")
  .positive("El precio debe ser un número positivo")
  .refine((val) => val >= 1000, "El precio mínimo es de 1000");

// Esquema para ID de producto
const productIdSchema = z
  .string()
  .uuid("El ID del producto debe ser un UUID válido");

// Esquema refinado para imágenes
const imageUrlSchema = z
  .string()
  .min(1, "La URL de imagen es obligatoria")
  .refine(
    (url) => url.startsWith("/") || url.startsWith("http"),
    "La imagen debe ser una ruta válida que empiece con '/' o 'http'"
  );

// Esquema base para valores comunes entre creación y actualización
const productBaseSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre del producto debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede exceder los 100 caracteres"),

  price: priceSchema,

  discountprice: z
    .number()
    .int("El precio con descuento debe ser un número entero")
    .nonnegative("El precio con descuento debe ser un número no negativo")
    .optional()
    .default(0),

  image: imageUrlSchema,

  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(2000, "La descripción no puede exceder los 2000 caracteres"),

  category: z
    .string()
    .min(2, "La categoría debe tener al menos 2 caracteres")
    .max(50, "La categoría no puede exceder los 50 caracteres"),

  stock: z
    .number()
    .int("El stock debe ser un número entero")
    .nonnegative("El stock no puede ser negativo")
    .optional()
    .default(0),

  isnew: z.boolean().optional().default(false),
  featured: z.boolean().optional().default(false),

  rating: z
    .number()
    .min(0, "La calificación mínima es 0")
    .max(5, "La calificación máxima es 5")
    .optional()
    .default(0),

  features: z.array(z.string()).optional().default([]),
  ingredients: z.array(z.string()).optional().default([]),
  cuidados: z.string().optional(),
  dificultad: z.string().optional(),

  especieid: z
    .union([productIdSchema, z.literal(""), z.null()])
    .optional()
    .nullable(),
});

// Esquema para creación de productos (sin ID)
export const createProductSchema = productBaseSchema;

// Esquema para productos completos (con ID)
export const productSchema = productBaseSchema.extend({
  id: productIdSchema,
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

// Esquema para actualización parcial de productos
export const updateProductSchema = productBaseSchema.partial();

// Esquema para validar IDs (exportar directamente para reuso)
export { productIdSchema };

/**
 * Funciones de utilidad para trabajar con esquemas de productos
 */

// Validar datos para crear un producto nuevo
export function validateNewProduct(data) {
  return createProductSchema.parse(data);
}

// Validar datos para actualizar un producto existente
export function validateUpdateProduct(data) {
  return updateProductSchema.parse(data);
}

// Validar un producto completo
export function validateProduct(product) {
  return productSchema.parse(product);
}

// Generar un nuevo ID para un producto
export function generateProductId() {
  return crypto.randomUUID();
}

// Preparar un producto para guardar en la base de datos
export function prepareProductForSave(productData, isNew = true) {
  try {
    // Copia profunda de los datos para evitar mutaciones
    const dataCopy = structuredClone(productData);

    // Si es un producto nuevo y no tiene ID, generamos uno
    if (isNew && !dataCopy.id) {
      dataCopy.id = generateProductId();
    }

    // Validamos según sea una creación o actualización
    return isNew
      ? validateNewProduct(dataCopy)
      : validateUpdateProduct(dataCopy);
  } catch (error) {
    console.error("Error al preparar producto:", error);
    throw error;
  }
}

// Transformar valores de formulario a formato de producto
export function formDataToProduct(formData, existingId = null) {
  // Obtener y validar especieid
  const especieidValue = formData.get("especieid")?.toString() || "";
  const especieid = especieidValue.trim() !== "" ? especieidValue : null;

  // Convertir características e ingredientes desde formato de texto
  const features = (formData.get("features")?.toString() || "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  const ingredients = (formData.get("ingredients")?.toString() || "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  // Construir objeto de producto con valores convertidos
  const product = {
    name: formData.get("name")?.toString() || "",
    price: parseInt(formData.get("price")?.toString() || "0", 10),
    discountprice: parseInt(
      formData.get("discountprice")?.toString() || "0",
      10
    ),
    image: formData.get("image")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    category: formData.get("category")?.toString() || "",
    stock: parseInt(formData.get("stock")?.toString() || "0", 10),
    isnew: formData.get("isnew") === "on",
    featured: formData.get("featured") === "on",
    rating: parseFloat(formData.get("rating")?.toString() || "0"),
    especieid,
    features,
    ingredients,
  };

  // Si existe un ID, lo incluimos
  if (existingId) {
    product.id = existingId;
  } else {
    // Si es un producto nuevo, generamos un UUID
    product.id = generateProductId();
  }

  // Validar el producto completo
  return validateProduct(product);
}
