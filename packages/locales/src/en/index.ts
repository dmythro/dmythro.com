import { ESocialLinks } from '@dmythro/constants'

import { skillLevel } from './constants'
import { interests } from './interests'
import { skills } from './skills'
import { careerTimeline } from './timeline-career'
import { generalTimeline } from './timeline-general'

export type { InterestKey } from './interests'

export const en = {
  fullName: 'Dmytro Klymenko',
  name: 'Dmytro',
  meta: {
    description:
      'My name is Dmytro and I love tech, web development, music, traveling, space and many more.',
    descriptionShort: 'Web Dev, Tech, Music, Travel',
    keywords: 'Web Dev, Music, Travel, Dmytro Klymenko, profile, CV, resume, LinkedIn, GitHub',
  },
  actions: {
    backHome: 'Back to main page',
    closeMenu: 'Close menu',
    openMenu: 'Open menu',
    language: 'Language',
    theme: 'Theme',
    themeSystem: 'System',
    themeDark: 'Dark',
    themeLight: 'Light',
    downloadPdf: 'Download PDF',
    switchLang: 'English (натисніть щоб була Українська)',
  },
  builtWithTitle: 'Open Source',
  builtWithDescription: 'This site is open source — built entirely with open-source technologies.',
  builtWithTable: {
    category: 'Category',
    framework: 'Framework',
    uiLibrary: 'UI Library',
    styling: 'Styling',
    language: 'Language',
    interactivity: 'Interactivity',
    transitions: 'Transitions',
    runtime: 'Runtime',
    deployment: 'Deployment',
    monorepo: 'Monorepo',
    linting: 'Linting',
    i18n: 'i18n',
    notUsed: 'Not used',
    v1: 'v1 (before March 2026)',
  },
  builtWith: 'Open Source',
  builtWithIntro: 'This website is fully open source and available on',
  builtWithIntroAfter:
    'It is built entirely with open-source technologies — from the framework to the deployment platform.',
  builtWithProjectsCta: 'See my other open-source projects →',
  cv: {
    title: 'Hi 👋',
    description: (years: number) => [
      `My name is Dmytro and I am a software engineer and full-stack developer with more than ${years} years of professional experience.`,
      'I enjoy complex tasks and good teamwork; always aim to deliver quality solutions in a reasonable time.',
    ],
  },
  skillLevel,
  skillsTitle: 'My Skills',
  skills,
  generalTitle: 'General Timeline',
  generalTimeline,
  careerTitle: 'My Career',
  careerTimeline,
  interests,
  myStudio: 'My studio, where I do all my work and music',
  fullTimeEmployment: 'Full-time employment',
  openToWork: 'Open to work',
  contact: {
    title: 'Contact & Social Media',
    subtitle: 'Find me on social media or reach out directly.',
    directContact: 'Direct Contact',
  },
  socialMedia: {
    title: 'Links & Social Media',
    description: 'Check out my GitHub, LinkedIn or other social media profiles.',
    generatedFromWebsiteData: 'PDF, generated from published data',
    personal: 'Personal Links',
    work: 'My Work',
    [ESocialLinks.github]: 'My open-source projects & activity',
    [ESocialLinks.linkedin]: 'The only up-to-date profile',
    [ESocialLinks.telegram]: 'Direct contact',
    [ESocialLinks.bluesky]: 'Microblogging & updates',
    [ESocialLinks.threads]: 'Threads by Meta',
    [ESocialLinks.instagram]: 'Photos & stories',
    [ESocialLinks.facebook]: 'Personal profile',
    [ESocialLinks.twitter]: 'X / Twitter profile',
    [ESocialLinks.nostr]: 'Decentralized social',
  },
  saveLev: {
    message:
      'Unfortunately, my nephew Lev was diagnosed with SMA when he was 8.5 months old.' +
      ' We started a treatment and fundraiser immediately to save his life.',
    linkTitle: 'More details, support Lev here',
  },
  supportUkraine: {
    message: (day: number) =>
      `I was born and live in Ukraine. Now, my country is under a full-scale invasion by russia. Today is Day ${day} of fight for democracy, our existense and freedom 🇺🇦`,
    linkTitle: 'Find out how you can help',
  },
  projects: {
    title: 'Projects',
    description: 'The projects I can share and showcase.',
    otherProjects: 'Other projects',
    categories: {
      all: 'All',
      dev: 'Dev',
      music: 'Music',
      photos: 'Photos',
    },
  },
  nav: {
    home: 'Home',
    projects: 'Projects',
    cv: 'CV',
    tools: 'Tools',
    faq: 'FAQ',
    contact: 'Contacts',
  },
  landing: {
    heroDescription:
      'Passionate about tech, web development, music, AI, traveling, photography and more. Kyiv, Ukraine.',

    tldr: 'TL;DR',
    cvLink: 'Read full CV →',
    beyondCode: 'Beyond Code',
    beyondCodeSubtitle: 'Music, travel, and everything else that keeps me going.',
    featuredProjects: 'Projects',
    viewAll: 'all projects →',
    stats: {
      years: 'years of experience',
      linesOfCode: 'lines of code',
      downloads: 'downloads/mo',
      stars: 'stars',
    },
  },
  guitars: {
    stringTension: {
      pageTitle: 'Guitars',
      title: 'String Tension Calculator',
      description:
        'Calculate string tension for guitar and bass. Supports multi-scale instruments, various tunings, string brands and materials.',
      instrumentType: 'Instrument type',
      guitar: 'Guitar',
      bass: 'Bass',
      guitarPreset: 'Guitar Preset',
      bassPreset: 'Bass Preset',
      stringPreset: 'String Preset',
      strings: 'Strings',
      tuning: 'Tuning',
      material: 'Material',
      scaleLast: 'Scale last',
      scaleFirst: 'Scale 1st',
      scale: 'Scale',
      note: 'Note',
      gauge: 'Gauge',
      tension: 'Tension',
      totalTension: 'Total tension',
      tunings: {
        e: 'E Standard',
        'e-drop-d': 'E Drop D',
        eb: 'Eb Standard',
        d: 'D Standard',
        b: 'B Standard',
      },
      materials: {
        'nickel-wound': 'Nickel Wound',
        'stainless-wound': 'Stainless Steel',
        'pure-nickel': 'Pure Nickel',
      },
      indicator: {
        optimal: 'Optimal',
        vsBaseline: 'vs',
      },
    },
  },
}

export type Translation = typeof en
export type TranslationKeys = keyof Translation
