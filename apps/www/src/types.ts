import type { LocaleCode } from 'my-locales'
import type { ReactNode } from 'react'

export type WithLangProp = {
  lang: LocaleCode
}

export type ParamsWithLang = {
  children: ReactNode
  params: WithLangProp
}
