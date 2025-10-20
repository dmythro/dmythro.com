# Agent Guidelines

## Commands
- **Build**: `bun run build` (root) or `bun run build --filter=www` (specific package)
- **Dev**: `bun run dev` (starts all apps with turbo)
- **Lint**: `bun run check` (biome check) or `bun run lint` (Next.js lint)
- **Type check**: `bun run check-types`
- **Format**: `bun run check-apply` (biome check --write --unsafe)
- **Test**: `bun test` (use in `/packages/my-locales` for single tests)
- **Clean**: `bun run clean` or `bun run clean-up` (deep clean)

## Code Style
- **Package manager**: Bun (v1.3.0), workspace monorepo with Turbo
- **Formatter**: Biome with 2-space indent, 100 char line width, single quotes, semicolons as needed
- **Imports**: Organize as: packages → blank line → aliases → blank line → paths
- **TypeScript**: Strict mode, use type imports (`import type`), infer types when possible
- **React**: Functional components with FC type, prefer const arrow functions
- **Naming**: camelCase for variables/functions, PascalCase for components/types
- **Comments**: Minimal; use biome-ignore for necessary suppressions with clear reasons

## Commit Messages
Follow Conventional Commits: `type(scope): description` (<100 chars, lowercase, imperative mood). Types: feat, fix, chore, refactor, docs, style, test, perf, ci, build, revert. For dependency updates: `chore: update <packages A-Z>` with bulleted body listing `- package: old → new`.
