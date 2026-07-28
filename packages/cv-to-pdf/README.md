# Generate CV into PDF files

Prints `/{locale}/cv` from the **www2** build to `apps/www2/public/cv.{locale}.pdf`,
so the downloadable CV matches the deployed site rather than drifting from it.

```sh
bun run cv   # from the repo root — builds www2, then prints both locales
```

It serves `apps/www2/dist` the way Cloudflare Pages does and prints with a headless
browser, so the PDF goes through the same print stylesheet as ⌘P on the live site.

## Ghostscript (optional)

Purely a size optimisation — it downsamples the embedded photographs. The PDF is
correct without it, just roughly ten times larger, so install it before committing
a regenerated file rather than to make the generator work. On macOS:

```sh
brew install ghostscript
```
