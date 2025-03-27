// Cargar las variables de entorno del archivo .env para pruebas
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "..", ".env");

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: envPath });

// Verificar que las variables de Supabase estén definidas
if (!process.env.PUBLIC_SUPABASE_URL || !process.env.PUBLIC_SUPABASE_ANON_KEY) {
  console.error("Error: Variables de entorno de Supabase no definidas en .env");
}

// Exportar variables para uso en pruebas
export const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;
