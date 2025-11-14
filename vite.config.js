import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
  },
  server: {
    proxy: {
      // Proxy for regular API requests
      "/api": {
        target: "http://finalstep.runasp.net/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
        ws: true, // Enable WebSocket support
      },
    },
  },
});
