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

export const iconSize = 30

export const linkProps: Pick<ButtonProps, 'children' | 'startContent' | 'href'>[] = [
  {
    children: 'GitHub',
    startContent: <GitHubIcon height={iconSize} width={iconSize} />,
    href: ESocialLinks.github,
  },
  {
    children: 'LinkedIn',
    startContent: <LinkedInIcon height={iconSize} width={iconSize} style={{ fill: 'white' }} />,
    href: ESocialLinks.linkedin,
  },
  {
    children: 'Telegram',
    startContent: <TelegramIcon height={iconSize} width={iconSize} style={{ fill: 'white' }} />,
    href: ESocialLinks.telegram,
  },
  {
    children: 'Facebook',
    startContent: <FacebookIcon height={iconSize} width={iconSize} style={{ fill: 'white' }} />,
    href: ESocialLinks.facebook,
  },
  {
    children: 'Instagram',
    startContent: <InstagramIcon height={iconSize} width={iconSize} style={{ fill: 'white' }} />,
    href: ESocialLinks.instagram,
  },
  {
    children: 'Threads',
    startContent: <ThreadsIcon height={iconSize} width={iconSize} style={{ fill: 'white' }} />,
    href: ESocialLinks.threads,
  },
  {
    children: 'Twitter',
    startContent: <TwitterIcon height={iconSize} width={iconSize} style={{ fill: 'white' }} />,
    href: ESocialLinks.twitter,
  },
]

export const Links: FC = () => {
  const { socialMedia } = useT()

  return (
    <div className="flex flex-col gap-1 px-2">
      <h2 className="text-foreground text-large">{socialMedia.title}</h2>
      {/* <Text color="secondary">{socialMedia.description}</Text> */}
      <Spacer />

      <div className="flex flex-wrap w-full gap-2">
        {linkProps.map((props) => (
          <Button
            key={props.href}
            as={Link}
            className="bg-gradient-to-tr from-purple-600 to-primary-500 text-white shadow-lg"
            rel="me"
            role="link"
            {...props}
          />
        ))}
      </div>
    </div>
  )
}
