import { ELocaleNames } from 'my-constants'

import type { LocaleCode } from './types'

export const availableLocales = Object.keys(ELocaleNames) as LocaleCode[]
