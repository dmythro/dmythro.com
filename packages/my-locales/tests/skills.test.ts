import assert from 'node:assert'
import { describe, it } from 'node:test'

import { skills as en } from '../src/en/skills'
import { skills as uk } from '../src/uk/skills'

describe('Skills', () => {
  it('same length', () => {
    assert.equal(en.length, uk.length)
  })

  it('same times', () => {
    assert.deepEqual(
      en.map(({ times }) => times),
      uk.map(({ times }) => times),
    )
  })
})
