import { createContext, useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { Analytics } from '@vercel/analytics/react'

import type { IntlMessages } from 'src/global'
import type { LocaleCode } from 'locales'
import * as locales from 'locales'

import 'src/styles/global.css'

interface ILocaleContext {
  messages: IntlMessages
  setLocale: (locale: 'en' | 'uk') => void
}

export const LocaleContext = createContext<ILocaleContext>({
  messages: locales.en,
  setLocale: () => {},
})

function MyApp({ Component, pageProps, router }: AppProps) {
  const { locale } = router
  const [messages, setMessages] = useState<IntlMessages>(locales[locale as LocaleCode])
  const setLocale = (l: LocaleCode) => {
    setMessages(locales[l])
  }

  // Update locale
  useEffect(() => {
    setLocale(locale as LocaleCode)
  }, [locale])

  return (
    <>
      <NextUIProvider>
        <LocaleContext.Provider value={{ messages, setLocale }}>
          <Component {...pageProps} />
        </LocaleContext.Provider>
      </NextUIProvider>

      <Analytics />
    </>
  )
}

export default MyApp
