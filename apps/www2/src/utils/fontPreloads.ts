import { fontData } from 'astro:assets'
import { coversWeight, type FontFamily, type FontStyle, fontVariantKeys } from '@dmythro/fonts'

import type { LocaleCode } from './i18n'

export interface PreloadFace {
  family: FontFamily
  weight: number
  style?: FontStyle
  /** Latin only, even on Ukrainian pages: the text this face sets has no Cyrillic. */
  latinOnly?: boolean
}

/**
 * With `font-display: optional` a face is drawn on a reader's first page only if it is
 * preloaded; otherwise that page keeps the system font for it. Every normal weight of
 * Geist is one variable file per script, so this one entry covers most of every page.
 */
const sitewide: PreloadFace[] = [{ family: 'geist', weight: 400 }]

const cssVariables: Record<FontFamily, string> = {
  geist: '--font-geist',
  'geist-mono': '--font-geist-mono',
}

/** Served URLs of the faces a page draws first, in the scripts its locale reads. */
export function fontPreloadUrls(locale: LocaleCode, extra: PreloadFace[] = []): string[] {
  const urls = new Set<string>()
  for (const want of [...sitewide, ...extra]) {
    const keys = fontVariantKeys(want.family, 'screen')
    const served = fontData[cssVariables[want.family]]
    // Astro lists the files in config order; check it still does before relying on it.
    if (served?.length !== keys.length) {
      throw new Error(`fontData for ${want.family} no longer matches packages/fonts`)
    }
    keys.forEach(({ face, subset }, i) => {
      if (face.style !== (want.style ?? 'normal') || !coversWeight(face, want.weight)) return
      if (subset === 'cyrillic' && (locale !== 'uk' || want.latinOnly)) return
      const file = served[i]
      const weight = Array.isArray(face.weight) ? face.weight.join(' ') : String(face.weight)
      if (file.style !== face.style || file.weight !== weight) {
        throw new Error(`fontData for ${want.family} is out of order at ${i}`)
      }
      urls.add(file.src[0].url)
    })
  }
  return [...urls]
}
