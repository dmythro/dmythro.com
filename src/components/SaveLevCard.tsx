import { FC } from 'react'

import { Card, CardBody, Link } from '@nextui-org/react'
import { useRouter } from 'next/router'

import { useT } from 'src/hooks/useT'

export const SaveLevCard: FC = () => {
  const { locale } = useRouter()
  const { saveLev } = useT()

  return (
    <Card>
      <CardBody>
        {saveLev.message}
        <Link
          isBlock
          href={`https://save-lev.com/${locale === 'uk' ? 'uk' : ''}`}
          isExternal
          target="_blank"
        >
          {saveLev.linkTitle}
        </Link>
      </CardBody>
    </Card>
  )
}
