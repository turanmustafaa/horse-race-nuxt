// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css : ['~/assets/styles/main.scss'],
  modules: ['@pinia/nuxt','@nuxtjs/google-fonts','@nuxt/test-utils/module'],
  pinia: {
    // autoImports: ['defineStore', 'storeToRefs'] // Otomatik importlar
  },
  googleFonts: {
    families: {
      Roboto: [400, 700] // Font ağırlıklarını belirleyin
    }
  },
})
