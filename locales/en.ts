import { USERNAME } from 'src/constants'

export const en = {
  name: 'Dmytro',
  meta: {
    description: `My name is Dmytro (${USERNAME}) and I love tech, web development, music, traveling, space and many more.`,
    keywords: 'Web Dev, Music, Travel',
  },
} as const

export type TranslationKeys = keyof typeof en
export type Translation = Record<TranslationKeys, any>
