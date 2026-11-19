import { join } from 'node:path'
import subsetFont from 'subset-font'

import { type FontFace, type FontSubset, sourceDir, subsetText } from '.'

/**
 * The OpenType features a browser applies to Latin and Cyrillic unasked, plus `tnum`
 * for the site's `tabular-nums`. Keeping every feature would also keep every stylistic
 * alternate those features can reach — a third more glyphs nobody sees.
 */
const keepFeatures = [
  'calt',
  'ccmp',
  'clig',
  'curs',
  'dist',
  'kern',
  'liga',
  'locl',
  'mark',
  'mkmk',
  'rclt',
  'rlig',
  'tnum',
]

/**
 * One face cut down to one subset, as woff2. Hinting is dropped, as Google's build
 * of Geist does: macOS ignores it, and it more than doubles the outline data.
 */
export async function buildWebFont(face: FontFace, subset: FontSubset): Promise<Buffer> {
  const source = Buffer.from(await Bun.file(join(sourceDir, face.source)).arrayBuffer())
  return subsetFont(source, subsetText(subset), {
    targetFormat: 'woff2',
    keepFeatures,
    noHinting: true,
  })
}
