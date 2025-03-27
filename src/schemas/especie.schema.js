/**
 * Esquemas de validación para especies utilizando Zod
 * Estos esquemas aseguran que los datos enviados a la base de datos cumplan con los tipos esperados
 */

import { z } from "zod";

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

// Esquema para creación de especies (sin ID)
export const createEspecieSchema = especieBaseSchema;

// Esquema para especies completas (con ID)
export const especieSchema = especieBaseSchema.extend({
  id: z.string().uuid("El ID de la especie debe ser un UUID válido"),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

// Esquema para actualización parcial de especies
export const updateEspecieSchema = especieBaseSchema.partial();

// Esquema para validar IDs
export const especieIdSchema = z.object({
  id: z.string().uuid("El ID de la especie debe ser un UUID válido"),
});

/**
 * Funciones de utilidad para trabajar con esquemas de especies
 */

// Validar datos para crear una especie nueva
export function validateNewEspecie(data) {
  return createEspecieSchema.parse(data);
}

// Validar datos para actualizar una especie existente
export function validateUpdateEspecie(data) {
  return updateEspecieSchema.parse(data);
}

// Validar una especie completa
export function validateEspecie(especie) {
  return especieSchema.parse(especie);
}

// Generar un nuevo ID para una especie
export function generateEspecieId() {
  return crypto.randomUUID();
}

// Preparar una especie para guardar en la base de datos
export function prepareEspecieForSave(especieData, isNew = true) {
  // Si es una especie nueva y no tiene ID, generamos uno
  if (isNew && !especieData.id) {
    especieData.id = generateEspecieId();
  }

  // Validamos según sea una creación o actualización
  if (isNew) {
    return validateNewEspecie(especieData);
  } else {
    return validateUpdateEspecie(especieData);
  }
}

// Transformar valores de formulario a formato de especie
export function formDataToEspecie(formData, existingId = null) {
  const especie = {
    nombre: formData.get("nombre")?.toString() || "",
    nombreCientifico: formData.get("nombreCientifico")?.toString() || "",
    familia: formData.get("familia")?.toString() || undefined,
    origen: formData.get("origen")?.toString() || undefined,
    descripcion: formData.get("descripcion")?.toString() || "",
    propiedades: formData.get("propiedades")?.toString() || undefined,
    usos: formData.get("usos")?.toString() || undefined,
    imagen: formData.get("imagen")?.toString() || "",
    imagenDetalle: formData.get("imagenDetalle")?.toString() || undefined,
    featured: formData.get("featured") === "on",
  };

  // Si existe un ID, lo incluimos
  if (existingId) {
    especie.id = existingId;
  } else {
    // Si es una especie nueva, generamos un UUID
    especie.id = generateEspecieId();
  }

  return validateEspecie(especie);
}
