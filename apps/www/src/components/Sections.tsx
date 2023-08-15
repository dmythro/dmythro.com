'use client'

import { FC } from 'react'

import { Accordion, AccordionItem } from '@nextui-org/accordion'

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
  }
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
