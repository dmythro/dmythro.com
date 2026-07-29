import { render } from 'takumi-js'
import { googleFonts } from 'takumi-js/helpers'

import type { Project, ProjectStatus } from '@/data/projects'

import type { LocaleCode } from './i18n'

export const OG_WIDTH = 1200
export const OG_HEIGHT = 630

/**
 * Feed readers thumbnail a square rather than showing the 1.91:1 frame — Reeder
 * keeps the middle `OG_HEIGHT` of width and drops the rest, which once beheaded
 * `countries-list` into "tries-list" and lost the icon and domain with it.
 *
 * The fix is not to lay the card out inside that centre square: doing so spends
 * the outer thirds of a wide preview on background, which reads as an almost
 * empty image with a caption floating in the middle. Instead the same edge-to-edge
 * layout is rendered onto a second, genuinely square canvas, and feeds point at
 * that one. Nothing is cropped, and neither consumer pays for the other.
 */
export const OG_SQUARE = 1200

export interface OgSize {
  width: number
  height: number
}

export const OG_SIZE_WIDE: OgSize = { width: OG_WIDTH, height: OG_HEIGHT }
export const OG_SIZE_SQUARE: OgSize = { width: OG_SQUARE, height: OG_SQUARE }

/**
 * Hoisted so the whole build shares one font fetch. `render` accepts a promise
 * of the entry list, and subsets each family to the glyphs actually drawn — which
 * is what makes Cyrillic work without committing any font files.
 */
const fonts = googleFonts([{ name: 'Inter', weight: [400, 600, 700] }])

/** Lucide shapes, copied from `@lucide/astro` so the card matches the site's icons. */
const iconShapes: Record<string, string> = {
  package:
    '<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/>',
  globe:
    '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  terminal: '<path d="M12 19h8"/><path d="m4 17 6-6-6-6"/>',
  music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  camera:
    '<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  mail: '<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/>',
  heart:
    '<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>',
  folder:
    '<path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/>',
}

/**
 * Icons that are not Lucide, and so do not share its 24px stroke grid. Currently
 * only Viche's mark — Phosphor's `IntersectThree`, drawn as filled shapes on a
 * 256 grid — kept beside the project's own component so the card and the site
 * show the same glyph.
 */
const filledIconShapes: Record<string, { viewBox: string; shapes: string }> = {
  'intersect-three': {
    viewBox: '0 0 256 256',
    shapes:
      '<path opacity="0.2" d="M104.64,147.28a60,60,0,0,1-36-46.56A60.06,60.06,0,0,1,128,108,59.94,59.94,0,0,0,104.64,147.28Zm0,0A60,60,0,0,0,128,204a60,60,0,0,0,23.36-56.72,60.17,60.17,0,0,1-46.72,0Zm82.72-46.56A60.06,60.06,0,0,0,128,108a59.94,59.94,0,0,1,23.36,39.28A60,60,0,0,0,187.36,100.72Z"/><path d="M195.88,96c.07-1.31.12-2.63.12-4A68,68,0,0,0,60,92c0,1.33,0,2.65.12,4A68,68,0,1,0,128,213.65,68,68,0,1,0,195.88,96ZM128,193.47a51.89,51.89,0,0,1-16-35.38,67.55,67.55,0,0,0,31.9,0A51.89,51.89,0,0,1,128,193.47ZM128,144a51.93,51.93,0,0,1-14.08-1.95A52.06,52.06,0,0,1,128,118.53a52.06,52.06,0,0,1,14.08,23.52A51.93,51.93,0,0,1,128,144Zm-28.77-8.71A52.19,52.19,0,0,1,77.92,106a51.88,51.88,0,0,1,36.79,3.28A68.17,68.17,0,0,0,99.23,135.29Zm42.06-26.06A51.88,51.88,0,0,1,178.08,106a52.19,52.19,0,0,1-21.31,29.34A68.17,68.17,0,0,0,141.29,109.23ZM128,40A52.06,52.06,0,0,1,180,89.91,67.72,67.72,0,0,0,128,98.35a67.72,67.72,0,0,0-51.95-8.44A52.06,52.06,0,0,1,128,40ZM40,156a52,52,0,0,1,23.23-43.29A68.36,68.36,0,0,0,96.12,152c-.07,1.31-.12,2.63-.12,4a67.74,67.74,0,0,0,18.71,46.77A52,52,0,0,1,40,156Zm124,52a51.65,51.65,0,0,1-22.71-5.23A67.74,67.74,0,0,0,160,156c0-1.33-.05-2.65-.12-4a68.36,68.36,0,0,0,32.89-39.33A52,52,0,0,1,164,208Z"/>',
  },
}

