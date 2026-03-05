import cloudflare from '@astrojs/cloudflare'
import mdx from '@astrojs/mdx'
import preact from '@astrojs/preact'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://dmythro.com',
  output: 'static',
  trailingSlash: 'never',
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
