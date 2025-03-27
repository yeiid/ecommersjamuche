// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://jamuchee.com",
  integrations: [tailwind(), svelte()],
  // Mantener modo servidor para SSR
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    // Optimizar para velocidad de respuesta
    speedInsights: {
      enabled: true,
    },
    // Configurar explícitamente Node.js 20
    nodeVersion: "20.x",
  }),
  // Configuración de servidor para arreglar problemas de WebSocket
  server: {
    port: 4321,
    host: true, // Permitir conexiones desde la red (localhost sería false)
  },
  vite: {
    server: {
      hmr: {
        // Usar el mismo host que el servidor
        host: "localhost",
        // Usar el mismo puerto
        port: 4321,
        // Forzar protocolo ws (no wss)
        protocol: "ws",
        // Deshabilitar overlay de errores si causa problemas
        overlay: false,
      },
      // Aumentar timeout para evitar desconexiones en desarrollo
      watch: {
        usePolling: true,
        interval: 1000,
      },
    },
    // Mejorar manejo de errores
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          // Ignorar advertencias específicas si es necesario
          if (warning.code === "UNUSED_EXTERNAL_IMPORT") return;
          warn(warning);
        },
      },
    },
    // Optimizar para desarrollo
    optimizeDeps: {
      include: ["nanostores", "@supabase/supabase-js"],
    },
  },
});
