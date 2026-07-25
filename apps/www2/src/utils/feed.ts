import { BASE_URL } from '@dmythro/constants'

import { feedPages, getFeedPageDate } from '@/data/feedPages'
import { getFeedProjects, getProjectDate } from '@/data/projects'

import { getT } from './getT'
import type { LocaleCode } from './i18n'
import { projectOgImagePath } from './ogImage'

export const feedLanguageTags: Record<LocaleCode, string> = {
  en: 'en-GB',
  uk: 'uk-UA',
}

export interface FeedItem {
  /** Site-root-relative path. */
  path: string
  title: string
  description: string
  /** Absolute URL of the item's social card, when it has one. */
  image?: string
  date: Date
  tags?: string[]
}

/**
 * One list feeding every format, so RSS and JSON Feed can never drift apart.
 * Newest first, mixing projects with the standing pages in `feedPages`.
 */
export function getFeedItems(locale: LocaleCode): FeedItem[] {
  const t = getT(locale)

  const projects: FeedItem[] = getFeedProjects().map((project) => ({
    path: `/${locale}/projects/${project.slug}`,
    title: project.title[locale],
    description: project.description[locale],
    image: `${BASE_URL}${projectOgImagePath(project.slug, locale)}`,
    // Deliberately the last-changed date, not `publishedAt`: the feed exists so
    // people can follow updates to existing entries, and with a handful of
    // long-lived items a publish-only date would never resurface anything.
    date: getProjectDate(project),
    tags: project.tags,
  }))

  /** Titles and descriptions come from the translations the pages themselves use. */
  const pageCopy = {
    cv: { title: `CV — ${t.fullName}`, description: t.meta.descriptionShort },
    contact: { title: t.contact.title, description: t.contact.subtitle },
    openSource: { title: t.builtWithTitle, description: t.builtWithDescription },
  } as const

  const pages: FeedItem[] = feedPages.map((page) => ({
    ...pageCopy[page.key],
    path: `/${locale}${page.path}`,
    date: getFeedPageDate(page),
  }))

  return [...projects, ...pages].sort((a, b) => b.date.getTime() - a.date.getTime())
}

/** Item body shared by both formats: the card image, then the summary. */
export function feedItemHtml(item: FeedItem): string {
  const image = item.image
    ? `<p><img src="${item.image}" alt="${item.title}" width="1200" height="630" /></p>`
    : ''
  return `${image}<p>${item.description}</p>`
}
