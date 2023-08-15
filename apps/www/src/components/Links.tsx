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
import TwitterIcon from 'src/assets/twitter.svg'

export const iconSize = 30

export const linkProps: Pick<ButtonProps, 'children' | 'startContent' | 'href'>[] = [
  {
    children: 'GitHub',
    startContent: <GitHubIcon height={iconSize} width={iconSize} style={{ fill: 'white' }} />,
    href: ESocialLinks.github,
  },
  {
    children: 'LinkedIn',
    startContent: <LinkedInIcon height={iconSize} width={iconSize} style={{ fill: 'white' }} />,
    href: ESocialLinks.linkedin,
  },
  {
    children: 'Telegram',
    startContent: <TelegramIcon height={iconSize} width={iconSize} style={{ fill: 'white' }} />,
    href: ESocialLinks.telegram,
  },
  {
    children: 'Facebook',
    startContent: <FacebookIcon height={iconSize} width={iconSize} style={{ fill: 'white' }} />,
    href: ESocialLinks.facebook,
  },
  {
    children: 'Instagram',
    startContent: <InstagramIcon height={iconSize} width={iconSize} style={{ fill: 'white' }} />,
    href: ESocialLinks.instagram,
  },
  {
    children: 'Threads',
    startContent: <ThreadsIcon height={iconSize} width={iconSize} style={{ fill: 'white' }} />,
    href: ESocialLinks.threads,
  },
  {
    children: 'Twitter',
    startContent: <TwitterIcon height={iconSize} width={iconSize} style={{ fill: 'white' }} />,
    href: ESocialLinks.twitter,
  },
]

export const Links: FC = () => (
  <div className="flex flex-wrap w-full gap-2">
    {linkProps.map((props) => (
      <Button
        key={props.href}
        as={Link}
        className="bg-gradient-to-tr from-purple-600 to-primary-500 text-white shadow-lg px-2"
        rel="me"
        role="link"
        {...props}
      />
    ))}
  </div>
)
