'use client'

import { Button } from '@heroui/button'
import { Chip } from '@heroui/chip'
import { Dropdown, DropdownTrigger } from '@heroui/dropdown'
import { Navbar, NavbarContent, NavbarMenuToggle } from '@heroui/navbar'
import { cn } from '@heroui/theme'
import { User } from '@heroui/user'
import { ELocaleNames, isOpenToWork, USERNAME } from 'my-constants'
// import type { ImageProps } from 'next/image'
// import Image from 'next/image'
import { type FC, useState } from 'react'
import EarthEuropeIcon from 'src/assets/earth-europe-solid.svg'
import { DropdownMenuLocaleLinks, NavMenuLocaleLinks } from 'src/components/layout/LocaleLinks'
import type { LangProp } from 'src/types'
import { getT } from 'src/utils/getT'

// import avatarUserImg from 'public/avatar@40px.webp'

// const { blurDataURL, width, height } = avatarUserImg
const avatarImageProps = {
  // unoptimized: true,
  // blurDataURL,
  height: 40,
  width: 40,
  src: '/avatar@40px.webp',
  alt: USERNAME,
}

export const TopNavbar: FC<LangProp> = ({ lang }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>()
  const t = getT(lang)
  const localeName = ELocaleNames[lang]

  return (
    <Navbar
      as="div"
      classNames={{
        base: 'print:relative print:border-small! print:rounded-md',
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
        <User
          className="transition-transform"
          classNames={{
            base: 'p-1 min-h-full',
            description: 'text-foreground-500',
          }}
          as="div"
          avatarProps={{
            className: 'group-data-[focus-visible=true]:ring-0 mr-1',
            color: 'primary',
            isBordered: true,
            // src: avatarUserImg.src,
            src: avatarImageProps.src,
            // ImgComponent: Image,
            imgProps: avatarImageProps,
          }}
          name={
            <div className="flex flex-nowrap gap-1">
              <h1 className="flex text-lg lowercase">
                <span className="text-gray-500 font-thin mr-0.5">@</span>
                {USERNAME.replace('@', '')}
              </h1>

              <Chip
                className={cn(
                  'flex flex-nowrap text-xs whitespace-nowrap h-6 leading-3 self-center print:hidden',
                  {
                    'opacity-70': !isOpenToWork,
                  },
                )}
                classNames={{
                  content: cn('pl-1 pr-0.5', isOpenToWork ? 'text-success' : 'text-foreground-800'),
                }}
                color={isOpenToWork ? 'success' : undefined}
                variant="flat"
                startContent={
                  <span className="animate-pulse w-2 h-2 ml-0.5 bg-green-500 leading-3 rounded-full" />
                }
              >
                {isOpenToWork ? t.openToWork : t.fullTimeEmployment}
              </Chip>
            </div>
          }
          description={t.meta.descriptionShort}
        />
      </NavbarContent>

      {/* Locale select */}
      <NavbarContent
        as="div"
        justify="end"
        className="hidden sm:flex sm: grow-0 justify-end justify-items-end print:flex"
      >
        <Dropdown className="self-center" placement="bottom-end">
          <DropdownTrigger>
            <Button
              className="-mr-2 px-2 hover:shadow bg-transparent! dark:hover:outline-white/10 dark:hover:outline-1"
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
        className="sm:hidden grow-0! justify-end justify-items-end print:hidden"
      >
        <NavbarMenuToggle aria-label={isMenuOpen ? t.actions.closeMenu : t.actions.openMenu} />
      </NavbarContent>

      <NavMenuLocaleLinks lang={lang} />
    </Navbar>
  )
}
