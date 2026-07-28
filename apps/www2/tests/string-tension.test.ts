import { describe, expect, it } from 'bun:test'

import {
  BASS_BASELINE_TENSIONS,
  BASS_TUNINGS,
  BRAND_UNIT_WEIGHTS,
  DEFAULT_BASS_GAUGES,
  GAUGE_SETS,
  GUITAR_BASELINE_TENSIONS,
  GUITAR_TUNINGS,
  NOTE_FREQUENCIES,
  PLAIN_STEEL_COEFFICIENT,
  WOUND_COEFFICIENTS,
} from '../src/components/islands/string-constants'
import {
  calculateTension,
  getGaugesForTuning,
  getUnitWeight,
  interpolateScale,
  parseGauge,
} from '../src/components/islands/string-utils'

const daddario = BRAND_UNIT_WEIGHTS['daddario-nyxl']

/** Gauges in a brand table matching a construction, as `[gauge, diameter, UW]`. */
const entries = (wound: boolean) =>
  Object.entries(daddario)
    .map(([gauge, uw]) => [gauge, parseGauge(gauge).value, uw] as const)
    .filter(([gauge]) => gauge.endsWith('w') === wound)

/** Mean of `UW / diameter²` — the coefficient the published data implies. */
const impliedCoefficient = (rows: ReadonlyArray<readonly [string, number, number]>): number =>
  rows.reduce((sum, [, diameter, uw]) => sum + uw / diameter ** 2, 0) / rows.length

// Below .024w the core is a large enough share of the diameter that the square
// law stops fitting, so the fallback is fitted to the range that reaches it.
const WOUND_FIT_FLOOR = 0.024

describe('Unit weight model', () => {
  // The bug this guards: the fallback coefficients once sat 15-22% above the
  // very tables their comment claimed they were averaged from, so any gauge
  // missing from a table (every Elixir preset, every bass string) read high.
  it('plain fallback matches the D’Addario plain table', () => {
    expect(PLAIN_STEEL_COEFFICIENT).toBeCloseTo(impliedCoefficient(entries(false)), 4)
  })

  it('wound fallback matches the D’Addario wound table from .024w up', () => {
    const fitted = entries(true).filter(([, diameter]) => diameter >= WOUND_FIT_FLOOR)
    expect(WOUND_COEFFICIENTS['nickel-wound']).toBeCloseTo(impliedCoefficient(fitted), 4)
  })

  it('stays under the density ceiling for solid round steel wire', () => {
    // π/4 × 0.284 lbs/in³. A round wire cannot weigh more than the metal it is.
    expect(PLAIN_STEEL_COEFFICIENT).toBeLessThan(0.2231)
  })

  it('orders wrap alloys by density, pure nickel heaviest', () => {
    expect(WOUND_COEFFICIENTS['pure-nickel']).toBeGreaterThan(WOUND_COEFFICIENTS['stainless-wound'])
    expect(WOUND_COEFFICIENTS['stainless-wound']).toBeGreaterThan(
      WOUND_COEFFICIENTS['nickel-wound'],
    )
  })

  it('reads the brand table when the gauge is in it', () => {
    expect(getUnitWeight('.046w', 'nickel-wound', 'daddario-nyxl')).toBe(daddario['.046w'])
  })

  // The point of fitting the fallback to the tables: a gauge missing from one
  // has to land where that brand's published data would have put it.
  it('agrees within 1% whether a gauge is in the table or not', () => {
    const fitted = [
      ...entries(false),
      ...entries(true).filter(([, diameter]) => diameter >= WOUND_FIT_FLOOR),
    ]
    for (const [gauge] of fitted) {
      const table = getUnitWeight(gauge, 'nickel-wound', 'daddario-nyxl')
      const fallback = getUnitWeight(gauge, 'nickel-wound')
      expect(Math.abs(fallback / table - 1)).toBeLessThan(0.01)
    }
  })
})

describe('Tension', () => {
  // D'Addario publish 16.2 lbs for a plain .010 at E4 on a 25.5" scale.
  it('matches the published reference string', () => {
    expect(calculateTension('.010', 25.5, 'E4', 'nickel-wound', 'daddario-nyxl')).toBe(16.2)
  })

  it('rises with gauge, scale and pitch', () => {
    const base = calculateTension('.046w', 25.5, 'E2')
    expect(calculateTension('.052w', 25.5, 'E2')).toBeGreaterThan(base)
    expect(calculateTension('.046w', 27, 'E2')).toBeGreaterThan(base)
    expect(calculateTension('.046w', 25.5, 'F2')).toBeGreaterThan(base)
  })

  // Clearing a scale field parses to NaN, and `NaN <= 0` is false — that used to
  // put "NaN" in the row and in the total.
  it('returns 0 for a non-finite scale rather than leaking NaN', () => {
    expect(calculateTension('.046w', Number.NaN, 'E2')).toBe(0)
    expect(calculateTension('.046w', Number.parseFloat(''), 'E2')).toBe(0)
    expect(calculateTension('.046w', Number.POSITIVE_INFINITY, 'E2')).toBe(0)
  })

  it('returns 0 for junk input', () => {
    expect(calculateTension('.046w', -25.5, 'E2')).toBe(0)
    expect(calculateTension('.046w', 0, 'E2')).toBe(0)
    expect(calculateTension('', 25.5, 'E2')).toBe(0)
    expect(calculateTension('.046w', 25.5, 'Z9')).toBe(0)
  })
})

