import type { LocaleCode, Translation } from '@dmythro/locales'
import * as locales from '@dmythro/locales'

// biome-ignore lint/performance/noDynamicNamespaceImportAccess: -
export const getT = (lang: LocaleCode) => locales[lang] as Translation
