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
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Usamos la clave de servicio para tener más permisos

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Error: Variables de entorno PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY no definidas"
  );
  process.exit(1);
}

// Crear cliente Supabase con la clave de servicio
const supabase = createClient(supabaseUrl, supabaseKey);

// Definición de las tablas
const tablesDefinitions = [
  {
    name: "especies",
    query: `
      CREATE TABLE IF NOT EXISTS especies (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        nombre TEXT NOT NULL,
        nombreCientifico TEXT NOT NULL,
        familia TEXT,
        origen TEXT,
        descripcion TEXT NOT NULL,
        propiedades TEXT,
        usos TEXT,
        imagen TEXT NOT NULL,
        imagenDetalle TEXT,
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `,
  },
  {
    name: "products",
    query: `
      CREATE TABLE IF NOT EXISTS products (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        price INTEGER NOT NULL,
        discountPrice INTEGER DEFAULT 0,
        image TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        stock INTEGER DEFAULT 0,
        isNew BOOLEAN DEFAULT false,
        featured BOOLEAN DEFAULT false,
        rating DECIMAL(3,1) DEFAULT 0,
        features JSONB,
        ingredients JSONB,
        cuidados TEXT,
        dificultad TEXT,
        especieId UUID REFERENCES especies(id),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `,
  },
  {
    name: "tips",
    query: `
      CREATE TABLE IF NOT EXISTS tips (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        titulo TEXT NOT NULL,
        contenido TEXT NOT NULL,
        imagen TEXT,
        categoria TEXT NOT NULL,
        especieId UUID REFERENCES especies(id),
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `,
  },
  {
    name: "proyectos_materas",
    query: `
      CREATE TABLE IF NOT EXISTS proyectos_materas (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        titulo TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        pasos JSONB NOT NULL,
        imagenes JSONB NOT NULL,
        dificultad TEXT NOT NULL,
        materiales JSONB NOT NULL,
        tiempo_estimado TEXT,
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `,
  },
  {
    name: "pedidos",
    query: `
      CREATE TABLE IF NOT EXISTS pedidos (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        usuario_nombre TEXT NOT NULL,
        usuario_email TEXT NOT NULL,
        usuario_telefono TEXT,
        direccion TEXT NOT NULL,
        ciudad TEXT NOT NULL,
        estado TEXT NOT NULL,
        codigo_postal TEXT,
        productos JSONB NOT NULL,
        total INTEGER NOT NULL,
        estado_pedido TEXT DEFAULT 'pendiente',
        fecha_pedido TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        fecha_envio TIMESTAMP WITH TIME ZONE,
        notas TEXT
      );
    `,
  },
];

