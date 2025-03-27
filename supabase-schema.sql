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