import { BASE_URL } from '@dmythro/constants'

import { feedPages } from '@/data/feedPages'
import { getFeedProjects } from '@/data/projects'

import { getT } from './getT'
import type { LocaleCode } from './i18n'
import { OG_SQUARE, type PageOgKey, pageOgSquarePath, projectOgSquarePath } from './ogImage'

export interface FeedItem {
  /** Site-root-relative path. */
  path: string
  title: string
  description: string
  /** Absolute URL of the item's social card, when it has one. */
  image?: string
  published: Date
  updated?: Date
  tags?: string[]
}

/**
 * Deliberately the last-changed date, not `published`: the feed exists so
 * people can follow updates to existing entries, and with a handful of
 * long-lived items a publish-only date would never resurface anything. RSS has
 * only `pubDate`, so it carries this date; JSON Feed keeps both fields.
 */
export function feedItemDate(item: FeedItem): Date {
  return item.updated ?? item.published
}

/** Adds a full stop unless the copy already closes itself, in either script. */
function endSentence(text: string): string {
  return /[.!?…:;]$/.test(text.trimEnd()) ? text : `${text}.`
}

/**
 * Titles and descriptions come from the translations the pages themselves use, and
 * are shared with the generated cards so a page, its feed entry and its social image
 * can never disagree.
 */
export function getPageCopy(
  locale: LocaleCode,
): Record<PageOgKey, { title: string; description: string }> {
  const t = getT(locale)
  return {
    // The full stop is added here rather than in the string itself: every other
    // card ends on one, but `descriptionShort` is also the navbar tagline and the
    // CV page subtitle, where a sentence-ending period would read as a typo.
    cv: { title: `CV — ${t.fullName}`, description: endSentence(t.meta.descriptionShort) },
    contact: { title: t.contact.title, description: t.contact.subtitle },
    openSource: { title: t.builtWithTitle, description: t.builtWithDescription },
    projects: { title: t.projects.title, description: t.projects.description },
    stringTension: {
      title: t.guitars.stringTension.title,
      description: t.guitars.stringTension.description,
    },
  }
}

/**
 * One list feeding every format, so RSS and JSON Feed can never drift apart.
 * Newest first, mixing projects with the standing pages in `feedPages`.
 */
export function getFeedItems(locale: LocaleCode): FeedItem[] {
  const projects: FeedItem[] = getFeedProjects().map((project) => ({
    path: `/${locale}/projects/${project.slug}`,
    title: project.title[locale],
    description: project.description[locale],
    image: `${BASE_URL}${projectOgSquarePath(project.slug, locale)}`,
    published: new Date(project.publishedAt),
    ...(project.updatedAt && { updated: new Date(project.updatedAt) }),
    tags: project.tags,
  }))

  const pageCopy = getPageCopy(locale)

  const pages: FeedItem[] = feedPages.map((page) => ({
    ...pageCopy[page.key],
    path: `/${locale}${page.path}`,
    image: `${BASE_URL}${pageOgSquarePath(page.key, locale)}`,
    published: new Date(page.publishedAt),
    ...(page.updatedAt && { updated: new Date(page.updatedAt) }),
  }))

  return [...projects, ...pages].sort(
    (a, b) => feedItemDate(b).getTime() - feedItemDate(a).getTime(),
  )
}

/** Titles and descriptions land inside markup, so they must not carry raw HTML. */
function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

/** Item body shared by both formats: the card image, then the summary. */
export function feedItemHtml(item: FeedItem): string {
  const image = item.image
    ? `<p><img src="${item.image}" alt="${escapeHtml(item.title)}" width="${OG_SQUARE}" height="${OG_SQUARE}" /></p>`
    : ''
  return `${image}<p>${escapeHtml(item.description)}</p>`
}
