import type { APIRoute } from 'astro'

import { BASE_URL } from '@dmythro/constants'

import { projects } from '@/data/projects'

export const GET: APIRoute = () => {
  const devProjects = projects.filter((p) => p.category === 'dev')

  const projectList = devProjects
    .map((p) => {
      const links = [
        p.github ? `GitHub: https://github.com/${p.github}` : '',
        p.npm ? `NPM: https://www.npmjs.com/package/${p.npm}` : '',
        p.url ? `Website: ${p.url}` : '',
      ]
        .filter(Boolean)
        .join(' | ')
      return `- [${p.title.en}](${BASE_URL}/en/projects/${p.slug}): ${p.description.en}\n  ${links}`
    })
    .join('\n')

  const body = `# dmythro.com

> Personal website and open-source portfolio of Dmytro Klymenko, Principal Engineer / Tech Lead.

## Open-Source Projects

${projectList}

## Links

- [Full LLM context](${BASE_URL}/llms-full.txt)
- [Projects page](${BASE_URL}/en/projects)
- [GitHub profile](https://github.com/dmythro)
- [GitHub organization](https://github.com/annexare)
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
