# @dmythro/fonts

Geist and Geist Mono for the site, from Vercel's own files. The one place the site's
fonts come from: `apps/www2` builds its `@font-face` rules from `fontVariants()`.

- `source/` — the faces in use, unmodified, from the [`geist`](https://www.npmjs.com/package/geist)
  npm release 1.9.2 (`dist/fonts/geist-{sans,mono}/`, integrity pinned in `scripts/fetch.ts`).
- `web/` — what the site serves: each face cut to a Latin and a Cyrillic subset, woff2.
  Generated, committed, and checked by the test against a fresh build.
- `OFL.txt` — the licence, copied from the release.

## Screen and print

Each face in `src/index.ts` says where it is drawn:

- **Screen:** one variable file carries every normal weight of Geist, 26 KB for Latin
  and 14 KB for Cyrillic, against about 100 KB and 50 KB for the nine static weights.
  That is small enough to preload, so the site draws Geist from its first paint. The
  italic and Geist Mono stay static: the site uses one or two weights of each, where a
  static file is the smaller one.
- **Print:** the static faces. Chrome's PDF writer stores a variable font as Type 3,
  glyphs as drawings, and the CV PDF's text then extracts as "q uality". The site's
  print styles switch to them, `bun run cv` fails if a variable font ever reaches the
  PDF, and the test fails if a variable face is marked for print.

## Why not `@fontsource/geist`

Fontsource repackages Google Fonts' Geist, which is served in slices by script (Latin,
Latin Extended, Cyrillic, …). None of the Latin and Cyrillic slices the site loads
carries "→" (in the CV's role titles and links), ₴, π, ▲ or ●. Vercel's files have them.

## What the subsets keep

Google Fonts' Latin and Cyrillic ranges, plus those symbols in Latin. A page downloads
only the subset its text needs. Hinting is dropped, as Google's build does, and only
the OpenType features a browser applies by default are kept, plus `tnum` for the site's
`tabular-nums`. Nothing is cut to the site's own text, so new content needs no rebuild.

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
