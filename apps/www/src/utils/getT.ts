import type { LocaleCode, Translation } from 'my-locales'
import * as locales from 'my-locales'

export const getT = (lang: LocaleCode) => locales[lang] as Translation
