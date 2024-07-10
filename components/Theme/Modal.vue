<template>
  <div>
    <div
      class="bg-gray-900 bg-opacity-50 fixed inset-0 z-50"
    ></div>
    <div
      class="fixed flex justify-center items-center top-0 left-0 right-0 z-[60] w-full p-4 md:inset-0 h-[calc(100%-1rem)] max-h-full"
      :class="{ ' overflow-y-auto': type !== 'full' }"
    >
      <div
        class="relative w-full max-h-full"
        :class="{
          'max-w-xs': type === 'xs',
          'max-w-md': type === 'sm',
          'max-w-lg': type === 'md',
          'max-w-4xl': type === 'lg',
          'max-w-7xl': type === 'xl',
          'h-full': type === 'full',
        }"
      >
        <!-- Modal content -->
        <div
          class="bg-white rounded-lg shadow dark:bg-gray-700"
          :class="{ 'h-full': type === 'full' }"
        >
          <!-- Modal header -->
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">
              <slot name="header"></slot>
            </h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              @click="closeModal"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div
            :class="{ 'h-[calc(100%-155px)]': type === 'full' }"
            class="px-4 pt-4 pb-12 space-y-4 overflow-y-auto"
          >
            <slot name="body"></slot>
          </div>
          <!-- Modal footer -->
          <div
            class="p-4 bg-white border-t border-gray-200 rounded-b dark:border-gray-600"
            :class="{ 'absolute bottom-0 w-full': type === 'full' }"
          >
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// @ts-ignore
const props = defineProps({
  type: { type: String, default: "md", required: true },
});

// @ts-ignore
const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
  console.log("jalan");
};
</script>
<style></style>
