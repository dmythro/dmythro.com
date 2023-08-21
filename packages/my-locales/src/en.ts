import { ESocialLinks } from 'my-constants'

export interface InterestLocale {
  title: string
  description: string
  tldr?: string
  text?: string[]
}

export interface TimelineItem {
  title?: string
  subtitle?: string
  description?: string | string[]
  where?: string
  when?: string
  till?: string
  isHighlighted?: boolean
}

const interests: Record<string, InterestLocale> = {
  webDev: {
    title: 'Web Development, Career, Education',
    description:
      'TypeScript, Node.js, Nest, React, Next.js/Astro, PostgreSQL, Drizzle/Prisma, Google Cloud/Vercel.',
  },
  music: {
    title: 'Music',
    description:
      'I love both listening and playing music, have a small record label and record collection.',
  },
  travel: {
    title: 'Travel',
    description:
      'Car trips, sunsets, night skies, camping.' +
      ' Also sightseeing, museums, a bit of history and culture.',
  },
  hobbies: {
    title: 'Hobbies',
    description:
      'Tech, gear, design, games.' +
      ' Smart home (HomeKit, Zigbee), automations.' +
      ' Snowboarding, surfing, cycling, scooters, longboards etc.',
  },
  faq: {
    title: 'FAQ',
    description: 'Answers to your frequently asked questions.',
  },
  links: {
    title: 'Links & Social Media',
    description: 'Check out my GitHub, LinkedIn or other profiles.',
  },
}

const generalTimeline: TimelineItem[] = [
  {
    isHighlighted: true,
    when: '2016',
    till: 'Now',
    title: 'Principal Engineer / Tech Lead',
    description:
      'My preferred role for now is something around Principal Engineer / Tech Lead, where I still can concentrate on bigger tasks without much of a management work distraction.',
  },
  {
    when: '2014',
    title: 'Lead Developer',
    description:
      'During work for Luxoft managed to get a promotion. Mainly been working with JS/CSS, React, Node.js, Electron.',
  },
  {
    when: '2008',
    title: 'Senior Developer',
    description:
      'During work for Tikle managed to get a promotion. Been working with C#.NET, MSSQL, JS/CSS.',
  },
  {
    isHighlighted: true,
    when: '2009',
    where: 'UA',
    title: "Education: Master's Degree Graduate",
    subtitle: 'NTUU "KPI", FAM, SCS',
    description: [
      'Graduate of National Technical University of Ukraine "Kyiv Polytechnical Institute", Faculty of Applied Math, Department of Specialized Computer Systems.',
      'I would say quite a good choice in the context of my career: programming (Pascal, C#, .NET, C++, Assembler), algorithms and data structures, graphs, probability theory, databases (MSSQL) and much more.',
      'In 2006, while being a student, registered as PE and got my first official job as a Software Engineer. At the time I was working as a ASP/.NET developer.',
    ],
  },
  {
    when: '2003',
    where: 'UA',
    title: 'Education: Graduate of Secondary School',
    description:
      'During secondary school time I also graduated from Music school (accordion and folk instruments) and attended Sports swimming school all the time (candidate for master of sports).',
  },
]
const careerTimeline: TimelineItem[] = [
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

export const en = {
  fullName: 'Dmytro Klymenko',
  name: 'Dmytro',
  meta: {
    description: `My name is Dmytro and I love tech, web development, music, traveling, space and many more.`,
    keywords: 'Web Dev, Music, Travel',
  },
  actions: {
    closeMenu: 'Close menu',
    openMenu: 'Open menu',
  },
  builtWith: 'Built with',
  generalTitle: 'General Timeline',
  generalTimeline,
  careerTitle: 'My Career',
  careerTimeline,
  interests,
  myStudio: 'My studio, where I do all my work',
  openToWork: 'Open to work',
  socialMedia: {
    title: 'Links & Social Media',
    description: 'Check out my GitHub, LinkedIn or other social media profiles.',
    generatedFromWebsiteData: 'PDF, generated from published data',
    personal: 'Personal Links',
    work: 'My Work',
    [ESocialLinks.github]: 'My open-source projects & activity',
    [ESocialLinks.linkedin]: 'The only up-to-date profile',
    [ESocialLinks.telegram]: 'Direct contact',
  },
  saveLev: {
    message:
      'Unfortunately, my nephew Lev was diagnosed with SMA when he was 8.5 months old.' +
      ' We started a treatment and fundraiser immediately to save his life.',
    linkTitle: 'More details, support Lev here',
  },
  supportUkraine: {
    message: (day: number) =>
      'I was born and live in Ukraine.' +
      ' Now, my country is under a full-scale invasion by russia.' +
      ` Today is Day ${day} of fight for democracy, our existense and freedom 🇺🇦`,
    linkTitle: 'Find out how you can help',
  },
}

export type Translation = typeof en
export type TranslationKeys = keyof Translation
