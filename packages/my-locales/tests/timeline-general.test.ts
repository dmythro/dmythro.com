import { describe, expect, it } from 'bun:test'

import { generalTimeline as en } from '../src/en/timeline-general'
import { generalTimeline as uk } from '../src/uk/timeline-general'

describe('Timeline: General', () => {
  it('same length', () => {
    expect(en.length).toBe(uk.length)
  })

  it('same when', () => {
    expect(en.map(({ when }) => when)).toEqual(uk.map(({ when }) => when))
  })

  it('same isHighlighted', () => {
    expect(en.map(({ isHighlighted }) => isHighlighted)).toEqual(
      uk.map(({ isHighlighted }) => isHighlighted),
    )
  })

  it('same description length', () => {
    expect(
      en.map(({ description }) =>
        Array.isArray(description) ? description.length : Boolean(description?.length),
      ),
    ).toEqual(
      uk.map(({ description }) =>
        Array.isArray(description) ? description.length : Boolean(description?.length),
      ),
    )
  })
})
