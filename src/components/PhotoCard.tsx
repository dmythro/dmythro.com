import { FC } from 'react'

import { Card, Text } from '@nextui-org/react'
import { useTranslations } from 'next-intl'

import avatarImg from 'public/avatar.jpg'
import avatarImg400 from 'public/avatar@400px.jpg'
import avatarImg800 from 'public/avatar@800px.jpg'

export const PhotoCard: FC = () => {
  const t = useTranslations()

  return (
    <Card as="figure" css={{ w: '100%', h: '400px' }}>
      <Card.Body css={{ p: 0, zIndex: 0 }}>
        <Card.Image
          sizes="400px, 800px, 1200px"
          srcSet={`${avatarImg400.src} 400w, ${avatarImg800.src} 800w, ${avatarImg.src} ${avatarImg.width}w`}
          src={avatarImg.src}
          objectFit="cover"
          width="100%"
          height="100%"
          alt={t('fullName')}
        />
      </Card.Body>
      <Card.Footer
        as="figcaption"
        // isBlurred
        css={{
          position: 'absolute',
          alignItems: 'end',
          // bgBlur: '#0f111466',
          bottom: 0,
          flexDirection: 'column',
          textAlign: 'right',
          textShadow: '1px 1px 2px black',
          zIndex: 1,
        }}
      >
        <Text size="$sm" css={{ color: '$white' }}>
          {t('fullName')}
        </Text>
        <Text size="$sm" css={{ color: '$white' }}>
          📷 Alina Delyne
        </Text>
      </Card.Footer>
    </Card>
  )
}
