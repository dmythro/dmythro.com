import type { LocaleCode } from 'my-locales'
import type { FC, ReactNode } from 'react'

export type SvgIconProps = {
  className?: string
  fill?: string
  width?: number
  height?: number
}

export type SvgIcon = FC<SvgIconProps>

export type WithLangProp = {
  lang: LocaleCode
}

export type ParamsWithLang = {
  children: ReactNode
  params: WithLangProp
}
