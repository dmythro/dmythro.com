import type { APIRoute } from 'astro'

export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /

Sitemap: https://dmythro.com/sitemap.xml
LLMs-Txt: https://dmythro.com/llms.txt

# Feeds
# https://dmythro.com/en/rss.xml  (RSS 2.0)
# https://dmythro.com/uk/rss.xml  (RSS 2.0)
# https://dmythro.com/en/feed.json  (JSON Feed 1.1)
# https://dmythro.com/uk/feed.json  (JSON Feed 1.1)
`
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
