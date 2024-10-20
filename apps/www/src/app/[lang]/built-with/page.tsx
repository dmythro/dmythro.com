/**
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
 */

export const dynamic = 'error'
export const dynamicParams = false

export { viewport } from 'src/constants'

import type { Metadata, ResolvingMetadata } from 'next'

import { USERNAME } from 'my-constants'
import { availableLocales } from 'my-locales/constants'

import { BuiltWith } from 'src/components/BuiltWith'
import { HomeLink } from 'src/components/HomeLink'
import type { WithLangProp } from 'src/types'
import { getT } from 'src/utils/getT'

export async function generateMetadata({ params }, parent: ResolvingMetadata) {
  const { lang } = params as WithLangProp
  const t = getT(lang)
  const title = `${t.builtWithTitle} – ${USERNAME}`
  // @ts-ignore
  const meta: Metadata = { ...(await parent) }
  const pagePath = '/built-with'

  meta.title = title
  meta.alternates = {
    languages: Object.fromEntries(availableLocales.map((lang) => [lang, `/${lang}${pagePath}`])),
  }
  meta.openGraph.title = title
  // @ts-ignore
  meta.openGraph.type = 'article'
  meta.openGraph.url = `${meta.metadataBase}${lang}${pagePath}`

  return meta
}

export default function BuiltWithPage({ params }: { params: WithLangProp }) {
  const { lang } = params
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
