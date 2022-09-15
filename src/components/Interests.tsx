import { FC } from 'react'

import { Collapse, Spacer, Text } from '@nextui-org/react'

import { useT } from 'src/hooks/useT'

export const Interests: FC = () => {
  const { interests, socialMedia } = useT()
  const iconSize = 30

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
