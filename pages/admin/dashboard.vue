<template>
  <div class="p-4">
    <ThemeCardDefault>
      <template #header> Datatable </template>
      <template #body>
        <KaDatatable
          :header="header"
          @on-items-per-page-change="changeItem"
          :itemsPerPage="itemPage"
          :data="datas"
          :total="totalPage"
          :currentPage="currentPage"
          @page-change="changePage"
          @on-sort="sortField"
          :checkboxEnabled="true"
          @on-item-click="onItemClick"
          @on-items-select="onItemSelect"
          @on-search="onSearch"
        >
          <template v-slot:name="{ row: item }">
            {{ item.name }}
          </template>
          <template v-slot:position="{ row: item }">
            {{ item.position }}
          </template>
          <template v-slot:status="{ row: item }">
            {{ item.status }}
          </template>
          <template v-slot:action="{ row: item }">
            Actions {{ item.id }}
          </template>
        </KaDatatable></template
      >
    </ThemeCardDefault>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const header = [
  {
    columnLabel: "name",
    columnName: "name",
    sortEnabled: true,
  },
  {
    columnLabel: "position",
    columnName: "position",
    sortEnabled: true,
  },

  {
    columnLabel: "status",
    columnName: "status",
    sortEnabled: true,
  },
  {
    columnLabel: "action",
    columnName: "action",
    sortEnabled: true,
  },
];

const datas = ref([
  { id: "1", name: "jont1", position: "Vue Developer", status: "online" },
  { id: "2", name: "jont2", position: "Vue Developer", status: "online" },
  { id: "3", name: "jont3", position: "Vue Developer", status: "online" },
  { id: "4", name: "jont4", position: "Vue Developer", status: "online" },
]);
const itemSelect = ref<Array<string>>([]);
const currentPage = ref<number>(1);
const itemPage = ref<number>(10);
const totalPage = ref<number>(55);

const changeItem = (value: number) => {
  itemPage.value = value;
};

const sortField = (value: any) => {
  console.log("sort: ", value);
};

const onItemClick = (item: any) => {
  if (!itemSelect.value.includes(item.id)) {
    itemSelect.value.push(item.id);
  }
  console.log(itemSelect.value);
};

const onItemSelect = (item: any) => {
  if (item.length > 0) {
    console.log("akhir: ", item);
  }
};

const changePage = (page: number) => {
  currentPage.value = page;
};

const onSearch = (value: string) => {
  console.log("search: ",value)
};
</script>
<style></style>
