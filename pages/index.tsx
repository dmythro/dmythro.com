import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { Container, Grid, Link, Navbar, Spacer, Text, User } from '@nextui-org/react'
import { NextSeo } from 'next-seo'

import type { LocaleCode, Translation } from 'locales'
import * as locales from 'locales'
import { BASE_URL, USERNAME } from 'src/constants'
import { NavCollapseLocaleLinks, NavLocaleLinks } from 'src/components/nav/LocaleLinks'

import { useTranslations } from 'next-intl'

import avatarImage from 'public/avatar.jpg'

const Home: NextPage = () => {
  const t = useTranslations()

  return (
    <Container sm>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextSeo
        title={USERNAME}
        description={t('meta.description')}
        openGraph={{
          images: [
            {
              url: BASE_URL + avatarImage.src,
              width: avatarImage.width,
              height: avatarImage.height,
              alt: USERNAME,
              type: 'image/jpeg',
            },
          ],
        }}
        twitter={{
          site: USERNAME,
        }}
      />

      <Navbar isBordered variant="sticky">
        <Navbar.Content>
          <User
            bordered
            color="gradient"
            name={USERNAME}
            description={t('meta.keywords')}
            size="lg"
            src={avatarImage.src}
            css={{ padding: 0 }}
          />
        </Navbar.Content>

        <NavLocaleLinks />

        <Navbar.Toggle showIn="xs" />
        <NavCollapseLocaleLinks />
      </Navbar>

      <Spacer />

      <Grid.Container as="main">
        <Grid xs={12} sm={6}>
          <Text
            h1
            css={{
              textGradient: '45deg, $blue600 -20%, $pink600 50%',
            }}
          >
            {t('meta.keywords')
              .split(/,\s+/)
              .map((keyword) => (
                <Text h1 as="span" key={keyword}>
                  {keyword}
                  <br />
                </Text>
              ))}
          </Text>
        </Grid>
        <Grid xs={12} sm={6}>
          <div style={{ width: '100%' }}>
            <Image src={avatarImage} layout="responsive" alt={USERNAME} />
          </div>
        </Grid>
      </Grid.Container>

      <Spacer />

      <Text
        as="footer"
        size="$xs"
        css={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}
      >
        <span>Powered by</span>
        <span>&nbsp;</span>
        <Link
          block={false}
          color="text"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/vercel-logotype-light.svg"
            alt="Vercel"
            width={67}
            height={15}
            color="white"
          />
        </Link>
      </Text>
    </Container>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
  props: {
    messages: locales[locale as LocaleCode] as Translation,
  },
})
