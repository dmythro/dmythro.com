import type { LocaleCode } from '@/utils/i18n'

export type ProjectCategory = 'dev' | 'music' | 'photos' | 'other'

export interface Project {
  slug: string
  title: Record<LocaleCode, string>
  description: Record<LocaleCode, string>
  category: ProjectCategory
  tags: string[]
  icon: string
  npm?: string
  github?: string
  image?: string
  url?: string
  isHighlighted: boolean
  sortOrder: number
  socialEmbeds?: string[]
  fallbackStars?: number
}

export const projects: Project[] = [
  // annexare pinned repos (bigger, more important)
  {
    slug: 'countries-list',
    title: { en: 'countries-list', uk: 'countries-list' },
    description: {
      en: 'Countries, Languages & Continents data (capital and currency, native name, calling codes). 1.3K+ stars.',
      uk: 'Дані країн, мов та континентів (столиці, валюти, назви рідною мовою, телефонні коди). 1.3K+ зірок.',
    },
    category: 'dev',
    tags: ['typescript', 'i18n', 'open-source', 'npm'],
    icon: 'package',
    npm: 'countries-list',
    github: 'annexare/Countries',
    fallbackStars: 1306,
    isHighlighted: true,
    sortOrder: 1,
  },
  {
    slug: 'jsonl-logger',
    title: { en: 'jsonl-logger', uk: 'jsonl-logger' },
    description: {
      en: 'Lightweight JSON Lines (JSONL) logger with pluggable formatters for VictoriaLogs, Google Cloud Logging, and more.',
      uk: 'Легкий JSONL логер з форматерами для VictoriaLogs, Google Cloud Logging та інших.',
    },
    category: 'dev',
    tags: ['typescript', 'logging', 'open-source', 'npm'],
    icon: 'package',
    npm: 'jsonl-logger',
    github: 'annexare/jsonl-logger',
    fallbackStars: 2,
    isHighlighted: true,
    sortOrder: 2,
  },
  {
    slug: 'graphql-suite',
    title: { en: 'graphql-suite', uk: 'graphql-suite' },
    description: {
      en: 'Auto-generated GraphQL CRUD, type-safe clients, and React Query hooks from Drizzle PostgreSQL schemas. Zero codegen.',
      uk: 'Авто-генерація GraphQL CRUD, типобезпечні клієнти та React Query хуки з Drizzle PostgreSQL схем. Без кодогенерації.',
    },
    category: 'dev',
    tags: ['typescript', 'graphql', 'drizzle', 'react-query', 'npm', 'open-source'],
    icon: 'package',
    npm: '@graphql-suite/schema',
    github: 'annexare/graphql-suite',
    url: 'https://graphql-suite.annexare.com',
    fallbackStars: 3,
    isHighlighted: true,
    sortOrder: 3,
  },
  // dmythro pinned repos
  {
    slug: 'dmythro-com',
    title: { en: 'dmythro.com', uk: 'dmythro.com' },
    description: {
      en: 'This website — a personal portfolio built with Astro, DaisyUI, and Tailwind CSS.',
      uk: 'Цей вебсайт — персональне портфоліо побудоване на Astro, DaisyUI та Tailwind CSS.',
    },
    category: 'dev',
    tags: ['astro', 'tailwind', 'daisyui', 'portfolio'],
    icon: 'globe',
    github: 'dmythro/dmythro.com',
    fallbackStars: 6,
    url: 'https://dmythro.com',
    isHighlighted: true,
    sortOrder: 4,
  },
  {
    slug: 'terminal-setup',
    title: { en: 'terminal-setup', uk: 'terminal-setup' },
    description: {
      en: 'One-command macOS Terminal.app bootstrap — shell config, tools, and dotfiles.',
      uk: 'Одна команда для налаштування macOS Terminal.app — конфігурація шелу, інструменти та дотфайли.',
    },
    category: 'dev',
    tags: ['shell', 'macos', 'dotfiles', 'setup'],
    icon: 'terminal',
    github: 'dmythro/terminal-setup',
    fallbackStars: 4,
    isHighlighted: true,
    sortOrder: 5,
  },
]

export function getProjectsByCategory(category?: ProjectCategory): Project[] {
  const filtered = category ? projects.filter((p) => p.category === category) : projects
  return filtered.sort((a, b) => a.sortOrder - b.sortOrder)
}

export function getHighlightedProjects(): Project[] {
  return projects.filter((p) => p.isHighlighted).sort((a, b) => a.sortOrder - b.sortOrder)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
