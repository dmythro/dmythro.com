import { FC } from 'react'
import NextImage from 'next/image'
import { Card, CardFooter, CardBody } from '@nextui-org/react'

import { useT } from 'src/hooks/useT'

import avatarImg1200 from 'public/avatar.jpg'
import avatarImg400 from 'public/avatar@400px.jpg'
import avatarImg800 from 'public/avatar@800px.jpg'

const images = [avatarImg400, avatarImg800, avatarImg1200]
const sizes = images
  .map((img) => (img.width > 800 ? `${img.width}px` : `(max-width: ${img.width}px) ${img.width}px`))
  .join(', ')
// const srcSet = images.map((img) => `${img.src} ${img.width}w`).join(', ')

export const PhotoCard: FC = () => {
  const t = useT()

  return (
    <Card as="figure" isFooterBlurred>
      <CardBody style={{ padding: 0, zIndex: 0 }}>
        <NextImage sizes={sizes} src={avatarImg1200} alt={t.fullName} />
      </CardBody>
      <CardFooter
        as="figcaption"
        className=" before:bg-white/10 border-white/20 py-1 absolute before:rounded-xl rounded-large bottom-1 right-1 max-w-fit shadow-small ml-1 z-10"
      >
        <p className="text-tiny text-white/80">
          {t.fullName}
          <br />
          📷 Alina Delyne
        </p>
      </CardFooter>
    </Card>
  )
}
