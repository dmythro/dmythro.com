import { describe, expect, it } from 'bun:test'

import { skills as en } from '../src/en/skills'
import { skills as uk } from '../src/uk/skills'

describe('Skills', () => {
  it('same length', () => {
    expect(en.length).toBe(uk.length)
  })

  it('same times', () => {
    expect(en.map(({ times }) => times)).toEqual(uk.map(({ times }) => times))
  })
})
