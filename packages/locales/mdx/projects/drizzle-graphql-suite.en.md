The **`drizzle-graphql-suite`** generates a full **GraphQL CRUD** layer directly from your **Drizzle ORM** PostgreSQL schemas. Instead of writing resolvers, type definitions, and client code by hand, you define your database schema once and get a complete, **type-safe API stack**.

The suite is organized into three packages. The **schema** package reads your Drizzle schema and produces GraphQL type definitions and resolvers with **filtering**, **pagination**, and **sorting** built in. The **client** package generates a type-safe GraphQL client with **zero codegen** — types flow directly from your schema. The **React Query** package wraps the client into ready-to-use hooks for data fetching, mutations, and cache invalidation.

```ts
// Server — auto-generate GraphQL schema from Drizzle tables
import { buildSchema } from 'drizzle-graphql-suite/schema'
import { createYoga } from 'graphql-yoga'
import { db } from './db'

const { schema } = buildSchema(db, {
  tables: { exclude: ['session', 'verification'] },
})

const yoga = createYoga({ schema })
```

```ts
// Client — type-safe hooks with zero codegen
import { createDrizzleClient } from 'drizzle-graphql-suite/client'
import { useEntityList } from 'drizzle-graphql-suite/query'

const client = createDrizzleClient({ schema, url: '/api/graphql' })

// In a React component
const user = useEntity('user')
const { data } = useEntityList(user, {
  select: { id: true, name: true, email: true },
  limit: 20,
})
```

A key feature is **per-role permissions**. You can define which fields and operations are accessible for each user role, and the generated API enforces these rules at the resolver level. This means your frontend code never needs to worry about authorization logic — it is handled by the schema configuration.

The entire flow — from database table to **React** component — stays **type-safe end-to-end**, with changes to the **Drizzle** schema automatically reflected across the server, client, and hooks.
