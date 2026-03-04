// String tension calculator utility functions

import {
  BASS_TUNINGS,
  BRAND_UNIT_WEIGHTS,
  DEFAULT_GUITAR_GAUGES,
  GUITAR_TUNINGS,
  type InstrumentType,
  NOTE_FREQUENCIES,
  PLAIN_STEEL_COEFFICIENT,
  STRING_BRAND_PRESETS,
  type StringBrandPreset,
  type StringMaterial,
  WOUND_COEFFICIENTS,
} from './string-constants'

// Parse gauge string - supports "w" suffix for wound (e.g., ".017w", ".018w")
export function parseGauge(gauge: string): { value: number; isWound: boolean } {
  const isWound = gauge.endsWith('w')
  const cleanGauge = isWound ? gauge.slice(0, -1) : gauge
  const value = Number.parseFloat(cleanGauge)
  return { value: Number.isNaN(value) ? 0 : value, isWound }
}

// Calculate unit weight based on gauge, material, and brand
// Uses brand-specific lookup tables when available for accuracy,
// applies material adjustment ratio for non-nickel materials
export function getUnitWeight(
  gauge: string,
  material: StringMaterial = 'nickel-wound',
  brand?: string,
): number {
  const { value, isWound } = parseGauge(gauge)
  if (value <= 0) return 0

  // Try brand-specific lookup first (most accurate)
  if (brand && BRAND_UNIT_WEIGHTS[brand]) {
    const brandWeights = BRAND_UNIT_WEIGHTS[brand]
    if (brandWeights[gauge]) {
      // Brand data is for nickel-wound, apply material ratio for wound strings
      if (isWound && material !== 'nickel-wound') {
        const materialRatio = WOUND_COEFFICIENTS[material] / WOUND_COEFFICIENTS['nickel-wound']
        return brandWeights[gauge] * materialRatio
      }
      return brandWeights[gauge]
    }
  }

  // Fall back to formula-based calculation
  const coefficient = isWound ? WOUND_COEFFICIENTS[material] : PLAIN_STEEL_COEFFICIENT
  return value * value * coefficient
}

// Calculate tension using the formula: T = (UW × (2 × L × F)²) / 386.4
export function calculateTension(
  gauge: string,
  scaleLength: number,
  note: string,
  material: StringMaterial = 'nickel-wound',
  brand?: string,
): number {
  const unitWeight = getUnitWeight(gauge, material, brand)
  const frequency = NOTE_FREQUENCIES[note]

  if (!unitWeight || !frequency || scaleLength <= 0) {
    return 0
  }

  const tension = (unitWeight * (2 * scaleLength * frequency) ** 2) / 386.4
  return Math.round(tension * 10) / 10
}

// Interpolate scale length for a specific string (for multi-scale instruments)
export function interpolateScale(
  stringIndex: number,
  totalStrings: number,
  scaleFrom: number,
  scaleTo: number,
): number {
  if (totalStrings <= 1) return scaleFrom
  const ratio = stringIndex / (totalStrings - 1)
  return scaleFrom + (scaleTo - scaleFrom) * ratio
}

// Get notes for a given tuning
export function getNotesForTuning(
  type: InstrumentType,
  tuning: string,
  stringCount: number,
): string[] {
  const tunings = type === 'guitar' ? GUITAR_TUNINGS : BASS_TUNINGS
  const notes = tunings[tuning] || tunings.e
  return notes.slice(0, stringCount)
}

// Get gauges from string brand preset based on tuning
export function getGaugesFromBrand(
  brandKey: string,
  stringCount: number,
  tuning?: string,
): string[] {
  const brand = STRING_BRAND_PRESETS.find((b) => b.key === brandKey)
  if (!brand) return DEFAULT_GUITAR_GAUGES.slice(0, stringCount)

  // Use heavier gauges for drop/down tunings
  const useHeavyGauges =
    tuning === 'd' || tuning === 'e-drop-d' || tuning === 'eb' || tuning === 'b'

  let baseGauges: string[]
  if (stringCount <= 6) {
    baseGauges = useHeavyGauges ? brand.gauges6d : brand.gauges6
  } else if (stringCount === 7) {
    baseGauges = useHeavyGauges ? brand.gauges7d : brand.gauges7
  } else {
    baseGauges = useHeavyGauges ? brand.gauges8d : brand.gauges8
  }

  // If we need more strings than the preset has, extend with heavier gauges
  if (stringCount > baseGauges.length) {
    const extended = [...baseGauges]
    const lastGauge = baseGauges[baseGauges.length - 1]
    while (extended.length < stringCount) {
      extended.push(lastGauge)
    }
    return extended
  }

  return baseGauges.slice(0, stringCount)
}

// Get brand preset data
export function getBrandPreset(brandKey: string): StringBrandPreset {
  return STRING_BRAND_PRESETS.find((b) => b.key === brandKey) || STRING_BRAND_PRESETS[0]
}
