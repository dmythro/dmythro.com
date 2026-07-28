# Generate CV into PDF files

Prints `/{locale}/cv` from the **www2** build to `apps/www2/public/cv.{locale}.pdf`,
so the downloadable CV matches the deployed site rather than drifting from it.

```sh
bun run cv   # from the repo root — builds www2, then prints both locales
```

It serves `apps/www2/dist` the way Cloudflare Pages does and prints through the same
print stylesheet as ⌘P on the live site. No dependencies beyond the runtime: it drives
`Bun.WebView`, which needs the `chrome` backend because `Page.printToPDF` is a
DevTools Protocol call and the WebKit backend exposes no protocol.

Requires Google Chrome installed.

## Image size

PDF has no WebP, so the browser would embed the photographs as near-lossless bitmaps
at full resolution — over 10MB for this CV. Each one is re-encoded as JPEG at print
resolution first, which lands the file near 1.2MB at roughly 164dpi and ~42dB PSNR
against the unmodified render. `imageMaxEdge` and `imageQuality` in `index.ts` are the
two knobs; raising them trades size for resolution.

This replaces the Ghostscript pass the generator used to need, which downsampled to
150dpi after the fact.

## Checks

Generation fails rather than writing a bad CV if an image never loaded — the failure
that leaves a silent hole where a photograph should be — or if the document came out
improbably short.

Collapsed FAQ answers are not checked: that needs print layout, and emulated print
media does not reproduce it. Chrome reports them collapsed while printing them
correctly, so asserting on that reading fails a good document.
