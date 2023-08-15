'use client'

import { FC, useState } from 'react'

import { Button } from '@nextui-org/button'
import { Chip } from '@nextui-org/chip'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from '@nextui-org/dropdown'
import { Link } from '@nextui-org/link'
import { Navbar, NavbarContent, NavbarMenuToggle } from '@nextui-org/navbar'
import { User } from '@nextui-org/user'

import EarthEuropeIcon from 'src/assets/earth-europe-solid.svg'
import { MenuLocaleLinks, NavMenuLocaleLinks } from 'src/components/layout/LocaleLinks'
import { ELocaleNames, USERNAME, isOpenToWork } from 'my-constants'
import { SOCIAL_LINKS_WORK, SOCIAL_LINKS } from 'src/constants'
import { useLang, useT } from 'src/hooks/useT'

import avatarUserImg from 'public/avatar@44px.jpg'
import PdfFileIcon from 'src/assets/file-pdf-solid.svg'

export const TopNavbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>()
  const locale = useLang()
  const t = useT()
  // @ts-ignore
  const localeName = ELocaleNames[locale]

  return (
    <Navbar
      as="div"
      classNames={{
        item: [
          'flex',
          'relative',
          'h-full',
          'items-center',
          "data-[active=true]:after:content-['']",
          'data-[active=true]:after:absolute',
          'data-[active=true]:after:bottom-0',
          'data-[active=true]:after:left-0',
          'data-[active=true]:after:right-0',
          'data-[active=true]:after:h-[2px]',
          'data-[active=true]:after:rounded-[2px]',
          'data-[active=true]:after:bg-primary',
        ],
      }}
      disableScrollHandler
      isBordered
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent as="div" className="py-2">
        <Dropdown placement="bottom-start">
          <DropdownTrigger className="group">
            <User
              className="transition-transform hover:shadow relative dark:hover:outline-white/10 dark:hover:outline-1"
              classNames={{
                description: 'text-foreground-500',
              }}
              as="button"
              avatarProps={{
                alt: USERNAME,
                className: 'group-data-[focus-visible=true]:ring-0',
                color: 'primary',
                isBordered: true,
                src: avatarUserImg.src,
              }}
              name={
                <span className="flex flex-nowrap gap-1">
                  <span className="flex text-lg lowercase">
                    <span className="text-gray-500 font-thin mr-0.5">@</span>
                    {USERNAME.replace('@', '')}
                  </span>
                  {isOpenToWork && (
                    <Chip
                      className="flex flex-nowrap text-xs whitespace-nowrap h-6 leading-3 self-center"
                      classNames={{
                        content: 'pl-1 pr-0.5',
                      }}
                      color="success"
                      variant="bordered"
                      startContent={
                        <span className="animate-pulse w-2 h-2 ml-0.5 bg-green-500 leading-3 rounded-full"></span>
                      }
                    >
                      {t.openToWork}
                    </Chip>
                  )}
                </span>
              }
              description={t.meta.keywords}
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Social media links"
            className="sm:flex sm:flex-row gap-2 sm:w-[320px] max-w-xs"
          >
            <DropdownSection title={t.socialMedia.work}>
              {[
                ...SOCIAL_LINKS_WORK.map(({ Icon, title, href }, i) => (
                  <DropdownItem
                    as={Link}
                    className="bg-gradient-to-tr from-purple-600 to-primary-500 !text-white mb-2"
                    key={i}
                    rel="me"
                    role="link"
                    // @ts-ignore
                    href={href}
                    // @ts-ignore
                    isExternal
                    startContent={
                      <Icon className="self-start" width={32} height={32} fill="white" />
                    }
                    title={<b>{title}</b>}
                    description={
                      <span className="text-gray-100 text-xs">
                        {/* @ts-ignore */}
                        {t.socialMedia[href]}
                      </span>
                    }
                  />
                )),
                <DropdownItem
                  as={Link}
                  className="bg-gradient-to-tr from-purple-600 to-primary-500 !text-white mb-2"
                  key="CV"
                  // @ts-ignore
                  href="/cv.pdf"
                  startContent={
                    <PdfFileIcon className="self-start" width={32} height={32} fill="white" />
                  }
                  title={<b>CV</b>}
                  description={
                    <span className="text-gray-100 text-xs">
                      {t.socialMedia.generatedFromLinkedIn}
                    </span>
                  }
                />,
              ]}
            </DropdownSection>
            <DropdownSection title={t.socialMedia.personal}>
              {SOCIAL_LINKS.map(({ Icon, ...props }, i) => (
                <DropdownItem
                  as={Link}
                  className="bg-gradient-to-tr from-purple-600 to-primary-500 !text-white mb-2"
                  key={i}
                  rel="me"
                  role="link"
                  // @ts-ignore
                  isExternal
                  startContent={<Icon width={32} height={32} fill="white" />}
                  {...props}
                />
              ))}
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      {/* Locale select */}
      <NavbarContent
        as="div"
        justify="end"
        className="hidden sm:flex sm: flex-grow-0 justify-end justify-items-end"
      >
        <Dropdown className="self-center" placement="bottom-end">
          <DropdownTrigger>
            <Button
              className="-mr-2 px-2 hover:shadow !bg-transparent dark:hover:outline-white/10 dark:hover:outline-1"
              endContent={<EarthEuropeIcon className="fill-foreground" width={32} height={32} />}
              variant="light"
            >
              {localeName}
            </Button>
          </DropdownTrigger>
          <MenuLocaleLinks />
        </Dropdown>
      </NavbarContent>

      <NavbarContent
        as="div"
        justify="end"
        className="sm:hidden !grow-0 justify-end justify-items-end"
      >
        <NavbarMenuToggle aria-label={isMenuOpen ? t.actions.closeMenu : t.actions.openMenu} />
      </NavbarContent>

      <NavMenuLocaleLinks />
    </Navbar>
  )
}
