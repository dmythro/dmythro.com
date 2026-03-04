import { ESocialLinks } from '@dmythro/constants'

export const socialLinks = [
  {
    id: 'github',
    title: 'GitHub',
    href: ESocialLinks.github,
  },
  {
    id: 'twitter',
    title: 'X',
    href: ESocialLinks.twitter,
  },
  {
    id: 'threads',
    title: 'Threads',
    href: ESocialLinks.threads,
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    href: ESocialLinks.linkedin,
  },
] as const

export const profileImages = {
  avatar: '/avatar@400px.jpg',
  avatarSmall: '/avatar@40px.webp',
  avatarLarge: '/avatar@800px.jpg',
  music: '/me-live.webp',
  travel: '/road-trip.webp',
  studio: '/my-studio.webp',
} as const

export const footerLinks = [
  { id: 'github', title: 'GitHub', href: ESocialLinks.github },
  { id: 'twitter', title: 'X', href: ESocialLinks.twitter },
  { id: 'threads', title: 'Threads', href: ESocialLinks.threads },
  { id: 'linkedin', title: 'LinkedIn', href: ESocialLinks.linkedin },
] as const
