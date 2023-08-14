import type { LocaleCode } from 'my-locales'

export interface ParamsWithLang {
  lang: LocaleCode
}

export interface WithParams {
  params: ParamsWithLang
}
