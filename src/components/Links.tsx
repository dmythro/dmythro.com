import { FC } from 'react'

import { Button, Container, Link, Spacer, Text } from '@nextui-org/react'
import type { ButtonProps } from '@nextui-org/react'

import { ESocialLinks } from 'src/constants'
import { useT } from 'src/hooks/useT'

import FacebookIcon from 'src/assets/facebook-f.svg'
import GitHubIcon from 'src/assets/github.svg'
import InstagramIcon from 'src/assets/instagram.svg'
import LinkedInIcon from 'src/assets/linkedin.svg'
import TelegramIcon from 'src/assets/telegram.svg'
import ThreadsIcon from 'src/assets/threads.svg'
import TwitterIcon from 'src/assets/twitter.svg'

export const Links: FC = () => {
  const { socialMedia } = useT()
  const iconSize = 30

  const linkProps: ButtonProps[] = [
    {
      children: 'GitHub',
      icon: <GitHubIcon height={iconSize} />,
      href: ESocialLinks.github,
    },
    {
      children: 'LinkedIn',
      icon: <LinkedInIcon height={iconSize} style={{ fill: 'white' }} />,
      href: ESocialLinks.linkedin,
    },
    {
      children: 'Telegram',
      icon: <TelegramIcon height={iconSize} style={{ fill: 'white' }} />,
      href: ESocialLinks.telegram,
    },
    {
      children: 'Facebook',
      icon: <FacebookIcon height={iconSize} style={{ fill: 'white' }} />,
      href: ESocialLinks.facebook,
    },
    {
      children: 'Instagram',
      icon: <InstagramIcon height={iconSize} style={{ fill: 'white' }} />,
      href: ESocialLinks.instagram,
    },
    {
      children: 'Threads',
      icon: <ThreadsIcon height={iconSize} style={{ fill: 'white' }} />,
      href: ESocialLinks.threads,
    },
    {
      children: 'Twitter',
      icon: <TwitterIcon height={iconSize} style={{ fill: 'white' }} />,
      href: ESocialLinks.twitter,
    },
  ]

  return (
    <Container gap={1}>
      <Text h3>{socialMedia.title}</Text>
      {/* <Text color="secondary">{socialMedia.description}</Text> */}
      <Spacer />

      <div style={{ display: 'flex', maxWidth: '100%', flexWrap: 'wrap', gap: '.5em' }}>
        {linkProps.map((props) => (
          <Button
            key={props.href}
            as={Link}
            auto
            color="gradient"
            rel="me"
            role="link"
            {...props}
          />
        ))}
      </div>
    </Container>
  )
}
