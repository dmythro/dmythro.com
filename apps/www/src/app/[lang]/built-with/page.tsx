import type { Metadata, ResolvingMetadata } from 'next'

import { USERNAME } from 'my-constants'
import { availableLocales } from 'my-locales/constants'

import type { WithLangProp } from 'src/types'
import { BuiltWith } from 'src/components/BuiltWith'
import { HomeLink } from 'src/components/HomeLink'
import { PhotoCard } from 'src/components/PhotoCard'
import { getT } from 'src/utils/getT'

export async function generateMetadata({ params }, parent: ResolvingMetadata) {
  const { lang } = params as WithLangProp
  const t = getT(lang)
  const title = `${t.builtWithTitle} – ${USERNAME}`
  const meta: Metadata = { ...(await parent) }

  meta.title = title
  meta.alternates = {
    languages: Object.fromEntries(availableLocales.map((lang) => [lang, '/' + lang])),
  }
  meta.openGraph.title = title

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
