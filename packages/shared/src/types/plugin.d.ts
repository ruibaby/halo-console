import type { Component } from "vue";
import type { RouteRecordRaw } from "vue-router";
import type { MenuGroupType } from "./menu";
import type { PostsPagePublicState } from "./post";
import type { DashboardPublicState } from "./dashboard";
import type { UserProfileLayoutPublicStates } from "./user";

export type ExtensionPointType =
  | "POSTS"
  | "POST_EDITOR"
  | "DASHBOARD"
  | "USER_SETTINGS";

export type ExtensionPointState =
  | PostsPagePublicState
  | DashboardPublicState
  | UserProfileLayoutPublicStates;

export interface HaloRouteRecord extends RouteRecordRaw {
  parent?: string;
}

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

  routes?: HaloRouteRecord[];

  menus?: MenuGroupType[];

  extensionPoints: Record<
    ?ExtensionPointType,
    (state: ExtensionPointState) => void
  >;
}

export function definePlugin(plugin: Plugin): Plugin;
