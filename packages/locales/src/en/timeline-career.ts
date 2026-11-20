import type { TimelineItem } from '../types'

export const careerTimeline: TimelineItem[] = [
  {
    isCurrent: true,
    when: 'Aug ’26',
    till: 'Now',
    where: 'UA',
    title: 'Lead Engineer',
    subtitle: 'Kyiv History Museum',
    description: 'Websites, data storage, security and infrastructure.',
  },
  {
    when: 'Apr ’24',
    till: 'Aug ’26',
    where: 'UA',
    title: 'Lead Engineer',
    subtitle: 'VIDI Group',
    description: [
      'Websites across the group — technology, performance, release process. TypeScript, React and Next.js on the newer projects, Rspack on the older ones.',
      'CI/CD, code reviews, AI-assisted workflows.',
      'Significant PageSpeed and backend performance improvements.',
    ],
  },
  {
    isCurrent: true,
    when: 'Sep ’23',
    till: 'Now',
    where: 'UA, SE',
    title: 'Lead Full-stack Engineer',
    subtitle: 'KITRUM (contractor)',
    description: [
      "During the first two-month contract I completely reworked and improved the client's full-stack DAM (digital asset management) app: added role-based auth, CI/CD, 3D model preview and AR for mobile phones (USDZ/GLB), and built a custom admin panel.",
      'Tech stack: Google Cloud, TypeScript, Cloud SQL (Drizzle ORM, Postgres, dynamic schemas), Bun/Node.js, Next.js/React, HeroUI 2/Tailwind CSS, Zod, Better Auth, GraphQL/Yoga, TanStack Query.',
      'Thoroughly evaluated MongoDB 7 Atlas Search and Meilisearch performance for faceted search.',
    ],
  },
  {
    when: 'Nov ’22',
    till: 'Apr ’23',
    where: 'CA',
    title: 'Senior Frontend Engineer',
    subtitle: 'Windscribe / Control D',
    description:
      'While working on the Control D website and dashboard (React, Redux, TypeScript), I made three significant changes to the codebase: a major Gatsby upgrade, a major Cypress upgrade (with its extensive test suite) and fixes for hundreds of type-safety warnings. Took part in implementing the new dashboard version and design.',
  },
  {
    isHighlighted: true,
    when: 'May ’20',
    till: 'Aug ’22',
    where: 'UK',
    title: 'Principal Software Engineer',
    subtitle: 'Peppy Health',
    description: [
      'Joined the startup at a fairly early stage. Designed the architecture, built all the core infrastructure (cloud, database, CI/CD, E2E and unit tests) and the first major versions of the multi-role API and the admin panel.',
      'Integrated all the third-party services and webhooks the business needed (Sentry, Sendbird, Segment, Customer.io, Mixpanel and others). Security officer. Took part in various infrastructure and security audits. Code reviews for all projects (API, admin panel, mobile app). Mentoring and the technical side of team management.',
      'Tech stack: Google Cloud, TypeScript, Cloud SQL (TypeORM/Prisma), Node.js (NestJS), React and React Native apps.',
    ],
  },
  {
    isHighlighted: true,
    when: 'Sep ’17',
    till: 'May ’20',
    where: 'UA, US',
    title: 'Lead Front-end Developer',
    subtitle: 'Star (formerly Cogniance)',
    description: [
      '(1) A management app for a robotic warehouse.',
      'A game-like UI for watching and controlling robots and their automated workflows, on a map and in real time. TypeScript, React, Redux, PixiJS v4-5 / WebGL, Paper.js (not much), SVG, Node.js, Jest/Cypress, REST API client.',
      "(2) A customer area for a US state's transportation system: public transport tickets, parking, services for institutions.",
      'A responsive and accessible web app built from scratch. It lets users buy tickets and subscriptions and see everything about them, depending on location, season and account type. TypeScript, React, Redux, Material-UI (MUI), SVG, Node.js, unit tests (Jest), REST API client. ADA accessibility and security specialist.',
    ],
  },
  {
    when: 'Sep ’16',
    till: 'May ’17',
    where: 'SE',
    title: 'Tech Lead Front-end',
    subtitle: 'Match2One',
    description: [
      'A programmatic advertising platform. A rich web application for the customer area (React, Redux, ES2017, Less).',
      'Worked on the app architecture rework, a custom build system, complex components and the UI/UX implementation. Code reviews. Candidate interviews.',
    ],
  },
  {
    when: 'Dec ’12',
    till: 'Sep ’16',
    where: 'UA',
    title: 'Senior Front-end Developer → Tech Lead',
    subtitle: 'Luxoft',
    description: [
      'A hybrid cross-platform desktop application for a major HDD manufacturer, built from scratch (macOS, Windows).',
      'Electron, ES6 (React, Node.js), app prototyping, complex UI development, app localization, OS notifications, performance and memory/CPU efficiency, IPC, CI builds and tasks, unit tests (Jest) etc. Code reviews. Candidate interviews.',
    ],
  },
  {
    when: 'Jan ’11',
    till: 'Dec ’12',
    where: 'UA',
    title: 'Working on my own projects',
    description: [
      'Annexare. A web development and design studio. We made a lot of artwork and websites for artists, musicians, a record label and zine, and others. I built our own CMS for it (PHP, AJAX, jQuery, JSON, MySQL) to support everything we needed: multilingual content, SEO, speed, custom content types, social media integration. Some of those sites are still online, though the stack is pretty outdated.',
      'Soccer City. A real-time game for social networks (Facebook and others) with a Flash GUI, a PHP/MySQL backend and integrations with social network and payment APIs. The game combined an isometric city builder with online matchmaking based on team stats and a bit of randomness. With quests, achievements, in-game purchases and more. It was a pretty complex project. But when browsers dropped Flash, we decided not to rebuild the client for the modern web and closed the game.',
    ],
  },
  {
    when: 'Jun ’10',
    till: 'Jan ’11',
    where: 'US',
    title: 'Facebook Applications Developer',
    subtitle: 'Stuzo',
    description:
      "UI and backend development on the company's Facebook platform, based on Zend Framework and Doctrine. PHP, Facebook Graph API, FBML, Piwik, PDF generation and more.",
  },
  {
    when: 'Jan ’09',
    till: 'Feb ’10',
    where: 'UA, DE, IT',
    title: 'Software Engineer',
    subtitle: 'Lemsys',
    description:
      'Software for embedded devices: web applications, services and database schemas. Architecture and security. C/C++, Perl, UML/XML/XSLT, UPnP, SQLite.',
  },
  {
    when: 'Jun ’07',
    till: 'Jan ’09',
    where: 'UA',
    title: 'Middle → Senior .NET Developer',
    subtitle: 'Tikle / lifecell',
    description:
      'Architecture, internal services, web UI services, websites, applications and database schemas for a mobile operator, using ASP.NET, C#, MSSQL and SOAP/XML. Integration of partner services (bulk SMS and others).',
  },
]
