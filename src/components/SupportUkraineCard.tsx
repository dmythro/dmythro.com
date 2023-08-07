import { FC } from 'react'
import dayjs from 'dayjs'

import { Card, CardBody, Link } from '@nextui-org/react'

import { useT } from 'src/hooks/useT'

export const invasionStartDate = '2022-02-24'
const todayDate = new Date().toISOString().split('T')[0]
const daysSinceInvasion = dayjs(todayDate).diff(invasionStartDate, 'days')

export const SupportUkraineCard: FC = () => {
  const { supportUkraine } = useT()

  return (
    <Card>
      <CardBody>
        {supportUkraine.message(daysSinceInvasion)}
        <Link isBlock href="https://war.ukraine.ua/support-ukraine/" isExternal target="_blank">
          {supportUkraine.linkTitle}
        </Link>
      </CardBody>
    </Card>
  )
}
