// import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import Script from 'next/script'
import type { Person, WithContext } from 'schema-dts'
// import { Inter } from 'next/font/google'

import { BASE_URL, ESocialLinks, USERNAME } from 'my-constants'
import * as locales from 'my-locales'
import { availableLocales } from 'my-locales/constants'

import { Footer } from 'src/components/layout/Footer'
import { TopNavbar } from 'src/components/layout/TopNavbar'
import type { ParamsWithLang } from 'src/types'
import { GA_TRACKING_ID } from 'src/utils/analytics'
import { initTheme } from 'src/utils/theme'

import { Providers } from './providers'

// import avatarImg from 'public/avatar@og.jpg'
import { getT } from 'src/utils/getT'

const GA_DEBUG = process.env.NODE_ENV === 'development' ? 'true' : 'false'
// const inter = Inter({ subsets: ['latin'] })

export { viewport } from 'src/constants'

export async function generateStaticParams() {
  return availableLocales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: ParamsWithLang) {
  const t = getT(params.lang)

  const [firstName, lastName] = t.fullName.split(' ')
  const { description, keywords } = t.meta

  const meta: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: USERNAME,
    description,
    keywords,
    manifest: '/manifest.webmanifest',
    alternates: {
      languages: Object.fromEntries(availableLocales.map((lang) => [lang, `/${lang}`])),
    },
    icons: [
      { url: '/favicon.ico' },
      { type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png' },
      { type: 'image/png', sizes: '16x16', url: '/favicon-16x16.png' },
      {
        type: 'image/png',
        sizes: '180x180',
        url: '/apple-touch-icon.png',
        rel: 'apple-touch-icon',
      },
    ],
    openGraph: {
      title: USERNAME,
      description,
      // Removed in favor of the `opengraph-image`:
      // images: [
      //   {
      //     url: '/avatar@og.jpg',
      //     width: avatarImg.width,
      //     height: avatarImg.height,
      //     alt: USERNAME,
      //     type: 'image/jpeg',
      //   },
      // ],
      type: 'profile',
      url: BASE_URL,
      firstName,
      lastName,
      username: USERNAME.replace('@', ''),
      gender: 'male',
    },
    twitter: {
      site: USERNAME,
      card: 'summary',
    },
  }

  return meta
}

export default function LangLayout({ children, params }: ParamsWithLang) {
  const { lang } = params
  const t = locales[lang]
  const personJsonLd: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: t.fullName,
    url: BASE_URL,
    sameAs: [
      ESocialLinks.github,
      ESocialLinks.linkedin,
      ESocialLinks.facebook,
      ESocialLinks.instagram,
      ESocialLinks.twitter,
      ESocialLinks.threads,
    ],
  }

  return (
    <html lang={lang}>
      <head>
        <link rel="sitemap" href="/sitemap.xml" />
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: this is a special case
          dangerouslySetInnerHTML={{
            __html: `(${initTheme.toString().replace(/\s+/g, ' ')})()`,
          }}
        />
      </head>
      {/* <body className={inter.className}> */}
      <body>
        <main>
          <Providers>
            <TopNavbar lang={lang} />
            {children}
            <Footer lang={lang} />
          </Providers>
        </main>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: this is a special case
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd),
          }}
        />
        <Analytics />
        <SpeedInsights />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: this is a special case
          dangerouslySetInnerHTML={{
            __html: `
   window.dataLayer = window.dataLayer || [];
   function gtag(){window.dataLayer.push(arguments);}
   gtag('js', new Date());
   gtag('config', '${GA_TRACKING_ID}', { debug_mode: ${GA_DEBUG} });
 `,
          }}
        />
      </body>
    </html>
  )
}
