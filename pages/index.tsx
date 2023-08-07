import type { NextPage } from 'next'
import { useState } from 'react'

import type { LinkProps } from '@nextui-org/react'
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  Spacer,
  User,
} from '@nextui-org/react'
import { NextSeo, SocialProfileJsonLd } from 'next-seo'

import { BASE_URL, ESocialLinks, USERNAME } from 'src/constants'
import { NavMenuLocaleLinks, NavLocaleLinks } from 'src/components/nav/LocaleLinks'
import { Interests } from 'src/components/Interests'
import { Links } from 'src/components/Links'
import { PhotoCard } from 'src/components/PhotoCard'
// import { SaveLevCard } from 'src/components/SaveLevCard'
import { SupportUkraineCard } from 'src/components/SupportUkraineCard'
import { useT } from 'src/hooks/useT'
import { useTheme } from 'src/hooks/useTheme'

import avatarImg from 'public/avatar.jpg'
import avatarUserImg from 'public/avatar@44px.jpg'

const lastPublishDate = new Date()

const Home: NextPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>()

  const theme = useTheme()
  const t = useT()
  const footerLinkProps: LinkProps = {
    target: '_blank',
    rel: 'nofollow',
  }

  const [firstName, lastName] = t.fullName.split(' ')

  return (
    <main className={`${theme} text-foreground bg-background`}>
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

      <Navbar
        classNames={{
          item: [
            'flex',
            'relative',
            'h-full',
            'items-center',
            "data-[active=true]:after:content-['']",
            'data-[active=true]:after:absolute',
            'data-[active=true]:after:bottom-0',
            'data-[active=true]:after:left-0',
            'data-[active=true]:after:right-0',
            'data-[active=true]:after:h-[2px]',
            'data-[active=true]:after:rounded-[2px]',
            'data-[active=true]:after:bg-primary',
          ],
        }}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="py-2">
          <NavbarBrand className="py-2">
            <User
              avatarProps={{
                alt: USERNAME,
                color: 'primary',
                isBordered: true,
                // size: 'lg',
                src: avatarUserImg.src,
              }}
              name={USERNAME}
              description={t.meta.keywords}
            />
          </NavbarBrand>
        </NavbarContent>

        <NavLocaleLinks />

        <NavbarContent className="sm:hidden" justify="end">
          <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
        </NavbarContent>

        <NavMenuLocaleLinks />
      </Navbar>

      <div className="flex flex-col max-w-5xl mx-auto gap-4 p-4">
        <div className="flex flex-col sm:flex-row-reverse gap-4">
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

        <footer
          style={{
            display: 'block',
            textAlign: 'center',
          }}
        >
          &copy; {lastPublishDate.getFullYear()} &bull;{' '}
          <Link href="https://github.com/dmythro/dmythro.com">Source</Link> &bull; Powered by{' '}
          <Link
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            {...footerLinkProps}
          >
            Vercel
          </Link>
          ,{' '}
          <Link href="https://nextjs.org" {...footerLinkProps}>
            Next.js
          </Link>
          ,{' '}
          <Link href="https://nextui.org" {...footerLinkProps}>
            NextUI
          </Link>
        </footer>

        <Spacer />
      </div>
    </main>
  )
}

export default Home
