import type { APIRoute } from 'astro'

import { getPageCopy } from '@/utils/feed'
import { availableLocales, type LocaleCode } from '@/utils/i18n'
import {
  OG_SIZE_SQUARE,
  OG_STYLE,
  type PageOgKey,
  pageOgIcons,
  pageOgKeys,
  pageOgSlugs,
  renderOgImage,
} from '@/utils/ogImage'

/** The wide card's twin on a square canvas — see `OG_SQUARE` for why feeds get one. */
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

  const copy = getPageCopy(locale)[key]
  const png = await renderOgImage({ ...copy, icon: pageOgIcons[key] }, OG_STYLE, OG_SIZE_SQUARE)

  // Static build — see the wide card route on why caching lives in _headers.
  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  })
}
