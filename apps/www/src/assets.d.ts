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

declare module '*.css' {
  const content: Record<string, string>
  export default content
}

declare module '*.md' {
  import type { ComponentType } from 'react'
  const MDXComponent: ComponentType
  export default MDXComponent
}
