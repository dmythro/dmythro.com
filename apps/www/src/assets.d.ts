declare module '*.svg' {
  import type { FC, SVGProps } from 'react'
  const content: FC<SVGProps<SVGSVGElement>>
  export default content
}

declare module '*.jpg' {
  const src: import('next/image').StaticImageData
  export default src
}

declare module '*.webp' {
  const src: import('next/image').StaticImageData
  export default src
}
