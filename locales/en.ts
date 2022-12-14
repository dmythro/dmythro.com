import { USERNAME } from 'src/constants'

export interface InterestLocale {
  title: string
  description: string
  tldr?: string
  text?: string[]
}

const interests: Record<string, InterestLocale> = {
  webDev: {
    title: 'Web Development',
    description:
      'TypeScript, Node.js, Nest, Next.js, PostgreSQL, Prisma/TypeOrm, Google Cloud, Vercel.',
  },
  music: {
    title: 'Music',
    description:
      'I love both listening and playing music, have a small record label and record collection.',
  },
  travel: {
    title: 'Travel',
    description:
      'Car trips, sunsets, night skies, camping.' +
      ' Also sightseeing, museums, a bit of history and culture.',
  },
  hobbies: {
    title: 'Hobbies',
    description:
      'Tech, gear, design, games.' +
      ' Smart home (HomeKit, Zigbee), automations.' +
      ' Snowboarding, surfing, cycling, scooters, longboards etc.',
  },
}

export const en = {
  fullName: 'Dmytro Klymenko',
  name: 'Dmytro',
  meta: {
    description: `My name is Dmytro (${USERNAME}) and I love tech, web development, music, traveling, space and many more.`,
    keywords: 'Web Dev, Music, Travel',
  },
  interests,
  socialMedia: {
    title: 'Links & Social Media',
    description: 'Check out my GitHub, LinkedIn or other social media profiles.',
  },
  saveLev: {
    message:
      'Unfortunately, my nephew Lev was diagnosed with SMA when he was 8.5 months old.' +
      ' We started a treatment and fundraiser immediately to save his life.',
    linkTitle: 'More details, support Lev here',
  },
  supportUkraine: {
    message: (day: number) =>
      'I was born and live in Ukraine.' +
      ' Now, my country is under a full-scale invasion by russia.' +
      ` Today is Day ${day} of fight for democracy, our existense and freedom πΊπ¦`,
    linkTitle: 'Find out how you can help',
  },
}

export type Translation = typeof en
export type TranslationKeys = keyof Translation
