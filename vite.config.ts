import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" &&
    componentTagger(),
  ].filter(Boolean),
  // base: mode === "production" ? "/business-nest/" : "/", // ⚠️ important for GitHub Pages
  // base: '/business-nest/', // <-- Add this line for GitHub
  base: '/', // <-- Add this line for business-nest.nl
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
