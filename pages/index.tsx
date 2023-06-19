import type { NextPage } from 'next'

import type { LinkProps } from '@nextui-org/react'
import { Container, Grid, Link, Navbar, Spacer, Text, User } from '@nextui-org/react'
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

      <Navbar isBordered variant="sticky">
        <Navbar.Content>
          <User
            bordered
            color="gradient"
            name={USERNAME}
            description={t.meta.keywords}
            size="lg"
            src={avatarUserImg.src}
            altText={USERNAME}
            css={{ padding: 0 }}
          />
        </Navbar.Content>

        <NavLocaleLinks />

        <Navbar.Toggle showIn="xs" />
        <NavCollapseLocaleLinks />
      </Navbar>

      <Container gap={1} sm>
        <Spacer />

        <main>
          <Grid.Container css={{ flexDirection: 'row-reverse' }}>
            <Grid xs={12} sm={5}>
              <div>
                <PhotoCard />
                <Spacer />
                <SupportUkraineCard />
                {/* <Spacer />
                <SaveLevCard /> */}
              </div>
            </Grid>
            <Grid xs={12} sm={7}>
              <div>
                <Interests />
                <Spacer />
                <Links />
              </div>
            </Grid>
          </Grid.Container>
        </main>

        <Spacer />

        <Text
          as="footer"
          size="$xs"
          css={{ display: 'block', textAlign: 'center', a: { color: '$text', display: 'inline' } }}
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
        </Text>

        <Spacer />
      </Container>
    </>
  )
}

export default Home
