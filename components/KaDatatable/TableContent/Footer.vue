<template>
  <div class="grid md:grid-cols-2 gap-3 py-4">
    <span>
      Data {{ props.currentPage * props.perPage - props.perPage + 1 }} -
      {{
        props.currentPage * props.perPage > props.total
          ? props.total
          : props.currentPage * props.perPage
      }}
      dari {{ props.total }}</span
    >
    <nav aria-label="Page navigation example" class="flex justify-end">
      <ul class="inline-flex gap-3 -space-x-px text-sm">
        <li v-if="currentPage != 1">
          <a
            href="#"
            class="flex items-center justify-center w-8 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            @click="onClickPreviousPage"
          >
            <Icon name="material-symbols:keyboard-arrow-left" />
          </a>
        </li>
        <li v-show="props.currentPage > 2 && props.totalPages > 3">
          <a
            href="#"
            class="flex items-center justify-center w-8 h-8 leading-tight rounded-full text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            @click="onClickFirstPage"
            >1</a
          >
        </li>
        <span v-show="props.currentPage > 2 && props.totalPages > 3">...</span>

        <li v-for="page in pages" :key="page.name">
          <a
            href="#"
            aria-current="page"
            :class="{
              '!text-blue-600 !bg-blue-50 !border-none hover:!bg-blue-100 hover:!text-blue-700 dark:!border-gray-700 dark:!bg-gray-700 dark:!text-white':
                page.isActive,
            }"
            class="flex items-center justify-center w-8 h-8 leading-tight rounded-full text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            @click="onClickPage(page.name)"
            >{{ page.name }}</a
          >
        </li>

        <span
          v-if="
            props.currentPage < props.totalPages - 1 && props.totalPages > 5
          "
          >...</span
        >
        <li
          v-if="
            props.currentPage < props.totalPages - 1 && props.totalPages > 5
          "
        >
          <a
            href="#"
            class="flex items-center justify-center w-8 h-8 leading-tight rounded-full text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            @click="onClickLastPage"
            >{{ props.totalPages }}</a
          >
        </li>
        <li v-if="props.currentPage != props.totalPages">
          <a
            href="#"
            class="flex items-center justify-center w-8 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            @click="onClickNextPage"
          >
            <Icon name="material-symbols:keyboard-arrow-right" />
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script setup lang="ts">

// @ts-ignore
const props = defineProps({
  maxVisibleButtons: {
    type: Number,
    required: false,
    default: 3,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

// @ts-ignore
const emits = defineEmits(["page-change"]);

const startPage = computed(() => {
  if (
    props.totalPages < props.maxVisibleButtons ||
    props.currentPage === 1 ||
    props.currentPage <= Math.floor(props.maxVisibleButtons / 2) ||
    (props.currentPage + 2 > props.totalPages &&
      props.totalPages === props.maxVisibleButtons)
  ) {
    return 1;
  }

  if (props.currentPage + 2 > props.totalPages) {
    return props.totalPages - props.maxVisibleButtons + 1;
  }

  return props.currentPage - 1;
});

const endPage = computed(() => {
  return Math.min(
    startPage.value + props.maxVisibleButtons - 1,
    props.totalPages
  );
});

const pages = computed(() => {
  const range: Array<{
    name: number;
    isActive: boolean;
  }> = [];

  for (let i = startPage.value; i <= endPage.value; i += 1) {
    range.push({
      name: i,
      isActive: i === props.currentPage,
    });
  }

  return range;
});

const onClickFirstPage = () => {
  emits("page-change", 1);
};
const onClickPreviousPage = () => {
  emits("page-change", props.currentPage - 1);
};
const onClickPage = (page: number) => {
  emits("page-change", page);
};
const onClickNextPage = () => {
  emits("page-change", props.currentPage + 1);
};
const onClickLastPage = () => {
  emits("page-change", props.totalPages);
};
</script>
<style></style>
