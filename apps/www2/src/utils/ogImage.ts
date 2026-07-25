import { render } from 'takumi-js'
import { googleFonts } from 'takumi-js/helpers'

import type { Project, ProjectStatus } from '@/data/projects'

import type { LocaleCode } from './i18n'

export const OG_WIDTH = 1200
export const OG_HEIGHT = 630

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

/** Keeps a long description from overflowing the card. */
function clamp(text: string, limit: number): string {
  if (text.length <= limit) return text
  const cut = text.slice(0, limit)
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

export function buildProjectOgHtml(
  project: Project,
  locale: LocaleCode,
  style: OgStyle = OG_STYLE,
): string {
  const palette = palettes[style.theme]
  const background = style.background === 'plain' ? palette.plain : palette.gradient

  const title = sanitizeText(project.title[locale])
  const description = sanitizeText(clamp(project.description[locale], 130))
  const statusLabel = statusLabels[project.status]?.[locale]

  const tags = project.tags
    .filter((tag) => tag !== 'npm' && tag !== 'open-source')
    .slice(0, 5)
    .map(
      (tag) =>
        `<div style="display:flex;padding:8px 18px;border-radius:999px;background:${palette.tagBg};color:${palette.tagText};font-size:24px">${sanitizeText(tag)}</div>`,
    )
    .join('')

  return `<div style="width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-between;background:${background};padding:72px;font-family:Inter">
  <div style="display:flex;align-items:center;justify-content:space-between">
    <div style="display:flex;align-items:center;gap:16px">
      <img src="${iconDataUri(project.icon, palette.accent)}" width="52" height="52" />
      ${
        statusLabel
          ? `<div style="display:flex;padding:6px 16px;border-radius:999px;background:${palette.tagBg};color:${palette.accent};font-size:24px;font-weight:700;letter-spacing:1px">${sanitizeText(statusLabel)}</div>`
          : ''
      }
    </div>
    <div style="font-size:26px;color:${palette.muted}">dmythro.com</div>
  </div>

  <div style="display:flex;flex-direction:column;gap:24px">
    <div style="font-size:${title.length > 18 ? 66 : 78}px;font-weight:700;color:${palette.title};line-height:1.1">${title}</div>
    <div style="font-size:32px;color:${palette.body};line-height:1.4">${description}</div>
  </div>

  <div style="display:flex;align-items:center;gap:12px">${tags}</div>
</div>`
}

export async function renderProjectOgImage(
  project: Project,
  locale: LocaleCode,
  style: OgStyle = OG_STYLE,
): Promise<Uint8Array<ArrayBuffer>> {
  const png = await render(buildProjectOgHtml(project, locale, style), {
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

/** Absolute URL of a project's generated OG image. */
export function projectOgImagePath(slug: string, locale: LocaleCode): string {
  return `/og/${locale}/projects/${slug}.png`
}
