import { defineConfig } from "vite";
import shopify from "vite-plugin-shopify";

export default defineConfig({
  plugins: [
    shopify({
      themeRoot: ".",
      entrypointsDir: "frontend/entrypoints"
    })
  ],
  build: {
    emptyOutDir: false,
    manifest: "manifest.json",
    rollupOptions: {
      output: {
        entryFileNames: "[name]-[hash].js",
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: "[name]-[hash][extname]"
      }
    }
  }
});
