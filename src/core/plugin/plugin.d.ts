import type { Component } from "vue";
import type { RouteRecordRaw } from "vue-router";
import type { MenuGroupType } from "@/router/menus.config";
import type { PostsPagePublicState } from "@/views/contents/posts/interface";

export type ExtensionPointType = "POSTS" | "POST_EDITOR";

export type ExtensionPointState = PostsPagePublicState;

export interface Plugin {
  name: string;

  /**
   * This components will be registered when plugin is activated.
   */
  components: Component[];

  /**
   * Activate hook will be called when plugin is activated.
   */
  activated?: () => void;

  /**
   * Deactivate hook will be called when plugin is deactivated.
   */
  deactivated?: () => void;

  routes?: RouteRecordRaw[];

  menus?: MenuGroupType[];

  extensionPoints: Record<
    ExtensionPointType,
    (state: ExtensionPointState) => void
  >;
}

export function definePlugin(plugin: Plugin): Plugin;
