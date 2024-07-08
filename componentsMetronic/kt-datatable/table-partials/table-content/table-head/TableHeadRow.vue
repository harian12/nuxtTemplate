<template>
  <thead>
    <tr
      class="text-start text-black-400 fw-bold fs-7 text-uppercase gs-0"
      bgcolor="#f5f5f5"
    >
      <th v-if="checkboxEnabled" :style="{ width: '30px' }">
        <div
          class="form-check form-check-sm form-check-custom form-check-solid me-3"
        >
          <input
            v-if="!radioEnabled"
            class="form-check-input"
            type="checkbox"
            v-model="checked"
            @change="selectAll()"
          />
        </div>
      </th>
      <template v-for="(column, i) in header" :key="i">
        <th
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
            <span
              v-if="columnLabelAndOrder.label === column.columnLabel"
              v-html="sortArrow"
            ></span>
            <span v-else><i class="fa-solid fa-sort"></i></span>
          </template>
        </th>
      </template>
    </tr>
  </thead>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import type { Sort } from "@/components/kt-datatable/table-partials/models";

export default defineComponent({
  name: "table-head-row",
  props: {
    checkboxEnabledValue: { type: Boolean, required: false, default: false },
    checkboxEnabled: { type: Boolean, required: false, default: false },
    radioEnabled: { type: Boolean, required: false, default: false },
    sortLabel: { type: String, required: false, default: null },
    sortOrder: {
      type: String as () => "asc" | "desc",
      required: false,
      default: "asc",
    },
    header: { type: Array as () => Array<any>, required: true },
  },
  emits: ["on-select", "on-sort"],
  components: {},
  setup(props, { emit }) {
    const checked = ref<boolean>(false);
    const columnLabelAndOrder = ref<Sort>({
      label: props.sortLabel,
      order: props.sortOrder,
    });

    watch(
      () => props.checkboxEnabledValue,
      (currentValue) => {
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

    const sortArrow = computed(() => {
      return columnLabelAndOrder.value.order === "asc"
        ? '<i class="fa-solid fa-sort-down"></i>'
        : '<i class="fa-solid fa-sort-up"></i>';
    });

    return {
      onSort,
      selectAll,
      checked,
      sortArrow,
      columnLabelAndOrder,
    };
  },
});
</script>
