'use client'

import { Link } from '@heroui/link'
import NextLink from 'next/link'
import type { FC } from 'react'
import BackIcon from 'src/assets/arrow-left-solid.svg'
import HomeIcon from 'src/assets/house-solid.svg'
import type { LangProp } from 'src/types'

interface HomeLinkProps extends LangProp {
  title: string
}

export const HomeLink: FC<HomeLinkProps> = ({ lang, title }) => {
  return (
    <Link
      as={NextLink}
      anchorIcon={<HomeIcon className="fill-foreground" width={16} height={16} />}
      className="print:hidden"
      color="foreground"
      href={`/${lang}`}
      hrefLang={lang}
      isBlock
      prefetch
      showAnchorIcon
      title={title}
    >
      <BackIcon className="fill-foreground" width={16} height={16} /> &nbsp;
    </Link>
  )
}
