import type { InterestKey, LocaleCode } from '@dmythro/locales'
import FaqEn from '@dmythro/locales/mdx/faq.en.mdx'
import FaqUk from '@dmythro/locales/mdx/faq.uk.mdx'
import HobbiesEn from '@dmythro/locales/mdx/hobbies.en.mdx'
import HobbiesUk from '@dmythro/locales/mdx/hobbies.uk.mdx'
import MusicEn from '@dmythro/locales/mdx/music.en.mdx'
import MusicUk from '@dmythro/locales/mdx/music.uk.mdx'
import TravelEn from '@dmythro/locales/mdx/travel.en.mdx'
import TravelUk from '@dmythro/locales/mdx/travel.uk.mdx'
import WebDevEn from '@dmythro/locales/mdx/web-dev.en.mdx'
import WebDevUk from '@dmythro/locales/mdx/web-dev.uk.mdx'
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
