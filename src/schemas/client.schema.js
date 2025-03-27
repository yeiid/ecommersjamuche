/**
 * Esquemas de validación para el lado del cliente utilizando Zod
 * Estos esquemas aseguran que los datos utilizados en el frontend sean consistentes
 * y tengan el formato correcto antes de ser procesados.
 */

import { z } from "zod";

// Variable para controlar si estamos en modo de prueba
let isTestMode = false;

// Modo de desarrollo
const isDev =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

// Esquema básico para productos en el carrito/lista de deseos
export const clientProductSchema = z.object({
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
export const testClientProductSchema = z.object({
  id: z.string().min(1, "El ID del producto es obligatorio"),
  name: z.string().min(1, "El nombre del producto es obligatorio"),
  price: z.number().int().positive("El precio debe ser un número positivo"),
  image: z.string().min(1, "La imagen del producto es obligatoria"),
  description: z.string().optional().default(""),
  category: z.string().optional().default(""),
  discountprice: z.number().int().nonnegative().optional().default(0),
});

// Esquema para productos en el carrito (incluye cantidad)
export const cartItemSchema = clientProductSchema.extend({
  quantity: z.number().int().positive("La cantidad debe ser mayor a cero"),
  total: z.number().int().nonnegative(),
});

// Esquema para productos en el carrito en pruebas
export const testCartItemSchema = testClientProductSchema.extend({
  quantity: z.number().int().positive("La cantidad debe ser mayor a cero"),
  total: z.number().int().nonnegative(),
});

// Esquema para la información de contacto/checkout
export const contactInfoSchema = z.object({
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
 * Funciones de utilidad para validar elementos en el lado del cliente
 */

// Activar o desactivar modo de prueba
export function setTestMode(enabled = true) {
  isTestMode = enabled;
}

// Obtener el estado actual del modo de prueba
export function isInTestMode() {
  return isTestMode;
}

// Validar un producto antes de agregarlo al carrito o lista de deseos
export function validateClientProduct(product) {
  try {
    // Usar el esquema de prueba si estamos en modo prueba
    if (isTestMode) {
      return testClientProductSchema.parse(product);
    }
    return clientProductSchema.parse(product);
  } catch (error) {
    console.error("Error al validar producto:", error, product);

    // En desarrollo, permitir productos con formato incorrecto
    if (isDev) {
      return {
        id: product.id || "temp-id-" + Date.now(),
        name: product.name || "Producto sin nombre",
        price: typeof product.price === "number" ? product.price : 0,
        image: product.image || "/placeholder.jpg",
        description: product.description || "",
        category: product.category || "",
        discountprice:
          typeof product.discountprice === "number" ? product.discountprice : 0,
      };
    }
    throw error;
  }
}

// Validar un ítem del carrito completo
export function validateCartItem(item) {
  try {
    // Usar el esquema de prueba si estamos en modo prueba
    if (isTestMode) {
      return testCartItemSchema.parse(item);
    }
    return cartItemSchema.parse(item);
  } catch (error) {
    console.error("Error al validar item del carrito:", error, item);

    // En desarrollo, permitir items con formato incorrecto
    if (isDev) {
      return {
        id: item.id || "temp-id-" + Date.now(),
        name: item.name || "Producto sin nombre",
        price: typeof item.price === "number" ? item.price : 0,
        image: item.image || "/placeholder.jpg",
        description: item.description || "",
        category: item.category || "",
        discountprice:
          typeof item.discountprice === "number" ? item.discountprice : 0,
        quantity:
          typeof item.quantity === "number" && item.quantity > 0
            ? item.quantity
            : 1,
        total: typeof item.total === "number" ? item.total : item.price || 0,
      };
    }
    throw error;
  }
}

// Validar información de contacto/checkout
export function validateContactInfo(info) {
  return contactInfoSchema.parse(info);
}

// Calcular el total de un ítem del carrito
export function calculateItemTotal(item) {
  const price = item.discountprice > 0 ? item.discountprice : item.price;
  return price * item.quantity;
}

// Preparar un producto para agregar al carrito
export function prepareProductForCart(product, quantity = 1) {
  try {
    // Validar el producto básico
    const validatedProduct = validateClientProduct(product);

    // Calcular el total
    const total = calculateItemTotal({
      ...validatedProduct,
      quantity,
    });

    // Crear el ítem de carrito completo
    const cartItem = {
      ...validatedProduct,
      quantity,
      total,
    };

    return validateCartItem(cartItem);
  } catch (error) {
    console.error(
      "Error al preparar producto para el carrito:",
      error,
      product
    );

    // En desarrollo, crear un item básico
    if (isDev) {
      const safePrice = typeof product.price === "number" ? product.price : 0;
      const safeQuantity =
        typeof quantity === "number" && quantity > 0 ? quantity : 1;

      return {
        id: product.id || "temp-id-" + Date.now(),
        name: product.name || "Producto sin nombre",
        price: safePrice,
        image: product.image || "/placeholder.jpg",
        description: product.description || "",
        category: product.category || "",
        discountprice:
          typeof product.discountprice === "number" ? product.discountprice : 0,
        quantity: safeQuantity,
        total: safePrice * safeQuantity,
      };
    }
    throw error;
  }
}

// Convertir un objeto FormData a un objeto de información de contacto
export function formDataToContactInfo(formData) {
  const contactInfo = {
    nombre: formData.get("nombre")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    telefono: formData.get("telefono")?.toString() || "",
    direccion: formData.get("direccion")?.toString() || "",
    ciudad: formData.get("ciudad")?.toString() || "",
    estado: formData.get("estado")?.toString() || "",
    codigoPostal: formData.get("codigoPostal")?.toString() || "",
    notas: formData.get("notas")?.toString() || "",
  };

  return validateContactInfo(contactInfo);
}

// Validar y formatear un precio
export function validatePrice(price) {
  if (typeof price === "string") {
    // Primero remover símbolos de moneda y espacios
    price = price.replace(/[$€£\s]/g, "");
    // Luego reemplazar comas por nada y puntos decimales por nada
    // (asumiendo que queremos el precio en números enteros)
    price = price.replace(/,/g, "").replace(/\.\d+$/, "");
    // Convertir a número
    price = parseInt(price, 10);
  }

  if (isNaN(price) || price < 0) {
    throw new Error("El precio debe ser un número positivo");
  }

  return price;
}
