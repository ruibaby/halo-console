import { fileURLToPath, URL } from "url";
import fs from "fs";
import { defineConfig, loadEnv } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";
import Compression from "vite-compression-plugin";
import { VitePWA } from "vite-plugin-pwa";
import Icons from "unplugin-icons/vite";
import { setupLibraryExternal } from "./src/build/library-external";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import Inspect from "vite-plugin-inspect";

export const sharedPlugins = [
  Vue(),
  VueJsx(),
  Compression(),
  Icons({
    compiler: "vue3",
    customCollections: {
      core: {
        logo: () => fs.readFileSync("./src/assets/logo.svg", "utf-8"),
      },
    },
  }),
  VitePWA({
    manifest: {
      name: "Halo",
      short_name: "Halo",
      description: "Web Client For Halo",
      theme_color: "#fff",
    },
    disable: true,
  }),
  Components({
    dts: "src/components.d.ts",
    resolvers: [
      {
        type: "component",
        resolve: (name) => {
          if (name.startsWith("V") || name.startsWith("Icon")) {
            return {
              name,
              from: "@halo-dev/components",
            };
          }
        },
      },
    ],
  }),
  AutoImport({
    dts: "src/auto-imports.d.ts",
    imports: ["vue", "vue-router", "pinia", "@vueuse/core"],
    eslintrc: {
      enabled: true,
    },
  }),
  Inspect(),
];

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isProduction = mode === "production";

  return defineConfig({
    base: env.VITE_BASE_URL,
    plugins: [
      ...sharedPlugins,
      ...setupLibraryExternal(isProduction, env.VITE_BASE_URL),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: 3000,
    },
    build: {
      chunkSizeWarningLimit: 2048,
    },
  });
};
