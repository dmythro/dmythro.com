import { FC } from 'react'

import { Collapse, Spacer, Text } from '@nextui-org/react'
import { useLocale } from 'next-intl'

import type { LocaleCode, InterestLocale } from 'locales'
import * as locales from 'locales'

export const Interests: FC = () => {
  const locale = useLocale()
  const interests = locales[locale as LocaleCode].interests as InterestLocale[]

  return (
    <Collapse.Group>
      {interests.map((interest) => (
        <Collapse key={interest.title} title={interest.title} subtitle={interest.description}>
          {interest.tldr ? (
            <Text key="tldr">
              <Text em>TL;DR</Text>
              <br /> {interest.tldr}
            </Text>
          ) : null}

          <Spacer />

          {Array.isArray(interest.text)
            ? interest.text.map((line, index) => (
                <div key={index}>
                  <Text h4={line.length < 36}>{line}</Text>
                  <Spacer />
                </div>
              ))
            : interest.text}
        </Collapse>
      ))}
    </Collapse.Group>
  )
}
