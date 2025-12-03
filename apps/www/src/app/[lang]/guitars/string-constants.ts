// String tension calculator constants

export type InstrumentType = 'guitar' | 'bass'
export type StringMaterial = 'nickel-wound' | 'stainless-wound' | 'pure-nickel'
export type CoatingType = 'none' | 'optiweb' | 'nanoweb' | 'polyweb'

// Note frequencies in Hz (scientific pitch notation)
export const NOTE_FREQUENCIES: Record<string, number> = {
  // Octave 0 (for extended range instruments)
  C0: 16.35,
  'C#0': 17.32,
  D0: 18.35,
  'D#0': 19.45,
  E0: 20.6,
  F0: 21.83,
  'F#0': 23.12,
  G0: 24.5,
  'G#0': 25.96,
  A0: 27.5,
  'A#0': 29.14,
  B0: 30.87,
  // Octave 1
  C1: 32.7,
  'C#1': 34.65,
  D1: 36.71,
  'D#1': 38.89,
  E1: 41.2,
  F1: 43.65,
  'F#1': 46.25,
  G1: 49.0,
  'G#1': 51.91,
  A1: 55.0,
  'A#1': 58.27,
  B1: 61.74,
  // Octave 2
  C2: 65.41,
  'C#2': 69.3,
  D2: 73.42,
  'D#2': 77.78,
  E2: 82.41,
  F2: 87.31,
  'F#2': 92.5,
  G2: 98.0,
  'G#2': 103.83,
  A2: 110.0,
  'A#2': 116.54,
  B2: 123.47,
  // Octave 3
  C3: 130.81,
  'C#3': 138.59,
  D3: 146.83,
  'D#3': 155.56,
  E3: 164.81,
  F3: 174.61,
  'F#3': 185.0,
  G3: 196.0,
  'G#3': 207.65,
  A3: 220.0,
  'A#3': 233.08,
  B3: 246.94,
  // Octave 4
  C4: 261.63,
  'C#4': 277.18,
  D4: 293.66,
  'D#4': 311.13,
  E4: 329.63,
  F4: 349.23,
  'F#4': 369.99,
  G4: 392.0,
}

// String material coefficients for unit weight calculation
// UW = gauge² × coefficient (where gauge is in inches)
// Coefficients derived from material density and typical string construction
// Plain steel uses actual steel density; wound strings account for hex core + wrap
export const PLAIN_STEEL_COEFFICIENT = 0.2696 // High-carbon steel wire

export const WOUND_COEFFICIENTS: Record<StringMaterial, number> = {
  'nickel-wound': 0.2155, // Nickel-plated steel wrap over hex core (avg from D'Addario data)
  'stainless-wound': 0.2069, // Stainless steel wrap (slightly less dense)
  'pure-nickel': 0.21, // Pure nickel wrap
}

// Coating effect on string mass
// Based on Elixir's published tension data, coatings have negligible impact on tension
// Elixir tensions match D'Addario uncoated strings at the same gauge
export const COATING_MULTIPLIERS: Record<CoatingType, number> = {
  none: 1.0,
  optiweb: 1.0, // Negligible effect on tension
  nanoweb: 1.0, // Negligible effect on tension
  polyweb: 1.0, // Negligible effect on tension
}

// Brand-specific unit weights (lbs/inch) derived from published tension data
// These are calculated by rearranging T = UW × (2 × L × F)² / 386.4
// to get UW = T × 386.4 / (2 × L × F)² using reference tensions at 25.5" scale
export type BrandUnitWeights = Record<string, number>

