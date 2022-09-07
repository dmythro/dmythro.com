import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { Container, Grid, Link, Navbar, Spacer, Text, User } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { NextSeo, SocialProfileJsonLd } from 'next-seo'
import { useTheme } from 'next-themes'

import type { LocaleCode, Translation } from 'locales'
import * as locales from 'locales'
import { BASE_URL, ESocialLinks, USERNAME } from 'src/constants'
import { NavCollapseLocaleLinks, NavLocaleLinks } from 'src/components/nav/LocaleLinks'
import { Interests } from 'src/components/Interests'
import { PhotoCard } from 'src/components/PhotoCard'

import avatarImg from 'public/avatar.jpg'
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
            src="/avatar.jpg"
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
                url: BASE_URL + avatarImg.src,
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
          css={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}
        >
          <Link color="text" href="https://github.com/dmythro/dmythro.com">
            Source
          </Link>
          <span>&nbsp;&bull;&nbsp;</span>
          <span>Powered by</span>
          <span>&nbsp;</span>
          <Link
            block={false}
            color="text"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <VercelImg height={16} width={67} />
          </Link>
        </Text>

        <Spacer />
      </Container>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
  props: {
    messages: locales[locale as LocaleCode] as Translation,
  },
})
