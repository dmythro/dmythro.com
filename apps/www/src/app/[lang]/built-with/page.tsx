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
  const title = `${t.builtWithTitle} – ${USERNAME}`
  // @ts-ignore
  const meta: Metadata = structuredClone(await parent)
  const pagePath = '/built-with'

  meta.title = title
  meta.alternates = {
    languages: Object.fromEntries(availableLocales.map((lang) => [lang, `/${lang}${pagePath}`])),
  }
  meta.openGraph = {
    ...(meta.openGraph || {}),
    title,
    type: 'article',
    url: `${meta.metadataBase}${lang}${pagePath}`,
  }

  return meta
}

export default async function BuiltWithPage({ params }: ParamsWithLang) {
  const { lang } = await params
  return (
    <div className="flex flex-col max-w-5xl mx-auto gap-4 p-4 relative print:block">
      <div>
        <BuiltWith lang={lang} />
      </div>

      <div>
        <HomeLink lang={lang} />
      </div>
    </div>
  )
}
