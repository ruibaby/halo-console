import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import icons from "unplugin-icons/vite";
import { VitePWA } from "vite-plugin-pwa";
import Inspect from "vite-plugin-inspect";
import { viteExternalsPlugin } from "vite-plugin-externals";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    icons(),
    VitePWA({
      manifest: {
        name: "Halo",
        short_name: "Halo",
        description: "Web Client For Halo",
        theme_color: "#fff",
      },
    }),
    Inspect(),
    viteExternalsPlugin(
      {
        vue: "Vue",
        "vue-router": "VueRouter",
        pinia: "Pinia",
        "@halo-dev/components": "components",
      },
      {
        disableInServe: false,
      }
    ),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    transformMode: {
      web: [/\.[jt]sx$/],
    },
  },
});
