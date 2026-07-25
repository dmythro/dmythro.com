/// <reference types="astro/client" />

interface Window {
  /**
   * Defined by the theme init script in BaseLayout. Pass a null `mode` to re-resolve
   * it, and `instant` to mute transitions across the change.
   */
  __applyTheme?: (mode?: string | null, instant?: boolean) => void
  __themeMediaListenerAdded?: boolean
  zaraz?: {
    track: (eventName: string, properties?: Record<string, unknown>) => void
  }
}
