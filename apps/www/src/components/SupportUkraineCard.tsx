'use client'

import dayjs from 'dayjs'
import { type FC, useState } from 'react'

import { Card, CardBody, CardFooter } from '@heroui/card'
import { Link } from '@heroui/link'

import type { LangProp } from 'src/types'
import { getT } from 'src/utils/getT'

import InfoIcon from 'src/assets/circle-info-solid.svg'

export const invasionStartDate = '2022-02-24'
const todayDate = new Date().toISOString().split('T')[0]
const daysSinceInvasion = dayjs(todayDate).diff(invasionStartDate, 'days')

export const SupportUkraineCard: FC<LangProp> = ({ lang }) => {
  const [isExpanded, setExpanded] = useState(false)
  const { supportUkraine } = getT(lang)

  return (
    <Card
      className="flex w-full print:block print:border-small print:rounded-md print:shadow-none print:transition-none print:mt-4"
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
              className="print:bg-transparent print:text-foreground dark:text-blue-300"
              href="https://war.ukraine.ua/support-ukraine/"
              isExternal
              showAnchorIcon
              target="_blank"
              underline="hover"
            >
              {supportUkraine.linkTitle}
            </Link>
          </CardFooter>
        </>
      ) : (
        <CardBody className="flex flex-row items-center">
          <span className="flex text-primary dark:text-blue-300 flex-grow">
            #StandWithUkraine 🇺🇦
          </span>
          <InfoIcon className="fill-foreground print:hidden" width={18} height={18} />
        </CardBody>
      )}
    </Card>
  )
}
