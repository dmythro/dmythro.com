import { unified } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import preact from '@astrojs/preact'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

import { getProjectDate, projects } from './src/data/projects'
import rehypeLocalImageSize from './src/plugins/rehype-local-image-size'

/** `/{locale}/projects/{slug}` → the date that project last changed. */
const projectLastmod = new Map(
  projects.flatMap((project) =>
    ['en', 'uk'].map((locale) => [
      `/${locale}/projects/${project.slug}`,
      getProjectDate(project).toISOString(),
    ]),
  ),
)

export default defineConfig({
  site: 'https://dmythro.com',
  output: 'static',
  trailingSlash: 'never',
  // Astro v7 defaults to `compressHTML: 'jsx'`, which strips significant
  // whitespace between inline text and elements (e.g. the space after the
  // footer middot). Keep the v6 HTML-aware behavior to preserve that spacing.
  compressHTML: true,
  build: { format: 'file', inlineStylesheets: 'always' },
  devToolbar: { enabled: false },

  integrations: [
    mdx(),
    preact(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          uk: 'uk',
        },
      },
      serialize(item) {
        const path = new URL(item.url).pathname.replace(/\/$/, '')
        const lastmod = projectLastmod.get(path)
        return lastmod ? { ...item, lastmod } : item
      },
    }),
  ],

  // Astro v7 defaults Markdown to the Sätteri processor; keep the unified
  // (remark/rehype) processor so our local-image-size rehype plugin runs.
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeLocalImageSize],
    }),
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'uk'],
    routing: {
      prefixDefaultLocale: true,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
})
