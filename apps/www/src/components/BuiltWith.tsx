import type { FC } from 'react'

import type { LocaleCode } from 'my-locales'
import type { WithLangProp } from 'src/types'
// import { getT } from 'src/utils/getT'

import BuiltWithEn from 'my-locales/mdx/built-with.en.md'
import BuiltWithUk from 'my-locales/mdx/built-with.uk.md'

const localeData: Record<LocaleCode, unknown> = {
  en: BuiltWithEn,
  uk: BuiltWithUk,
}

export const BuiltWith: FC<WithLangProp> = ({ lang }) => {
  const MdxComponent = localeData[lang] as FC
  // const t = getT(lang)

  return (
    <article>
      <MdxComponent />
    </article>
  )
}
