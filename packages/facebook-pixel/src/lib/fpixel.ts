export const facebookPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name: string, options = {}) => {
  window.fbq('track', name, options)
}

export const onRouteChangeComplete = () => {
  window.fbq('track', 'PageView')
}
