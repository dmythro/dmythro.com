'use client'

import { FC } from 'react'

import { Button, ButtonProps } from '@nextui-org/button'
import { Link } from '@nextui-org/link'

import { ESocialLinks } from 'my-constants'

import FacebookIcon from 'src/assets/facebook-f.svg'
import GitHubIcon from 'src/assets/github.svg'
import InstagramIcon from 'src/assets/instagram.svg'
import LinkedInIcon from 'src/assets/linkedin.svg'
import TelegramIcon from 'src/assets/telegram.svg'
import ThreadsIcon from 'src/assets/threads.svg'
import TwitterIcon from 'src/assets/x-twitter.svg'

export const iconSize = 30

const linkIconProps: {
  className: string
  width: number
  height: number
} = {
  className: 'fill-white print:fill-black',
  width: iconSize,
  height: iconSize,
}

export const linkProps: Pick<ButtonProps, 'children' | 'startContent' | 'href'>[] = [
  {
    children: 'GitHub',
    startContent: <GitHubIcon {...linkIconProps} />,
    href: ESocialLinks.github,
  },
  {
    children: 'LinkedIn',
    startContent: <LinkedInIcon {...linkIconProps} />,
    href: ESocialLinks.linkedin,
  },
  {
    children: 'Telegram',
    startContent: <TelegramIcon {...linkIconProps} />,
    href: ESocialLinks.telegram,
  },
  {
    children: 'Facebook',
    startContent: <FacebookIcon {...linkIconProps} />,
    href: ESocialLinks.facebook,
  },
  {
    children: 'Instagram',
    startContent: <InstagramIcon {...linkIconProps} />,
    href: ESocialLinks.instagram,
  },
  {
    children: 'Threads',
    startContent: <ThreadsIcon {...linkIconProps} />,
    href: ESocialLinks.threads,
  },
  {
    children: 'X / Twitter',
    startContent: <TwitterIcon {...linkIconProps} />,
    href: ESocialLinks.twitter,
  },
]

export const Links: FC = () => (
  <div className="flex flex-wrap w-full gap-2 overflow-auto">
    {linkProps.map((props) => (
      <Button
        key={props.href}
        as={Link}
        className="bg-gradient-to-tr from-purple-600 to-primary-500 text-white shadow-lg px-2 print:bg-none print:text-black print:shadow-none"
        rel="me"
        role="link"
        {...props}
      />
    ))}
  </div>
)
