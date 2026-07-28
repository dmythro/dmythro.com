import { BASE_URL } from '@dmythro/constants'

import type { LocaleCode } from '@/utils/i18n'

export type ProjectCategory = 'dev' | 'music' | 'photos' | 'other'

/**
 * `wip` and `planned` projects are listed and get a badge, so work in progress is
 * visible before it ships. `planned` entries may omit `github`/`npm` entirely.
 */
export type ProjectStatus = 'live' | 'wip' | 'planned' | 'archived'

/** A person, organisation, or open-source project credited on a project page. */
export interface ProjectCredit {
  name: string
  url?: string
  /** What they contributed, e.g. `{ en: 'PHP package', uk: 'PHP-пакет' }`. */
  role?: Record<LocaleCode, string>
}

export interface Project {
  slug: string
  title: Record<LocaleCode, string>
  description: Record<LocaleCode, string>
  category: ProjectCategory
  status: ProjectStatus
  /** ISO date (YYYY-MM-DD) the project itself started — usually repo creation. */
  startedAt: string
  /** ISO date this article first went live here. Drives JSON Feed `date_published`. */
  publishedAt: string
  /**
   * ISO date of the last meaningful article revision. Drives sitemap `lastmod`,
   * JSON Feed `date_modified`, and RSS `pubDate` — RSS has no modified-date
   * field, so bumping this deliberately resurfaces the item in readers.
   */
  updatedAt?: string
  /**
   * npm package name. Renders package-manager tabs (bun/npm/pnpm/yarn/deno) with
   * the install command for each. Takes precedence over `install`.
   */
  installPackage?: string
  /**
   * A one-off command run through a package runner, given without the runner
   * itself — e.g. `skills add dmythro/agent-skills` becomes `bunx …`, `npx …`,
   * `pnpm dlx …`, `yarn dlx …`.
   */
  installRunner?: string
  /** Raw shell command(s) for projects that are not npm packages. May be multi-line. */
  install?: string
  /**
   * Languages for JSON-LD `programmingLanguage`. Omit when none fits — e.g. a
   * collection of Markdown skill files is not meaningfully "in" a language.
   */
  programmingLanguages?: string[]
  tags: string[]
  icon: string
  npm?: string
  npmForDownloads?: string
  github?: string
  image?: string
  /**
   * Where the project itself lives. A record when the destination is bilingual —
   * a page on this site, say — and a plain string when one URL serves everyone.
   */
  url?: string | Record<LocaleCode, string>
  /** Curated cross-links. Falls back to shared-tag overlap when omitted. */
  related?: string[]
  /** Defaults to the site owner. Set explicitly only to add or replace authorship. */
  authors?: ProjectCredit[]
  /** Co-credited people. */
  contributors?: ProjectCredit[]
  /** Org the project is published under, e.g. the Annexare hub. */
  organization?: ProjectCredit
  /**
   * Registries beyond the GitHub/npm links derived from `github`/`npm`, e.g.
   * Packagist. The "Published via" credits row renders only when the project is
   * distributed somewhere beyond its own repo and website.
   */
  publishedOn?: ProjectCredit[]
  /**
   * Open-source projects this one leans on — shown on the page and in JSON-LD.
   * Ordered by impact, biggest first: the reader should see what carries the
   * project before what merely tidies it.
   */
  uses?: ProjectCredit[]
  isHighlighted: boolean
  sortOrder: number
  socialEmbeds?: string[]
  fallbackStars?: number
}

/** Author credited when a project does not override `authors`. */
export const defaultAuthor: ProjectCredit = {
  name: 'Dmytro Klymenko',
  url: BASE_URL,
}

