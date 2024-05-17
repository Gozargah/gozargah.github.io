import { DefaultTheme } from 'vitepress'

export const config: DefaultTheme.Config = {
  sidebar: [
    {
      text: 'مقدمه',
      items: [
        {
          text: 'معرفی مرزبان',
          link: '/fa/docs/introduction',
        },
        {
          text: 'راه‌اندازی',
          link: '/fa/docs/installation',
        },
        {
          text: 'پیکربندی',
          link: '/fa/docs/configuration',
        },
      ],
    },
    {
      text: 'مستندات',
      items: [
        { text: 'تنظیمات هاست', link: '/fa/docs/host-settings' },
        { text: 'سابسکریپشن', link: '/fa/docs/subscription' },
        { text: 'مرزبان نود ✨', link: '/fa/docs/marzban-node' },
        { text: 'ربات تلگرام', link: '/fa/docs/telegram-bot' },
        { text: 'اسکریپت مرزبان', link: '/fa/docs/marzban-script' },
        { text: 'خط فرمان (CLI)', link: '/fa/docs/marzban-cli' },
        { text: 'API', link: '/fa/docs/api' },
        { text: 'Webhook', link: '/fa/docs/webhook' },
      ],
    },
    {
      text: 'آموزش‌ها',
      items: [
        { text: 'ساخت گواهی SSL', link: '/fa/examples/issue-ssl-certificate' },
        { text: 'فعال‌سازی SSL در مرزبان', link: '/fa/examples/marzban-ssl' },
        { text: 'فعال‌سازی TLS', link: '/fa/examples/xray-tls-inbound' },
        { text: 'راه‌اندازی REALITY', link: '/fa/examples/all-on-one-port' },
        { text: 'فعال‌سازی Cloudflare Warp', link: '/fa/examples/warp' },
        { text: 'مسدودسازی سایت ها', link: '/fa/examples/blocking-rules' },
        { text: 'همه چیز روی یک پورت', link: '/fa/examples/all-on-one-port' },
        { text: 'راه‌اندازی MySQL', link: '/fa/examples/mysql' },
        { text: 'کوئری های کاربردی SQL', link: '/fa/examples/mysql-queries' },
        { text: 'بک‌آپ گرفتن', link: '/fa/examples/backup' },
        { text: 'تغییر ورژن Xray-core', link: '/fa/examples/change-xray-version' },
      ],
    },
  ],
  nav: [
    { text: 'خانه', link: '/fa/' },
    { text: 'مستندات', link: '/fa/docs/introduction' },
    { text: 'نمونه‌ها', link: '/fa/examples/issue-ssl-certificate' },
  ],

  footer: {
    message: 'منتشر شده تحت لایسنس AGPL-3.0',
    copyright: 'توسعه داده شده در کارگروه گذرگاه',
  },
  editLink: {
    pattern: 'https://github.com/gozargah/gozargah.github.io/edit/master/marzban/:path',
    text: 'ویرایش این صفحه در گیت‌هاب',
  },
  outlineTitle: 'محتوا صفحه',
  returnToTopLabel: 'برگشت به بالا',
  docFooter: {
    prev: 'صفحه قبل',
    next: 'صفحه بعد',
  },
  sidebarMenuLabel: 'منو',
  notFound: {
    title: 'صفحه مورد نظر پیدا نشد',
    quote: 'برای مشاهده مستندات، به صفحه اصلی مراجعه کنید. برای پیدا کردن مطلب مورد نظر میتوانید از قابلیت جستجو استفاده کنید.',
    linkText: 'مطالعه مستندات',
    linkLabel: '/marzban/fa',
  },
  darkModeSwitchLabel: 'رنگبندی',
  darkModeSwitchTitle: 'تاریک',
  lightModeSwitchTitle: 'روشن',
}

export default config
