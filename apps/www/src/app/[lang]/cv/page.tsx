import NextLink from 'next/link'
import { Link } from '@nextui-org/link'
import { Spacer } from '@nextui-org/spacer'

import type { WithLangProp } from 'src/types'
import { HomeLink } from 'src/components/HomeLink'
import { Sections } from 'src/components/Sections'
import { PhotoCard } from 'src/components/PhotoCard'
// import { SaveLevCard } from 'src/components/SaveLevCard'
import { SupportUkraineCard } from 'src/components/SupportUkraineCard'

import PdfFileIcon from 'src/assets/file-pdf-solid.svg'

export default function CVPage({ params }: { params: WithLangProp }) {
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
            <Sections isExpanded lang={lang} />
          </div>
        </div>
      </div>
      <div className="print:hidden flex flex-row items-center text-foreground-400">
        <HomeLink lang={lang} />
        <span>&bull;</span>
        <Link
          as={NextLink}
          color="foreground"
          href={`/cv.${lang}.pdf`}
          hrefLang={lang}
          isBlock
          // title={t.actions.backHome}
        >
          <PdfFileIcon className="fill-foreground" width={16} height={16} />
          &nbsp;CV.pdf
        </Link>
      </div>
    </div>
  )
}
