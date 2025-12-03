'use client'

import { Card, CardBody } from '@heroui/card'
import { Divider } from '@heroui/divider'
import { Input } from '@heroui/input'
import { Select, SelectItem } from '@heroui/select'
import { Tab, Tabs } from '@heroui/tabs'
import type { Translation } from 'my-locales'
import { type FC, type Key, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  DEFAULT_BASS_GAUGES,
  DEFAULT_PRESETS,
  GAUGE_OPTIONS,
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

export const StringTensionCalculator: FC<StringTensionCalculatorProps> = ({ translations: t }) => {
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
    // Skip if we just restored from storage
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

  // Update individual string and recalculate tension
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

  const handleTypeChange = useCallback((key: Key) => {
    const type = key as InstrumentType
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

  const handlePresetChange = useCallback((keys: 'all' | Set<Key>) => {
    if (keys === 'all' || keys.size === 0) return
    const presetKey = Array.from(keys)[0] as string
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

  const handleBrandChange = useCallback((keys: 'all' | Set<Key>) => {
    if (keys === 'all' || keys.size === 0) return
    const brandKey = Array.from(keys)[0] as string
    const brand = getBrandPreset(brandKey)
    setForm((prev) => ({
      ...prev,
      stringBrand: brandKey,
      stringMaterial: brand.material,
    }))
  }, [])

  const handleMaterialChange = useCallback((keys: 'all' | Set<Key>) => {
    if (keys === 'all' || keys.size === 0) return
    const value = Array.from(keys)[0] as StringMaterial
    setForm((prev) => ({ ...prev, stringMaterial: value }))
  }, [])

  const handleStringsChange = useCallback((keys: 'all' | Set<Key>) => {
    if (keys === 'all' || keys.size === 0) return
    const value = Number(Array.from(keys)[0])
    setForm((prev) => ({ ...prev, strings: value }))
  }, [])

  const handleTuningChange = useCallback((keys: 'all' | Set<Key>) => {
    if (keys === 'all' || keys.size === 0) return
    const value = Array.from(keys)[0] as string
    setForm((prev) => ({ ...prev, tuning: value }))
  }, [])

  // Allow free typing, just update the value
  const handleScaleFromChange = useCallback((value: string) => {
    setForm((prev) => ({ ...prev, scaleFrom: value }))
  }, [])

  const handleScaleToChange = useCallback((value: string) => {
    setForm((prev) => ({ ...prev, scaleTo: value }))
  }, [])

  // Validate and constrain on blur
  const handleScaleFromBlur = useCallback(() => {
    setForm((prev) => {
      const fromValue = Number.parseFloat(prev.scaleFrom) || 0
      const toValue = Number.parseFloat(prev.scaleTo) || 0
      // If "from" (1st string) is now larger than "to" (last string), update "to"
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
      // If "to" (last string) is now smaller than "from" (1st string), update "to" to match "from"
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
  // const selectedPreset = presets.find((p) => p.key === preset)
  const selectedStringPreset = STRING_BRAND_PRESETS.find((b) => b.key === stringBrand)

  const stringOptions = useMemo(
    () => Array.from({ length: range.max - range.min + 1 }, (_, i) => range.min + i),
    [range],
  )

  const noteOptions = useMemo(
    () =>
      Object.keys(NOTE_FREQUENCIES).sort((a, b) => {
        const freqA = NOTE_FREQUENCIES[a]
        const freqB = NOTE_FREQUENCIES[b]
        return freqB - freqA // High to low
      }),
    [],
  )

  const totalTension = useMemo(
    () => stringsData.reduce((sum, s) => sum + s.tension, 0),
    [stringsData],
  )

  return (
    <Card>
      <CardBody className="gap-4 p-2 sm:p-3">
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:items-end sm:justify-between">
          <Tabs
            aria-label={t.instrumentType}
            selectedKey={type}
            onSelectionChange={handleTypeChange}
            variant="bordered"
            fullWidth
            classNames={{ base: 'sm:w-auto self-start' }}
          >
            <Tab key="guitar" title={t.guitar} />
            <Tab key="bass" title={t.bass} />
          </Tabs>

          <div className="grid grid-cols-1 gap-4 sm:flex sm:gap-4">
            <Select
              label={presetLabel}
              // description={selectedPreset?.description}
              items={presets}
              selectedKeys={[preset]}
              onSelectionChange={handlePresetChange}
              className="sm:w-56"
            >
              {(item) => (
                <SelectItem key={item.key} description={item.description}>
                  {item.label}
                </SelectItem>
              )}
            </Select>

            <Select
              label={t.stringPreset}
              description={selectedStringPreset?.description}
              items={STRING_BRAND_PRESETS}
              selectedKeys={[stringBrand]}
              onSelectionChange={handleBrandChange}
              className="sm:w-48"
              classNames={{ popoverContent: 'min-w-72' }}
            >
              {(item) => (
                <SelectItem key={item.key} description={item.description}>
                  {item.label}
                </SelectItem>
              )}
            </Select>
          </div>
        </div>

        <Divider className="opacity-30" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <Select
            label={t.strings}
            items={stringOptions.map((n) => ({ key: String(n), label: String(n) }))}
            selectedKeys={[String(strings)]}
            onSelectionChange={handleStringsChange}
          >
            {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
          </Select>

          <Select label={t.tuning} selectedKeys={[tuning]} onSelectionChange={handleTuningChange}>
            <SelectItem key="e">{t.tunings.e}</SelectItem>
            <SelectItem key="e-drop-d">{t.tunings['e-drop-d']}</SelectItem>
            <SelectItem key="eb">{t.tunings.eb}</SelectItem>
            <SelectItem key="d">{t.tunings.d}</SelectItem>
            <SelectItem key="b">{t.tunings.b}</SelectItem>
          </Select>

          <Input
            type="number"
            classNames={{ input: 'text-right' }}
            label={t.scaleLast}
            aria-label="Scale length for last string"
            min={scaleRange.min}
            max={scaleRange.max}
            step={0.25}
            value={scaleTo}
            onValueChange={handleScaleToChange}
            onBlur={handleScaleToBlur}
            endContent={<span className="text-default-400 text-sm">"</span>}
          />

          <Input
            type="number"
            classNames={{ input: 'text-right' }}
            label={t.scaleFirst}
            aria-label="Scale length for first string"
            min={scaleRange.min}
            max={scaleRange.max}
            step={0.25}
            value={scaleFrom}
            onValueChange={handleScaleFromChange}
            onBlur={handleScaleFromBlur}
            endContent={<span className="text-default-400 text-sm">"</span>}
          />

          <Select
            className="col-span-2 sm:col-span-1"
            label={t.material}
            selectedKeys={[stringMaterial]}
            onSelectionChange={handleMaterialChange}
          >
            <SelectItem key="nickel-wound">{t.materials['nickel-wound']}</SelectItem>
            <SelectItem key="stainless-wound">{t.materials['stainless-wound']}</SelectItem>
            <SelectItem key="pure-nickel">{t.materials['pure-nickel']}</SelectItem>
          </Select>
        </div>

        <Divider className="opacity-30" />

        <div className="flex flex-col gap-2 mb-2">
          {/* Header row */}
          <div className="grid gap-1 sm:gap-2 text-xs font-semibold text-default-500 uppercase px-1 grid-cols-[1.5rem_5rem_4.5rem_5rem_3.5rem] sm:grid-cols-[2rem_1fr_1fr_1fr_4.5rem]">
            <div className="text-center">#</div>
            <div>{t.scale}</div>
            <div>{t.note}</div>
            <div>{t.gauge}</div>
            <div className="text-right">{t.tension}</div>
          </div>

          {/* String rows */}
          <div className="flex flex-col gap-1 sm:gap-2">
            {stringsData.map((row, index) => (
              <div
                key={row.number}
                className="grid gap-1 sm:gap-2 items-center grid-cols-[1.5rem_5rem_4.5rem_5rem_3.5rem] sm:grid-cols-[2rem_1fr_1fr_1fr_4.5rem]"
              >
                <div className="font-medium text-center text-sm">{row.number}</div>
                <Input
                  type="number"
                  size="sm"
                  aria-label={`Scale length for string ${row.number}`}
                  min={scaleRange.min}
                  max={scaleRange.max}
                  step={0.25}
                  value={row.scale}
                  onValueChange={(value) => updateString(index, 'scale', value)}
                  endContent={<span className="text-default-400 text-xs">"</span>}
                  classNames={{ input: 'text-right' }}
                />
                <Select
                  size="sm"
                  selectedKeys={[row.note]}
                  onSelectionChange={(keys) => {
                    if (keys !== 'all' && keys.size > 0) {
                      updateString(index, 'note', Array.from(keys)[0] as string)
                    }
                  }}
                  aria-label={`Note for string ${row.number}`}
                  classNames={{ popoverContent: 'min-w-24' }}
                >
                  {noteOptions.map((note) => (
                    <SelectItem key={note}>{note}</SelectItem>
                  ))}
                </Select>
                <Select
                  size="sm"
                  selectedKeys={[row.gauge]}
                  onSelectionChange={(keys) => {
                    if (keys !== 'all' && keys.size > 0) {
                      updateString(index, 'gauge', Array.from(keys)[0] as string)
                    }
                  }}
                  aria-label={`Gauge for string ${row.number}`}
                  classNames={{ base: 'min-w-[85px]', popoverContent: 'min-w-24' }}
                >
                  {GAUGE_OPTIONS.map((gauge) => (
                    <SelectItem key={gauge}>{gauge}</SelectItem>
                  ))}
                </Select>
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

        <Divider className="opacity-30" />

        <div className="flex justify-end pb-2 pr-2">
          <span className="text-default-600">{t.totalTension}:</span>
          <span className="font-mono font-semibold ml-2">{totalTension.toFixed(1)} lbs</span>
        </div>
      </CardBody>
    </Card>
  )
}
