/**
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
 */

export const dynamic = 'error'
export const dynamicParams = false

import { CVPdfLink } from 'src/components/CVPdfLink'
import { HomeLink } from 'src/components/HomeLink'
import { PhotoCard } from 'src/components/PhotoCard'
import { Sections } from 'src/components/Sections'
// import { SaveLevCard } from 'src/components/SaveLevCard'
import { SupportUkraineCard } from 'src/components/SupportUkraineCard'
import type { ParamsWithLang } from 'src/types'
import { getT } from 'src/utils/getT'

export default async function CVPage({ params }: ParamsWithLang) {
  const { lang } = await params
  const t = getT(lang)
  return (
    <div className="flex flex-col max-w-[1024px] mx-auto gap-4 p-4 relative print:block">
      <div className="flex flex-col sm:flex-row-reverse print:flex-col! gap-4 relative print:block">
        <div className="basis-full sm:basis-5/12 sm:sticky print:relative! sm:self-start sm:top-0 print:top-auto! print:max-w-[60%] print:mx-auto print:mt-12">
          <div className="flex flex-col gap-4 print:block">
            <PhotoCard lang={lang} />
            <SupportUkraineCard lang={lang} />
            {/* <SaveLevCard /> Raised enough for now! */}
          </div>
        </div>
        <div className="basis-full sm:basis-7/12 print:block">
          <div>
            <Sections isExpanded lang={lang} />
          </div>
        </div>
      </div>
      <div className="print:hidden flex flex-row items-center text-foreground-400">
        <HomeLink lang={lang} title={t.actions.backHome} />
        <span>&bull;</span>
        <CVPdfLink lang={lang} />
      </div>
    </div>
  )
}
