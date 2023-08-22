import type { TimelineItem } from 'src/types'

export const careerTimeline: TimelineItem[] = [
  {
    when: 'Nov ’22',
    till: 'Apr ’23',
    where: 'CA',
    title: 'Senior Frontend Engineer',
    subtitle: 'Windscribe / Control D',
    description:
      'Mainly working on Control D website, control panel &amp; dashboard. Gatsby, React/Redux/TypeScript. A lot of Cypress tests. Major Gatsby & Cypress upgrades, to most recent versions.',
  },
  {
    isHighlighted: true,
    when: 'May ’20',
    till: 'Aug ’22',
    where: 'UK',
    title: 'Principal Software Engineer',
    subtitle: 'Peppy Health',
    description: [
      'High-impact health support. Project based on a secure & modern tech stack — Google Cloud Platform, TypeScript/JavaScript. Node.js, React and React Native apps. Also NestJS, Prisma (PostgreSQL), Sentry, MUI, SendBird, Segment, Customer.io, Mixpanel and more.',
      'I was working on architecture, major features research/implementation (full-stack, mainly BE/CI), documentation, E2E/unit test coverage. Mentorship, code reviews. Security officer. Participate in various audits.',
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
      '1. Robotized warehouse management application.',
      'TypeScript, React (Hooks, Context, Redux), PixiJS v4-5 / WebGL, Paper.js (not much), SVG, Node, Jest/Cypress, REST.',
      '2. Customer area, responsive accessible application for state’s transportation system (public transport tickets, parking management, institutions).',
      'TypeScript, React, Redux, Material-UI (MUI), SVG, Node, unit tests via Jest, CRA v2+, REST. ADA accessibility & security specialist.',
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
      'App architecture rework. Custom builds (Gulp, Rollup). Custom components & UI/UX implementation. Code reviews. Candidate interviews.',
    ],
  },
  {
    when: 'Dec ’12',
    till: 'Sep ’16',
    where: 'UA',
    title: 'Senior Front-end Developer → Tech Lead',
    subtitle: 'Luxoft',
    description: [
      'Hybrid desktop cross-platform application (macOS, Windows) from scratch. Electron, ES6 (React, Node.js), app prototyping, complex UI development, app localisation, OS notifications, performance & memory/CPU efficiency, IPC, CI builds & Gulp tasks, Jest tests, etc. Code reviews. Candidate interviews.',
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
