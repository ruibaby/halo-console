<script lang="ts" setup>
import { useRoute } from "vue-router";
import { plugins } from "./plugins-mock";
import { ref } from "vue";
import { usePluginsStore } from "@/stores/plugins";

const pluginActiveId = ref("detail");

const { params } = useRoute();

const pluginStore = usePluginsStore();

const plugin = plugins.value.find((item) => {
  return item.spec.pluginClass === params.id;
});

// eslint-disable-next-line
const handleEnablePlugin = (plugin: any) => {
  plugin.metadata.enabled = !plugin.metadata.enabled;
  setTimeout(() => {
    window.location.reload();
  }, 200);
};

const pluginModule = pluginStore.plugins.find(
  (p) => p.name === plugin?.assets?.name
);

const tabs = ref([{ id: "detail", label: "详情" }]);

if (plugin?.settings && plugin?.settings.length) {
  tabs.value.push({ id: "settings", label: "基础设置" });
}
</script>

<template>
  <VPageHeader :title="plugin.metadata.name">
    <template #icon>
      <img :src="plugin.spec.logo" class="mr-2 h-8 w-8" />
    </template>
    <template #actions>
      <VButton class="opacity-0" type="secondary"> 安装</VButton>
    </template>
  </VPageHeader>

  <div class="m-0 md:m-4">
    <VCard :body-class="['!p-0']">
      <template #header>
        <VTabbar
          v-model:active-id="pluginActiveId"
          :items="tabs"
          class="w-full !rounded-none"
          type="outline"
        ></VTabbar>
      </template>

      <div v-if="pluginActiveId === 'detail'">
        <div class="flex items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              插件信息
            </h3>
            <p
              class="mt-1 flex max-w-2xl items-center gap-2 text-sm text-gray-500"
            >
              <span>{{ plugin.spec.version }}</span>
              <VTag>
                {{ plugin.metadata.enabled ? "已启用" : "未启用" }}
              </VTag>
            </p>
          </div>
          <div>
            <button
              :class="{
                'bg-themeable-primary-600': plugin.metadata.enabled,
                'bg-gray-200': !plugin.metadata.enabled,
              }"
              aria-checked="false"
              class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
              role="switch"
              type="button"
              @click="handleEnablePlugin(plugin)"
            >
              <span class="sr-only">Use setting</span>
              <span
                :class="{
                  'translate-x-5': plugin.metadata.enabled,
                  'translate-x-0': !plugin.metadata.enabled,
                }"
                class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              >
                <span
                  :class="{
                    'opacity-0 duration-100 ease-out': plugin.metadata.enabled,
                    'opacity-100 duration-200 ease-in':
                      !plugin.metadata.enabled,
                  }"
                  aria-hidden="true"
                  class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
                >
                  <svg
                    class="h-3 w-3 text-gray-400"
                    fill="none"
                    viewBox="0 0 12 12"
                  >
                    <path
                      d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                </span>
                <span
                  :class="{
                    'opacity-100 duration-200 ease-in': plugin.metadata.enabled,
                    'opacity-0 duration-100 ease-out': !plugin.metadata.enabled,
                  }"
                  aria-hidden="true"
                  class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
                >
                  <svg
                    class="h-3 w-3 text-themeable-primary-600"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path
                      d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
                    />
                  </svg>
                </span>
              </span>
            </button>
          </div>
        </div>
        <div class="border-t border-gray-200">
          <dl class="divide-y divide-gray-100">
            <div
              class="bg-white px-4 py-5 hover:bg-gray-50 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-900">名称</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {{ plugin.metadata.name }}
              </dd>
            </div>
            <div
              class="bg-white px-4 py-5 hover:bg-gray-50 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-900">插件类别</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <VTag>
                  extensions.halo.run/category/{{
                    plugin.metadata.labels["extensions.halo.run/category"]
                  }}
                </VTag>
              </dd>
            </div>
            <div
              class="bg-white px-4 py-5 hover:bg-gray-50 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-900">版本</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {{ plugin.spec.version }}
              </dd>
            </div>
            <div
              class="bg-white px-4 py-5 hover:bg-gray-50 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-900">Halo 版本要求</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {{ plugin.spec.requires }}
              </dd>
            </div>
            <div
              class="bg-white px-4 py-5 hover:bg-gray-50 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-900">提供方</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <a :href="plugin.spec.homepage" target="_blank">
                  @{{ plugin.spec.author }}
                </a>
              </dd>
            </div>
            <div
              class="bg-white px-4 py-5 hover:bg-gray-50 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-900">协议</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {{ plugin.spec.license }}
              </dd>
            </div>
            <div
              class="bg-white px-4 py-5 hover:bg-gray-50 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-900">模型定义</dt>
              <dd class="mt-1 sm:col-span-2 sm:mt-0">
                <ul v-if="plugin.extensions" class="space-y-2">
                  <li
                    v-for="(extension, index) in plugin.extensions"
                    :key="index"
                  >
                    <div
                      class="inline-flex w-96 cursor-pointer flex-row flex-col gap-y-3 rounded border p-5 hover:border-themeable-primary"
                    >
                      <span class="font-medium text-gray-900">
                        {{ extension.name }}
                      </span>
                      <div class="text-xs text-gray-400">
                        <VSpace>
                          <VTag
                            v-for="(field, fieldIndex) in extension.fields"
                            :key="fieldIndex"
                          >
                            {{ field }}
                          </VTag>
                        </VSpace>
                      </div>
                    </div>
                  </li>
                </ul>
                <span v-else>无</span>
              </dd>
            </div>
            <div
              class="bg-gray-50 px-4 py-5 hover:bg-gray-50 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-900">权限定义</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-5 sm:mt-0">
                <dl class="divide-y divide-gray-100">
                  <div
                    class="bg-white px-4 py-5 hover:bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  >
                    <dt class="text-sm font-medium text-gray-900">
                      Discussions Management
                    </dt>
                    <dd
                      class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"
                    >
                      <ul class="space-y-2">
                        <li>
                          <div
                            class="inline-flex w-72 cursor-pointer flex-row items-center gap-4 rounded border p-5 hover:border-themeable-primary"
                          >
                            <input
                              class="h-4 w-4 rounded border-gray-300 text-indigo-600"
                              type="checkbox"
                            />
                            <div class="inline-flex flex-col gap-y-3">
                              <span class="font-medium text-gray-900">
                                Discussions Management
                              </span>
                              <span class="text-xs text-gray-400">
                                依赖于 Discussions View
                              </span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div
                            class="inline-flex w-72 cursor-pointer items-center gap-4 rounded border p-5 hover:border-themeable-primary"
                          >
                            <input
                              class="h-4 w-4 rounded border-gray-300 text-indigo-600"
                              type="checkbox"
                            />
                            <div class="inline-flex flex-col gap-y-3">
                              <span class="font-medium text-gray-900">
                                Discussions View
                              </span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </div>

                  <div
                    class="bg-white px-4 py-5 hover:bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  >
                    <dt class="text-sm font-medium text-gray-900">
                      Posts Management
                    </dt>
                    <dd
                      class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"
                    >
                      <ul class="space-y-2">
                        <li>
                          <div
                            class="inline-flex w-72 cursor-pointer flex-row items-center gap-4 rounded border p-5 hover:border-themeable-primary"
                          >
                            <input
                              class="h-4 w-4 rounded border-gray-300 text-indigo-600"
                              type="checkbox"
                            />
                            <div class="inline-flex flex-col gap-y-3">
                              <span class="font-medium text-gray-900">
                                Posts Management
                              </span>
                              <span class="text-xs text-gray-400">
                                依赖于 Posts View
                              </span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div
                            class="inline-flex w-72 cursor-pointer items-center gap-4 rounded border p-5 hover:border-themeable-primary"
                          >
                            <input
                              class="h-4 w-4 rounded border-gray-300 text-indigo-600"
                              type="checkbox"
                            />
                            <div class="inline-flex flex-col gap-y-3">
                              <span class="font-medium text-gray-900">
                                Posts View
                              </span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </div>
                </dl>
              </dd>
            </div>
            <div
              v-if="pluginModule && pluginModule.routes"
              class="bg-white px-4 py-5 hover:bg-gray-50 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-900">后台路由</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-5 sm:mt-0">
                <ul class="space-y-2">
                  <li
                    v-for="(route, index) in pluginModule.routes"
                    :key="index"
                  >
                    <div
                      class="inline-flex w-96 cursor-pointer flex-row flex-col gap-y-3 rounded border p-5 hover:border-themeable-primary"
                    >
                      <span class="font-medium text-gray-900">
                        {{ route.name }}
                      </span>
                      <div class="text-xs text-gray-400">
                        <VSpace>
                          <VTag>
                            {{ route.path }}
                          </VTag>
                          <VTag>
                            {{ route.component.name }}
                          </VTag>
                        </VSpace>
                      </div>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
            <div
              v-if="pluginModule && pluginModule.menus"
              class="bg-white px-4 py-5 hover:bg-gray-50 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-900">后台菜单</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-5 sm:mt-0">
                <ul class="space-y-2">
                  <li v-for="(menu, index) in pluginModule.menus" :key="index">
                    <div
                      class="inline-flex w-96 cursor-pointer flex-row flex-col gap-y-3 rounded border p-5 hover:border-themeable-primary"
                    >
                      <span class="font-medium text-gray-900">
                        {{ menu.name }}
                      </span>
                      <div class="text-xs text-gray-400">
                        <VSpace>
                          <VTag
                            v-for="(menuItem, itemIndex) in menu.items"
                            :key="itemIndex"
                          >
                            {{ menuItem.name }}
                          </VTag>
                        </VSpace>
                      </div>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div v-if="pluginActiveId === 'settings'">
        <form class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div class="space-y-6 space-y-5 divide-y divide-gray-100">
            <div
              v-for="(setting, index) in plugin.settings"
              :key="index"
              class="px-4 sm:grid sm:grid-cols-6 sm:items-start sm:gap-4 sm:pt-5"
            >
              <label
                class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                {{ setting.label }}
              </label>
              <div class="mt-1 sm:col-span-3 sm:mt-0">
                <div class="flex max-w-lg shadow-sm">
                  <VInput />
                </div>
              </div>
            </div>
          </div>

          <div class="pt-5">
            <div class="flex justify-start p-4">
              <VButton type="secondary"> 保存</VButton>
            </div>
          </div>
        </form>
      </div>
    </VCard>
  </div>
</template>

<style lang="scss" scoped></style>
