<template>
  <div class="relative">
    <div
      :data-tooltip-target="'tooltip-' + id"
      :data-tooltip-placement="props.position"
    >
      <slot name="button"></slot>
    </div>
    <div
      :id="'tooltip-' + id"
      role="tooltip"
      class="absolute z-50 invisible inline-block text-sm font-medium border-2 bg-gray-600 border-gray-600 rounded-lg shadow-sm opacity-0 tooltip"
    >
      <div class="tooltip-arrow" data-popper-arrow></div>
      <slot name="tooltip"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
// @ts-ignore
const props = defineProps({
  position: { type: String, default: "top", required: true },
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
