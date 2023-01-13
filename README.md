<br>

<div align="center">
<img width="456" src="https://raw.githubusercontent.com/wayofdev/next-starter-tpl/master/assets/logo.gh-light-mode-only.png#gh-light-mode-only">
<img width="456" src="https://raw.githubusercontent.com/wayofdev/next-starter-tpl/master/assets/logo.gh-dark-mode-only.png#gh-dark-mode-only">
</div>
<br>

<br>

<div align="center">
<a href="https://next-starter-tpl-docs.wayof.dev"><b>View Documentation / Demo</b></a>
</div>

<div align="center">
<a href="https://actions-badge.atrox.dev/wayofdev/next-starter-tpl/goto"><img alt="Build Status" src="https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fwayofdev%2Fnext-starter-tpl%2Fbadge&style=flat-square"/></a>
<a href="https://github.com/wayofdev/next-starter-tpl/tags"><img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/wayofdev/next-starter-tpl?style=flat-square"></a>
<a href="LICENSE.md"><img src="https://img.shields.io/github/license/wayofdev/next-starter-tpl.svg?style=flat-square&color=blue" alt="Software License"/></a>
<a href="#"><img alt="Commits since latest release" src="https://img.shields.io/github/commits-since/wayofdev/next-starter-tpl/latest?style=flat-square"></a>
<a href="https://codeclimate.com/github/wayofdev/next-starter-tpl"><img alt="Code Climate maintainability" src="https://img.shields.io/codeclimate/maintainability/wayofdev/next-starter-tpl?style=flat-square"></a>
<a href="https://codeclimate.com/github/wayofdev/next-starter-tpl/issues"><img alt="Code Climate issues" src="https://img.shields.io/codeclimate/issues/wayofdev/next-starter-tpl?style=flat-square"></a>
<a href="https://codeclimate.com/github/wayofdev/next-starter-tpl"><img alt="Code Climate technical debt" src="https://img.shields.io/codeclimate/tech-debt/wayofdev/next-starter-tpl?style=flat-square"></a>
  <a href="https://codeclimate.com/github/wayofdev/next-starter-tpl"><img alt="Code Climate coverage" src="https://img.shields.io/codeclimate/coverage/wayofdev/next-starter-tpl?style=flat-square"></a>
</div>
<br>

# NextJS Starter Template

## 📄 About

