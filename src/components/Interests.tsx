import { FC, useContext } from 'react'

import { Button, Collapse, Link, Spacer, Text } from '@nextui-org/react'
import { useTranslations } from 'next-intl'

import type{ InterestLocale } from 'locales'
import { LocaleContext } from 'pages/_app'
import { ESocialLinks } from 'src/constants'

import FacebookIcon from 'src/assets/facebook-f.svg'
import GitHubIcon from 'src/assets/github.svg'
import InstagramIcon from 'src/assets/instagram.svg'
import LinkedInIcon from 'src/assets/linkedin.svg'

export const Interests: FC = () => {
  const { messages } = useContext(LocaleContext)
  const interests = messages.interests as InterestLocale[]
  const t = useTranslations('socialMedia')
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
      <Collapse key="links" title={t('title')} subtitle={t('description')}>
        <div style={{ display: 'flex' }}>
          <Button
            as={Link}
            auto
            color="primary"
            href={ESocialLinks.github}
            icon={<GitHubIcon height={iconSize} />}
          >
            GitHub
          </Button>
          &nbsp;
          <Button
            as={Link}
            auto
            color="primary"
            href={ESocialLinks.linkedin}
            icon={<LinkedInIcon height={iconSize} style={{ fill: 'white' }} />}
          >
            LinkedIn
          </Button>
        </div>
        <div style={{ display: 'flex', marginTop: '.5em' }}>
          <Button
            as={Link}
            auto
            color="primary"
            href={ESocialLinks.facebook}
            icon={<FacebookIcon height={iconSize} style={{ fill: 'white' }} />}
          >
            Facebook
          </Button>
          &nbsp;
          <Button
            as={Link}
            auto
            color="primary"
            href={ESocialLinks.instagram}
            icon={<InstagramIcon height={iconSize} style={{ fill: 'white' }} />}
          >
            Instagram
          </Button>
        </div>
      </Collapse>
    </Collapse.Group>
  )
}
