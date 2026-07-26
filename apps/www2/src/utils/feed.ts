import { BASE_URL } from '@dmythro/constants'

import { feedPages } from '@/data/feedPages'
import { getFeedProjects } from '@/data/projects'

import { getT } from './getT'
import type { LocaleCode } from './i18n'
import { type PageOgKey, pageOgImagePath, projectOgImagePath } from './ogImage'

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
    cv: { title: `CV — ${t.fullName}`, description: t.meta.descriptionShort },
    contact: { title: t.contact.title, description: t.contact.subtitle },
    openSource: { title: t.builtWithTitle, description: t.builtWithDescription },
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
    image: `${BASE_URL}${projectOgImagePath(project.slug, locale)}`,
    published: new Date(project.publishedAt),
    ...(project.updatedAt && { updated: new Date(project.updatedAt) }),
    tags: project.tags,
  }))

  const pageCopy = getPageCopy(locale)

  const pages: FeedItem[] = feedPages.map((page) => ({
    ...pageCopy[page.key],
    path: `/${locale}${page.path}`,
    image: `${BASE_URL}${pageOgImagePath(page.key, locale)}`,
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
    ? `<p><img src="${item.image}" alt="${escapeHtml(item.title)}" width="1200" height="630" /></p>`
    : ''
  return `${image}<p>${escapeHtml(item.description)}</p>`
}
