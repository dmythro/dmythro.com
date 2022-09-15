import { FC } from 'react'
import dayjs from 'dayjs'

import { Card, Link, Text } from '@nextui-org/react'

import { useT } from 'src/hooks/useT'

export const invasionStartDate = '2022-02-24'
const todayDate = new Date().toISOString().split('T')[0]
const daysSinceInvasion = dayjs(todayDate).diff(invasionStartDate, 'days')

export const SupportUkraineCard: FC = () => {
  const { supportUkraine } = useT()

  return (
    <Card variant="bordered">
      <Card.Body>
        <Text>
          {supportUkraine.message(daysSinceInvasion)}
          <Link
            block={false}
            href="https://war.ukraine.ua/support-ukraine/"
            isExternal
            target="_blank"
          >
            {supportUkraine.linkTitle}
          </Link>
        </Text>
      </Card.Body>
    </Card>
  )
}
