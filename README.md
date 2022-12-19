<br>

<div align="center">
<img width="456" src="https://raw.githubusercontent.com/wayofdev/next-starter-tpl/master/assets/logo.gh-light-mode-only.png#gh-light-mode-only">
<img width="456" src="https://raw.githubusercontent.com/wayofdev/next-starter-tpl/master/assets/logo.gh-dark-mode-only.png#gh-dark-mode-only">
</div>

<br>

<br>

<div align="center">
<a href="https://actions-badge.atrox.dev/wayofdev/nextjs-starter-tpl/goto"><img alt="Build Status" src="https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fwayofdev%2Fnextjs-starter-tpl%2Fbadge&style=flat-square"/></a>
<a href="https://github.com/wayofdev/nextjs-starter-tpl/tags"><img src="https://img.shields.io/github/v/tag/wayofdev/nextjs-starter-tpl?sort=semver&style=flat-square" alt="Latest Version"></a>
<a href="LICENSE.md"><img src="https://img.shields.io/github/license/wayofdev/nextjs-starter-tpl.svg?style=flat-square&color=blue" alt="Software License"/></a>
<a href="#"><img alt="Commits since latest release" src="https://img.shields.io/github/commits-since/wayofdev/nextjs-starter-tpl/latest?style=flat-square"></a>
</div>

<br>

# NextJS Starter Template

This repository contains [monorepo](https://turbo.build/repo/docs/handbook/what-is-a-monorepo) boilerplate written in [Next.js](https://nextjs.org). Used together with backend API part — [laravel-starter-tpl](https://github.com/wayofdev/laravel-starter-tpl).

<br>

## 🤔 What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### → Apps and Packages

-   `docs`: a [Next.js](https://nextjs.org/) app
-   `web`: another [Next.js](https://nextjs.org/) app
-   `ui`: a stub React component library shared by both `web` and `docs` applications
-   `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
-   `tsconfig`: `tsconfig.json`s used throughout the monorepo
-   Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

<br>

### → Utilities and Features

This repository has some additional tools already setup for you:

-   Supporting [NextJS 13.x](https://nextjs.org/blog/next-13)
-   [TypeScript](https://www.typescriptlang.org/) support for static type checking
-   Strict Mode for TypeScript and React 18
-   [ESLint](https://eslint.org/) for code linting and configured presets: NextJS Recommended, NextJS Core Web Vitals and [Airbnb Style Guide](https://www.npmjs.com/package/eslint-config-airbnb)
-   Code formatting with [Prettier](https://prettier.io/)
-   Integrated with [Tailwind CSS](https://tailwindcss.com/)
-   [PostCSS](https://postcss.org/) for processing Tailwind CSS and [CSSNANO](https://cssnano.co/) for CSS optimization on production systems
-   [Husky](https://typicode.github.io/husky/#/) for modern native git hooks
-   [Lint-staged](https://github.com/okonet/lint-staged) for running linters on Git staged files
-   [GitHub Actions](https://github.com/features/actions) support out of the box
-   SEO metadata, JSON-LD and Open Graph tags with [Next SEO](https://github.com/garmeeh/next-seo)
-   Sitemap support using [next-sitemap](https://www.npmjs.com/package/next-sitemap)
-   [Bundler Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) — Visualize size of webpack output files with an interactive zoomable treemap
-   Optimized [Lighthouse](https://web.dev/performance-scoring/) performance score
-   End-2-end testing with [cypress](https://www.cypress.io/) and [JestJS](https://jestjs.io/) support for writing unit tests

<br>

## 📑 Requirements

-   **macOS** Monterey or **Linux**
-   **Docker** 20.10 or newer
-   [How To Install and Use Docker on Ubuntu 22.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-22-04)
-   **Cloned, configured and running** [docker-shared-services](https://github.com/wayofdev/docker-shared-services), to support system wide DNS, Routing and TLS support via Traefik.

<br>

## 💿 Installation

> Warning: Repository with [docker-shared-services](https://github.com/wayofdev/docker-shared-services) should be configured, up and running, to ensure system wide TLS and DNS support.

### → Instructions

-   First, setup, for this repository, compatible backend by following instructions in [laravel-starter-tpl](https://github.com/wayofdev/laravel-starter-tpl)

-   After backend is set up done, clone this repository:

    ```bash
    git@github.com:wayofdev/nextjs-starter-tpl.git
    ```

-   Create `.env` file:

    ```bash
    $ make env \
     APP_NAME=tpl \
     SYSTEM_SERVICES_NAMESPACE=ss \
     PROJECT_SERVICES_NAMESPACE=wod
    ```

-   Build, install and run application:

    ```bash
    make
    ```

-   Now, project is running, and, if default settings were used, available at [https://tpl.wod.docker](https://tpl.wod.docker)

<br>

## 💻 Usage

### → Build

To build all apps and packages, run the following command:

```bash
# with makefile, through Docker
$ make build

# or, directly, without docker, using system binaries
$ pnpm run build
```

<br>

### → Develop

To develop all apps and packages, run the following command:

```bash
# with makefile, through Docker
$ make up

# or, directly, without docker, using system binaries
$ pnpm run dev
```

<br>

### → Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```bash
# with makefile
$ make turbo-login

# directly
$ pnpm dlx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```bash
# with makefile
$ make turbo-link

# directly
$ pnpm dlx turbo link
```

<br>

## 🧪 Testing

You can check `Makefile` or `package.json` to get full list of commands for local testing. For testing, you can use these commands to test:

```bash
make test
```

<br>

## 🤝 License

[![Licence](https://img.shields.io/github/license/wayofdev/nextjs-starter-tpl?style=for-the-badge&color=blue)](./LICENSE)

<br>

## 🧱 Useful Resources

Learn more about the power of **Turborepo**:

-   [What is Monorepo?](https://turbo.build/repo/docs/handbook/what-is-a-monorepo)
-   [Pipelines](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
-   [Caching](https://turbo.build/repo/docs/core-concepts/caching)
-   [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
-   [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
-   [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
-   [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

Other monorepo templates:

- [waldronmatt/pnpm-turborepo-auto-boilerplate](https://github.com/waldronmatt/pnpm-turborepo-auto-boilerplate) — a monorepo boilerplate using pnpm, turborepo, and auto.

Other projects:

- [ixartz/next-js-boilerplate](https://github.com/ixartz/Next-js-Boilerplate)

-   [laravel/breeze-next](https://github.com/laravel/breeze-next)

<br>

## 🙆🏼‍♂️ Author Information

This repository was created in **2022** by [lotyp / wayofdev](https://github.com/wayofdev).

<br>

## 🫡 Contributors

<img align="left" src="https://img.shields.io/github/contributors-anon/wayofdev/next-starter-tpl?style=for-the-badge" alt="Contributors"/>

<a href="https://github.com/wayofdev/docker-nginx/graphs/contributors">
  <img src="https://opencollective.com/wod/contributors.svg?width=890&button=false" alt="Contributors">
</a>

<br>
