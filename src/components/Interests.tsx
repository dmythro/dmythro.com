import { FC } from 'react'
import { useRouter } from 'next/router'

import { Accordion, AccordionItem, Chip } from '@nextui-org/react'

import WebDevEn from 'locales/mdx/web-dev.en.md'
import WebDevUk from 'locales/mdx/web-dev.uk.md'

import MusicEn from 'locales/mdx/music.en.md'
import MusicUk from 'locales/mdx/music.uk.md'

import TravelEn from 'locales/mdx/travel.en.md'
import TravelUk from 'locales/mdx/travel.uk.md'

import HobbiesEn from 'locales/mdx/hobbies.en.md'
import HobbiesUk from 'locales/mdx/hobbies.uk.md'

import { useT } from 'src/hooks/useT'
import { InterestLocale } from 'locales'

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

const isLooking = true

const SectionSubtitle: FC<{ interestKey: string; text: string }> = ({ interestKey, text }) => {
  const { openForWork } = useT()

  if (!isLooking || interestKey !== 'webDev') {
    return <>{text}</>
  }

  return (
    <>
      <Chip color="success" size="sm" variant="bordered">
        {openForWork}
      </Chip>
      <br />
      {text}
    </>
  )
}

export const Interests: FC = () => {
  const { locale = 'en' } = useRouter()
  const { interests } = useT()

  const interestList = Object.keys(interests)

  return (
    <Accordion selectionMode="multiple">
      {interestList.map((interestKey) => {
        const interest = interests[interestKey] as InterestLocale
        const LocaleMd =
          interestLocale[interestKey] && interestLocale[interestKey][locale]
            ? interestLocale[interestKey][locale]
            : null

        return (
          <AccordionItem
            key={interestKey}
            title={<h2>{interest.title}</h2>}
            subtitle={<SectionSubtitle interestKey={interestKey} text={interest.description} />}
            // subtitle={interest.description}
          >
            {LocaleMd ? (
              <article className="prose">
                <LocaleMd />
              </article>
            ) : (
              <em>TBD</em>
            )}
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
