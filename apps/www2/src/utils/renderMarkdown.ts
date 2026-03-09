import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

import rehypeExternalLinks from '../plugins/rehype-external-links'
import rehypeLocalImageSize from '../plugins/rehype-local-image-size'

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeLocalImageSize)
  .use(rehypeExternalLinks)
  .use(rehypeStringify, { allowDangerousHtml: true })

/**
 * Render a markdown string to HTML using the same pipeline as Astro's
 * markdown processing — including external link icons and image optimization.
 */
export async function renderMarkdown(text: string): Promise<string> {
  const result = await processor.process(text)
  return String(result)
}