// D'Addario unit weights - calculated from their published tension guide
const DADDARIO_UNIT_WEIGHTS: BrandUnitWeights = {
  // Plain steel
  '.008': 0.00001418,
  '.009': 0.00001794,
  '.010': 0.00002215,
  '.0105': 0.00002442,
  '.011': 0.0000268,
  '.012': 0.0000319,
  '.013': 0.00003752,
  '.0135': 0.00004037,
  '.014': 0.00004342,
  '.015': 0.00004984,
  '.016': 0.00005671,
  '.017': 0.00006402,
  '.018': 0.00007177,
  '.019': 0.00007997,
  '.020': 0.00008861,
  '.022': 0.00010722,
  '.024': 0.0001276,
  // Wound strings
  '.017w': 0.00005765,
  '.018w': 0.00006215,
  '.019w': 0.00006947,
  '.020w': 0.00007495,
  '.021w': 0.00008293,
  '.022w': 0.00009184,
  '.024w': 0.00010857,
  '.025w': 0.00011677,
  '.026w': 0.00012679,
  '.028w': 0.00014674,
  '.029w': 0.00015717,
  '.030w': 0.00016834,
  '.032w': 0.00019347,
  '.034w': 0.0002159,
  '.036w': 0.00024175,
  '.038w': 0.00027058,
  '.039w': 0.00028628,
  '.040w': 0.00030228,
  '.042w': 0.00033182,
  '.044w': 0.00036267,
  '.046w': 0.00039649,
  '.048w': 0.00043014,
  '.049w': 0.00044879,
  '.050w': 0.00046886,
  '.052w': 0.00050689,
  '.054w': 0.00054692,
  '.056w': 0.00058734,
  '.059w': 0.00065161,
  '.060w': 0.00067386,
  '.062w': 0.00072191,
  '.064w': 0.00076859,
  '.066w': 0.00081697,
  '.068w': 0.00086836,
  '.070w': 0.00091925,
  '.072w': 0.00097163,
  '.074w': 0.00102657,
  '.080w': 0.001199,
}

// Ernie Ball unit weights - calculated from their published tension data
// Source: Ernie Ball string tension guide
const ERNIE_BALL_UNIT_WEIGHTS: BrandUnitWeights = {
  // Plain steel
  '.008': 0.00001404,
  '.009': 0.00001778,
  '.010': 0.00002195,
  '.011': 0.00002655,
  '.012': 0.0000316,
  '.013': 0.00003709,
  '.014': 0.00004303,
  '.015': 0.00004939,
  '.016': 0.00005618,
  '.017': 0.00006338,
  '.018': 0.00007103,
  '.019': 0.00007909,
  '.020': 0.00008782,
  '.022': 0.00010615,
  '.024': 0.00012635,
  // Wound strings
  '.018w': 0.00006138,
  '.020w': 0.00007404,
  '.022w': 0.00009053,
  '.024w': 0.00010744,
  '.026w': 0.00012541,
  '.028w': 0.00014509,
  '.030w': 0.00016644,
  '.032w': 0.0001913,
  '.034w': 0.00021371,
  '.036w': 0.00023913,
  '.038w': 0.00026751,
  '.040w': 0.00029882,
  '.042w': 0.00032794,
  '.044w': 0.00035862,
  '.046w': 0.00039199,
  '.048w': 0.00042533,
  '.050w': 0.00046382,
  '.052w': 0.00050113,
  '.054w': 0.00054052,
  '.056w': 0.00058079,
  '.059w': 0.00064419,
  '.060w': 0.00066594,
  '.062w': 0.00071386,
  '.064w': 0.00075769,
  '.066w': 0.00080611,
  '.068w': 0.00085759,
  '.070w': 0.00090742,
  '.072w': 0.00095912,
  '.074w': 0.00101392,
  '.080w': 0.00118403,
}

export const BRAND_UNIT_WEIGHTS: Record<string, BrandUnitWeights> = {
  'daddario-nyxl': DADDARIO_UNIT_WEIGHTS,
  'daddario-xl': DADDARIO_UNIT_WEIGHTS,
  'ernie-ball-paradigm': ERNIE_BALL_UNIT_WEIGHTS,
  'ernie-ball-slinky': ERNIE_BALL_UNIT_WEIGHTS,
}

// String brand presets with their gauge sets and characteristics
export interface StringBrandPreset {
  key: string
  label: string
  material: StringMaterial
  coating: CoatingType
  // Common gauge sets for 6/7/8 string guitars (light-top/heavy-bottom style)
  gauges6: string[]
  gauges7: string[]
  gauges8: string[]
}

