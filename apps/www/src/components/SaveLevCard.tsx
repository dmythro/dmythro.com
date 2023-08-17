import { FC } from 'react'

import { Card, CardBody } from '@nextui-org/card'
import { Link } from '@nextui-org/link'
import { getT } from 'src/utils/getT'
import { WithLangProp } from 'src/types'

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
