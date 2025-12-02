# Agent Guidelines

## Commands
- **Build**: `bun run build` or `bun run build --filter=www` (specific package)
- **Dev**: `bun run dev` (starts all apps with Turbo)
- **Lint/Format**: `bun run check` (lint), `bun run check-apply` (auto-fix)
- **Type check**: `bun run check-types`
- **Test all**: `bun test` (in `/packages/my-locales`)
- **Test single**: `bun test tests/skills.test.ts` (from package dir)
- **Clean**: `bun run clean` or `bun run clean-up` (deep clean)

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
