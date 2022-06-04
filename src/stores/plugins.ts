import { defineStore } from "pinia";
import type { Plugin } from "@/core/plugin/plugin";

interface PluginStoreState {
  plugins: Plugin[];
}

export const usePluginsStore = defineStore({
  id: "plugins",
  state: (): PluginStoreState => ({
    plugins: [],
  }),
  actions: {
    registerPlugin(plugin: Plugin) {
      this.plugins.push(plugin);
    },
  },
});
