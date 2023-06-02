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
          link: '/docs/quick-start',
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
        { text: 'تنظیمات هاست', link: '' },
        { text: 'سابسکریپشن', link: '' },
        { text: 'مرزبان نود ✨', link: '' },
        { text: 'اسکریپت مرزبان', link: '/docs/marzban-script' },
        { text: 'خط فرمان (CLI)', link: '' },
      ],
    },
    {
      text: 'آموزش‌ها',
      items: [
        { text: 'فعالسازی SSL برای داشبورد', link: '' },
        { text: 'ریالیتی - Reality', link: '' },
      ],
    },
  ],
  nav: [
    { text: 'خانه', link: '/' },
    { text: 'مستندات', link: '/introduction' },
    { text: 'نمونه‌ها', link: '/examples' },
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
