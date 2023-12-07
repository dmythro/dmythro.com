import { Link } from '@nextui-org/link'

import { auth } from 'src/auth'
import { CVPdfLink } from 'src/components/CVPdfLink'
import { HomeLink } from 'src/components/HomeLink'
import { PhotoCard } from 'src/components/PhotoCard'
import { SupportUkraineCard } from 'src/components/SupportUkraineCard'
import { WithLangProp } from 'src/types'

export default async function ContactPage({ params }: { params: WithLangProp }) {
  const { lang } = params

  const session = await auth()
  const callbackUrl = encodeURIComponent(`/${lang}/contact`)

  return (
    <div className="flex max-w-[1024px] mx-auto p-4 md:p-6 relative print:block">
      <div className="flex flex-col sm:flex-row-reverse print:!flex-col gap-4 md:gap-6 relative print:block">
        <div className="basis-full sm:basis-5/12 sm:sticky print:!relative sm:self-start sm:top-0 print:!top-auto print:max-w-[60%] print:mx-auto print:mt-12">
          <div className="flex flex-col gap-4 md:gap-6 print:block">
            <PhotoCard lang={lang} />
            <SupportUkraineCard lang={lang} />
          </div>
        </div>
        <div className="basis-full sm:basis-7/12 print:block">
          <div className="flex flex-col gap-4 mb-4">
            {session && session.user ? (
              <>
                <h2 className="text-2xl">Contact</h2>
                <p>
                  Feel free to sign out{' '}
                  <Link href={`/api/auth/signout?callbackUrl=${callbackUrl}`}>here</Link>.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl">Contact: Authentication required</h2>
                <p>
                  You need to{' '}
                  <Link href={`/api/auth/signin?callbackUrl=${callbackUrl}`}>authenticate</Link> in
                  order to send me a message.
                </p>
              </>
            )}
          </div>
          <div className="print:hidden flex flex-row items-center text-foreground-400">
            <HomeLink lang={lang} />
            <span>&bull;</span>
            <CVPdfLink lang={lang} />
          </div>
        </div>
      </div>
    </div>
  )
}
