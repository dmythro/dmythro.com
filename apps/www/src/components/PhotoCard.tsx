import { FC } from 'react'
import NextImage from 'next/image'
import { Card, CardFooter } from '@nextui-org/card'

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
    <Card as="figure" className="block relative" isFooterBlurred>
      <NextImage sizes={sizes} src={avatarImg1200} alt={t.fullName} />
      <CardFooter
        as="figcaption"
        className="before:bg-white/10 py-1 block absolute before:rounded-xl rounded-lg text-tiny text-white/80 bottom-2 right-2 max-w-fit ml-1 z-10"
      >
        {t.fullName}
        <br />
        📷 Alina Delyne
      </CardFooter>
    </Card>
  )
}
