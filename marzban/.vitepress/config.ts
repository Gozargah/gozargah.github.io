import { DefaultTheme, LocaleSpecificConfig, defineConfig } from 'vitepress'
import englishThemeConfig from '../en/config'
import persianThemeConfig from '../fa/config'

type ThemeConfig = LocaleSpecificConfig<DefaultTheme.Config> & { label: string; link?: string }

export const BASE = '/marzban'

const persianLang: ThemeConfig = {
  label: 'فارسی',
  lang: 'fa',
  dir: 'rtl',
  title: 'مرزبان',
  description: '',
  link: '/',
  themeConfig: persianThemeConfig,
}

const englishLang: ThemeConfig = {
  title: 'Marzban',
  description: '',
  label: 'English',
  lang: 'en',
  link: '/',
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
    // root: englishLang,
    fa: {
      ...persianLang,
      link: '/fa/',
    },
    en: { ...englishLang, link: '/en/' },
  },
  themeConfig: {
    i18nRouting: true,
    logo: '/images/logo-dark.png',
    socialLinks: [{ icon: 'github', link: 'https://github.com/gozargah/marzban' }],
    search: {
      provider: 'local',
    },
  },
  sitemap: {
    hostname: 'https://gozargah.github.io',
  },
})
