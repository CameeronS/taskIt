import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { TanStackRouterVite } from "@tanstack/router-vite-plugin"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 3000,
    proxy: {
      "/api": {
        target: "https://vlog2tuujb.execute-api.eu-west-2.amazonaws.com/prod",
        changeOrigin: true,
      },
    },
  },
  assetsInclude: ["./src/assets/**/*"],
})
