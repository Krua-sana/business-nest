import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import Sitemap from "vite-plugin-sitemap";

export default defineConfig({
  server: { host: "::", port: 8080 },
  plugins: [
    react(),
    Sitemap({
      hostname: "https://business-nest.nl",
      outDir: "dist",
      dynamicRoutes: [
        "/program",
        "/workshops",
        "/workshops/financial-transition-lab",
        "/workshops/ai-co-creator",
        "/workshops/sales-training",
        "/workshops/quality-assurance-ai",
        "/experts",
        "/gallery",
      ],
    }),
  ],
  base: "/",
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
