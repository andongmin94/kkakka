import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const appMode = env.VITE_APP_MODE === "real" ? "real" : "mock";
  const isElectron = process.env.ELECTRON === "true" || env.ELECTRON === "true";

  return {
  base: "./",
  define: {
    "import.meta.env.VITE_APP_MODE": JSON.stringify(appMode),
    "import.meta.env.VITE_API_BASE_URL": JSON.stringify(env.VITE_API_BASE_URL ?? ""),
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    watch: {
      ignored: ["**/dist/**", "**/dist_electron/**"],
    },
  },
  plugins: [
    react(),
    !isElectron && VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: false,
      },
      manifest: {
        name: "까까",
        short_name: "까까",
        description: "친구의 게임을 함께 보고 채팅과 승패 예측을 즐기는 소셜 서비스",
        start_url: "./",
        display: "standalone",
        theme_color: "#111827",
        background_color: "#ffffff",
        icons: [
          {
            src: "icons/icon-48x48.png",
            sizes: "48x48",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "icons/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "icons/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "icons/icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
      },
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
  };
});
