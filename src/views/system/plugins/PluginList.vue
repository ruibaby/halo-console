<script lang="ts" setup>
import {
  IconAddCircle,
  IconArrowDown,
  IconPlug,
  IconSettings,
} from "@halo-dev/components";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { plugins } from "./plugins-mock";

const checkAll = ref(false);

const router = useRouter();

// eslint-disable-next-line
const handleRouteToDetail = (plugin: any) => {
  router.push({
    name: "PluginDetail",
    params: { id: plugin.spec.pluginClass },
  });
};

// eslint-disable-next-line
const handleEnablePlugin = (plugin: any) => {
  plugin.metadata.enabled = !plugin.metadata.enabled;
  setTimeout(() => {
    window.location.reload();
  }, 200);
};
</script>
<template>
  <VPageHeader title="插件">
    <template #icon>
      <IconPlug class="mr-2 self-center" />
    </template>
    <template #actions>
      <VButton type="secondary">
        <template #icon>
          <IconAddCircle class="h-full w-full" />
        </template>
        安装
      </VButton>
    </template>
  </VPageHeader>

  <div class="m-0 md:m-4">
    <VCard :body-class="['!p-0']">
      <template #header>
        <div class="block w-full bg-gray-50 px-4 py-3">
          <div
            class="relative flex flex-col items-start sm:flex-row sm:items-center"
          >
            <div class="mr-4 hidden items-center sm:flex">
              <input
                v-model="checkAll"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600"
                type="checkbox"
              />
            </div>
            <div class="flex w-full flex-1 sm:w-auto">
              <VInput
                v-if="!checkAll"
                class="w-full sm:w-72"
                placeholder="输入关键词搜索"
              />
              <VSpace v-else>
                <VButton type="default">禁用</VButton>
                <VButton type="danger">卸载</VButton>
              </VSpace>
            </div>
            <div class="mt-4 flex sm:mt-0">
              <VSpace spacing="lg">
                <FloatingDropdown>
                  <div
                    class="flex cursor-pointer select-none items-center text-sm text-gray-700 hover:text-black"
                  >
                    <span class="mr-0.5">启用状态</span>
                    <span>
                      <IconArrowDown />
                    </span>
                  </div>
                  <template #popper>
                    <div class="w-52 p-4">
                      <ul class="space-y-1">
                        <li
                          class="flex cursor-pointer items-center rounded px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        >
                          <span class="truncate">已启用</span>
                        </li>
                        <li
                          class="flex cursor-pointer items-center rounded px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        >
                          <span class="truncate">未启用</span>
                        </li>
                      </ul>
                    </div>
                  </template>
                </FloatingDropdown>
                <div
                  class="flex cursor-pointer select-none items-center text-sm text-gray-700 hover:text-black"
                >
                  <span class="mr-0.5">类别</span>
                  <span>
                    <IconArrowDown />
                  </span>
                </div>
                <FloatingDropdown>
                  <div
                    class="flex cursor-pointer select-none items-center text-sm text-gray-700 hover:text-black"
                  >
                    <span class="mr-0.5">提供方</span>
                    <span>
                      <IconArrowDown />
                    </span>
                  </div>
                  <template #popper>
                    <div class="h-96 w-80 p-4">
                      <div class="bg-white">
                        <!--TODO: Auto Focus-->
                        <VInput placeholder="根据关键词搜索"></VInput>
                      </div>
                      <div class="mt-2">
                        <ul class="divide-y divide-gray-200" role="list">
                          <li class="cursor-pointer py-4 hover:bg-gray-50">
                            <div class="flex items-center space-x-4">
                              <div class="flex items-center">
                                <input
                                  class="h-4 w-4 rounded border-gray-300 text-indigo-600"
                                  type="checkbox"
                                />
                              </div>
                              <div class="flex-shrink-0">
                                <img
                                  alt="halo-dev"
                                  class="h-10 w-10 rounded"
                                  src="https://halo.run/logo"
                                />
                              </div>
                              <div class="min-w-0 flex-1">
                                <p
                                  class="truncate text-sm font-medium text-gray-900"
                                >
                                  Halo
                                </p>
                                <p class="truncate text-sm text-gray-500">
                                  https://halo.run
                                </p>
                              </div>
                              <div>
                                <VTag>2 个</VTag>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </template>
                </FloatingDropdown>
                <FloatingDropdown>
                  <div
                    class="flex cursor-pointer select-none items-center text-sm text-gray-700 hover:text-black"
                  >
                    <span class="mr-0.5">排序</span>
                    <span>
                      <IconArrowDown />
                    </span>
                  </div>
                  <template #popper>
                    <div class="w-72 p-4">
                      <ul class="space-y-1">
                        <li
                          class="flex cursor-pointer items-center rounded px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        >
                          <span class="truncate">较近安装</span>
                        </li>
                        <li
                          class="flex cursor-pointer items-center rounded px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        >
                          <span class="truncate">较晚安装</span>
                        </li>
                      </ul>
                    </div>
                  </template>
                </FloatingDropdown>
              </VSpace>
            </div>
          </div>
        </div>
      </template>
      <ul class="box-border h-full w-full divide-y divide-gray-100" role="list">
        <li v-for="(plugin, index) in plugins" :key="index">
          <div
            :class="{
              'bg-gray-100': checkAll,
            }"
            class="relative block cursor-pointer px-4 py-3 transition-all hover:bg-gray-50"
          >
            <div
              v-show="checkAll"
              class="absolute inset-y-0 left-0 w-0.5 bg-themeable-primary"
            ></div>
            <div class="relative flex flex-row items-center">
              <div class="mr-4 hidden items-center sm:flex">
                <input
                  v-model="checkAll"
                  class="h-4 w-4 rounded border-gray-300 text-indigo-600"
                  type="checkbox"
                />
              </div>
              <div v-if="plugin.spec.logo" class="mr-4">
                <div
                  class="h-12 w-12 rounded border bg-white p-1 hover:shadow-sm"
                >
                  <img
                    :alt="plugin.metadata.name"
                    :src="plugin.spec.logo"
                    class="h-full w-full"
                  />
                </div>
              </div>
              <div class="flex-1">
                <div
                  class="flex flex-row items-center"
                  @click.stop="handleRouteToDetail(plugin)"
                >
                  <span class="mr-2 truncate text-sm font-medium text-gray-900">
                    {{ plugin.metadata.name }}
                  </span>
                </div>
                <div class="mt-2 flex">
                  <VSpace align="start" direction="column" spacing="xs">
                    <span class="text-xs text-gray-500">
                      {{ plugin.spec.description }}
                    </span>
                    <span class="text-xs text-gray-500 sm:hidden">
                      @{{ plugin.spec.author }} {{ plugin.spec.version }}
                    </span>
                  </VSpace>
                </div>
              </div>
              <div class="flex">
                <div
                  class="inline-flex flex-col flex-col-reverse items-end gap-4 sm:flex-row sm:items-center sm:gap-6"
                >
                  <a
                    :href="plugin.spec.homepage"
                    class="hidden text-sm text-gray-500 hover:text-gray-900 sm:block"
                    target="_blank"
                  >
                    @{{ plugin.spec.author }}
                  </a>
                  <span class="hidden text-sm text-gray-500 sm:block">
                    {{ plugin.spec.version }}
                  </span>
                  <time class="text-sm text-gray-500" datetime="2020-01-07">
                    2020-01-07
                  </time>
                  <div class="flex items-center">
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
                            'opacity-0 duration-100 ease-out':
                              plugin.metadata.enabled,
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
                            'opacity-100 duration-200 ease-in':
                              plugin.metadata.enabled,
                            'opacity-0 duration-100 ease-out':
                              !plugin.metadata.enabled,
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
                  <span
                    class="cursor-pointer"
                    @click.stop="handleRouteToDetail(plugin)"
                  >
                    <IconSettings />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <template #footer>
        <div class="flex items-center justify-end bg-white">
          <div class="flex flex-1 items-center justify-end">
            <div>
              <nav
                aria-label="Pagination"
                class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
              >
                <a
                  class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                  href="#"
                >
                  <span class="sr-only">Previous</span>
                  <svg
                    aria-hidden="true"
                    class="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clip-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      fill-rule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  aria-current="page"
                  class="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600"
                  href="#"
                >
                  1
                </a>
                <a
                  class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                  href="#"
                >
                  2
                </a>
                <span
                  class="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                >
                  ...
                </span>
                <a
                  class="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 md:inline-flex"
                  href="#"
                >
                  4
                </a>
                <a
                  class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                  href="#"
                >
                  <span class="sr-only">Next</span>
                  <svg
                    aria-hidden="true"
                    class="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clip-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      fill-rule="evenodd"
                    />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </template>
    </VCard>
  </div>
</template>