export const STRING_BRAND_PRESETS: StringBrandPreset[] = [
  {
    key: 'daddario-nyxl',
    label: "D'Addario NYXL",
    material: 'nickel-wound',
    coating: 'none',
    gauges6: ['.010', '.013', '.017', '.026w', '.036w', '.046w'],
    gauges7: ['.010', '.013', '.017', '.026w', '.036w', '.046w', '.059w'],
    gauges8: ['.010', '.013', '.017', '.030w', '.042w', '.054w', '.064w', '.074w'],
  },
  {
    key: 'daddario-xl',
    label: "D'Addario XL",
    material: 'nickel-wound',
    coating: 'none',
    gauges6: ['.010', '.013', '.017', '.026w', '.036w', '.046w'],
    gauges7: ['.010', '.013', '.017', '.026w', '.036w', '.046w', '.059w'],
    gauges8: ['.010', '.013', '.017', '.030w', '.042w', '.054w', '.064w', '.074w'],
  },
  {
    key: 'elixir-optiweb',
    label: 'Elixir Optiweb',
    material: 'nickel-wound',
    coating: 'optiweb',
    gauges6: ['.010', '.013', '.017', '.026w', '.036w', '.046w'],
    gauges7: ['.010', '.013', '.017', '.026w', '.036w', '.046w', '.059w'],
    gauges8: ['.010', '.013', '.017', '.030w', '.042w', '.054w', '.064w', '.074w'],
  },
  {
    key: 'elixir-nanoweb',
    label: 'Elixir Nanoweb',
    material: 'nickel-wound',
    coating: 'nanoweb',
    gauges6: ['.010', '.013', '.017', '.026w', '.036w', '.046w'],
    gauges7: ['.010', '.013', '.017', '.026w', '.036w', '.046w', '.059w'],
    gauges8: ['.010', '.013', '.017', '.030w', '.042w', '.054w', '.064w', '.074w'],
  },
  {
    key: 'elixir-polyweb',
    label: 'Elixir Polyweb',
    material: 'nickel-wound',
    coating: 'polyweb',
    gauges6: ['.010', '.013', '.017', '.026w', '.036w', '.046w'],
    gauges7: ['.010', '.013', '.017', '.026w', '.036w', '.046w', '.059w'],
    gauges8: ['.010', '.013', '.017', '.030w', '.042w', '.054w', '.064w', '.074w'],
  },
  {
    key: 'ernie-ball-paradigm',
    label: 'Ernie Ball Paradigm',
    material: 'nickel-wound',
    coating: 'none',
    gauges6: ['.010', '.013', '.017', '.026w', '.036w', '.046w'],
    gauges7: ['.010', '.013', '.017', '.026w', '.036w', '.046w', '.059w'],
    gauges8: ['.010', '.013', '.017', '.030w', '.042w', '.054w', '.064w', '.074w'],
  },
  {
    key: 'ernie-ball-slinky',
    label: 'Ernie Ball Slinky',
    material: 'nickel-wound',
    coating: 'none',
    gauges6: ['.010', '.013', '.017', '.026w', '.036w', '.046w'],
    gauges7: ['.010', '.013', '.017', '.026w', '.036w', '.046w', '.059w'],
    gauges8: ['.010', '.013', '.017', '.030w', '.042w', '.054w', '.064w', '.074w'],
  },
]

// Standard tunings for guitar (high to low) - supports up to 12 strings
export const GUITAR_TUNINGS: Record<string, string[]> = {
  standard: ['E4', 'B3', 'G3', 'D3', 'A2', 'E2', 'B1', 'F#1', 'C#1', 'G#0', 'D#0', 'A#0'],
  'drop-d': ['E4', 'B3', 'G3', 'D3', 'A2', 'D2', 'A1', 'E1', 'B0', 'F#0', 'C#0', 'G#0'],
  'half-down': ['D#4', 'A#3', 'F#3', 'C#3', 'G#2', 'D#2', 'A#1', 'F1', 'C1', 'G0', 'D0', 'A0'],
  'full-down': ['D4', 'A3', 'F3', 'C3', 'G2', 'D2', 'A1', 'E1', 'B0', 'F#0', 'C#0', 'G#0'],
}

// Standard tunings for bass (high to low)
export const BASS_TUNINGS: Record<string, string[]> = {
  standard: ['G2', 'D2', 'A1', 'E1', 'B0', 'F#0'],
  'drop-d': ['G2', 'D2', 'A1', 'D1', 'A0', 'E0'],
  'half-down': ['F#2', 'C#2', 'G#1', 'D#1', 'A#0', 'F0'],
  'full-down': ['F2', 'C2', 'G1', 'D1', 'A0', 'E0'],
}

