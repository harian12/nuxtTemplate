<template>
  <div class="relative overflow-x-auto p-1">
    <!-- eslint-disable -->
    <KaDatatableTableContentHead
      v-model:itemsPerPage="itemsCountInTable"
      :items-per-page-dropdown-enabled="itemsPerPageDropdownEnabled"
    />
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <KaDatatableTableContentTableHeader
        @onSort="onSort"
        @onSelect="selectAll"
        :checkboxEnabledValue="check"
        :checkboxEnabled="checkboxEnabled"
        :radioEnabled="radioEnabled"
        :sort-label="sortLabel"
        :sort-order="sortOrder"
        :header="header"
      />
      <KaDatatableTableContentTableBody
        v-if="data.length !== 0"
        @onSelect="onItemSelect"
        @onRowClick="onItemClick"
        :currentlySelectedItems="selectedItems"
        :data="data"
        :header="header"
        :checkbox-enabled="checkboxEnabled"
        :radio-enabled="radioEnabled"
        :checkbox-label="checkboxLabel"
        :resetCheckbox="resetCheckbox"
        :style="{
          cursor: cursorPointer ? 'pointer' : '',
        }"
      >
        <template v-for="(_, name) in $slots" v-slot:[name]="{ row: item }">
          <slot :name="name" :row="item" />
        </template>
      </KaDatatableTableContentTableBody>
    </table>
    <KaDatatableTableContentFooter
      v-if="pageCount > 1"
      :totalPages="pageCount"
      :perPage="itemsPerPage"
      :currentPage="page"
      :total="totalItems"
      @page-change="pageChange"
    />
  </div>
</template>
<script setup lang="ts">
// @ts-ignore
import type { Sort } from "@/components/KaDatatable/type.ts";

// @ts-ignore
const props = defineProps({
  header: { type: Array, required: true },
  cursorPointer: { type: Boolean, required: false, default: true },
  data: { type: Array, required: true },
  itemsPerPage: { type: Number, default: 10 },
  itemsPerPageDropdownEnabled: {
    type: Boolean,
    required: false,
    default: true,
  },
  checkboxEnabled: { type: Boolean, required: false, default: false },
  radioEnabled: { type: Boolean, required: false, default: false },
  checkboxLabel: { type: String, required: false, default: "id" },
  total: { type: Number, required: false },
  loading: { type: Boolean, required: false, default: false },
  sortLabel: { type: String, required: false, default: null },
  sortOrder: {
    type: String as () => "asc" | "desc",
    required: false,
    default: "asc",
  },
  emptyTableText: { type: String, required: false, default: "No data found" },
  currentPage: { type: Number, required: false, default: 1 },
  resetCheckbox: { type: Boolean, required: false, default: false },
});

// @ts-ignore
const emit = defineEmits([
  "page-change",
  "on-sort",
  "on-items-select",
  "on-items-per-page-change",
  "on-item-click",
]);

const itemsInTable = ref<number>(props.itemsPerPage);
const check = ref<boolean>(false);
const selectedItems = ref<Array<unknown>>([]);
const allSelectedItems = ref<Array<unknown>>([]);
const page = ref(props.currentPage);

onMounted(() => {
  selectedItems.value = [];
  allSelectedItems.value = [];
  check.value = false;
  // eslint-disable-next-line
  props.data.forEach((item: any) => {
    if (item[props.checkboxLabel]) {
      allSelectedItems.value.push(item[props.checkboxLabel]);
    }
  });
});

watch(
  () => props.itemsPerPage,
  (val: number) => {
    itemsInTable.value = val;
  }
);

watch(
  () => itemsInTable.value,
  (val: number) => {
    page.value = 1;
    emit("on-items-per-page-change", val);
  }
);

watch(
  () => props.data,
  () => {
    selectedItems.value = [];
    allSelectedItems.value = [];
    check.value = false;
    // eslint-disable-next-line
    props.data.forEach((item: any) => {
      if (item[props.checkboxLabel]) {
        allSelectedItems.value.push(item[props.checkboxLabel]);
      }
    });
  }
);

watch(
  () => [...selectedItems.value],
  (currentValue: any) => {
    if (currentValue) {
      emit("on-items-select", currentValue);
    }
  }
);

// eslint-disable-next-line
const selectAll = (checked: any) => {
  check.value = checked;

  if (checked) {
    selectedItems.value = [
      ...new Set([...selectedItems.value, ...allSelectedItems.value]),
    ];
  } else {
    selectedItems.value = [];
  }
};

const pageChange = (p: number) => {
  page.value = p;
  emit("page-change", p);
};

const dataToDisplay = computed(() => {
  if (props.data) {
    if (props.data.length <= itemsInTable.value) {
      return props.data;
    } else {
      let sliceFrom = (page.value - 1) * itemsInTable.value;
      return props.data.slice(sliceFrom, sliceFrom + itemsInTable.value);
    }
  }
  return [];
});

const totalItems = computed(() => {
  if (props.data) {
    if (props.data.length <= itemsInTable.value) {
      return props.total;
    } else {
      return props.data.length;
    }
  }
  return 0;
});

const pageCount = computed(() => {
  return Math.ceil(totalItems.value / itemsCountInTable.value);
});

/* eslint-disable */
const itemsCountInTable: WritableComputedRef<number> = computed({
  get(): number {
    return props.itemsPerPage;
  },
  set(value: number): void {
    itemsInTable.value = value;
  },
});

const onSort = (sort: Sort) => {
  emit("on-sort", sort);
};

const onItemClick = (item: any) => {
  emit("on-item-click", item);
};

//eslint-disable-next-line
const onItemSelect = (selectedItems: any) => {
  emit("on-items-select", selectedItems);
};
</script>

<style></style>
