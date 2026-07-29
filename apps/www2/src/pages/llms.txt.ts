import { BASE_URL } from '@dmythro/constants'
import type { APIRoute } from 'astro'

import { getProjectUrl, projects } from '@/data/projects'

export const GET: APIRoute = () => {
  const projectList = projects
    .map((p) => {
      const links = [
        p.github ? `GitHub: https://github.com/${p.github}` : '',
        p.npm ? `NPM: https://www.npmjs.com/package/${p.npm}` : '',
        getProjectUrl(p, 'en') ? `Website: ${getProjectUrl(p, 'en')}` : '',
      ]
        .filter(Boolean)
        .join(' | ')
      const meta = [`Status: ${p.status}`, `Updated: ${p.updatedAt ?? p.publishedAt}`].join(' | ')
      return `- [${p.title.en}](${BASE_URL}/en/projects/${p.slug}): ${p.description.en}\n  ${meta}\n  ${links}`
    })
    .join('\n')

  const body = `# dmythro.com

> Personal website and open-source portfolio of Dmytro Klymenko, Principal Engineer / Tech Lead.

## Open-Source Projects

${projectList}

## Links

- [Full LLM context](${BASE_URL}/llms-full.txt)
- [Projects page](${BASE_URL}/en/projects)
- [RSS feed (EN)](${BASE_URL}/en/rss.xml)
- [RSS feed (UK)](${BASE_URL}/uk/rss.xml)
- [JSON Feed (EN)](${BASE_URL}/en/feed.json)
- [JSON Feed (UK)](${BASE_URL}/uk/feed.json)
- [GitHub profile](https://github.com/dmythro)
- [GitHub organization](https://github.com/annexare)
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
