// @ts-check

/**
 * This file sets a custom webpack configuration to use your Next.js app
 * with Sentry.
 * @link https://nextjs.org/docs/api-reference/next.config.js/introduction
 * @link https://docs.sentry.io/platforms/javascript/guides/nextjs/
 * @link https://github.com/vercel/next.js/tree/canary/examples/with-sentry
 *
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import withBundleAnalyzer from '@next/bundle-analyzer'
import { withSentryConfig } from '@sentry/nextjs' // https://docs.sentry.io/platforms/javascript/guides/nextjs/
import { createSecureHeaders } from 'next-secure-headers'
import pc from 'picocolors'
import nextI18nConfig from './next-i18next.config.mjs'
import { getValidatedServerEnv } from './src/config/validated-server-env.mjs'

// validate server env
getValidatedServerEnv()

const workspaceRoot = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..', '..')

/**
 * Once supported replace by node / eslint / ts and out of experimental, replace by
 * `import packageJson from './package.json' assert { type: 'json' };`
 * @type {import('type-fest').PackageJson}
 */
const packageJson = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url)).toString('utf-8')
)

const trueEnv = ['true', '1', 'yes']
const isProd = process.env.NODE_ENV === 'production'
const isCI = trueEnv.includes(process.env?.CI ?? 'false')
const enableCSP = true

const NEXT_STANDALONE_BUILD = trueEnv.includes(process.env?.NEXT_STANDALONE_BUILD ?? 'false')
const NEXT_IGNORE_TYPE_CHECK = trueEnv.includes(process.env?.NEXT_IGNORE_TYPE_CHECK ?? 'false')
const NEXT_IGNORE_ESLINT = trueEnv.includes(process.env?.NEXT_IGNORE_ESLINT ?? 'false')
const SENTRY_UPLOAD_DRY_RUN = trueEnv.includes(process.env?.SENTRY_UPLOAD_DRY_RUN ?? 'false')
const DISABLE_SENTRY = trueEnv.includes(process.env?.DISABLE_SENTRY ?? 'false')
const SENTRY_DEBUG = trueEnv.includes(process.env?.SENTRY_DEBUG ?? 'false')
const SENTRY_TRACING = trueEnv.includes(process.env?.SENTRY_TRACING ?? 'false')

/**
 * A way to allow CI optimization when the build done there is not used
 * to deliver an image or deploy the files.
 * @link https://nextjs.org/docs/advanced-features/source-maps
 */
const disableSourceMaps = trueEnv.includes(process.env?.NEXT_DISABLE_SOURCEMAPS ?? 'false')

if (disableSourceMaps) {
  console.log(
    `${pc.green(
      'notice'
    )}- Sourcemaps generation have been disabled through NEXT_DISABLE_SOURCEMAPS`
  )
}

