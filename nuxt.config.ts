// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui-pro',
    '@vueuse/nuxt',
    'nuxt-mongoose'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
            cssnano:
                process.env.NODE_ENV === 'production'
                    ? { preset: ['default', { discardComments: { removeAll: true } }] }
                    : false, // disable cssnano when not in production
        },
    },

  routeRules: {
    '/api/**': {
      cors: true
    }
  },

  future: {
    compatibilityVersion: 4
  },


  compatibilityDate: '2024-07-11',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
