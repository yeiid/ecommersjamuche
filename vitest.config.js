import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Usar jsdom para tests de componentes
    environment: "jsdom",
    // Configurar excepciones para tests que necesitan node
    environmentMatchGlobs: [
      // Los tests de integración con Supabase necesitan node
      ["**/supabase-integration.test.js", "node"],
      ["**/db-*.test.js", "node"],
      // Otros tests que no necesitan un DOM
      ["**/simple.test.js", "node"],
    ],
    globals: true,
    setupFiles: ["./tests/setup.js"],
    include: ["./tests/**/*.test.js"],
    exclude: [
      // Excluir archivos .bak o respaldos
      "**/tests/**/*.bak",
      // Excluir archivos temporales
      "**/tests/**/._*.test.js",
    ],
    // Aumentar el timeout para las pruebas de integración
    testTimeout: 15000,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.js"],
      exclude: [
        "src/**/*.d.ts",
        "src/lib/supabase.js", // El cliente real de Supabase
        "src/lib/db.js",
        "src/env.d.ts",
        "node_modules/**",
      ],
    },
    // Mejorar el manejo de errores de Supabase en las pruebas
    onConsoleLog(log, type) {
      if (log.includes("Supabase:")) return false;
      return true;
    },
  },
});
