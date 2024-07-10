<template>
  <ThemeCardDefault>
    <template #header> Tooltips </template>
    <template #body>
      <div class="flex gap-4">
        <ThemeTooltip position="top"> 
          <template #button>
            <div class="bg-blue-600 text-white capitalize px-3 py-2 rounded-lg">
              Toltip Top
            </div>
          </template>
          <template #tooltip>
            <div class="bg-gray-500 text-white p-2 rounded-lg shadow-sm w-48">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </template>
        </ThemeTooltip>
        <ThemeTooltip position="bottom"> 
          <template #button>
            <div class="bg-blue-600 text-white capitalize px-3 py-2 rounded-lg">
              Toltip bottom
            </div>
          </template>
          <template #tooltip>
            <div class="bg-gray-500 text-white p-2 rounded-lg shadow-sm w-48">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </template>
        </ThemeTooltip>
        <ThemeTooltip position="left"> 
          <template #button>
            <div class="bg-blue-600 text-white capitalize px-3 py-2 rounded-lg">
              Toltip left
            </div>
          </template>
          <template #tooltip>
            <div class="bg-gray-500 text-white p-2 rounded-lg shadow-sm w-48">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </template>
        </ThemeTooltip>
        <ThemeTooltip position="right"> 
          <template #button>
            <div class="bg-blue-600 text-white capitalize px-3 py-2 rounded-lg">
              Toltip right
            </div>
          </template>
          <template #tooltip>
            <div class="bg-gray-500 text-white p-2 rounded-lg shadow-sm w-48">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </template>
        </ThemeTooltip>
      </div>
    </template>
  </ThemeCardDefault>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
</script>
<style></style>
