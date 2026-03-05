The **`countries-list`** package provides comprehensive, structured data about the world's countries, languages, and continents. It covers **ISO 3166-1** country codes (alpha-2 and numeric), **ISO 639-1** language codes, **ISO 4217** currency codes, calling codes, capital cities, native names, and **emoji flags** — all in a single, **zero-dependency TypeScript** package.

The data ships in multiple formats — **JSON**, **CSV**, and **SQL** — making it easy to integrate into any stack, from a frontend dropdown to a database seed script. **TypeScript** types are included out of the box, so you get **autocompletion** and **compile-time safety** when accessing country properties.

```ts
import { countries, languages, continents } from 'countries-list'
import { getCountryCode, getCountryData, getEmojiFlag } from 'countries-list'

countries.UA // { name: 'Ukraine', native: 'Україна', capital: 'Kyiv', currency: 'UAH', … }
languages.uk // { name: 'Ukrainian', native: 'Українська' }
continents.EU // 'Europe'

getCountryCode('Ukraine')  // 'UA'
getCountryCode('Україна')  // 'UA' — native name lookup
getEmojiFlag('UA')         // '🇺🇦'
```

The package is **actively maintained** and **community-driven** — translations and corrections are contributed by developers worldwide. With **1,300+ GitHub stars** and **millions of npm downloads**, it has become one of the go-to datasets for **i18n** and **localization** work in the **JavaScript** ecosystem.
