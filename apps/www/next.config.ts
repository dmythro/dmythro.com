import nextMdx from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
    mdxRs: true,
    turbopackFileSystemCacheForDev: true,
    typedEnv: true,
    // typedRoutes: true,
  },
  output: 'standalone',
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  // reactCompiler: true,
  reactStrictMode: true,
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
}

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // providerImportSource: '@mdx-js/react',
  },
})

export default withMDX(nextConfig)
