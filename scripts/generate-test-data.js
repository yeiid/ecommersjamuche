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

// Datos de prueba para especies
const especiesData = [
  {
    nombre: "Aloe Vera",
    nombreCientifico: "Aloe barbadensis miller",
    familia: "Asphodelaceae",
    origen: "Norte de África",
    descripcion:
      "Planta suculenta con hojas carnosas y espinosas en los bordes, conocida por sus propiedades medicinales.",
    propiedades: "Antiinflamatorio, cicatrizante, hidratante",
    usos: "Tratamiento de quemaduras, hidratación de la piel, consumo interno para digestión",
    imagen: "/imgs/especies/aloe-vera.jpg",
    imagenDetalle: "/imgs/especies/aloe-vera-detalle.jpg",
    featured: true,
  },
  {
    nombre: "Lavanda",
    nombreCientifico: "Lavandula angustifolia",
    familia: "Lamiaceae",
    origen: "Mediterráneo",
    descripcion:
      "Planta aromática de flores moradas y aroma relajante, muy utilizada en aromaterapia.",
    propiedades: "Relajante, antiséptico, antiestrés",
    usos: "Aceites esenciales, perfumería, infusiones, decoración",
    imagen: "/imgs/especies/lavanda.jpg",
    imagenDetalle: "/imgs/especies/lavanda-detalle.jpg",
    featured: true,
  },
];

// Datos de prueba para productos
const productosData = [
  {
    name: "Aceite Esencial de Lavanda",
    price: 25000,
    discountPrice: 22000,
    image: "/imgs/productos/aceite-lavanda.jpg",
    description:
      "Aceite esencial de lavanda 100% puro, ideal para aromaterapia y masajes.",
    category: "Aceites esenciales",
    stock: 15,
    isNew: true,
    featured: true,
    rating: 4.8,
    features: JSON.stringify([
      "100% natural",
      "Sin conservantes",
      "Origen orgánico",
    ]),
    ingredients: JSON.stringify(["Aceite esencial de lavanda"]),
    // La especieId se asignará después de insertar las especies
  },
  {
    name: "Gel de Aloe Vera",
    price: 18000,
    discountPrice: 15000,
    image: "/imgs/productos/gel-aloe.jpg",
    description:
      "Gel hidratante y calmante de aloe vera para el cuidado diario de la piel.",
    category: "Cuidado de piel",
    stock: 20,
    isNew: false,
    featured: true,
    rating: 4.6,
    features: JSON.stringify([
      "Hidratante",
      "Calmante",
      "Para todo tipo de piel",
    ]),
    ingredients: JSON.stringify([
      "Gel de aloe vera",
      "Glicerina vegetal",
      "Aceite de jojoba",
    ]),
    // La especieId se asignará después de insertar las especies
  },
];

// Datos de prueba para tips
const tipsData = [
  {
    titulo: "Cómo cuidar tu planta de Aloe Vera",
    contenido:
      "El Aloe Vera necesita luz indirecta y riego moderado. Es importante no excederse con el agua, ya que puede pudrir las raíces. Riega solo cuando la tierra esté completamente seca.",
    imagen: "/imgs/tips/cuidado-aloe.jpg",
    categoria: "Cuidados básicos",
    // La especieId se asignará después de insertar las especies
    featured: true,
  },
  {
    titulo: "Beneficios de la Lavanda para el sueño",
    contenido:
      "La lavanda es conocida por sus propiedades relajantes que ayudan a conciliar el sueño. Puedes colocar un saquito con flores secas bajo la almohada o usar unas gotas de aceite esencial en tu difusor antes de dormir.",
    imagen: "/imgs/tips/lavanda-sueno.jpg",
    categoria: "Salud y bienestar",
    // La especieId se asignará después de insertar las especies
    featured: true,
  },
];

// Datos de prueba para proyectos
const proyectosData = [
  {
    titulo: "Terrario de Suculentas DIY",
    descripcion:
      "Aprende a crear un hermoso terrario de suculentas para decorar tu hogar u oficina.",
    pasos: JSON.stringify([
      "Consigue un recipiente de vidrio transparente",
      "Añade una capa de piedras pequeñas para el drenaje",
      "Coloca una capa de carbón activado para evitar olores",
      "Añade tierra para cactus y suculentas",
      "Planta las suculentas con cuidado",
      "Decora con piedras o musgo",
    ]),
    imagenes: JSON.stringify([
      "/imgs/proyectos/terrario-1.jpg",
      "/imgs/proyectos/terrario-2.jpg",
      "/imgs/proyectos/terrario-3.jpg",
    ]),
    dificultad: "Intermedio",
    materiales: JSON.stringify([
      "Recipiente de vidrio",
      "Piedras pequeñas",
      "Carbón activado",
      "Tierra para cactus",
      "Suculentas variadas",
      "Elementos decorativos",
    ]),
    tiempo_estimado: "1 hora",
    featured: true,
  },
];

// Función para insertar datos de prueba
async function insertTestData() {
  console.log("📊 Generando datos de prueba en Supabase...");

  try {
    // Insertar especies
    console.log("Insertando especies...");
    const { data: especies, error: especiesError } = await supabase
      .from("especies")
      .insert(especiesData)
      .select();

    if (especiesError) {
      console.error("❌ Error al insertar especies:", especiesError.message);
      return false;
    }

    console.log(`✅ ${especies.length} especies insertadas correctamente`);

    // Mapear especies por nombre para obtener sus IDs
    const especiesMap = {};
    especies.forEach((especie) => {
      especiesMap[especie.nombre] = especie.id;
    });

    // Asignar especies a productos
    productosData[0].especieId = especiesMap["Lavanda"]; // Aceite de lavanda
    productosData[1].especieId = especiesMap["Aloe Vera"]; // Gel de aloe

    // Insertar productos
    console.log("Insertando productos...");
    const { data: productos, error: productosError } = await supabase
      .from("products")
      .insert(productosData)
      .select();

    if (productosError) {
      console.error("❌ Error al insertar productos:", productosError.message);
      return false;
    }

    console.log(`✅ ${productos.length} productos insertados correctamente`);

    // Asignar especies a tips
    tipsData[0].especieId = especiesMap["Aloe Vera"]; // Tip de Aloe Vera
    tipsData[1].especieId = especiesMap["Lavanda"]; // Tip de Lavanda

    // Insertar tips
    console.log("Insertando tips de cuidado...");
    const { data: tips, error: tipsError } = await supabase
      .from("tips")
      .insert(tipsData)
      .select();

    if (tipsError) {
      console.error("❌ Error al insertar tips:", tipsError.message);
      return false;
    }

    console.log(`✅ ${tips.length} tips insertados correctamente`);

    // Insertar proyectos
    console.log("Insertando proyectos DIY...");
    const { data: proyectos, error: proyectosError } = await supabase
      .from("proyectos_materas")
      .insert(proyectosData)
      .select();

    if (proyectosError) {
      console.error("❌ Error al insertar proyectos:", proyectosError.message);
      return false;
    }

    console.log(`✅ ${proyectos.length} proyectos insertados correctamente`);

    return true;
  } catch (error) {
    console.error("❌ Error inesperado:", error.message);
    return false;
  }
}

// Ejecutar la función principal
insertTestData()
  .then((success) => {
    if (success) {
      console.log("✅ Datos de prueba generados correctamente");
    } else {
      console.log("❌ Ha habido errores al generar los datos de prueba");
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error("Error inesperado:", error);
    process.exit(1);
  });
