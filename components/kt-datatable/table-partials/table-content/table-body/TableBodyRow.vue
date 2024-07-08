<template>
  <tbody class="fw-semibold text-gray-600">
    <template v-for="(row, i) in data" :key="i">
      <tr>
        <td v-if="checkboxEnabled">
          <div
            class="form-check form-check-sm form-check-custom form-check-solid"
          >
            <input
              class="form-check-input"
              type="checkbox"
              :value="row[checkboxLabel]"
              v-model="selectedItems"
              @change="onChange"
            />
          </div>
        </td>
        <template v-for="(properties, j) in header" :key="j">
          <td
            @click="onRowClick(row, properties)"
            :class="{ 'text-end': j === header.length - 1 }"
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

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "table-body-row",
  components: {},
  props: {
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
  },
  emits: ["on-select", "on-row-click"],
  setup(props, { emit }) {
    const selectedItems = ref<Array<any>>([]);

    watch(
      () => [...props.currentlySelectedItems],
      (currentValue) => {
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

    const onRowClick = (row, header) => {
      if (!["action", "actions"].includes(header.columnName.toLowerCase()))
        emit("on-row-click", row);
    };

    return {
      selectedItems,
      onChange,
      onRowClick,
    };
  },
});
</script>
