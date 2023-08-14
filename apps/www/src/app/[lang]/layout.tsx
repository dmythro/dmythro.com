import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'

import type { LocaleCode } from 'my-locales'
import * as locales from 'my-locales'

import { Providers } from './providers'
import type { WithParams } from './types'

import 'src/styles/global.css'
import { initTheme } from 'src/theme'
import { USERNAME } from 'my-constants'

const availableLocales = Object.keys(locales) as LocaleCode[]
// const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
  return availableLocales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: WithParams) {
  const t = locales[params.lang]
  const meta: Metadata = {
    title: USERNAME,
    description: t.meta.description,
    keywords: t.meta.keywords,
  }

  return meta
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: LocaleCode }
}) {
  return (
    <html lang={params.lang}>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <script
          dangerouslySetInnerHTML={{ __html: `(${initTheme.toString().replace(/\s+/g, ' ')})()` }}
        />
      </head>
      {/* <body className={inter.className}> */}
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
