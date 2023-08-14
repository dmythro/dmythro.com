import { ESocialLinks, USERNAME } from 'my-constants'
import type { InterestLocale, Translation } from '.'

const interests: Record<string, InterestLocale> = {
  webDev: {
    title: "Веб розробка, кар'єра, освіта",
    description:
      'TypeScript, Node.js, Nest, Next.js, PostgreSQL, Prisma/TypeOrm, Google Cloud/Vercel.',
  },
  music: {
    title: 'Музика',
    description:
      'Я люблю як слухати так і грати музику, маю невеличкий лейбл звукозапису та колекцію музики на фізичних носіях.',
  },
  travel: {
    title: 'Подорожі',
    description:
      'Поїздки на авто, заходи сонця, нічне небо, кемпінг.' +
      " Також огляд визначних пам'яток, музеї, трохи історії та культурного обміну.",
  },
  hobbies: {
    title: 'Хоббі',
    description:
      'Технології, пристрої, дизайн, ігри.' +
      ' Розумний будинок (HomeKit, Zigbee), автоматизації.' +
      ' Сноуборд, серфінг, велосипеди, самокати, лонгборд тощо.',
  },
}

export const uk: Translation = {
  fullName: 'Дмитро Клименко',
  name: 'Дмитро',
  meta: {
    description: `Мене звати Дмитро (${USERNAME}) і мене цікавлять технології, веб розробка, музика, подорожі, космос та багато іншого.`,
    keywords: 'Веб-розробка, музика, подорожі',
  },
  actions: {
    closeMenu: 'Закрити меню',
    openMenu: 'Відкрити меню',
  },
  builtWith: 'Розроблено з',
  interests,
  openToWork: 'Шукаю проект',
  socialMedia: {
    title: 'Посилання на соціальні мережі',
    description: 'Мій GitHub, LinkedIn та інші профілі у соціальних мережах.',
    generatedFromLinkedIn: 'PDF, згенеровано з LinkedIn',
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