import { FC } from 'react'

import { Card, CardBody } from '@nextui-org/card'
import { Link } from '@nextui-org/link'
import { useLang, useT } from 'src/hooks/useT'

export const SaveLevCard: FC = () => {
  const locale = useLang()
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
