import assert from 'node:assert'
import { describe, it } from 'node:test'

import { careerTimeline as en } from '../src/en/timeline-career'
import { careerTimeline as uk } from '../src/uk/timeline-career'

describe('Timeline: Career', () => {
  it('same length', () => {
    assert.equal(en.length, uk.length)
  })

  it('same where', () => {
    assert.deepEqual(
      en.map(({ where }) => where),
      uk.map(({ where }) => where),
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
