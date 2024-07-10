<template>
  <div class="grid grid-cols-2 gap-6">
    <ThemeCardDefault class="col-span-2">
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
    <div>
      <h5 class="text-xl font-bold mb-1">Card With Tabs</h5>
      <ThemeCardWithNavTabs :nav="navTabs">
        <template #about>
          <div>
            About Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Debitis velit ratione beatae laboriosam tempora nesciunt quo
            veritatis cum, vero ullam recusandae nam, atque tenetur ex
            voluptatibus porro in repudiandae sunt!
          </div>
        </template>
        <template #service>
          <div>
            Service Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Debitis velit ratione beatae laboriosam tempora nesciunt quo
            veritatis cum, vero ullam recusandae nam, atque tenetur ex
            voluptatibus porro in repudiandae sunt!
          </div>
        </template>
        <template #facts>
          <div>
            Facts Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Debitis velit ratione beatae laboriosam tempora nesciunt quo
            veritatis cum, vero ullam recusandae nam, atque tenetur ex
            voluptatibus porro in repudiandae sunt!
          </div>
        </template>
      </ThemeCardWithNavTabs>
    </div>
    <div>
      <h5 class="text-xl font-bold mb-1">Card Full With Tabs</h5>
      <ThemeCardTabFullWidth :nav="navTabsFull">
        <template #statistics>
          <div>
            statistics Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Debitis velit ratione beatae laboriosam tempora nesciunt quo
            veritatis cum, vero ullam recusandae nam, atque tenetur ex
            voluptatibus porro in repudiandae sunt!
          </div>
        </template>
        <template #services>
          <div>
            services Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Debitis velit ratione beatae laboriosam tempora nesciunt quo
            veritatis cum, vero ullam recusandae nam, atque tenetur ex
            voluptatibus porro in repudiandae sunt!
          </div>
        </template>
        <template #FAQ>
          <div>
            FAQ Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Debitis velit ratione beatae laboriosam tempora nesciunt quo
            veritatis cum, vero ullam recusandae nam, atque tenetur ex
            voluptatibus porro in repudiandae sunt!
          </div>
        </template>
      </ThemeCardTabFullWidth>
    </div>
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
