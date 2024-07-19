'use client'

import type { ImageProps } from 'next/image'
import Image from 'next/image'
import Link from 'next/link'
import { type FC, useState } from 'react'

import { Button } from '@nextui-org/button'
import { Chip } from '@nextui-org/chip'
import { Dropdown, DropdownTrigger } from '@nextui-org/dropdown'
import { Navbar, NavbarContent, NavbarMenuToggle } from '@nextui-org/navbar'
import { User } from '@nextui-org/user'

import { ELocaleNames, USERNAME, isOpenToWork } from 'my-constants'
import { DropdownMenuLocaleLinks, NavMenuLocaleLinks } from 'src/components/layout/LocaleLinks'
import type { WithLangProp } from 'src/types'
import { getT } from 'src/utils/getT'

import EarthEuropeIcon from 'src/assets/earth-europe-solid.svg'

import avatarUserImg from 'public/avatar@40px.webp'
import { cn } from '@nextui-org/theme'

const { blurDataURL, width, height } = avatarUserImg
const avatarImageProps: ImageProps = {
  unoptimized: true,
  blurDataURL,
  height,
  width,
  src: avatarUserImg,
  alt: USERNAME,
}

export const TopNavbar: FC<WithLangProp> = ({ lang }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>()
  const t = getT(lang)
  const localeName = ELocaleNames[lang]

  return (
    <Navbar
      as="div"
      classNames={{
        base: 'print:relative print:!border-small print:rounded-md',
        wrapper: 'pl-3 pr-4',
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
      <NavbarContent as="div">
        <Button as={Link} className="min-h-12 py-0 px-1" href={`/${lang}`} variant="light">
          <User
            className="transition-transform"
            classNames={{
              base: 'p-1 min-h-full',
              description: 'text-foreground-500',
            }}
            avatarProps={{
              className: 'group-data-[focus-visible=true]:ring-0',
              color: 'primary',
              isBordered: true,
              src: avatarUserImg.src,
              ImgComponent: Image,
              // @ts-ignore
              imgProps: avatarImageProps,
            }}
            name={
              <span className="flex flex-nowrap gap-1">
                <span className="flex text-lg lowercase">
                  <span className="text-gray-500 font-thin mr-0.5">@</span>
                  {USERNAME.replace('@', '')}
                </span>

                <Chip
                  className={cn(
                    'flex flex-nowrap text-xs whitespace-nowrap h-6 leading-3 self-center print:hidden',
                    {
                      'opacity-70': !isOpenToWork,
                    },
                  )}
                  classNames={{
                    content: 'pl-1 pr-0.5',
                  }}
                  color={isOpenToWork ? 'success' : 'default'}
                  variant="flat"
                  startContent={
                    <span className="animate-pulse w-2 h-2 ml-0.5 bg-green-500 leading-3 rounded-full" />
                  }
                >
                  {isOpenToWork ? t.openToWork : t.fullTimeEmployment}
                </Chip>
              </span>
            }
            description={t.meta.keywords}
          />
        </Button>
      </NavbarContent>

      {/* Locale select */}
      <NavbarContent
        as="div"
        justify="end"
        className="hidden sm:flex sm: flex-grow-0 justify-end justify-items-end print:flex"
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
          <DropdownMenuLocaleLinks lang={lang} />
        </Dropdown>
      </NavbarContent>

      <NavbarContent
        as="div"
        justify="end"
        className="sm:hidden !grow-0 justify-end justify-items-end print:hidden"
      >
        <NavbarMenuToggle aria-label={isMenuOpen ? t.actions.closeMenu : t.actions.openMenu} />
      </NavbarContent>

      <NavMenuLocaleLinks lang={lang} />
    </Navbar>
  )
}
