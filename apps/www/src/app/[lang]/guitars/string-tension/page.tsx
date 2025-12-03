export const dynamic = 'error'
export const dynamicParams = false

export { viewport } from 'src/constants'

import { USERNAME } from 'my-constants'
import { availableLocales } from 'my-locales/constants'
import type { Metadata, ResolvingMetadata } from 'next'
import { HomeLink } from 'src/components/HomeLink'
import type { ParamsWithLang } from 'src/types'
import { getT } from 'src/utils/getT'

import { StringTensionCalculator } from './StringTensionCalculator'

export async function generateMetadata({ params }: ParamsWithLang, parent: ResolvingMetadata) {
  const { lang } = await params
  const t = getT(lang)
  const st = t.guitars.stringTension

  const { icons, manifest, metadataBase, openGraph } = await parent

  const title = `${st.title} – ${USERNAME}`
  const pagePath = '/guitars/string-tension'
  const meta: Metadata = {
    title,
    description: st.description,
    alternates: {
      languages: Object.fromEntries(availableLocales.map((l) => [l, `/${l}${pagePath}`])),
    },
    icons: structuredClone(icons),
    manifest,
    openGraph: {
      ...(openGraph || {}),
      title,
      description: st.description,
      type: 'article',
      url: `${metadataBase}${lang}${pagePath}`,
    },
  }

  return meta
}

export default async function StringTensionPage({ params }: ParamsWithLang) {
  const { lang } = await params
  const t = getT(lang)
  const st = t.guitars.stringTension

  return (
    <div className="flex flex-col max-w-5xl mx-auto gap-4 p-4 relative">
      <h1 className="text-2xl font-bold">
        <span className="font-normal text-foreground-400">{st.pageTitle} / </span>
        {st.title}
      </h1>

      <section>
        <StringTensionCalculator translations={st} />
      </section>

      <div>
        <HomeLink lang={lang} title={t.actions.backHome} />
      </div>
    </div>
  )
}
