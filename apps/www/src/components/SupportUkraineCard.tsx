'use client'

import type { FC } from 'react'
import { useState } from 'react'
import dayjs from 'dayjs'

import { Card, CardBody, CardFooter } from '@nextui-org/card'
import { Link } from '@nextui-org/link'

import { getT } from 'src/utils/getT'
import { WithLangProp } from 'src/types'

import InfoIcon from 'src/assets/circle-info-solid.svg'

export const invasionStartDate = '2022-02-24'
const todayDate = new Date().toISOString().split('T')[0]
const daysSinceInvasion = dayjs(todayDate).diff(invasionStartDate, 'days')

export const SupportUkraineCard: FC<WithLangProp> = ({ lang }) => {
  const [isExpanded, setExpanded] = useState(false)
  const { supportUkraine } = getT(lang)

  return (
    <Card
      className="flex w-full print:border-small print:rounded-md print:shadow-none print:mt-4"
      isHoverable
      isPressable
      shadow="md"
      onClick={() => {
        setExpanded((value) => !value)
      }}
    >
      {isExpanded ? (
        <>
          <CardBody>{supportUkraine.message(daysSinceInvasion + 1)}</CardBody>
          <CardFooter>
            <Link
              isBlock
              className="print:bg-transparent print:text-foreground"
              href="https://war.ukraine.ua/support-ukraine/"
              isExternal
              showAnchorIcon
              target="_blank"
            >
              {supportUkraine.linkTitle}
            </Link>
          </CardFooter>
        </>
      ) : (
        <CardBody className="flex flex-row items-center">
          <span className="flex text-primary flex-grow">#StandWithUkraine 🇺🇦</span>
          <InfoIcon className="fill-foreground print:hidden" width={18} height={18} />
        </CardBody>
      )}
    </Card>
  )
}
