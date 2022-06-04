import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "@/styles/tailwind.css";
import { Dropdown, Menu, Tooltip, VClosePopper, VTooltip } from "floating-vue";
import "floating-vue/dist/style.css";
// @ts-ignore
import VueGridLayout from "vue-grid-layout";
import Widgets from "@/views/dashboard/widgets";
import { usePluginsStore } from "@/stores/plugins";
import { registerMenu } from "@/router/menus.config";
import { BasicLayout } from "@/layouts";

const app = createApp(App);

app.use(createPinia());
app.use(VueGridLayout);
app.use(Widgets);

app.directive("tooltip", VTooltip);
app.directive("close-popper", VClosePopper);

app.component("FloatingDropdown", Dropdown);
app.component("FloatingTooltip", Tooltip);
app.component("FloatingMenu", Menu);

const pluginStore = usePluginsStore();

const pluginAssets = ["../public/plugin-demo.es.js"];

Promise.all(pluginAssets.map((asset: string) => import(asset)))
  // eslint-disable-next-line
  .then((plugins: any[]) => {
    const pluginModules = plugins.map((plugin) => plugin.default);

    pluginModules.forEach((pluginModule) => {
      pluginStore.registerPlugin(pluginModule);

      if (pluginModule.routes) {
        // eslint-disable-next-line
        pluginModule.routes.forEach((route: any) => {
          router.addRoute({
            path: route.path,
            component: BasicLayout,
            children: [
              {
                path: "",
                name: route.name,
                component: route.component,
              },
            ],
          });
        });
      }

      if (pluginModule.menus) {
        // eslint-disable-next-line
        pluginModule.menus.forEach((menu: any) => {
          // eslint-disable-next-line
          menu.items.forEach((item: any) => {
            registerMenu(menu.group, item);
          });
        });
      }
      app.use(router);
    });
  })
  .finally(() => {
    console.log("routes", router.getRoutes());
    console.log("hasRoute", router.hasRoute("pluginDemo"));
    app.mount("#app");
  });
