import { ESocialLinks } from 'my-constants'

import { interests } from './interests'
import { skills } from './skills'
import { careerTimeline } from './timeline-career'
import { generalTimeline } from './timeline-general'

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
  skills,
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
