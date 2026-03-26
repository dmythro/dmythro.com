import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'

/** Preserve the filename (minus extension and path) as the entry ID, e.g. `web-dev.en` */
function generateId({ entry }: { entry: string }) {
  return entry.replace(/^.*\//, '').replace(/\.mdx$/, '')
}

const projectArticles = defineCollection({
  loader: glob({ pattern: 'projects/*.mdx', base: '../../packages/locales/mdx', generateId }),
})

const articles = defineCollection({
  loader: glob({ pattern: '*.mdx', base: '../../packages/locales/mdx', generateId }),
})

export const collections = { projectArticles, articles }
