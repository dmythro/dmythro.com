import { FC } from 'react'

import { Card, Text } from '@nextui-org/react'

import { useT } from 'src/hooks/useT'

import avatarImg1200 from 'public/avatar.jpg'
import avatarImg400 from 'public/avatar@400px.jpg'
import avatarImg800 from 'public/avatar@800px.jpg'

const images = [avatarImg400, avatarImg800, avatarImg1200]
const sizes = images
  .map((img) => (img.width > 800 ? `${img.width}px` : `(max-width: ${img.width}px) ${img.width}px`))
  .join(', ')
const srcSet = images.map((img) => `${img.src} ${img.width}w`).join(', ')

export const PhotoCard: FC = () => {
  const t = useT()

  return (
    <Card as="figure">
      <Card.Body css={{ p: 0, zIndex: 0 }}>
        <Card.Image
          showSkeleton
          sizes={sizes}
          srcSet={srcSet}
          src={avatarImg800.src}
          width="100%"
          alt={t.fullName}
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
          {t.fullName}
        </Text>
        <Text size="$sm" css={{ color: '$white' }}>
          📷 Alina Delyne
        </Text>
      </Card.Footer>
    </Card>
  )
}
