/**
 * Builds the files the site serves: every face in `src/index.ts`, cut to each subset
 * and written to `web/`. Deterministic — the test rebuilds them and compares bytes.
 *
 *   bun run subset
 */
import { readdir, rm } from 'node:fs/promises'
import { join } from 'node:path'

import { fontFaces, subsetNames, webDir, webFileName } from '../src'
import { buildWebFont } from '../src/subset'

const expected = new Set<string>()
let total = 0
for (const face of fontFaces) {
  for (const subset of subsetNames) {
    const name = webFileName(face, subset)
    const font = await buildWebFont(face, subset)
    await Bun.write(join(webDir, name), font)
    expected.add(name)
    total += font.length
  }
}

// A face dropped from the list must not linger in the build.
for (const name of await readdir(webDir)) {
  if (!expected.has(name)) await rm(join(webDir, name))
}

console.info(`Wrote ${expected.size} files to web/, ${(total / 1024).toFixed(1)} KB in all`)
