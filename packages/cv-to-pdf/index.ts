import { existsSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { spawn, which } from 'bun'
import puppeteer from 'puppeteer'

const locales = ['en', 'uk']
const pdfExt = '.pdf'
const tempPathSuffix = '.browser'

/**
 * www2 builds to a static directory, so the CV is printed from those files rather
 * than from a running app server. That is the whole reason this no longer copies
 * build output around: what gets printed is exactly what gets deployed.
 */
const appDir = resolve(import.meta.dir, '../../apps/www2')
const distDir = join(appDir, 'dist')
const publicDir = join(appDir, 'public')

/** Matches how Cloudflare Pages resolves a clean URL onto a built file. */
function resolveFile(pathname: string): string[] {
  const path = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
  return [join(distDir, path), join(distDir, `${path}.html`), join(distDir, path, 'index.html')]
}

function serveDist(port: number) {
  return Bun.serve({
    port,
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

/**
 * Ghostscript downsamples the photographs, which is most of the file size. It is
 * optional: without it the PDF is simply larger, so a machine or CI runner that
 * lacks `gs` still produces a correct document.
 */
async function optimizePdf(filePath: string) {
  if (!which('gs')) {
    console.info('     Ghostscript not found — keeping the unoptimised PDF')
    return
  }

  const tempFilePath = filePath.replace(pdfExt, tempPathSuffix + pdfExt)
  renameSync(filePath, tempFilePath)

  const gs = spawn({
    cmd: [
      'gs',
      '-sDEVICE=pdfwrite',
      '-dCompatibilityLevel=1.4',
      '-dPDFSETTINGS=/ebook',
      '-dNOPAUSE',
      '-dQUIET',
      '-dBATCH',
      '-dSAFER',
      `-sOutputFile=${filePath}`,
      '-dColorImageDownsampleType=/Bicubic',
      '-dColorImageResolution=150',
      '-dGrayImageDownsampleType=/Bicubic',
      '-dGrayImageResolution=150',
      '-dMonoImageDownsampleType=/Bicubic',
      '-dMonoImageResolution=150',
      '-dEmbedAllFonts=true',
      '-dSubsetFonts=true',
      '-dCompressFonts=true',
      tempFilePath,
    ],
    stdout: 'pipe',
    stderr: 'pipe',
  })

  const exitCode = await gs.exited
  if (exitCode !== 0) {
    renameSync(tempFilePath, filePath)
    throw new Error(
      `Ghostscript failed with exit code ${exitCode}: ${await new Response(gs.stderr).text()}`,
    )
  }

  rmSync(tempFilePath)
}

async function renderLocale(browser: puppeteer.Browser, origin: string, locale: string) {
  const page = await browser.newPage()
  await page.emulateMediaType('print')
  await page.goto(`${origin}/${locale}/cv`, { waitUntil: 'networkidle0', timeout: 60_000 })

  // page.pdf() never fires this, but the page listens for it to promote lazy images
  // that were never fetched — without it they print as blank space.
  await page.evaluate(() => window.dispatchEvent(new Event('beforeprint')))
  await page.evaluate(
    () =>
      new Promise<void>((done) => {
        const pending = [...document.images].filter((img) => !img.complete)
        if (!pending.length) return done()
        let left = pending.length
        const tick = () => --left === 0 && done()
        for (const img of pending) {
          img.addEventListener('load', tick, { once: true })
          img.addEventListener('error', tick, { once: true })
        }
        setTimeout(done, 10_000)
      }),
  )
  // Decoding can lag the load event, and an undecoded image prints blank.
  await page.evaluate(() =>
    Promise.all([...document.images].map((img) => img.decode().catch(() => undefined))),
  )

  const blank = await page.evaluate(
    () => [...document.images].filter((img) => !(img.complete && img.naturalWidth > 0)).length,
  )
  if (blank) console.warn(`     ${blank} image(s) failed to load and will print blank`)

  const pdf = await page.pdf({
    format: 'A4',
    margin: { top: '12mm', bottom: '12mm', left: '12mm', right: '12mm' },
    printBackground: true,
    tagged: true,
  })
  await page.close()

  const pdfPath = join(publicDir, `cv.${locale}${pdfExt}`)
  writeFileSync(pdfPath, pdf)
  console.info(` - Wrote ${pdfPath} (${(pdf.length / 1024).toFixed(0)}KB)`)

  await optimizePdf(pdfPath)
  const finalSize = Bun.file(pdfPath).size
  console.info(`     final ${(finalSize / 1024).toFixed(0)}KB`)
}

async function main() {
  if (!existsSync(distDir)) {
    throw new Error(
      `No build to print from at ${distDir} — run \`bun run build --filter=www2\` first`,
    )
  }

  console.info('Generating CV PDFs from the www2 build:')
  const server = serveDist(0)
  const origin = `http://localhost:${server.port}`
  const browser = await puppeteer.launch({ headless: true })

  try {
    for (const locale of locales) {
      console.info(` - Printing /${locale}/cv`)
      await renderLocale(browser, origin, locale)
    }
    console.info('Done.')
  } finally {
    await browser.close()
    await server.stop(true)
  }
}

await main()
