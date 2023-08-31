import type { InterestKey } from 'src'
import type { InterestLocale } from 'src/types'

export const interests: Record<InterestKey, InterestLocale> = {
  webDev: {
    title: "Веб розробка, кар'єра, освіта",
    description:
      'TypeScript, Node.js, Nest, React, Next.js/Astro, PostgreSQL, Drizzle/Prisma, Google Cloud/Vercel.',
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
  links: {
    title: 'Посилання та соцмережі',
    description: 'Мій GitHub, LinkedIn та інші профілі.',
  },
}
