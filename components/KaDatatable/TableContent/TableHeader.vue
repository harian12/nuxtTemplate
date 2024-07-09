<template>
  <thead
    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
  >
    <tr>
      <th v-if="props.checkboxEnabled" scope="col" class="p-4">
        <div class="flex items-center">
          <input
            v-if="!radioEnabled"
            type="checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            v-model="checked"
            @change="selectAll()"
          />
          <label class="sr-only">checkbox</label>
        </div>
        </th>
        <!-- eslint-disable-next-line -->
        <template v-for="(column, i) in header" :key="i"> 
        <th
        class="px-2"
          :class="{
            'text-end': i === header.length - 1,
          }"
          @click="onSort(column.columnLabel, column.sortEnabled)"
          :style="{
            minWidth: column.columnWidth ? `${column.columnWidth}px` : '0',
            width: column.columnWidth ? `${column.columnWidth}px` : '0',
            cursor: column.sortEnabled ? 'pointer' : 'auto',
          }"
        >
          {{ column.columnName }}
          <template v-if="column.sortEnabled">
            <span v-if="columnLabelAndOrder.label === column.columnLabel">
              <Icon
                v-if="columnLabelAndOrder.order === 'asc'"
                name="lets-icons:arrow-down"
              />
              <Icon v-else name="lets-icons:arrow-top" />
            </span>
            <span v-else><i class="fa-solid fa-sort"></i></span>
          </template>
        </th>
      </template>
    </tr>
  </thead>
</template>
<script setup lang="ts">
// @ts-ignore
import type { Sort } from "@/components/KaDatatable/type.ts";

// @ts-ignore
const props = defineProps({
  checkboxEnabledValue: { type: Boolean, required: false, default: false },
  checkboxEnabled: { type: Boolean, required: false, default: false },
  radioEnabled: { type: Boolean, required: false, default: false },
  sortLabel: { type: String, required: false, default: null },
  sortOrder: {
    type: String,
    required: false,
    default: "asc",
  },
  header: { type: Array as () => Array<any>, required: true },
});

// @ts-ignore
const emit = defineEmits(["on-select", "on-sort"]);

const checked = ref<boolean>(false);
const columnLabelAndOrder = ref<Sort>({
  label: props.sortLabel,
  order: props.sortOrder,
});

watch(
  () => props.checkboxEnabledValue,
  (currentValue:any) => {
    checked.value = currentValue;
  }
);

const selectAll = () => {
  emit("on-select", checked.value);
};

const onSort = (label: string, sortEnabled: boolean) => {
  if (sortEnabled) {
    if (columnLabelAndOrder.value.label === label) {
      if (columnLabelAndOrder.value.order === "asc") {
        columnLabelAndOrder.value.order = "desc";
      } else {
        if (columnLabelAndOrder.value.order === "desc") {
          columnLabelAndOrder.value.order = "asc";
        }
      }
    } else {
      columnLabelAndOrder.value.order = "asc";
      columnLabelAndOrder.value.label = label;
    }
    emit("on-sort", columnLabelAndOrder.value);
  }
};
</script>
<style></style>
