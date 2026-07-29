import type { APIRoute } from 'astro'

import { getPageCopy } from '@/utils/feed'
import { availableLocales, type LocaleCode } from '@/utils/i18n'
import {
  type PageOgKey,
  pageOgIcons,
  pageOgKeys,
  pageOgSlugs,
  renderOgImage,
} from '@/utils/ogImage'

/**
 * Driven by the card register in `ogImage.ts` rather than by `feedPages`, so a
 * page can have a social image without also becoming a feed entry. A rest
 * parameter carries slugs that nest, e.g. `guitars/string-tension`; the project
 * card route is a more specific match, so it still wins for `projects/*`.
 */
export function getStaticPaths() {
  return pageOgKeys.flatMap((key) =>
    availableLocales.map((locale) => ({
      params: { locale, page: pageOgSlugs[key] },
      props: { key },
    })),
  )
}

export const GET: APIRoute = async ({ params, props }) => {
  const { locale } = params as { locale: LocaleCode }
  const { key } = props as { key: PageOgKey }

  // Same copy the page and its feed entry use, so the card can never describe
  // something the page does not say.
  const copy = getPageCopy(locale)[key]
  const png = await renderOgImage({ ...copy, icon: pageOgIcons[key] })

  // Static build — see the projects card route on why caching lives in _headers.
  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  })
}
