import type { MDXComponents } from 'mdx/types'

import { Code } from '@heroui/code'
import { Link } from '@heroui/link'
import { ResponsiveImage } from 'src/components/ResponsiveImage'

import { BASE_URL } from 'my-constants'

import GitHubIcon from 'src/assets/github.svg'
import NpmIcon from 'src/assets/npm.svg'
import YouTubeIcon from 'src/assets/youtube.svg'

const urlIcons = {
  'github.com': <GitHubIcon className="fill-foreground ml-1 mr-0.5" width={16} height={16} />,
  'www.npmjs.com': <NpmIcon className="fill-foreground ml-1 mr-0.5" width={32} height={24} />,
  'youtu.be': <YouTubeIcon className="fill-red-500 ml-1" width={24} height={16} />,
}

export const mdxComponents = {
  img: (props) => <ResponsiveImage {...props} isMDX shadow="none" />,
  a: (props) => {
    const url = new URL(props.href || '')
    const isExternal = !url.href.startsWith(BASE_URL)
    const anchorIcon = urlIcons[url.hostname]

    return (
      <Link
        anchorIcon={anchorIcon}
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
  ul: (props) => <ul className="list-disc list-inside" {...props} />,
  li: (props) => <li className="list-item ml-4" {...props} />,
  code: (props) => <Code size="sm" {...props} />,
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...(mdxComponents as MDXComponents),
  }
}
