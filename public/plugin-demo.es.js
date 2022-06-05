import { defineComponent, ref, openBlock, createElementBlock, Fragment, createElementVNode, toDisplayString, pushScopeId, popScopeId, createTextVNode, h, inject, computed, normalizeClass, unref, renderSlot, createCommentVNode, markRaw } from "vue";
var HelloWorld_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _withScopeId = (n) => (pushScopeId("data-v-28e8ed6f"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("p", null, [
  /* @__PURE__ */ createTextVNode(" Recommended IDE setup: "),
  /* @__PURE__ */ createElementVNode("a", {
    href: "https://code.visualstudio.com/",
    target: "_blank"
  }, "VS Code"),
  /* @__PURE__ */ createTextVNode(" + "),
  /* @__PURE__ */ createElementVNode("a", {
    href: "https://github.com/johnsoncodehk/volar",
    target: "_blank"
  }, "Volar")
], -1));
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("p", null, [
  /* @__PURE__ */ createTextVNode("See "),
  /* @__PURE__ */ createElementVNode("code", null, "README.md"),
  /* @__PURE__ */ createTextVNode(" for more information.")
], -1));
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("p", null, [
  /* @__PURE__ */ createElementVNode("a", {
    href: "https://vitejs.dev/guide/features.html",
    target: "_blank"
  }, " Vite Docs "),
  /* @__PURE__ */ createTextVNode(" | "),
  /* @__PURE__ */ createElementVNode("a", {
    href: "https://v3.vuejs.org/",
    target: "_blank"
  }, "Vue 3 Docs")
], -1));
const _hoisted_4$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("p", null, [
  /* @__PURE__ */ createTextVNode(" Edit "),
  /* @__PURE__ */ createElementVNode("code", null, "components/HelloWorld.vue"),
  /* @__PURE__ */ createTextVNode(" to test hot module replacement. ")
], -1));
const _sfc_main = /* @__PURE__ */ defineComponent({
  name: "HelloWorld",
  props: {
    msg: null
  },
  setup(__props) {
    const count = ref(0);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createElementVNode("h1", null, toDisplayString(__props.msg), 1),
        _hoisted_1,
        _hoisted_2,
        _hoisted_3,
        createElementVNode("button", {
          type: "button",
          onClick: _cache[0] || (_cache[0] = ($event) => count.value++)
        }, "count is: " + toDisplayString(count.value), 1),
        _hoisted_4$1
      ], 64);
    };
  }
});
var HelloWorld = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-28e8ed6f"]]);
var Panel = defineComponent({
  setup() {
  },
  render() {
    return h("div", {}, "Hello World!");
  }
});
/*!
  * vue-router v4.0.15
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
const PolySymbol = (name) => hasSymbol ? Symbol(name) : "_vr_" + name;
const routerKey = /* @__PURE__ */ PolySymbol("r");
var NavigationType;
(function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
var NavigationFailureType;
(function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
function useRouter() {
  return inject(routerKey);
}
const _hoisted_1$1 = ["disabled"];
const _hoisted_2$1 = {
  key: 0,
  class: "btn-icon"
};
const _hoisted_3$1 = {
  key: 0,
  class: "animate-spin",
  fill: "none",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_4 = /* @__PURE__ */ createElementVNode("circle", {
  class: "opacity-25",
  cx: "12",
  cy: "12",
  r: "10",
  stroke: "currentColor",
  "stroke-width": "4"
}, null, -1);
const _hoisted_5 = /* @__PURE__ */ createElementVNode("path", {
  class: "opacity-75",
  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
  fill: "currentColor"
}, null, -1);
const _hoisted_6 = [
  _hoisted_4,
  _hoisted_5
];
const _hoisted_7 = { class: "btn-content" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  name: "Button",
  props: {
    type: {
      type: String,
      default: "default"
    },
    size: {
      type: String,
      default: "md"
    },
    circle: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    route: {
      type: Object
    }
  },
  emits: ["click"],
  setup(__props, { emit }) {
    const props = __props;
    const router = useRouter();
    const classes = computed(() => {
      return [
        `btn-${props.size}`,
        `btn-${props.type}`,
        { "btn-circle": props.circle },
        { "btn-block": props.block },
        { "btn-loading": props.loading }
      ];
    });
    function handleClick() {
      if (props.disabled || props.loading)
        return;
      if (props.route) {
        router.push(props.route);
      }
      emit("click");
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        class: normalizeClass([unref(classes), "btn"]),
        disabled: __props.disabled,
        onClick: handleClick
      }, [
        _ctx.$slots.icon || __props.loading ? (openBlock(), createElementBlock("span", _hoisted_2$1, [
          __props.loading ? (openBlock(), createElementBlock("svg", _hoisted_3$1, _hoisted_6)) : renderSlot(_ctx.$slots, "icon", { key: 1 })
        ])) : createCommentVNode("", true),
        createElementVNode("span", _hoisted_7, [
          renderSlot(_ctx.$slots, "default")
        ])
      ], 10, _hoisted_1$1);
    };
  }
});
const postsPageStateHandler = (state) => {
  state.afterComponents.push({
    component: markRaw(HelloWorld),
    props: {},
    slots: {
      default: "CheckAll"
    },
    events: {}
  });
  state.actions.push({
    component: markRaw(_sfc_main$1),
    props: {
      type: "secondary",
      loading: true
    },
    slots: {
      default: "CheckAll"
    },
    events: {
      click: () => {
        state.checkAll = !state.checkAll;
      }
    }
  });
};
const plugin = {
  name: "plugin-demo",
  components: [HelloWorld, Panel],
  extensionPoints: {
    "POSTS": postsPageStateHandler,
    "POST_EDITOR": () => {
    },
    "DASHBOARD": (state) => {
      state.widgets.push({
        id: "plugin-demo",
        label: "PluginDemo",
        widgets: [
          { x: 0, y: 0, w: 6, h: 10, i: 0, widget: "HelloWorld" }
        ]
      });
    }
  },
  routes: [
    {
      path: "/plugin-demo",
      name: "pluginDemo",
      component: HelloWorld
    }
  ],
  menus: [
    {
      name: "\u5FAE\u4FE1\u516C\u4F17\u53F7",
      items: [
        {
          name: "\u5A92\u4F53\u5E93",
          path: "/plugin-demo"
        }
      ]
    }
  ]
};
export { plugin as default };
