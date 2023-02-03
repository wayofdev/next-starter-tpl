import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'
import { onRouteChangeComplete, gtmId } from '../lib/gtm'

/**
 * https://github.com/vercel/next.js/blob/canary/examples/with-google-tag-manager
 */
export function GoogleTagManagerScript() {
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', onRouteChangeComplete)
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])

  if (!gtmId) return null

  return (
    <>
      <Script
        id="gtag-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${gtmId}');
          `,
        }}
      />
    </>
  )
}
