import { fileURLToPath } from 'node:url'

export type FontFamily = 'geist' | 'geist-mono'
export type FontStyle = 'normal' | 'italic'

export interface FontFace {
  family: FontFamily
  weight: number
  style: FontStyle
  /** The static file in `source/`, as Vercel's release names it. */
  source: string
}

/**
 * Every face the site draws, and nothing else: each one costs a request on any page
 * that uses it. `bun run cv` fails when the CV sets text in a face missing here.
 * Vercel names the 800 weight "UltraBlack" (its PostScript name is Geist-ExtraBold).
 */
export const fontFaces: FontFace[] = [
  { family: 'geist', weight: 100, style: 'normal', source: 'Geist-Thin.woff2' },
  { family: 'geist', weight: 300, style: 'normal', source: 'Geist-Light.woff2' },
  { family: 'geist', weight: 400, style: 'normal', source: 'Geist-Regular.woff2' },
  { family: 'geist', weight: 400, style: 'italic', source: 'Geist-Italic.woff2' },
  { family: 'geist', weight: 500, style: 'normal', source: 'Geist-Medium.woff2' },
  { family: 'geist', weight: 600, style: 'normal', source: 'Geist-SemiBold.woff2' },
  { family: 'geist', weight: 700, style: 'normal', source: 'Geist-Bold.woff2' },
  { family: 'geist', weight: 800, style: 'normal', source: 'Geist-UltraBlack.woff2' },
  { family: 'geist', weight: 900, style: 'normal', source: 'Geist-Black.woff2' },
  { family: 'geist-mono', weight: 400, style: 'normal', source: 'GeistMono-Regular.woff2' },
  { family: 'geist-mono', weight: 400, style: 'italic', source: 'GeistMono-Italic.woff2' },
  { family: 'geist-mono', weight: 600, style: 'normal', source: 'GeistMono-SemiBold.woff2' },
]

type CodePoints = [first: number, last?: number][]

/**
 * Google Fonts' Latin and Cyrillic ranges, so a page downloads only the script it
 * draws. Latin also carries the few symbols the site's copy uses that Google's build
 * of Geist leaves out: → in the CV's role titles and links, ₴, π, ▲ and ●.
 */
export const fontSubsets: Record<'latin' | 'cyrillic', CodePoints> = {
  latin: [
    [0x0000, 0x00ff],
    [0x0131],
    [0x0152, 0x0153],
    [0x02bb, 0x02bc],
    [0x02c6],
    [0x02da],
    [0x02dc],
    [0x0304],
    [0x0308],
    [0x0329],
    [0x03c0],
    [0x2000, 0x206f],
    [0x20ac],
    [0x20b4],
    [0x2122],
    [0x2191, 0x2193],
    [0x2212],
    [0x2215],
    [0x25b2],
    [0x25cf],
    [0xfeff],
    [0xfffd],
  ],
  cyrillic: [[0x0301], [0x0400, 0x045f], [0x0490, 0x0491], [0x04b0, 0x04b1], [0x2116]],
}

export type FontSubset = keyof typeof fontSubsets

export const subsetNames = Object.keys(fontSubsets) as FontSubset[]

/** The characters a subset keeps, for the subsetter. */
export function subsetText(subset: FontSubset): string {
  return fontSubsets[subset]
    .flatMap(([first, last = first]) =>
      Array.from({ length: last - first + 1 }, (_, i) => String.fromCodePoint(first + i)),
    )
    .join('')
}

/** The same ranges in CSS `unicode-range` form. */
export function unicodeRange(subset: FontSubset): [string, ...string[]] {
  const hex = (codePoint: number) => codePoint.toString(16).toUpperCase().padStart(4, '0')
  const ranges = fontSubsets[subset].map(([first, last]) =>
    last === undefined ? `U+${hex(first)}` : `U+${hex(first)}-${hex(last)}`,
  )
  return ranges as [string, ...string[]]
}

export function webFileName(face: FontFace, subset: FontSubset): string {
  return `${face.family}-${subset}-${face.weight}-${face.style}.woff2`
}

export const sourceDir = fileURLToPath(new URL('../source/', import.meta.url))
export const webDir = fileURLToPath(new URL('../web/', import.meta.url))

/**
 * One `@font-face` per face and subset, in the shape Astro's local font provider
 * takes: the site's `fonts` config is built from this list, never by hand.
 */
export function fontVariants(family: FontFamily) {
  const variants = fontFaces
    .filter((face) => face.family === family)
    .flatMap((face) =>
      subsetNames.map((subset) => ({
        weight: face.weight,
        style: face.style,
        unicodeRange: unicodeRange(subset),
        src: [`${webDir}${webFileName(face, subset)}`] as [string],
      })),
    )
  return variants as [(typeof variants)[number], ...typeof variants]
}
