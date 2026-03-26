import { getCollection } from 'astro:content'
import { BASE_URL } from '@dmythro/constants'
import type { APIRoute } from 'astro'

import { projects } from '@/data/projects'

const articleEntries = await getCollection('projectArticles', ({ id }: { id: string }) =>
  id.endsWith('.en'),
)
const articleMap = new Map<string, string>(
  articleEntries.map((e: { id: string; body?: string }) => [e.id.replace('.en', ''), e.body ?? '']),
)

export const GET: APIRoute = () => {
  const devProjects = projects.filter((p) => p.category === 'dev')

  const projectSections = devProjects
    .map((p) => {
      const links = [
        p.github ? `- GitHub: https://github.com/${p.github}` : '',
        p.npm ? `- NPM: https://www.npmjs.com/package/${p.npm}` : '',
        p.url ? `- Website: ${p.url}` : '',
        `- Page: ${BASE_URL}/en/projects/${p.slug}`,
      ]
        .filter(Boolean)
        .join('\n')

      const tags = p.tags.join(', ')
      const content = articleMap.get(p.slug)?.trim() || p.description.en

      return `## ${p.title.en}

${links}
- Tags: ${tags}

${content}`
    })
    .join('\n\n---\n\n')

  const body = `# dmythro.com — Open-Source Projects

> Dmytro Klymenko is a Principal Engineer / Tech Lead with 15+ years of experience in web development. This document describes the open-source projects he maintains.

${projectSections}
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
