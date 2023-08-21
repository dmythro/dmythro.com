'use client'

import { availableLocales } from 'my-locales/constants'

import { usePathname } from 'next/navigation'

const re = new RegExp(`\/(${availableLocales.join('|')})`, 'i')

export const useCurrentPath = () => {
  const pathname = usePathname()

  return pathname.replace(re, '')
}
