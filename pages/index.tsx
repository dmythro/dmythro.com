import type { NextPage } from 'next'

import type { ButtonProps, LinkProps } from '@nextui-org/react'
import { Button, Link, Popover, PopoverContent, PopoverTrigger, Spacer } from '@nextui-org/react'
import { NextSeo, SocialProfileJsonLd } from 'next-seo'

import { BASE_URL, ESocialLinks, USERNAME, isOpenToWork } from 'src/constants'

import { Interests } from 'src/components/Interests'
import { Links } from 'src/components/Links'
import { PhotoCard } from 'src/components/PhotoCard'
// import { SaveLevCard } from 'src/components/SaveLevCard'
import { SupportUkraineCard } from 'src/components/SupportUkraineCard'
import { TopNavbar } from 'src/components/nav/TopNavbar'
import { useT } from 'src/hooks/useT'

import avatarImg from 'public/avatar.jpg'
import GitHubIcon from 'src/assets/github.svg'
import CodeIcon from 'src/assets/code-solid.svg'

const lastPublishDate = new Date()

const Home: NextPage = () => {
  const t = useT()

  const footerLinkProps: ButtonProps & LinkProps = {
    className: 'flex grow',
    isExternal: true,
    showAnchorIcon: true,
    underline: 'hover',
    variant: 'ghost',
  }

  const [firstName, lastName] = t.fullName.split(' ')

  return (
    <main>
      <NextSeo
        title={USERNAME}
        description={t.meta.description}
        openGraph={{
          images: [
            {
              url: BASE_URL + '/avatar.jpg',
              width: avatarImg.width,
              height: avatarImg.height,
              alt: USERNAME,
              type: 'image/jpeg',
            },
          ],
          profile: {
            firstName,
            lastName,
            username: USERNAME.replace('@', ''),
            gender: 'male',
          },
          type: 'profile',
          url: ESocialLinks.facebook,
        }}
        twitter={{
          cardType: 'summary',
          site: USERNAME,
        }}
      />

      <SocialProfileJsonLd
        type="Person"
        name={t.fullName}
        url={BASE_URL}
        sameAs={[
          ESocialLinks.facebook,
          ESocialLinks.github,
          ESocialLinks.instagram,
          ESocialLinks.linkedin,
          ESocialLinks.twitter,
        ]}
      />

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

        <footer className="block text-center text-neutral-500">
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
              <h3 className="text-large">{t.builtWith}</h3>

              <div className="flex flex-wrap w-fit gap-2 py-1">
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
              </div>
            </PopoverContent>
          </Popover>
        </footer>

        <Spacer />
      </div>
    </main>
  )
}

export default Home
