/**
 * Utilidades para manejar errores de validación con Zod
 */

import { ZodError } from "zod";

/**
 * Clase de error para operaciones de base de datos
 */
export class DatabaseError extends Error {
  constructor(message, cause = null) {
    super(message);
    this.name = "DatabaseError";
    this.cause = cause;
  }
}

/**
 * Clase de error para validación de datos
 */
export class ValidationError extends Error {
  constructor(message, errors = []) {
    super(message);
    this.name = "ValidationError";
    this.errors = errors;
  }
}

/**
 * Formatea los errores de Zod para mostrarlos al usuario
 * @param {ZodError} error - Error de Zod
 * @returns {Object} - Objeto con errores formateados
 */
export function formatZodError(error) {
  if (!(error instanceof ZodError)) {
    return { _error: "Error desconocido" };
  }

  const formattedErrors = {};

  for (const issue of error.errors) {
    // Obtener el nombre del campo (primera parte de la ruta)
    const field = issue.path[0] || "_error";

    // Añadir el error al campo correspondiente
    if (!formattedErrors[field]) {
      formattedErrors[field] = [];
    }
    formattedErrors[field].push(issue.message);
  }

  return formattedErrors;
}

/**
 * Maneja un error de validación y retorna un objeto con los errores formateados
 * @param {Error} error - Error a manejar
 * @returns {Object} - Objeto con errores formateados para mostrar al usuario
 */
export function handleValidationError(error) {
  if (error instanceof ZodError) {
    return {
      success: false,
      errors: formatZodError(error),
      message: "Error de validación de datos",
    };
  }

  if (error instanceof ValidationError) {
    return {
      success: false,
      errors: error.errors,
      message: error.message,
    };
  }

  if (error instanceof DatabaseError) {
    return {
      success: false,
      errors: { _error: error.message },
      message: "Error de base de datos",
    };
  }

  // Error genérico
  return {
    success: false,
    errors: { _error: error.message || "Error desconocido" },
    message: "Se ha producido un error inesperado",
  };
}

/**
 * Valida los datos usando un esquema Zod y captura los errores
 * @param {Function} schemaFn - Función que contiene la validación con el esquema
 * @param {any} data - Datos a validar
 * @returns {Object} - Objeto con el resultado de la validación
 */
export function validateWithSchema(schemaFn, data) {
  try {
    const validatedData = schemaFn(data);
    return {
      success: true,
      data: validatedData,
    };
  } catch (error) {
    return handleValidationError(error);
  }
}

/**
 * Formatea los errores de Supabase para mostrarlos al usuario
 * @param {Error} error - Error de Supabase
 * @returns {Object} - Objeto con errores formateados
 */
export function formatSupabaseError(error) {
  if (!error) return { _error: "Error desconocido" };

  // Errores comunes de Supabase
  if (error.code === "23505") {
    return { _error: "Ya existe un registro con esos datos" };
  }

  if (error.code === "23503") {
    return { _error: "La referencia a otro registro no es válida" };
  }

  if (error.code === "22P02") {
    return { _error: "Formato de UUID inválido" };
  }

  // Error genérico
  return {
    _error: error.message || "Error en la operación con la base de datos",
  };
}
