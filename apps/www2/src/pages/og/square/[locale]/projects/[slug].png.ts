import type { APIRoute } from 'astro'

import { projects } from '@/data/projects'
import { availableLocales, type LocaleCode } from '@/utils/i18n'
import { OG_SIZE_SQUARE, OG_STYLE, projectOgCard, renderOgImage } from '@/utils/ogImage'

/** The wide card's twin on a square canvas — see `OG_SQUARE` for why feeds get one. */
export function getStaticPaths() {
  return projects.flatMap((project) =>
    availableLocales.map((locale) => ({
      params: { locale, slug: project.slug },
      props: { project },
    })),
  )
}

export const GET: APIRoute = async ({ params, props }) => {
  const { locale } = params as { locale: LocaleCode }
  const { project } = props as { project: (typeof projects)[number] }

  const png = await renderOgImage(projectOgCard(project, locale), OG_STYLE, OG_SIZE_SQUARE)

  // Static build — see the wide card route on why caching lives in _headers.
  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  })
}
