import cloudflare from '@astrojs/cloudflare'
import mdx from '@astrojs/mdx'
import preact from '@astrojs/preact'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

import rehypeExternalLinks from './src/plugins/rehype-external-links'
import rehypeLocalImageSize from './src/plugins/rehype-local-image-size'

export default defineConfig({
  site: 'https://dmythro.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  adapter: cloudflare(),

  integrations: [
    preact(),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          uk: 'uk',
        },
      },
    }),
  ],

  markdown: {
    rehypePlugins: [rehypeLocalImageSize, rehypeExternalLinks],
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'uk'],
    routing: {
      prefixDefaultLocale: true,
    },
  },

  vite: {
    // @ts-expect-error Vite version mismatch between @tailwindcss/vite and Astro's bundled Vite
    plugins: [tailwindcss()],
  },
})
