<template>
  <div
    class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900"
  >
    <div class="max-w-xs">
      <select
        v-if="props.itemsPerPageDropdownEnabled"
        v-model="itemsCountInTable"
        class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option :value="10">10</option>
        <option :value="25">25</option>
        <option :value="50">50</option>
      </select>
    </div>
    <div class="relative">
      <div
        class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
      >
        <Icon name="ic:round-search" class="w-5 h-5" />
      </div>
      <input
        type="text"
        id="table-search-users"
        class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
// @ts-ignore
const props = defineProps({
  itemsPerPage: { type: Number, default: 10 },
  itemsPerPageDropdownEnabled: {
    type: Boolean,
    required: false,
    default: true,
  },
});

// @ts-ignore
const emit = defineEmits(["update:itemsPerPage"]);

const inputItemsPerPage = ref(10);

onMounted(() => {
  inputItemsPerPage.value = props.itemsPerPage;
});

// @ts-ignore
const itemsCountInTable: WritableComputedRef<number> = computed({
  get(): number {
    return props.itemsPerPage;
  },
  set(value: number): void {
    emit("update:itemsPerPage", value);
  },
});
</script>
<style></style>
