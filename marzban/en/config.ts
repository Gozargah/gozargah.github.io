export const config = {
  sidebar: [
    {
      text: 'Overview',
      items: [
        {
          text: 'Introduction',
          link: '/en/docs/introduction',
        },
        {
          text: 'Getting started',
          link: '/en/docs/installation',
        },
        {
          text: 'Configuration',
          link: '/en/docs/configuration',
        },
      ],
    },
    {
      text: 'Documentation',
      items: [
        { text: 'Xray Inbounds', link: '/en/docs/xray-inbounds' },    
        { text: 'Hosts', link: '/en/docs/hosts' },
        { text: 'Groups', link: '/en/docs/groups' },          
        { text: 'Templates', link: '/en/docs/templates' },  
        { text: 'Marzban node ✨', link: '/en/docs/marzban-node' },   
        { text: 'Cores', link: '/en/docs/cores' },
        { text: 'Logs', link: '/en/docs/logs' },                                
        { text: 'Admins', link: '/en/docs/admins' },  
        { text: 'Settings', link: '/en/docs/settings' },                        
        { text: 'Subscriptions', link: '/en/docs/subscription' },
        { text: 'Telegram bot', link: '/en/docs/telegram-bot' },
        { text: 'Marzban script', link: '/en/docs/marzban-script' },
        { text: 'CLI', link: '/en/docs/marzban-cli' },
        { text: 'API', link: '/en/docs/api' },
        { text: 'Webhook', link: '/en/docs/webhook' },
      ],
    },
    {
      text: 'Tutorials',
      items: [
        { text: 'How to generate SSL', link: '/en/examples/issue-ssl-certificate' },
        { text: 'Activating SSL in Marzban', link: '/en/examples/marzban-ssl' },
        { text: 'Obtain Wildcard SSL', link: '/en/examples/wildcard-ssl' },
        { text: 'Activating TLS', link: '/en/examples/xray-tls-inbound' },
        { text: 'REALITY guide', link: '/en/examples/all-on-one-port' },
        { text: 'Cloudflare Warp setup', link: '/en/examples/warp' },
        { text: 'Rules configuration', link: '/en/examples/blocking-rules' },
        { text: 'All on one port', link: '/en/examples/all-on-one-port' },
        { text: 'TimescaleDB setup', link: '/en/examples/timescaledb' }, 
        { text: 'PostgreSQL setup', link: '/en/examples/postgresql' },  
        { text: 'MySQL setup', link: '/en/examples/mysql' },
        { text: 'MariaDB setup', link: '/en/examples/mariadb' },
        { text: 'Practical SQL queries', link: '/en/examples/mysql-queries' },
        { text: 'Backup', link: '/en/examples/backup' },
        { text: 'Change Xray-core', link: '/en/examples/change-xray-version' },
      ],
    },
  ],
  nav: [
    { text: 'Home', link: '/en/' },
    { text: 'Docs', link: '/en/docs/introduction' },
    { text: 'Examples', link: '/en/examples/issue-ssl-certificate' },
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
