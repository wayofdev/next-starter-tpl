import { FacebookPixelScript } from '@wayofdev/facebook-pixel/src'
import { GoogleTagManagerScript } from '@wayofdev/google-tag-manager/src'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
import nextI18nextConfig from '../../next-i18next.config.mjs'
import { AppProviders } from '../AppProviders'

/**
 * @link https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1270716220
 * @link https://github.com/microsoft/TypeScript/issues/47663
 */
import type {} from 'hoist-non-react-statics'

/**
 * Import global styles, global css or polyfills here
 * i.e.: import '@/assets/theme/style.scss'
 */
import '../styles/global.css'

/**
 * Local fonts
 * @link https://fontsource.org/docs/guides/nextjs
 */
import '@fontsource-variable/inter'

// Workaround for https://github.com/zeit/next.js/issues/8592
export type MyAppProps = AppProps & {
  /** Will be defined only is there was an error */
  err?: Error
}

/**
 * @link https://nextjs.org/docs/advanced-features/custom-app
 */
const MyApp = (appProps: MyAppProps) => {
  const { Component, pageProps, err } = appProps
  return (
    <AppProviders>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <GoogleTagManagerScript />
      <FacebookPixelScript />
      {/* Workaround for https://github.com/vercel/next.js/issues/8592 */}
      <Component {...pageProps} err={err} />
    </AppProviders>
  )
}

/**
 * Generally don't enable getInitialProp if you don't need to,
 * all your pages will be served server-side (no static optimizations).
 */
/*
MyApp.getInitialProps = async appContext => {
   // calls page's `getInitialProps` and fills `appProps.pageProps`
   const appProps = await App.getInitialProps(appContext)
   return { ...appProps }
}
*/

export default appWithTranslation(MyApp, {
  ...nextI18nextConfig,
})
