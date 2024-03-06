import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'
import puppeteer from 'puppeteer'

const host = 'localhost'
const port = 3000

const locales = ['en', 'uk']
const pdfExt = '.pdf'
const tempPathSuffix = '.browser'

async function runGhostScript(filePath: string) {
  return new Promise((resolve, reject) => {
    const tempFilePath = filePath.replace(pdfExt, tempPathSuffix + pdfExt)
    fs.renameSync(filePath, tempFilePath)

    const dpi = 150
    const gs = spawn('gs', [
      '-sDEVICE=pdfwrite',
      '-dCompatibilityLevel=1.4',
      '-dDetectDuplicateImages=true',
      '-dDownsampleColorImages=true',
      '-dDownsampleGrayImages=true',
      '-dDownsampleMonoImages=true',
      `-dColorImageResolution=${dpi}`,
      `-dGrayImageResolution=${dpi}`,
      `-dMonoImageResolution=${dpi}`,
      // '-dPDFSETTINGS=/ebook',
      // '-dPDFSETTINGS=/default',
      '-dNOPAUSE',
      '-dQUIET',
      '-dBATCH',
      `-sOutputFile=${filePath}`,
      tempFilePath,
    ])

    gs.on('error', () => {
      fs.renameSync(tempFilePath, filePath)
      reject('Error while using GhostScript CLI.')
    })

    gs.on('close', () => {
      fs.rmSync(tempFilePath)
      resolve(true)
    })
  })
}

async function start() {
  console.info('Generating CV:')

  const browser = await puppeteer.launch({ headless: true })

  return new Promise((resolve, reject) => {
    console.info(' - start server')

    const staticServer = spawn('turbo', ['start'], {
      cwd: path.resolve(__dirname, '../../'),
      detached: true,
    })

    staticServer.stdout?.on('data', async (data: string) => {
      if (`${data}`.includes(`://${host}:${port}`)) {
        return generatePdfs()
      }
    })

    staticServer.stderr?.on('data', done)
    staticServer.on('error', done)

    async function generatePdfs() {
      for (const lang of locales) {
        console.info(` - open "${lang}" CV page`)
        const page = await browser.newPage()
        await page.goto(`http://${host}:${port}/${lang}/cv`, { waitUntil: 'networkidle0' })

        // Load all non-priority <Image />
        await page.evaluate(() => {
          window.scrollTo({ left: 0, top: window.document.body.scrollHeight, behavior: 'smooth' })
        })
        await page.waitForNetworkIdle()

        const pdf = await page.pdf({
          format: 'A4',
          margin: {
            top: '0.5cm',
            bottom: '0.5cm',
            left: '0.5cm',
            right: '0.5cm',
          },
          printBackground: true,
        })
        const pdfPath = path.resolve(__dirname, `../../apps/www/public/cv.${lang}${pdfExt}`)
        console.info(` - save "${pdfPath}"`)
        fs.writeFileSync(pdfPath, pdf)
        await runGhostScript(pdfPath)
      }

      staticServer.removeAllListeners()

      return done()
    }

    async function done(error?: string) {
      if (error) {
        console.error(error)
        reject()
      } else {
        console.info('Done.')
        resolve(true)
      }

      if (staticServer.pid) {
        process.kill(-staticServer.pid)
      } else {
        staticServer.kill()
      }

      return browser.close()
    }
  })
}

Promise.all([start()])
