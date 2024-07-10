<template>
  <div>
    <ThemeCardDefault>
      <template #header> Modal </template>
      <template #body>
        <div class="flex gap-4">
          <button
            class="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            @click="modalXs = true"
          >
            Extra Small modal
          </button>
          <button
            class="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            @click="modalSm = true"
          >
            Small modal
          </button>
          <button
            class="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            @click="modalMd = true"
          >
            Medium modal
          </button>
          <button
            class="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            @click="modalLg = true"
          >
            Large modal
          </button>
          <button
            class="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            @click="modalXl = true"
          >
            Extra Large modal
          </button>
          <button
            class="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            @click="modalFull = true"
          >
            Full modal
          </button>
        </div>
      </template>
    </ThemeCardDefault>

    <ThemeModal v-if="modalXs" type="xs" @close="modalXs = false">
      <template #header> Modal Extra Small </template>
      <template #body>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui nihil
          placeat suscipit, atque sed unde voluptas minima asperiores alias.
          Inventore, autem. Earum sed unde voluptatibus autem aperiam sequi
          laudantium aspernatur!
        </p>
      </template>
      <template #footer>
        <button
          data-modal-hide="small-modal"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="modalXs = false"
        >
          I accept
        </button>
        <button
          data-modal-hide="small-modal"
          type="button"
          class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          @click="modalXs = false"
        >
          Decline
        </button>
      </template>
    </ThemeModal>
    
    <ThemeModal v-if="modalSm" type="sm" @close="modalSm = false">
      <template #header> Modal Small </template>
      <template #body>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui nihil
          placeat suscipit, atque sed unde voluptas minima asperiores alias.
          Inventore, autem. Earum sed unde voluptatibus autem aperiam sequi
          laudantium aspernatur!
        </p>
      </template>
      <template #footer>
        <button
          data-modal-hide="small-modal"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="modalSm = false"
        >
          I accept
        </button>
        <button
          data-modal-hide="small-modal"
          type="button"
          class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          @click="modalSm = false"
        >
          Decline
        </button>
      </template>
    </ThemeModal>

    <ThemeModal v-if="modalMd" type="md" @close="modalMd = false">
      <template #header> Modal Medium </template>
      <template #body>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui nihil
          placeat suscipit, atque sed unde voluptas minima asperiores alias.
          Inventore, autem. Earum sed unde voluptatibus autem aperiam sequi
          laudantium aspernatur!
        </p>
      </template>
      <template #footer>
        <button
          data-modal-hide="small-modal"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="modalMd = false"
        >
          I accept
        </button>
        <button
          data-modal-hide="small-modal"
          type="button"
          class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          @click="modalMd = false"
        >
          Decline
        </button>
      </template>
    </ThemeModal>

    <ThemeModal v-if="modalLg" type="lg" @close="modalLg = false">
      <template #header> Modal Large </template>
      <template #body>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui nihil
          placeat suscipit, atque sed unde voluptas minima asperiores alias.
          Inventore, autem. Earum sed unde voluptatibus autem aperiam sequi
          laudantium aspernatur!
        </p>
      </template>
      <template #footer>
        <button
          data-modal-hide="small-modal"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="modalLg = false"
        >
          I accept
        </button>
        <button
          data-modal-hide="small-modal"
          type="button"
          class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          @click="modalLg = false"
        >
          Decline
        </button>
      </template>
    </ThemeModal>

    <ThemeModal v-if="modalXl" type="xl" @close="modalXl = false">
      <template #header> Modal Extra Large </template>
      <template #body>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui nihil
          placeat suscipit, atque sed unde voluptas minima asperiores alias.
          Inventore, autem. Earum sed unde voluptatibus autem aperiam sequi
          laudantium aspernatur!
        </p>
      </template>
      <template #footer>
        <button
          data-modal-hide="small-modal"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="modalXl = false"
        >
          I accept
        </button>
        <button
          data-modal-hide="small-modal"
          type="button"
          class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          @click="modalXl = false"
        >
          Decline
        </button>
      </template>
    </ThemeModal>

    <ThemeModal v-if="modalFull" type="full" @close="modalFull = false">
      <template #header> Modal Full </template>
      <template #body>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui nihil
          placeat suscipit, atque sed unde voluptas minima asperiores alias.
          Inventore, autem. Earum sed unde voluptatibus autem aperiam sequi
          laudantium aspernatur!
        </p>
      </template>
      <template #footer>
        <button
          data-modal-hide="small-modal"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="modalFull = false"
        >
          I accept
        </button>
        <button
          data-modal-hide="small-modal"
          type="button"
          class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          @click="modalFull = false"
        >
          Decline
        </button>
      </template>
    </ThemeModal>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const modalXs = ref<boolean>(false);
const modalSm = ref<boolean>(false);
const modalMd = ref<boolean>(false);
const modalLg = ref<boolean>(false);
const modalXl = ref<boolean>(false);
const modalFull = ref<boolean>(false);
</script>
<style></style>
