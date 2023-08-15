import { ESocialLinks } from 'my-constants'
import type { InterestLocale, TimelineItem, Translation } from './index'

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
  faq: {
    title: 'FAQ',
    description: 'Відповіді на ваші часті питання.',
  },
}

const generalTimeline: TimelineItem[] = [
  {
    isHighlighted: true,
    when: 'Зараз',
    title: 'Principal Engineer / Tech Lead',
    description:
      "Найцікавіша для мене роль зараз це щось між Principal Engineer / Tech Lead, де я все ще можу зосередитись на більших задачах, не дуже відволікаючись на менеджерські обов'язки.",
  },
  {
    when: '2014',
    title: 'Lead Developer',
    description:
      'Отримав підвищення працюючи на Luxoft. В основному, працював з JS/CSS, React, Node.js, Electron.',
  },
  {
    when: '2008',
    title: 'Senior Developer',
    description: 'Отримав підвищення працюючи на Tikle. Працював з C#.NET, MSSQL, JS/CSS.',
  },
  {
    isHighlighted: true,
    when: '2009',
    where: 'UA',
    title: 'Вища освіта',
    subtitle: 'НТУУ "КПІ", ФПМ, СКС',
    description: [
      'Випускник Національного технічного університету України "Київський політехнічний інститут", факультет Прикладної математики, кафедра Спеціалізованих комп\'ютерних систем.',
      "Я би сказав, досить вдалий вибір у контексті моєї кар'єри: програмування (Pascal, C#, .NET, C++, Assembler), алгоритми і структури даних, графи, теорія імовірностей, бази даних (MSSQL) і ще багато чого.",
      'В 2006 році зареєстрував ФОП та отримав першу офіційну роботу як інженер-програміст. На той момент працював з ASP/.NET.',
    ],
  },
  {
    when: '2003',
    where: 'UA',
    title: 'Середня освіта',
    description:
      'Протягом навчання у середній школі закінчив музичку школу (баян та народні інструменти) та весь час відвідував спортивну школу з плавання (кандидат в майстри спорту).',
  },
]
const careerTimeline: TimelineItem[] = [
  {
    when: 'Лис ’22',
    till: 'Кві ’23',
    where: 'CA',
    title: 'Senior Frontend Engineer',
    subtitle: 'Windscribe / Control D',
    description:
      'В основному працював над веб-сайтом та контрольною панеллю Control D. Gatsby, React/Redux/TypeScript, багато Cypress тестів. Мажорні апгрейди Gatsby та Cypress до свіжих версій.',
  },
  {
    isHighlighted: true,
    when: 'Тра ’20',
    till: 'Сер ’22',
    where: 'UK',
    title: 'Principal Software Engineer',
    subtitle: 'Peppy Health',
    description: [
      'Ефективна підтримка здоров’я. Проект, заснований на безпечному та сучасному стеку технологій — Google Cloud Platform, TypeScript/JavaScript. Додатки на базі Node.js, React та React Native. Також NestJS, Prisma (PostgreSQL), Sentry, MUI, SendBird, Segment, Customer.io, Mixpanel тощо.',
      'Я працював над архітектурою, дослідженням/імплементацією основної функціональності (full-stack, в основному BE/CI), документацією, покриттям E2E/юніт тестами. Менторство, перевірка коду. Офіцер з безпеки. Приймав участь у різноманітних аудитах.',
    ],
  },
  {
    isHighlighted: true,
    when: 'Вер ’17',
    till: 'Тра ’20',
    where: 'UA, US',
    title: 'Lead Front-end Developer',
    subtitle: 'Star (formely Cogniance)',
    description: [
      '1. Програма для управління роботизованим складом.',
      'TypeScript, React (Hooks, Context, Redux), PixiJS v4-5 / WebGL, Paper.js, SVG, Node, Jest/Cypress, REST.',
      '2. Клієнтська зона, адаптивний доступний додаток для транспортної системи штату (квитки на громадський транспорт, управління паркуванням, установи).',
      'TypeScript, React, Redux, Material-UI (MUI), SVG, Node, Jest, CRA v2+, REST. Спеціаліст із доступності та безпеки по ADA.',
    ],
  },
  {
    when: 'Вер ’16',
    till: 'Тра ’17',
    where: 'SE',
    title: 'Tech Lead Front-end',
    subtitle: 'Match2One',
    description: [
      'Програмована рекламна платформа. Веб-додаток для клієнтської зони (React, Redux, ES2017, LESS).',
      'Нова архітектура. Спеціальні білди (Gulp, Rollup). Перевірка коду. Співбесіди з кандидатами.',
    ],
  },
  {
    when: 'Гру ’12',
    till: 'Вер ’16',
    where: 'UA',
    title: 'Senior Front-end Developer → Tech Lead',
    subtitle: 'Luxoft',
    description: [
      'Гібридний кросплатформний додаток (macOS, Windows) з нуля. Electron, ES6 (React, Node.js), прототипування, комплексні UI, локалізація, системні сповіщення, performance & memory/CPU efficiency, IPC, CI builds & Gulp tasks, Jest tests, etc. Перевірка коду. Співбесіди з кандидатами.',
    ],
  },
  {
    when: 'Січ ’11',
    till: 'Гру ’12',
    where: 'UA',
    title: 'Робота над власними проектами',
    description: [
      'Annexare. Студія веб-розробки та дизайну. Ми розробили багато арт дизайнів та веб-сайтів для артистів, музикантів, музичного лейблу та журналу тощо. Розробив власну CMS для цього (PHP, AJAX, jQuery, JSON, MySQL) щоб підтримувала все що нам було треба: багатомовний контент, SEO, швидкість, спеціальні типи контенту, інтеграція з соц-мережами. Деякі з них досі онлайн, але технічний стек досить застарілий.',
      'Soccer City. Гра у реальному часі для соціальних мереж (Facebook, VK та інші) з Flash GUI, PHP/MySQL бекендом та різними інтегрованими API соціальних переж та платежів. Гра комбінувала ізометричний сіті-білдер та онлайн матч-мейкінг що враховував як показники команди так і деякий фактор випадковості. З квестами, досягненнями, внутрішньоігрові покупки тощо. Це був досить непростий проект. Але коли Flash пішов з браузерів ми не стали переробляти клієнт для сучасних браузерів і закрили.',
    ],
  },
  {
    when: 'Чер ’10',
    till: 'Січ ’11',
    where: 'US',
    title: 'Facebook Applications Developer',
    subtitle: 'Stuzo',
    description:
      'Розробка UI та бекенду, використовуючи корпоративну Facebook Platform на базі Zend framework та Doctrine. PHP, Facebook Graph API, FBML, Piwik, генерування PDF та інше.',
  },
  {
    when: 'Січ ’09',
    till: 'Лют ’10',
    where: 'UA, DE, IT',
    title: 'Software Engineer',
    subtitle: 'Lemsys',
    description:
      'Розробка ПЗ для вбудованих пристроїв: веб додатки, сервіси та схема баз даних. Архітектура та безпека. C/C++, Perl, UML/XML/XSLT, UPnP, SQLite.',
  },
  {
    when: 'Чер ’07',
    till: 'Січ ’09',
    where: 'UA',
    title: 'Middle → Senior .NET Developer',
    subtitle: 'Tikle / lifecell',
    description:
      'Архітектура, внутрішні сервіси, веб UI сервіси, веб-сайти, додатки та схеми баз даних для мобільного оператора використовуючи ASP.NET, C#, MSSQL, SOAP/XML та інше. Інтеграція партнерських сервісів (розсилка SMS та інші).',
  },
]

export const uk: Translation = {
  fullName: 'Дмитро Клименко',
  name: 'Дмитро',
  meta: {
    description: `Мене звати Дмитро. Цікавлюсь технологіями, веб розробкою, музикою, подорожами, космосом та іншим.`,
    keywords: 'Веб-розробка, музика, подорожі',
  },
  actions: {
    closeMenu: 'Закрити меню',
    openMenu: 'Відкрити меню',
  },
  builtWith: 'Розроблено з',
  generalTitle: 'Загальна хронологія',
  generalTimeline,
  careerTitle: "Моя кар'єра",
  careerTimeline,
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
