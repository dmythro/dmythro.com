import Image from 'next/image'
import { Link } from '@nextui-org/link'

import { BASE_URL } from 'my-constants'

const ResponsiveImage = ({ src, alt }) => (
  <Image src={src} alt={alt} width={1440} height={960} className="w-fit h-auto rounded-large" />
)

export const mdxComponents = {
  img: ResponsiveImage,
  a: (props) => {
    const isExternal = !(props.href || '').startsWith(BASE_URL)
    return (
      <Link
        color="foreground"
        underline="always"
        isExternal={isExternal}
        showAnchorIcon={isExternal}
        {...props}
      />
    )
  },
  h1: (props) => <h1 className="text-2xl mb-3 mt-5 first-of-type:mt-3 font-semibold" {...props} />,
  h2: (props) => <h2 className="text-xl mb-3 mt-5 first-of-type:mt-3 font-normal" {...props} />,
  h3: (props) => <h3 className="text-lg mb-3 mt-5 first-of-type:mt-3 font-normal" {...props} />,
  p: (props) => <p className="text-md my-2" {...props} />,
}
