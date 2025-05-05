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
    routeRules: {
        '/api/**': {
            cors: true
        }
    },
    app: {
        head: {
            title: 'Servidiap | System',
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