/** Inline SVG as a data URI — Takumi renders it as an image node. */
function iconDataUri(icon: string, color: string): string {
  const filled = filledIconShapes[icon]
  if (filled) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${filled.viewBox}" fill="${color}">${filled.shapes}</svg>`
    return `data:image/svg+xml,${encodeURIComponent(svg)}`
  }

  const shapes = iconShapes[icon] ?? iconShapes.package
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${shapes}</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export type OgTheme = 'dark' | 'light'
export type OgBackground = 'plain' | 'gradient'

export interface OgStyle {
  theme: OgTheme
  background: OgBackground
}

/** Change this to restyle every generated card. */
export const OG_STYLE: OgStyle = { theme: 'light', background: 'gradient' }

const palettes = {
  dark: {
    plain: '#0a0f1c',
    // Mirrors the hero: `bg-linear-to-br from-base-300 via-base-100 to-base-200`.
    gradient: 'linear-gradient(135deg, #1e293b 0%, #0a0f1c 45%, #0f172a 100%)',
    title: '#f8fafc',
    body: '#94a3b8',
    muted: '#64748b',
    accent: '#818cf8',
    tagBg: '#1e293b',
    tagText: '#cbd5e1',
  },
  light: {
    plain: '#ffffff',
    gradient: 'linear-gradient(135deg, #f1f5f9 0%, #ffffff 45%, #f8fafc 100%)',
    title: '#0f172a',
    body: '#475569',
    muted: '#94a3b8',
    accent: '#6366f1',
    tagBg: '#f1f5f9',
    tagText: '#475569',
  },
} as const

/** Short label shown next to the icon. `live` shows nothing — the card is the news. */
const statusLabels: Record<ProjectStatus, { en: string; uk: string } | null> = {
  live: null,
  wip: { en: 'WIP', uk: 'В РОБОТІ' },
  planned: { en: 'TBA', uk: 'СКОРО' },
  archived: { en: 'ARCHIVED', uk: 'АРХІВ' },
}

/**
 * About four lines in the column the hanging icon leaves, measured against
 * Ukrainian copy since Cyrillic sets the wider glyphs. One budget for every card:
 * a pill row and the foot still clear the square underneath it, so a card with
 * tags has no less room for prose than one without.
 *
 * Card copy is curated, so overrunning this is an authoring mistake rather than
 * a runtime condition — `tests/og-cards.test.ts` fails on it, which is the point
 * where it can still be fixed by editing the sentence. The clamp below is the
 * backstop for anything that slips past, so a card degrades to an ellipsis
 * instead of pushing its own foot off the bottom edge.
 */
export const OG_DESCRIPTION_LIMIT = 140

/**
 * Keeps a long description from overflowing the card. Ending on a whole sentence
 * reads far better than a word cut, so a sentence break in the back half of the
 * budget wins; otherwise fall back to trimming at a word with an ellipsis.
 */
function clamp(text: string, limit: number): string {
  if (text.length <= limit) return text
  const cut = text.slice(0, limit)

  const sentence = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '))
  if (sentence >= limit * 0.55) return cut.slice(0, sentence + 1)

  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : limit).trimEnd()}…`
}

/**
 * Takumi's HTML parser does not decode entities, so `&amp;` would render literally.
 * Angle brackets are dropped instead — they are the only characters that could break
 * the parse, and no project string legitimately contains them.
 */
function sanitizeText(text: string): string {
  return text.replace(/[<>]/g, '')
}

/** Everything a card draws, so a project and a standing page share one renderer. */
export interface OgCard {
  title: string
  description: string
  /** Key of `iconShapes`; anything unknown falls back to the package glyph. */
  icon: string
  /** Small pill beside the icon, e.g. a project's WIP status. */
  badge?: string
  tags?: string[]
}

export function buildOgHtml(card: OgCard, style: OgStyle = OG_STYLE): string {
  const palette = palettes[style.theme]
  const background = style.background === 'plain' ? palette.plain : palette.gradient

  const title = sanitizeText(card.title)
  const description = sanitizeText(clamp(card.description, OG_DESCRIPTION_LIMIT))
  const statusLabel = card.badge

  const tags = (card.tags ?? [])
    .slice(0, 5)
    .map(
      (tag) =>
        // `white-space:nowrap` matters: a hyphen is a break opportunity, so tags like
        // `react-query` were measured as two lines and rendered a taller pill.
        `<div style="display:flex;flex-shrink:0;white-space:nowrap;padding:8px 18px;border-radius:999px;background:${palette.tagBg};color:${palette.tagText};font-size:24px">${sanitizeText(tag)}</div>`,
    )
    .join('')

  const masthead = `<div style="display:flex;align-items:center;justify-content:space-between">
    <div style="display:flex;align-items:center;gap:16px">
      <img src="${iconDataUri(card.icon, palette.accent)}" width="52" height="52" />
      ${
        statusLabel
          ? `<div style="display:flex;flex-shrink:0;white-space:nowrap;padding:6px 16px;border-radius:999px;background:${palette.tagBg};color:${palette.accent};font-size:24px;font-weight:700;letter-spacing:1px">${sanitizeText(statusLabel)}</div>`
          : ''
      }
    </div>
    <div style="font-size:26px;color:${palette.muted}">dmythro.com</div>
  </div>`

  const copy = `<div style="display:flex;flex-direction:column;gap:24px">
    <div style="display:flex;flex-direction:column;font-size:${title.length > 18 ? 66 : 78}px;font-weight:700;color:${palette.title};line-height:1.1">${title}</div>
    <div style="display:flex;flex-direction:column;font-size:32px;color:${palette.body};line-height:1.4">${description}</div>
  </div>`

  const tagRow = tags
    ? `<div style="display:flex;flex-wrap:wrap;align-items:center;gap:12px">${tags}</div>`
    : ''

  // Masthead at the top, copy and tags together at the foot. On the wide canvas
  // the three bands sit close enough that spacing them apart reads as one
  // composition; on the square there is 570px more height, and spreading the same
  // three bands over it strands the copy alone in the middle. Grouping the copy
  // with its tags keeps the card looking deliberate at either shape.
  // `>=`, not `>`: a square is exactly as tall as it is wide, and the whole point
  // of this branch is the square.
  //
  // Masthead and tags anchor the top and bottom corners; the copy claims whatever
  // is left and centres in it. `space-between` alone is not enough: it distributes
  // children, so a card with no tags has only two of them and the copy drops to
  // the floor — which is what the standing pages were doing. Growing the middle
  // makes the same rule hold whether or not there are tags, and at either shape.
  // `overflow:hidden` is a backstop, not a layout tool: every card clears the
  // edges by 70px today, but a long title over a long description over two rows
  // of tags would out-measure the wide canvas, and clipping beats spilling.
  return `<div style="width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;background:${background};padding:72px;font-family:Inter">
  ${masthead}
  <div style="flex-grow:1;display:flex;flex-direction:column;justify-content:center">${copy}</div>
  ${tagRow}