// Políticas RLS
const policies = [
  {
    name: "Permitir lectura de productos",
    table: "products",
    query: `
      CREATE POLICY "Permitir lectura de productos" 
      ON products FOR SELECT TO anon, authenticated 
      USING (true);
    `,
  },
  {
    name: "Permitir lectura de especies",
    table: "especies",
    query: `
      CREATE POLICY "Permitir lectura de especies" 
      ON especies FOR SELECT TO anon, authenticated 
      USING (true);
    `,
  },
  {
    name: "Permitir lectura de tips",
    table: "tips",
    query: `
      CREATE POLICY "Permitir lectura de tips" 
      ON tips FOR SELECT TO anon, authenticated 
      USING (true);
    `,
  },
  {
    name: "Permitir lectura de proyectos",
    table: "proyectos_materas",
    query: `
      CREATE POLICY "Permitir lectura de proyectos" 
      ON proyectos_materas FOR SELECT TO anon, authenticated 
      USING (true);
    `,
  },
  {
    name: "Habilitar RLS en especies",
    table: "especies",
    query: `ALTER TABLE especies ENABLE ROW LEVEL SECURITY;`,
  },
  {
    name: "Habilitar RLS en products",
    table: "products",
    query: `ALTER TABLE products ENABLE ROW LEVEL SECURITY;`,
  },
  {
    name: "Habilitar RLS en tips",
    table: "tips",
    query: `ALTER TABLE tips ENABLE ROW LEVEL SECURITY;`,
  },
  {
    name: "Habilitar RLS en proyectos_materas",
    table: "proyectos_materas",
    query: `ALTER TABLE proyectos_materas ENABLE ROW LEVEL SECURITY;`,
  },
  {
    name: "Habilitar RLS en pedidos",
    table: "pedidos",
    query: `ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;`,
  },
  // Políticas para operaciones de escritura
  {
    name: "Permitir administración completa de productos",
    table: "products",
    query: `
      CREATE POLICY "Permitir administración completa de productos" 
      ON products FOR ALL TO authenticated 
      USING (true) 
      WITH CHECK (true);
    `,
  },
  {
    name: "Permitir administración completa de especies",
    table: "especies",
    query: `
      CREATE POLICY "Permitir administración completa de especies" 
      ON especies FOR ALL TO authenticated 
      USING (true) 
      WITH CHECK (true);
    `,
  },
  {
    name: "Permitir administración completa de tips",
    table: "tips",
    query: `
      CREATE POLICY "Permitir administración completa de tips" 
      ON tips FOR ALL TO authenticated 
      USING (true) 
      WITH CHECK (true);
    `,
  },
  {
    name: "Permitir administración completa de proyectos",
    table: "proyectos_materas",
    query: `
      CREATE POLICY "Permitir administración completa de proyectos" 
      ON proyectos_materas FOR ALL TO authenticated 
      USING (true) 
      WITH CHECK (true);
    `,
  },
  {
    name: "Permitir administración completa de pedidos",
    table: "pedidos",
    query: `
      CREATE POLICY "Permitir administración completa de pedidos" 
      ON pedidos FOR ALL TO authenticated 
      USING (true) 
      WITH CHECK (true);
    `,
  },
];

// Función para ejecutar una consulta SQL a través de la API REST
async function executeSql(query, description) {
  try {
    console.log(`Ejecutando: ${description}...`);

    const { data, error } = await supabase.rpc("pgrest_run", {
      sql_string: query,
    });

    if (error) {
      console.error(`❌ Error al ejecutar "${description}": ${error.message}`);
      return false;
    }

    console.log(`✅ Éxito: ${description}`);
    return true;
  } catch (err) {
    console.error(`❌ Error al ejecutar "${description}": ${err.message}`);
    return false;
  }
}

// Habilitar la extensión uuid-ossp
async function enableExtension() {
  console.log("Habilitando extensión uuid-ossp...");
  const query = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";';
  return await executeSql(query, "Habilitar extensión uuid-ossp");
}

// Función principal para crear las tablas y políticas
async function createTablesAndPolicies() {
  console.log("🔧 Iniciando creación de tablas y políticas en Supabase...");
  console.log(`URL: ${supabaseUrl}`);
  console.log("----------------------------------");

  // Habilitar la extensión uuid-ossp
  const extensionResult = await enableExtension();
  if (!extensionResult) {
    console.log(
      "⚠️ No se pudo habilitar la extensión uuid-ossp. Continuando de todos modos..."
    );
  }

  // Crear las tablas
  for (const table of tablesDefinitions) {
    const success = await executeSql(table.query, `Crear tabla ${table.name}`);
    if (!success) {
      console.log(
        `⚠️ No se pudo crear la tabla ${table.name}. Continuando con la siguiente...`
      );
    }
  }

  // Crear las políticas
  for (const policy of policies) {
    const success = await executeSql(
      policy.query,
      `Crear política "${policy.name}" en ${policy.table}`
    );
    if (!success) {
      console.log(
        `⚠️ No se pudo crear la política "${policy.name}" en ${policy.table}. Continuando con la siguiente...`
      );
    }
  }

  console.log("----------------------------------");
  console.log("✅ Proceso completado");
}

// Ejecutar la función principal
createTablesAndPolicies().catch((error) => {
  console.error("Error inesperado:", error);
  process.exit(1);
});
