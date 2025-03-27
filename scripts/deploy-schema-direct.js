import fs from "fs";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Configurar dotenv
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, "..", ".env") });

// Obtener credenciales de entorno
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Error: Falta configurar PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env"
  );
  process.exit(1);
}

// Habilitar la extensión uuid-ossp
async function enableExtension() {
  console.log("Habilitando extensión uuid-ossp...");
  const query = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";';

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${serviceRoleKey}`,
        apikey: serviceRoleKey,
        Prefer: "params=single-object",
      },
      body: JSON.stringify({
        type: "sql",
        sql: query,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error ${response.status}: ${JSON.stringify(error)}`);
    }

    console.log("Extensión habilitada con éxito");
    return true;
  } catch (error) {
    console.error("Error al habilitar extensión:", error.message);
    return false;
  }
}

// Ejecutar todo el esquema SQL
async function executeSchema() {
  try {
    // Leer el archivo SQL
    const schema = fs.readFileSync(
      resolve(__dirname, "..", "supabase-schema.sql"),
      "utf8"
    );

    // Primero habilitar la extensión
    await enableExtension();

    console.log("Ejecutando esquema SQL...");

    // Conectar a Supabase SQL API
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${serviceRoleKey}`,
        apikey: serviceRoleKey,
        Prefer: "params=single-object",
      },
      body: JSON.stringify({
        type: "sql",
        sql: schema,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error ${response.status}: ${JSON.stringify(error)}`);
    }

    console.log("Esquema SQL ejecutado con éxito");
    return true;
  } catch (error) {
    console.error("Error al ejecutar esquema SQL:", error.message);
    return false;
  }
}

// Ejecutar función principal
executeSchema()
  .then((success) => {
    if (success) {
      console.log("✅ Proceso completado exitosamente");
    } else {
      console.log("❌ Proceso completado con errores");
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error("Error no controlado:", error);
    process.exit(1);
  });
