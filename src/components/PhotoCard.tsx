import { FC } from 'react'

import { Card, CardFooter, CardBody, Image } from '@nextui-org/react'

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
      <CardBody style={{ padding: 0, zIndex: 0 }}>
        <Image sizes={sizes} srcSet={srcSet} src={avatarImg400.src} alt={t.fullName} />
      </CardBody>
      <CardFooter
        as="figcaption"
        // isBlurred
        style={{
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
        <p>{t.fullName}</p>
        <p>📷 Alina Delyne</p>
      </CardFooter>
    </Card>
  )
}
