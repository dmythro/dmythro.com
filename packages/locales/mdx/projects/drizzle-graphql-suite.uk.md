Пакет **`drizzle-graphql-suite`** генерує повний **GraphQL CRUD** шар безпосередньо з ваших **PostgreSQL**-схем **Drizzle ORM**. Замість ручного написання резолверів, визначень типів та клієнтського коду — ви описуєте схему бази даних один раз і отримуєте повний **типобезпечний API-стек**.

Сюїта складається з трьох пакетів. Пакет **schema** зчитує вашу Drizzle-схему й генерує GraphQL-визначення типів та резолвери з вбудованою **фільтрацією**, **пагінацією** та **сортуванням**. Пакет **client** створює типобезпечний GraphQL-клієнт без етапу **кодогенерації** — типи передаються безпосередньо зі схеми. Пакет **React Query** обгортає клієнт у готові хуки для отримання даних, мутацій та інвалідації кешу.

```ts
// Сервер — автогенерація GraphQL-схеми з Drizzle-таблиць
import { buildSchema } from 'drizzle-graphql-suite/schema'
import { createYoga } from 'graphql-yoga'
import { db } from './db'

const { schema } = buildSchema(db, {
  tables: { exclude: ['session', 'verification'] },
})

const yoga = createYoga({ schema })
```

```ts
// Клієнт — типобезпечні хуки без кодогенерації
import { createDrizzleClient } from 'drizzle-graphql-suite/client'
import { useEntityList } from 'drizzle-graphql-suite/query'

const client = createDrizzleClient({ schema, url: '/api/graphql' })

// У React-компоненті
const user = useEntity('user')
const { data } = useEntityList(user, {
  select: { id: true, name: true, email: true },
  limit: 20,
})
```

Ключова можливість — **дозволи на рівні ролей**. Ви визначаєте, які поля та операції доступні для кожної ролі користувача, а згенерований API застосовує ці правила на рівні резолверів. Фронтенд-код не має дбати про логіку авторизації — усе обробляється конфігурацією схеми.

Весь потік — від таблиці бази даних до **React**-компонента — залишається **типобезпечним наскрізно**, а зміни в **Drizzle**-схемі автоматично відображаються на сервері, клієнті та хуках.
