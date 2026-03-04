import type { LocaleCode, Translation } from '@dmythro/locales'
import { en, uk } from '@dmythro/locales'

const locales: Record<LocaleCode, Translation> = { en, uk }

export function getT(locale: LocaleCode): Translation {
  return locales[locale] ?? en
}
