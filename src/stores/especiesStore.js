import { writable } from "svelte/store";
import { supabase } from "../lib/supabase";

// Almacén de especies
export const especiesStore = writable([]);

// Cargar todas las especies
export async function getAllEspecies() {
  try {
    const { data, error } = await supabase.from("especies").select("*");

    if (error) throw error;

    // Contar cuántos productos usan cada especie
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("especieid");

    if (productsError) throw productsError;

    const especiesWithCount = data.map((especie) => {
      const productCount = products.filter(
        (p) => p.especieid === especie.id
      ).length;
      return { ...especie, productCount };
    });

    especiesStore.set(especiesWithCount || []);
    return especiesWithCount || [];
  } catch (error) {
    console.error("Error al cargar especies:", error);
    return [];
  }
}

// Obtener una especie por ID
export async function getEspecieById(id) {
  try {
    const { data, error } = await supabase
      .from("especies")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error al obtener especie ${id}:`, error);
    return null;
  }
}

// Guardar una especie (crear o actualizar)
export async function saveEspecie(especie) {
  try {
    const { id, ...especieData } = especie;

    if (id) {
      // Actualizar especie existente
      const { data, error } = await supabase
        .from("especies")
        .update(especieData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      // Actualizar el store
      especiesStore.update((especies) => {
        const index = especies.findIndex((e) => e.id === id);
        if (index !== -1) {
          especies[index] = data;
        }
        return especies;
      });

      return data;
    } else {
      // Crear nueva especie
      const { data, error } = await supabase
        .from("especies")
        .insert(especieData)
        .select()
        .single();

      if (error) throw error;

      // Actualizar el store
      especiesStore.update((especies) => [...especies, data]);

      return data;
    }
  } catch (error) {
    console.error("Error al guardar especie:", error);
    throw error;
  }
}

// Eliminar una especie
export async function deleteEspecie(id) {
  try {
    // Primero verificamos si hay productos asociados
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id")
      .eq("especieid", id);

    if (productsError) throw productsError;

    // Si hay productos asociados, no permitimos eliminar
    if (products && products.length > 0) {
      throw new Error(
        `No se puede eliminar la especie porque tiene ${products.length} productos asociados`
      );
    }

    // Si no hay productos, procedemos a eliminar
    const { error } = await supabase.from("especies").delete().eq("id", id);

    if (error) throw error;

    // Actualizar el store
    especiesStore.update((especies) => especies.filter((e) => e.id !== id));

    return true;
  } catch (error) {
    console.error(`Error al eliminar especie ${id}:`, error);
    throw error;
  }
}

// Obtener especies destacadas
export async function getFeaturedEspecies() {
  try {
    const { data, error } = await supabase
      .from("especies")
      .select("*")
      .eq("featured", true)
      .limit(6);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error al cargar especies destacadas:", error);
    return [];
  }
}
