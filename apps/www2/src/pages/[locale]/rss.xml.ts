import rss from '@astrojs/rss'
import { BASE_URL } from '@dmythro/constants'
import type { APIRoute } from 'astro'

import { feedItemDate, feedItemHtml, getFeedItems } from '@/utils/feed'
import { localeTags } from '@/utils/formatDate'
import { getT } from '@/utils/getT'
import { getStaticLocalePaths, type LocaleCode } from '@/utils/i18n'

export function getStaticPaths() {
  return getStaticLocalePaths()
}

export const GET: APIRoute = (context) => {
  const { locale } = context.params as { locale: LocaleCode }
  const t = getT(locale)

  return rss({
    title: t.projects.feedTitle,
    description: t.projects.feedDescription,
    site: BASE_URL,
    // The site builds with `trailingSlash: 'never'`; the RSS default would emit
    // links that don't match the canonical URLs.
    trailingSlash: false,
    // Media RSS, for readers that show a thumbnail from `media:content` rather
    // than digging one out of the item body. The namespace URI is Yahoo-hosted
    // for historical reasons — it is just an identifier, nothing is fetched.
    xmlns: { media: 'http://search.yahoo.com/mrss/' },
    customData: `<language>${localeTags[locale]}</language>`,
    items: getFeedItems(locale).map((item) => ({
      title: item.title,
      description: item.description,
      link: item.path,
      // RSS has no modified-date field, so updates deliberately republish.
      pubDate: feedItemDate(item),
      categories: item.tags,
      content: feedItemHtml(item),
      ...(item.image && {
        customData: `<media:content url="${item.image}" medium="image" type="image/png" width="1200" height="630" />`,
      }),
    })),
  })
}
