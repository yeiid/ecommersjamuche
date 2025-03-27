import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Usar jsdom para tests de componentes
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.js"],
    include: ["./tests/**/*.test.js"],
    exclude: ["**/node_modules/**", "**/dist/**", "**/.vercel/**"],
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