</div>`
}

export async function renderOgImage(
  card: OgCard,
  style: OgStyle = OG_STYLE,
  size: OgSize = OG_SIZE_WIDE,
): Promise<Uint8Array<ArrayBuffer>> {
  const png = await render(buildOgHtml(card, style), {
    width: size.width,
    height: size.height,
    fonts,
  })

  // `render` returns `Uint8Array<ArrayBufferLike>`, which is not a valid `BodyInit`.
  // Copying into a plain ArrayBuffer-backed view keeps the Response constructor happy.
  const bytes = new Uint8Array(png.byteLength)
  bytes.set(png)
  return bytes
}

/** A project's card: its own icon, status pill and tags. */
export function projectOgCard(project: Project, locale: LocaleCode): OgCard {
  return {
    title: project.title[locale],
    description: project.description[locale],
    icon: project.icon,
    badge: statusLabels[project.status]?.[locale],
    tags: project.tags.filter((tag) => tag !== 'npm' && tag !== 'open-source'),
  }
}

/** Site-root-relative path of a project's generated OG image. */
export function projectOgImagePath(slug: string, locale: LocaleCode): string {
  return `/og/${locale}/projects/${slug}.png`
}

/** The same card on a square canvas, for feed readers that thumbnail one. */
export function projectOgSquarePath(slug: string, locale: LocaleCode): string {
  return `/og/square/${locale}/projects/${slug}.png`
}

/**
 * Icon per standing page, so each card is recognisable at a glance. This object
 * is also the register of which pages get a generated card at all — deliberately
 * not `feedPages`, which answers a different question. A page can be worth a
 * social image without being worth an entry in someone's reader, and the
 * calculator is exactly that: it belongs in chat previews, but the article about
 * it is already the feed item, so syndicating both would say the same thing twice.
 */
export const pageOgIcons = {
  cv: 'user',
  contact: 'mail',
  openSource: 'heart',
  projects: 'folder',
  stringTension: 'music',
} as const

export type PageOgKey = keyof typeof pageOgIcons

export const pageOgKeys = Object.keys(pageOgIcons) as PageOgKey[]

/**
 * Standing pages are addressed by their route segment rather than their copy key,
 * so the generated file sits next to the page it belongs to. Nested routes keep
 * their nesting, which is why the card route takes a rest parameter.
 */
export const pageOgSlugs: Record<PageOgKey, string> = {
  cv: 'cv',
  contact: 'contact',
  openSource: 'open-source',
  projects: 'projects',
  stringTension: 'guitars/string-tension',
}

/** Site-root-relative path of a standing page's generated OG image. */
export function pageOgImagePath(key: PageOgKey, locale: LocaleCode): string {
  return `/og/${locale}/${pageOgSlugs[key]}.png`
}

/** The same card on a square canvas, for feed readers that thumbnail one. */
export function pageOgSquarePath(key: PageOgKey, locale: LocaleCode): string {
  return `/og/square/${locale}/${pageOgSlugs[key]}.png`
}
