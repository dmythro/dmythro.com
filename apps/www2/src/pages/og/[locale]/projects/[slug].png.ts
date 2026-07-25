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

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
