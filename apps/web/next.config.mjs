// @ts-check

// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// @link https://nextjs.org/docs/api-reference/next.config.js/introduction
// @link https://docs.sentry.io/platforms/javascript/guides/nextjs/
// @link https://github.com/vercel/next.js/tree/canary/examples/with-sentry

import { readFileSync } from 'node:fs'
import withBundleAnalyzer from '@next/bundle-analyzer'
import { withSentryConfig } from '@sentry/nextjs' // https://docs.sentry.io/platforms/javascript/guides/nextjs/
import pc from 'picocolors'
import nextI18nConfig from './next-i18next.config.js'

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

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: !disableSourceMaps,
  i18n: nextI18nConfig.i18n,
  optimizeFonts: true,

  // @link https://beta.nextjs.org/docs/api-reference/next.config.js#transpilepackages
  transpilePackages: ['@wayofdev/ui'],

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

  // Standalone build
  // @link https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files-experimental
  output: 'standalone',

  // Optional build-time configuration options
  sentry: {
    // See the sections below for information on the following options:
    //   'Configure Source Maps':
    //     - disableServerWebpackPlugin
    //     - disableClientWebpackPlugin
    //     - hideSourceMaps
    //     - widenClientFileUpload
    //   'Configure Legacy Browser Support':
    //     - transpileClientSDK
    //   'Configure Serverside Auto-instrumentation':
    //     - autoInstrumentServerFunctions
    //     - excludeServerRoutes
    //   'Configure Tunneling to avoid Ad-Blockers':
    //     - tunnelRoute
    //
    // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
    // for client-side builds. (This will be the default starting in
    // `@sentry/nextjs` version 8.0.0.) See
    // https://webpack.js.org/configuration/devtool/ and
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
    // for more information.
    hideSourceMaps: true,
  },

  typescript: {
    ignoreBuildErrors: NEXT_IGNORE_TYPE_CHECK,
  },

  eslint: {
    ignoreDuringBuilds: NEXT_IGNORE_ESLINT,
    // dirs: [`${__dirname}/src`],
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
            svgo: true,
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

    // release: '',
    // url: '',
    // org: '',
    // project: '',
    // authToken: '',
    // configFile: '',
    // stripPrefix: '',
    // urlPrefix: '',
    // include: '',
    // ignore: '',
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