// Default gauges for guitar strings (D'Addario NYXL1074)
// "w" suffix indicates wound string
export const DEFAULT_GUITAR_GAUGES = [
  '.010',
  '.013',
  '.017',
  '.030w',
  '.042w',
  '.054w',
  '.064w',
  '.074w',
  '.080w',
  '.080w',
  '.080w',
  '.080w',
]

// Default gauges for bass strings (all wound)
export const DEFAULT_BASS_GAUGES = ['.045w', '.065w', '.085w', '.105w', '.125w', '.130w']

// String count ranges per instrument type
export const STRING_RANGES: Record<InstrumentType, { min: number; max: number; default: number }> =
  {
    guitar: { min: 5, max: 12, default: 7 },
    bass: { min: 2, max: 6, default: 5 },
  }

// Scale length ranges per instrument type (in inches)
// Guitar: typical range 24"-28", extended 20"-30" for unusual instruments
// Bass: typical range 32"-35", extended 30"-36" for short/long scale
export const SCALE_RANGES: Record<InstrumentType, { min: number; max: number }> = {
  guitar: { min: 20, max: 30 },
  bass: { min: 30, max: 36 },
}

// Instrument presets
export interface Preset {
  key: string
  label: string
  description?: string
  strings: number
  tuning: string
  scaleFrom: string
  scaleTo: string
}

export const PRESETS: Record<InstrumentType, Preset[]> = {
  guitar: [
    {
      key: '6-e',
      label: '6-string E Standard',
      strings: 6,
      tuning: 'standard',
      scaleFrom: '25.5',
      scaleTo: '25.5',
    },
    {
      key: '6-d',
      label: '6-string D Standard',
      description: 'Jackson King V',
      strings: 6,
      tuning: 'full-down',
      scaleFrom: '25.5',
      scaleTo: '25.5',
    },
    {
      key: '7-d',
      label: '7-string D Standard',
      description: 'Framus Streetwalker 7',
      strings: 7,
      tuning: 'full-down',
      scaleFrom: '26.5',
      scaleTo: '26.5',
    },
    {
      key: '8-d',
      label: '8-string D Standard',
      description: 'Valravn Munnin multi-scale',
      strings: 8,
      tuning: 'full-down',
      scaleFrom: '26.5',
      scaleTo: '28',
    },
  ],
  bass: [
    {
      key: '4-e',
      label: '4-string E Standard',
      strings: 4,
      tuning: 'standard',
      scaleFrom: '34',
      scaleTo: '34',
    },
    {
      key: '4-d',
      label: '4-string D Standard',
      strings: 4,
      tuning: 'full-down',
      scaleFrom: '34',
      scaleTo: '34',
    },
    {
      key: '5-d',
      label: '5-string D Standard',
      strings: 5,
      tuning: 'full-down',
      scaleFrom: '34',
      scaleTo: '34',
    },
  ],
}

export const DEFAULT_PRESETS: Record<InstrumentType, string> = {
  guitar: '6-d',
  bass: '5-d',
}

// Available gauge options - plain and wound variants
// "w" suffix indicates wound string
export const PLAIN_GAUGES = [
  '.007',
  '.008',
  '.009',
  '.010',
  '.011',
  '.012',
  '.013',
  '.014',
  '.015',
  '.016',
  '.017',
  '.018',
  '.019',
  '.020',
  '.022',
  '.024',
  '.026',
]

export const WOUND_GAUGES = [
  '.017w',
  '.018w',
  '.020w',
  '.021w',
  '.022w',
  '.024w',
  '.026w',
  '.028w',
  '.030w',
  '.032w',
  '.034w',
  '.036w',
  '.038w',
  '.040w',
  '.042w',
  '.044w',
  '.045w',
  '.046w',
  '.048w',
  '.050w',
  '.052w',
  '.054w',
  '.056w',
  '.059w',
  '.060w',
  '.062w',
  '.064w',
  '.065w',
  '.066w',
  '.068w',
  '.070w',
  '.072w',
  '.074w',
  '.080w',
  '.085w',
  '.090w',
  '.095w',
  '.100w',
  '.105w',
  '.110w',
  '.115w',
  '.120w',
  '.125w',
  '.130w',
]

export const GAUGE_OPTIONS = [...PLAIN_GAUGES, ...WOUND_GAUGES]
