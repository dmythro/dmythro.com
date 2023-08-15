import { Button, ButtonProps } from '@nextui-org/button'
import { Link, LinkProps } from '@nextui-org/link'
import { Spacer } from '@nextui-org/spacer'
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover'

import { Interests } from 'src/components/Interests'
import { Links } from 'src/components/Links'
import { PhotoCard } from 'src/components/PhotoCard'
// import { SaveLevCard } from 'src/components/SaveLevCard'
import { SupportUkraineCard } from 'src/components/SupportUkraineCard'
import { TopNavbar } from 'src/components/nav/TopNavbar'

import GitHubIcon from 'src/assets/github.svg'
import CodeIcon from 'src/assets/code-solid.svg'

const lastPublishDate = new Date()

import type { LocaleCode } from 'my-locales'
import * as locales from 'my-locales'

export default function Home({ params }: { params: { lang: LocaleCode } }) {
  const t = locales[params.lang]

  const footerLinkProps: ButtonProps & LinkProps = {
    className: 'flex grow',
    isExternal: true,
    showAnchorIcon: true,
    underline: 'hover',
    variant: 'ghost',
  }

  return (
    <main>
      <TopNavbar />

      <div className="flex flex-col max-w-5xl mx-auto gap-4 p-4 relative">
        <div className="flex flex-col sm:flex-row-reverse gap-4 relative">
          <div className="basis-full sm:basis-5/12 sm:sticky sm:self-start sm:top-0">
            <div className="flex flex-col gap-1">
              <PhotoCard />
              <Spacer />
              <SupportUkraineCard />
              {/* <Spacer />
                <SaveLevCard /> */}
            </div>
          </div>
          <div className="basis-full sm:basis-7/12">
            <div>
              <Interests />
              <Spacer />
              <Links />
            </div>
          </div>
        </div>

        <Spacer />

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

        <Spacer />
      </div>
    </main>
  )
}
