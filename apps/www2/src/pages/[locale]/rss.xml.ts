import rss from '@astrojs/rss'
import { BASE_URL } from '@dmythro/constants'
import type { APIRoute } from 'astro'

import { feedPages, getFeedPageDate } from '@/data/feedPages'
import { getFeedProjects, getProjectDate } from '@/data/projects'
import { getT } from '@/utils/getT'
import { getStaticLocalePaths, type LocaleCode } from '@/utils/i18n'
import { projectOgImagePath } from '@/utils/ogImage'

export function getStaticPaths() {
  return getStaticLocalePaths()
}

const languageTags: Record<LocaleCode, string> = {
  en: 'en-GB',
  uk: 'uk-UA',
}

interface FeedItem {
  title: string
  description: string
  link: string
  pubDate: Date
  categories?: string[]
  content?: string
  customData?: string
}

export const GET: APIRoute = (context) => {
  const { locale } = context.params as { locale: LocaleCode }
  const t = getT(locale)

  const projectItems: FeedItem[] = getFeedProjects().map((project) => {
    const image = `${BASE_URL}${projectOgImagePath(project.slug, locale)}`
    const title = project.title[locale]
    const description = project.description[locale]

    return {
      title,
      description,
      link: `/${locale}/projects/${project.slug}`,
      // Deliberately the last-changed date, not `publishedAt`: the feed exists so
      // people can follow updates to existing entries, and with a handful of
      // long-lived items a publish-only date would never resurface anything.
      pubDate: getProjectDate(project),
      categories: project.tags,
      // Readers that render item content get the card; the rest fall back to
      // `media:content`, which — unlike `enclosure` — needs no byte length.
      content: `<p><img src="${image}" alt="${title}" width="1200" height="630" /></p><p>${description}</p>`,
      customData: `<media:content url="${image}" medium="image" type="image/png" width="1200" height="630" />`,
    }
  })

  /** Titles and descriptions come from the translations the pages themselves use. */
  const pageCopy = {
    cv: { title: `CV — ${t.fullName}`, description: t.meta.descriptionShort },
    contact: { title: t.contact.title, description: t.contact.subtitle },
    openSource: { title: t.builtWithTitle, description: t.builtWithDescription },
  } as const

  const pageItems: FeedItem[] = feedPages.map((page) => ({
    ...pageCopy[page.key],
    link: `/${locale}${page.path}`,
    pubDate: getFeedPageDate(page),
  }))

  const items = [...projectItems, ...pageItems].sort(
    (a, b) => b.pubDate.getTime() - a.pubDate.getTime(),
  )

  return rss({
    title: t.projects.feedTitle,
    description: t.projects.feedDescription,
    site: BASE_URL,
    // The site builds with `trailingSlash: 'never'`; the RSS default would emit
    // links that don't match the canonical URLs.
    trailingSlash: false,
    xmlns: { media: 'http://search.yahoo.com/mrss/' },
    customData: `<language>${languageTags[locale]}</language>`,
    items,
  })
}
