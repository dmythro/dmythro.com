import type { Metadata, ResolvingMetadata } from 'next'
import { Spacer } from '@nextui-org/spacer'

import { USERNAME } from 'my-constants'
import { availableLocales } from 'my-locales/constants'

import type { ParamsWithLang, WithLangProp } from 'src/types'
import { BuiltWith } from 'src/components/BuiltWith'
import { HomeLink } from 'src/components/HomeLink'
import { PhotoCard } from 'src/components/PhotoCard'
// import { SaveLevCard } from 'src/components/SaveLevCard'
import { SupportUkraineCard } from 'src/components/SupportUkraineCard'
import { getT } from 'src/utils/getT'

export async function generateMetadata({ params }: ParamsWithLang, parent: ResolvingMetadata) {
  const t = getT(params.lang)
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
      <div className="flex flex-col sm:flex-row-reverse print:!flex-col gap-4 relative print:block">
        <div className="basis-full sm:basis-5/12 sm:sticky print:!relative sm:self-start sm:top-0 print:!top-auto print:max-w-[60%] print:mx-auto print:mt-12">
          <div className="flex flex-col gap-1 print:block">
            <PhotoCard lang={lang} />
            <Spacer />
            <SupportUkraineCard lang={lang} />
            {/* <Spacer />
                <SaveLevCard /> */}
          </div>
        </div>
        <div className="basis-full sm:basis-7/12 print:block">
          <div>
            <BuiltWith lang={lang} />
          </div>
        </div>
      </div>
      <div>
        <HomeLink lang={lang} />
      </div>
    </div>
  )
}
