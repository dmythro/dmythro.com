import type { FC } from 'react'

import { Card, CardBody } from '@heroui/card'
import { Link } from '@heroui/link'
import type { WithLangProp } from 'src/types'
import { getT } from 'src/utils/getT'

export const SaveLevCard: FC<WithLangProp> = ({ lang }) => {
  const { saveLev } = getT(lang)

  return (
    <Card>
      <CardBody>
        {saveLev.message}
        <Link
          isBlock
          href={`https://save-lev.com/${lang === 'uk' ? 'uk' : ''}`}
          isExternal
          target="_blank"
        >
          {saveLev.linkTitle}
        </Link>
      </CardBody>
    </Card>
  )
}
