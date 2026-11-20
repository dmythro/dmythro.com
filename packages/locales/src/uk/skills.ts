import type { SkillTime } from '../types'

export const skills: SkillTime[] = [
  {
    title: 'Розробка з ШІ',
    level: 'proficient',
    times: ['2024-now'],
    subtitle: "Агенти працюють за моєю архітектурою й під моїм рев'ю",
    description: [
      "У моїх проєктах чималу частину коду пишуть ШІ-агенти, за архітектурою та правилами, які задаю я. Кожна зміна проходить перевірку типів, тести й автоматичне рев'ю, а перед злиттям я читаю її сам.",
      'Із цієї роботи виросли навички для агентів, які я публікую.',
    ],
  },
  {
    title: 'TypeScript',
    level: 'expert',
    times: ['2017-now'],
    subtitle: "Для JS-проєктів вважаю обов'язковим",
    description: 'Щодня з 2017 року, у кожному проєкті. Стежу за новими можливостями мови.',
  },
  {
    title: 'React',
    level: 'expert',
    times: ['2013-now'],
    subtitle: 'Комерційні проєкти з 2013 року',
    description:
      'Без перерв ще з версії 0.5 (2013): класові компоненти, потім функціональні й серверні, хуки.',
  },
  {
    title: 'Хмари та CI/CD',
    level: 'proficient',
    times: ['2017-now'],
    subtitle: 'Google Cloud, AWS, DigitalOcean, Vercel, Cloudflare',
    description: [
      "Автоматизований пайплайн вважаю обов'язковим і налаштовував такі для різних проєктів.",
      'Багато чого тримаю на власній інфраструктурі, зокрема збірку підписаних застосунків для macOS.',
      'Брав участь в аудитах інфраструктури та безпеки.',
    ],
  },
  {
    title: 'DB, SQL, ORM',
    level: 'proficient',
    times: ['2007-now'],
    subtitle: 'Зараз PostgreSQL і Drizzle ORM',
    description: [
      'Раніше: Prisma, TypeORM, MongoDB, MySQL, MSSQL, SQLite.',
      'Valkey для кешу й лімітів.',
    ],
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
    title: 'Фреймворки',
    level: 'proficient',
    times: ['2016-now'],
    subtitle: 'Для full-stack, API та UI',
    description: [
      'Зараз: Next.js і Astro; для API — Elysia та Hono з моїм graphql-suite; для UI — HeroUI і Tailwind CSS.',
      'Раніше: NestJS, Express, MUI, Gatsby.',
    ],
  },
  {
    title: 'React Native, Electron, Tauri',
    level: 'advanced',
    times: ['2014-2016', '2019-2022'],
    subtitle: 'Суттєвий досвід кросплатформної розробки',
    description:
      'Кілька років Electron у Luxoft, застосунки на React Native в Peppy Health, а зараз Plugoist — застосунок на Tauri (Rust, React і HeroUI v3). Швидко запускаю проєкт і налаштовую CI, Expo тощо.',
  },
]
