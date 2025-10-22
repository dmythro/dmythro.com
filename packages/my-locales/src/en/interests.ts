import type { InterestLocale } from 'src/types'

export const interests = {
  webDev: {
    title: 'Web Development, Career, Education',
    description:
      'TypeScript, Bun.js/Node.js, React, Next.js/Astro, PostgreSQL, Drizzle/Prisma ORM, Google Cloud/Vercel/self-host.',
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
  faq: {
    title: 'FAQ',
    description: 'Answers to your frequently asked questions.',
  },
  links: {
    title: 'Links & Social Media',
    description: 'Check out my GitHub, LinkedIn or other profiles.',
  },
} satisfies Record<string, InterestLocale>

export type InterestKey = keyof typeof interests
