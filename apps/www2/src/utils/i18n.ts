import type { LocaleCode } from '@dmythro/locales'
import { availableLocales } from '@dmythro/locales/constants'

export { availableLocales }
export type { LocaleCode }

export function getStaticLocalePaths() {
  return availableLocales.map((locale) => ({ params: { locale } }))
}

export function isValidLocale(locale: string): locale is LocaleCode {
  return availableLocales.includes(locale as LocaleCode)
}

export function getLocaleFromUrl(url: URL): LocaleCode {
  const [, locale] = url.pathname.split('/')
  if (isValidLocale(locale)) return locale
  return 'en'
}

/** Strip `.html` suffix and trailing slash from a pathname (Astro static builds add `.html`) */
export function cleanPathname(pathname: string): string {
  return pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/'
}
