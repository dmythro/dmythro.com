'use client'

import { FC } from 'react'
import Image from 'next/image'

import { Accordion, AccordionItem } from '@nextui-org/accordion'
import { Card, CardFooter } from '@nextui-org/card'

import WebDevEn from 'my-locales/mdx/web-dev.en.md'
import WebDevUk from 'my-locales/mdx/web-dev.uk.md'

import MusicEn from 'my-locales/mdx/music.en.md'
import MusicUk from 'my-locales/mdx/music.uk.md'

import TravelEn from 'my-locales/mdx/travel.en.md'
import TravelUk from 'my-locales/mdx/travel.uk.md'

import HobbiesEn from 'my-locales/mdx/hobbies.en.md'
import HobbiesUk from 'my-locales/mdx/hobbies.uk.md'

import FaqEn from 'my-locales/mdx/faq.en.md'
import FaqUk from 'my-locales/mdx/faq.uk.md'

import type { InterestLocale } from 'my-locales'

import myStudioImg from 'public/my-studio.webp'
import { useLang, useT } from 'src/hooks/useT'

import { Timeline } from 'src/components/Timeline'

const sectionLocale: Record<string, Record<string, any>> = {
  webDev: {
    en: WebDevEn,
    uk: WebDevUk,
  },
  music: {
    en: MusicEn,
    uk: MusicUk,
  },
  travel: {
    en: TravelEn,
    uk: TravelUk,
  },
  hobbies: {
    en: HobbiesEn,
    uk: HobbiesUk,
  },
  faq: {
    en: FaqEn,
    uk: FaqUk,
  },
}

export const Sections: FC = () => {
  const locale = useLang()
  const t = useT()

  const interestList = Object.keys(t.interests)

  return (
    <Accordion keepContentMounted selectionMode="multiple">
      {interestList.map((interestKey) => {
        const interest = t.interests[interestKey] as InterestLocale
        const LocaleMd =
          sectionLocale[interestKey] && sectionLocale[interestKey][locale]
            ? sectionLocale[interestKey][locale]
            : null

        return (
          <AccordionItem
            key={interestKey}
            aria-label={interest.title}
            title={<h2>{interest.title}</h2>}
            textValue={interest.title}
            subtitle={interest.description}
          >
            {LocaleMd ? (
              <>
                <article className="prose dark:prose-invert">
                  <LocaleMd />
                </article>
                {interestKey === 'webDev' && (
                  <>
                    <Card as="figure" className="block relative mt-4" isFooterBlurred>
                      <Image placeholder="blur" src={myStudioImg} alt={t.myStudio} />
                      <CardFooter
                        as="figcaption"
                        className="before:bg-white/10 py-1 block absolute before:rounded-xl rounded-lg text-tiny text-white/80 bottom-2 right-2 max-w-fit ml-1 z-10"
                      >
                        {t.myStudio}
                      </CardFooter>
                    </Card>

                    <Timeline title={t.generalTitle} items={t.generalTimeline} />
                    <Timeline title={t.careerTitle} items={t.careerTimeline} />
                  </>
                )}
              </>
            ) : (
              <em>TBD</em>
            )}
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}