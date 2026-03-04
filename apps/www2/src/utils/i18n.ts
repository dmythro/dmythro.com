import type { LocaleCode } from 'my-locales'
import { availableLocales } from 'my-locales/constants'

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
