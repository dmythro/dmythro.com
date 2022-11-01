import { FC } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { Link, Navbar } from '@nextui-org/react'

import type { LocaleCode } from 'locales'
import { ELocaleNames } from 'src/constants'

export const NavCollapseLocaleLinks: FC = () => {
  const { locale, locales = [] } = useRouter() as { locale: LocaleCode; locales: LocaleCode[] }

  return (
    <Navbar.Collapse disableAnimation>
      {locales.map((l) => {
        const isActive = l === locale
        const isRoot = l === 'en'

        return (
          <Navbar.CollapseItem id={`nav-collapse-locale-li-${l}`} key={l} isActive={isActive}>
            <Link
              id={`nav-collapse-locale-a-${l}`}
              block
              color={isActive ? 'primary' : 'text'}
              href={`/${isRoot ? '' : l}`}
              hrefLang={l}
            >
              {ELocaleNames[l]}
            </Link>
          </Navbar.CollapseItem>
        )
      })}
    </Navbar.Collapse>
  )
}

export const NavLocaleLinks: FC = () => {
  const { locale, locales = [] } = useRouter() as { locale: LocaleCode; locales: LocaleCode[] }

  return (
    <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
      {locales.map((l) => {
        const isActive = l === locale
        const isRoot = l === 'en'

        return (
          <Navbar.Link
            key={l}
            id={`nav-locale-a-${l}`}
            color={isActive ? 'primary' : 'text'}
            href={`/${isRoot ? '' : l}`}
            hrefLang={l}
            isActive={isActive}
          >
            {ELocaleNames[l]}
          </Navbar.Link>
        )
      })}
    </Navbar.Content>
  )
}
