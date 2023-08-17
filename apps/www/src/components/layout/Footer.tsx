import { FC } from 'react'

import { Button, ButtonProps } from '@nextui-org/button'
import { Link, LinkProps } from '@nextui-org/link'
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover'

import * as locales from 'my-locales'

import GitHubIcon from 'src/assets/github.svg'
import CodeIcon from 'src/assets/code-solid.svg'
import { WithLangProp } from 'src/types'

const lastPublishDate = new Date()

const footerLinkProps: ButtonProps & LinkProps = {
  className: 'flex grow',
  isExternal: true,
  showAnchorIcon: true,
  underline: 'hover',
  variant: 'ghost',
}

export const Footer: FC<WithLangProp> = ({ lang }) => {
  const t = locales[lang]

  return (
    <footer className="block text-center text-foreground-500">
      &copy; {lastPublishDate.getFullYear()} &bull;{' '}
      <Link
        color="foreground"
        href="https://github.com/dmythro/dmythro.com"
        anchorIcon={<GitHubIcon className="fill-foreground ml-1.5" width={16} height={16} />}
        showAnchorIcon
        underline="hover"
      >
        Source
      </Link>{' '}
      &bull;{' '}
      <Popover showArrow offset={10} placement="top">
        <PopoverTrigger>
          <Link
            anchorIcon={<CodeIcon className="fill-foreground ml-1.5" width={16} height={16} />}
            className="cursor-pointer"
            color="foreground"
            showAnchorIcon
            underline="hover"
          >
            {t.builtWith}
          </Link>
        </PopoverTrigger>

        <PopoverContent className="w-[240px] p-4">
          <h3 className="text-large mb-4">{t.builtWith}</h3>

          <div className="flex flex-wrap w-fit gap-2 mb-2">
            <Button
              as={Link}
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              {...footerLinkProps}
            >
              Vercel
            </Button>
            <Button as={Link} href="https://nextjs.org" {...footerLinkProps}>
              Next.js
            </Button>
            <Button as={Link} href="https://nextui.org" {...footerLinkProps}>
              NextUI
            </Button>
            <Button as={Link} href="https://tailwindcss.com" {...footerLinkProps}>
              Tailwind CSS
            </Button>
            <Button as={Link} href="https://fontawesome.com" {...footerLinkProps}>
              Font Awesome
            </Button>
            <Button as={Link} href="https://turbo.build/repo" {...footerLinkProps}>
              Turborepo
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </footer>
  )
}
