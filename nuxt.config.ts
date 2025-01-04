// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: [
    "~/assets/fonts/fonts.css",
    "~/assets/styles/main.css",
    "~/assets/styles/form.css",
    'vue-toast-notification/dist/theme-default.css'
  ],
  modules: [
    "@vesp/nuxt-fontawesome",
    "@formkit/auto-animate/nuxt",
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
  ],
  fontawesome: {
    icons: {
      solid: ["lock", "eye", "eye-slash", "key", "calendar", "copy"],
    },
  },
  runtimeConfig: {
    public: {
      apiUrl: "http://localhost:3333",
      baseUrl: "http://localhost:3000",
    },
  },
  colorMode: {
    classSuffix: '',
  }
});