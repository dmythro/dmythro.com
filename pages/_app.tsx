import type { AppProps } from 'next/app'
import { NextIntlProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'
import { NextUIProvider } from '@nextui-org/react'

import { darkTheme, lightTheme } from 'src/themes'

function MyApp({ Component, pageProps }: AppProps) {
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
        <NextIntlProvider messages={pageProps.messages}>
          <Component {...pageProps} />
        </NextIntlProvider>
      </NextUIProvider>
    </ThemeProvider>
  )
}

export default MyApp
