export const config = {
  sidebar: [
    {
      text: 'Обзор',
      items: [
        {
          text: 'Введение',
          link: '/ru/docs/introduction',
        },
        {
          text: 'Начало работы',
          link: '/ru/docs/installation',
        },
        {
          text: 'Конфигурация',
          link: '/ru/docs/configuration',
        },
      ],
    },
    {
      text: 'Документация',
      items: [
        { text: 'Xray входящих', link: '/ru/docs/xray-inbounds' },
        { text: 'Настройки хоста', link: '/ru/docs/host-settings' },
        { text: 'Подписки', link: '/ru/docs/subscription' },
        { text: 'Узел Marzban ✨', link: '/ru/docs/marzban-node' },
        { text: 'Telegram-бот', link: '/ru/docs/telegram-bot' },
        { text: 'Marzban Scrips', link: '/ru/docs/marzban-script' },
        { text: 'CLI', link: '/ru/docs/marzban-cli' },
        { text: 'API', link: '/ru/docs/api' },
        { text: 'Webhook', link: '/ru/docs/webhook' },
      ],
    },
    {
      text: 'Учебники',
      items: [
        { text: 'Как сгенерировать SSL', link: '/ru/examples/issue-ssl-certificate' },
        { text: 'Активация SSL в Marzban', link: '/ru/examples/marzban-ssl' },
        { text: 'Получение Wildcard SSL', link: '/ru/examples/wildcard-ssl' },
        { text: 'Активация TLS', link: '/ru/examples/xray-tls-inbound' },
        { text: 'Руководство REALITY', link: '/ru/examples/all-on-one-port' },
        { text: 'Настройка Cloudflare Warp', link: '/ru/examples/warp' },
        { text: 'Настройка правил', link: '/ru/examples/blocking-rules' },
        { text: 'Все на одном порту', link: '/ru/examples/all-on-one-port' },
        { text: 'Настройка MySQL', link: '/ru/examples/mysql' },
        { text: 'Практичные SQL-запросы', link: '/ru/examples/mysql-queries' },
        { text: 'Резервное копирование', link: '/ru/examples/backup' },
        { text: 'Изменение версии Xray-core', link: '/ru/examples/change-xray-version' },
      ],
    },
  ],
  nav: [
    { text: 'Главная', link: '/ru/' },
    { text: 'Документация', link: '/ru/docs/introduction' },
    { text: 'Примеры', link: '/ru/examples/issue-ssl-certificate' },
  ],

  footer: {
    message: 'Распространяется под лицензией AGPL-3.0.',
    copyright: 'Авторское право © 2023-настоящее время Gozargah',
  },
  editLink: {
    pattern: 'https://github.com/gozargah/gozargah.github.io/edit/master/marzban/ru/:path',
    text: 'Отредактировать эту страницу на GitHub',
  },
  notFound: {
    title: 'СТРАНИЦА НЕ НАЙДЕНА',
    quote: 'Но если вы не измените свое направление и продолжите искать, вы можете оказаться там, куда направляетесь.',
    linkText: 'Перейти к документации',
    linkLabel: '/marzban/en',
  },
}

export default config
