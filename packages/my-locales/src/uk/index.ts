import { ESocialLinks } from 'my-constants'
import type { Translation } from 'src'

import { skillLevel } from './constants'
import { interests } from './interests'
import { skills } from './skills'
import { careerTimeline } from './timeline-career'
import { generalTimeline } from './timeline-general'

export const uk: Translation = {
  fullName: 'Дмитро Клименко',
  name: 'Дмитро',
  meta: {
    description: `Мене звати Дмитро. Цікавлюсь технологіями, веб розробкою, музикою, подорожами, космосом та іншим.`,
    keywords: 'Веб-розробка, музика, подорожі',
  },
  actions: {
    backHome: 'Повернутись на головну',
    closeMenu: 'Закрити меню',
    openMenu: 'Відкрити меню',
  },
  builtWith: 'Розроблено з',
  skillLevel,
  skillsTitle: 'Мої навички',
  skills,
  generalTitle: 'Загальна хронологія',
  generalTimeline,
  careerTitle: "Моя кар'єра",
  careerTimeline,
  interests,
  myStudio: 'Моя студія, місце де працюю та займаюсь музикою',
  openToWork: 'Шукаю проект',
  socialMedia: {
    title: 'Посилання на соціальні мережі',
    description: 'Мій GitHub, LinkedIn та інші профілі у соціальних мережах.',
    generatedFromWebsiteData: 'PDF, згенеровано з опублікованих даних',
    personal: 'Особисті профілі',
    work: 'Моя робота',
    [ESocialLinks.github]: 'Мої опен-сорс проекти та активність',
    [ESocialLinks.linkedin]: 'Єдиний актуальний профіль',
    [ESocialLinks.telegram]: 'Прямий контакт',
  },
  saveLev: {
    message:
      'На превеликий жаль, у мого племінника Лева діагностували СМА у віці 8.5 місяців.' +
      ' Ми зразу ж почали лікування та збір коштів щоб врятувати йому життя.',
    linkTitle: 'Більше деталей та допомогти Леву можна тут',
  },
  supportUkraine: {
    message: (day: number) =>
      'Я народився і живу в Україні.' +
      ' І зараз моя країна захищається від повномасштабного вторгнення росії.' +
      ` Сьогодні день ${day} боротьби за демократію, наше існування та свободу 🇺🇦`,
    linkTitle: 'Дізнатись як я можу допомогти',
  },
}
