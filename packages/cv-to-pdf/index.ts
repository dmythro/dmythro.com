import { cpSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { spawn } from 'bun'
import puppeteer from 'puppeteer'

const host = 'localhost'
const port = 3000

const locales = ['en', 'uk']
const pdfExt = '.pdf'
const tempPathSuffix = '.browser'
const useOptimization = true // Use GhostScript for PDF optimization

const wwwDir = resolve(import.meta.dir, '../../apps/www')
const standalonePath = join(wwwDir, '.next/standalone')
const serverPath = join(standalonePath, 'apps/www/server.js')

async function copyStaticFiles() {
  console.info(' - Copy static files')

  // Copy .next/static to standalone/.next/static
  const staticSource = join(wwwDir, '.next/static')
  const staticDest = join(standalonePath, 'apps/www/.next/static')
  console.info(`     Copying ${staticSource} -> ${staticDest}`)
  cpSync(staticSource, staticDest, { recursive: true, force: true })

  // Copy public folder to standalone/apps/www/public
  const publicSource = join(wwwDir, 'public')
  const publicDest = join(standalonePath, 'apps/www/public')
  console.info(`     Copying ${publicSource} -> ${publicDest}`)
  cpSync(publicSource, publicDest, { recursive: true, force: true })

  console.info(' - Static files copied')
}

async function optimizePdf(filePath: string) {
  return new Promise((resolve, reject) => {
    const tempFilePath = filePath.replace(pdfExt, tempPathSuffix + pdfExt)
    renameSync(filePath, tempFilePath)

    console.info(`     Input: ${tempFilePath}`)
    console.info(`     Output: ${filePath}`)

    // Use GhostScript with specific settings to compress images while preserving them
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
        // Image compression - downsample to 150 DPI
        '-dColorImageDownsampleType=/Bicubic',
        '-dColorImageResolution=150',
        '-dGrayImageDownsampleType=/Bicubic',
        '-dGrayImageResolution=150',
        '-dMonoImageDownsampleType=/Bicubic',
        '-dMonoImageResolution=150',
        // Font optimization
        '-dEmbedAllFonts=true',
        '-dSubsetFonts=true',
        '-dCompressFonts=true',
        tempFilePath,
      ],
      stdout: 'pipe',
      stderr: 'pipe',
    })

    // Capture both stdout and stderr for debugging
    const stderrReader = gs.stderr.getReader()
    const stdoutReader = gs.stdout.getReader()
    const decoder = new TextDecoder()
    let stderrOutput = ''
    let stdoutOutput = ''

    const readStderr = async () => {
      try {
        while (true) {
          const { done, value } = await stderrReader.read()
          if (done) break
          const text = decoder.decode(value)
          stderrOutput += text
          console.log('    [gs stderr]', text.trim())
        }
      } catch {
        // Ignore read errors
      }
    }

    const readStdout = async () => {
      try {
        while (true) {
          const { done, value } = await stdoutReader.read()
          if (done) break
          const text = decoder.decode(value)
          stdoutOutput += text
          console.log('    [gs stdout]', text.trim())
        }
      } catch {
        // Ignore read errors
      }
    }

    readStderr()
    readStdout()

    gs.exited
      .then((exitCode) => {
        if (exitCode === 0) {
          rmSync(tempFilePath)
          console.info('     PDF optimized successfully')
          resolve(true)
        } else {
          console.error('GhostScript stdout:', stdoutOutput)
          console.error('GhostScript stderr:', stderrOutput)
          renameSync(tempFilePath, filePath)
          reject(`GhostScript failed with exit code ${exitCode}`)
        }
      })
      .catch((err) => {
        console.error('GhostScript error:', err)
        console.error('GhostScript stdout:', stdoutOutput)
        console.error('GhostScript stderr:', stderrOutput)
        renameSync(tempFilePath, filePath)
        reject('Error while using GhostScript.')
      })
  })
}

