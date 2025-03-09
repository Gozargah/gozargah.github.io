import { DefaultTheme } from 'vitepress'

export const config: DefaultTheme.Config = {
  sidebar: [
    {
      text: 'Введение',
      items: [
        {
          text: 'Знакомство с Marzban',
          link: '/ru/docs/introduction',
        },
        {
          text: 'Установка',
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
        { text: 'Входящие соединения Xray', link: '/ru/docs/xray-inbounds' },
        { text: 'Настройки ядра', link: '/ru/docs/core-settings' },
        { text: 'Настройки хоста', link: '/ru/docs/host-settings' },
        { text: 'Подписка', link: '/ru/docs/subscription' },
        { text: 'Marzban-ноды ✨', link: '/ru/docs/marzban-node' },
        { text: 'Телеграм-бот', link: '/ru/docs/telegram-bot' },
        { text: 'Marzban Scrips', link: '/ru/docs/marzban-script' },
        { text: 'Командная строка (CLI)', link: '/ru/docs/marzban-cli' },
        { text: 'API', link: '/ru/docs/api' },
        { text: 'Webhook', link: '/ru/docs/webhook' },
      ],
    },
    {
      text: 'Руководства',
      items: [
        { text: 'Получение SSL-сертификата', link: '/ru/examples/issue-ssl-certificate' },
        { text: 'Включение SSL в Marzban', link: '/ru/examples/marzban-ssl' },
        { text: 'Получение Wildcard SSL', link: '/ru/examples/wildcard-ssl' },
        { text: 'Включение TLS', link: '/ru/examples/xray-tls-inbound' },
        { text: 'Настройка REALITY', link: '/ru/examples/all-on-one-port' },
        { text: 'Активация Cloudflare Warp', link: '/ru/examples/warp' },
        { text: 'Блокировка сайтов', link: '/ru/examples/blocking-rules' },
        { text: 'Всё на одном порту', link: '/ru/examples/all-on-one-port' },
        { text: 'Настройка MySQL', link: '/ru/examples/mysql' },
        { text: 'Настройка MariaDB', link: '/ru/examples/mariadb' },
        { text: 'Полезные SQL-запросы', link: '/ru/examples/mysql-queries' },
        { text: 'Создание резервных копий', link: '/ru/examples/backup' },
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
    message: 'Выпущено под лицензией AGPL-3.0',
    copyright: 'Разработано рабочей группой Gozargah',
  },
  editLink: {
    pattern: 'https://github.com/gozargah/gozargah.github.io/edit/master/marzban/:path',
    text: 'Редактировать эту страницу на GitHub',
  },
  outlineTitle: 'Содержание страницы',
  returnToTopLabel: 'Вернуться наверх',
  docFooter: {
    prev: 'Предыдущая страница',
    next: 'Следующая страница',
  },
  sidebarMenuLabel: 'Меню',
  notFound: {
    title: 'Страница не найдена',
    quote: 'Для просмотра документации вернитесь на главную страницу. Для поиска нужной информации вы можете использовать функцию поиска.',
    linkText: 'Читать документацию',
    linkLabel: '/marzban/ru',
  },
  darkModeSwitchLabel: 'Оформление',
  darkModeSwitchTitle: 'Тёмное',
  lightModeSwitchTitle: 'Светлое',
}

export default config 