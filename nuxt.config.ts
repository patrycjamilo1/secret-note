// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: [
    "~/assets/fonts/fonts.css",
    "~/assets/styles/main.css",
    "~/assets/styles/form.css",
  ],
  modules: ["@vesp/nuxt-fontawesome", "@formkit/auto-animate/nuxt", "@nuxt/ui", "@pinia/nuxt"],
  fontawesome: {
    icons: {
      solid: ["lock", "eye", "eye-slash", "key", "calendar"],
    },
  },
  runtimeConfig: {
    public: {
      apiUrl: "localhost:3333",
    },
  },
});
