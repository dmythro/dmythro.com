import type { TimelineItem } from '../types'

export const careerTimeline: TimelineItem[] = [
  {
    isCurrent: true,
    when: 'Сер ’26',
    till: 'Зараз',
    where: 'UA',
    title: 'Lead Engineer',
    subtitle: 'Музей історії міста Києва',
    description: 'Сайти, зберігання даних, безпека та інфраструктура.',
  },
  {
    when: 'Кві ’24',
    till: 'Сер ’26',
    where: 'UA',
    title: 'Lead Engineer',
    subtitle: 'VIDI Group',
    description: [
      'Сайти групи: технології, продуктивність, процес релізів. Впровадив TypeScript, React і Next.js у новіших проєктах, Rspack — у старіших.',
      "CI/CD, код-рев'ю, робота з AI.",
      'Суттєво покращив PageSpeed і продуктивність бекенду.',
    ],
  },
  {
    isCurrent: true,
    when: 'Вер ’23',
    till: 'Зараз',
    where: 'UA, SE',
    title: 'Lead Full-stack Engineer',
    subtitle: 'KITRUM (контракт)',
    description: [
      'За перший двомісячний контракт повністю переробив і вдосконалив full-stack DAM-сервіс клієнта (управління цифровими активами): додав авторизацію за ролями, CI/CD, перегляд 3D-моделей, AR для мобільних телефонів (USDZ/GLB) і зробив для нього власну адмінпанель.',
      'Стек: Google Cloud, TypeScript, Cloud SQL (Drizzle ORM, Postgres, динамічні схеми), Bun/Node.js, Next.js/React, HeroUI 2/Tailwind CSS, Zod, Better Auth, GraphQL/Yoga, TanStack Query.',
      'Ретельно порівняв продуктивність MongoDB 7 Atlas Search і Meilisearch для фасетного пошуку.',
    ],
  },
  {
    when: 'Лис ’22',
    till: 'Кві ’23',
    where: 'CA',
    title: 'Senior Frontend Engineer',
    subtitle: 'Windscribe / Control D',
    description:
      'Працюючи над вебсайтом і панеллю керування Control D (React, Redux, TypeScript), зробив три великі зміни в кодовій базі: оновив Gatsby та Cypress до нових мажорних версій (а тестів там було дуже багато) і виправив сотні попереджень про типи. Допомагав запускати нову версію панелі з новим дизайном.',
  },
  {
    isHighlighted: true,
    when: 'Тра ’20',
    till: 'Сер ’22',
    where: 'UK',
    title: 'Principal Software Engineer',
    subtitle: 'Peppy Health',
    description: [
      'Прийшов у стартап на досить ранній стадії. Спроєктував архітектуру, побудував усю основну інфраструктуру (хмара, база даних, CI/CD, E2E- та юніт-тести), написав перші основні версії адмінпанелі та API з кількома ролями.',
      "Підключив усі сторонні сервіси та вебхуки, потрібні бізнесу (Sentry, Sendbird, Segment, Customer.io, Mixpanel та інші). Відповідав за безпеку (security officer). Брав участь в аудитах інфраструктури та безпеки. Робив код-рев'ю в усіх проєктах (API, адмінпанель, мобільний застосунок), був ментором і вів технічний бік керування командою.",
      'Стек: Google Cloud, TypeScript, Cloud SQL (TypeORM/Prisma), Node.js (NestJS), застосунки на React і React Native.',
    ],
  },
  {
    isHighlighted: true,
    when: 'Вер ’17',
    till: 'Тра ’20',
    where: 'UA, US',
    title: 'Lead Front-end Developer',
    subtitle: 'Star (раніше Cogniance)',
    description: [
      '(1) Застосунок для керування роботизованим складом.',
      'Інтерфейс, схожий на гру: на карті в реальному часі видно роботів і їхні автоматизовані процеси, і ними можна керувати. TypeScript, React, Redux, PixiJS v4-5 / WebGL, Paper.js (трохи), SVG, Node.js, Jest/Cypress, клієнт для REST API.',
      '(2) Особистий кабінет для транспортної системи одного зі штатів США: квитки на громадський транспорт, паркування, послуги для установ.',
      'Адаптивний і доступний вебзастосунок, зроблений з нуля. У ньому користувачі купують квитки й абонементи та бачать усе про них — залежно від місця, сезону й типу облікового запису. TypeScript, React, Redux, Material-UI (MUI), SVG, Node.js, юніт-тести (Jest), клієнт для REST API. Відповідав за доступність (ADA) та безпеку.',
    ],
  },
  {
    when: 'Вер ’16',
    till: 'Тра ’17',
    where: 'SE',
    title: 'Tech Lead Front-end',
    subtitle: 'Match2One',
    description: [
      'Платформа programmatic-реклами. Вебзастосунок для кабінету клієнта (React, Redux, ES2017, Less).',
      "Переробка архітектури, власна система збірки, складні компоненти, реалізація UI/UX. Код-рев'ю. Співбесіди з кандидатами.",
    ],
  },
  {
    when: 'Гру ’12',
    till: 'Вер ’16',
    where: 'UA',
    title: 'Senior Front-end Developer → Tech Lead',
    subtitle: 'Luxoft',
    description: [
      'Гібридний кросплатформний десктопний застосунок (macOS, Windows) для великого виробника HDD, зроблений з нуля.',
      "Electron, ES6 (React, Node.js), прототипування застосунку, складні інтерфейси, локалізація, сповіщення ОС, продуктивність і ощадне використання пам'яті та процесора, IPC, збірки й завдання в CI, юніт-тести (Jest) тощо. Код-рев'ю. Співбесіди з кандидатами.",
    ],
  },
  {
    when: 'Січ ’11',
    till: 'Гру ’12',
    where: 'UA',
    title: 'Робота над власними проєктами',
    description: [
      'Annexare. Студія веброзробки та дизайну. Ми зробили чимало графічних робіт і вебсайтів для художників, музикантів, музичного лейблу, журналу та інших. Для цього я написав власну CMS (PHP, AJAX, jQuery, JSON, MySQL), яка вміла все, що нам було потрібно: багатомовний контент, SEO, швидкість, власні типи контенту, інтеграцію із соцмережами. Деякі з цих сайтів досі працюють, хоча стек уже добряче застарів.',
      'Soccer City. Гра в реальному часі для соціальних мереж (Facebook та інших): інтерфейс на Flash, бекенд на PHP/MySQL, інтеграції з API соцмереж і платіжних систем. Вона поєднувала ізометричний містобудівний симулятор з онлайн-матчмейкінгом, який зважав на показники команди й трохи на випадок. Були квести, досягнення, покупки в грі. Проєкт був досить непростий. Та коли Flash зник із браузерів, ми вирішили не переписувати клієнт для сучасного вебу й закрили гру.',
    ],
  },
  {
    when: 'Чер ’10',
    till: 'Січ ’11',
    where: 'US',
    title: 'Facebook Applications Developer',
    subtitle: 'Stuzo',
    description:
      'Розробка UI та бекенду на власній Facebook-платформі компанії, зробленій на Zend Framework і Doctrine. PHP, Facebook Graph API, FBML, Piwik, генерування PDF та інше.',
  },
  {
    when: 'Січ ’09',
    till: 'Лют ’10',
    where: 'UA, DE, IT',
    title: 'Software Engineer',
    subtitle: 'Lemsys',
    description:
      'Розробка ПЗ для вбудованих пристроїв: вебзастосунки, сервіси та схеми баз даних. Архітектура та безпека. C/C++, Perl, UML/XML/XSLT, UPnP, SQLite.',
  },
  {
    when: 'Чер ’07',
    till: 'Січ ’09',
    where: 'UA',
    title: 'Middle → Senior .NET Developer',
    subtitle: 'Tikle / lifecell',
    description:
      'Архітектура, внутрішні сервіси, сервіси з вебінтерфейсом, вебсайти, застосунки та схеми баз даних для мобільного оператора. ASP.NET, C#, MSSQL, SOAP/XML. Інтеграція партнерських сервісів (розсилання SMS та інші).',
  },
]
