import type { InterestKey, LocaleCode } from '@dmythro/locales'
import FaqEn from '@dmythro/locales/mdx/faq.en.md'
import FaqUk from '@dmythro/locales/mdx/faq.uk.md'
import HobbiesEn from '@dmythro/locales/mdx/hobbies.en.md'
import HobbiesUk from '@dmythro/locales/mdx/hobbies.uk.md'
import MusicEn from '@dmythro/locales/mdx/music.en.md'
import MusicUk from '@dmythro/locales/mdx/music.uk.md'
import TravelEn from '@dmythro/locales/mdx/travel.en.md'
import TravelUk from '@dmythro/locales/mdx/travel.uk.md'
import WebDevEn from '@dmythro/locales/mdx/web-dev.en.md'
import WebDevUk from '@dmythro/locales/mdx/web-dev.uk.md'
import type { FC } from 'react'
import { Links } from 'src/components/Links'

const sectionLocales: Record<
  InterestKey,
  unknown // Record<LocaleCode, (props) => JSX.Element | ReactNode>
> = {
  webDev: {
    en: WebDevEn,
    uk: WebDevUk,
  },
  music: {
    en: MusicEn,
    uk: MusicUk,
  },
  travel: {
    en: TravelEn,
    uk: TravelUk,
  },
  hobbies: {
    en: HobbiesEn,
    uk: HobbiesUk,
  },
  faq: {
    en: FaqEn,
    uk: FaqUk,
  },
  links: {
    en: Links,
    uk: Links,
  },
}

type Props = {
  interestKey: InterestKey
  lang: LocaleCode
}

export const SectionLocale: FC<Props> = ({ interestKey, lang }) => {
  const Component = sectionLocales[interestKey][lang]

  return <Component />
}
