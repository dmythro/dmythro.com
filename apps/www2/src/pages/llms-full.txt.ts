import { BASE_URL } from '@dmythro/constants'
import type { APIRoute } from 'astro'

import { projects } from '@/data/projects'

const mdxFiles = import.meta.glob('../../../../packages/locales/mdx/projects/*.en.md', {
  eager: true,
}) as Record<string, { rawContent(): string }>

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

      const mdxKey = Object.keys(mdxFiles).find((k) => k.endsWith(`/${p.slug}.en.md`))
      const content = mdxKey ? mdxFiles[mdxKey].rawContent().trim() : p.description.en

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
