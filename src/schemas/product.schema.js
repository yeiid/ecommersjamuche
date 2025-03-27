/**
 * Esquemas de validación para productos utilizando Zod
 * Estos esquemas aseguran que los datos enviados a la base de datos cumplan con los tipos esperados
 * y utilicen los nombres de campos correctos (todo en minúsculas como espera Supabase)
 */

import { z } from "zod";

// Esquema base para valores comunes entre creación y actualización
const productBaseSchema = z.object({
  name: z.string().min(1, "El nombre del producto es obligatorio"),
  price: z.number().int().positive("El precio debe ser un número positivo"),
  discountprice: z
    .number()
    .int()
    .nonnegative("El precio con descuento debe ser un número no negativo")
    .optional()
    .default(0),
  image: z.string().min(1, "La imagen del producto es obligatoria"),
  description: z.string().min(1, "La descripción del producto es obligatoria"),
  category: z.string().min(1, "La categoría del producto es obligatoria"),
  stock: z.number().int().nonnegative().optional().default(0),
  isnew: z.boolean().optional().default(false),
  featured: z.boolean().optional().default(false),
  rating: z.number().min(0).max(5).optional().default(0),
  features: z.array(z.string()).optional().default([]),
  ingredients: z.array(z.string()).optional().default([]),
  cuidados: z.string().optional(),
  dificultad: z.string().optional(),
  especieid: z
    .string()
    .uuid("El ID de especie debe ser un UUID válido")
    .optional()
    .nullable()
    .or(z.literal("")),
});

// Esquema para creación de productos (sin ID)
export const createProductSchema = productBaseSchema;

// Esquema para productos completos (con ID)
export const productSchema = productBaseSchema.extend({
  id: z.string().uuid("El ID del producto debe ser un UUID válido"),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

// Esquema para actualización parcial de productos
export const updateProductSchema = productBaseSchema.partial();

// Esquema para validar IDs
export const productIdSchema = z.object({
  id: z.string().uuid("El ID del producto debe ser un UUID válido"),
});

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
  // Si es un producto nuevo y no tiene ID, generamos uno
  if (isNew && !productData.id) {
    productData.id = generateProductId();
  }

  // Validamos según sea una creación o actualización
  if (isNew) {
    return validateNewProduct(productData);
  } else {
    return validateUpdateProduct(productData);
  }
}

// Transformar valores de formulario a formato de producto
export function formDataToProduct(formData, existingId = null) {
  const especieidValue = formData.get("especieid")?.toString() || "";

  // Solo usar el valor de especieid si no está vacío
  const especieid = especieidValue.trim() !== "" ? especieidValue : null;

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
    especieid: especieid,
    features: (formData.get("features")?.toString() || "")
      .split("\n")
      .filter((item) => item.trim() !== ""),
    ingredients: (formData.get("ingredients")?.toString() || "")
      .split("\n")
      .filter((item) => item.trim() !== ""),
  };

  // Si existe un ID, lo incluimos
  if (existingId) {
    product.id = existingId;
  } else {
    // Si es un producto nuevo, generamos un UUID
    product.id = generateProductId();
  }

  return validateProduct(product);
}
