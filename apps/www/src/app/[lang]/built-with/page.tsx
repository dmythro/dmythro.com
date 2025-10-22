/**
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
 */

export const dynamic = 'error'
export const dynamicParams = false

export { viewport } from 'src/constants'

import { USERNAME } from 'my-constants'
import { availableLocales } from 'my-locales/constants'
import type { Metadata, ResolvingMetadata } from 'next'
import { BuiltWith } from 'src/components/BuiltWith'
import { HomeLink } from 'src/components/HomeLink'
import type { ParamsWithLang } from 'src/types'
import { getT } from 'src/utils/getT'

export async function generateMetadata({ params }: ParamsWithLang, parent: ResolvingMetadata) {
  const { lang } = await params
  const t = getT(lang)

  const { description, icons, manifest, metadataBase, openGraph } = await parent

  const title = `${t.builtWithTitle} – ${USERNAME}`
  const pagePath = '/built-with'
  const meta: Metadata = {
    title,
    description,
    alternates: {
      languages: Object.fromEntries(availableLocales.map((lang) => [lang, `/${lang}${pagePath}`])),
    },
    icons: structuredClone(icons),
    manifest,
    openGraph: {
      ...(openGraph || {}),
      title,
      type: 'article',
      url: `${metadataBase}${lang}${pagePath}`,
    },
  }

  return meta
}

export default async function BuiltWithPage({ params }: ParamsWithLang) {
  const { lang } = await params
  const t = getT(lang)

  return (
    <div className="flex flex-col max-w-5xl mx-auto gap-4 p-4 relative print:block">
      <div>
        <BuiltWith lang={lang} />
      </div>

      <div>
        <HomeLink lang={lang} title={t.actions.backHome} />
      </div>
    </div>
  )
}
