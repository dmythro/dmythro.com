import { ESocialLinks } from 'my-constants'
import type { Viewport } from 'next'
import BlueSkyIcon from 'src/assets/bluesky.svg'
import FacebookIcon from 'src/assets/facebook-f.svg'
import GitHubIcon from 'src/assets/github.svg'
import InstagramIcon from 'src/assets/instagram.svg'
import LinkedInIcon from 'src/assets/linkedin.svg'
import NostrIcon from 'src/assets/nostr.svg'
import TelegramIcon from 'src/assets/telegram.svg'
import ThreadsIcon from 'src/assets/threads.svg'
import TwitterIcon from 'src/assets/x-twitter.svg'

import type { SvgIcon } from './types'

export interface SocialLink {
  Icon: SvgIcon
  title: string
  href: ESocialLinks
}

export const SOCIAL_LINKS_WORK: SocialLink[] = [
  {
    Icon: GitHubIcon,
    title: 'GitHub',
    href: ESocialLinks.github,
  },
  {
    Icon: LinkedInIcon,
    title: 'LinkedIn',
    href: ESocialLinks.linkedin,
  },
  {
    Icon: TelegramIcon,
    title: 'Telegram',
    href: ESocialLinks.telegram,
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    Icon: BlueSkyIcon,
    title: 'BlueSky',
    href: ESocialLinks.bluesky,
  },
  {
    Icon: ThreadsIcon,
    title: 'Threads',
    href: ESocialLinks.threads,
  },
  {
    Icon: InstagramIcon,
    title: 'Instagram',
    href: ESocialLinks.instagram,
  },
  {
    Icon: FacebookIcon,
    title: 'Facebook',
    href: ESocialLinks.facebook,
  },
  {
    Icon: TwitterIcon,
    title: 'X / Twitter',
    href: ESocialLinks.twitter,
  },
  {
    Icon: NostrIcon,
    title: 'Nostr',
    href: ESocialLinks.nostr,
  },
]

export const isOpenToWork = true

/** @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport */
export const viewport: Viewport = {
  colorScheme: 'dark light',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
}
