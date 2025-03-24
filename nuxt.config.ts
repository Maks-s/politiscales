// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxt/ui-pro', '@nuxt/eslint', '@nuxtjs/i18n', '@nuxt/fonts'],

  css: ['~/assets/css/main.css'],

  icon: {
    clientBundle: {
      scan: {
        globInclude: ['app/**.vue']
      }
    }
  },
  fonts: {
    defaults: {
      weights: [400, 600],
      styles: ['normal', 'italic']
    },
    experimental: {
      processCSSVariables: true
    }
  },
  i18n: {
    bundle: {
      optimizeTranslationDirective: false
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root' // recommended
    },
    locales: [
      {
        code: 'fr',
        file: 'fr.json',
        name: 'Français',
        emoji: '🇫🇷'
      },
      {
        code: 'en',
        file: 'en.json',
        name: 'English',
        emoji: '🇬🇧'
      },
      {
        code: 'de',
        file: 'de.json',
        name: 'Deutsch',
        emoji: '🇩🇪'
      },
      {
        code: 'es',
        file: 'es.json',
        name: 'Español',
        emoji: '🇪🇸'
      },
      {
        code: 'zh',
        file: 'zh.json',
        name: '中文',
        emoji: '🇨🇳'
      },
      {
        code: 'ru',
        file: 'ru.json',
        name: 'Русский',
        emoji: '🇷🇺'
      },
      {
        code: 'it',
        file: 'it.json',
        name: 'Italiano',
        emoji: '🇮🇹'
      },
      {
        code: 'ar',
        file: 'ar.json',
        name: 'العربية',
        emoji: '🇸🇦'
      }
    ],
    lazy: true,
    defaultLocale: 'en',
    vueI18n: '~/i18n.config.ts'
  },
  future: {
    compatibilityVersion: 4
  },

  ui: {
    theme: {
      colors: [
        'primary',
        'secondary',
        'error',
        'warning',
        'strong_agree',
        'agree',
        'unsure',
        'disagree',
        'strong_disagree'
      ]
    }
  },

  compatibilityDate: '2024-11-27'
})
