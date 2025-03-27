import { w as writable } from './index_DEom4rlB.mjs';
import { s as supabase } from './supabase_DCsDQftD.mjs';

// Almacén de especies
const especiesStore = writable([]);

// Cargar todas las especies
async function getAllEspecies() {
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
async function getEspecieById(id) {
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
async function saveEspecie(especie) {
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

export { getEspecieById as a, getAllEspecies as g, saveEspecie as s };
