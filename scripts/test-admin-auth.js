// Script para probar la autenticación y operaciones CRUD directamente

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Cargar variables de entorno
dotenv.config();

// Crear cliente de Supabase
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Error: Variables de entorno no configuradas");
  console.error(
    "Asegúrate de tener PUBLIC_SUPABASE_URL y PUBLIC_SUPABASE_ANON_KEY en tu archivo .env"
  );
  process.exit(1);
}

console.log("🔑 Inicializando cliente de Supabase...");
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Función para realizar pruebas de autenticación
async function testAuth() {
  console.log("\n📋 Prueba de autenticación:");
  try {
    // Intentar iniciar sesión
    console.log(
      "⏳ Intentando iniciar sesión con email: admin@jamuchee.com..."
    );
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "admin@jamuchee.com",
      password: "admin123",
    });

    if (error) {
      console.error(`❌ Error al iniciar sesión: ${error.message}`);
      return false;
    }

    console.log("✅ Inicio de sesión exitoso!");
    console.log(`Usuario: ${data.user.email}`);

    // Verificar la sesión
    const session = await supabase.auth.getSession();
    console.log(`✅ Sesión activa: ${!!session.data.session}`);

    return true;
  } catch (error) {
    console.error(`❌ Error inesperado: ${error.message}`);
    return false;
  }
}

// Función para probar operaciones CRUD de productos
async function testProductCRUD() {
  console.log("\n📋 Prueba de operaciones CRUD con productos:");

  try {
    // Crear un producto de prueba
    const testProduct = {
      name: "Producto de Prueba Script",
      price: 25000,
      discountprice: 20000,
      image: "/test/test-product.jpg",
      description:
        "Este es un producto de prueba creado por el script de testing",
      category: "Pruebas",
      stock: 99,
      isnew: true,
      featured: true,
      rating: 5.0,
    };

    console.log("⏳ Creando producto de prueba...");
    const { data: createdProduct, error: createError } = await supabase
      .from("products")
      .insert(testProduct)
      .select()
      .single();

    if (createError) {
      console.error(`❌ Error al crear producto: ${createError.message}`);
      return false;
    }

    console.log("✅ Producto creado con éxito!");
    console.log(`ID: ${createdProduct.id}`);
    console.log(`Nombre: ${createdProduct.name}`);
    console.log(`Precio: ${createdProduct.price}`);

    // Obtener el producto
    console.log("\n⏳ Obteniendo producto por ID...");
    const { data: fetchedProduct, error: fetchError } = await supabase
      .from("products")
      .select("*")
      .eq("id", createdProduct.id)
      .single();

    if (fetchError) {
      console.error(`❌ Error al obtener producto: ${fetchError.message}`);
      return false;
    }

    console.log("✅ Producto obtenido con éxito!");
    console.log(`Nombre: ${fetchedProduct.name}`);

    // Actualizar el producto
    console.log("\n⏳ Actualizando producto...");
    const { data: updatedProduct, error: updateError } = await supabase
      .from("products")
      .update({
        name: "Producto de Prueba Actualizado",
        price: 30000,
      })
      .eq("id", createdProduct.id)
      .select()
      .single();

    if (updateError) {
      console.error(`❌ Error al actualizar producto: ${updateError.message}`);
      return false;
    }

    console.log("✅ Producto actualizado con éxito!");
    console.log(`Nombre actualizado: ${updatedProduct.name}`);
    console.log(`Precio actualizado: ${updatedProduct.price}`);

    // Eliminar el producto
    console.log("\n⏳ Eliminando producto...");
    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", createdProduct.id);

    if (deleteError) {
      console.error(`❌ Error al eliminar producto: ${deleteError.message}`);
      return false;
    }

    console.log("✅ Producto eliminado con éxito!");

    return true;
  } catch (error) {
    console.error(`❌ Error inesperado en operaciones CRUD: ${error.message}`);
    return false;
  }
}

// Función principal
async function main() {
  console.log("🚀 Iniciando pruebas de administración...");

  // Probar autenticación
  const authSuccess = await testAuth();
  if (!authSuccess) {
    console.error(
      "⚠️ Las pruebas de autenticación fallaron. No se continuará con las pruebas CRUD."
    );
    process.exit(1);
  }

  // Probar CRUD de productos
  const crudSuccess = await testProductCRUD();
  if (!crudSuccess) {
    console.error("⚠️ Las pruebas CRUD fallaron.");
    process.exit(1);
  }

  console.log("\n🎉 ¡Todas las pruebas completadas con éxito!");
}

// Ejecutar pruebas
main().catch((error) => {
  console.error(`❌ Error fatal: ${error.message}`);
  process.exit(1);
});
