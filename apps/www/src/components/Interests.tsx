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

import type { InterestLocale, LocaleCode } from 'my-locales'
import { useLang, useT } from 'src/hooks/useT'

import { Timeline } from 'src/components/Timeline'

const interestLocale: Record<string, Record<string, any>> = {
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
}

export const Interests: FC = () => {
  const locale = useLang()
  const t = useT()

  const interestList = Object.keys(t.interests)

  return (
    <Accordion keepContentMounted selectionMode="multiple">
      {interestList.map((interestKey) => {
        const interest = t.interests[interestKey] as InterestLocale
        const LocaleMd =
          interestLocale[interestKey] && interestLocale[interestKey][locale]
            ? interestLocale[interestKey][locale]
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
