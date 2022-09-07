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
      {locales.map((l) => (
        <Navbar.CollapseItem id={`nav-collapse-locale-li-${l}`} key={l} isActive={l === locale}>
          <NextLink href={`/${l === 'en' ? '' : l}`} hrefLang={l} locale={false} passHref>
            <Link id={`nav-collapse-locale-a-${l}`} block color={l === locale ? 'primary' : 'text'}>
              {ELocaleNames[l]}
            </Link>
          </NextLink>
        </Navbar.CollapseItem>
      ))}
    </Navbar.Collapse>
  )
}

export const NavLocaleLinks: FC = () => {
  const { locale, locales = [] } = useRouter() as { locale: LocaleCode; locales: LocaleCode[] }

  return (
    <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
      {locales.map((l) => (
        <NextLink
          id={`nav-locale-li-${l}`}
          key={l}
          href={`/${l === 'en' ? '' : l}`}
          hrefLang={l}
          locale={false}
          passHref
        >
          <Navbar.Link
            id={`nav-locale-a-${l}`}
            isActive={l === locale}
            color={l === locale ? 'primary' : 'text'}
          >
            {ELocaleNames[l]}
          </Navbar.Link>
        </NextLink>
      ))}
    </Navbar.Content>
  )
}
