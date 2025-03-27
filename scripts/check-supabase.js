import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Configurar variables de entorno
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, "..", ".env") });

// Obtener credenciales de Supabase
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("Verificando conexión a Supabase...");
console.log("URL:", supabaseUrl);
console.log("Clave anónima disponible:", supabaseKey ? "Sí" : "No");
console.log("Clave de servicio disponible:", serviceRoleKey ? "Sí" : "No");

// Crear cliente de Supabase con la clave anónima
const supabaseAnon = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

// Crear cliente de Supabase con la clave de servicio (admin)
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

// Probar conexión con la clave anónima
async function testAnonConnection() {
  console.log("\n--- Probando conexión con clave anónima ---");
  try {
    const { data, error } = await supabaseAnon
      .from("products")
      .select("id")
      .limit(1);

    if (error) {
      console.error("Error con clave anónima:", error);
    } else {
      console.log("Conexión exitosa con clave anónima");
      console.log("Datos:", data);
    }
  } catch (e) {
    console.error("Excepción con clave anónima:", e);
  }
}

// Probar conexión con la clave de servicio
async function testServiceRoleConnection() {
  console.log("\n--- Probando conexión con clave de servicio ---");
  try {
    const { data, error } = await supabaseAdmin
      .from("products")
      .select("id")
      .limit(1);

    if (error) {
      console.error("Error con clave de servicio:", error);
    } else {
      console.log("Conexión exitosa con clave de servicio");
      console.log("Datos:", data);
    }
  } catch (e) {
    console.error("Excepción con clave de servicio:", e);
  }
}

// Ejecutar pruebas
async function runTests() {
  await testAnonConnection();
  await testServiceRoleConnection();
}

runTests().catch((err) => {
  console.error("Error en las pruebas:", err);
  process.exit(1);
});
