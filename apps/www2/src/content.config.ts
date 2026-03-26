import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'

const projectArticles = defineCollection({
  loader: glob({ pattern: 'projects/*.md', base: '../../packages/locales/mdx' }),
})

const articles = defineCollection({
  loader: glob({ pattern: '*.md', base: '../../packages/locales/mdx' }),
})

export const collections = { projectArticles, articles }
