import { existsSync } from 'node:fs'
import { join, resolve, sep } from 'node:path'

const locales = ['en', 'uk']

/** A4 with 12mm margins, in the inches `Page.printToPDF` expects. */
const paper = {
  paperWidth: 8.27,
  paperHeight: 11.69,
  marginTop: 0.472,
  marginBottom: 0.472,
  marginLeft: 0.472,
  marginRight: 0.472,
}

/** Restates the margins above, which the site's own `@page` would otherwise override. */
const pageBoxCss = `@page { size: A4; margin: ${paper.marginTop}in ${paper.marginRight}in ${paper.marginBottom}in ${paper.marginLeft}in }`

/**
 * PDF has no WebP, so the browser embeds the site's photographs as near-lossless
 * bitmaps at their full resolution — that alone was 10MB of a 10.4MB file. Re-encoding
 * them as JPEG at print resolution before printing does what Ghostscript used to do
 * afterwards, without the dependency.
 *
 * A4 content is 186mm wide, so this long edge lands around 164dpi — above the 150dpi
 * Ghostscript was downsampling to. Measured against the unmodified render, the page
 * comes out at ~42dB PSNR, which is visually lossless.
 */
const imageMaxEdge = 1200
const imageQuality = 0.82

/** A CV that rendered at all runs to a dozen pages; a broken one collapses to a few. */
const minPages = 8

/**
 * www2 builds to a static directory, so the CV is printed from those files rather
 * than from a running app server. That is the whole reason this no longer copies
 * build output around: what gets printed is exactly what gets deployed.
 */
const appDir = resolve(import.meta.dir, '../../apps/www2')
const distDir = join(appDir, 'dist')
const publicDir = join(appDir, 'public')

/**
 * Matches how Cloudflare Pages resolves a clean URL onto a built file. Candidates
 * that resolve outside the build directory are dropped: the decoded pathname is
 * attacker-shaped input in principle, and `..` segments would otherwise walk out.
 */
function resolveFile(pathname: string): string[] {
  const path = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
  const candidates = [
    join(distDir, path),
    join(distDir, `${path}.html`),
    join(distDir, path, 'index.html'),
  ]
  return candidates.filter((candidate) => {
    const full = resolve(candidate)
    return full === distDir || full.startsWith(distDir + sep)
  })
}

function serveDist() {
  return Bun.serve({
    port: 0,
    // Loopback only — this exists for the local browser, not the network.
    hostname: '127.0.0.1',
    async fetch(request) {
      const { pathname } = new URL(request.url)
      for (const candidate of resolveFile(decodeURIComponent(pathname))) {
        const file = Bun.file(candidate)
        if (await file.exists()) return new Response(file)
      }
      return new Response('not found', { status: 404 })
    },
  })
}

/** Pages are top-level objects in the output, so counting them needs no PDF parser. */
function countPages(pdf: Uint8Array): number {
  return (new TextDecoder('latin1').decode(pdf).match(/\/Type\s*\/Page[^s]/g) ?? []).length
}

// biome-ignore lint/suspicious/noExplicitAny: Bun.WebView is not typed yet
type WebView = any

/** A browser step that never settles would otherwise hang the build indefinitely. */
function withTimeout<T>(work: Promise<T>, ms: number, what: string): Promise<T> {
  return Promise.race([
    work,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`${what} timed out after ${ms}ms`)), ms),
    ),
  ])
}

/**
 * printToPDF never fires `beforeprint`, but the page listens for it to promote lazy
 * images that were never fetched — without this they print as blank space. Decoding
 * can also lag the load event, and an undecoded image prints blank too.
 */
async function loadImages(view: WebView) {
  await view.evaluate('window.dispatchEvent(new Event("beforeprint"))')
  await view.evaluate(`new Promise((done) => {
    const pending = [...document.images].filter((img) => !img.complete)
    if (!pending.length) return done(true)
    let left = pending.length
    const tick = () => --left === 0 && done(true)
    for (const img of pending) {
      img.addEventListener('load', tick, { once: true })
      img.addEventListener('error', tick, { once: true })
    }
    setTimeout(() => done(true), 10000)
  })`)
  await view.evaluate(
    'Promise.all([...document.images].map((img) => img.decode().catch(() => undefined))).then(() => true)',
  )
}

