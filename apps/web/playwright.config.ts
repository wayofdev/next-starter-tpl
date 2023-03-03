import path from 'path'
import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'

const isCI = ['true', '1'].includes(process.env?.CI ?? '')
const openBrowserReport = process.env?.PLAYWRIGHT_OPEN_BROWSER_REPORT ?? 'never'
const outputDir = path.join(__dirname, 'e2e/.out')

// Use process.env.PORT by default and fallback to port 3000
const port = process.env.PORT || 3000

// Set webServer.url and use.baseURL with the location of the WebServer respecting the correct set port
const baseURL = `http://localhost:${port}`
const nextAuthSecret = process.env?.NEXAUTH_SECRET ?? 'secret-auth-token'

// Reference: https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
  // Timeout per test
  timeout: 30 * 1000,
  // Test directory
  testDir: path.join(__dirname, 'e2e'),
  // If a test fails, retry it additional 2 times
  retries: 2,
  // Artifacts folder where screenshots, videos, and traces are stored.
  outputDir: `${outputDir}/output`,
  preserveOutput: 'always',

  /* Opt out of parallel tests on CI. */
  workers: isCI ? 1 : undefined,

  reporter: [
    isCI ? ['github'] : ['list'],
    [
      'json',
      {
        outputFile: `${outputDir}/reports/test-results.json`,
      },
    ],
    [
      'html',
      {
        outputFolder: `${outputDir}/reports/html`,
        open: isCI ? 'never' : openBrowserReport,
      },
    ],
  ],

  // Run your local dev server before starting the tests:
  // https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
  webServer: {
    command: 'NEXT_IGNORE_TYPE_CHECKS=1 pnpm --filter=web build && pnpm --filter=web start',
    url: baseURL,
    timeout: 60 * 1000,
    reuseExistingServer: !isCI,
    env: {
      NEXT_DISABLE_SENTRY: 'true',
      NEXTAUTH_SECRET: nextAuthSecret,
      NEXTAUTH_URL: baseURL,
    },
  },

  use: {
    // Use baseURL so to make navigations relative.
    // More information: https://playwright.dev/docs/api/class-testoptions#test-options-base-url
    baseURL,

    // Retry a test if it's failing with enabled tracing. This allows you to analyse the DOM, console logs, network traffic etc.
    // More information: https://playwright.dev/docs/trace-viewer
    trace: 'retry-with-trace',

    // All available context options: https://playwright.dev/docs/api/class-browser#browser-new-context
    contextOptions: {
      ignoreHTTPSErrors: true,
    },
  },

  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
      },
    },
    ...(isCI
      ? []
      : [
          {
            name: 'Mobile Safari',
            use: devices['iPhone 12'],
          },
        ]),
  ],
}
export default config
