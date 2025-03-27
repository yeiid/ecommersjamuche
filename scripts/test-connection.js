// Script para verificar la conexión a Supabase
import { createClient } from "@supabase/supabase-js";

// Credenciales directas para pruebas
const supabaseUrl = "https://pesbetmcydrwuniqwcrs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlc2JldG1jeWRyd3VuaXF3Y3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5Mzg5NzksImV4cCI6MjA1ODUxNDk3OX0.n0-48BHX1eFfY9AYzzdLKhUxzhgF_ls8c31GuJtGsyA";

console.log("Verificando conexión a Supabase...");
console.log(`URL: ${supabaseUrl}`);
console.log(`Key: ${supabaseKey.substring(0, 10)}...`);

// Crear el cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// Realizar una prueba de conexión
async function testConnection() {
  try {
    console.log("Intentando conectar a Supabase...");

    // Probar obtener productos
    console.log("Intentando obtener productos...");
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .limit(1);

    if (error) {
      console.error("Error al obtener productos:", error);
      return false;
    }

    console.log("Productos obtenidos:", data);
    return true;
  } catch (error) {
    console.error("Error inesperado:", error);
    return false;
  }
}

testConnection()
  .then((success) => {
    if (success) {
      console.log("✅ Verificación completada con éxito");
    } else {
      console.log("❌ Verificación fallida");
    }
  })
  .catch((err) => {
    console.error("Error en la verificación:", err);
  })
  .finally(() => {
    process.exit(0);
  });
