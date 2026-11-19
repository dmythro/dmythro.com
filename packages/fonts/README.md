# @dmythro/fonts

Geist and Geist Mono for the site, from Vercel's own static files. The one place the
site's fonts come from: `apps/www2` builds its `@font-face` rules from `fontVariants()`.

- `source/` — the faces in use, unmodified, from the [`geist`](https://www.npmjs.com/package/geist)
  npm release 1.9.2 (`dist/fonts/geist-{sans,mono}/`, integrity pinned in `scripts/fetch.ts`).
- `web/` — what the site serves: each face cut to a Latin and a Cyrillic subset, woff2.
  Generated, committed, and checked by the test against a fresh build.
- `OFL.txt` — the licence, copied from the release.

## Why not `@fontsource/geist`

Fontsource repackages Google's build of Geist, which leaves out glyphs the site draws:
the "→" in the CV's role titles and links, ₴, π, ▲, ●. Vercel's files have them.

Static files only, never `Geist-Variable`: Chrome's PDF writer stores a variable font
as Type 3, glyphs as drawings, and the CV PDF's text then extracts as "q uality".

## What the subsets keep

Google Fonts' Latin and Cyrillic ranges, plus those symbols in Latin. A page downloads
only the subset its text needs. Hinting is dropped, as Google's build does, and only
the OpenType features a browser applies by default are kept, plus `tnum` for the site's
`tabular-nums`.

The 24 files come to 186 KB, against 218 KB for the same faces and subsets from
`@fontsource` 5.3.0, which lack the symbols above.

## Changing the faces

Faces, subsets and ranges live in `src/index.ts`. After editing them:

```sh
bun run fetch    # copies any new face from the pinned release into source/
bun run subset   # rebuilds web/ from source/
bun test         # web/ must match a fresh build
```

`bun run cv` (repo root) fails when the CV sets text in a face missing from the list.

## Licence

SIL Open Font License 1.1, see `OFL.txt`. It declares no Reserved Font Name, so the
subsets in `web/` keep the name Geist.
