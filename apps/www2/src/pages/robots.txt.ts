import type { APIRoute } from 'astro'

export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /

Sitemap: https://dmythro.com/sitemap.xml
LLMs-Txt: https://dmythro.com/llms.txt

# Feeds
# https://dmythro.com/en/rss.xml
# https://dmythro.com/uk/rss.xml
`
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
