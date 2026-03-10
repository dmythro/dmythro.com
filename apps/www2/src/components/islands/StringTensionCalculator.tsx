import type { Translation } from '@dmythro/locales'
import type { FunctionComponent } from 'preact'
import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks'

import { RichSelect } from './RichSelect'
import {
  BASS_TUNINGS,
  DEFAULT_BASS_GAUGES,
  DEFAULT_PRESETS,
  GAUGE_OPTIONS,
  GUITAR_TUNINGS,
  type InstrumentType,
  NOTE_FREQUENCIES,
  PRESETS,
  SCALE_RANGES,
  STRING_BRAND_PRESETS,
  STRING_RANGES,
  type StringMaterial,
} from './string-constants'
import {
  calculateTension,
  getBrandPreset,
  getGaugesFromBrand,
  getNotesForTuning,
  interpolateScale,
} from './string-utils'
import { TensionIndicator } from './TensionIndicator'

const STORAGE_KEY = 'string-tension-calculator'

type StringTensionTranslations = Translation['guitars']['stringTension']

interface StringTensionCalculatorProps {
  translations: StringTensionTranslations
}

interface StringData {
  number: number
  scale: string
  note: string
  gauge: string
  tension: number
}

interface FormState {
  type: InstrumentType
  preset: string
  strings: number
  stringBrand: string
  stringMaterial: StringMaterial
  tuning: string
  scaleFrom: string
  scaleTo: string
}

interface StoredState {
  form: FormState
  stringsData: StringData[]
}

const getDefaultForm = (): FormState => {
  const preset = PRESETS.guitar.find((p) => p.key === DEFAULT_PRESETS.guitar)
  const defaultBrand = STRING_BRAND_PRESETS[0]
  return {
    type: 'guitar',
    preset: DEFAULT_PRESETS.guitar,
    strings: preset?.strings ?? 6,
    stringBrand: defaultBrand.key,
    stringMaterial: defaultBrand.material,
    tuning: preset?.tuning ?? 'standard',
    scaleFrom: preset?.scaleFrom ?? '25.5',
    scaleTo: preset?.scaleTo ?? '25.5',
  }
}

const loadFromStorage = (): StoredState | null => {
  if (typeof window === 'undefined') return null
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null
    return JSON.parse(stored) as StoredState
  } catch {
    return null
  }
}

const saveToStorage = (state: StoredState): void => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage full or unavailable
  }
}

