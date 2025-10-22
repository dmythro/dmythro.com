import type { LocaleCode, Translation } from 'my-locales'
import * as locales from 'my-locales'

// biome-ignore lint/performance/noDynamicNamespaceImportAccess: -
export const getT = (lang: LocaleCode) => locales[lang] as Translation
