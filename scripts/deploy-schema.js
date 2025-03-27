// Script para ejecutar el esquema SQL en Supabase
import { createClient } from "@supabase/supabase-js";
import fs from "fs";

// Credenciales directas para pruebas
const supabaseUrl = "https://pesbetmcydrwuniqwcrs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlc2JldG1jeWRyd3VuaXF3Y3JzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjkzODk3OSwiZXhwIjoyMDU4NTE0OTc5fQ.fAHJpDWLtbPU4QKgG7YOltkKsh19fH7LdbtS-tRIZcM";

// Crear el cliente de Supabase con el service_role_key para tener permisos completos
const supabase = createClient(supabaseUrl, supabaseKey);

// Leer el esquema SQL
const schemaSQL = fs.readFileSync("./supabase-schema.sql", "utf-8");

// Dividir el esquema en instrucciones individuales
const sqlStatements = schemaSQL
  .split(";")
  .map((stmt) => stmt.trim())
  .filter((stmt) => stmt.length > 0);

// Ejecutar cada instrucción SQL
async function executeSchema() {
  console.log(`Ejecutando ${sqlStatements.length} instrucciones SQL...`);

  // Habilitar la extensión uuid-ossp para generar UUIDs
  try {
    console.log("Habilitando extensión uuid-ossp...");
    const { error } = await supabase.rpc("extensions", {
      command: 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"',
    });

    if (error) {
      console.error("Error al habilitar extensión:", error);
    } else {
      console.log("Extensión habilitada correctamente");
    }
  } catch (error) {
    console.error("Error al habilitar extensión:", error);
  }

  // Ejecutar cada sentencia SQL por separado
  for (let i = 0; i < sqlStatements.length; i++) {
    const stmt = sqlStatements[i];
    console.log(`Ejecutando instrucción ${i + 1}/${sqlStatements.length}...`);
    console.log(stmt.substring(0, 100) + (stmt.length > 100 ? "..." : ""));

    try {
      const { error } = await supabase.rpc("execute_sql", {
        query: stmt,
      });

      if (error) {
        console.error(`Error al ejecutar SQL #${i + 1}:`, error);
      } else {
        console.log(`SQL #${i + 1} ejecutado correctamente`);
      }
    } catch (error) {
      console.error(`Error al ejecutar SQL #${i + 1}:`, error);
    }
  }

  console.log("Proceso completado");
}

// Iniciar el proceso
executeSchema().catch((err) => {
  console.error("Error en el proceso:", err);
});
