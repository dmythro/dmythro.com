import { describe, expect, it } from 'bun:test'
import { readdir } from 'node:fs/promises'

import { fontFaces, fontVariants, sourceDir, subsetNames, webDir, webFileName } from '.'
import { buildWebFont } from './subset'

describe('fonts', () => {
  it('has a source file for every face', async () => {
    const sources = await readdir(sourceDir)
    expect(sources.sort()).toEqual(fontFaces.map((face) => face.source).sort())
  })

  it('serves exactly one file per face and subset', async () => {
    const expected = fontFaces.flatMap((face) => subsetNames.map((s) => webFileName(face, s)))
    expect((await readdir(webDir)).sort()).toEqual(expected.sort())
  })

  // The served files are committed, so a changed face list, range or subsetter must come
  // with a fresh `bun run subset`. Rebuilding here is what catches one that did not.
  it('serves what `bun run subset` builds from source/', async () => {
    for (const face of fontFaces) {
      for (const subset of subsetNames) {
        const committed = await Bun.file(`${webDir}${webFileName(face, subset)}`).bytes()
        expect(new Uint8Array(await buildWebFont(face, subset))).toEqual(committed)
      }
    }
  })

  it('points every variant at a served file', async () => {
    for (const family of ['geist', 'geist-mono'] as const) {
      for (const medium of ['screen', 'print'] as const) {
        for (const variant of fontVariants(family, medium)) {
          expect(await Bun.file(variant.src[0]).exists()).toBe(true)
        }
      }
    }
  })

  // Chrome stores a variable font in a PDF as Type 3 drawings: print must stay static.
  it('prints only static faces', () => {
    const variable = fontFaces.filter((face) => Array.isArray(face.weight))
    expect(variable.length).toBeGreaterThan(0)
    for (const face of variable) expect(face.media).not.toContain('print')
  })
})
