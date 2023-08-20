import type { ImageProps, StaticImageData } from 'next/image'
import type { FC, ReactElement } from 'react'
import type { CardProps } from '@nextui-org/card'

import Image from 'next/image'
import { Card, CardFooter } from '@nextui-org/card'

type ResponsiveImageProps = Pick<ImageProps, 'src' | 'sizes' | 'alt'> &
  Pick<CardProps, 'shadow'> & {
    caption?: string | ReactElement
  }

export const ResponsiveImage: FC<ResponsiveImageProps> = ({
  alt,
  caption,
  shadow = 'md',
  sizes,
  src,
}) => {
  const isSrcImport = typeof src === 'object'
  const data: StaticImageData = isSrcImport ? (src as StaticImageData) : undefined

  console.log(' -- ResponsiveImage', src)
  return (
    <Card
      as="figure"
      className="block relative bg-foreground-200 print:border-small print:rounded-md print:shadow-none"
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
        priority={false}
        width={isSrcImport ? data?.width : 1440}
        height={isSrcImport ? data?.height : 960}
      />
      <CardFooter
        as="figcaption"
        className="before:bg-white/10 py-1 block absolute before:rounded-xl rounded-lg text-tiny text-white/80 bottom-2 right-2 max-w-fit ml-1 z-10 print:text-foreground print:bg-current"
      >
        {caption || alt}
      </CardFooter>
    </Card>
  )
}
