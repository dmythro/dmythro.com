'use client'

import type { FC } from 'react'

import { Accordion, AccordionItem } from '@nextui-org/accordion'

import type { InterestKey, InterestLocale } from 'my-locales'

import myStudioImg from 'public/my-studio.webp'
import WorkIcon from 'src/assets/briefcase-solid.svg'
import FaqIcon from 'src/assets/clipboard-question-solid.svg'
import HobbiesIcon from 'src/assets/gamepad-solid.svg'
import MusicIcon from 'src/assets/headphones-simple-solid.svg'
import LinksIcon from 'src/assets/link-solid.svg'
import TravelIcon from 'src/assets/map-location-dot-solid.svg'

import { CVPdfLink } from 'src/components/CVPdfLink'
import { ResponsiveImage } from 'src/components/ResponsiveImage'
import { SectionLocale } from 'src/components/SectionLocale'
import { Stats } from 'src/components/Stats'
import { Timeline } from 'src/components/Timeline'
import { usePrint } from 'src/hooks/useMediaQuery'
import type { SvgIcon, WithLangProp } from 'src/types'
import { trackCustomEvent } from 'src/utils/analytics'
import { getT } from 'src/utils/getT'

const iconSize = 24

const sectionIcons: Record<string, SvgIcon> = {
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

  const interestList = Object.keys(t.interests) as InterestKey[]

  return (
    <article>
      <Accordion
        className="print:overflow-auto px-0"
        defaultSelectedKeys={isExpanded ? interestList : undefined}
        disableAnimation={isExpanded}
        disableIndicatorAnimation={isExpanded}
        keepContentMounted
        selectedKeys={isPrint ? interestList : undefined}
        selectionMode="multiple"
      >
        {interestList.map((interestKey) => {
          const Icon = sectionIcons[interestKey]
          const interest = t.interests[interestKey] as InterestLocale

          return (
            <AccordionItem
              key={interestKey}
              aria-label={interest.title}
              className="[&>section]:print:!opacity-100 [&>section]:print:!h-auto [&>section]:print:!overflow-y-auto print:break-before-page"
              id={interestKey}
              title={<h2>{interest.title}</h2>}
              textValue={interest.title}
              startContent={
                <Icon className="fill-current mx-1" width={iconSize} height={iconSize} />
              }
              subtitle={interest.description}
              onFocusChange={(isFocused) => {
                if (isFocused) {
                  trackCustomEvent('section_view', {
                    category: 'focus',
                    label: interestKey,
                  })
                }
              }}
            >
              {interestKey === 'webDev' && (
                <div className="float-right -mt-1 print:hidden">
                  <CVPdfLink lang={lang} />
                </div>
              )}

              <SectionLocale interestKey={interestKey} lang={lang} />

              {interestKey === 'webDev' && (
                <>
                  <ResponsiveImage src={myStudioImg} alt={t.myStudio} />

                  <Stats title={t.skillsTitle} items={t.skills} isExpanded={isExpanded} />

                  <Timeline title={t.generalTitle} items={t.generalTimeline} />
                  <Timeline title={t.careerTitle} items={t.careerTimeline} />
                </>
              )}

              {!isExpanded && interestKey === 'webDev' && (
                <div className="text-right print:hidden mb-4">
                  <CVPdfLink lang={lang} />
                </div>
              )}
            </AccordionItem>
          )
        })}
      </Accordion>
    </article>
  )
}
