import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Configurar dotenv para las pruebas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

// Obtener variables de entorno directamente para las pruebas
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Crear un cliente específico para pruebas con la clave de servicio (admin)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

// Comprobar si tenemos las variables de entorno necesarias
const hasSupabaseEnv = supabaseUrl && supabaseServiceKey;

// Si no hay variables de entorno, omitiremos las pruebas
const testRunner = hasSupabaseEnv ? describe : describe.skip;

testRunner("Integración con Supabase", () => {
  // Datos para pruebas - Simplificado para evitar problemas con columnas que no existen
  let testProductId = null;
  const testProduct = {
    name: "Producto de prueba",
    price: 10000,
    image: "/test-image.jpg",
    description: "Producto creado en tests automatizados",
    category: "Test",
    stock: 999,
  };

  // Verificar conexión antes de todas las pruebas
  beforeAll(async () => {
    console.log("URL de Supabase:", supabaseUrl);
    console.log(
      "Clave de servicio configurada:",
      supabaseServiceKey ? "Sí" : "No"
    );
  });

  // Eliminar producto de prueba después de todos los tests
  afterAll(async () => {
    if (testProductId) {
      try {
        await supabase.from("products").delete().eq("id", testProductId);
        console.log(`Producto de prueba eliminado: ${testProductId}`);
      } catch (error) {
        console.error("Error al limpiar datos:", error);
      }
    }
  });

  it("se conecta a Supabase correctamente", async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("id")
        .limit(1);

      if (error) {
        console.error("Error al conectar con Supabase:", error);
      }

      expect(error).toBeNull();
    } catch (e) {
      console.error("Excepción al conectar:", e);
      throw e;
    }
  });

  it("puede crear un producto de prueba", async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert(testProduct)
        .select()
        .single();

      if (error) {
        console.error("Error al crear producto de prueba:", error);
      } else {
        console.log("Producto creado exitosamente:", data);
      }

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.name).toBe(testProduct.name);
      expect(data.id).toBeDefined();

      // Guardar el ID para pruebas posteriores y limpieza
      testProductId = data?.id;
      console.log("Producto creado con ID:", testProductId);
    } catch (e) {
      console.error("Excepción al crear producto:", e);
      throw e;
    }
  });

  it("puede obtener el producto de prueba", async () => {
    // Solo ejecutar si la prueba anterior tuvo éxito
    if (!testProductId) {
      expect.fail("El producto de prueba no se creó correctamente");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", testProductId)
        .single();

      if (error) {
        console.error("Error al obtener producto de prueba:", error);
      } else {
        console.log("Producto obtenido exitosamente:", data);
      }

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.id).toBe(testProductId);
      expect(data.name).toBe(testProduct.name);
      expect(data.price).toBe(testProduct.price);
    } catch (e) {
      console.error("Excepción al obtener producto:", e);
      throw e;
    }
  });

  it("puede actualizar el producto de prueba", async () => {
    // Solo ejecutar si la prueba anterior tuvo éxito
    if (!testProductId) {
      expect.fail("El producto de prueba no se creó correctamente");
      return;
    }

    try {
      const updatedData = {
        price: 12000,
        stock: 888,
      };

      const { data, error } = await supabase
        .from("products")
        .update(updatedData)
        .eq("id", testProductId)
        .select()
        .single();

      if (error) {
        console.error("Error al actualizar producto de prueba:", error);
      } else {
        console.log("Producto actualizado exitosamente:", data);
      }

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data.id).toBe(testProductId);
      expect(data.price).toBe(updatedData.price);
      expect(data.stock).toBe(updatedData.stock);
      expect(data.name).toBe(testProduct.name); // verificar que otros campos permanecen igual
    } catch (e) {
      console.error("Excepción al actualizar producto:", e);
      throw e;
    }
  });
});
