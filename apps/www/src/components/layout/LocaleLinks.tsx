import { FC } from 'react'

import { DropdownMenu, DropdownItem } from '@nextui-org/dropdown'
import { NavbarMenu, NavbarMenuItem } from '@nextui-org/navbar'
import { Link } from '@nextui-org/link'

import { ELocaleNames } from 'my-constants'
import type { LocaleCode } from 'my-locales'
import * as locales from 'my-locales'

import CheckIcon from 'src/assets/check-solid.svg'
import { WithLangProp } from 'src/types'

const availableLocales = Object.keys(locales) as LocaleCode[]

export const NavMenuLocaleLinks: FC<WithLangProp> = ({ lang }) => (
  <NavbarMenu className="py-8">
    {availableLocales.map((l) => {
      const isActive = l === lang

      return (
        <NavbarMenuItem id={`nav-collapse-locale-li-${l}`} key={l}>
          <Link
            color={isActive ? 'primary' : 'foreground'}
            id={`nav-collapse-locale-a-${l}`}
            href={`/${l}`}
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

export const MenuLocaleLinks: FC<LandProp> = ({ lang }) => (
  <DropdownMenu aria-label="Locale list">
    {availableLocales.map((l) => {
      const isActive = l === lang

      return (
        <DropdownItem
          as={Link}
          id={`menu-locale-a-${l}`}
          key={l}
          className="text-foreground"
          color={isActive ? 'default' : 'primary'}
          // @ts-ignore
          href={`/${l}`}
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
