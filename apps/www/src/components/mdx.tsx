import { Link } from '@nextui-org/link'
import { ResponsiveImage } from 'src/components/ResponsiveImage'

import { BASE_URL } from 'my-constants'

export const mdxComponents = {
  img: (props) => <ResponsiveImage {...props} shadow="none" />,
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
  p: (props) => {
    if (props.children?.props) {
      const { src, alt } = props.children.props
      if (src && alt) {
        // Avoid wrapping Image into <p> as it will has own component wrapper which will break HTML semantics
        return props.children
      }
    }

    return <p className="text-md my-3 first-of-type:mt-0" {...props} />
  },
}
