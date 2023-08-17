import type { ImageProps } from 'next/image'
import type { FC, ReactElement } from 'react'

import Image from 'next/image'
import { Card, CardFooter } from '@nextui-org/card'

type ResponsiveImageProps = Pick<ImageProps, 'src' | 'sizes' | 'alt'> & {
  caption?: string | ReactElement
}

export const ResponsiveImage: FC<ResponsiveImageProps> = ({ alt, caption, sizes, src }) => {
  const isSrcImport = typeof src !== 'string'
  return (
    <Card as="figure" className="block relative bg-foreground-200" isFooterBlurred>
      <Image
        sizes={sizes}
        src={src}
        alt={alt}
        priority={false}
        width={isSrcImport ? undefined : 1440}
        height={isSrcImport ? undefined : 960}
      />
      <CardFooter
        as="figcaption"
        className="before:bg-white/10 py-1 block absolute before:rounded-xl rounded-lg text-tiny text-white/80 bottom-2 right-2 max-w-fit ml-1 z-10"
      >
        {caption || alt}
      </CardFooter>
    </Card>
  )
}
