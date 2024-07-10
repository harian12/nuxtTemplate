<template>
  <div class="grid gap-3">
    <ThemeCardDefault>
      <template #header> Card Default </template>
      <template #body>
        <div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam,
          consequatur impedit iusto officiis odio illo amet perspiciatis
          voluptates. Cupiditate fuga nostrum quos amet qui soluta accusantium
          ea repellendus accusamus rem?
        </div>
      </template>
    </ThemeCardDefault>
    <ThemeCardWithNavTabs :nav="navTabs">
      <template #about>
        <div>
          About Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Debitis velit ratione beatae laboriosam tempora nesciunt quo veritatis
          cum, vero ullam recusandae nam, atque tenetur ex voluptatibus porro in
          repudiandae sunt!
        </div>
      </template>
      <template #service>
        <div>
          Service Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Debitis velit ratione beatae laboriosam tempora nesciunt quo veritatis
          cum, vero ullam recusandae nam, atque tenetur ex voluptatibus porro in
          repudiandae sunt!
        </div>
      </template>
      <template #facts>
        <div>
          Facts Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Debitis velit ratione beatae laboriosam tempora nesciunt quo veritatis
          cum, vero ullam recusandae nam, atque tenetur ex voluptatibus porro in
          repudiandae sunt!
        </div>
      </template>
    </ThemeCardWithNavTabs>
    <ThemeCardTabFullWidth :nav="navTabsFull">
      <template #about>
        <div>
          About Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Debitis velit ratione beatae laboriosam tempora nesciunt quo veritatis
          cum, vero ullam recusandae nam, atque tenetur ex voluptatibus porro in
          repudiandae sunt!
        </div>
      </template>
      <template #service>
        <div>
          Service Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Debitis velit ratione beatae laboriosam tempora nesciunt quo veritatis
          cum, vero ullam recusandae nam, atque tenetur ex voluptatibus porro in
          repudiandae sunt!
        </div>
      </template>
      <template #facts>
        <div>
          Facts Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Debitis velit ratione beatae laboriosam tempora nesciunt quo veritatis
          cum, vero ullam recusandae nam, atque tenetur ex voluptatibus porro in
          repudiandae sunt!
        </div>
      </template>
    </ThemeCardTabFullWidth>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const navTabs = ["about", "service", "facts"];
const navTabsFull = ["statistics", "services", "FAQ"];
</script>
<style></style>
