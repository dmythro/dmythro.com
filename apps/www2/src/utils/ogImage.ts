import { render } from 'takumi-js'
import { googleFonts } from 'takumi-js/helpers'

import type { Project, ProjectStatus } from '@/data/projects'

import type { LocaleCode } from './i18n'

export const OG_WIDTH = 1200
export const OG_HEIGHT = 630

/**
 * Feed readers and chat apps rarely show the full 1.91:1 card — Reeder, among
 * others, thumbnails it as a square, which keeps only the middle `OG_HEIGHT` of
 * width and drops the rest from each side. Everything that carries meaning lives
 * inside that square, so a crop loses only background.
 */
const SQUARE_LEFT = (OG_WIDTH - OG_HEIGHT) / 2

/** The rule sits just inside the square's edge, so a crop cannot shave it off. */
const RULE_INSET = 14
const RULE_WIDTH = 6
/** The icon hangs between rule and text with the same air on either side. */
const ICON_GAP = 26
/** Right margin inside the square, so text never runs to the crop line. */
const SAFE_MARGIN = 24

/** Text width left inside the square once the rule and hanging icon take their room. */
function contentWidth(iconSize: number): number {
  return OG_HEIGHT - RULE_INSET - RULE_WIDTH - ICON_GAP * 2 - iconSize - SAFE_MARGIN
}

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

/** Inline SVG as a data URI — Takumi renders it as an image node. */
function iconDataUri(icon: string, color: string): string {
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
  const statusLabel = card.badge
  const cardTags = (card.tags ?? []).slice(0, 4)

  const description = sanitizeText(clamp(card.description, OG_DESCRIPTION_LIMIT))

  // The badge leads the pill row rather than sitting above the title: the icon hangs
  // beside whatever comes first, and that should be the title.
  const badge = statusLabel
    ? `<div style="display:flex;flex-shrink:0;white-space:nowrap;padding:7px 16px;border-radius:999px;background:${palette.tagBg};color:${palette.accent};font-size:20px;font-weight:700;letter-spacing:1px">${sanitizeText(statusLabel)}</div>`
    : ''

  const tags = cardTags
    .map(
      (tag) =>
        // `white-space:nowrap` matters: a hyphen is a break opportunity, so tags like
        // `react-query` were measured as two lines and rendered a taller pill.
        `<div style="display:flex;flex-shrink:0;white-space:nowrap;padding:7px 16px;border-radius:999px;background:${palette.tagBg};color:${palette.tagText};font-size:20px">${sanitizeText(tag)}</div>`,
    )
    .join('')

  // The icon matches the title's height, so the two read as one line of masthead.
  // Kept modest so a longer title still lands on one line inside the square.
  const titleSize = title.length > 18 ? 42 : 48

  // Rule, icon and text are siblings of one stretch row rather than nested boxes:
  // the renderer measures a nested column short of its trailing children, which left
  // the rule sized to the title and description alone and the text sitting lower.
  return `<div style="width:100%;height:100%;display:flex;align-items:center;background:${background};padding-left:${SQUARE_LEFT + RULE_INSET}px;font-family:Inter">
  <div style="display:flex;align-items:stretch">
    <div style="display:flex;width:${RULE_WIDTH}px;background:${palette.accent};border-radius:999px"></div>

    <img style="margin-top:${Math.round(titleSize * 0.16)}px;margin-left:${ICON_GAP}px;margin-right:${ICON_GAP}px" src="${iconDataUri(card.icon, palette.accent)}" width="${titleSize}" height="${titleSize}" />

    <div style="display:flex;flex-direction:column;max-width:${contentWidth(titleSize)}px">
      <div style="display:flex;flex-direction:column;font-size:${titleSize}px;font-weight:700;color:${palette.title};line-height:1.15">${title}</div>
      <div style="display:flex;flex-direction:column;margin-top:14px;font-size:26px;color:${palette.body};line-height:1.4">${description}</div>

      ${badge || tags ? `<div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-top:14px">${badge}${tags}</div>` : ''}

      <div style="display:flex;margin-top:14px;font-size:23px;color:${palette.muted}">dmythro.com</div>
    </div>
  </div>
</div>`
}

export async function renderOgImage(
  card: OgCard,
  style: OgStyle = OG_STYLE,
): Promise<Uint8Array<ArrayBuffer>> {
  const png = await render(buildOgHtml(card, style), {
    width: OG_WIDTH,
    height: OG_HEIGHT,
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
