import { FC } from 'react'

import { Card, Link, Text } from '@nextui-org/react'
import { useTranslations } from 'next-intl'

export const SupportUkraineCard: FC = () => {
  const t = useTranslations('supportUkraine')

  return (
    <Card variant="bordered">
      <Card.Body>
        <Text>
          {t('message')}
          <Link
            block={false}
            href="https://war.ukraine.ua/support-ukraine/"
            isExternal
            target="_blank"
          >
            {t('linkTitle')}
          </Link>
        </Text>
      </Card.Body>
    </Card>
  )
}
