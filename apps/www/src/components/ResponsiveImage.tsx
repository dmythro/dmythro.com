import type { CardProps } from '@heroui/card'
import type { ImageProps, StaticImageData } from 'next/image'
import type { FC, ReactElement } from 'react'

import { Card, CardFooter } from '@heroui/card'
import Image from 'next/image'

type ResponsiveImageProps = Pick<ImageProps, 'priority' | 'src' | 'sizes' | 'alt'> &
  Pick<CardProps, 'shadow'> & {
    caption?: string | ReactElement
    isMDX?: boolean
  }

export const ResponsiveImage: FC<ResponsiveImageProps> = ({
  alt,
  caption,
  isMDX,
  priority = false,
  shadow = 'md',
  sizes,
  src,
  ...rest
}) => {
  const isSrcImport = typeof src === 'object'
  const data: StaticImageData = isSrcImport ? (src as StaticImageData) : undefined
  // Make sure CV PDF builds load all images, immediately
  const isPriority = process.env.IS_CV ? true : priority

  if (isMDX) {
    // TODO: try https://github.com/vercel/next.js/discussions/52744#discussioncomment-10313735
    console.log(' -- img isMDX', {
      isSrcImport,
      alt,
      caption,
      isMDX,
      priority,
      shadow,
      sizes,
      src,
      rest,
    })
  }

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
        fill={isMDX}
        sizes={isMDX ? '(max-width: 480px) 480px, (max-width: 960px) 960px, 1440px' : sizes}
        src={src}
        alt={alt}
        priority={isPriority}
        loading={isPriority ? 'eager' : 'lazy'}
        width={isSrcImport ? data?.width : undefined}
        height={isSrcImport ? data?.height : undefined}
      />
      <CardFooter as="figcaption">{caption || alt}</CardFooter>
    </Card>
  )
}
