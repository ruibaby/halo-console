import { defineStore } from "pinia";
import type { Plugin } from "@halo-dev/admin-shared/src/types";

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
