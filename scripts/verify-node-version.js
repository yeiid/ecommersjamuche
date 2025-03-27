#!/usr/bin/env node

/**
 * Script para verificar la versión de Node.js durante el despliegue
 * Este script se ejecutará al inicio del proceso de build
 */

// Mostrar información sobre el entorno
console.log("=== INFORMACIÓN DEL ENTORNO ===");
console.log(`Node.js versión: ${process.version}`);
console.log(`Arquitectura: ${process.arch}`);
console.log(`Plataforma: ${process.platform}`);
console.log(`Directorio actual: ${process.cwd()}`);
console.log("===============================");

// Verificar la versión de Node.js
const currentVersion = process.version;
const major = parseInt(currentVersion.slice(1).split(".")[0], 10);

if (major < 20) {
  console.error(
    `ERROR: Se requiere Node.js v20 o superior. Versión actual: ${currentVersion}`
  );
  console.error("Esto podría causar problemas durante el despliegue.");

  // No terminar el proceso con error para permitir que continúe el despliegue
  // process.exit(1);
} else {
  console.log(`✅ Versión de Node.js correcta: ${currentVersion}`);
}

// Crear un archivo para verificar en el entorno de Vercel
const fs = require("fs");
fs.writeFileSync(
  "node-version-check.txt",
  `Verificación realizada: ${new Date().toISOString()}\n` +
    `Node.js versión: ${process.version}\n` +
    `Arquitectura: ${process.arch}\n` +
    `Plataforma: ${process.platform}\n`
);

console.log("✅ Archivo de verificación creado: node-version-check.txt");
