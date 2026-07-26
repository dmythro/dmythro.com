import type { APIRoute } from 'astro'

import { feedPages } from '@/data/feedPages'
import { getPageCopy } from '@/utils/feed'
import { availableLocales, type LocaleCode } from '@/utils/i18n'
import { type PageOgKey, pageOgIcons, pageOgSlugs, renderOgImage } from '@/utils/ogImage'

export function getStaticPaths() {
  return feedPages.flatMap((page) =>
    availableLocales.map((locale) => ({
      params: { locale, page: pageOgSlugs[page.key] },
      props: { key: page.key },
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