This repository contains a [monorepo](https://turbo.build/repo/docs/handbook/what-is-a-monorepo) boilerplate written in [Next.js](https://nextjs.org/), managed by the [pnpm](https://pnpm.io) package manager.

You can use it with the backend template, written in Laravel — [laravel-starter-tpl](https://github.com/wayofdev/laravel-starter-tpl).

### → Purpose

- Establish a **structure** and present a lifecycle perspective (dx, ci/cd, deployments);
- Show how to create and consume shared packages, locales, assets, and API types;
- Ship fully configured repository with integrated **tools & configs**, like tsconfig, eslint, jest, cypress, tailwind, changelogs, versioning, codecov, codeclimate, sentry, and others;
- Clarify some **advantages** of monorepo (team cohesion, consistency, duplication, refactorings, atomic commits)

<br>

## 🤔 What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### → Structure

```bash
.
├── apps
│   ├── web    (nextjs app - i18n, ssr, api, jest, cypress)
│   └── docs   (nextra app)
└── packages
    ├── common-i18n          (locales...)
    ├── jest-config          (shared jest configs)
    ├── eslint-config-custom (shared eslint configs)
    └── ui                   (react stub components)
```

### → Apps

- `docs`: a [Nextra](https://nextra.site/) documentation template generated from [Nextra: Docs Starter Kit](https://vercel.com/templates/next.js/documentation-starter-kit)
  - [DEMO docs app](https://next-starter-tpl-docs.vercel.app/)
- `web`: [Next.js](https://nextjs.org/) app with tailwindcss and sentry support

  - [DEMO web app](https://next-starter-tpl-web.vercel.app/)

- `ui`: a stub React component library shared by the `web` application

> **Note:** Apps should not depend on apps, they can depend on packages

### → Packages

- `common-i18n`: locales for multi-language support
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `jest-config`: [JestJS](https://jestjs.io) configs used across the monorepo

> **Note:** Apps can depend on packages, packages can depend on each others

<br>

### → Utilities and Features

This repository has some additional tools already setup for you:

- Supporting [NextJS 13.1.1+](https://nextjs.org/blog/next-13)
- [TypeScript](https://www.typescriptlang.org/) support for static type checking
- Strict Mode for TypeScript and React 18
- [ESLint](https://eslint.org/) for code linting and configured presets: NextJS Recommended, NextJS Core Web Vitals and [Airbnb Style Guide](https://www.npmjs.com/package/eslint-config-airbnb)
- Code formatting with [Prettier](https://prettier.io/)
- Integrated with [Tailwind CSS](https://tailwindcss.com/)
- [PostCSS](https://postcss.org/) for processing Tailwind CSS and [CSSNANO](https://cssnano.co/) for CSS optimization on production systems
- [Husky](https://typicode.github.io/husky/#/) for modern native git hooks
- [Lint-staged](https://github.com/okonet/lint-staged) for running linters on Git staged files
- [GitHub Actions](https://github.com/features/actions) support out of the box
- SEO metadata, JSON-LD and Open Graph tags with [Next SEO](https://github.com/garmeeh/next-seo)
- Sitemap support using [next-sitemap](https://www.npmjs.com/package/next-sitemap)
- [Bundler Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) — Visualize size of webpack output files with an interactive zoomable treemap
- Optimized [Lighthouse](https://web.dev/performance-scoring/) performance score
- End-2-end testing with [cypress](https://www.cypress.io/) and [JestJS](https://jestjs.io/) support for writing unit tests
- Package auto-update in all workspace projects using [npm-check-updates](https://www.npmjs.com/package/npm-check-updates)
- Keep package.json sorted using [sort-package-json](https://www.npmjs.com/package/sort-package-json)
- Client and server side [error reporting](https://sentry.io/) supported by [@sentry/nextjs](https://www.npmjs.com/package/@sentry/nextjs)

<br>

## 🚩 Requirements

- **macOS** Monterey+ or **Linux**
- **Docker** 20.10 or newer
  - [How To Install and Use Docker on Ubuntu 22.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-22-04)
- **Cloned, configured and running** [docker-shared-services](https://github.com/wayofdev/docker-shared-services), to support system wide DNS, Routing and TLS support via Traefik.

<br>

## 💿 Installation and Usage

> Warning: Repository with [docker-shared-services](https://github.com/wayofdev/docker-shared-services) should be configured, up and running, to ensure system wide TLS and DNS support.

**[Follow getting-started guide in documentation](https://next-starter-tpl-docs.wayof.dev/guide/getting-started)** 🔗

<br>

## 🤝 License

[![Licence](https://img.shields.io/github/license/wayofdev/next-starter-tpl?style=for-the-badge&color=blue)](./LICENSE)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fwayofdev%2Fnext-starter-tpl.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fwayofdev%2Fnext-starter-tpl?ref=badge_large)

<br>

## 🧱 Credits and Useful Resources

Based on [nextjs-monorepo-example](https://github.com/belgattitude/nextjs-monorepo-example) template from [belgattitude](https://github.com/belgattitude).

- Check his benchmark on package managers — [belgattitude/compare-package-managers](https://github.com/belgattitude/compare-package-managers)

Learn more about the power of **Turborepo**:

- [What is Monorepo?](https://turbo.build/repo/docs/handbook/what-is-a-monorepo)
- [Pipelines](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

Other monorepo templates:

- [waldronmatt/pnpm-turborepo-auto-boilerplate](https://github.com/waldronmatt/pnpm-turborepo-auto-boilerplate) — a monorepo boilerplate using pnpm, turborepo, and auto.
- [mkosir/turborepo-boilerplate](https://github.com/mkosir/turborepo-boilerplate) — frontend turborepo boilerplate
- [vercel/turbo](https://github.com/vercel/turbo/tree/main/examples) — turborepo examples from Vercel
- [nextauthjs/next-auth](https://github.com/nextauthjs/next-auth) — Authentication package, built as monorepo; real life example

Other projects:

- [ixartz/next-js-boilerplate](https://github.com/ixartz/Next-js-Boilerplate)
- [Lots of the latest examples](https://github.com/vercel/next.js/tree/canary/examples) for NextJS from Vercel

<br>

## 🙆🏼‍♂️ Author Information

This repository was created in **2022** by [lotyp / wayofdev](https://github.com/wayofdev).

<br>

## 🫡 Contributors

<img align="left" src="https://img.shields.io/github/contributors-anon/wayofdev/next-starter-tpl?style=for-the-badge" alt="Contributors"/>

<a href="https://github.com/wayofdev/next-starter-tpl/graphs/contributors">
  <img src="https://opencollective.com/wod/contributors.svg?width=890&button=false" alt="Contributors">
</a>

<br>

## 🤑 Sponsors

<table>
  <tbody>
    <tr>
      <td align="center" valign="top">
        <a href="https://prisma.io" target="_blank">
          <img width="128px" src="https://avatars.githubusercontent.com/u/110109081?s=200&v=4" alt="Reproto Logo" /></a><br />
        <div>Reproto</div><br />
        <sub>🎖️ Financial Support</sub>
      </td>
      <td align="center" valign="top">
        <a href="https://varsitybase.com" target="_blank">
          <img width="128px" src="https://raw.githubusercontent.com/wayofdev/next-starter-tpl/master/assets/vb-logo.png" alt="VarsityBase Logo" /></a><br />
        <div>VarsityBase</div><br />
        <sub>🎖️ Financial Support</sub>
      </td>
      <td align="center" valign="top">
        <a href="https://vercel.com" target="_blank">
          <img width="128px" src="https://avatars.githubusercontent.com/u/14985020?s=200&v=4" alt="Vercel Logo" /></a><br />
        <div>Vercel</div><br />
        <sub>☁️ Infrastructure Support</sub>
      </td>
      <td align="center" valign="top">
        <a href="https://sentry.io" target="_blank">
          <img width="128px" src="https://avatars.githubusercontent.com/u/1396951?s=200&v=4" alt="Sentry Logo" /></a><br />
        <div>Sentry</div><br />
        <sub>☁️ Infrastructure Support</sub>
      </td>
			<td align="center" valign="top">
        <a href="https://zenhub.com" target="_blank">
          <img width="128px" src="https://avatars.githubusercontent.com/ml/9?s=200&v=4" alt="ZenHub Logo" /></a><br />
        <div>ZenHub</div><br />
        <sub>☁️ Infrastructure Support</sub>
      </td>
    </tr><tr></tr>
  </tbody>
</table>
