import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'

export type FontFamily = 'geist' | 'geist-mono'
export type FontStyle = 'normal' | 'italic'

export type FontMedium = 'screen' | 'print'

export interface FontFace {
  family: FontFamily
  /** One weight, or the range a variable file covers. */
  weight: number | [min: number, max: number]
  style: FontStyle
  /** Where the face is drawn: the site on screen, the CV PDF in print, or both. */
  media: FontMedium[]
  /** The file in `source/`, as Vercel's release names it. */
  source: string
}

const screen: FontMedium[] = ['screen']
const print: FontMedium[] = ['print']
const both: FontMedium[] = ['screen', 'print']

type FaceArgs = [FontFace['weight'], FontStyle, FontMedium[], string]
const sans = (...[weight, style, media, source]: FaceArgs): FontFace => ({
  family: 'geist',
  weight,
  style,
  media,
  source,
})
const mono = (...args: FaceArgs): FontFace => ({ ...sans(...args), family: 'geist-mono' })

/**
 * Every face the site draws. On screen one variable file carries every normal weight
 * of Geist, at a quarter of the static files' size — small enough to preload. Print
 * keeps the static files: Chrome stores a variable font in a PDF as Type 3 drawings,
 * which software reads as broken words. `bun run cv` fails on a face missing here.
 * Vercel names the 800 weight "UltraBlack" (its PostScript name is Geist-ExtraBold).
 */
export const fontFaces: FontFace[] = [
  sans([100, 900], 'normal', screen, 'Geist-Variable.woff2'),
  sans(100, 'normal', print, 'Geist-Thin.woff2'),
  sans(300, 'normal', print, 'Geist-Light.woff2'),
  sans(400, 'normal', print, 'Geist-Regular.woff2'),
  sans(400, 'italic', both, 'Geist-Italic.woff2'),
  sans(500, 'normal', print, 'Geist-Medium.woff2'),
  sans(600, 'normal', print, 'Geist-SemiBold.woff2'),
  sans(700, 'normal', print, 'Geist-Bold.woff2'),
  sans(800, 'normal', print, 'Geist-UltraBlack.woff2'),
  sans(900, 'normal', print, 'Geist-Black.woff2'),
  mono(400, 'normal', both, 'GeistMono-Regular.woff2'),
  mono(400, 'italic', both, 'GeistMono-Italic.woff2'),
  mono(600, 'normal', both, 'GeistMono-SemiBold.woff2'),
]

/** Whether a face draws `weight`: its own weight, or one within its variable range. */
export function coversWeight(face: FontFace, weight: number): boolean {
  const [min, max] = Array.isArray(face.weight) ? face.weight : [face.weight, face.weight]
  return weight >= min && weight <= max
}

type CodePoints = [first: number, last?: number][]

/**
 * Google Fonts' Latin and Cyrillic ranges, so a page downloads only the script it
 * draws. Latin also carries the few symbols the site's copy uses that neither of
 * Google's slices does: → in the CV's role titles and links, ₴, π, ▲ and ●.
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

/** A static face's served files, one per subset, for renderers that take font bytes. */
export function webFiles(family: FontFamily, weight: number, style: FontStyle = 'normal') {
  const face = fontFaces.find(
    (f) => f.family === family && f.weight === weight && f.style === style,
  )
  if (!face) throw new Error(`${family} ${weight} ${style} is not a static face in fontFaces`)
  return subsetNames.map((subset) => ({ subset, path: `${webDir}${webFileName(face, subset)}` }))
}

export function webFileName(face: FontFace, subset: FontSubset): string {
  const weight = Array.isArray(face.weight) ? face.weight.join('-') : face.weight
  return `${face.family}-${subset}-${weight}-${face.style}.woff2`
}

/**
 * Found through module resolution, not `import.meta.url`: a bundler can move this file
 * (Astro's prerender chunks do), but `@dmythro/fonts` still resolves to the package.
 */
const packageDir = dirname(createRequire(import.meta.url).resolve('@dmythro/fonts/package.json'))
export const sourceDir = join(packageDir, 'source/')
export const webDir = join(packageDir, 'web/')

/**
 * One `@font-face` per face and subset, in the shape Astro's local font provider
 * takes: the site's `fonts` config is built from this list, never by hand.
 */
export function fontVariants(family: FontFamily, medium: FontMedium) {
  const variants = fontVariantKeys(family, medium).map(({ face, subset }) => ({
    weight: Array.isArray(face.weight) ? face.weight.join(' ') : face.weight,
    style: face.style,
    unicodeRange: unicodeRange(subset),
    src: [`${webDir}${webFileName(face, subset)}`] as [string],
  }))
  return variants as [(typeof variants)[number], ...typeof variants]
}

/**
 * Face and subset of each entry `fontVariants()` returns, in the same order: the order
 * Astro's `fontData` lists the served files in, which the site's preload links rely on.
 */
export function fontVariantKeys(family: FontFamily, medium: FontMedium) {
  return fontFaces
    .filter((face) => face.family === family && face.media.includes(medium))
    .flatMap((face) => subsetNames.map((subset) => ({ face, subset })))
}
