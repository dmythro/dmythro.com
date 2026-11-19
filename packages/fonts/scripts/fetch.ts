/**
 * Copies the faces listed in `src/index.ts` out of Vercel's `geist` release into
 * `source/`. Only needed when a face is added: the files are committed.
 *
 *   bun run fetch
 */
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { $ } from 'bun'

import { fontFaces, sourceDir } from '../src'

const release = {
  version: '1.9.2',
  tarball: 'https://registry.npmjs.org/geist/-/geist-1.9.2.tgz',
  integrity:
    'sha512-UU1x2q5Khob0+i4csFvXk1Ki4DePdu7xISuXyEcj1tzQMg64oN7Kbuy4e5z5QhcUWbbvOMJNs3ZxYQqpsEMV3w==',
}

const tarball = new Uint8Array(await (await fetch(release.tarball)).arrayBuffer())
const digest = `sha512-${new Bun.CryptoHasher('sha512').update(tarball).digest('base64')}`
if (digest !== release.integrity) {
  throw new Error(`geist ${release.version}: integrity mismatch, got ${digest}`)
}

const workDir = await mkdtemp(join(tmpdir(), 'geist-'))
try {
  await Bun.write(join(workDir, 'geist.tgz'), tarball)
  await $`tar -xzf geist.tgz`.cwd(workDir).quiet()
  for (const face of fontFaces) {
    const dir = face.family === 'geist' ? 'geist-sans' : 'geist-mono'
    await Bun.write(
      join(sourceDir, face.source),
      Bun.file(join(workDir, 'package/dist/fonts', dir, face.source)),
    )
  }
  await Bun.write(join(sourceDir, '../OFL.txt'), Bun.file(join(workDir, 'package/LICENSE.txt')))
  console.info(`Copied ${fontFaces.length} faces from geist ${release.version} into source/`)
} finally {
  await rm(workDir, { recursive: true, force: true })
}
