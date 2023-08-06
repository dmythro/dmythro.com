import type { NextPage } from 'next'

import type { LinkProps } from '@nextui-org/react'
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Spacer,
  User,
} from '@nextui-org/react'
import { NextSeo, SocialProfileJsonLd } from 'next-seo'

import { BASE_URL, ESocialLinks, USERNAME } from 'src/constants'
import { NavCollapseLocaleLinks, NavLocaleLinks } from 'src/components/nav/LocaleLinks'
import { Interests } from 'src/components/Interests'
import { Links } from 'src/components/Links'
import { PhotoCard } from 'src/components/PhotoCard'
// import { SaveLevCard } from 'src/components/SaveLevCard'
import { SupportUkraineCard } from 'src/components/SupportUkraineCard'
import { useT } from 'src/hooks/useT'

import avatarImg from 'public/avatar.jpg'
import avatarUserImg from 'public/avatar@44px.jpg'

const lastPublishDate = new Date()

const Home: NextPage = () => {
  const t = useT()
  const footerLinkProps: LinkProps = {
    target: '_blank',
    rel: 'nofollow',
  }

  const [firstName, lastName] = t.fullName.split(' ')

  return (
    <>
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

      <Navbar isBordered>
        <NavbarContent>
          <User
            avatarProps={{
              alt: USERNAME,
              color: 'secondary',
              isBordered: true,
              size: 'lg',
              src: avatarUserImg.src,
            }}
            name={USERNAME}
            description={t.meta.keywords}
          />
        </NavbarContent>

        <NavLocaleLinks />

        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle />
        </NavbarContent>

        <NavCollapseLocaleLinks />
      </Navbar>

      <div className="flex flex-col max-w-5xl mx-auto">
        <Spacer />

        <main className="flex flex-row-reverse">
          <div className="basis-full md:basis-5/12">
            <div>
              <PhotoCard />
              <Spacer />
              <SupportUkraineCard />
              {/* <Spacer />
                <SaveLevCard /> */}
            </div>
          </div>
          <div className="basis-full md:basis-7/12">
            <div>
              <Interests />
              <Spacer />
              <Links />
            </div>
          </div>
        </main>

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
    </>
  )
}

export default Home
