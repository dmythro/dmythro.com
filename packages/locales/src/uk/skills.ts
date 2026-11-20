import type { SkillTime } from '../types'

export const skills: SkillTime[] = [
  {
    title: 'TypeScript',
    level: 'proficient',
    times: ['2017-now'],
    subtitle: "Для JS-проєктів вважаю обов'язковим",
    description:
      'Уже багато років щодня пишу на TypeScript, бо з ним типи в проєкті під контролем. Стежу за новими можливостями мови.',
  },
  {
    title: 'React',
    level: 'expert',
    times: ['2012-now'],
    subtitle: 'Комерційні проєкти з 2012 року',
    description:
      'Працюю з React без перерв ще з версії 0.5 (2012): класові компоненти, функціональні, серверні, хуки.',
  },
  {
    title: 'Bun/Node.js',
    level: 'proficient',
    times: ['2012-now'],
    subtitle: 'Постійно, ще з ранніх версій',
    description: [
      'Експертом себе не назву, бо й досі для кожного завдання вчу чи перечитую потрібні API.',
      "Але нерозв'язних проблем ще не мав.",
    ],
  },
  {
    title: 'JavaScript, ESM',
    level: 'expert',
    times: ['2006-now'],
    subtitle: 'Основа мого стеку',
    description: [
      'Працював над корпоративними проєктами ще тоді, коли без підтримки IE5-IE6 було ніяк, jQuery та AJAX були в моді, а async/await ще не існувало.',
      'Ніколи не сумуватиму за тими часами :)',
    ],
  },
  {
    title: 'DB, RDS, ORM',
    level: 'proficient',
    times: ['2007-now'],
    subtitle: 'Postgres/Mongo, Prisma/Drizzle та інші',
    description: [
      'У комерційних проєктах працював і працюю з багатьма базами даних, ORM та DBaaS.',
      'Від поширених SQL/NoSQL до RDS і суто хмарних сервісів.',
    ],
  },
  {
    title: 'CI/CD',
    level: 'proficient',
    times: ['2017-now'],
    subtitle: "Автоматизований пайплайн вважаю обов'язковим",
    description:
      'Останніми роками налаштовував пайплайни збірки й розгортання для різних проєктів.',
  },
  {
    title: 'Фреймворки',
    level: 'proficient',
    times: ['2016-now'],
    subtitle: 'Для full-stack, бекенду чи UI',
    description: [
      'Працював із багатьма фреймворками в реальних проєктах.',
      'Від UI (HeroUI, MUI, Tailwind CSS та інші) до бекенду (NestJS/Express) і full-stack (Next.js, Astro).',
    ],
  },
  {
    title: 'Хмарні провайдери',
    level: 'advanced',
    times: ['2017-now'],
    subtitle: 'Google Cloud, AWS, DigitalOcean, Vercel',
    description: 'Працював із різними хмарними провайдерами, брав участь в аудитах.',
  },
  {
    title: 'React Native, Electron, Flutter',
    level: 'advanced',
    times: ['2014-2016', '2019-2022'],
    subtitle: 'Суттєвий досвід кросплатформної розробки',
    description:
      'Працював із цим не так багато, але достатньо, щоб швидко запустити проєкт, CI, Expo тощо.',
  },
]
