import { w as writable } from './index_DEom4rlB.mjs';
import { s as supabase } from './supabase_DCsDQftD.mjs';
import { z } from 'zod';

/**
 * Esquemas de validación para productos utilizando Zod
 * Estos esquemas aseguran que los datos enviados a la base de datos cumplan con los tipos esperados
 * y utilicen los nombres de campos correctos (todo en minúsculas como espera Supabase)
 */


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
    .optional(),
});

// Esquema para productos completos (con ID)
productBaseSchema.extend({
  id: z.string().uuid("El ID del producto debe ser un UUID válido"),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

// Esquema para actualización parcial de productos
productBaseSchema.partial();

// Esquema para validar IDs
const productIdSchema = z.object({
  id: z.string().uuid("El ID del producto debe ser un UUID válido"),
});

/**
 * Esquemas de validación para especies utilizando Zod
 * Estos esquemas aseguran que los datos enviados a la base de datos cumplan con los tipos esperados
 */


// Esquema base para valores comunes entre creación y actualización
const especieBaseSchema = z.object({
  nombre: z.string().min(1, "El nombre de la especie es obligatorio"),
  nombreCientifico: z.string().min(1, "El nombre científico es obligatorio"),
  familia: z.string().optional(),
  origen: z.string().optional(),
  descripcion: z.string().min(1, "La descripción de la especie es obligatoria"),
  propiedades: z.string().optional(),
  usos: z.string().optional(),
  imagen: z.string().min(1, "La imagen de la especie es obligatoria"),
  imagenDetalle: z.string().optional(),
  featured: z.boolean().optional().default(false),
});

// Esquema para especies completas (con ID)
especieBaseSchema.extend({
  id: z.string().uuid("El ID de la especie debe ser un UUID válido"),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

// Esquema para actualización parcial de especies
especieBaseSchema.partial();

// Esquema para validar IDs
z.object({
  id: z.string().uuid("El ID de la especie debe ser un UUID válido"),
});

/**
 * Esquemas de validación para pedidos utilizando Zod
 * Estos esquemas aseguran que los datos enviados a la base de datos cumplan con los tipos esperados
 */


// Esquema para un producto en el pedido
const pedidoProductoSchema = z.object({
  id: z.string().uuid("El ID del producto debe ser un UUID válido"),
  name: z.string().min(1, "El nombre del producto es obligatorio"),
  price: z.number().int().positive("El precio debe ser un número positivo"),
  discountprice: z.number().int().nonnegative().optional().default(0),
  quantity: z.number().int().positive("La cantidad debe ser un número positivo"),
  image: z.string().optional(),
  total: z.number().int().nonnegative(),
});

// Esquema base para pedidos
const pedidoBaseSchema = z.object({
  usuario_nombre: z.string().min(1, "El nombre del usuario es obligatorio"),
  usuario_email: z.string().email("El email debe tener un formato válido"),
  usuario_telefono: z.string().optional(),
  direccion: z.string().min(1, "La dirección es obligatoria"),
  ciudad: z.string().min(1, "La ciudad es obligatoria"),
  estado: z.string().min(1, "El estado/provincia es obligatorio"),
  codigo_postal: z.string().optional(),
  productos: z.array(pedidoProductoSchema).min(1, "El pedido debe tener al menos un producto"),
  total: z.number().int().positive("El total debe ser un número positivo"),
  estado_pedido: z.string().optional().default("pendiente"),
  notas: z.string().optional(),
});

// Esquema para pedidos completos (con ID)
pedidoBaseSchema.extend({
  id: z.string().uuid("El ID del pedido debe ser un UUID válido"),
  fecha_pedido: z.string().datetime().optional(),
  fecha_envio: z.string().datetime().optional(),
});

// Esquema para actualización parcial de pedidos
pedidoBaseSchema.partial();

// Esquema para validar IDs
z.object({
  id: z.string().uuid("El ID del pedido debe ser un UUID válido"),
});

/**
 * Esquemas de validación para el lado del cliente utilizando Zod
 * Estos esquemas aseguran que los datos utilizados en el frontend sean consistentes
 * y tengan el formato correcto antes de ser procesados.
 */


// Variable para controlar si estamos en modo de prueba
let isTestMode = false;

// Modo de desarrollo
const isDev =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

// Esquema básico para productos en el carrito/lista de deseos
const clientProductSchema = z.object({
  // En desarrollo o modo prueba, aceptar cualquier string como ID
  // En producción, mantener la validación estricta de UUID
  id:
    isDev || isTestMode
      ? z.string().min(1, "El ID del producto es obligatorio")
      : z.string().uuid("El ID del producto debe ser un UUID válido"),
  name: z.string().min(1, "El nombre del producto es obligatorio"),
  price: z.number().int().positive("El precio debe ser un número positivo"),
  image: z.string().min(1, "La imagen del producto es obligatoria"),
  description: z.string().optional().default(""),
  category: z.string().optional().default(""),
  discountprice: z.number().int().nonnegative().optional().default(0),
});

// Esquema para pruebas que permite IDs simples
const testClientProductSchema = z.object({
  id: z.string().min(1, "El ID del producto es obligatorio"),
  name: z.string().min(1, "El nombre del producto es obligatorio"),
  price: z.number().int().positive("El precio debe ser un número positivo"),
  image: z.string().min(1, "La imagen del producto es obligatoria"),
  description: z.string().optional().default(""),
  category: z.string().optional().default(""),
  discountprice: z.number().int().nonnegative().optional().default(0),
});

// Esquema para productos en el carrito (incluye cantidad)
clientProductSchema.extend({
  quantity: z.number().int().positive("La cantidad debe ser mayor a cero"),
  total: z.number().int().nonnegative(),
});

// Esquema para productos en el carrito en pruebas
testClientProductSchema.extend({
  quantity: z.number().int().positive("La cantidad debe ser mayor a cero"),
  total: z.number().int().nonnegative(),
});

// Esquema para la información de contacto/checkout
z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("El email debe tener un formato válido"),
  telefono: z
    .string()
    .min(7, "El teléfono debe tener al menos 7 dígitos")
    .optional(),
  direccion: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  ciudad: z.string().min(3, "La ciudad debe tener al menos 3 caracteres"),
  estado: z
    .string()
    .min(3, "El estado/provincia debe tener al menos 3 caracteres"),
  codigoPostal: z.string().optional(),
  notas: z.string().optional(),
});

/**
 * Utilidades para manejar errores de validación con Zod
 */


/**
 * Clase de error para operaciones de base de datos
 */
class DatabaseError extends Error {
  constructor(message, cause = null) {
    super(message);
    this.name = "DatabaseError";
    this.cause = cause;
  }
}

// Almacén de productos
const productsStore = writable([]);

// Store para el estado de carga
const productsLoading = writable(false);

// Store para mensajes de error
const productsError = writable("");

// Cargar productos
async function loadProducts() {
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
async function getAllProducts() {
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
async function getProductById(id) {
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

// Inicializar los productos
loadProducts();

export { getProductById as a, getAllProducts as g };
