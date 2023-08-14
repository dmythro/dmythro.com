'use client'

import { useParams } from 'next/navigation'

import type { LocaleCode } from 'my-locales'
import * as locales from 'my-locales'

export const useLang = () => {
  const { lang } = useParams() as { lang: LocaleCode }
  return lang || 'en'
}

export const useT = () => {
  const lang = useLang()
  return locales[lang]
}
