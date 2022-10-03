import { FC } from 'react'
import { useRouter } from 'next/router'

import { Collapse, Text } from '@nextui-org/react'

import WebDevEn from 'locales/mdx/web-dev.en.md'
import WebDevUk from 'locales/mdx/web-dev.uk.md'

import { useT } from 'src/hooks/useT'
import { InterestLocale } from 'locales'

const interestLocale: Record<string, Record<string, any>> = {
  webDev: {
    en: WebDevEn,
    uk: WebDevUk,
  },
}

export const Interests: FC = () => {
  const { locale = 'en' } = useRouter()
  const { interests } = useT()

  const interestList = Object.keys(interests)

  return (
    <Collapse.Group>
      {interestList.map((interestKey) => {
        const interest = interests[interestKey] as InterestLocale
        const LocaleMd = interestLocale[interestKey] ? interestLocale[interestKey][locale] : null

        return (
          <Collapse key={interestKey} title={interest.title} subtitle={interest.description}>
            {LocaleMd ? <LocaleMd /> : <Text em>TBD</Text>}
          </Collapse>
        )
      })}
    </Collapse.Group>
  )
}
