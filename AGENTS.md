# Agent Guidelines

## Commands
- **Build**: `bun run build` or `bun run build --filter=www` / `--filter=www2`
- **Dev**: `bun run dev` (starts all apps with Turbo)
- **Dev www2 only**: `cd apps/www2 && bun run dev`
- **Build www2 directly**: `cd apps/www2 && bun run astro build`
- **Lint/Format**: `bun run check` (lint), `bun run check-apply` (auto-fix)
- **Type check**: `bun run check-types`
- **Test all**: `bun test` (in `packages/locales` / `@dmythro/locales`)
- **Test single**: `bun test tests/skills.test.ts` (from package dir)
- **Clean**: `bun run clean` or `bun run clean-up` (deep clean)

## Apps
- **www2** (apps/www2): Astro 6 + DaisyUI 5 + Tailwind 4 (current production site)
  - Zero JS by default, React islands only for interactivity
  - DaisyUI CSS-only components, no React for layout/nav/footer
  - i18n: `[locale]` dynamic param with `getStaticPaths`
  - Deployment target: Cloudflare Pages
- **www** (apps/www): Next.js 16 + HeroUI 2.x (legacy, previous production site)

## Projects
- **Data**: `apps/www2/src/data/projects.ts` — `Project` interface, array, and helpers (`getProjectsByCategory`, `getHighlightedProjects`, `getProjectBySlug`)
- **Articles**: `packages/locales/mdx/projects/{slug}.{en,uk}.mdx` — bilingual MDX content per project
- **Adding a project**: create data entry in `projects.ts` + two MDX files (en/uk)
- **Key fields**: `slug`, `title`/`description` (Record<LocaleCode, string>), `category` (`dev`|`music`|`photos`|`other`), `tags`, `icon`, `github`, `npm?`, `url?`, `sortOrder`, `isHighlighted`, `fallbackStars?`

## Code Style
- **Stack**: Bun 1.3+, Turbo workspaces, Biome formatter/linter
- **Formatting**: 2-space indent, 100 char lines, single quotes, semicolons as needed
- **Imports**: Organize: packages → blank line → aliases → blank line → relative paths
- **TypeScript**: Strict mode, use `import type`, prefer inferred types, avoid `any`
- **React**: Functional components with `FC` type, const arrow functions
- **Naming**: camelCase for variables/functions, PascalCase for components/types
- **Tests**: Use `bun:test` with `describe`/`it`/`expect`

## Commits
Conventional Commits: `type(scope): description` (<100 chars, lowercase, imperative). Types: feat, fix, chore, refactor, docs, style, test, perf, ci, build, revert. Dependency updates: `chore: update <packages A-Z>` with body `- pkg: old → new`.
