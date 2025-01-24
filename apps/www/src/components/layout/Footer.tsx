'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import type { FC } from 'react'

import { Link } from '@heroui/link'

import CodeIcon from 'src/assets/code-solid.svg'
import GitHubIcon from 'src/assets/github.svg'
import type { WithLangProp } from 'src/types'
import { getT } from 'src/utils/getT'

const builtWithUrl = '/built-with'
const lastPublishDate = new Date()

export const Footer: FC<WithLangProp> = ({ lang }) => {
  const t = getT(lang)
  const pathname = usePathname()
  const isBuiltWith = pathname.includes(builtWithUrl)

  return (
    <footer className="block relative clear-both text-center text-foreground-500 my-4">
      &copy; {lastPublishDate.getFullYear()} &bull;{' '}
      <Link
        color="foreground"
        href="https://github.com/dmythro/dmythro.com"
        anchorIcon={<GitHubIcon className="fill-foreground ml-1.5" width={16} height={16} />}
        showAnchorIcon
        underline="hover"
      >
        Source code
      </Link>
      <span className="print:hidden">
        {' '}
        &bull;{' '}
        <Link
          anchorIcon={<CodeIcon className="fill-foreground ml-1.5 z-" width={16} height={16} />}
          as={NextLink}
          className="cursor-pointer"
          color="foreground"
          href={`/${lang}${builtWithUrl}`}
          hrefLang={lang}
          isDisabled={isBuiltWith}
          prefetch
          showAnchorIcon
          underline={isBuiltWith ? 'always' : 'hover'}
        >
          {t.builtWith}
        </Link>
      </span>
    </footer>
  )
}
