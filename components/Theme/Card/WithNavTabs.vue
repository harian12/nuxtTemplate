<template>
  <div
    class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <ul
      class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
      id="defaultTab"
      :data-tabs-toggle="'#' + id"
      role="tablist"
    >
      <li v-for="(navTab, i) in props.nav" :key="i" class="me-2">
        <button
          :id="navTab + '-tab-' + id"
          :data-tabs-target="'#' + navTab + id"
          type="button"
          role="tab"
          :aria-controls="navTab + id"
          :aria-selected="i == 0"
          class="inline-block p-4 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 capitalize"
          :class="{ 'dark:text-blue-500 text-blue-600': i == 0 }"
        >
          {{ navTab }}
        </button>
      </li>
    </ul>
    <div :id="id">
      <div
        v-for="(navTab, i) in props.nav"
        :key="i"
        class="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
        :id="navTab + id"
        role="tabpanel"
        :aria-labelledby="navTab + '-tab-' + id"
      >
        <slot :name="navTab"></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// @ts-ignore
const props = defineProps({
  nav: { type: Array<string>, default: [], require: true },
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
