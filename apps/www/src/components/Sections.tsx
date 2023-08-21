'use client'

import type { FC } from 'react'

import { MDXProvider } from '@mdx-js/react'
import { Accordion, AccordionItem } from '@nextui-org/accordion'

import WebDevEn from 'my-locales/mdx/web-dev.en.md'
import WebDevUk from 'my-locales/mdx/web-dev.uk.md'

import MusicEn from 'my-locales/mdx/music.en.md'
import MusicUk from 'my-locales/mdx/music.uk.md'

import TravelEn from 'my-locales/mdx/travel.en.md'
import TravelUk from 'my-locales/mdx/travel.uk.md'

import HobbiesEn from 'my-locales/mdx/hobbies.en.md'
import HobbiesUk from 'my-locales/mdx/hobbies.uk.md'

import FaqEn from 'my-locales/mdx/faq.en.md'
import FaqUk from 'my-locales/mdx/faq.uk.md'

import type { InterestLocale } from 'my-locales'

import myStudioImg from 'public/my-studio.webp'
import WorkIcon from 'src/assets/briefcase-solid.svg'
import MusicIcon from 'src/assets/headphones-simple-solid.svg'
import TravelIcon from 'src/assets/map-location-dot-solid.svg'
import HobbiesIcon from 'src/assets/gamepad-solid.svg'
import FaqIcon from 'src/assets/clipboard-question-solid.svg'
import LinksIcon from 'src/assets/link-solid.svg'

import { Links } from 'src/components/Links'
import { Timeline } from 'src/components/Timeline'
import { ResponsiveImage } from 'src/components/ResponsiveImage'
import { mdxComponents } from 'src/components/mdx'
import { usePrint } from 'src/hooks/useMediaQuery'
import { WithLangProp } from 'src/types'
import { trackCustomEvent } from 'src/utils/analytics'
import { getT } from 'src/utils/getT'

const iconSize = 24

const sectionLocale: Record<string, Record<string, any>> = {
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

const sectionIcons: Record<string, any> = {
  webDev: WorkIcon,
  music: MusicIcon,
  travel: TravelIcon,
  hobbies: HobbiesIcon,
  faq: FaqIcon,
  links: LinksIcon,
}

export const Sections: FC<WithLangProp & { isExpanded?: boolean }> = ({ isExpanded, lang }) => {
  const isPrint = usePrint() // useMediaQuery('print')
  const t = getT(lang)

  const interestList = Object.keys(t.interests)

  return (
    <article>
      <MDXProvider components={mdxComponents}>
        <Accordion
          className="print:overflow-auto"
          defaultExpandedKeys={isExpanded ? interestList : undefined}
          keepContentMounted
          selectedKeys={isPrint ? interestList : undefined}
          selectionMode="multiple"
        >
          {interestList.map((interestKey) => {
            const Icon = sectionIcons[interestKey]
            const LocaleMd =
              sectionLocale[interestKey] && sectionLocale[interestKey][lang]
                ? sectionLocale[interestKey][lang]
                : null
            const interest = t.interests[interestKey] as InterestLocale

            return (
              <AccordionItem
                key={interestKey}
                aria-label={interest.title}
                className="[&>section]:print:!opacity-100 [&>section]:print:!h-auto [&>section]:print:!overflow-y-auto print:break-before-page"
                id={interestKey}
                title={<h2>{interest.title}</h2>}
                textValue={interest.title}
                startContent={<Icon className="fill-current" width={iconSize} height={iconSize} />}
                subtitle={interest.description}
                onFocusChange={(isFocused) => {
                  if (isFocused) {
                    trackCustomEvent('section_view', { category: 'focus', label: interestKey })
                  }
                }}
              >
                {LocaleMd ? (
                  <>
                    <LocaleMd />

                    {interestKey === 'webDev' && (
                      <>
                        <ResponsiveImage src={myStudioImg} alt={t.myStudio} />

                        <Timeline title={t.generalTitle} items={t.generalTimeline} />
                        <Timeline title={t.careerTitle} items={t.careerTimeline} />
                      </>
                    )}
                  </>
                ) : (
                  <>&nbsp;</>
                )}
              </AccordionItem>
            )
          })}
        </Accordion>
      </MDXProvider>
    </article>
  )
}
