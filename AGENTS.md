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
- **www2** (apps/www2): Astro 7 + DaisyUI 5 + Tailwind 4 (current production site)
  - Zero JS by default, React islands only for interactivity
  - DaisyUI CSS-only components, no React for layout/nav/footer
  - i18n: `[locale]` dynamic param with `getStaticPaths`
  - Deployment target: Cloudflare Pages
- **www** (apps/www): Next.js 16 + HeroUI 2.x (legacy, previous production site)

## Projects
- **Data**: `apps/www2/src/data/projects.ts` — `Project` interface, array, and helpers (`getProjectsByCategory`, `getHighlightedProjects`, `getProjectBySlug`, `getRelatedProjects`, `getFeedProjects`, `getProjectDate`)
- **Articles**: `packages/locales/mdx/projects/{slug}.{en,uk}.mdx` — bilingual MDX content per project
- **Article structure & voice**: `packages/locales/mdx/projects/README.md` — the seven-beat template and voice rules. Read it before writing or editing any project article.
- **Adding a project**: create data entry in `projects.ts` + two MDX files (en/uk)
- **Key fields**: `slug`, `title`/`description` (Record<LocaleCode, string>), `category` (`dev`|`music`|`photos`|`other`), `status` (`live`|`wip`|`planned`|`archived`), `startedAt`, `publishedAt`, `updatedAt?`, `installPackage?`/`installRunner?`/`install?` (package tabs win over runner, runner over raw command), `tags`, `icon`, `github`, `npm?`, `url?`, `related?`, `sortOrder`, `isHighlighted`, `fallbackStars?`
- **Credits**: `authors?` (defaults to `defaultAuthor`), `contributors?` (co-credits), `uses?` (open-source projects leaned on). All three render in the page's credits block and in JSON-LD (`author`/`contributor`/`isBasedOn`).
- **Dates drive infrastructure**: `publishedAt` → JSON Feed `date_published`; `updatedAt` → RSS `pubDate` + JSON Feed `date_modified` (updates deliberately resurface in readers), sitemap `lastmod`, `article:modified_time`, and the "Updated" line on the page. Bump `updatedAt` whenever an article changes meaningfully.

## Feeds & social images
- **Feeds**: RSS 2.0 at `/{locale}/rss.xml` and JSON Feed 1.1 at `/{locale}/feed.json`, both built from `src/utils/feed.ts` so the formats cannot drift. Site-wide: projects plus the standing pages listed in `src/data/feedPages.ts` (CV, contact, open-source), newest first. Bump a page's `updatedAt` there when its content changes. `/rss.xml` and `/feed` alias to EN via `public/_redirects`.
- **OG images**: generated at build by `takumi-js` — `src/utils/ogImage.ts` + `src/pages/og/[locale]/projects/[slug].png.ts` → `/og/{locale}/projects/{slug}.png`. Fonts come from Google Fonts and are subset to the glyphs drawn, so Cyrillic works with no font files committed.
- **Per-page meta**: pass `ogImage`/`ogType`/`publishedTime`/`modifiedTime` through `PageLayout` to `BaseLayout`.

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
