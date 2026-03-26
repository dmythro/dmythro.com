import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'

/** Preserve the full filename (minus .md) as the entry ID, e.g. `web-dev.en` */
function generateId({ entry }: { entry: string }) {
  return entry.replace(/\.md$/, '')
}

const projectArticles = defineCollection({
  loader: glob({ pattern: 'projects/*.md', base: '../../packages/locales/mdx', generateId }),
})

const articles = defineCollection({
  loader: glob({ pattern: '*.md', base: '../../packages/locales/mdx', generateId }),
})

export const collections = { projectArticles, articles }
