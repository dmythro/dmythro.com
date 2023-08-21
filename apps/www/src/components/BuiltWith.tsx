'use client'

import { FC } from 'react'
import { MDXProvider } from '@mdx-js/react'

import { LocaleCode } from 'my-locales'
import { mdxComponents } from 'src/components/MDX'
import { WithLangProp } from 'src/types'
import { getT } from 'src/utils/getT'

import BuiltWithEn from 'my-locales/mdx/built-with.en.md'
import BuiltWithUk from 'my-locales/mdx/built-with.uk.md'

const localeData: Record<LocaleCode, any> = {
  en: BuiltWithEn,
  uk: BuiltWithUk,
}

export const BuiltWith: FC<WithLangProp> = ({ lang }) => {
  const Component = localeData[lang]
  const t = getT(lang)

  return (
    <article>
      <MDXProvider components={mdxComponents}>
        <Component />
      </MDXProvider>
    </article>
  )
}
