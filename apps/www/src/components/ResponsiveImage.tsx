import type { CardProps } from '@heroui/card'
import type { ImageProps, StaticImageData } from 'next/image'
import type { FC, ReactElement } from 'react'

import { Card, CardFooter } from '@heroui/card'
import Image from 'next/image'

type ResponsiveImageProps = Pick<ImageProps, 'priority' | 'src' | 'sizes' | 'alt'> &
  Pick<CardProps, 'shadow'> & {
    caption?: string | ReactElement
  }

export const ResponsiveImage: FC<ResponsiveImageProps> = ({
  alt,
  caption,
  priority = false,
  shadow = 'md',
  sizes,
  src,
}) => {
  const isSrcImport = typeof src === 'object'
  const data: StaticImageData = isSrcImport ? (src as StaticImageData) : undefined
  // Make sure CV PDF builds load all images, immediately
  const isPriority = process.env.IS_CV ? true : priority

  return (
    <Card
      as="figure"
      className="responsive-image print:block print:border-small print:rounded-md print:shadow-none print:transition-none"
      fullWidth
      isFooterBlurred
      shadow={shadow}
    >
      <Image
        placeholder={data?.blurDataURL ? 'blur' : undefined}
        blurDataURL={data?.blurDataURL}
        className="print:shadow-none"
        sizes={sizes}
        src={src}
        alt={alt}
        priority={isPriority}
        loading={isPriority ? 'eager' : 'lazy'}
        width={isSrcImport ? data?.width : 1440}
        height={isSrcImport ? data?.height : 960}
      />
      <CardFooter as="figcaption">{caption || alt}</CardFooter>
    </Card>
  )
}
