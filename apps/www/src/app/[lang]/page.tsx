import { Spacer } from '@nextui-org/spacer'

import { Sections } from 'src/components/Sections'
import { PhotoCard } from 'src/components/PhotoCard'
// import { SaveLevCard } from 'src/components/SaveLevCard'
import { SupportUkraineCard } from 'src/components/SupportUkraineCard'

import { WithLangProp } from 'src/types'

export default function Home({ params }: { params: WithLangProp }) {
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
            <Sections lang={lang} />
          </div>
        </div>
      </div>
    </div>
  )
}
