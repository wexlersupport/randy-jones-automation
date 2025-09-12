// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@vueuse/nuxt'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/api/**': {
      cors: true
    }
  },

  compatibilityDate: '2024-07-11',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  runtimeConfig: {
    public: {
      // openrouterApiKey: process.env.NUXT_PUBLIC_OPENROUTER_API_KEY,
      // zoomAccountId: process.env.NUXT_PUBLIC_ZOOM_ACCOUNT_ID,
      // zoomClientId: process.env.NUXT_PUBLIC_ZOOM_CLIENT_ID,
      // zoomClientSecret: process.env.NUXT_PUBLIC_ZOOM_CLIENT_SECRET,
      // onedriveTenantId: process.env.NUXT_PUBLIC_ONEDRIVE_TENANT_ID,
      // onedriveAccountId: process.env.NUXT_PUBLIC_ONEDRIVE_ACCOUNT_ID,
      // onedriveClientSecret: process.env.NUXT_PUBLIC_ONEDRIVE_CLIENT_SECRET,
      // pipedriveApiKey: process.env.NUXT_PUBLIC_PIPEDRIVE_API_KEY,
    },
  }
})
