import { defineConfig } from 'vitepress'
import englishThemeConfig from '../en/config'
import persianThemeConfig from '../fa/config'

export const BASE = '/marzban'

const persianLang = {
  label: 'فارسی',
  lang: 'fa',
  dir: 'rtl',
  title: 'مرزبان',
  description: '',
  link: '/',
  themeConfig: persianThemeConfig,
}

const englishLang = {
  title: 'Marzban',
  description: '',
  label: 'English',
  lang: 'en',
  link: '/en/',
  themeConfig: englishThemeConfig,
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Marzban',
  description: 'Unified Censorship Resistant Solution',
  base: BASE,
  cleanUrls: true,
  lang: 'fa',
  locales: {
    root: persianLang,
    fa: {
      ...persianLang,
      link: '/fa/',
    },
    en: englishLang,
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    i18nRouting: true,
    logo: '/images/logo-dark.png',
    socialLinks: [{ icon: 'github', link: 'https://github.com/gozargah/marzban' }],
  },
})
