import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'
import { onRouteChangeComplete, facebookPixelId } from '../lib/fpixel'

export function FacebookPixelScript() {
  const router = useRouter()

  useEffect(() => {
    // This pageview only triggers the first time (it's important for Pixel to have real information)
    onRouteChangeComplete()

    router.events.on('routeChangeComplete', onRouteChangeComplete)
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])

  if (!facebookPixelId) return null

  return (
    <>
      {/* Global Site Code Pixel - Facebook Pixel */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${facebookPixelId});
          `,
        }}
      />
    </>
  )
}
