import assert from 'node:assert'
import { describe, it } from 'node:test'

import { generalTimeline as en } from '../src/en/timeline-general'
import { generalTimeline as uk } from '../src/uk/timeline-general'

describe('Timeline: General', () => {
  it('same length', () => {
    assert.equal(en.length, uk.length)
  })

  it('same when', () => {
    assert.deepEqual(
      en.map(({ when }) => when),
      uk.map(({ when }) => when),
    )
  })

  it('same isHighlighted', () => {
    assert.deepEqual(
      en.map(({ isHighlighted }) => isHighlighted),
      uk.map(({ isHighlighted }) => isHighlighted),
    )
  })

  it('same description length', () => {
    assert.deepEqual(
      en.map(({ description }) =>
        Array.isArray(description) ? description.length : Boolean(description?.length),
      ),
      uk.map(({ description }) =>
        Array.isArray(description) ? description.length : Boolean(description?.length),
      ),
    )
  })
})
