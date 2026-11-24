import { ESocialLinks, USERNAME } from '@dmythro/constants'

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
      'Мене звати Дмитро. Цікавлюсь технологіями, веброзробкою, музикою, подорожами, космосом і не тільки.',
    descriptionShort: 'Веброзробка, технології, музика, подорожі',
    keywords:
      'Веброзробка, музика, подорожі, Дмитро Клименко, профіль, CV, резюме, LinkedIn, GitHub',
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
    themeSystemTip: 'Системна тема',
    themeDarkTip: 'Темна тема',
    themeLightTip: 'Світла тема',
    downloadPdf: 'Завантажити PDF',
    downloadPdfTooltip: (size: string) => `Завантажити CV у форматі PDF, ${size}`,
    switchLang: 'Українська (click to switch to English)',
  },
  builtWithTitle: 'Відкритий код',
  builtWithDescription:
    'Цей сайт — з відкритим кодом і повністю зроблений на відкритих технологіях.',
  builtWithTable: {
    category: 'Категорія',
    framework: 'Фреймворк',
    uiLibrary: 'UI-бібліотека',
    styling: 'Стилізація',
    language: 'Мова',
    interactivity: 'Інтерактивність',
    runtime: 'Середовище',
    deployment: 'Розгортання',
    monorepo: 'Монорепо',
    linting: 'Лінтинг',
    i18n: 'i18n',
    v1: 'v1 (до березня 2026)',
  },
  builtWith: 'Відкритий код',
  builtWithIntro: 'Цей вебсайт повністю з відкритим кодом і доступний на',
  builtWithIntroAfter:
    'Він повністю зроблений на відкритих інструментах, від фреймворку до лінтера. Комерційний тут лише хостинг — Cloudflare.',
  builtWithVersions:
    'У репозиторії дві версії цього вебсайту. Поточна працює на Astro. Попередня, на Next.js, лишилася для довідки, і я її більше не підтримую. Поки обидві показували однаковий контент, кожна набирала 100% у PageSpeed. Для такого простого сайту, як цей, підходить будь-який із двох стеків, а в складнішому проєкті вибирати треба з огляду на його вимоги.',
  builtWithProjectsCta: 'Переглянути інші мої проєкти з відкритим кодом →',
  cv: {
    title: 'Вітаю 👋',
    description: (years: number) => [
      `Мене звати Дмитро, я інженер-програміст і full-stack розробник із більше ніж ${years}-річним професійним досвідом.`,
      'З 2024 року чималу частину коду в моїх проєктах пишуть ШІ-агенти. Архітектуру й правила задаю я, а кожну зміну перевіряю сам перед мержем.',
      'Мені подобаються складні завдання та гарна командна робота. Завжди прагну зробити все якісно і вчасно.',
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
  myStudio: 'Моя студія: тут я працюю й займаюся музикою',
  fullTimeEmployment: 'Повна зайнятість',
  openToWork: 'Шукаю проєкт',
  contact: {
    title: 'Контакти та соцмережі',
    subtitle: 'Знайдіть мене в соцмережах або напишіть мені безпосередньо.',
    directContact: 'Прямий контакт',
  },
  socialMedia: {
    title: 'Посилання на соціальні мережі',
    description: 'Мій GitHub, LinkedIn та інші профілі в соціальних мережах.',
    generatedFromWebsiteData: 'PDF, згенерований з опублікованих даних',
    personal: 'Особисті профілі',
    work: 'Моя робота',
    [ESocialLinks.github]: 'Мої проєкти з відкритим кодом та активність',
    [ESocialLinks.linkedin]: 'Єдиний актуальний профіль',
    [ESocialLinks.telegram]: 'Прямий контакт',
    [ESocialLinks.bluesky]: 'Мікроблог та оновлення',
    [ESocialLinks.threads]: 'Threads (Meta)',
    [ESocialLinks.instagram]: 'Фото та історії',
    [ESocialLinks.facebook]: 'Особистий профіль',
    [ESocialLinks.twitter]: 'Профіль X / Twitter',
    [ESocialLinks.nostr]: 'Децентралізована мережа',
  },
  saveLev: {
    message:
      'На превеликий жаль, у мого племінника Лева діагностували СМА у віці 8,5 місяця.' +
      ' Ми зразу ж почали лікування та збір коштів, щоб урятувати йому життя.',
    linkTitle: 'Дізнатися більше й допомогти Леву можна тут',
  },
  supportUkraine: {
    message: (day: number) =>
      `Я народився й живу в Україні. І зараз моя країна захищається від повномасштабного вторгнення росії. Сьогодні ${day}-й день боротьби за демократію, наше існування та свободу 🇺🇦`,
    linkTitle: 'Дізнатись, як я можу допомогти',
  },
  projects: {
    title: 'Проєкти',
    description:
      'Робота, яку можу показати публічно, — відкритий код, інструменти й власні проєкти.',
    otherProjects: 'Інші проєкти',
    onThisPage: 'На цій сторінці',
    visitSite: 'Перейти на сайт',
    backToTop: 'Угору',
    install: 'Встановлення',
    copy: 'Копіювати',
    copied: 'Скопійовано',
    feedTitle: USERNAME,
    feedDescription:
      'Нові проєкти, важливі оновлення в моїх проєктах з відкритим кодом, а також зміни в CV і контактах.',
    meta: {
      title: 'Деталі',
      by: 'Автор',
      with: 'Разом з',
      publishedBy: 'Опубліковано',
      on: 'на',
      language: 'Мова',
      builtWith: 'Зроблено на',
      started: 'Початок',
      updated: 'Оновлено',
    },
    status: {
      live: 'Готово',
      wip: 'У роботі',
      planned: 'У планах',
      archived: 'В архіві',
    },
    categories: {
      all: 'Усі',
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
      'Цікавлюсь технологіями, веброзробкою, музикою, ШІ, подорожами, фотографією та іншим. Київ, Україна.',
    tldr: 'TL;DR',
    tldrHint: "Too long; didn't read — коротко про головне",
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
      title: 'Калькулятор натягу гітарних струн',
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
      // Виноска під калькулятором із посиланням на опис проєкту
      aboutNote: 'Як це працює й звідки числа —',
      aboutLink: 'читайте повний опис проєкту',
      // Підписи рядків для читачів з екрана, після кожного йде номер струни
      scaleFor: 'Мензура струни',
      noteFor: 'Нота струни',
      gaugeFor: 'Калібр струни',
      tunings: {
        e: 'E Стандарт',
        'e-drop-d': 'E Drop D',
        eb: 'Eb Стандарт',
        d: 'D Стандарт',
        b: 'B Стандарт',
      },
      materials: {
        'nickel-wound': 'Нікелева обмотка',
        'stainless-wound': 'Нержавна сталь',
        'pure-nickel': 'Чистий нікель',
      },
      indicator: {
        optimal: 'Оптимально',
        vsBaseline: 'від',
      },
    },
  },
}
