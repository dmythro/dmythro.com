import FacebookIcon from 'src/assets/facebook-f.svg'
import GitHubIcon from 'src/assets/github.svg'
import InstagramIcon from 'src/assets/instagram.svg'
import LinkedInIcon from 'src/assets/linkedin.svg'
import TelegramIcon from 'src/assets/telegram.svg'
import ThreadsIcon from 'src/assets/threads.svg'
import TwitterIcon from 'src/assets/twitter.svg'

export const BASE_URL = 'https://dmythro.com'
export const USERNAME = '@Dmythro'

export enum ELocaleNames {
  en = 'English',
  uk = 'Українська',
}

export enum ESocialLinks {
  facebook = 'https://www.facebook.com/dmythro/',
  github = 'https://github.com/dmythro',
  instagram = 'https://instagram.com/dmythro',
  linkedin = 'https://www.linkedin.com/in/dklymenko/',
  telegram = 'https://t.me/Dmythro',
  threads = 'https://www.threads.net/@dmythro',
  twitter = 'https://twitter.com/dmythro',
}

export interface SocialLink {
  Icon: any
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
    Icon: FacebookIcon,
    title: 'Facebook',
    href: ESocialLinks.facebook,
  },
  {
    Icon: InstagramIcon,
    title: 'Instagram',
    href: ESocialLinks.instagram,
  },
  {
    Icon: TwitterIcon,
    title: 'Twitter',
    href: ESocialLinks.twitter,
  },
  {
    Icon: ThreadsIcon,
    title: 'Threads',
    href: ESocialLinks.threads,
  },
]

export const isOpenToWork = true
