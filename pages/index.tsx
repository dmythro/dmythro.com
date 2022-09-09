import type { GetStaticProps, NextPage } from 'next'

import { Container, Grid, Link, Navbar, Spacer, Text, User } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { NextSeo, SocialProfileJsonLd } from 'next-seo'
import { useTheme } from 'next-themes'

import { BASE_URL, ESocialLinks, USERNAME } from 'src/constants'
import { NavCollapseLocaleLinks, NavLocaleLinks } from 'src/components/nav/LocaleLinks'
import { Interests } from 'src/components/Interests'
import { PhotoCard } from 'src/components/PhotoCard'

import avatarImg from 'public/avatar.jpg'
import avatarUserImg from 'public/avatar@44px.jpg'
import VercelDarkImg from 'src/assets/vercel-logotype-dark.svg'
import VercelLightImg from 'src/assets/vercel-logotype-light.svg'

const Home: NextPage = () => {
  const theme = useTheme()
  const t = useTranslations()
  const VercelImg = theme.resolvedTheme === 'dark' ? VercelLightImg : VercelDarkImg

  return (
    <>
      <Navbar isBordered variant="sticky">
        <Navbar.Content>
          <User
            bordered
            color="gradient"
            name={USERNAME}
            description={t('meta.keywords')}
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

      <Container sm>
        <NextSeo
          title={USERNAME}
          description={t('meta.description')}
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
          name={t('fullName')}
          url={BASE_URL}
          sameAs={[
            ESocialLinks.facebook,
            ESocialLinks.github,
            ESocialLinks.instagram,
            ESocialLinks.linkedin,
          ]}
        />

        <Spacer />

        <Grid.Container as="main" css={{ flexDirection: 'row-reverse' }}>
          <Grid xs={12} sm={5}>
            <PhotoCard />
          </Grid>
          <Grid xs={12} sm={7}>
            <Interests />
          </Grid>
        </Grid.Container>

        <Spacer />

        <Text
          as="footer"
          size="$xs"
          css={{ display: 'flex', justifyContent: 'center', textAlign: 'right' }}
        >
          <span>&copy; 2022 &bull;&nbsp;</span>
          <Link color="text" href="https://github.com/dmythro/dmythro.com">
            Source
          </Link>
          <span>&nbsp;&bull;&nbsp;</span>
          <span>Powered by</span>
          <span>&nbsp;</span>
          <Link
            aria-label="Vercel link"
            block={false}
            color="text"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <VercelImg aria-label="Vercel logo" height={12} />
          </Link>
        </Text>

        <Spacer />
      </Container>
    </>
  )
}

export default Home
