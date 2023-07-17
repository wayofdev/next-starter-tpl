import { Analytics } from '@vercel/analytics/react'
import { FacebookPixelNoScript } from '@wayofdev/facebook-pixel/src'
import { GoogleTagManagerNoScript } from '@wayofdev/google-tag-manager/src'
import type { DocumentContext, DocumentInitialProps } from 'next/document'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { defaultLocale } from '../../next-i18next.config.mjs'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    return await Document.getInitialProps(ctx)
  }

  render() {
    const locale = this.props.locale ?? defaultLocale

    return (
      <Html lang={locale}>
        <Head>
          {/* Favicons, Google site verification and other common meta tags across the site. */}
          <meta charSet="utf-8" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/images/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/images/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/images/favicon/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="shortcut icon" href="/images/favicon/favicon.ico" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-config" content="/images/favicon/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <Analytics />
        <GoogleTagManagerNoScript />
        <FacebookPixelNoScript />
      </Html>
    )
  }
}

export default MyDocument
