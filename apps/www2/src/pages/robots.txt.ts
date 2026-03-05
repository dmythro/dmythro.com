import type { APIRoute } from 'astro'

export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /

Sitemap: https://dmythro.com/sitemap.xml
LLMs-Txt: https://dmythro.com/llms.txt
`
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
