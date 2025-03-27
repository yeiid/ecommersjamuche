import { writable } from "svelte/store";
import { supabase } from "../lib/supabase";

// Almacén de tips
export const tipsStore = writable([]);

// Cargar todos los tips
export async function getAllTips() {
  try {
    const { data, error } = await supabase
      .from("tips")
      .select("*, especies(*)");

    if (error) throw error;

    tipsStore.set(data || []);
    return data || [];
  } catch (error) {
    console.error("Error al cargar tips:", error);
    return [];
  }
}

// Obtener un tip por ID
export async function getTipById(id) {
  try {
    const { data, error } = await supabase
      .from("tips")
      .select("*, especies(*)")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error al obtener tip ${id}:`, error);
    return null;
  }
}

// Guardar un tip (crear o actualizar)
export async function saveTip(tip) {
  try {
    const { id, ...tipData } = tip;

    if (id) {
      // Actualizar tip existente
      const { data, error } = await supabase
        .from("tips")
        .update(tipData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      // Actualizar el store
      tipsStore.update((tips) => {
        const index = tips.findIndex((t) => t.id === id);
        if (index !== -1) {
          tips[index] = data;
        }
        return tips;
      });

      return data;
    } else {
      // Crear nuevo tip
      const { data, error } = await supabase
        .from("tips")
        .insert(tipData)
        .select()
        .single();

      if (error) throw error;

      // Actualizar el store
      tipsStore.update((tips) => [...tips, data]);

      return data;
    }
  } catch (error) {
    console.error("Error al guardar tip:", error);
    throw error;
  }
}

// Eliminar un tip
export async function deleteTip(id) {
  try {
    const { error } = await supabase.from("tips").delete().eq("id", id);

    if (error) throw error;

    // Actualizar el store
    tipsStore.update((tips) => tips.filter((t) => t.id !== id));

    return true;
  } catch (error) {
    console.error(`Error al eliminar tip ${id}:`, error);
    return false;
  }
}

// Obtener tips destacados
export async function getFeaturedTips() {
  try {
    const { data, error } = await supabase
      .from("tips")
      .select("*, especies(*)")
      .eq("featured", true)
      .limit(6);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error al cargar tips destacados:", error);
    return [];
  }
}

// Obtener tips por categoría
export async function getTipsByCategory(categoria) {
  try {
    const { data, error } = await supabase
      .from("tips")
      .select("*, especies(*)")
      .eq("categoria", categoria);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error al cargar tips de categoría ${categoria}:`, error);
    return [];
  }
}

// Obtener tips por especie
export async function getTipsByEspecie(especieId) {
  try {
    const { data, error } = await supabase
      .from("tips")
      .select("*, especies(*)")
      .eq("especieId", especieId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Error al cargar tips de especie ${especieId}:`, error);
    return [];
  }
}
