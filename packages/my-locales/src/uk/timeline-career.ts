import type { TimelineItem } from 'src/types'

export const careerTimeline: TimelineItem[] = [
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
