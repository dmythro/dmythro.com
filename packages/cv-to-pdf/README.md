# Generate CV into PDF files

Prints `/{locale}/cv` from the **www2** build to `apps/www2/public/cv.{locale}.pdf`,
so the downloadable CV matches the deployed site rather than drifting from it.

```sh
bun run cv   # from the repo root — builds www2, then prints both locales
```

It serves `apps/www2/dist` the way Cloudflare Pages does and prints with a headless
browser, so the PDF goes through the same print stylesheet as ⌘P on the live site.

## Ghostscript (optional)

Without it the PDF is correct but roughly ten times larger, since the photographs
are embedded at full resolution:

```sh
brew install ghostscript
```

Install it before committing a regenerated PDF.
