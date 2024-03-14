export const config = {
  sidebar: [
    {
      text: 'مقدمه',
      items: [
        {
          text: 'معرفی مرزبان',
          link: '/docs/en/introduction',
        },
        {
          text: 'راه‌اندازی',
          link: '/docs/en/installation',
        },
        {
          text: 'پیکربندی',
          link: '/docs/en/configuration',
        },
      ],
    },
    {
      text: 'مستندات',
      items: [
        { text: 'تنظیمات هاست', link: '/docs/host-settings' },
        { text: 'سابسکریپشن', link: '/docs/subscription' },
        { text: 'مرزبان نود ✨', link: '/docs/marzban-node' },
        { text: 'ربات تلگرام', link: '/docs/telegram-bot' },
        { text: 'اسکریپت مرزبان', link: '/docs/marzban-script' },
        { text: 'خط فرمان (CLI)', link: '/docs/marzban-cli' },
        { text: 'API', link: '/docs/api' },
        { text: 'Webhook', link: '/docs/webhook' },
      ],
    },
    {
      text: 'آموزش‌ها',
      items: [
        { text: 'ساخت گواهی SSL', link: '/examples/issue-ssl-certificate' },
        { text: 'فعال‌سازی SSL در مرزبان', link: '/examples/marzban-ssl' },
        { text: 'فعال‌سازی TLS', link: '/examples/xray-tls-inbound' },
        { text: 'راه‌اندازی REALITY', link: '/examples/all-on-one-port' },
        { text: 'فعال‌سازی Cloudflare Warp', link: '/examples/warp' },
        { text: 'مسدودسازی سایت ها', link: '/examples/blocking-rules' },
        { text: 'همه چیز روی یک پورت', link: '/examples/all-on-one-port' },
        { text: 'راه‌اندازی MySQL', link: '/examples/mysql' },
        { text: 'بک‌آپ گرفتن', link: '/examples/backup' },
        { text: 'تغییر ورژن Xray-core', link: '/examples/change-xray-version' },
      ],
    },
  ],

  outlineTitle: 'محتوا صفحه',
  returnToTopLabel: 'برگشت به بالا',
  docFooter: {
    prev: 'صفحه قبل',
    next: 'صفحه بعد',
  },
  sidebarMenuLabel: 'منو',

  nav: [
    { text: 'Home', link: '/en/' },
    { text: 'Documentation', link: '/en/docs/' },
    { text: 'Examples', link: '/en/examples/' },
  ],

  footer: {
    message: 'Released under AGPL-3.0 License.',
    copyright: 'Copyright © 2023-present Gozargah',
  },
  editLink: {
    pattern: 'https://github.com/gozargah/gozargah.github.io/edit/master/marzban/:path',
    text: 'Edit this page on GitHub',
  },
}

export default config
