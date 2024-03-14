export const config = {
  sidebar: [
    {
      text: 'Overview',
      items: [
        {
          text: 'Introduction',
          link: '/docs/introduction',
        },
        {
          text: 'Getting started',
          link: '/docs/installation',
        },
        {
          text: 'Configuration',
          link: '/docs/configuration',
        },
      ],
    },
    {
      text: 'Documentation',
      items: [
        { text: 'Host settings', link: '/docs/host-settings' },
        { text: 'Subscriptions', link: '/docs/subscription' },
        { text: 'Marzban node ✨', link: '/docs/marzban-node' },
        { text: 'Telegram bot', link: '/docs/telegram-bot' },
        { text: 'Marzban script', link: '/docs/marzban-script' },
        { text: 'CLI', link: '/docs/marzban-cli' },
        { text: 'API', link: '/docs/api' },
        { text: 'Webhook', link: '/docs/webhook' },
      ],
    },
    {
      text: 'Tutorials',
      items: [
        { text: 'How to generate SSL', link: '/examples/issue-ssl-certificate' },
        { text: 'Activating SSL in Marzban', link: '/examples/marzban-ssl' },
        { text: 'Activating TLS', link: '/examples/xray-tls-inbound' },
        { text: 'REALITY guide', link: '/examples/all-on-one-port' },
        { text: 'Cloudflare Warp setup', link: '/examples/warp' },
        { text: 'Rules configuration', link: '/examples/blocking-rules' },
        { text: 'All on one port', link: '/examples/all-on-one-port' },
        { text: 'MySQL setup', link: '/examples/mysql' },
        { text: 'Backup', link: '/examples/backup' },
        { text: 'Change Xray-core', link: '/examples/change-xray-version' },
      ],
    },
  ],
  nav: [
    { text: 'Home', link: '/' },
    { text: 'Docs', link: '/docs/introduction' },
    { text: 'Examples', link: '/examples/issue-ssl-certificate' },
  ],

  footer: {
    message: 'Released under AGPL-3.0 License.',
    copyright: 'Copyright © 2023-present Gozargah',
  },
  editLink: {
    pattern: 'https://github.com/gozargah/gozargah.github.io/edit/master/marzban/en/:path',
    text: 'Edit this page on GitHub',
  },
  notFound: {
    title: 'PAGE NOT FOUND',
    quote: "But if you don't change your direction, and if you keep looking, you may end up where you are heading.",
    linkText: 'Go to docs',
    linkLabel: '/marzban/en',
  },
}

export default config
