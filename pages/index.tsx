import type { NextPage } from 'next'
import NextLink from 'next/link'

import { Container, Grid, Link, Navbar, Spacer, Text, User } from '@nextui-org/react'
import { NextSeo, SocialProfileJsonLd } from 'next-seo'
import { useTheme } from 'next-themes'

import { BASE_URL, ESocialLinks, USERNAME } from 'src/constants'
import { NavCollapseLocaleLinks, NavLocaleLinks } from 'src/components/nav/LocaleLinks'
import { Interests } from 'src/components/Interests'
import { Links } from 'src/components/Links'
import { PhotoCard } from 'src/components/PhotoCard'
import { SaveLevCard } from 'src/components/SaveLevCard'
import { SupportUkraineCard } from 'src/components/SupportUkraineCard'
import { useT } from 'src/hooks/useT'

import avatarImg from 'public/avatar.jpg'
import avatarUserImg from 'public/avatar@44px.jpg'
import VercelDarkImg from 'src/assets/vercel-logotype-dark.svg'
import VercelLightImg from 'src/assets/vercel-logotype-light.svg'

const Home: NextPage = () => {
  const theme = useTheme()
  const t = useT()
  const VercelImg = theme.resolvedTheme === 'dark' ? VercelLightImg : VercelDarkImg

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
                <Spacer />
                <SaveLevCard />
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
          css={{ display: 'block', textAlign: 'center', a: { display: 'inline' } }}
        >
          &copy; 2022 &bull;{' '}
          <NextLink href="https://github.com/dmythro/dmythro.com">
            <Link color="text">Source</Link>
          </NextLink>{' '}
          &bull; <span>Powered by</span>{' '}
          <NextLink
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Link color="text">Vercel</Link>
          </NextLink>
          ,{' '}
          <NextLink href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
            <Link color="text">Next.js</Link>
          </NextLink>
          ,{' '}
          <NextLink href="https://nextui.org" target="_blank" rel="noopener noreferrer">
            <Link color="text">NextUI</Link>
          </NextLink>
        </Text>

        <Spacer />
      </Container>
    </>
  )
}

export default Home
