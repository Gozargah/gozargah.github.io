export const config = {
  sidebar: [
    {
      text: 'مقدمه',
      items: [
        {
          text: 'معرفی مرزبان',
          link: '/docs/introduction',
        },
        {
          text: 'راه‌اندازی',
          link: '/docs/installation',
        },
        {
          text: 'پیکربندی',
          link: '/docs/configuration',
        },
      ],
    },
    {
      text: 'مستندات',
      items: [
        { text: 'تنظیمات هاست', link: '/docs/host-settings' },
        { text: 'سابسکریپشن', link: '/docs/subscription' },
        { text: 'مرزبان نود ✨', link: '/docs/marzban-node' },
        { text: 'ربات تلگرام', link: '/docs/telegram-bot'},
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
        { text: 'مهاجرت به MySQL', link: '/examples/migrate-to-mysql' },
        { text: 'بک‌آپ گرفتن', link: '/examples/backup' },
      ],
    },
  ],
  nav: [
    { text: 'خانه', link: '/' },
    { text: 'مستندات', link: '/docs/introduction' },
    { text: 'نمونه‌ها', link: '/examples/issue-ssl-certificate' },
  ],

  footer: {
    message: 'منتشر شده تحت لایسنس AGPL-3.0',
    copyright: 'توسعه داده شده در کارگروه گذرگاه',
  },
  editLink: {
    pattern: 'https://github.com/gozargah/gozargah.github.io/edit/master/marzban/fa/:path',
    text: 'ویرایش این صفحه در گیت‌هاب',
  },
  outlineTitle: 'محتوا صفحه',
  returnToTopLabel: 'برگشت به بالا',
  docFooter: {
    prev: 'صفحه قبل',
    next: 'صفحه بعد',
  },
  sidebarMenuLabel: 'منو',
}

export default config
