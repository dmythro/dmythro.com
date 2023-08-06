import { FC } from 'react'
import { useRouter } from 'next/router'

import { Link, NavbarContent, NavbarItem } from '@nextui-org/react'

import type { LocaleCode } from 'locales'
import { ELocaleNames } from 'src/constants'

export const NavCollapseLocaleLinks: FC = () => {
  const { locale, locales = [] } = useRouter() as { locale: LocaleCode; locales: LocaleCode[] }

  return (
    <NavbarContent>
      {locales.map((l) => {
        const isActive = l === locale
        const isRoot = l === 'en'

        return (
          <NavbarItem id={`nav-collapse-locale-li-${l}`} key={l} isActive={isActive}>
            <Link
              id={`nav-collapse-locale-a-${l}`}
              block
              color={isActive ? 'primary' : 'text'}
              href={`/${isRoot ? '' : l}`}
              hrefLang={l}
            >
              {ELocaleNames[l]}
            </Link>
          </NavbarItem>
        )
      })}
    </NavbarContent>
  )
}

export const NavLocaleLinks: FC = () => {
  const { locale, locales = [] } = useRouter() as { locale: LocaleCode; locales: LocaleCode[] }

  return (
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      {locales.map((l) => {
        const isActive = l === locale
        const isRoot = l === 'en'

        return (
          <Link
            key={l}
            id={`nav-locale-a-${l}`}
            color={isActive ? 'primary' : 'text'}
            href={`/${isRoot ? '' : l}`}
            hrefLang={l}
            isActive={isActive}
          >
            {ELocaleNames[l]}
          </Link>
        )
      })}
    </NavbarContent>
  )
}
