import type { DocsThemeConfig } from 'nextra-theme-docs'
import { Fragment } from 'react'

const config: DocsThemeConfig = {
  i18n: [{ locale: 'en-US', text: 'English' }],
  logo: <span>NextJS-Starter-Tpl</span>,
  project: {
    link: 'https://github.com/wayofdev/next-starter-tpl',
  },
  chat: {
    link: 'https://discord.com',
  },
  docsRepositoryBase: 'https://github.com/wayofdev/next-starter-tpl',
  footer: {
    text: 'NextJS Starter Tpl',
  },
  toc: {
    extraContent: <Fragment />,
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – WoD',
    }
  },
}

export default config
