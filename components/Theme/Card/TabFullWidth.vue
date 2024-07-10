<template>
  <div
    class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="sm:hidden">
      <label :for="'tabs' + id" class="sr-only">Select tab</label>
      <select
        :id="'tabs' + id"
        class="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option v-for="(tab, i) in props.nav" :key="i" class="capitalize">
          {{ tab }}
        </option>
      </select>
    </div>
    <ul
      class="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse"
      :id="'fullWidthTab' + id"
      :data-tabs-toggle="'#fullWidthTabContent' + id"
      :role="'tablist' + id"
    >
      <li v-for="(tab, i) in props.nav" :key="i" class="w-full">
        <button
          :id="tab + '-tab'"
          :data-tabs-target="'#' + tab"
          type="button"
          role="tab"
          :aria-controls="tab"
          :aria-selected="i == 0"
          class="inline-block w-full capitalize p-4 rounded-ss-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          {{ tab }}
        </button>
      </li>
    </ul>
    <div
      :id="'fullWidthTabContent' + id"
      class="border-t border-gray-200 dark:border-gray-600"
    >
      <div
        v-for="(tab, i) in props.nav"
        :key="i"
        class="hidden p-4 bg-white rounded-lg dark:bg-gray-800"
        :id="tab"
        role="tabpanel"
        :aria-labelledby="tab + '-tab'"
      >
        <slot :name="tab"></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// @ts-ignore
const props = defineProps({
  nav: { type: Array<string>, default: [], required: true },
});

const id = ref<string>("");

onMounted(() => {
  useFlowbite(() => {
    // @ts-ignore
    initFlowbite();
  });
  id.value = (Math.random() + 1).toString(36).substring(7);
});
</script>
<style></style>
