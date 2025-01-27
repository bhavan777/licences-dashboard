import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    strictPort: true,
    hmr: {
      port: 5173,
      clientPort: 5173,
      host: "localhost",
      protocol: "ws",
    },
  },
  base: "./",
});
