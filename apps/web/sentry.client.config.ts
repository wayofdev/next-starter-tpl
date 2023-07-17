// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { init as sentryInit, Replay } from '@sentry/nextjs'

sentryInit({
  dsn: process.env.SENTRY_DSN || process.env.NEXT_SENTRY_DSN,

  integrations: [new Replay()],

  // Adjust this value in production, or use tracesSampler for greater control
  // @see https://develop.sentry.dev/sdk/performance/
  // To turn it off, remove the line
  // @see https://github.com/getsentry/sentry-javascript/discussions/4503#discussioncomment-2143116
  tracesSampleRate: ['false', '0'].includes(process.env.SENTRY_TRACING ?? '') ? undefined : 1,

  // Note: The Replay integration only needs to be added to your sentry.client.config.js file.
  // It will not run if it is added into sentry.server.config.js.
  //
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,
  // If the entire session is not sampled, use the below sample rate to sample
  // sessions when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
  beforeSend: async (event, hint) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Sentry event', event)
      console.log('Sentry hint', hint)
    }
    return event
  },
  ignoreErrors: [
    /**
     * @link https://github.com/WICG/ResizeObserver/issues/38#issuecomment-422126006,
     * @link https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded/50387233#50387233
     */
    'ResizeObserver loop limit exceeded',
  ],
})
