# Configuración de Supabase para JAMUCHEE Store

Este documento proporciona instrucciones detalladas sobre cómo configurar manualmente la base de datos Supabase para este proyecto.

## Prerrequisitos

1. Tener una cuenta en [Supabase](https://supabase.com/)
2. Haber creado un proyecto en Supabase
3. Tener acceso a las credenciales del proyecto (URL y claves de API)

## Paso 1: Acceder al SQL Editor

1. Inicia sesión en tu cuenta de Supabase
2. Selecciona tu proyecto
3. En el panel lateral izquierdo, haz clic en "SQL Editor"
4. Haz clic en "New Query" para crear una nueva consulta

## Paso 2: Crear las tablas y políticas

Copia y pega el siguiente código SQL en el editor:

```sql
-- Habilitar la extensión uuid-ossp para generar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear tabla para especies (cactus, suculentas, etc.)
CREATE TABLE especies (
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

-- Crear tabla para productos (plantas, materas, etc.)
CREATE TABLE products (
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

-- Crear tabla para tips de cuidado
CREATE TABLE tips (
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

-- Crear tabla para proyectos de materas DIY
CREATE TABLE proyectos_materas (
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

-- Crear tabla para pedidos
CREATE TABLE pedidos (
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

-- Crear política RLS para acceso público a productos y especies (sólo lectura)
CREATE POLICY "Permitir lectura de productos"
ON products FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Permitir lectura de especies"
ON especies FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Permitir lectura de tips"
ON tips FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Permitir lectura de proyectos"
ON proyectos_materas FOR SELECT TO anon, authenticated USING (true);

-- Habilitar RLS en todas las tablas
ALTER TABLE especies ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE proyectos_materas ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;
```

Haz clic en "Run" o "Execute" para ejecutar el SQL.

## Paso 3: Crear políticas para operaciones de escritura

Para permitir que el administrador pueda crear, actualizar y eliminar registros, ejecuta el siguiente SQL:

```sql
-- Política para permitir todas las operaciones a usuarios autenticados con el rol 'admin'
CREATE POLICY "Permitir administración completa de productos"
ON products FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Permitir administración completa de especies"
ON especies FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Permitir administración completa de tips"
ON tips FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Permitir administración completa de proyectos"
ON proyectos_materas FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Permitir administración completa de pedidos"
ON pedidos FOR ALL TO authenticated
USING (true)
WITH CHECK (true);
```

## Paso 4: Verificar que las tablas se han creado correctamente

1. En el panel lateral izquierdo de Supabase, haz clic en "Table Editor"
2. Deberías ver las tablas: `especies`, `products`, `tips`, `proyectos_materas` y `pedidos`

## Paso 5: Configurar autenticación para la aplicación

1. En el panel lateral izquierdo, haz clic en "Authentication"
2. Ve a la pestaña "Providers"
3. Asegúrate de que "Email" esté habilitado
4. Opcionalmente, puedes configurar otros proveedores como Google, GitHub, etc.

## Paso 6: Crear un usuario administrador

1. En el panel lateral izquierdo, haz clic en "Authentication"
2. Ve a la pestaña "Users"
3. Haz clic en "Add User"
4. Introduce el correo electrónico y la contraseña para el administrador

## Paso 7: Probar la conexión

Después de configurar Supabase, puedes verificar la conexión ejecutando el siguiente comando en tu proyecto:

```bash
node scripts/test-connection.js
```

Si todo está configurado correctamente, deberías ver un mensaje indicando que la conexión ha sido exitosa.

## Solución de problemas comunes

### Error: "relation 'public.products' does not exist"

- Asegúrate de haber ejecutado correctamente el script SQL para crear las tablas.
- Comprueba en el "Table Editor" si las tablas existen.

### Error de conexión a Supabase

- Verifica que las variables de entorno `PUBLIC_SUPABASE_URL` y `PUBLIC_SUPABASE_ANON_KEY` están correctamente configuradas en el archivo `.env`.
- Asegúrate de que estás utilizando la URL y la clave anónima correctas desde la página "Settings > API" de tu proyecto de Supabase.

### Error al realizar operaciones de escritura

- Verifica que las políticas RLS (Row Level Security) están correctamente configuradas.
- Comprueba que el usuario está autenticado y tiene los permisos necesarios.