export const StringTensionCalculator: FunctionComponent<StringTensionCalculatorProps> = ({
  translations: t,
}) => {
  const [form, setForm] = useState<FormState>(getDefaultForm)
  const [stringsData, setStringsData] = useState<StringData[]>([])
  const [isHydrated, setIsHydrated] = useState(false)
  const skipNextFormEffect = useRef(false)

  // Load state from localStorage on mount (after hydration)
  useEffect(() => {
    const stored = loadFromStorage()
    if (stored) {
      skipNextFormEffect.current = true
      setForm(stored.form)
      setStringsData(stored.stringsData)
    }
    setIsHydrated(true)
  }, [])

  // Save state to localStorage when it changes
  useEffect(() => {
    if (isHydrated && stringsData.length > 0) {
      saveToStorage({ form, stringsData })
    }
  }, [form, stringsData, isHydrated])

  // Initialize/update strings data when form changes
  useEffect(() => {
    if (skipNextFormEffect.current) {
      skipNextFormEffect.current = false
      return
    }

    const { type, strings, stringBrand, stringMaterial, tuning, scaleFrom, scaleTo } = form
    const scaleFromNum = Number.parseFloat(scaleFrom) || 25.5
    const scaleToNum = Number.parseFloat(scaleTo) || scaleFromNum
    const notes = getNotesForTuning(type, tuning, strings)
    const gauges =
      type === 'guitar'
        ? getGaugesFromBrand(stringBrand, strings, tuning)
        : DEFAULT_BASS_GAUGES.slice(0, strings)

    const newStringsData: StringData[] = Array.from({ length: strings }, (_, i) => {
      const scale = interpolateScale(i, strings, scaleFromNum, scaleToNum)
      const note = notes[i] || notes[notes.length - 1]
      const gauge = gauges[i] || gauges[gauges.length - 1]
      const tension = calculateTension(gauge, scale, note, stringMaterial, stringBrand)

      return {
        number: i + 1,
        scale: scale.toFixed(2),
        note,
        gauge,
        tension,
      }
    })

    setStringsData(newStringsData)
  }, [form])

  const updateString = useCallback(
    (index: number, field: keyof StringData, value: string) => {
      setStringsData((prev) => {
        const updated = [...prev]
        const string = { ...updated[index] }

        if (field === 'scale') {
          string.scale = value
        } else if (field === 'note') {
          string.note = value
        } else if (field === 'gauge') {
          string.gauge = value
        }

        string.tension = calculateTension(
          string.gauge,
          Number.parseFloat(string.scale),
          string.note,
          form.stringMaterial,
          form.stringBrand,
        )
        updated[index] = string
        return updated
      })
    },
    [form.stringMaterial, form.stringBrand],
  )

  const handleTypeChange = useCallback((type: InstrumentType) => {
    const preset = PRESETS[type].find((p) => p.key === DEFAULT_PRESETS[type])
    setForm((prev) => ({
      ...prev,
      type,
      preset: DEFAULT_PRESETS[type],
      strings: preset?.strings ?? prev.strings,
      tuning: preset?.tuning ?? prev.tuning,
      scaleFrom: preset?.scaleFrom ?? prev.scaleFrom,
      scaleTo: preset?.scaleTo ?? prev.scaleTo,
    }))
  }, [])

  const handlePresetChange = useCallback((presetKey: string) => {
    setForm((prev) => {
      const preset = PRESETS[prev.type].find((p) => p.key === presetKey)
      if (!preset) return prev
      return {
        ...prev,
        preset: presetKey,
        strings: preset.strings,
        tuning: preset.tuning,
        scaleFrom: preset.scaleFrom,
        scaleTo: preset.scaleTo,
      }
    })
  }, [])

  const handleBrandChange = useCallback((brandKey: string) => {
    const brand = getBrandPreset(brandKey)
    setForm((prev) => ({
      ...prev,
      stringBrand: brandKey,
      stringMaterial: brand.material,
    }))
  }, [])

  const handleMaterialChange = useCallback((e: Event & { currentTarget: HTMLSelectElement }) => {
    setForm((prev) => ({ ...prev, stringMaterial: e.currentTarget.value as StringMaterial }))
  }, [])

  const handleStringsChange = useCallback((e: Event & { currentTarget: HTMLSelectElement }) => {
    setForm((prev) => ({ ...prev, strings: Number(e.currentTarget.value) }))
  }, [])

  const handleTuningChange = useCallback((e: Event & { currentTarget: HTMLSelectElement }) => {
    setForm((prev) => ({ ...prev, tuning: e.currentTarget.value }))
  }, [])

  const handleScaleFromChange = useCallback((e: Event & { currentTarget: HTMLInputElement }) => {
    setForm((prev) => ({ ...prev, scaleFrom: e.currentTarget.value }))
  }, [])

  const handleScaleToChange = useCallback((e: Event & { currentTarget: HTMLInputElement }) => {
    setForm((prev) => ({ ...prev, scaleTo: e.currentTarget.value }))
  }, [])

  const handleScaleFromBlur = useCallback(() => {
    setForm((prev) => {
      const fromValue = Number.parseFloat(prev.scaleFrom) || 0
      const toValue = Number.parseFloat(prev.scaleTo) || 0
      if (fromValue > toValue) {
        return { ...prev, scaleTo: prev.scaleFrom }
      }
      return prev
    })
  }, [])

  const handleScaleToBlur = useCallback(() => {
    setForm((prev) => {
      const fromValue = Number.parseFloat(prev.scaleFrom) || 0
      const toValue = Number.parseFloat(prev.scaleTo) || 0
      if (toValue < fromValue) {
        return { ...prev, scaleTo: prev.scaleFrom }
      }
      return prev
    })
  }, [])

  const { type, preset, strings, stringBrand, stringMaterial, tuning, scaleFrom, scaleTo } = form
  const range = STRING_RANGES[type]
  const scaleRange = SCALE_RANGES[type]
  const presets = PRESETS[type]
  const presetLabel = type === 'guitar' ? t.guitarPreset : t.bassPreset
  const stringOptions = useMemo(
    () => Array.from({ length: range.max - range.min + 1 }, (_, i) => range.min + i),
    [range],
  )

  const noteOptions = useMemo(
    () =>
      Object.keys(NOTE_FREQUENCIES).sort((a, b) => {
        const freqA = NOTE_FREQUENCIES[a]
        const freqB = NOTE_FREQUENCIES[b]
        return freqB - freqA
      }),
    [],
  )

  const totalTension = useMemo(
    () => stringsData.reduce((sum, s) => sum + s.tension, 0),
    [stringsData],
  )

  return (
    <div class="card card-static bg-base-100 shadow-sm border border-base-300">
      <div class="card-body gap-4 p-2 sm:p-3">
        {/* Instrument type tabs + presets row */}
        <div class="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:items-end sm:justify-between">
          <div role="tablist" class="tabs tabs-box self-start">
            <button
              type="button"
              role="tab"
              class={`tab${type === 'guitar' ? ' tab-active' : ''}`}
              onClick={() => handleTypeChange('guitar')}
            >
              {t.guitar}
            </button>
            <button
              type="button"
              role="tab"
              class={`tab${type === 'bass' ? ' tab-active' : ''}`}
              onClick={() => handleTypeChange('bass')}
            >
              {t.bass}
            </button>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:flex sm:gap-4">
            <RichSelect
              label={presetLabel}
              items={presets.map((p) => ({
                key: p.key,
                label: p.label,
                description: p.description,
              }))}
              value={preset}
              onChange={handlePresetChange}
              class="sm:w-56"
            />

            <RichSelect
              label={t.stringPreset}
              items={STRING_BRAND_PRESETS.map((b) => ({
                key: b.key,
                label: b.label,
                description: b.description,
              }))}
              value={stringBrand}
              onChange={handleBrandChange}
              class="sm:w-56"
            />
          </div>
        </div>

        <div class="divider my-0 opacity-30" />

        {/* Controls row */}
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <label class="form-control">
            <div class="label">
              <span class="label-text">{t.strings}</span>
            </div>
            <select
              class="select select-bordered select-sm"
              value={String(strings)}
              onChange={handleStringsChange}
            >
              {stringOptions.map((n) => (
                <option key={n} value={String(n)}>
                  {n}
                </option>
              ))}
            </select>
          </label>

          <label class="form-control">
            <div class="label">
              <span class="label-text">{t.tuning}</span>
            </div>
            <select
              class="select select-bordered select-sm"
              value={tuning}
              onChange={handleTuningChange}
            >
              {Object.keys(type === 'guitar' ? GUITAR_TUNINGS : BASS_TUNINGS).map((key) => (
                <option key={key} value={key}>
                  {t.tunings[key as keyof typeof t.tunings]}
                </option>
              ))}
            </select>
          </label>

          <label class="form-control">
            <div class="label">
              <span class="label-text">{t.scaleLast}</span>
            </div>
            <label class="input input-bordered input-sm">
              <input
                type="number"
                class="grow text-right"
                min={scaleRange.min}
                max={scaleRange.max}
                step={0.25}
                value={scaleTo}
                onInput={handleScaleToChange}
                onBlur={handleScaleToBlur}
              />
              <span class="text-base-content/40 text-sm">"</span>
            </label>
          </label>

          <label class="form-control">
            <div class="label">
              <span class="label-text">{t.scaleFirst}</span>
            </div>
            <label class="input input-bordered input-sm">
              <input
                type="number"
                class="grow text-right"
                min={scaleRange.min}
                max={scaleRange.max}
                step={0.25}
                value={scaleFrom}
                onInput={handleScaleFromChange}
                onBlur={handleScaleFromBlur}
              />
              <span class="text-base-content/40 text-sm">"</span>
            </label>
          </label>

          <label class="form-control col-span-2 sm:col-span-1">
            <div class="label">
              <span class="label-text">{t.material}</span>
            </div>
            <select
              class="select select-bordered select-sm"
              value={stringMaterial}
              onChange={handleMaterialChange}
            >
              <option value="nickel-wound">{t.materials['nickel-wound']}</option>
              <option value="stainless-wound">{t.materials['stainless-wound']}</option>
              <option value="pure-nickel">{t.materials['pure-nickel']}</option>
            </select>
          </label>
        </div>

        <div class="divider my-0 opacity-30" />

        {/* String rows */}
        <div class="flex flex-col gap-2 mb-2">
          {/* Header row */}
          <div class="grid gap-1 sm:gap-2 text-xs font-semibold text-base-content/50 uppercase px-1 grid-cols-[1.5rem_5rem_4.5rem_5rem_3.5rem] sm:grid-cols-[2rem_1fr_1fr_1fr_4.5rem]">
            <div class="text-center">#</div>
            <div>{t.scale}</div>
            <div>{t.note}</div>
            <div>{t.gauge}</div>
            <div class="text-right">{t.tension}</div>
          </div>

          {/* String rows */}
          <div class="flex flex-col gap-1 sm:gap-2">
            {stringsData.map((row, index) => (
              <div
                key={row.number}
                class="grid gap-1 sm:gap-2 items-center grid-cols-[1.5rem_5rem_4.5rem_5rem_3.5rem] sm:grid-cols-[2rem_1fr_1fr_1fr_4.5rem]"
              >
                <div class="font-medium text-center text-sm">{row.number}</div>
                <label class="input input-bordered input-xs">
                  <input
                    type="number"
                    class="grow text-right"
                    aria-label={`Scale length for string ${row.number}`}
                    min={scaleRange.min}
                    max={scaleRange.max}
                    step={0.25}
                    value={row.scale}
                    onInput={(e) => updateString(index, 'scale', e.currentTarget.value)}
                  />
                  <span class="text-base-content/40 text-xs">"</span>
                </label>
                <select
                  class="select select-bordered select-xs min-w-0"
                  value={row.note}
                  onChange={(e) => updateString(index, 'note', e.currentTarget.value)}
                  aria-label={`Note for string ${row.number}`}
                >
                  {noteOptions.map((note) => (
                    <option key={note} value={note}>
                      {note}
                    </option>
                  ))}
                </select>
                <select
                  class="select select-bordered select-xs min-w-[85px]"
                  value={row.gauge}
                  onChange={(e) => updateString(index, 'gauge', e.currentTarget.value)}
                  aria-label={`Gauge for string ${row.number}`}
                >
                  {GAUGE_OPTIONS.map((gauge) => (
                    <option key={gauge} value={gauge}>
                      {gauge}
                    </option>
                  ))}
                </select>
                <TensionIndicator
                  tension={row.tension}
                  stringNumber={row.number}
                  instrumentType={type}
                  translations={t.indicator}
                />
              </div>
            ))}
          </div>
        </div>

        <div class="divider my-0 opacity-30" />

        {/* Total tension */}
        <div class="flex justify-end pb-2 pr-2">
          <span class="text-base-content/60">{t.totalTension}:</span>
          <span class="font-mono font-semibold ml-2">{totalTension.toFixed(1)} lbs</span>
        </div>
      </div>
    </div>
  )
}
