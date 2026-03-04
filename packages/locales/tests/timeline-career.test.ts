import { describe, expect, it } from 'bun:test'

import { careerTimeline as en } from '../src/en/timeline-career'
import { careerTimeline as uk } from '../src/uk/timeline-career'

describe('Timeline: Career', () => {
  it('same length', () => {
    expect(en.length).toBe(uk.length)
  })

  it('same where', () => {
    expect(en.map(({ where }) => where)).toEqual(uk.map(({ where }) => where))
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
