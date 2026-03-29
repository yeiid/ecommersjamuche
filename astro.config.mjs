// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://vidaglow.com",
  integrations: [tailwind(), svelte()],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  server: {
    port: 4321,
    host: true,
  },
  vite: {
    server: {
      hmr: {
        host: "localhost",
        port: 4321,
        protocol: "ws",
        overlay: false,
      },
    },
  },
});
