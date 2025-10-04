import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: 'Traverse',
  description: 'Solidity Analysis Tools - Visualize, test, and analyze smart contracts',
  base: '/',
  ignoreDeadLinks: true,
  srcDir: 'docs',

  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['meta', { name: 'theme-color', content: '#3c82f6' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'Traverse | Solidity Analysis Tools' }],
    ['meta', { property: 'og:site_name', content: 'Traverse' }],
    ['meta', { property: 'og:url', content: 'https://traverse.tools/' }],
    ['meta', { property: 'og:description', content: 'Professional tools for analyzing, visualizing, and testing Solidity smart contracts' }]
  ],

  themeConfig: {
    logo: {
      light: '/logo.png',
      dark: '/logo.png'
    },

    nav: [
      { text: 'Guide', link: '/installation' },
      { text: 'Tools', link: '/tools/sol2cg' },
      { text: 'Integration', link: '/integration/vscode' },
      { text: 'Examples', link: '/examples/smart-invoice' },
      { text: 'Reference', link: '/building' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is Traverse?', link: '/' },
          { text: 'Installation', link: '/installation' },
          { text: 'Quick Start', link: '/quick-start' }
        ]
      },
      {
        text: 'Tools',
        items: [
          { text: 'sol2cg - Call Graph Generator', link: '/tools/sol2cg' },
          { text: 'sol2test - Test Generator', link: '/tools/sol2test' },
          { text: 'sol-storage-analyzer', link: '/tools/sol-storage-analyzer' },
          { text: 'storage-trace', link: '/tools/storage-trace' },
          { text: 'sol2bnd - Binding Generator', link: '/tools/sol2bnd' }
        ]
      },
        {
        text: 'Integration',
        items: [
          { text: 'VS Code Extension', link: '/integration/vscode' },
          { text: 'Neovim Plugin', link: '/integration/neovim' },
          { text: 'Language Server (LSP)', link: '/integration/lsp' }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Smart Invoice Analysis', link: '/examples/smart-invoice' }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Building from Source', link: '/building' },
          { text: 'Docker Usage', link: '/docker' },
          { text: 'Contributing', link: '/contributing' },
          { text: 'License', link: '/license' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/calltrace/traverse' }
    ],

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/calltrace/traverse-docs/edit/main/:path'
    },

    footer: {
      message: 'Released under the <a href="/license">MIT License</a>. | Built with <a href="https://vitepress.dev/">VitePress</a>',
      copyright: 'Copyright © 2025 Traverse Contributors'
    }
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    codeTransformers: [
      // We use `[!!code` in demo to prevent transformation, here we revert it back.
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, '[!code')
        }
      }
    ]
  }
}))