import type { App, Plugin } from "vue";
import "./styles/tailwind.css";

import { VAlert } from "./components/base/alert";

import { VButton } from "./components/base/button";
import { VCard } from "./components/base/card";
import { VCheckbox, VCheckboxGroup } from "./components/base/checkbox";
import { VPageHeader } from "./components/base/header";
import { VInput } from "./components/base/input";
import {
  VMenu,
  VMenuItem,
  VMenuLabel,
  VRoutesMenu,
} from "./components/base/menu";
import { VModal } from "./components/base/modal";
import { VRadio, VRadioGroup } from "./components/base/radio";
import { VOption, VSelect } from "./components/base/select";
import { VSpace } from "./components/base/space";
import { VTabbar, VTabItem, VTabs } from "./components/base/tabs";
import { VTag } from "./components/base/tag";
import { VTextarea } from "./components/base/textarea";
import { VTooltip } from "./components/base/tooltip";

export * from "./core/icons";

export function install(app: App) {
  app.component("VAlert", VAlert);
  app.component("VButton", VButton);
  app.component("VCard", VCard);
  app.component("VCheckbox", VCheckbox);
  app.component("VCheckboxGroup", VCheckboxGroup);
  app.component("VPageHeader", VPageHeader);
  app.component("VInput", VInput);
  app.component("VMenu", VMenu);
  app.component("VMenuItem", VMenuItem);
  app.component("VMenuLabel", VMenuLabel);
  app.component("VRoutesMenu", VRoutesMenu);
  app.component("VModal", VModal);
  app.component("VRadio", VRadio);
  app.component("VRadioGroup", VRadioGroup);
  app.component("VSelect", VSelect);
  app.component("VOption", VOption);
  app.component("VSpace", VSpace);
  app.component("VTabbar", VTabbar);
  app.component("VTabItem", VTabItem);
  app.component("VTabs", VTabs);
  app.component("VTag", VTag);
  app.component("VTextarea", VTextarea);
  app.component("VTooltip", VTooltip);
}

const plugin: Plugin = {
  install,
};

export {
  plugin as default,
  VAlert,
  VButton,
  VCard,
  VCheckbox,
  VCheckboxGroup,
  VPageHeader,
  VInput,
  VMenu,
  VMenuItem,
  VMenuLabel,
  VRoutesMenu,
  VModal,
  VRadio,
  VRadioGroup,
  VSelect,
  VOption,
  VSpace,
  VTabbar,
  VTabItem,
  VTabs,
  VTag,
  VTextarea,
  VTooltip,
};
