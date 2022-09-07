import { FC } from 'react'

import { Card, Text } from '@nextui-org/react'
import { useTranslations } from 'next-intl'

import avatarImg from 'public/avatar.jpg'

export const PhotoCard: FC = () => {
  const t = useTranslations()

  return (
    <Card as="figure" css={{ w: '100%', h: '400px' }}>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={avatarImg.src}
          objectFit="cover"
          width="100%"
          height="100%"
          alt={t('fullName')}
        />
      </Card.Body>
      <Card.Footer
        as="figcaption"
        isBlurred
        css={{
          position: 'absolute',
          bgBlur: '#0f111466',
          bottom: 0,
          alignItems: 'end',
          flexDirection: 'column',
          textAlign: 'right',
          zIndex: 1,
        }}
      >
        <Text size="$sm">{t('fullName')}</Text>
        <Text size="$sm">📷 Alina Delyne</Text>
      </Card.Footer>
    </Card>
  )
}
