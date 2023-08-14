import { FC } from 'react'

import { DropdownMenu, DropdownItem } from '@nextui-org/dropdown'
import { NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem } from '@nextui-org/navbar'
import { Link } from '@nextui-org/link'

import CheckIcon from 'src/assets/check-solid.svg'
import { ELocaleNames } from 'my-constants'
import type { LocaleCode } from 'my-locales'
import * as locales from 'my-locales'
import { useLang } from 'src/hooks/useT'

const availableLocales = Object.keys(locales) as LocaleCode[]

export const NavMenuLocaleLinks: FC = () => {
  const locale = useLang()

  return (
    <NavbarMenu className="py-8">
      {availableLocales.map((l) => {
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
  const locale = useLang()

  return (
    <DropdownMenu aria-label="Locale list">
      {availableLocales.map((l) => {
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
  const locale = useLang()

  return (
    <NavbarContent className="hidden sm:flex gap-4" justify="end">
      {availableLocales.map((l) => {
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
