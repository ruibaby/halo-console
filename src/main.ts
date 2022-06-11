import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "@halo-dev/components/dist/style.css";
import "@/styles/tailwind.css";
import { Dropdown, Menu, Tooltip, VClosePopper, VTooltip } from "floating-vue";
import "floating-vue/dist/style.css";
// @ts-ignore
import VueGridLayout from "vue-grid-layout";
import Widgets from "@/views/dashboard/widgets";
import { usePluginsStore } from "@/stores/plugins";
import { registerMenu } from "@/router/menus.config";
import { BasicLayout } from "@/layouts";
// @ts-ignore
import components from "@halo-dev/components";
// @ts-ignore
import { loadScript } from "vue-plugin-load-script";
import { plugins } from "@/views/system/plugins/plugins-mock";

const app = createApp(App);

app.use(createPinia());
app.use(VueGridLayout);
app.use(Widgets);
app.use(components);

app.directive("tooltip", VTooltip);
app.directive("close-popper", VClosePopper);

app.component("FloatingDropdown", Dropdown);
app.component("FloatingTooltip", Tooltip);
app.component("FloatingMenu", Menu);

const pluginStore = usePluginsStore();
const enabledPlugins = plugins.value.filter((p) => p.metadata.enabled);

function loadStyle(href: string) {
  return new Promise(function (resolve, reject) {
    let shouldAppend = false;
    let el: HTMLLinkElement | null = document.querySelector(
      'script[src="' + href + '"]'
    );
    if (!el) {
      el = document.createElement("link");
      el.rel = "stylesheet";
      el.type = "text/css";
      el.href = href;
      shouldAppend = true;
    } else if (el.hasAttribute("data-loaded")) {
      resolve(el);
      return;
    }

    el.addEventListener("error", reject);
    el.addEventListener("abort", reject);
    el.addEventListener("load", function loadStyleHandler() {
      el?.setAttribute("data-loaded", "true");
      resolve(el);
    });

    if (shouldAppend) document.head.prepend(el);
  });
}

(async function () {
  await initApp();
})();

async function initApp() {
  for (let i = 0; i < enabledPlugins.length; i++) {
    const plugin = enabledPlugins[i];

    if (!plugin.assets) {
      continue;
    }

    await loadScript(plugin.assets.script);
    if (plugin.assets.style) {
      await loadStyle(plugin.assets.style);
    }

    // @ts-ignore
    const pluginModule = window[plugin.assets.name];
    pluginStore.registerPlugin(pluginModule);
    console.log(`Loaded plugin(${pluginModule.name}):`, pluginModule);

    // register components
    if (pluginModule.components) {
      // eslint-disable-next-line
      pluginModule.components.forEach((component: any) => {
        app.component(component.name, component);
      });
    }

    // register routes
    if (pluginModule.routes) {
      // eslint-disable-next-line
      pluginModule.routes.forEach((route: any) => {
        if (route.parent) {
          const parentRoute = router
            .getRoutes()
            .find((r) => r.name === route.parent);

          if (parentRoute) {
            router.addRoute(route.parent, {
              path: route.path,
              name: route.name,
              component: route.component,
            });
            return;
          }
          return;
        }

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

    // register menus
    if (pluginModule.menus) {
      // eslint-disable-next-line
      pluginModule.menus.forEach((menu: any) => {
        // eslint-disable-next-line
        menu.items.forEach((item: any) => {
          registerMenu(menu.name, item);
        });
      });
    }
  }

  console.log(router.getRoutes());

  app.use(router);
  app.mount("#app");
}
