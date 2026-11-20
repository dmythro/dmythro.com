import type { SkillTime } from '../types'

export const skills: SkillTime[] = [
  {
    title: 'AI-Assisted Development',
    level: 'proficient',
    times: ['2024-now'],
    subtitle: 'Agents under my architecture and review',
    description: [
      'Coding agents write much of the code on my projects, under an architecture and rules I set. Every change passes type checks, tests and an automated review, and I read it before it is merged.',
      'I publish the agent skills that came out of this work.',
    ],
  },
  {
    title: 'TypeScript',
    level: 'expert',
    times: ['2017-now'],
    subtitle: 'Must-have for JS projects',
    description: [
      'Daily since 2017, on every project. I prefer a single source of truth and type inference: types come from the schema or the code and are not written twice.',
      'I keep up with new language features.',
    ],
  },
  {
    title: 'React',
    level: 'expert',
    times: ['2013-now'],
    subtitle: 'Commercial projects since 2013',
    description:
      'Non-stop since version 0.5 (2013), from class components to function and server components and hooks. Countless projects and performance optimizations.',
  },
  {
    title: 'Cloud & CI/CD',
    level: 'proficient',
    times: ['2017-now'],
    subtitle: 'Google Cloud, AWS, DigitalOcean, Vercel, Cloudflare',
    description: [
      "An automated pipeline is a must, and I've set them up for many kinds of projects.",
      'I self-host a lot too, including builds of signed apps for macOS.',
      'Took part in infrastructure and security audits.',
    ],
  },
  {
    title: 'DB, SQL, ORM',
    level: 'proficient',
    times: ['2007-now'],
    subtitle: 'PostgreSQL and Drizzle ORM today',
    description: [
      'Earlier: Prisma, TypeORM, MongoDB, MySQL, MSSQL, SQLite.',
      'Valkey for caching and rate limits.',
    ],
  },
  {
    title: 'Bun/Node.js',
    level: 'proficient',
    times: ['2012-now'],
    subtitle: 'Non-stop since the early versions',
    description: [
      "Can't call myself an expert, because I still learn or re-read the APIs each task needs.",
      "But I've never had an issue I couldn't solve.",
    ],
  },
  {
    title: 'JavaScript, ESM',
    level: 'expert',
    times: ['2006-now'],
    subtitle: 'The core of my main stack',
    description: [
      "I worked on corporate projects back when IE5-IE6 support was still required, jQuery and AJAX were a thing, and async/await wasn't.",
      'Will never miss those times :)',
    ],
  },
  {
    title: 'Frameworks',
    level: 'proficient',
    times: ['2016-now'],
    subtitle: 'For full-stack, API and UI',
    description: [
      'Now: Next.js and Astro; Elysia and Hono for APIs, with my own graphql-suite; HeroUI and Tailwind CSS for UI.',
      'Earlier: NestJS, Express, MUI, Gatsby.',
    ],
  },
  {
    title: 'React Native, Electron, Tauri',
    level: 'advanced',
    times: ['2014-2016', '2019-2022'],
    subtitle: 'Significant experience in cross-platform development',
    description:
      'Years of Electron at Luxoft, React Native apps at Peppy Health, and now Plugoist, a Tauri app (Rust, React and HeroUI v3). I can quickly bootstrap a project and set up its CI, Expo and so on.',
  },
]