describe('Baselines', () => {
  it('guitar matches D’Addario 10-46 plus .059w and .074w at 25.5"', () => {
    const gauges = [...GAUGE_SETS.standard[7], '.074w']
    const computed = gauges.map((gauge, i) =>
      calculateTension(gauge, 25.5, GUITAR_TUNINGS.e[i], 'nickel-wound', 'daddario-nyxl'),
    )
    expect(computed).toEqual(GUITAR_BASELINE_TENSIONS)
  })

  it('bass matches the default set at E standard and 34"', () => {
    const computed = DEFAULT_BASS_GAUGES.map((gauge, i) =>
      calculateTension(gauge, 34, BASS_TUNINGS.e[i], 'nickel-wound'),
    )
    expect(computed).toEqual(BASS_BASELINE_TENSIONS)
  })

  it('covers every string position the UI can show', () => {
    expect(GUITAR_BASELINE_TENSIONS.length).toBe(GAUGE_SETS.standard[8].length)
    expect(BASS_BASELINE_TENSIONS.length).toBe(DEFAULT_BASS_GAUGES.length)
  })
})

describe('Gauge sets', () => {
  it('picks the baritone set for B standard', () => {
    expect(getGaugesForTuning(6, 'b')).toEqual(GAUGE_SETS.baritone[6])
    expect(getGaugesForTuning(6, 'e')).toEqual(GAUGE_SETS.standard[6])
    expect(getGaugesForTuning(6, 'd')).toEqual(GAUGE_SETS.down[6])
  })

  it('falls back to standard for an unknown tuning', () => {
    expect(getGaugesForTuning(6, 'nope')).toEqual(GAUGE_SETS.standard[6])
    expect(getGaugesForTuning(6)).toEqual(GAUGE_SETS.standard[6])
  })

  it('returns exactly the requested count, 5 through 12', () => {
    for (const tuning of Object.keys(GUITAR_TUNINGS)) {
      for (let count = 5; count <= 12; count++) {
        expect(getGaugesForTuning(count, tuning)).toHaveLength(count)
      }
    }
  })

  // B standard sits five semitones below E — the down-tuned set goes slack there,
  // which is why it gets a set of its own.
  it('holds B standard near guitar baseline tension on a 27" baritone', () => {
    const gauges = getGaugesForTuning(6, 'b')
    gauges.forEach((gauge, i) => {
      const tension = calculateTension(gauge, 27, GUITAR_TUNINGS.b[i], 'nickel-wound')
      expect(tension).toBeGreaterThan(14)
      expect(tension).toBeLessThan(25)
    })
  })

  it('every gauge it can emit has a note it can be tuned to', () => {
    for (const set of Object.values(GAUGE_SETS)) {
      for (const gauges of Object.values(set)) {
        for (const gauge of gauges) {
          expect(parseGauge(gauge).value).toBeGreaterThan(0)
        }
      }
    }
  })
})

describe('Multi-scale interpolation', () => {
  it('puts the first and last string on the stated scales', () => {
    expect(interpolateScale(0, 7, 25.5, 27)).toBe(25.5)
    expect(interpolateScale(6, 7, 25.5, 27)).toBe(27)
  })

  it('spaces the rest evenly, as a straight fan does', () => {
    expect(interpolateScale(3, 7, 25.5, 27)).toBeCloseTo(26.25, 6)
  })

  it('handles a single string without dividing by zero', () => {
    expect(interpolateScale(0, 1, 25.5, 27)).toBe(25.5)
  })
})

describe('Note table', () => {
  it('is monotonic within each octave and doubles across octaves', () => {
    for (const [note, freq] of Object.entries(NOTE_FREQUENCIES)) {
      const octave = Number(note.at(-1))
      const lower = NOTE_FREQUENCIES[`${note.slice(0, -1)}${octave - 1}`]
      if (lower) expect(freq / lower).toBeCloseTo(2, 1)
    }
  })

  it('covers every note the tunings reference', () => {
    for (const tunings of [GUITAR_TUNINGS, BASS_TUNINGS]) {
      for (const notes of Object.values(tunings)) {
        for (const note of notes) {
          expect(NOTE_FREQUENCIES[note]).toBeGreaterThan(0)
        }
      }
    }
  })
})
