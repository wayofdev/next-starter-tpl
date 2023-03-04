export const facebookPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

declare global {
  interface Window {
    fbq: facebook.Pixel.Event
  }
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name: string, options = {}) => {
  if (typeof window.fbq === 'function') {
    window?.fbq('track', name, options)
  }
}

export const onRouteChangeComplete = () => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'PageView')
  }
}
