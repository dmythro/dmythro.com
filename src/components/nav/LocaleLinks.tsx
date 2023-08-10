import { FC } from 'react'
import { useRouter } from 'next/router'

import {
  DropdownMenu,
  DropdownItem,
  Link,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react'

import type { LocaleCode } from 'locales'
import CheckIcon from 'src/assets/check-solid.svg'
import { ELocaleNames } from 'src/constants'

export const NavMenuLocaleLinks: FC = () => {
  const { locale, locales = [] } = useRouter() as { locale: LocaleCode; locales: LocaleCode[] }

  return (
    <NavbarMenu className="py-8">
      {locales.map((l) => {
        const isActive = l === locale
        const isRoot = l === 'en'

        return (
          <NavbarMenuItem id={`nav-collapse-locale-li-${l}`} key={l}>
            <Link
              color={isActive ? 'primary' : 'foreground'}
              id={`nav-collapse-locale-a-${l}`}
              href={`/${isRoot ? '' : l}`}
              hrefLang={l}
              isBlock
            >
              {ELocaleNames[l]}
            </Link>
          </NavbarMenuItem>
        )
      })}
    </NavbarMenu>
  )
}

export const MenuLocaleLinks: FC = () => {
  const { locale, locales = [] } = useRouter() as { locale: LocaleCode; locales: LocaleCode[] }

  return (
    <DropdownMenu aria-label="Locale list">
      {locales.map((l) => {
        const isActive = l === locale
        const isRoot = l === 'en'

        return (
          <DropdownItem
            as={Link}
            id={`menu-locale-a-${l}`}
            key={l}
            className="text-foreground"
            color={isActive ? 'default' : 'primary'}
            // @ts-ignore
            href={`/${isRoot ? '' : l}`}
            hrefLang={l}
            rel="me"
            role="link"
            endContent={
              isActive ? <CheckIcon className="fill-foreground" width={16} height={16} /> : null
            }
          >
            {ELocaleNames[l]}
          </DropdownItem>
        )
      })}
    </DropdownMenu>
  )
}

export const NavLocaleLinks: FC = () => {
  const { locale, locales = [] } = useRouter() as { locale: LocaleCode; locales: LocaleCode[] }

  return (
    <NavbarContent className="hidden sm:flex gap-4" justify="end">
      {locales.map((l) => {
        const isActive = l === locale
        const isRoot = l === 'en'

        return (
          <NavbarItem key={l} isActive={isActive}>
            <Link id={`nav-locale-a-${l}`} href={`/${isRoot ? '' : l}`} hrefLang={l} isBlock>
              {ELocaleNames[l]}
            </Link>
          </NavbarItem>
        )
      })}
    </NavbarContent>
  )
}
