import type { DocsThemeConfig } from 'nextra-theme-docs'
import React from 'react'

const config: DocsThemeConfig = {
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
    extraContent: <img src="#" alt="" />,
    float: true,
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – WoD',
    }
  },
}

export default config
