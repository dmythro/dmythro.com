import { join } from 'node:path'
import type { Root } from 'hast'
import sharp from 'sharp'
import { visit } from 'unist-util-visit'

const publicDir = join(import.meta.dirname, '../../public')

export default function rehypeLocalImageSize() {
  return async (tree: Root) => {
    const promises: Promise<void>[] = []

    visit(tree, 'element', (node) => {
      if (node.tagName !== 'img') return
      const src = node.properties?.src
      if (typeof src !== 'string' || !src.startsWith('/')) return
      if (node.properties.width && node.properties.height) return

      promises.push(
        sharp(join(publicDir, src))
          .metadata()
          .then(({ width, height }) => {
            if (width && height) {
              node.properties.width = width
              node.properties.height = height
            }
            node.properties.loading = 'lazy'
            node.properties.decoding = 'async'
          }),
      )
    })

    await Promise.all(promises)
  }
}
