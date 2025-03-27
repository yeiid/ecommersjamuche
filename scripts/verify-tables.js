import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Configurar dotenv
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, "..", ".env") });

// Obtener credenciales de Supabase
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Error: Variables de entorno PUBLIC_SUPABASE_URL o PUBLIC_SUPABASE_ANON_KEY no definidas"
  );
  process.exit(1);
}

// Crear cliente Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// Lista de tablas a verificar
const tables = ["especies", "products", "tips", "proyectos_materas", "pedidos"];

/**
 * Verifica la existencia de cada tabla usando la API de Supabase
 */
async function checkTables() {
  console.log("🔍 Verificando tablas en Supabase...");
  console.log(`URL: ${supabaseUrl}`);
  console.log("----------------------------------");

  let allTablesExist = true;

  for (const table of tables) {
    try {
      // Intentar obtener un solo registro de la tabla
      const { data, error } = await supabase.from(table).select("*").limit(1);

      if (error) {
        console.log(`❌ Tabla '${table}': No existe - ${error.message}`);
        allTablesExist = false;
      } else {
        console.log(`✅ Tabla '${table}': Existe`);
      }
    } catch (err) {
      console.log(`❌ Error al verificar tabla '${table}': ${err.message}`);
      allTablesExist = false;
    }
  }

  console.log("----------------------------------");
  if (allTablesExist) {
    console.log("✅ Todas las tablas existen en Supabase");
    console.log("🎉 La configuración parece estar correcta");
  } else {
    console.log("❌ Algunas tablas no existen en Supabase");
    console.log(
      "📝 Por favor, sigue las instrucciones en SUPABASE_SETUP.md para configurar correctamente tu base de datos"
    );
  }
}

// Ejecutar la verificación
checkTables().catch((error) => {
  console.error("Error inesperado:", error);
  process.exit(1);
});
