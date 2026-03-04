import { en, uk } from 'my-locales'
import type { LocaleCode, Translation } from 'my-locales'

const locales: Record<LocaleCode, Translation> = { en, uk }

export function getT(locale: LocaleCode): Translation {
  return locales[locale] ?? en
}
