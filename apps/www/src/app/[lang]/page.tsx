import { Card, CardBody } from '@nextui-org/card'
import { Link } from '@nextui-org/link'

import { Sections } from 'src/components/Sections'
import { PhotoCard } from 'src/components/PhotoCard'
// import { SaveLevCard } from 'src/components/SaveLevCard'
import { SupportUkraineCard } from 'src/components/SupportUkraineCard'

import { WithLangProp } from 'src/types'

export default function Home({ params }: { params: WithLangProp }) {
  const { lang } = params
  return (
    <div className="flex max-w-[1024px] mx-auto p-4 md:p-6 relative print:block">
      <div className="flex flex-col sm:flex-row-reverse print:!flex-col gap-4 md:gap-6 relative print:block">
        <div className="basis-full sm:basis-5/12 sm:sticky print:!relative sm:self-start sm:top-0 print:!top-auto print:max-w-[60%] print:mx-auto print:mt-12">
          <div className="flex flex-col gap-4 md:gap-6 print:block">
            <PhotoCard lang={lang} />
            <SupportUkraineCard lang={lang} />
            {/* <SaveLevCard /> Raised enough for now! */}
            <Card as={Link} href={`/${lang}/contact`}>
              <CardBody className="flex flex-row items-center">Contact me</CardBody>
            </Card>
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