async function start() {
  console.info('Generating CV:')

  // Copy static files before starting server
  await copyStaticFiles()

  const browser = await puppeteer.launch({ headless: true })

  return new Promise((resolve, reject) => {
    console.info(' - Start server')

    const staticServer = spawn({
      cmd: ['bun', serverPath],
      cwd: standalonePath,
      env: {
        ...process.env,
        PORT: `${port}`,
        HOSTNAME: host,
        IS_CV: 'true',
      },
      stdout: 'pipe',
      stderr: 'pipe',
    })

    // Read stdout stream
    const reader = staticServer.stdout.getReader()
    const decoder = new TextDecoder()

    const checkOutput = async () => {
      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const text = decoder.decode(value)
          console.log(text)

          if (text.includes(`${host}:${port}`)) {
            try {
              await generatePdfs()
            } catch (err) {
              await cleanup(`${err}`)
            }
            break
          }
        }
      } catch (err) {
        await cleanup(`Error reading output: ${err}`)
      }
    }

    checkOutput()

    async function generatePdfs() {
      let step = 'starting'
      try {
        for (const lang of locales) {
          console.info(` - Open "${lang}" CV page`)

          step = 'opening page'
          const page = await browser.newPage()

          // Emulate print media to get correct styles
          await page.emulateMediaType('print')

          // Navigate and wait for network to be idle
          await page.goto(`http://${host}:${port}/${lang}/cv`, {
            waitUntil: 'networkidle0',
            timeout: 60000,
          })

          step = 'loading all images'

          // Force all images to load eagerly
          await page.evaluate(() => {
            const images = Array.from(document.querySelectorAll('img'))
            images.forEach((img) => {
              img.loading = 'eager'
            })
          })

          // Scroll to load lazy images
          await page.evaluate(() => {
            window.scrollTo({
              left: 0,
              top: window.document.body.scrollHeight,
              behavior: 'instant',
            })
          })

          // Wait for network to settle after scroll
          await page.waitForNetworkIdle({ timeout: 10000 })

          // Debug: check image sources
          const imageInfo = await page.evaluate(() => {
            const images = Array.from(document.querySelectorAll('img'))
            return images.map((img) => ({
              src: img.src,
              currentSrc: img.currentSrc,
              complete: img.complete,
              naturalWidth: img.naturalWidth,
              naturalHeight: img.naturalHeight,
              width: img.width,
              height: img.height,
              loading: img.loading,
              decoding: img.decoding,
            }))
          })
          console.info(`     Found ${imageInfo.length} images`)
          imageInfo.forEach((img, i) => {
            console.info(`     Image ${i + 1}: ${img.src}`)
            console.info(
              `       Complete: ${img.complete}, Natural: ${img.naturalWidth}x${img.naturalHeight}, Display: ${img.width}x${img.height}`,
            )
            if (img.naturalWidth === 0) {
              console.warn('       ⚠️  FAILED TO LOAD')
            }
          })

          // Wait for all images to be loaded
          await page.evaluate(async () => {
            const images = Array.from(document.querySelectorAll('img'))
            await Promise.all(
              images.map(async (img) => {
                if (img.complete && img.naturalWidth > 0) {
                  // Force decode to ensure image is ready for rendering
                  try {
                    await img.decode()
                  } catch {
                    // Ignore decode errors
                  }
                  return Promise.resolve(undefined)
                }
                return new Promise<void>((resolve) => {
                  img.addEventListener('load', async () => {
                    try {
                      await img.decode()
                    } catch {
                      // Ignore decode errors
                    }
                    resolve()
                  })
                  img.addEventListener('error', () => resolve())
                  // Timeout after 5 seconds
                  setTimeout(() => resolve(), 5000)
                })
              }),
            )
          })

          // Force a repaint to ensure images are rendered
          await page.evaluate(() => {
            window.scrollTo(0, 0)
          })
          await page.waitForNetworkIdle()

          step = 'saving PDF'
          const pdf = await page.pdf({
            format: 'A4',
            margin: {
              top: '0.5cm',
              bottom: '0.5cm',
              left: '0.5cm',
              right: '0.5cm',
            },
            printBackground: true,
            preferCSSPageSize: false,
            omitBackground: false,
            // Use tagged PDF for better compression (Chrome feature)
            tagged: true,
          })
          const pdfPath = join(wwwDir, `public/cv.${lang}${pdfExt}`)
          console.info(` - Save "${pdfPath}"`)
          writeFileSync(pdfPath, pdf)

          if (useOptimization) {
            console.info(' - Optimize PDF with GhostScript')
            await optimizePdf(pdfPath)
          } else {
            console.info(' - Skipping PDF optimization')
          }
        }

        return await cleanup()
      } catch (error) {
        return await cleanup(`Error ${step}: ${error}`)
      }
    }

    async function cleanup(error?: string) {
      const message = `${error}`

      // Ignore warnings
      if (message.includes('Warning') || message.includes('⚠')) {
        console.warn(`Warn: ${message}`)
        return
      }

      if (error) {
        console.error(`Fail: ${error}`)
        reject(error)
      } else {
        console.info('Done.')
        resolve(true)
      }

      // Kill the server process
      staticServer.kill()
      await browser.close()
    }
  })
}

Promise.all([start()])
