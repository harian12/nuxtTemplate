<template>
  <div
    class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <h5
      class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
      <slot name="header"></slot>
    </h5>
    <div class="font-normal text-gray-700 dark:text-gray-400">
      <slot name="body"></slot>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style></style>
