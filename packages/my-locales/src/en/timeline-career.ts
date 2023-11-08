import type { TimelineItem } from 'src/types'

export const careerTimeline: TimelineItem[] = [
  {
    when: 'Sep ’23',
    till: 'Nov ’23',
    where: 'UA, SE',
    title: 'Lead Full-stack Engineer',
    subtitle: 'KITRUM (contractor)',
    description: [
      'I did a complete rework and further improvement of the client app, added role-based auth, CI/CD, and created a custom admin panel during a 2-month contract.',
      'Tech stack was based on Google Cloud, TypeScript, RDS SQL (Drizzle ORM, Postgres, dynamic schemas). Node.js, Next.js/React, NextUI 2/Tailwind CSS, Zod, Next Auth, GraphQL/Yoga.',
      'Thoroughly evaluated Mongo DB 7 Atlas Search and Meilisearch performance for faceted search.',
    ],
  },
  {
    when: 'Nov ’22',
    till: 'Apr ’23',
    where: 'CA',
    title: 'Senior Frontend Engineer',
    subtitle: 'Windscribe / Control D',
    description:
      'While working on Control D website and dashboard (React, Redux, TypeScript), I did three significant codebase changes: major upgrades of Gatsby and Cypress (huge test coverage), fixed hundreds of warnings on type safety. Participated in new dashboard version/design implementation.',
  },
  {
    isHighlighted: true,
    when: 'May ’20',
    till: 'Aug ’22',
    where: 'UK',
    title: 'Principal Software Engineer',
    subtitle: 'Peppy Health',
    description: [
      'Joined this startup on a fairly early stage. Did architecture, implemented all core infrastructure (cloud, database, CI/CD, E2E/unit test coverage), implemented initial major versions of multi-role API and Admin Panel.',
      'Integrated all business required 3rd party services and webhooks (Sentry, SendBird, Segment, Customer.io, Mixpanel and others). Security officer. Participated in various infrastructure & security related audits. Did code reviews for all projects (API, admin panel, mobile app), mentorship and technical side of a team management.',
      'Tech stack was based on Google Cloud, TypeScript, RDS SQL (TypeOrm/Prisma). Node.js (NestJS), React and React Native apps.',
    ],
  },
  {
    isHighlighted: true,
    when: 'Sep ’17',
    till: 'May ’20',
    where: 'UA, US',
    title: 'Lead Front-end Developer',
    subtitle: 'Star (formely Cogniance)',
    description: [
      '(1) Robotized warehouse management app.',
      'A game-like UI to see and manage robots and their automated workflows — on a map and in a realtime. TypeScript, React, Redux, PixiJS v4-5 / WebGL, Paper.js (not much), SVG, Node, Jest/Cypress, REST API client.',
      '(2) Customer area for US State’s transportation system: public transport tickets, parking, services for institutions.',
      'A responsive and accessible web app from scratch, aims to help users purchase and review everything about their tickets and subscriptions, based on location, season and account type. TypeScript, React, Redux, Material-UI (MUI), SVG, Node, unit tests (Jest), REST API client. ADA accessibility & security specialist.',
    ],
  },
  {
    when: 'Sep ’16',
    till: 'May ’17',
    where: 'SE',
    title: 'Tech Lead Front-end',
    subtitle: 'Match2One',
    description: [
      'Programmatic advertising platform. Rich web application for customers area (React, Redux, ES2017, LESS).',
      'Was involved in app architecture rework, custom build system, complex components & UI/UX implementation. Code reviews. Candidate interviews.',
    ],
  },
  {
    when: 'Dec ’12',
    till: 'Sep ’16',
    where: 'UA',
    title: 'Senior Front-end Developer → Tech Lead',
    subtitle: 'Luxoft',
    description: [
      'Hybrid desktop cross-platform application for a major HDD manufacturer, from scratch (macOS, Windows).',
      'Electron, ES6 (React, Node.js), app prototyping, complex UI development, app localisation, OS notifications, performance & memory/CPU efficiency, IPC, CI builds & tasks, unit tests (Jest) etc. Code reviews. Candidate interviews.',
    ],
  },
  {
    when: 'Jan ’11',
    till: 'Dec ’12',
    where: 'UA',
    title: 'Working on own projects',
    description: [
      "Annexare. Web development & design studio. We've created a lot of art designs and websites for artists, musicians, record label & zine etc. I've build own CMS for this purpose (PHP, AJAX, jQuery, JSON, MySQL) to support everything we needed: multi-lingual content, SEO, speed, custom content types, social media integration. Some of those are still online, but the stack is pretty outdated.",
      "Soccer City. A real-time game for social networks (Facebook, VK and others) with Flash GUI, PHP/MySQL backend and integrated with different social network APIs and payments. The game combined isometric city-builder and online match-making based on the team stats and some amount of a random factor. With quests, achievements, in-game purchases and more. It was a pretty complex project. But since Flash became deprecated we didn't put effort to rework it for the modern web and it was closed.",
    ],
  },
  {
    when: 'Jun ’10',
    till: 'Jan ’11',
    where: 'US',
    title: 'Facebook Applications Developer',
    subtitle: 'Stuzo',
    description:
      'UI and backend implementation, using corporate Facebook Platform based on Zend framework and Doctrine. PHP, Facebook Graph API, FBML, Piwik, PDF generation and more.',
  },
  {
    when: 'Jan ’09',
    till: 'Feb ’10',
    where: 'UA, DE, IT',
    title: 'Software Engineer',
    subtitle: 'Lemsys',
    description:
      'Embedded devices software development: web applications, services and database schema. Architecture and security. C/C++, Perl, UML/XML/XSLT, UPnP, SQLite.',
  },
  {
    when: 'Jun ’07',
    till: 'Jan ’09',
    where: 'UA',
    title: 'Middle → Senior .NET Developer',
    subtitle: 'Tikle / lifecell',
    description:
      'Architecture, internal services, web UI services, websites, applications and database schema for mobile operator using ASP.NET, C#, MSSQL, SOAP/XML. Partner services integration (bulk SMS services etc).',
  },
]
