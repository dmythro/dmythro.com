import type { LocaleCode } from 'my-locales'
import type { CSSProperties, FC, ReactNode } from 'react'

export type SvgIconProps = {
  className?: string
  fill?: string
  width?: number
  height?: number
  style?: CSSProperties
}

export type SvgIcon = FC<SvgIconProps>

export type WithLangProp = {
  lang: LocaleCode
}

export type ParamsWithLang = {
  children: ReactNode
  params: WithLangProp
}
