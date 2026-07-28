// String tension calculator constants

export type InstrumentType = 'guitar' | 'bass'
export type StringMaterial = 'nickel-wound' | 'stainless-wound' | 'pure-nickel'

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

// Fallback unit-weight model, used for any gauge missing from the brand tables
// below: UW = gauge² × coefficient, gauge in inches, UW in lbs/inch.
//
// The coefficient is the mean of what DADDARIO_UNIT_WEIGHTS implies — its plain
// entries all sit within 0.3% of 0.2215 — so a gauge that falls through to the
// formula lands where the same brand's published data would put it. The physics
// agrees: π/4 × 0.282 lbs/in³ for high-carbon music wire. Anything above 0.2231
// (π/4 × solid steel) is impossible for round wire, which is the cheap sanity
// check this constant failed for a while.
export const PLAIN_STEEL_COEFFICIENT = 0.2215

// A wound string is a steel hex core inside a helical wrap, so its coefficient
// depends on the wrap alloy. Nickel-wound is measured: the mean of the wound
// entries in DADDARIO_UNIT_WEIGHTS from .024w up, which hold 0.1875 to within
// 0.8%. Below that the core is a large enough share of the diameter that the
// square law stops fitting — .017w sits 6% off — but those gauges are all in the
// table anyway, so the fallback is tuned to the range that actually reaches it,
// bass gauges above all.
//
// The other two scale nickel-wound by wrap density over a 27/73 core-to-wrap
// volume split, what a .046 with a .022 core works out to. Pure nickel is the
// heaviest of the three, not the lightest: nickel is denser than the steel it
// replaces, so the old ordering had the sign backwards.
export const WOUND_COEFFICIENTS: Record<StringMaterial, number> = {
  'nickel-wound': 0.1875, // Nickel-plated steel wrap, 7.85 g/cm³
  'stainless-wound': 0.1884, // Stainless 304 wrap, 7.9 g/cm³
  'pure-nickel': 0.2057, // Pure nickel wrap, 8.9 g/cm³
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

// Which gauge set a tuning asks for. B standard needs its own: it sits five
// semitones below E, far enough that the down-tuned set goes slack on a 27" neck.
export type GaugeSet = 'standard' | 'down' | 'baritone'

export const TUNING_GAUGE_SETS: Record<string, GaugeSet> = {
  e: 'standard',
  'e-drop-d': 'down',
  eb: 'down',
  d: 'down',
  b: 'baritone',
}

// Gauges are shared across every brand below — these sets differ by winding,
// coating and core treatment, not by diameter, and all seven ship the same
// nominal 10-46 / 10-52 / 13-62 sizes. Keyed by string count; anything above 8
// repeats the lowest gauge.
export const GAUGE_SETS: Record<GaugeSet, Record<6 | 7 | 8, string[]>> = {
  // 10-46, the regular-light standard
  standard: {
    6: ['.010', '.013', '.017', '.026w', '.036w', '.046w'],
    7: ['.010', '.013', '.017', '.026w', '.036w', '.046w', '.059w'],
    8: ['.010', '.013', '.017', '.030w', '.042w', '.054w', '.064w', '.074w'],
  },
  // 10-52, heavier on the wound strings to hold a step down
  down: {
    6: ['.010', '.013', '.017', '.030w', '.042w', '.052w'],
    7: ['.010', '.013', '.017', '.030w', '.042w', '.052w', '.064w'],
    8: ['.010', '.013', '.017', '.030w', '.042w', '.054w', '.064w', '.074w'],
  },
  // 13-62, the D'Addario EXL158 baritone sizes, extended down for 7 and 8
  baritone: {
    6: ['.013', '.017', '.026w', '.036w', '.046w', '.062w'],
    7: ['.013', '.017', '.026w', '.036w', '.046w', '.062w', '.080w'],
    8: ['.013', '.017', '.026w', '.036w', '.046w', '.062w', '.080w', '.105w'],
  },
}

// String brand presets — construction and feel, which is what the choice
// actually changes. Unit weights come from BRAND_UNIT_WEIGHTS where published.
export interface StringBrandPreset {
  key: string
  label: string
  description: string
  material: StringMaterial
}

export const STRING_BRAND_PRESETS: StringBrandPreset[] = [
  {
    key: 'daddario-nyxl',
    label: "D'Addario NYXL",
    description: 'Nickel-wound, high carbon steel core, bright tone, enhanced tuning stability',
    material: 'nickel-wound',
  },
  {
    key: 'daddario-xl',
    label: "D'Addario XL",
    description: 'Nickel-wound, hex core, balanced tone, industry standard',
    material: 'nickel-wound',
  },
  {
    key: 'elixir-optiweb',
    label: 'Elixir Optiweb',
    description: 'Nickel-wound, ultra-thin coating, natural feel, long-lasting tone',
    material: 'nickel-wound',
  },
  {
    key: 'elixir-nanoweb',
    label: 'Elixir Nanoweb',
    description: 'Nickel-wound, thin coating, balanced feel, extended lifespan',
    material: 'nickel-wound',
  },
  {
    key: 'elixir-polyweb',
    label: 'Elixir Polyweb',
    description: 'Nickel-wound, original coating, warm tone, smooth feel',
    material: 'nickel-wound',
  },
  {
    key: 'ernie-ball-paradigm',
    label: 'Ernie Ball Paradigm',
    description: 'Nickel-wound, reinforced plain strings, break-resistant, bright tone',
    material: 'nickel-wound',
  },
  {
    key: 'ernie-ball-slinky',
    label: 'Ernie Ball Slinky',
    description: 'Nickel-wound, tin-plated hex core, flexible feel, classic rock tone',
    material: 'nickel-wound',
  },
]

// Standard tunings for guitar (high to low) - supports up to 12 strings
export const GUITAR_TUNINGS: Record<string, string[]> = {
  e: ['E4', 'B3', 'G3', 'D3', 'A2', 'E2', 'B1', 'F#1', 'C#1', 'G#0', 'D#0', 'A#0'],
  'e-drop-d': ['E4', 'B3', 'G3', 'D3', 'A2', 'D2', 'A1', 'E1', 'B0', 'F#0', 'C#0', 'G#0'],
  eb: ['D#4', 'A#3', 'F#3', 'C#3', 'G#2', 'D#2', 'A#1', 'F1', 'C1', 'G0', 'D0', 'A0'],
  d: ['D4', 'A3', 'F3', 'C3', 'G2', 'D2', 'A1', 'E1', 'B0', 'F#0', 'C#0', 'G#0'],
  b: ['B3', 'F#3', 'D3', 'A2', 'E2', 'B1', 'F#1', 'C#1', 'G#0', 'D#0', 'A#0', 'F0'],
}

// Standard tunings for bass (high to low)
export const BASS_TUNINGS: Record<string, string[]> = {
  e: ['G2', 'D2', 'A1', 'E1', 'B0', 'F#0'],
  'e-drop-d': ['G2', 'D2', 'A1', 'D1', 'A0', 'E0'],
  eb: ['F#2', 'C#2', 'G#1', 'D#1', 'A#0', 'F0'],
  d: ['F2', 'C2', 'G1', 'D1', 'A0', 'E0'],
}

// Default gauges for bass strings (all wound)
export const DEFAULT_BASS_GAUGES = ['.045w', '.065w', '.085w', '.105w', '.125w', '.130w']

// What the tension indicator calls neutral, per string position, in lbs.
//
// Guitar reads off D'Addario's published tensions for NYXL 10-46 at E standard
// and 25.5", plus .059w and .074w for strings 7 and 8. Bass has no equivalent
// published set here, so it is DEFAULT_BASS_GAUGES at E standard and 34" run
// through the fallback model — a reference set reads as 0%, and deviation shows
// once gauge, tuning or scale moves off it. Both are asserted in
// `tests/string-tension.test.ts`, so neither can drift from its source.
export const GUITAR_BASELINE_TENSIONS = [16.2, 15.4, 16.6, 18.4, 19.7, 18.1, 16.7, 14.8]
export const BASS_BASELINE_TENSIONS = [43.6, 51.1, 49, 42, 33.4, 20.3]

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
      key: '6-e-25.5',
      label: '6-string E Standard',
      strings: 6,
      tuning: 'e',
      scaleFrom: '25.5',
      scaleTo: '25.5',
    },
    {
      key: '6-e-25.5_25',
      label: '6-string E Standard (MS)',
      description: 'Multi-scale 25.5-25"',
      strings: 6,
      tuning: 'e',
      scaleFrom: '25',
      scaleTo: '25.5',
    },
    {
      key: '6-d-25.5',
      label: '6-string D Standard',
      description: 'Jackson King V',
      strings: 6,
      tuning: 'd',
      scaleFrom: '25.5',
      scaleTo: '25.5',
    },
    {
      key: '6-b-27',
      label: '6-string B Standard (B)',
      description: 'Baritone 27"',
      strings: 6,
      tuning: 'b',
      scaleFrom: '27',
      scaleTo: '27',
    },
    {
      key: '7-e-25.5',
      label: '7-string E Standard',
      strings: 7,
      tuning: 'e',
      scaleFrom: '25.5',
      scaleTo: '25.5',
    },
    {
      key: '7-e-27_25.5',
      label: '7-string E Standard (MS)',
      description: 'Multi-scale 27-25.5"',
      strings: 7,
      tuning: 'e',
      scaleFrom: '25.5',
      scaleTo: '27',
    },
    {
      key: '7-e-28_26.5',
      label: '7-string E Standard (MS)',
      description: 'Multi-scale 28-26.5"',
      strings: 7,
      tuning: 'e',
      scaleFrom: '26.5',
      scaleTo: '28',
    },
    {
      key: '7-d-25.5',
      label: '7-string D Standard',
      description: 'Framus Streetwalker 7',
      strings: 7,
      tuning: 'd',
      scaleFrom: '25.5',
      scaleTo: '25.5',
    },
    {
      key: '7-b-27',
      label: '7-string B Standard (B)',
      description: 'Baritone 27"',
      strings: 7,
      tuning: 'b',
      scaleFrom: '27',
      scaleTo: '27',
    },
    {
      key: '8-e-27_25.5',
      label: '8-string E Standard (MS)',
      description: 'Multi-scale 27-25.5"',
      strings: 8,
      tuning: 'e',
      scaleFrom: '25.5',
      scaleTo: '27',
    },
    {
      key: '8-e-28_26.5',
      label: '8-string E Standard (MS)',
      description: 'Multi-scale 28-26.5"',
      strings: 8,
      tuning: 'e',
      scaleFrom: '26.5',
      scaleTo: '28',
    },
    {
      key: '8-d-28_26.5',
      label: '8-string D Standard (MS)',
      description: 'Multi-scale 28-26.5" Valravn Munnin',
      strings: 8,
      tuning: 'd',
      scaleFrom: '26.5',
      scaleTo: '28',
    },
  ],
  bass: [
    {
      key: '4-e',
      label: '4-string E Standard',
      strings: 4,
      tuning: 'e',
      scaleFrom: '34',
      scaleTo: '34',
    },
    {
      key: '4-d',
      label: '4-string D Standard',
      strings: 4,
      tuning: 'd',
      scaleFrom: '34',
      scaleTo: '34',
    },
    {
      key: '5-e-34',
      label: '5-string E Standard',
      strings: 5,
      tuning: 'e',
      scaleFrom: '34',
      scaleTo: '34',
    },
    {
      key: '5-e-34_32',
      label: '5-string E Standard (MS)',
      description: 'Multi-scale 34-32"',
      strings: 5,
      tuning: 'e',
      scaleFrom: '32',
      scaleTo: '34',
    },
    {
      key: '5-e-35_32',
      label: '5-string E Standard (MS)',
      description: 'Multi-scale 35-32"',
      strings: 5,
      tuning: 'e',
      scaleFrom: '32',
      scaleTo: '35',
    },
    {
      key: '5-e-37_34',
      label: '5-string E Standard (MS)',
      description: 'Multi-scale 37-34"',
      strings: 5,
      tuning: 'e',
      scaleFrom: '34',
      scaleTo: '37',
    },
    {
      key: '5-d',
      label: '5-string D Standard',
      strings: 5,
      tuning: 'd',
      scaleFrom: '34',
      scaleTo: '34',
    },
  ],
}

export const DEFAULT_PRESETS: Record<InstrumentType, string> = {
  guitar: '6-d-25.5',
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
