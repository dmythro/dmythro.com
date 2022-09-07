import { USERNAME } from 'src/constants'
import type { InterestLocale, Translation } from '.'

const interests: InterestLocale[] = [
  {
    title: 'Веб розробка',
    description:
      'TypeScript, Node.js, Nest, Next.js, Postgres, Prisma/TypeOrm, Google Cloud, Vercel.',
    tldr: 'Сьогодні в основному працюю з full-stack проектами на базі TypeScript (Node.js, React, React Native), хмарними платформами (Google Cloud, DigitalOcean, AWS тощо).',
    text: [
      'Технології були моєю пристрастю з дитинства і мультфільмів типу Трансформери. І сьогодні це теж моя пристрасть, одна з головних.',
      'Я почав вивчати програмування в школі з Pascal і Basic. В основному для вирішення цікавих головоломок, як-от маршрут коня на шахівниці, щоб пройти кожне поле і лише один раз.',
      'Останні позиції та проекти',
      'Principal Software Engineer @ Peppy Health (May ’20 — Aug ’22).' +
        ' Ефективна підтримка здоров’я. Проект, заснований на безпечному та сучасному стеку технологій — Google Cloud Platform, TypeScript/JavaScript, Node.js, React, React Native.' +
        ' Також Prisma (Postgres), Sentry, SendBird, Segment, Customer.io, Mixpanel тощо.',
      'Lead Front-end Developer @ Star (Sep ’17 — May ’20).' +
        ' (1) Програма для управління роботизованим складом.' +
        ' TypeScript, React (Hooks, Context, Redux), PixiJS v4-5 / WebGL, Paper.js, SVG, Node, Jest/Cypress, REST.' +
        ' (2) Клієнтська зона, адаптивний доступний додаток для транспортної системи штату (квитки на громадський транспорт, управління паркуванням, установи).' +
        ' TypeScript, React, Redux, Material-UI, SVG, Node, Jest, CRA v2+, REST. Спеціаліст із доступності та безпеки по ADA.',
      'Tech Lead Front-end @ Match2One (Sep ’16 — May ’17).' +
        ' Rich web application for customers area (React.js, Redux, ES2017, LESS).' +
        ' App architecture rework. Custom builds (Gulp, Rollup).' +
        ' Custom components & UI/UX implementation.' +
        ' Code reviews. Candidate interviews.',
      'Tech Lead @ Luxoft (Dec ’12 — Sep ’16).' +
        ' Hybrid desktop cross-platform application (macOS, Windows) from scratch.' +
        ' Electron, ES6 (React.js, Node.js), app prototyping, complex UI development, app localisation, OS notifications, performance & memory/CPU efficiency, IPC, CI builds & Gulp tasks, Jest tests, etc.' +
        ' Code reviews. Candidate interviews.',
    ],
  },
  {
    title: 'Музика',
    description:
      'Я люблю як слухати так і грати музику, маю невеличкий лейбл звукозапису та колекцію музики на фізичних носіях.',
    text: [],
  },
  {
    title: 'Подорожі',
    description:
      'Поїздки на авто, заходи сонця, нічне небо, кемпінг.' +
      " Також огляд визначних пам'яток, музеї, трохи історії та культурного обміну." +
      ' Сноуборд, серфінг, велосипеди, самокати, лонгборд тощо.',
    text: [],
  },
]

export const uk: Translation = {
  fullName: 'Дмитро Клименко',
  name: 'Дмитро',
  meta: {
    description: `Мене звати Дмитро (${USERNAME}) і мене цікавлять технології, веб розробка, музика, подорожі, космос та багато іншого.`,
    keywords: 'Веб-розробка, музика, подорожі',
  },
  interests,
  socialMedia: {
    title: 'Посилання на соціальні мережі',
    description: 'Мій GitHub, LinkedIn та інші профілі у соціальних мережах.',
  },
} as const
