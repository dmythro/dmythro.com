import { SkillTime } from 'src/types'

export const skills: SkillTime[] = [
  {
    title: 'JavaScript',
    level: 'expert',
    times: ['2006-now'],
    subtitle: "My main stack's base",
    description: [
      "Been working on corporate projects since IE5-IE6 support was required, and jQuery with AJAX was a thing and async/await wasn't.",
      'Will never miss those times :)',
    ],
  },
  {
    title: 'React',
    level: 'expert',
    times: ['2012-now'],
    subtitle: 'Commercial projects since React v0.5',
    description:
      'I work with React non-stop since version 0.5 (2012), from class to functional and server components, hooks.',
  },
  {
    title: 'Node.js',
    level: 'proficient',
    times: ['2012-now'],
    subtitle: 'Work non-stop since early versions',
    description: [
      "Can't say I'm an expert because always learn/revisit APIs required for my task.",
      "But never had issues I couldn't solve.",
    ],
  },
  {
    title: 'TypeScript',
    level: 'proficient',
    times: ['2017-now'],
    subtitle: 'Must-have for JS',
    description:
      "Wouldn't say I'm an expert, but I check docs for types I need to describe more more rarily. Monitor new features as well.",
  },
  {
    title: 'React Native, Electron',
    level: 'advanced',
    times: ['2014-2016', '2019-2022'],
    subtitle: 'Still good for cross-platform code',
    description:
      "Didn't work a lot, but know enough to quickly bootstrap a project/CI, Expo etc.",
  },
  {
    title: 'CI/CD',
    level: 'proficient',
    times: ['2017-now'],
    subtitle: 'Automated pipeline is a must-have',
    description: 'Did pipelines to build and deploy different kinds of projects over past years.',
  },
  {
    title: 'DB, RDS, ORM',
    level: 'proficient',
    times: ['2007-now'],
    subtitle: 'Postgres/Mongo, Prisma/Drizzle and others',
    description: [
      'But been working with a lot of different databases and ORMs. And still do.',
      'From common SQL/NoSQL to RDS and specific cloud ones.',
    ],
  },
  {
    title: 'Frameworks',
    level: 'proficient',
    times: ['2016-now'],
    subtitle: 'Full-stack or backend/UI frameworks',
    description: [
      'Been working with a variety of frameworks.',
      'From UI (NextUI, MUI, Tailwind CSS and others) to backend (Nest.js/Express) to full-stack (Next.js, Astro).',
    ],
  },
]
