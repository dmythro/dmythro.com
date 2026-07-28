import { unified } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import preact from '@astrojs/preact'
import sitemap from '@astrojs/sitemap'
import { availableLocales } from '@dmythro/locales/constants'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

import { feedPages } from './src/data/feedPages'
import { pageDates } from './src/data/pageDates'
import { getProjectDate, projects } from './src/data/projects'
import rehypeLocalImageSize from './src/plugins/rehype-local-image-size'

const newest = (dates: Date[]) => new Date(Math.max(...dates.map((date) => date.getTime())))

const projectDates = projects.map(getProjectDate)
const feedPageDates = feedPages.map((page) => new Date(page.updatedAt ?? page.publishedAt))

/** A listing page is as fresh as the newest thing on it. */
const newestProject = newest(projectDates)
/** The landing page surfaces highlighted projects and links every standing page. */
const newestAnything = newest([...projectDates, ...feedPageDates])

/**
 * Route → the date its content last changed. Nothing is dated by hand that can be
 * worked out: projects carry their own dates, the standing pages take theirs from the
 * table the feed reads, and listing pages follow what they list. Only routes with no
 * such signal fall back to `pageDates`.
 */
const pageLastmod = new Map<string, string>([
  ...projects.flatMap((project) =>
    availableLocales.map((locale): [string, string] => [
      `/${locale}/projects/${project.slug}`,
      getProjectDate(project).toISOString(),
    ]),
  ),
  ...feedPages.flatMap((page) =>
    availableLocales.map((locale): [string, string] => [
      `/${locale}${page.path}`,
      new Date(page.updatedAt ?? page.publishedAt).toISOString(),
    ]),
  ),
  ...Object.entries(pageDates).flatMap(([path, date]) =>
    availableLocales.map((locale): [string, string] => [
      `/${locale}${path}`,
      new Date(date).toISOString(),
    ]),
  ),
  ...availableLocales.flatMap((locale): [string, string][] => [
    [`/${locale}`, newestAnything.toISOString()],
    [`/${locale}/projects`, newestProject.toISOString()],
  ]),
  // The bare root, which redirects into a locale.
  ['', newestAnything.toISOString()],
])

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
        const lastmod = pageLastmod.get(path)
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
