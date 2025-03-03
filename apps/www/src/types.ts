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

export type LangProp<T = Record<string, unknown>> = T & {
  lang: LocaleCode
}

export type ParamsWithLang = {
  params: Promise<LangProp>
}
