import type { TimelineItem } from 'src/types'

export const careerTimeline: TimelineItem[] = [
  {
    when: 'Вер ’23',
    till: 'Зараз',
    where: 'UA, SE',
    title: 'Lead Full-stack Engineer',
    subtitle: 'KITRUM (контракт)',
    description: [
      'Я повністю переробив і вдосконалив клієнтський фул-стек веб-сервіс, додав авторизацію на основі ролей, CI/CD, перегляд 3D-моделей, AR для мобільних телефонів (USDZ/GLB) та створив спеціальну панель адміністратора протягом 2-місячного контракту.',
      'Технічний стек базувався на Google Cloud, TypeScript і RDS SQL (Drizzle ORM, Postgres, динамічні схеми). Node.js, Next.js/React, NextUI 2/Tailwind CSS, Zod, Next Auth, GraphQL/Yoga, TanStack Query.',
      'Ретельно оцінено продуктивність Mongo DB 7 Atlas Search і Meilisearch для фасетного пошуку.',
    ],
  },
  {
    when: 'Лис ’22',
    till: 'Кві ’23',
    where: 'CA',
    title: 'Senior Frontend Engineer',
    subtitle: 'Windscribe / Control D',
    description:
      'Працюючи над веб-сайтом та контрольною панеллю Control D (React, Redux, TypeScript), зробив три суттєві зміни кодової бази: мажорні апгрейди Gatsby та Cypress (високе покриття тестами), виправив сотні попереджень щодо безпеки типів. Брав участь у впровадженні нової версії/дизайну контрольної панелі.',
  },
  {
    isHighlighted: true,
    when: 'Тра ’20',
    till: 'Сер ’22',
    where: 'UK',
    title: 'Principal Software Engineer',
    subtitle: 'Peppy Health',
    description: [
      'Приєднався до стартапу на досить ранній стадії. Створив архітектуру, реалізував всю основну інфраструктуру (хмара, база даних, CI/CD, E2E/модульне тестування), реалізував початкові основні версії багаторольового API та панелі адміністратора.',
      "Інтегрував всі необхідні для бізнесу сторонні сервіси та веб-хуки (Sentry, SendBird, Segment, Customer.io, Mixpanel та інші). Офіцер з безпеки. Брав участь у різноманітних аудитах інфраструктури та безпеки. Займався код рев'ю всіх проектів (API, адмінпанель, мобільний додаток), менторством та технічною стороною управління командою.",
      'Технічний стек базувався на Google Cloud, TypeScript, RDS SQL (TypeOrm/Prisma). Node.js (NestJS), додатки на React і React Native.',
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
      '(1) Додаток для керування роботизованим складом.',
      'Схожий на гру інтерфейс користувача дозволяє спостерігати та керувати роботами та автоматизаціями — на карті та в режимі реального часу. TypeScript, React, Redux, PixiJS v4-5 / WebGL, Paper.js (not much), SVG, Node, Jest/Cypress, клієнт для REST API.',
      '(2) Клієнтський інтерфейс для транспортної системи штату США: квитки на громадський транспорт, паркування, послуги для установ.',
      'Адаптивний та доступний веб-додаток з нуля, допомагає користувачам купувати та переглядати все про свої квитки та підписки, в залежності від розташування, сезону та типу облікового запису. TypeScript, React, Redux, Material-UI (MUI), SVG, Node, unit tests (Jest),  клієнт для REST API. Спеціаліст з питань доступності ADA та безпеки.',
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
      "Нова архітектура, система спеціальних білдів, складні компоненти та UI/UX імплементація. Код рев'ю. Співбесіди з кандидатами.",
    ],
  },
  {
    when: 'Гру ’12',
    till: 'Вер ’16',
    where: 'UA',
    title: 'Senior Front-end Developer → Tech Lead',
    subtitle: 'Luxoft',
    description: [
      'Гібридний кросплатформний додаток для відомого виробника HDD, з нуля (macOS, Windows).',
      "Electron, ES6 (React, Node.js), прототипування додатку, складна розробка інтерфейсу користувача, локалізація, сповіщення ОС, продуктивність і ефективність пам’яті/ЦП, IPC, збірка та задачі CI, юніт-тести (Jest) тощо. Код рев'ю. Співбесіди з кандидатами.",
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
