import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import type { LocaleCode } from 'my-locales'
import { availableLocales } from 'my-locales/constants'

const defaultLocale: LocaleCode = 'en'
const headersLocaleKey = 'accept-language'

function getLocale(request: NextRequest) {
  const requestedLocales = new Negotiator({
    headers: {
      [headersLocaleKey]: request.headers.get(headersLocaleKey),
    },
  }).languages()

  return match(requestedLocales, availableLocales, defaultLocale)
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathnameIsMissingLocale = availableLocales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    return NextResponse.redirect(
      new URL(`/${locale}${pathname ? '/' + pathname : ''}`, request.url),
    )
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    // '/((?!_next).*)',
    // Only run on root (/) URL
    '/',
  ],
}
