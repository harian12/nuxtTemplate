<template>
  <tbody>
<!-- eslint-disable-next-line -->
    <template v-for="(row, i) in data" :key="i">
      <tr
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <td v-if="props.checkboxEnabled" class="w-4 p-4">
          <div class="flex items-center">
            <input
              id="checkbox-table-search-1"
              v-model="selectedItems"
              :value="row[checkboxLabel]"
              type="checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              @change="onChange"
            />
            <label for="checkbox-table-search-1" class="sr-only"
              >checkbox</label
            >
          </div>
        </td>
<!-- eslint-disable-next-line -->
<template v-for="(properties, j) in props.header" :key="j">
          <td
            @click="onRowClick(row, properties)"
            :class="{ 'text-end': j === props.header.length - 1 }"
            class="p-2"
          >
            <slot :name="`${properties.columnLabel}`" :row="row">
              {{ row }}
            </slot>
          </td>
        </template>
      </tr>
    </template>
  </tbody>
</template>
<script setup lang="ts">
// @ts-ignore
const props = defineProps({
  header: { type: Array as () => Array<any>, required: true },
  data: { type: Array as () => Array<any>, required: true },
  currentlySelectedItems: { type: Array, required: false, default: () => [] },
  checkboxEnabled: { type: Boolean, required: false, default: false },
  radioEnabled: { type: Boolean, required: false, default: false },
  checkboxLabel: {
    type: String as () => string,
    required: false,
    default: "id",
  },
  resetCheckbox: { type: Boolean, required: false, default: false },
});

// @ts-ignore
const emit = defineEmits(["on-select", "on-row-click"]);
const selectedItems = ref<Array<any>>([]);

watch(
  () => [...props.currentlySelectedItems],
  (currentValue:any) => {
    selectedItems.value = currentValue;
  }
);
watch(
  () => props.resetCheckbox,
  () => {
    if (props.resetCheckbox) {
      selectedItems.value = [];
    }
  }
);

const onChange = () => {
  if (props.radioEnabled) {
    const idx = selectedItems.value.length - 1;
    emit("on-select", [selectedItems.value[idx]] ?? []);
  } else {
    emit("on-select", selectedItems.value);
  }
};

// @ts-ignore
const onRowClick = (row, header) => {
  if (!["action", "actions"].includes(header.columnName.toLowerCase()))
    emit("on-row-click", row);
};
</script>
<style lang=""></style>
