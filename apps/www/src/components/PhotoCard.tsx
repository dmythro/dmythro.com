import { Card, CardBody } from '@nextui-org/card'
import type { FC } from 'react'

import { ResponsiveImage } from 'src/components/ResponsiveImage'
import { getT } from 'src/utils/getT'

import avatarImg1200 from 'public/avatar.jpg'
import avatarImg400 from 'public/avatar@400px.jpg'
import avatarImg800 from 'public/avatar@800px.jpg'
import type { WithLangProp } from 'src/types'

const images = [avatarImg400, avatarImg800, avatarImg1200]
const sizes = images
  .map((img) => (img.width > 800 ? `${img.width}px` : `(max-width: ${img.width}px) ${img.width}px`))
  .join(', ')
// const srcSet = images.map((img) => `${img.src} ${img.width}w`).join(', ')

export const PhotoCard: FC<WithLangProp> = ({ lang }) => {
  const t = getT(lang)
  const caption = (
    <>
      {t.fullName}
      <br />📷 Alina Delyne
    </>
  )
  const years = new Date().getFullYear() - 2006

  return (
    <div>
      <ResponsiveImage
        alt={t.fullName}
        caption={caption}
        priority
        sizes={sizes}
        src={avatarImg800}
      />
      <Card className="hidden print:block print:border-small print:rounded-md print:shadow-none print:transition-none mt-4">
        <CardBody>
          <h1 className="text-xl mb-3">{t.cv.title}</h1>
          {t.cv.description(years).map((text, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: lines won't change here
            <p key={index}>{text}</p>
          ))}
        </CardBody>
      </Card>
    </div>
  )
}
