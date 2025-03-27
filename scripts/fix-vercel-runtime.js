/**
 * Script para modificar el runtime en los archivos generados por Vercel
 *
 * Este script busca archivos de configuración en múltiples ubicaciones
 * para asegurar que se use Node.js 20.x
 */

import * as fs from "fs";
import * as path from "path";

// Directorios a buscar
const VERCEL_DIRS = [
  ".vercel/output/functions",
  "dist/functions",
  ".vercel/functions",
  ".vercel/output/static/functions",
  "dist/_functions",
  ".vercel/_functions",
  ".vercel",
  "dist"
];

// Patrones de archivos a buscar
const CONFIG_FILES = [
  "config.json",
  ".vc-config.json",
  "vc-config.json",
  "function-config.json"
];

// Registrar información en un archivo de log para debugging
function logInfo(message) {
  console.log(message);
  
  try {
    fs.appendFileSync("vercel-runtime-fix.log", `${new Date().toISOString()} - ${message}\n`);
  } catch (error) {
    console.error("Error al escribir en el archivo de log:", error);
  }
}

// Función para reemplazar el runtime en el archivo de configuración
function patchRuntimeInConfig(configPath) {
  try {
    if (fs.existsSync(configPath)) {
      logInfo(`Encontrado archivo de configuración: ${configPath}`);

      // Leer el archivo de configuración
      const content = fs.readFileSync(configPath, "utf8");
      
      try {
        const config = JSON.parse(content);

        // Actualizar el runtime
        if (config.runtime && config.runtime !== "nodejs20.x") {
          logInfo(`Reemplazando ${config.runtime} por nodejs20.x...`);
          config.runtime = "nodejs20.x";

          // Guardar el archivo modificado
          fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
          logInfo("✅ Runtime actualizado correctamente");
          return true;
        } else if (!config.runtime) {
          logInfo("No se encontró propiedad runtime, añadiéndola...");
          config.runtime = "nodejs20.x";
          
          // Guardar el archivo modificado
          fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
          logInfo("✅ Runtime añadido correctamente");
          return true;
        }

        logInfo(`El runtime actual es: ${config.runtime || "no especificado"}`);
      } catch (jsonError) {
        logInfo(`Error al parsear JSON en ${configPath}: ${jsonError.message}`);
        
        // Si no es un JSON válido, intentar buscar y reemplazar la cadena directamente
        if (content.includes("nodejs18.x")) {
          const newContent = content.replace(/nodejs18.x/g, "nodejs20.x");
          fs.writeFileSync(configPath, newContent);
          logInfo("✅ Runtime actualizado mediante búsqueda y reemplazo");
          return true;
        }
      }
    }
  } catch (error) {
    logInfo(`Error al procesar ${configPath}: ${error.message}`);
  }

  return false;
}

// Función para crear archivo .vc-config.json
function createVcConfigFile(functionDir) {
  try {
    const vcConfigPath = path.join(functionDir, ".vc-config.json");
    const config = { runtime: "nodejs20.x" };

    if (!fs.existsSync(vcConfigPath)) {
      logInfo(`Creando archivo .vc-config.json en ${vcConfigPath}`);
      fs.writeFileSync(vcConfigPath, JSON.stringify(config, null, 2));
      logInfo("✅ Archivo .vc-config.json creado correctamente");
      return true;
    } else {
      logInfo(`El archivo .vc-config.json ya existe en ${vcConfigPath}`);
      // Actualizar el archivo existente
      return patchRuntimeInConfig(vcConfigPath);
    }
  } catch (error) {
    logInfo(`Error al crear .vc-config.json: ${error.message}`);
    return false;
  }
}

// Búsqueda recursiva de archivos de configuración
function findAndFixConfigFiles(baseDir, depth = 0) {
  if (depth > 5) return false; // Limitar profundidad de búsqueda
  
  let fixed = false;
  
  try {
    if (!fs.existsSync(baseDir)) {
      return false;
    }
    
    // Primero, buscar archivos de configuración en este directorio
    for (const configFile of CONFIG_FILES) {
      const configPath = path.join(baseDir, configFile);
      if (fs.existsSync(configPath)) {
        if (patchRuntimeInConfig(configPath)) {
          fixed = true;
        }
      }
    }
    
    // Luego, crear .vc-config.json si el directorio parece ser un directorio de función
    if (baseDir.includes("func") || baseDir.includes("function")) {
      if (createVcConfigFile(baseDir)) {
        fixed = true;
      }
    }
    
    // Recursivamente buscar en subdirectorios
    const entries = fs.readdirSync(baseDir);
    for (const entry of entries) {
      const entryPath = path.join(baseDir, entry);
      try {
        const stats = fs.statSync(entryPath);
        if (stats.isDirectory()) {
          if (findAndFixConfigFiles(entryPath, depth + 1)) {
            fixed = true;
          }
        }
      } catch (error) {
        logInfo(`Error al acceder a ${entryPath}: ${error.message}`);
      }
    }
  } catch (error) {
    logInfo(`Error al procesar directorio ${baseDir}: ${error.message}`);
  }
  
  return fixed;
}

// Función principal
function main() {
  logInfo("🔍 Iniciando búsqueda de archivos de configuración de Vercel...");
  let fixed = false;

  // Limpiar archivo de log previo
  try {
    fs.writeFileSync("vercel-runtime-fix.log", `=== Fix Vercel Runtime Script - ${new Date().toISOString()} ===\n`);
  } catch (error) {
    console.error("Error al crear archivo de log:", error);
  }

  // Revisar cada directorio posible
  for (const dir of VERCEL_DIRS) {
    logInfo(`Revisando directorio: ${dir}`);
    if (findAndFixConfigFiles(dir)) {
      fixed = true;
    }
  }

  if (fixed) {
    logInfo("✅ Proceso completado con éxito - Se modificaron archivos de configuración");
  } else {
    logInfo("⚠️ No se encontraron archivos para modificar o no fue necesario hacer cambios");
    
    // Plan B: crear archivos de configuración en ubicaciones comunes
    logInfo("Ejecutando plan B: crear archivos de configuración en ubicaciones comunes...");
    
    let planBFixed = false;
    for (const dir of [".vercel/output/functions", "dist/functions"]) {
      try {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
          logInfo(`Directorio ${dir} creado`);
        }
        
        const functionDir = path.join(dir, "_render.func");
        if (!fs.existsSync(functionDir)) {
          fs.mkdirSync(functionDir, { recursive: true });
          logInfo(`Directorio ${functionDir} creado`);
        }
        
        if (createVcConfigFile(functionDir)) {
          planBFixed = true;
        }
      } catch (error) {
        logInfo(`Error en plan B para ${dir}: ${error.message}`);
      }
    }
    
    if (planBFixed) {
      logInfo("✅ Plan B ejecutado con éxito");
    } else {
      logInfo("⚠️ Plan B no pudo crear archivos de configuración");
    }
  }
  
  logInfo("Script finalizado");
}

// Ejecutar el script
main();