/** Swaps each photograph for a JPEG sized to what the page actually prints. */
async function downscaleImages(view: WebView) {
  await view.evaluate(`(async () => {
    for (const img of [...document.images]) {
      if (!img.naturalWidth) continue
      const scale = Math.min(1, ${imageMaxEdge} / Math.max(img.naturalWidth, img.naturalHeight))
      const width = Math.round(img.naturalWidth * scale)
      const height = Math.round(img.naturalHeight * scale)
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage(img, 0, 0, width, height)
      // srcset would otherwise let the browser reselect the original source.
      img.removeAttribute('srcset')
      img.removeAttribute('sizes')
      img.src = canvas.toDataURL('image/jpeg', ${imageQuality})
      await img.decode().catch(() => {})
    }
    return true
  })()`)
}

/** Appended last, so this page box wins the cascade over the stylesheet's own. */
async function pinPageBox(view: WebView) {
  await view.evaluate(`(() => {
    const style = document.createElement('style')
    style.textContent = ${JSON.stringify(pageBoxCss)}
    document.head.append(style)
    return true
  })()`)
}

/**
 * A blank image is the failure this cannot see coming: the page looks fine, and the
 * PDF simply has a hole where a photograph should be.
 *
 * Collapsed FAQ answers deliberately are not checked here. Measuring them needs print
 * layout, and emulated print media does not reproduce it — Chrome reports the answers
 * as collapsed under `Emulation.setEmulatedMedia` while printing them perfectly well,
 * so an assertion on that reading fails a document that is actually correct.
 */
async function assertPrintable(view: WebView, locale: string) {
  const blankImages = await view.evaluate(
    '[...document.images].filter((img) => !(img.complete && img.naturalWidth > 0)).length',
  )
  if (blankImages > 0) {
    throw new Error(`${locale}: ${blankImages} image(s) never loaded and would print blank`)
  }
}

async function renderLocale(origin: string, locale: string) {
  // The Chrome backend is required: printToPDF is a DevTools Protocol call, and the
  // WebKit backend that WebView defaults to on macOS exposes no protocol at all.
  await using view = new (Bun as unknown as { WebView: new (o: unknown) => WebView }).WebView({
    width: 1280,
    height: 900,
    backend: 'chrome',
  })

  await withTimeout(view.navigate(`${origin}/${locale}/cv`), 60_000, `${locale}: navigation`)
  await loadImages(view)
  await assertPrintable(view, locale)
  await downscaleImages(view)
  await pinPageBox(view)

  const { data } = await withTimeout(
    view.cdp('Page.printToPDF', { printBackground: true, ...paper }),
    120_000,
    `${locale}: printToPDF`,
  )
  const pdf = Buffer.from(data, 'base64')

  const pages = countPages(pdf)
  if (pages < minPages) {
    throw new Error(`${locale}: printed only ${pages} pages, expected at least ${minPages}`)
  }

  const pdfPath = join(publicDir, `cv.${locale}.pdf`)
  await Bun.write(pdfPath, pdf)
  console.info(` - ${pdfPath} — ${pages} pages, ${(pdf.length / 1024 / 1024).toFixed(2)}MB`)
}

async function main() {
  if (!existsSync(distDir)) {
    throw new Error(
      `No build to print from at ${distDir} — run \`bun run build --filter=www2\` first`,
    )
  }

  console.info('Generating CV PDFs from the www2 build:')
  const server = serveDist()
  const origin = `http://127.0.0.1:${server.port}`

  try {
    for (const locale of locales) {
      await renderLocale(origin, locale)
    }
    console.info('Done.')
  } finally {
    await server.stop(true)
  }
}

await main()
