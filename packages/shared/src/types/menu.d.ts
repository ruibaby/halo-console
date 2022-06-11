import { Component } from './vue/dist/vue.esm-bundler.js';

declare interface MenuGroupType {
  name?: string;
  items: MenuItemType[];
}

declare interface MenuItemType {
  name: string;
  path: string;
  icon?: Component;
  meta?: Record<string, unknown>;
  children?: MenuItemType[];
}
