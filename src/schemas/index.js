/**
 * Punto de entrada para los esquemas de validación
 * Exporta todos los esquemas y utilidades para validación de datos
 */

// Esquemas de entidades
export * from "./product.schema.js";
export * from "./especie.schema.js";
export * from "./pedido.schema.js";
export * from "./client.schema.js";

// Utilidades de manejo de errores
export * from "./errors.js";

// Utilidad para generar un ID único
export function generateId() {
  return crypto.randomUUID();
}

// Convertir un array a formato Postgres
export function arrayToPostgres(array) {
  if (!Array.isArray(array) || array.length === 0) return null;
  return JSON.stringify(array);
}

// Convertir un objeto a formato Postgres JSON
export function objectToPostgres(obj) {
  if (!obj || Object.keys(obj).length === 0) return null;
  return JSON.stringify(obj);
}
