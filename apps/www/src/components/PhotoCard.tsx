import { FC } from 'react'

import { ResponsiveImage } from 'src/components/ResponsiveImage'
import { getT } from 'src/utils/getT'

import avatarImg1200 from 'public/avatar.jpg'
import avatarImg400 from 'public/avatar@400px.jpg'
import avatarImg800 from 'public/avatar@800px.jpg'
import { WithLangProp } from 'src/types'

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
      <br />
      📷 Alina Delyne
    </>
  )

  return <ResponsiveImage alt={t.fullName} caption={caption} sizes={sizes} src={avatarImg800} />
}
