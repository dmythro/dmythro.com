import { Spacer } from '@nextui-org/spacer'

import { Sections } from 'src/components/Sections'
import { PhotoCard } from 'src/components/PhotoCard'
// import { SaveLevCard } from 'src/components/SaveLevCard'
import { SupportUkraineCard } from 'src/components/SupportUkraineCard'
import { Footer } from 'src/components/layout/Footer'
import { TopNavbar } from 'src/components/layout/TopNavbar'

import { ParamsWithLang } from 'src/types'

export default function Home({ params }: ParamsWithLang) {
  const { lang } = params
  return (
    <main>
      <TopNavbar lang={lang} />

      <div className="flex flex-col max-w-5xl mx-auto gap-4 p-4 relative">
        <div className="flex flex-col sm:flex-row-reverse gap-4 relative">
          <div className="basis-full sm:basis-5/12 sm:sticky sm:self-start sm:top-0">
            <div className="flex flex-col gap-1">
              <PhotoCard lang={lang} />
              <Spacer />
              <SupportUkraineCard lang={lang} />
              {/* <Spacer />
                <SaveLevCard /> */}
            </div>
          </div>
          <div className="basis-full sm:basis-7/12">
            <div>
              <Sections lang={lang} />
            </div>
          </div>
        </div>

        <Spacer />

        <Footer lang={lang} />

        <Spacer />
      </div>
    </main>
  )
}
