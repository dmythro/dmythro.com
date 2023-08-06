import { FC } from 'react'

import { Button, Link, Spacer } from '@nextui-org/react'
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
      startContent: <GitHubIcon height={iconSize} />,
      href: ESocialLinks.github,
    },
    {
      children: 'LinkedIn',
      startContent: <LinkedInIcon height={iconSize} style={{ fill: 'white' }} />,
      href: ESocialLinks.linkedin,
    },
    {
      children: 'Telegram',
      startContent: <TelegramIcon height={iconSize} style={{ fill: 'white' }} />,
      href: ESocialLinks.telegram,
    },
    {
      children: 'Facebook',
      startContent: <FacebookIcon height={iconSize} style={{ fill: 'white' }} />,
      href: ESocialLinks.facebook,
    },
    {
      children: 'Instagram',
      startContent: <InstagramIcon height={iconSize} style={{ fill: 'white' }} />,
      href: ESocialLinks.instagram,
    },
    {
      children: 'Threads',
      startContent: <ThreadsIcon height={iconSize} style={{ fill: 'white' }} />,
      href: ESocialLinks.threads,
    },
    {
      children: 'Twitter',
      startContent: <TwitterIcon height={iconSize} style={{ fill: 'white' }} />,
      href: ESocialLinks.twitter,
    },
  ]

  return (
    <div className="flex flex-col">
      <h3>{socialMedia.title}</h3>
      {/* <Text color="secondary">{socialMedia.description}</Text> */}
      <Spacer />

      <div style={{ display: 'flex', maxWidth: '100%', flexWrap: 'wrap', gap: '.5em' }}>
        {linkProps.map((props) => (
          <Button
            key={props.href}
            as={Link}
            auto
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            rel="me"
            role="link"
            {...props}
          />
        ))}
      </div>
    </div>
  )
}
