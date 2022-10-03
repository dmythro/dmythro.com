import { createContext, useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { NextUIProvider } from '@nextui-org/react'

import type { IntlMessages } from 'src/global'
import type { LocaleCode } from 'locales'
import * as locales from 'locales'
import { darkTheme, lightTheme } from 'src/themes'

import '../public/styles.css'

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
    <ThemeProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <LocaleContext.Provider value={{ messages, setLocale }}>
          <Component {...pageProps} />
        </LocaleContext.Provider>
      </NextUIProvider>
    </ThemeProvider>
  )
}

export default MyApp
