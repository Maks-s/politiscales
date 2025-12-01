// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxtjs/i18n', '@nuxt/fonts'],

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
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root' // recommended
    },
    locales: [
      {
        code: 'fr',
        file: 'fr.json',
        label: 'Français',
        emoji: '🇫🇷'
      },
      {
        code: 'en',
        file: 'en.json',
        label: 'English',
        emoji: '🇬🇧'
      },
      {
        code: 'de',
        file: 'de.json',
        label: 'Deutsch',
        emoji: '🇩🇪'
      },
      {
        code: 'es',
        file: 'es.json',
        label: 'Español',
        emoji: '🇪🇸'
      },
      {
        code: 'zh',
        file: 'zh.json',
        label: '中文',
        emoji: '🇨🇳'
      },
      {
        code: 'ru',
        file: 'ru.json',
        label: 'Русский',
        emoji: '🇷🇺'
      },
      {
        code: 'it',
        file: 'it.json',
        label: 'Italiano',
        emoji: '🇮🇹'
      },
      {
        code: 'ar',
        file: 'ar.json',
        label: 'العربية',
        emoji: '🇸🇦'
      }
    ],
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

  typescript: {
    tsConfig: {
      compilerOptions: {
        strict: true
      }
    },
    nodeTsConfig: {
      compilerOptions: {
        strict: true
      }
    }
  },

  compatibilityDate: '2024-11-27'
})
