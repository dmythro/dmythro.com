import { BASE_URL } from '@dmythro/constants'
import type { APIRoute } from 'astro'

import { feedItemHtml, feedLanguageTags, getFeedItems } from '@/utils/feed'
import { getT } from '@/utils/getT'
import { getStaticLocalePaths, type LocaleCode } from '@/utils/i18n'

export function getStaticPaths() {
  return getStaticLocalePaths()
}

/** JSON Feed 1.1 — https://www.jsonfeed.org/version/1.1/ */
export const GET: APIRoute = (context) => {
  const { locale } = context.params as { locale: LocaleCode }
  const t = getT(locale)

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: t.projects.feedTitle,
    description: t.projects.feedDescription,
    home_page_url: `${BASE_URL}/${locale}`,
    feed_url: `${BASE_URL}/${locale}/feed.json`,
    language: feedLanguageTags[locale],
    authors: [{ name: t.fullName, url: BASE_URL, avatar: `${BASE_URL}/avatar@400px.jpg` }],
    items: getFeedItems(locale).map((item) => {
      const url = `${BASE_URL}${item.path}`
      return {
        id: url,
        url,
        title: item.title,
        summary: item.description,
        content_html: feedItemHtml(item),
        ...(item.image && { image: item.image }),
        date_published: item.date.toISOString(),
        ...(item.tags?.length && { tags: item.tags }),
      }
    }),
  }

  return new Response(JSON.stringify(feed, null, 2), {
    headers: { 'Content-Type': 'application/feed+json; charset=utf-8' },
  })
}
