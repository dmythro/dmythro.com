import { USERNAME } from 'src/constants'
import type { Translation } from './'

export const uk: Translation = {
  fullName: 'Дмитро Клименко',
  name: 'Дмитро',
  meta: {
    description: `Мене звати Дмитро (${USERNAME}) і мене цікавлять технології, веб розробка, музика, подорожі, космос та багато іншого.`,
    keywords: 'Веб-розробка, музика, подорожі',
  },
} as const
