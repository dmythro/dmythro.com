import { Spacer } from '@nextui-org/spacer'

import { Interests } from 'src/components/Interests'
import { Links } from 'src/components/Links'
import { PhotoCard } from 'src/components/PhotoCard'
// import { SaveLevCard } from 'src/components/SaveLevCard'
import { SupportUkraineCard } from 'src/components/SupportUkraineCard'
import { Footer } from 'src/components/layout/Footer'
import { TopNavbar } from 'src/components/layout/TopNavbar'

import type { LocaleCode } from 'my-locales'
import * as locales from 'my-locales'

export default function Home({ params }: { params: { lang: LocaleCode } }) {
  const t = locales[params.lang]

  return (
    <main>
      <TopNavbar />

      <div className="flex flex-col max-w-5xl mx-auto gap-4 p-4 relative">
        <div className="flex flex-col sm:flex-row-reverse gap-4 relative">
          <div className="basis-full sm:basis-5/12 sm:sticky sm:self-start sm:top-0">
            <div className="flex flex-col gap-1">
              <PhotoCard />
              <Spacer />
              <SupportUkraineCard />
              {/* <Spacer />
                <SaveLevCard /> */}
            </div>
          </div>
          <div className="basis-full sm:basis-7/12">
            <div>
              <Interests />
              <Spacer />
              <Links />
            </div>
          </div>
        </div>

        <Spacer />

        <Footer lang={params.lang} />

        <Spacer />
      </div>
    </main>
  )
}
