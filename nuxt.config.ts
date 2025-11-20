import "./shared/env";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  future: {
    compatibilityVersion: 4,
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/image",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-charts",
  ],

  css: ["~/assets/css/main.css"],

  pages: {
    pattern: ["**/*.vue", "!**/*.ts", "!**/components/*.vue"],
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
});