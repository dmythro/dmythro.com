'use client'

import { FC } from 'react'
import dayjs from 'dayjs'

import { Card, CardBody, CardFooter } from '@nextui-org/card'
import { Link } from '@nextui-org/link'

import { getT } from 'src/utils/getT'
import { WithLangProp } from 'src/types'

export const invasionStartDate = '2022-02-24'
const todayDate = new Date().toISOString().split('T')[0]
const daysSinceInvasion = dayjs(todayDate).diff(invasionStartDate, 'days')

export const SupportUkraineCard: FC<WithLangProp> = ({ lang }) => {
  const { supportUkraine } = getT(lang)

  return (
    <Card>
      <CardBody>{supportUkraine.message(daysSinceInvasion + 1)}</CardBody>
      <CardFooter>
        <Link
          isBlock
          color="foreground"
          href="https://war.ukraine.ua/support-ukraine/"
          isExternal
          showAnchorIcon
          target="_blank"
        >
          {supportUkraine.linkTitle}
        </Link>
      </CardFooter>
    </Card>
  )
}
