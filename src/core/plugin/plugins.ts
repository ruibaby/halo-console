import { usePluginsStore } from "@/stores/plugins";
import type {
  ExtensionPointState,
  ExtensionPointType,
  Plugin,
} from "@/core/plugin/plugin";

export function useExtensionPointsData(
  point: ExtensionPointType,
  state: ExtensionPointState
) {
  const { plugins } = usePluginsStore();

  plugins.forEach((plugin: Plugin) => {
    if (!plugin.extensionPoints[point]) {
      return;
    }
    plugin.extensionPoints[point](state);
  });
}
