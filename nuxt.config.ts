// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/input.css","~/assets/css/custom.css"],
  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon"],
});