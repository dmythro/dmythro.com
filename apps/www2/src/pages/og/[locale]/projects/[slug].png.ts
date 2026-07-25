import type { APIRoute } from 'astro'

import { projects } from '@/data/projects'
import { availableLocales, type LocaleCode } from '@/utils/i18n'
import { renderProjectOgImage } from '@/utils/ogImage'

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

  const png = await renderProjectOgImage(project, locale)

  // Static build — this Response is written to disk, so response headers never
  // reach the client. Caching for /og/* comes from `public/_headers`, which must
  // not mark these immutable: the URL stays stable while the image changes.
  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  })
}