// @link https://github.com/jagaapple/next-secure-headers
const secureHeaders = createSecureHeaders({
  contentSecurityPolicy: {
    directives: enableCSP
      ? {
          defaultSrc: "'self'",
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            'https://unpkg.com/@graphql-yoga/graphiql/dist/style.css',
            'https://meet.jitsi.si',
            'https://8x8.vc',
          ],
          scriptSrc: [
            "'self'",
            "'unsafe-eval'",
            "'unsafe-inline'",
            'https://unpkg.com/@graphql-yoga/graphiql',
            // 'https://meet.jit.si/external_api.js',
            // 'https://8x8.vc/external_api.js',
          ],
          frameSrc: [
            "'self'",
            // 'https://meet.jit.si',
            // 'https://8x8.vc',
          ],
          connectSrc: [
            "'self'",
            'https://vitals.vercel-insights.com',
            'https://*.sentry.io',
            // 'wss://ws.pusherapp.com',
            // 'wss://ws-eu.pusher.com',
            // 'https://sockjs.pusher.com',
            // 'https://sockjs-eu.pusher.com',
          ],
          imgSrc: ["'self'", 'https:', 'http:', 'data:'],
          workerSrc: ['blob:'],
        }
      : {},
  },
  ...(enableCSP && process.env.NODE_ENV === 'production'
    ? {
        forceHTTPSRedirect: [true, { maxAge: 60 * 60 * 24 * 4, includeSubDomains: true }],
      }
    : {}),
  referrerPolicy: 'same-origin',
})

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: !disableSourceMaps,
  i18n: nextI18nConfig.i18n,
  optimizeFonts: true,

  httpAgentOptions: {
    // @link https://nextjs.org/blog/next-11-1#builds--data-fetching
    keepAlive: true,
  },

  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: (isCI ? 3600 : 25) * 1000,
  },

  // @link https://nextjs.org/docs/advanced-features/compiler#minification
  // Sometimes buggy so enable/disable when debugging.
  swcMinify: true,

  compiler: {
    // emotion: true,
  },

  sentry: {
    hideSourceMaps: true,
    // To disable the automatic instrumentation of API route handlers and server-side data fetching functions
    // In other words, disable if you prefer to explicitly handle sentry per api routes (ie: wrapApiHandlerWithSentry)
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#configure-server-side-auto-instrumentation
    autoInstrumentServerFunctions: false,
  },

  // @link https://nextjs.org/docs/basic-features/image-optimization
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    formats: ['image/webp'],
    loader: 'default',
    dangerouslyAllowSVG: false,
    disableStaticImages: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
    unoptimized: false,
  },

  // Packages to be transpiled part of nextjs build to follow nextjs/browserslist compatibility.
  // This replaces next-transpile-modules starting from nextjs 13.1, if you're relying on css
  transpilePackages: isProd ? ['ky', '@wayofdev/ui'] : [],

  // Standalone build
  // @link https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files-experimental
  ...(NEXT_STANDALONE_BUILD ? { output: 'standalone', outputFileTracing: true } : {}),

  experimental: {
    // @link https://nextjs.org/docs/advanced-features/output-file-tracing#caveats
    ...(NEXT_STANDALONE_BUILD ? { outputFileTracingRoot: workspaceRoot } : {}),

    // Useful in conjunction with to `output: 'standalone'` and `outputFileTracing: true`
    // to keep lambdas sizes / docker images low when vercel/nft isn't able to
    // drop unneeded deps for you. ie: esbuil-musl, swc-musl... when not actually needed
    //
    // Note that yarn 3+/4 is less impacted thanks to supportedArchitectures.
    // See https://yarnpkg.com/configuration/yarnrc#supportedArchitectures and
    // config example in https://github.com/belgattitude/nextjs-monorepo-example/pull/3582
    // NPM/PNPM might adopt https://github.com/npm/rfcs/pull/519 in the future.
    //
    // Caution: use it with care because you'll have to maintain this over time.
    //
    // How to debug in vercel: set NEXT_DEBUG_FUNCTION_SIZE=1 in vercel env, then
    // check the last lines of vercel build.
    //
    // Related issue: https://github.com/vercel/next.js/issues/42641

    // Caution if using pnpm you might also need to consider that things are hoisted
    // under node_modules/.pnpm/<something variable>. Depends on version
    //
    // outputFileTracingExcludes: {
    //  '*': [
    //    '**/node_modules/@swc/core-linux-x64-gnu/**/*',
    //    '**/node_modules/@swc/core-linux-x64-musl/**/*',
    //    // If you're nor relying on mdx-remote... drop this
    //    '**/node_modules/esbuild/linux/**/*',
    //    '**/node_modules/webpack/**/*',
    //    '**/node_modules/terser/**/*',
    //    // If you're not relying on sentry edge or any weird stuff... drop this too
    //    // https://github.com/getsentry/sentry-javascript/pull/6982
    //    '**/node_modules/rollup/**/*',
    //  ],
    // },

    // Prefer loading of ES Modules over CommonJS
    // @link {https://nextjs.org/blog/next-11-1#es-modules-support|Blog 11.1.0}
    // @link {https://github.com/vercel/next.js/discussions/27876|Discussion}
    esmExternals: true,
    // Experimental monorepo support
    // @link {https://github.com/vercel/next.js/pull/22867|Original PR}
    // @link {https://github.com/vercel/next.js/discussions/26420|Discussion}
    externalDir: true,
  },

  typescript: {
    ignoreBuildErrors: NEXT_IGNORE_TYPE_CHECK,
  },

  eslint: {
    ignoreDuringBuilds: NEXT_IGNORE_ESLINT,
    // dirs: [`${__dirname}/src`],
  },

  async headers() {
    return [
      {
        // All page routes, not the api ones
        source: '/:path((?!api).*)*',
        headers: [
          ...secureHeaders,
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'same-origin' },
        ],
      },
    ]
  },

  // @link https://nextjs.org/docs/api-reference/next.config.js/rewrites
  async rewrites() {
    return [
      /*
      {
        source: `/about-us`,
        destination: '/about',
      },
      */
    ]
  },

  webpack: (config, { webpack, isServer }) => {
    if (!isServer) {
      // Fixes npm packages that depend on `fs` module
      // @link https://github.com/vercel/next.js/issues/36514#issuecomment-1112074589
      config.resolve.fallback = { ...config.resolve.fallback, fs: false }
    }

    // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/tree-shaking/
    config.plugins.push(
      new webpack.DefinePlugin({
        __SENTRY_DEBUG__: SENTRY_DEBUG,
        __SENTRY_TRACING__: SENTRY_TRACING,
      })
    )

    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|ts)x?$/,
      use: [
        {
          loader: '@svgr/webpack',
          // https://react-svgr.com/docs/webpack/#passing-options
          options: {
            svgo: isProd,
            // @link https://github.com/svg/svgo#configuration
            svgoConfig: {
              multipass: false,
              datauri: 'base64',
              js2svg: {
                indent: 2,
                pretty: false,
              },
            },
          },
        },
      ],
    })

    return config
  },
  env: {
    APP_NAME: process.env.APP_NAME ?? 'APP_NAME-ENV-not-found',
    APP_VERSION: packageJson.version ?? 'not-in-package.json',
    BUILD_TIME: new Date().toISOString(),
  },
}

let config = nextConfig

if (!DISABLE_SENTRY) {
  // @ts-ignore cause sentry is not always following nextjs types
  config = withSentryConfig(config, {
    // Additional config options for the Sentry Webpack plugin. Keep in mind that
    // the following options are set automatically, and overriding them is not
    // recommended:
    //   release, url, org, project, authToken, configFile, stripPrefix,
    //   urlPrefix, include, ignore
    // For all available options, see:
    // @link https://github.com/getsentry/sentry-webpack-plugin#options.

    // Attempts a dry run (useful for dev environments).
    // Defaults to false, but may be automatically set to true in development environments
    // by some framework integrations (Next.JS, possibly others).
    dryRun: SENTRY_UPLOAD_DRY_RUN,

    // Suppresses all logs (useful for --json option). Defaults to false.
    silent: isProd,
  })
} else {
  const { sentry, ...rest } = config
  config = rest
}

if (process.env.ANALYZE === 'true') {
  config = withBundleAnalyzer({
    enabled: true,
  })(config)
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
export default config
