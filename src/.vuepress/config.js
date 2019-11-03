const title = 'Airsonic'
const description = 'Airsonic, an Open Source media server, providing ubiquitous access to your music.'
const websiteUrl = 'https://airsonic.github.io'

module.exports = {
  dest: '../dist',
  plugins: [
    '@vuepress/active-header-links',
    '@vuepress/back-to-top',
    '@vuepress/last-updated',
    '@vuepress/medium-zoom',
    '@vuepress/plugin-search'
  ],

  title: title,
  description: description,
  head: [
    ['meta', { name: 'identifier-url', content: websiteUrl }],
    ['meta', { name: 'title', content: title }],
    ['meta', { name: 'description', content: description }],
    ['meta', { name: 'abstract', content: title }],
    ['meta', { name: 'language', content: 'en' }],
    ['meta', { name: 'theme-color', content: '#1a222c' }],
    ['meta', { name: 'og:title', content: title }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:url', content: websiteUrl }],
    ['meta', { name: 'og:image', content: '/favicon-200x200.png' }],
    ['meta', { name: 'og:description', content: description }]
  ],

  markdown: {
    lineNumbers: true,
    extendMarkdown: md => {
      md.use(require('markdown-it-vuepress-code-snippet-enhanced'))
    }
  },

  themeConfig: {
    repo: 'airsonic/airsonic',
    repoLabel: 'Contribute',
    docsRepo: 'airsonic/airsonic.github.io',
    docsDir: 'src',
    editLinks: true,
    editLinkText: 'Help us improve this page!',
    smoothScroll: true,

    logo: '/images/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs/' },
      { text: 'More', items: [
        { text: 'Demo', link: '/demo/' },
        { text: 'Community', link: '/community/' },
        { text: 'API', link: '/docs/api/' }
      ]},
      { text: 'Issues', link: 'https://github.com/airsonic/airsonic/issues' }
    ],

    sidebar: 'auto',
    sidebarDepth: 2,

    searchPlaceholder: 'Search...'
  }
}
