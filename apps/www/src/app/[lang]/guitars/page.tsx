import { redirect } from 'next/navigation'
import type { ParamsWithLang } from 'src/types'

export default async function GuitarsPage({ params }: ParamsWithLang) {
  const { lang } = await params
  redirect(`/${lang}/guitars/string-tension`)
}
