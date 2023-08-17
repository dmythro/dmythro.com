export const GA_TRACKING_ID = process.env.NEXT_GA_ID || ''

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
// https://developers.google.com/analytics/devguides/collection/gtagjs/events

export const trackPageView = (url: string) => {
  // @ts-ignore
  window.gtag('event', 'page_view', {
    page_path: url,
  })
}

export interface IGACustomEvent {
  category: string
  label: string
  value: any
}

export const trackCustomEvent = (action: string, { category, label, value }: IGACustomEvent) => {
  // @ts-ignore
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}
