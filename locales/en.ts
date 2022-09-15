import { USERNAME } from 'src/constants'

export interface InterestLocale {
  title: string
  description: string
  tldr?: string
  text: string[]
}

const interests: InterestLocale[] = [
  {
    title: 'Web Development',
    description:
      'TypeScript, Node.js, Nest, Next.js, Postgres, Prisma/TypeOrm, Google Cloud, Vercel.',
    tldr: 'Today I mainly work with a TypeScript based full-stack projects (Node.js, React, React Native), cloud platforms (Google Cloud).',
    text: [
      'Technology was my passion since childhood and cartoons like "Transformers". And it still is my passion today, one of the main points of interest.',
      'I started learning programming in school with Pascal and Basic. Mainly to solve some puzzles like route a horse on a chess board to hit each point but only once.',
      'Recent positions & projects',
      'Principal Software Engineer @ Peppy Health (May ’20 — Aug ’22).' +
        ' High-impact health support. Project based on a secure & modern tech stack — Google Cloud Platform, TypeScript/JavaScript, Node.js, React, React Native.' +
        ' Also Prisma (Postgres), Sentry, SendBird, Segment, Customer.io, Mixpanel and more.',
      'Lead Front-end Developer @ Star (Sep ’17 — May ’20).' +
        ' (1) Robotized warehouse management application — TypeScript, React (Hooks, Context, Redux), PixiJS v4-5 / WebGL, Paper.js (not much), SVG, Node, Jest/Cypress, REST.' +
        ' (2) Customer area, responsive accessible application for state’s transportation system (public transport tickets, parking management, institutions) — TypeScript, React, Redux, Material-UI, SVG, Node, unit tests via Jest, CRA v2+, REST. ADA accessibility & security specialist.',
      'Tech Lead Front-end @ Match2One (Sep ’16 — May ’17).' +
        ' Програмована рекламна платформа. Веб-додаток для клієнтської зони (React, Redux, ES2017, LESS).' +
        ' App architecture rework. Custom builds (Gulp, Rollup).' +
        ' Custom components & UI/UX implementation.' +
        ' Огляд коду. Співбесіди з кандидатами.',
      'Tech Lead @ Luxoft (Dec ’12 — Sep ’16).' +
        ' Гібридний кросплатформний додаток (macOS, Windows) з нуля.' +
        ' Electron, ES6 (React, Node.js), app prototyping, complex UI development, app localisation, OS notifications, performance & memory/CPU efficiency, IPC, CI builds & Gulp tasks, Jest tests, etc.' +
        ' Огляд коду. Співбесіди з кандидатами.',
    ],
  },
  {
    title: 'Music',
    description:
      'I love both listening and playing music, have a small record label and record collection.',
    text: ['TBD'],
  },
  {
    title: 'Travel',
    description:
      'Car trips, sunsets, night skies, camping.' +
      ' Also sightseeing, museums, a bit of a history and culture exchange.' +
      ' Snowboarding, surfing, cycling, scooters, longboards etc.',
    text: ['TBD'],
  },
]

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
  supportUkraine: {
    message:
      'I was born and live in Ukraine 🇺🇦. And now my country is under a full-scale invasion by Russia.' +
      ' We fight for our existense, freedom and democracy.',
    linkTitle: 'Find out how you can help',
  },
} as const

export type TranslationKeys = keyof typeof en
export type Translation = Record<TranslationKeys, unknown>
