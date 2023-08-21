import { FC } from 'react'

import NextLink from 'next/link'
import { Link } from '@nextui-org/link'

import { WithLangProp } from 'src/types'

export const HomeLink: FC<WithLangProp> = ({ lang }) => {
  return (
    <Link as={NextLink} href={`/${lang}`} hrefLang={lang}>
      &lt; Home
    </Link>
  )
}
