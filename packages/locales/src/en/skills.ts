import type { SkillTime } from '../types'

export const skills: SkillTime[] = [
  {
    title: 'TypeScript',
    level: 'proficient',
    times: ['2017-now'],
    subtitle: 'Must-have for JS projects',
    description:
      "I've worked with TypeScript daily for many years to keep projects type-safe, and I follow its new features.",
  },
  {
    title: 'React',
    level: 'expert',
    times: ['2012-now'],
    subtitle: 'Commercial projects since 2012',
    description:
      "I've worked with React non-stop since version 0.5 (2012): from class components to function and server components, and hooks.",
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
    title: 'DB, RDS, ORM',
    level: 'proficient',
    times: ['2007-now'],
    subtitle: 'Postgres/Mongo, Prisma/Drizzle and others',
    description: [
      "I've used many different databases, ORMs and DBaaS in production, and still do.",
      'From the common SQL/NoSQL ones to RDS and cloud-specific services.',
    ],
  },
  {
    title: 'CI/CD',
    level: 'proficient',
    times: ['2017-now'],
    subtitle: 'An automated pipeline is a must',
    description:
      "Over the years I've set up build and deploy pipelines for many kinds of projects.",
  },
  {
    title: 'Frameworks',
    level: 'proficient',
    times: ['2016-now'],
    subtitle: 'For full-stack, backend or UI',
    description: [
      "I've used a variety of frameworks in production.",
      'From UI (HeroUI, MUI, Tailwind CSS and others) to backend (NestJS/Express) to full-stack (Next.js, Astro).',
    ],
  },
  {
    title: 'Cloud Providers',
    level: 'advanced',
    times: ['2017-now'],
    subtitle: 'Google Cloud, AWS, DigitalOcean, Vercel',
    description: "I've worked with several cloud providers in production and taken part in audits.",
  },
  {
    title: 'React Native, Electron, Flutter',
    level: 'advanced',
    times: ['2014-2016', '2019-2022'],
    subtitle: 'Significant experience in cross-platform development',
    description:
      "I haven't done a lot of it, but enough to quickly bootstrap a project and set up its CI, Expo and so on.",
  },
]
