import { FC } from 'react'

import { Button, Container, Link, Spacer, Text } from '@nextui-org/react'

import { ESocialLinks } from 'src/constants'
import { useT } from 'src/hooks/useT'

import FacebookIcon from 'src/assets/facebook-f.svg'
import GitHubIcon from 'src/assets/github.svg'
import InstagramIcon from 'src/assets/instagram.svg'
import LinkedInIcon from 'src/assets/linkedin.svg'
import TelegramIcon from 'src/assets/telegram.svg'
import TwitterIcon from 'src/assets/twitter.svg'

export const Links: FC = () => {
  const { socialMedia } = useT()
  const iconSize = 30

  return (
    <Container gap={1}>
      <Text h3>{socialMedia.title}</Text>
      {/* <Text color="secondary">{socialMedia.description}</Text> */}
      <Spacer />

      <div style={{ display: 'flex', maxWidth: '100%', flexWrap: 'wrap', gap: '.5em' }}>
        <Button
          as={Link}
          auto
          color="gradient"
          href={ESocialLinks.github}
          icon={<GitHubIcon height={iconSize} />}
        >
          GitHub
        </Button>
        <Button
          as={Link}
          auto
          color="gradient"
          href={ESocialLinks.linkedin}
          icon={<LinkedInIcon height={iconSize} style={{ fill: 'white' }} />}
        >
          LinkedIn
        </Button>
        <Button
          as={Link}
          auto
          color="gradient"
          href={ESocialLinks.telegram}
          icon={<TelegramIcon height={iconSize} style={{ fill: 'white' }} />}
        >
          Telegram
        </Button>
        <Button
          as={Link}
          auto
          color="gradient"
          href={ESocialLinks.facebook}
          icon={<FacebookIcon height={iconSize} style={{ fill: 'white' }} />}
        >
          Facebook
        </Button>
        <Button
          as={Link}
          auto
          color="gradient"
          href={ESocialLinks.instagram}
          icon={<InstagramIcon height={iconSize} style={{ fill: 'white' }} />}
        >
          Instagram
        </Button>
        <Button
          as={Link}
          auto
          color="gradient"
          href={ESocialLinks.twitter}
          icon={<TwitterIcon height={iconSize} style={{ fill: 'white' }} />}
        >
          Twitter
        </Button>
      </div>
    </Container>
  )
}
