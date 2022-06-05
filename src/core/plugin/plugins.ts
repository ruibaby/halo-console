import { usePluginsStore } from "@/stores/plugins";
import type {
  ExtensionPointState,
  ExtensionPointType,
  Plugin,
} from "@halo-dev/admin-shared/src/types";

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
