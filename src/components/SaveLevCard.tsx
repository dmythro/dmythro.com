import { FC } from 'react'

import { Card, Link, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'

import { useT } from 'src/hooks/useT'

export const SaveLevCard: FC = () => {
  const { locale } = useRouter()
  const { saveLev } = useT()

  return (
    <Card variant="bordered">
      <Card.Body>
        <Text>
          {saveLev.message}
          <Link
            block={false}
            href={`https://save-lev.com/${locale === 'uk' ? 'uk' : ''}`}
            isExternal
            target="_blank"
          >
            {saveLev.linkTitle}
          </Link>
        </Text>
      </Card.Body>
    </Card>
  )
}