export const projects: Project[] = [
  // annexare pinned repos (bigger, more important)
  {
    slug: 'countries-list',
    title: { en: 'countries-list', uk: 'countries-list' },
    description: {
      en: 'Countries, Languages & Continents data in ISO formats (capital and currency, native name, calling codes).',
      uk: 'Дані країн, мов та континентів у форматах ISO (столиці, валюти, назви рідною мовою, телефонні коди).',
    },
    category: 'dev',
    status: 'live',
    startedAt: '2014-07-06',
    publishedAt: '2026-03-26',
    updatedAt: '2026-07-25',
    installPackage: 'countries-list',
    programmingLanguages: ['TypeScript', 'PHP'],
    tags: ['typescript', 'i18n', 'iso', 'data', 'open-source', 'npm', 'php'],
    icon: 'package',
    npm: 'countries-list',
    github: 'annexare/Countries',
    related: ['graphql-suite', 'dmythro-com'],
    organization: { name: 'Annexare', url: 'https://annexare.com/' },
    publishedOn: [
      { name: 'Packagist', url: 'https://packagist.org/packages/annexare/countries-list' },
    ],
    uses: [
      {
        name: 'Bun',
        url: 'https://bun.sh/',
        role: { en: 'workspaces, build, tests', uk: 'workspaces, збірка, тести' },
      },
      {
        name: 'Unicode CLDR',
        url: 'https://cldr.unicode.org/',
        role: { en: 'currency symbols', uk: 'символи валют' },
      },
    ],
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
    status: 'live',
    startedAt: '2026-02-19',
    publishedAt: '2026-03-26',
    updatedAt: '2026-07-25',
    installPackage: 'jsonl-logger',
    programmingLanguages: ['TypeScript'],
    tags: [
      'typescript',
      'logging',
      'jsonl',
      'bun',
      'node',
      'deno',
      'open-source',
      'npm',
      'google-cloud',
      'victorialogs',
    ],
    icon: 'package',
    npm: 'jsonl-logger',
    github: 'annexare/jsonl-logger',
    related: ['graphql-suite', 'countries-list'],
    organization: { name: 'Annexare', url: 'https://annexare.com/' },
    fallbackStars: 2,
    isHighlighted: true,
    sortOrder: 2,
  },
  {
    slug: 'graphql-suite',
    title: { en: 'graphql-suite', uk: 'graphql-suite' },
    description: {
      en: 'Auto-generated GraphQL CRUD, type-safe clients, and React Query hooks from Drizzle PostgreSQL schemas. Full type inference, zero codegen.',
      uk: 'Авто-генерація GraphQL CRUD, типобезпечні клієнти та React Query хуки з Drizzle PostgreSQL схем. Повний вивід типів, без кодогенерації.',
    },
    category: 'dev',
    status: 'live',
    startedAt: '2026-02-22',
    publishedAt: '2026-03-26',
    updatedAt: '2026-07-25',
    installPackage: 'graphql-suite',
    programmingLanguages: ['TypeScript'],
    tags: ['typescript', 'graphql', 'drizzle', 'react-query', 'npm', 'open-source'],
    icon: 'package',
    npm: 'graphql-suite',
    npmForDownloads: '@graphql-suite/schema',
    github: 'annexare/graphql-suite',
    url: 'https://graphql-suite.annexare.com',
    related: ['jsonl-logger', 'countries-list'],
    authors: [
      {
        ...defaultAuthor,
        role: {
          en: 'based on a package by Drizzle Team',
          uk: 'на основі пакету від Drizzle Team',
        },
      },
    ],
    organization: { name: 'Annexare', url: 'https://annexare.com/' },
    uses: [
      {
        name: 'Drizzle ORM',
        url: 'https://orm.drizzle.team/',
        role: { en: 'schema, the whole premise', uk: 'схема, основа всього' },
      },
      {
        name: 'GraphQL Yoga',
        url: 'https://the-guild.dev/graphql/yoga-server',
        role: { en: 'server', uk: 'сервер' },
      },
      {
        name: 'TanStack Query',
        url: 'https://tanstack.com/query',
        role: { en: 'React hooks', uk: 'React-хуки' },
      },
    ],
    fallbackStars: 3,
    isHighlighted: true,
    sortOrder: 3,
  },
  // dmythro pinned repos
  {
    slug: 'dmythro-com',
    title: { en: 'dmythro.com', uk: 'dmythro.com' },
    description: {
      en: 'This website — a personal portfolio built with Astro, DaisyUI, Tailwind CSS, Bun workspaces, and Biome.',
      uk: 'Цей вебсайт — персональне портфоліо побудоване на Astro, DaisyUI, Tailwind CSS, Bun workspaces та Biome.',
    },
    category: 'dev',
    status: 'live',
    startedAt: '2022-08-20',
    publishedAt: '2026-03-26',
    updatedAt: '2026-07-25',
    programmingLanguages: ['TypeScript'],
    tags: ['astro', 'tailwind', 'daisyui', 'bun', 'biome', 'portfolio'],
    icon: 'globe',
    github: 'dmythro/dmythro.com',
    related: ['countries-list', 'terminal-setup'],
    uses: [
      { name: 'Astro', url: 'https://astro.build/', role: { en: 'framework', uk: 'фреймворк' } },
      {
        name: 'Bun',
        url: 'https://bun.sh/',
        role: {
          en: 'runtime, workspaces, tests',
          uk: 'середовище виконання, workspaces, тести',
        },
      },
      {
        name: 'Tailwind CSS',
        url: 'https://tailwindcss.com/',
        role: { en: 'styling', uk: 'стилі' },
      },
      {
        name: 'DaisyUI',
        url: 'https://daisyui.com/',
        role: { en: 'components', uk: 'компоненти' },
      },
      {
        name: 'Cloudflare Pages',
        url: 'https://pages.cloudflare.com/',
        role: { en: 'hosting', uk: 'хостинг' },
      },
      {
        name: 'Biome',
        url: 'https://biomejs.dev/',
        role: { en: 'lint, format', uk: 'лінт, формат' },
      },
    ],
    fallbackStars: 6,
    url: 'https://dmythro.com',
    isHighlighted: true,
    sortOrder: 4,
  },
  {
    slug: 'terminal-setup',
    title: { en: 'terminal-setup', uk: 'terminal-setup' },
    description: {
      en: 'One-command macOS Terminal.app bootstrap — Zsh, Starship, fzf, tmux, and dev tools for AI-assisted workflows.',
      uk: 'Одна команда для налаштування macOS Terminal.app — Zsh, Starship, fzf, tmux та інструменти для AI-асистованих робочих процесів.',
    },
    category: 'dev',
    status: 'live',
    startedAt: '2026-02-18',
    publishedAt: '2026-03-26',
    updatedAt: '2026-07-25',
    install:
      '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/dmythro/terminal-setup/main/setup-terminal.sh)"',
    programmingLanguages: ['Shell'],
    tags: ['shell', 'macos', 'zsh', 'starship', 'fzf', 'tmux', 'setup'],
    icon: 'terminal',
    github: 'dmythro/terminal-setup',
    related: ['envs', 'agent-skills'],
    uses: [
      { name: 'Starship', url: 'https://starship.rs/', role: { en: 'prompt', uk: 'промпт' } },
      {
        name: 'fzf',
        url: 'https://github.com/junegunn/fzf',
        role: { en: 'fuzzy finder', uk: 'нечіткий пошук' },
      },
      { name: 'tmux', url: 'https://github.com/tmux/tmux', role: { en: 'sessions', uk: 'сесії' } },
    ],
    fallbackStars: 4,
    isHighlighted: true,
    sortOrder: 5,
  },
  {
    slug: 'agent-skills',
    title: { en: 'agent-skills', uk: 'agent-skills' },
    description: {
      en: 'A collection of agent skills for Claude Code, OpenCode, and other AI coding assistants — Bun, Git, CI/CD, and more.',
      uk: 'Колекція навичок для Claude Code, OpenCode та інших AI-асистентів — Bun, Git, CI/CD та інше.',
    },
    category: 'dev',
    status: 'live',
    startedAt: '2026-02-23',
    publishedAt: '2026-03-26',
    updatedAt: '2026-07-25',
    installRunner: 'skills add dmythro/agent-skills',
    tags: ['ai', 'claude-code', 'opencode', 'bun', 'git', 'skills'],
    icon: 'terminal',
    github: 'dmythro/agent-skills',
    related: ['terminal-setup', 'envs'],
    uses: [
      {
        name: 'skills.sh',
        url: 'https://skills.sh',
        role: { en: 'distribution', uk: 'розповсюдження' },
      },
    ],
    fallbackStars: 3,
    isHighlighted: true,
    sortOrder: 6,
  },
  {
    slug: 'envs',
    title: { en: 'envs', uk: 'envs' },
    description: {
      en: 'Switch between .env variants (local, staging, production) and sync them across machines via age encryption.',
      uk: 'Перемикання між варіантами .env (local, staging, production) та синхронізація між машинами через age-шифрування.',
    },
    category: 'dev',
    status: 'live',
    startedAt: '2026-04-11',
    publishedAt: '2026-04-12',
    updatedAt: '2026-07-25',
    install: `curl -fsSL https://raw.githubusercontent.com/dmythro/envs/main/envs -o ~/.local/bin/envs
chmod +x ~/.local/bin/envs
envs setup`,
    programmingLanguages: ['Shell'],
    tags: ['bash', 'env', 'encryption', 'age', 'security', 'cli'],
    icon: 'terminal',
    github: 'dmythro/envs',
    related: ['terminal-setup', 'agent-skills'],
    uses: [
      {
        name: 'age',
        url: 'https://github.com/FiloSottile/age',
        role: { en: 'encryption', uk: 'шифрування' },
      },
    ],
    fallbackStars: 0,
    isHighlighted: true,
    sortOrder: 7,
  },
  // Tools that live on this site rather than in a repo of their own
  {
    slug: 'string-tension',
    title: {
      en: 'String Tension Calculator',
      uk: 'Калькулятор натягу струн',
    },
    description: {
      en: 'String tension for guitar and bass, including multi-scale instruments — per string, from published unit weights.',
      uk: 'Натяг струн гітари та басу, включно з мультимензурними інструментами — для кожної струни, за опублікованими питомими вагами.',
    },
    category: 'music',
    status: 'live',
    startedAt: '2025-12-02',
    publishedAt: '2025-12-03',
    programmingLanguages: ['TypeScript'],
    tags: ['guitar', 'bass', 'music', 'calculator', 'preact', 'astro', 'physics'],
    icon: 'music',
    github: 'dmythro/dmythro.com',
    url: {
      en: `${BASE_URL}/en/guitars/string-tension`,
      uk: `${BASE_URL}/uk/guitars/string-tension`,
    },
    related: ['dmythro-com'],
    uses: [
      {
        name: 'Preact',
        url: 'https://preactjs.com/',
        role: { en: 'the one interactive island', uk: 'єдиний інтерактивний острівець' },
      },
      {
        name: 'Astro',
        url: 'https://astro.build/',
        role: { en: 'page, routing, i18n', uk: 'сторінка, маршрути, i18n' },
      },
      {
        name: 'DaisyUI',
        url: 'https://daisyui.com/',
        role: { en: 'controls and layout', uk: 'елементи керування та розмітка' },
      },
    ],
    fallbackStars: 6,
    isHighlighted: true,
    sortOrder: 8,
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

/** Date the project page last meaningfully changed — used for `lastmod` and RSS. */
export function getProjectDate(project: Project): Date {
  return new Date(project.updatedAt ?? project.publishedAt)
}

/**
 * Curated `related` slugs first, then the projects sharing the most tags.
 * Keeps cross-links meaningful instead of always showing the same top three.
 */
export function getRelatedProjects(project: Project, limit = 3): Project[] {
  const curated = (project.related ?? [])
    .map((slug) => getProjectBySlug(slug))
    .filter((p): p is Project => Boolean(p) && p?.slug !== project.slug)

  if (curated.length >= limit) return curated.slice(0, limit)

  const chosen = new Set([project.slug, ...curated.map((p) => p.slug)])
  const byOverlap = projects
    .filter((p) => !chosen.has(p.slug) && p.status !== 'planned')
    .map((p) => ({
      project: p,
      overlap: p.tags.filter((tag) => project.tags.includes(tag)).length,
    }))
    .filter(({ overlap }) => overlap > 0)
    .sort((a, b) => b.overlap - a.overlap || a.project.sortOrder - b.project.sortOrder)
    .map(({ project: p }) => p)

  return [...curated, ...byOverlap].slice(0, limit)
}

/** The project's own site in a given locale, when it has one. */
export function getProjectUrl(project: Project, locale: LocaleCode): string | undefined {
  return typeof project.url === 'string' ? project.url : project.url?.[locale]
}

/** Authors of a project, falling back to the site owner. */
export function getProjectAuthors(project: Project): ProjectCredit[] {
  return project.authors?.length ? project.authors : [defaultAuthor]
}

/** Projects for the RSS feed, newest activity first. `planned` entries are excluded. */
export function getFeedProjects(): Project[] {
  return projects
    .filter((p) => p.status !== 'planned')
    .sort((a, b) => getProjectDate(b).getTime() - getProjectDate(a).getTime())
}
