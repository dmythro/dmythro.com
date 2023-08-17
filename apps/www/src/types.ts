import type { ReactNode } from 'react'
import type { LocaleCode } from 'my-locales'

export type WithLangProp = {
  lang: LocaleCode
}

export type ParamsWithLang = {
  children: ReactNode
  params: WithLangProp
}
