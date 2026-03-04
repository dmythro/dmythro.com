import { ELocaleNames } from '@dmythro/constants'

import type { LocaleCode } from './types'

export const availableLocales = Object.keys(ELocaleNames) as LocaleCode[]
