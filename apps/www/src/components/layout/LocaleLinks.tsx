import type { FC } from 'react'

import { DropdownItem, DropdownMenu } from '@heroui/dropdown'
import { Link } from '@heroui/link'
import { NavbarMenu, NavbarMenuItem } from '@heroui/navbar'

import { ELocaleNames } from 'my-constants'
import { availableLocales } from 'my-locales/constants'

import CheckIcon from 'src/assets/check-solid.svg'
import { useCurrentPath } from 'src/hooks/useCurrentPath'
import type { LangProp } from 'src/types'

export const NavMenuLocaleLinks: FC<LangProp> = ({ lang }) => {
  const currentPath = useCurrentPath()

  return (
    <NavbarMenu className="py-8">
      {availableLocales.map((l) => {
        const isActive = l === lang

        return (
          <NavbarMenuItem id={`nav-collapse-locale-li-${l}`} key={l}>
            <Link
              color={isActive ? 'primary' : 'foreground'}
              id={`nav-collapse-locale-a-${l}`}
              href={`/${l}${currentPath}`}
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

export const DropdownMenuLocaleLinks: FC<LangProp> = ({ lang }) => {
  const currentPath = useCurrentPath()

  return (
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
            href={`/${l}${currentPath}`}
            // @ts-ignore
            hrefLang={l}
            rel="me"
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
