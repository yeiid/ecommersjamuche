/**
 * Script para modificar el runtime en los archivos generados por Vercel
 *
 * Este script busca el archivo de configuración _render.func/config.json
 * y cambia su runtime a nodejs20.x
 */

import * as fs from "fs";
import * as path from "path";

// Directorios a buscar
const VERCEL_DIRS = [
  ".vercel/output/functions",
  "dist/functions",
  ".vercel/functions",
];

// Función para reemplazar el runtime en el archivo de configuración
function patchRuntimeInConfig(configPath) {
  try {
    if (fs.existsSync(configPath)) {
      console.log(`Encontrado archivo de configuración: ${configPath}`);

      // Leer el archivo de configuración
      const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

      // Actualizar el runtime
      if (config.runtime && config.runtime === "nodejs18.x") {
        console.log("Reemplazando nodejs18.x por nodejs20.x...");
        config.runtime = "nodejs20.x";

        // Guardar el archivo modificado
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        console.log("✅ Runtime actualizado correctamente");
        return true;
      }

      console.log(
        `El runtime actual es: ${config.runtime || "no especificado"}`
      );
    }
  } catch (error) {
    console.error(`Error al procesar ${configPath}:`, error);
  }

  return false;
}

// Función para crear archivo .vc-config.json
function createVcConfigFile(functionDir) {
  try {
    const vcConfigPath = path.join(functionDir, ".vc-config.json");
    const config = { runtime: "nodejs20.x" };

    console.log(`Creando archivo .vc-config.json en ${vcConfigPath}`);
    fs.writeFileSync(vcConfigPath, JSON.stringify(config, null, 2));
    console.log("✅ Archivo .vc-config.json creado correctamente");
    return true;
  } catch (error) {
    console.error(`Error al crear .vc-config.json:`, error);
    return false;
  }
}

// Función principal
function main() {
  console.log("🔍 Buscando archivos de configuración de Vercel...");
  let fixed = false;

  // Revisar cada directorio posible
  for (const dir of VERCEL_DIRS) {
    if (!fs.existsSync(dir)) {
      console.log(`Directorio ${dir} no encontrado, saltando...`);
      continue;
    }

    // Buscar en el directorio
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      const functionDir = path.join(dir, entry);
      const stats = fs.statSync(functionDir);

      if (stats.isDirectory()) {
        console.log(`Procesando función: ${functionDir}`);

        // Comprobar si existe config.json
        const configPath = path.join(functionDir, "config.json");
        if (fs.existsSync(configPath)) {
          if (patchRuntimeInConfig(configPath)) {
            fixed = true;
          }
        }

        // Crear .vc-config.json de todos modos
        if (createVcConfigFile(functionDir)) {
          fixed = true;
        }
      }
    }
  }

  if (fixed) {
    console.log("✅ Proceso completado con éxito");
  } else {
    console.log("⚠️ No se encontraron archivos para modificar");
  }
}

// Ejecutar el script
main();
