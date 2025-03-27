import { writable } from "svelte/store";
import { supabase } from "../lib/supabase";

// Almacén de proyectos de materas
export const proyectosStore = writable([]);

// Cargar todos los proyectos
export async function getAllProyectos() {
  try {
    const { data, error } = await supabase
      .from("proyectos_materas")
      .select("*");

    if (error) throw error;

    proyectosStore.set(data || []);
    return data || [];
  } catch (error) {
    console.error("Error al cargar proyectos:", error);
    return [];
  }
}

// Obtener un proyecto por ID
export async function getProyectoById(id) {
  try {
    const { data, error } = await supabase
      .from("proyectos_materas")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error al obtener proyecto ${id}:`, error);
    return null;
  }
}

// Guardar un proyecto (crear o actualizar)
export async function saveProyecto(proyecto) {
  try {
    const { id, ...proyectoData } = proyecto;

    if (id) {
      // Actualizar proyecto existente
      const { data, error } = await supabase
        .from("proyectos_materas")
        .update(proyectoData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      // Actualizar el store
      proyectosStore.update((proyectos) => {
        const index = proyectos.findIndex((p) => p.id === id);
        if (index !== -1) {
          proyectos[index] = data;
        }
        return proyectos;
      });

      return data;
    } else {
      // Crear nuevo proyecto
      const { data, error } = await supabase
        .from("proyectos_materas")
        .insert(proyectoData)
        .select()
        .single();

      if (error) throw error;

      // Actualizar el store
      proyectosStore.update((proyectos) => [...proyectos, data]);

      return data;
    }
  } catch (error) {
    console.error("Error al guardar proyecto:", error);
    throw error;
  }
}

// Eliminar un proyecto
export async function deleteProyecto(id) {
  try {
    const { error } = await supabase
      .from("proyectos_materas")
      .delete()
      .eq("id", id);

    if (error) throw error;

    // Actualizar el store
    proyectosStore.update((proyectos) => proyectos.filter((p) => p.id !== id));

    return true;
  } catch (error) {
    console.error(`Error al eliminar proyecto ${id}:`, error);
    return false;
  }
}

// Obtener proyectos destacados
export async function getFeaturedProyectos() {
  try {
    const { data, error } = await supabase
      .from("proyectos_materas")
      .select("*")
      .eq("featured", true)
      .limit(4);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error al cargar proyectos destacados:", error);
    return [];
  }
}

// Obtener proyectos por dificultad
export async function getProyectosByDificultad(dificultad) {
  try {
    const { data, error } = await supabase
      .from("proyectos_materas")
      .select("*")
      .eq("dificultad", dificultad);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(
      `Error al cargar proyectos de dificultad ${dificultad}:`,
      error
    );
    return [];
  }
}
