<template>
  <div class="h-auto w-auto">
    <Sidebar :menu="menu" />
    <div class="sm:ml-64">
      <div class="w-full h-14"></div>
      <div class="px-4 pb-4">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { typeMenu } from "@/utils/utilTypes";

onMounted(() => {
  useFlowbite(() => {
    // @ts-ignore
    initFlowbite();
  });

});

const menu: Array<typeMenu> = [
  {
    name: "dashboard",
    to: "/admin/dashboard",
    dropdown: false,
    icon: "mingcute:dashboard-fill",
    subMenu: [],
  },
  {
    name: "pages",
    to: "/pages",
    dropdown: true,
    icon: "ri:pages-fill",
    subMenu: [
      {
        name: "setting",
        to: "/admin/pages/setting",
        icon: "ant-design:setting-filled",
      },
      { name: "kanban", to: "/admin/pages/kanban", icon: "bi:kanban-fill" },
      { name: "calender", to: "/admin/pages/calender", icon: "uis:calender" },
    ],
  },
  {
    name: "cards",
    to: "/admin/cards",
    dropdown: false,
    icon: "solar:card-bold",
    subMenu: [],
  },
];
</script>
<style lang=""></style>
