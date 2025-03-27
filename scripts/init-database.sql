-- Habilitar la extensión uuid-ossp para generar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear tabla para especies (cactus, suculentas, etc.)
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

-- Crear tabla para productos (plantas, materas, etc.)
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

-- Crear tabla para tips de cuidado
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

-- Crear tabla para proyectos de materas DIY
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

-- Crear tabla para pedidos
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

-- Habilitar RLS en todas las tablas
ALTER TABLE especies ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE proyectos_materas ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;

-- Crear política RLS para acceso público a tablas (sólo lectura)
CREATE POLICY "Permitir lectura de productos" 
ON products FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Permitir lectura de especies" 
ON especies FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Permitir lectura de tips" 
ON tips FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Permitir lectura de proyectos" 
ON proyectos_materas FOR SELECT TO anon, authenticated USING (true);

-- Política para permitir todas las operaciones a usuarios autenticados
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

-- Insertar datos de prueba para especies
INSERT INTO especies (nombre, nombreCientifico, familia, origen, descripcion, propiedades, usos, imagen, imagenDetalle, featured)
VALUES
  ('Aloe Vera', 'Aloe barbadensis miller', 'Asphodelaceae', 'Norte de África', 
   'Planta suculenta con hojas carnosas y espinosas en los bordes, conocida por sus propiedades medicinales.',
   'Antiinflamatorio, cicatrizante, hidratante', 
   'Tratamiento de quemaduras, hidratación de la piel, consumo interno para digestión',
   '/imgs/especies/aloe-vera.jpg', '/imgs/especies/aloe-vera-detalle.jpg', true),
   
  ('Lavanda', 'Lavandula angustifolia', 'Lamiaceae', 'Mediterráneo',
   'Planta aromática de flores moradas y aroma relajante, muy utilizada en aromaterapia.',
   'Relajante, antiséptico, antiestrés',
   'Aceites esenciales, perfumería, infusiones, decoración',
   '/imgs/especies/lavanda.jpg', '/imgs/especies/lavanda-detalle.jpg', true);

-- Insertar datos de prueba para productos
-- Primero obtenemos los IDs de las especies
WITH especies_ids AS (
  SELECT id, nombre FROM especies
)
INSERT INTO products (name, price, discountPrice, image, description, category, stock, isNew, featured, rating, features, ingredients, especieId)
VALUES
  ('Aceite Esencial de Lavanda', 25000, 22000, '/imgs/productos/aceite-lavanda.jpg',
   'Aceite esencial de lavanda 100% puro, ideal para aromaterapia y masajes.',
   'Aceites esenciales', 15, true, true, 4.8,
   '["100% natural", "Sin conservantes", "Origen orgánico"]'::jsonb,
   '["Aceite esencial de lavanda"]'::jsonb,
   (SELECT id FROM especies_ids WHERE nombre = 'Lavanda')),
   
  ('Gel de Aloe Vera', 18000, 15000, '/imgs/productos/gel-aloe.jpg',
   'Gel hidratante y calmante de aloe vera para el cuidado diario de la piel.',
   'Cuidado de piel', 20, false, true, 4.6,
   '["Hidratante", "Calmante", "Para todo tipo de piel"]'::jsonb,
   '["Gel de aloe vera", "Glicerina vegetal", "Aceite de jojoba"]'::jsonb,
   (SELECT id FROM especies_ids WHERE nombre = 'Aloe Vera'));

-- Insertar datos de prueba para tips de cuidado
WITH especies_ids AS (
  SELECT id, nombre FROM especies
)
INSERT INTO tips (titulo, contenido, imagen, categoria, especieId, featured)
VALUES
  ('Cómo cuidar tu planta de Aloe Vera',
   'El Aloe Vera necesita luz indirecta y riego moderado. Es importante no excederse con el agua, ya que puede pudrir las raíces. Riega solo cuando la tierra esté completamente seca.',
   '/imgs/tips/cuidado-aloe.jpg', 'Cuidados básicos',
   (SELECT id FROM especies_ids WHERE nombre = 'Aloe Vera'), true),
   
  ('Beneficios de la Lavanda para el sueño',
   'La lavanda es conocida por sus propiedades relajantes que ayudan a conciliar el sueño. Puedes colocar un saquito con flores secas bajo la almohada o usar unas gotas de aceite esencial en tu difusor antes de dormir.',
   '/imgs/tips/lavanda-sueno.jpg', 'Salud y bienestar',
   (SELECT id FROM especies_ids WHERE nombre = 'Lavanda'), true);

-- Insertar datos de prueba para proyectos DIY
INSERT INTO proyectos_materas (titulo, descripcion, pasos, imagenes, dificultad, materiales, tiempo_estimado, featured)
VALUES
  ('Terrario de Suculentas DIY',
   'Aprende a crear un hermoso terrario de suculentas para decorar tu hogar u oficina.',
   '["Consigue un recipiente de vidrio transparente", "Añade una capa de piedras pequeñas para el drenaje", "Coloca una capa de carbón activado para evitar olores", "Añade tierra para cactus y suculentas", "Planta las suculentas con cuidado", "Decora con piedras o musgo"]'::jsonb,
   '["/imgs/proyectos/terrario-1.jpg", "/imgs/proyectos/terrario-2.jpg", "/imgs/proyectos/terrario-3.jpg"]'::jsonb,
   'Intermedio',
   '["Recipiente de vidrio", "Piedras pequeñas", "Carbón activado", "Tierra para cactus", "Suculentas variadas", "Elementos decorativos"]'::jsonb,
   '1 hora', true); 