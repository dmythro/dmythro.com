export const en = {
  name: 'Dmytro',
} as const

export type TranslationKeys = keyof typeof en
export type Translation = Record<TranslationKeys, any>
