import { ESocialLinks } from '@dmythro/constants'

import type { Translation } from '..'
import { skillLevel } from './constants'
import { interests } from './interests'
import { skills } from './skills'
import { careerTimeline } from './timeline-career'
import { generalTimeline } from './timeline-general'

export const uk: Translation = {
  fullName: 'Дмитро Клименко',
  name: 'Дмитро',
  meta: {
    description:
      'Мене звати Дмитро. Цікавлюсь технологіями, веб розробкою, музикою, подорожами, космосом та іншим.',
    descriptionShort: 'Веб-розробка, технології, музика, подорожі',
    keywords:
      'Веб-розробка, музика, подорожі, Дмитро Клименко, профіль, CV, резюме, LinkedIn, GitHub',
  },
  actions: {
    backHome: 'Повернутись на головну',
    closeMenu: 'Закрити меню',
    openMenu: 'Відкрити меню',
    language: 'Мова',
    theme: 'Тема',
    themeSystem: 'Системна',
    themeDark: 'Темна',
    themeLight: 'Світла',
    downloadPdf: 'Завантажити PDF',
    switchLang: 'Українська (click to switch to English)',
  },
  builtWithTitle: 'Технології',
  builtWithDescription: 'Персональний вебсайт та портфоліо, відкритий код на GitHub.',
  builtWithTable: {
    category: 'Категорія',
    framework: 'Фреймворк',
    uiLibrary: 'UI бібліотека',
    styling: 'Стилізація',
    language: 'Мова',
    interactivity: 'Інтерактивність',
    transitions: 'Переходи',
    runtime: 'Середовище',
    deployment: 'Деплой',
    monorepo: 'Монорепо',
    linting: 'Лінтинг',
    i18n: 'i18n',
    notUsed: 'Не використовувалось',
  },
  builtWith: 'Технології',
  cv: {
    title: 'Вітаю 👋',
    description: (years: number) => [
      `Мене звати Дмитро, я інженер-програміст і розробник повного стеку з більш ніж ${years}-річним професійним досвідом.`,
      'Мені подобається вирішувати складніші задачі та гарна командна робота. Завжди прагну надавати якісні рішення у розумні терміни.',
    ],
  },
  skillLevel,
  skillsTitle: 'Мої навички',
  skills,
  generalTitle: 'Загальна хронологія',
  generalTimeline,
  careerTitle: "Моя кар'єра",
  careerTimeline,
  interests,
  myStudio: 'Моя студія, місце де працюю та займаюсь музикою',
  fullTimeEmployment: 'Повна зайнятість',
  openToWork: 'Шукаю проект',
  contact: {
    title: 'Контакти та соцмережі',
    subtitle: 'Знайдіть мене в соцмережах або напишіть напряму.',
    directContact: 'Прямий контакт',
  },
  socialMedia: {
    title: 'Посилання на соціальні мережі',
    description: 'Мій GitHub, LinkedIn та інші профілі у соціальних мережах.',
    generatedFromWebsiteData: 'PDF, згенеровано з опублікованих даних',
    personal: 'Особисті профілі',
    work: 'Моя робота',
    [ESocialLinks.github]: 'Мої опен-сорс проекти та активність',
    [ESocialLinks.linkedin]: 'Єдиний актуальний профіль',
    [ESocialLinks.telegram]: 'Прямий контакт',
    [ESocialLinks.bluesky]: 'Мікроблог та оновлення',
    [ESocialLinks.threads]: 'Threads від Meta',
    [ESocialLinks.instagram]: 'Фото та історії',
    [ESocialLinks.facebook]: 'Особистий профіль',
    [ESocialLinks.twitter]: 'Профіль X / Twitter',
    [ESocialLinks.nostr]: 'Децентралізована мережа',
  },
  saveLev: {
    message:
      'На превеликий жаль, у мого племінника Лева діагностували СМА у віці 8.5 місяців.' +
      ' Ми зразу ж почали лікування та збір коштів щоб врятувати йому життя.',
    linkTitle: 'Більше деталей та допомогти Леву можна тут',
  },
  supportUkraine: {
    message: (day: number) =>
      `Я народився і живу в Україні. І зараз моя країна захищається від повномасштабного вторгнення росії. Сьогодні день ${day} боротьби за демократію, наше існування та свободу 🇺🇦`,
    linkTitle: 'Дізнатись як я можу допомогти',
  },
  projects: {
    title: 'Проєкти',
    description: 'Проєкти, якими можу поділитися.',
    otherProjects: 'Інші проєкти',
    categories: {
      all: 'Всі',
      dev: 'Розробка',
      music: 'Музика',
      photos: 'Фото',
    },
  },
  nav: {
    home: 'Головна',
    projects: 'Проєкти',
    cv: 'CV',
    tools: 'Інструменти',
    faq: 'FAQ',
    contact: 'Контакти',
  },
  landing: {
    heroDescription:
      'Цікавлюсь технологіями, веб розробкою, музикою, ШІ, подорожами, фотографією та іншим. Київ, Україна.',
    tldr: 'TL;DR',
    cvLink: 'Переглянути повне CV →',
    beyondCode: 'Не тільки код',
    beyondCodeSubtitle: 'Музика, подорожі та все, що тримає в тонусі.',
    featuredProjects: 'Проєкти',
    viewAll: 'всі проєкти →',
    stats: {
      years: 'років досвіду',
      linesOfCode: 'рядків коду',
      downloads: 'завантажень/міс',
      stars: 'зірок',
    },
  },
  guitars: {
    stringTension: {
      pageTitle: 'Гітари',
      title: 'Калькулятор натягу струн',
      description:
        'Розрахунок натягу струн для гітари та басу. Підтримка мультимензурних інструментів, різних строїв, брендів та матеріалів струн.',
      instrumentType: 'Тип інструмента',
      guitar: 'Гітара',
      bass: 'Бас',
      guitarPreset: 'Пресет гітари',
      bassPreset: 'Пресет басу',
      stringPreset: 'Пресет струн',
      strings: 'Струни',
      tuning: 'Стрій',
      material: 'Матеріал',
      scaleLast: 'Мензура останньої',
      scaleFirst: 'Мензура 1-ї',
      scale: 'Мензура',
      note: 'Нота',
      gauge: 'Калібр',
      tension: 'Натяг',
      totalTension: 'Загальний натяг',
      tunings: {
        e: 'E Стандарт',
        'e-drop-d': 'E Drop D',
        eb: 'Eb Стандарт',
        d: 'D Стандарт',
        b: 'B Стандарт',
      },
      materials: {
        'nickel-wound': 'Нікелева обмотка',
        'stainless-wound': 'Нержавіюча сталь',
        'pure-nickel': 'Чистий нікель',
      },
      indicator: {
        optimal: 'Оптимально',
        vsBaseline: 'від',
      },
    },
  },
}
