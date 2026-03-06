import { languages } from 'countries-list'

export const BASE_URL = 'https://dmythro.com'
export const USERNAME = '@dmythro'

export const localeNames = {
  en: languages.en.native,
  uk: languages.uk.native,
} as const

export enum ESocialLinks {
  bluesky = 'https://bsky.app/profile/dmythro.bsky.social',
  facebook = 'https://www.facebook.com/dmythro/',
  github = 'https://github.com/dmythro',
  instagram = 'https://instagram.com/dmythro',
  linkedin = 'https://www.linkedin.com/in/dklymenko/',
  nostr = 'https://dmythro.nos.social',
  telegram = 'https://t.me/Dmythro',
  threads = 'https://www.threads.net/@dmythro',
  twitter = 'https://twitter.com/dmythro',
}

export const isOpenToWork = false
