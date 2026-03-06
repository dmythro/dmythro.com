import { localeNames } from '@dmythro/constants'

import type { LocaleCode } from './types'

export const availableLocales = Object.keys(localeNames) as LocaleCode[]
