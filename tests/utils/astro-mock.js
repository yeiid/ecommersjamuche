/**
 * Mock para componentes Astro en tests unitarios
 *
 * Este archivo proporciona funciones para simular el comportamiento de componentes Astro
 * sin tener que importarlos directamente, evitando problemas de sintaxis.
 */
import { vi } from "vitest";
import { setupAstroTest } from "./astro-test-utils";

/**
 * Simula un componente EspecieForm de Astro
 * @param {Object} options - Opciones de configuración
 * @param {Object} options.props - Props para pasar al componente
 * @param {Object} options.request - Configuración de la solicitud
 * @param {Function} options.redirect - Función de redirección mock
 * @param {Object} options.formData - Datos del formulario a enviar
 * @param {Function} options.saveEspecieFn - Función mock para guardar especie
 * @returns {Object} Un objeto simulando el componente
 */
export function mockEspecieForm({
  props = {},
  request = { method: "GET" },
  redirect = vi.fn(),
  formData = null,
  saveEspecieFn,
} = {}) {
  // Configurar entorno Astro
  setupAstroTest({
    props,
    request: {
      method: request.method,
      formData,
    },
    redirect,
  });

  // Crear valores por defecto como lo haría el componente real
  const especie = props.especie || {};
  const defaultValues = {
    id: especie.id || "",
    nombre: especie.nombre || "",
    nombreCientifico: especie.nombreCientifico || "",
    familia: especie.familia || "",
    origen: especie.origen || "",
    descripcion: especie.descripcion || "",
    propiedades: especie.propiedades || "",
    usos: especie.usos || "",
    imagen: especie.imagen || "",
    imagenDetalle: especie.imagenDetalle || "",
    error: "",
  };

  // Si es un POST, procesar el formulario como lo haría el componente
  if (request.method === "POST" && formData && saveEspecieFn) {
    // Extraer los datos del formulario
    const especieData = {};
    formData.forEach((value, key) => {
      especieData[key] = value;
    });

    // Asegurarnos de que saveEspecieFn es una función válida antes de llamarla
    try {
      const savePromise = saveEspecieFn(especieData);

      // Verificar que el resultado es una promesa
      if (savePromise && typeof savePromise.then === "function") {
        savePromise
          .then(() => {
            // Simular la redirección
            redirect("/admin/especies");
          })
          .catch((error) => {
            console.error("Error al guardar la especie:", error);
            defaultValues.error = `Error al guardar la especie: ${error.message}`;
          });
      } else {
        console.warn("La función saveEspecieFn no devolvió una promesa");
      }
    } catch (error) {
      console.error("Error al ejecutar saveEspecieFn:", error);
      defaultValues.error = `Error al guardar la especie: ${error.message}`;
    }
  }

  return defaultValues;
}

/**
 * Simula un componente ProductCard de Astro
 * @param {Object} props - Propiedades del componente
 * @returns {Object} Un objeto simulando el componente
 */
export function mockProductCard(props = {}) {
  return {
    id: props.id || "",
    nombre: props.nombre || "",
    precio: props.precio || 0,
    precioDescuento: props.precioDescuento || 0,
    imagen: props.imagen || "",
    descripcion: props.descripcion || "",
    rating: props.rating || 0,
    categoria: props.categoria || "",
    isNew: props.isNew || false,

    // Funciones utilitarias
    formatPrice: (price) => {
      return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      }).format(price);
    },

    hasDiscount: () => props.precioDescuento > 0,
  };
}
