export const gtmId = process.env.NEXT_PUBLIC_GTM_ID

export const onRouteChangeComplete = (url: string) => {
  const dataLayer = (globalThis as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer
  dataLayer?.push({ event: 'pageview', page: url })
}
