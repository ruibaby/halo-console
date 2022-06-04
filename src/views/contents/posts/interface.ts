import type { Component } from "vue";

export type PostListActionsItem = {
  component: Component;
  props: Record<string, unknown>;
  slots: Record<string, unknown>;
  events?: Record<string, () => void>;
};

export interface PostsPagePublicState {
  // eslint-disable-next-line
  actions: any[];
  checkAll: boolean;
  // eslint-disable-next-line
  afterComponents: any[];
}
