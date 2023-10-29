import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Ellert',
  base: '/',
  description: 'Node.js Event Store on top of Postgres',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting started', link: '/getting-started' }
    ],

    sidebar: [
      {
        text: 'Docs',
        items: [{ text: 'Getting started', link: '/getting-started' }]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ellert-store/ellert' },
      { icon: 'discord', link: 'https://discord.gg/pR6duvNHtV' }
    ]
  }
})
