import { ESocialLinks } from '@dmythro/constants'

import musicImg from '@/assets/me-live.webp'
import studioImg from '@/assets/my-studio.webp'
import travelImg from '@/assets/road-trip.webp'

export const socialLinks = [
  {
    id: 'github',
    title: 'GitHub',
    href: ESocialLinks.github,
  },
  {
    id: 'twitter',
    title: 'X / Twitter',
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
  music: musicImg,
  travel: travelImg,
  studio: studioImg,
}

export const footerLinks = [
  { id: 'github', title: 'GitHub', href: ESocialLinks.github },
  { id: 'twitter', title: 'X / Twitter', href: ESocialLinks.twitter },
  { id: 'threads', title: 'Threads', href: ESocialLinks.threads },
  { id: 'linkedin', title: 'LinkedIn', href: ESocialLinks.linkedin },
] as const
