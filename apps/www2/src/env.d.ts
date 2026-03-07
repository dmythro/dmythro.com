/// <reference types="astro/client" />

interface Window {
  __themeMediaListenerAdded?: boolean
  zaraz?: {
    track: (eventName: string, properties?: Record<string, unknown>) => void
  }
}
