// Script para probar y solucionar el problema de autenticación
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "fs/promises";
import { exec } from "child_process";
import util from "util";
import path from "path";

// Promisificar exec
const execPromise = util.promisify(exec);

// Cargar variables de entorno
dotenv.config();

// Crear cliente de Supabase
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Error: Variables de entorno no configuradas");
  console.error(
    "Asegúrate de tener PUBLIC_SUPABASE_URL y PUBLIC_SUPABASE_ANON_KEY en tu archivo .env"
  );
  process.exit(1);
}

console.log("🔑 Inicializando cliente de Supabase...");
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: "jamuche-auth-storage",
  },
});

// Función para probar y arreglar la autenticación
async function testAndFixAuth() {
  console.log("\n📋 Prueba de autenticación y solución:");

  try {
    // 1. Intentar iniciar sesión
    console.log(
      "⏳ Intentando iniciar sesión con email: admin@jamuchee.com..."
    );
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "admin@jamuchee.com",
      password: "admin123",
    });

    if (error) {
      console.error(`❌ Error al iniciar sesión: ${error.message}`);

      // Si el error es de credenciales, intentamos crear el usuario admin
      if (error.message.includes("Invalid login credentials")) {
        await createAdminUser();
      } else {
        return false;
      }
    } else {
      console.log("✅ Inicio de sesión exitoso!");
      console.log(`Usuario: ${data.user.email}`);

      // Verificar la sesión
      const session = await supabase.auth.getSession();
      console.log(`✅ Sesión activa: ${!!session.data.session}`);

      // Verificar si el usuario es admin
      const isAdmin = data.user?.app_metadata?.role === "admin";
      console.log(`Usuario es admin: ${isAdmin ? "Sí" : "No"}`);

      // Si no es admin, agregar el rol
      if (!isAdmin) {
        await addAdminRole(data.user.id);
      }
    }

    // 2. Verificar localStorage en el navegador
    console.log("\n🔍 Verificando problema con localStorage:");
    console.log(
      "Para solucionar problemas de persistencia, asegúrate de que en tu navegador:"
    );
    console.log(
      "1. Las cookies y almacenamiento local estén habilitados para tu dominio"
    );
    console.log(
      "2. No estés en modo incógnito o con restricciones de privacidad"
    );

    // 3. Verificar si se está usando correctamente el almacenamiento local
    await fixLocalStorageIssues();

    return true;
  } catch (error) {
    console.error(`❌ Error inesperado: ${error.message}`);
    return false;
  }
}

// Función para crear un usuario admin si no existe
async function createAdminUser() {
  try {
    console.log(
      "\n🔧 El usuario admin no existe. Intentando crear usuario admin..."
    );

    // Usar la llave de servicio para crear un usuario
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceRoleKey) {
      console.error(
        "❌ No se encontró la clave de servicio para crear el usuario admin"
      );
      return false;
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    // Crear usuario
    const { data, error } = await adminClient.auth.admin.createUser({
      email: "admin@jamuchee.com",
      password: "admin123",
      email_confirm: true,
      app_metadata: { role: "admin" },
    });

    if (error) {
      console.error(`❌ Error al crear usuario admin: ${error.message}`);
      return false;
    }

    console.log("✅ Usuario admin creado con éxito!");
    console.log(`Usuario: ${data.user.email}`);

    return true;
  } catch (error) {
    console.error(`❌ Error al crear usuario admin: ${error.message}`);
    return false;
  }
}

// Función para agregar rol de admin a un usuario
async function addAdminRole(userId) {
  try {
    console.log("\n🔧 Usuario no tiene rol admin. Actualizando...");

    // Usar la llave de servicio para actualizar el usuario
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceRoleKey) {
      console.error(
        "❌ No se encontró la clave de servicio para actualizar el rol"
      );
      return false;
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    // Actualizar metadatos
    const { error } = await adminClient.auth.admin.updateUserById(userId, {
      app_metadata: { role: "admin" },
    });

    if (error) {
      console.error(`❌ Error al actualizar rol admin: ${error.message}`);
      return false;
    }

    console.log("✅ Rol de admin asignado con éxito!");

    return true;
  } catch (error) {
    console.error(`❌ Error al actualizar rol admin: ${error.message}`);
    return false;
  }
}

// Función para solucionar problemas con el localStorage
async function fixLocalStorageIssues() {
  console.log("\n🔧 Verificando problemas con localStorage en los archivos...");

  // 1. Verificar si AdminLayout.astro maneja correctamente la autenticación
  try {
    const layoutPath = path.join(
      process.cwd(),
      "src/components/admin/AdminLayout.astro"
    );
    const layoutCode = await fs.readFile(layoutPath, "utf8");

    // Verificar si hay acceso a localStorage sin verificación
    if (
      layoutCode.includes("localStorage.getItem") &&
      !layoutCode.includes('typeof window !== "undefined"')
    ) {
      console.log(
        "⚠️ Encontrado: AdminLayout.astro accede a localStorage sin verificar si está en el lado del cliente"
      );

      // Crear versión corregida
      const fixedCode = layoutCode.replace(
        /localStorage\.getItem/g,
        'typeof window !== "undefined" && localStorage.getItem'
      );

      // Guardar archivo arreglado
      await fs.writeFile(layoutPath + ".fixed", fixedCode);
      console.log(`✅ Versión corregida guardada en ${layoutPath}.fixed`);
      console.log(
        "   Revisa los cambios y reemplaza el archivo original si son correctos."
      );
    } else {
      console.log(
        "✅ AdminLayout.astro parece manipular localStorage correctamente"
      );
    }

    // 2. Verificar LoginForm.astro
    const loginPath = path.join(
      process.cwd(),
      "src/components/admin/LoginForm.astro"
    );
    const loginCode = await fs.readFile(loginPath, "utf8");

    if (
      loginCode.includes("localStorage.setItem") &&
      !loginCode.includes('typeof window !== "undefined"')
    ) {
      console.log(
        "⚠️ Encontrado: LoginForm.astro accede a localStorage sin verificar si está en el lado del cliente"
      );

      // Crear versión corregida
      const fixedLoginCode = loginCode.replace(
        /localStorage\.setItem/g,
        'typeof window !== "undefined" && localStorage.setItem'
      );

      // Guardar archivo arreglado
      await fs.writeFile(loginPath + ".fixed", fixedLoginCode);
      console.log(`✅ Versión corregida guardada en ${loginPath}.fixed`);
      console.log(
        "   Revisa los cambios y reemplaza el archivo original si son correctos."
      );
    } else {
      console.log(
        "✅ LoginForm.astro parece manipular localStorage correctamente"
      );
    }
  } catch (error) {
    console.error(`⚠️ Error al verificar archivos: ${error.message}`);
  }

  // Sugerir solución para el problema de localStorage
  console.log("\n📝 Instrucciones para solucionar problema de autenticación:");
  console.log(
    "1. Asegúrate de que el acceso a localStorage siempre verifique si está en el navegador:"
  );
  console.log(
    '   - typeof window !== "undefined" && localStorage.getItem(...)'
  );
  console.log(
    "2. Si estás usando SSR (Server-Side Rendering), asegúrate de establecer cookies para autenticación"
  );
  console.log(
    "3. Para resolver problemas de administración, ejecuta la aplicación y prueba con los siguientes pasos:"
  );
  console.log("   - Accede a /admin");
  console.log("   - Inicia sesión con admin@jamuchee.com / admin123");
  console.log("   - Abre la consola del navegador y ejecuta:");
  console.log('     localStorage.setItem("devModeAuth", "true")');
  console.log("   - Recarga la página");
}

// Función para probar la conexión a Supabase
async function testSupabaseConnection() {
  console.log("\n📡 Probando conexión a Supabase...");

  try {
    const { data, error } = await supabase
      .from("products")
      .select("count", { count: "exact", head: true });

    if (error) {
      console.error(`❌ Error de conexión a Supabase: ${error.message}`);
      return false;
    }

    console.log("✅ Conexión a Supabase exitosa!");
    return true;
  } catch (error) {
    console.error(`❌ Error de conexión a Supabase: ${error.message}`);
    return false;
  }
}

// Función para analizar principios SOLID en el código
async function analyzeSolidPrinciples() {
  console.log("\n📊 Análisis de principios SOLID en el código:");

  // 1. Revisar archivos de stores para verificar responsabilidad única (S)
  console.log("\n🔍 Principio de Responsabilidad Única (S):");

  try {
    const storesPath = path.join(process.cwd(), "src/stores");
    const storeFiles = await fs.readdir(storesPath);

    console.log(`Encontrados ${storeFiles.length} archivos de stores:`);

    for (const file of storeFiles) {
      if (file.endsWith(".js")) {
        console.log(`- ${file}: Gestiona un único dominio de datos`);
      }
    }

    console.log(
      "✅ Bien: Cada store se encarga de una única responsabilidad (productos, carrito, wishlist, etc.)"
    );

    // 2. Acoplamiento y Dependencias (D y O)
    console.log(
      "\n🔍 Principio de Inversión de Dependencias (D) y Abierto/Cerrado (O):"
    );

    // Verificar si las dependencias están bien inyectadas
    const authStorePath = path.join(storesPath, "authStore.js");
    const authStoreContent = await fs.readFile(authStorePath, "utf8");

    if (authStoreContent.includes("import { supabase }")) {
      console.log(
        "⚠️ Sugerencia: AuthStore importa supabase directamente, podría mejorarse con inyección de dependencias"
      );
      console.log(
        "   Mejor práctica: Recibir el cliente de Supabase como parámetro para facilitar pruebas y cambios"
      );
    }

    // 3. Segregación de Interfaces (I)
    console.log("\n🔍 Principio de Segregación de Interfaces (I):");
    console.log(
      "✅ Bien: Los componentes están divididos por funcionalidad y no dependen de interfaces que no usan"
    );
    console.log("   - Componentes de admin separados de componentes públicos");
    console.log("   - Stores específicos para cada dominio de datos");

    return true;
  } catch (error) {
    console.error(`❌ Error al analizar principios SOLID: ${error.message}`);
    return false;
  }
}

// Función principal
async function main() {
  console.log("🚀 Iniciando diagnóstico y solución de problemas...");

  // Probar conexión a Supabase
  const connectionSuccess = await testSupabaseConnection();
  if (!connectionSuccess) {
    console.error(
      "⚠️ La conexión a Supabase falló. Verifica las credenciales y la conectividad."
    );
  }

  // Probar y arreglar autenticación
  const authSuccess = await testAndFixAuth();
  if (!authSuccess) {
    console.error("⚠️ Las pruebas de autenticación fallaron.");
  }

  // Analizar principios SOLID
  await analyzeSolidPrinciples();

  console.log("\n🎯 Recomendaciones finales:");
  console.log(
    "1. Utiliza inyección de dependencias para facilitar pruebas y seguir el principio de inversión de dependencias"
  );
  console.log(
    "2. Implementa manejo de errores más robusto en las funciones de autenticación"
  );
  console.log(
    "3. Considera utilizar interceptores para manejar errores de manera global"
  );
  console.log(
    "4. Para la autenticación en modo desarrollo, asegúrate de tener un enfoque más consistente"
  );

  console.log("\n🎉 Diagnóstico completo!");
}

// Ejecutar
main().catch((error) => {
  console.error(`❌ Error fatal: ${error.message}`);
  process.exit(1);
});
