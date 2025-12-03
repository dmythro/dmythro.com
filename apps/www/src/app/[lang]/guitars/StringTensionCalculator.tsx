'use client'

import { Card, CardBody } from '@heroui/card'
import { Input } from '@heroui/input'
import { Select, SelectItem } from '@heroui/select'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/table'
import { Tab, Tabs } from '@heroui/tabs'
import { type FC, type Key, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  type CoatingType,
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

const STORAGE_KEY = 'string-tension-calculator'

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
  coating: CoatingType
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
    coating: defaultBrand.coating,
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

export const StringTensionCalculator: FC = () => {
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

    const { type, strings, stringBrand, stringMaterial, coating, tuning, scaleFrom, scaleTo } = form
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
      const tension = calculateTension(gauge, scale, note, stringMaterial, coating, stringBrand)

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
          form.coating,
          form.stringBrand,
        )
        updated[index] = string
        return updated
      })
    },
    [form.stringMaterial, form.coating, form.stringBrand],
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
      coating: brand.coating,
    }))
  }, [])

  const handleMaterialChange = useCallback((keys: 'all' | Set<Key>) => {
    if (keys === 'all' || keys.size === 0) return
    const value = Array.from(keys)[0] as StringMaterial
    setForm((prev) => ({ ...prev, stringMaterial: value }))
  }, [])

  const handleCoatingChange = useCallback((keys: 'all' | Set<Key>) => {
    if (keys === 'all' || keys.size === 0) return
    const value = Array.from(keys)[0] as CoatingType
    setForm((prev) => ({ ...prev, coating: value }))
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

  const handleScaleFromChange = useCallback((value: string) => {
    const numValue = Number.parseFloat(value) || 0
    setForm((prev) => {
      const prevTo = Number.parseFloat(prev.scaleTo) || 0
      return {
        ...prev,
        scaleFrom: value,
        scaleTo: prevTo < numValue ? value : prev.scaleTo,
      }
    })
  }, [])

  const handleScaleToChange = useCallback((value: string) => {
    const numValue = Number.parseFloat(value) || 0
    setForm((prev) => {
      const fromValue = Number.parseFloat(prev.scaleFrom) || 0
      return {
        ...prev,
        scaleTo: numValue < fromValue ? prev.scaleFrom : value,
      }
    })
  }, [])

  const {
    type,
    preset,
    strings,
    stringBrand,
    stringMaterial,
    coating,
    tuning,
    scaleFrom,
    scaleTo,
  } = form
  const range = STRING_RANGES[type]
  const scaleRange = SCALE_RANGES[type]
  const presets = PRESETS[type]
  const presetLabel = type === 'guitar' ? 'Guitar Preset' : 'Bass Preset'

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
      <CardBody className="gap-4">
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:items-end sm:justify-between">
          <Tabs
            aria-label="Instrument type"
            selectedKey={type}
            onSelectionChange={handleTypeChange}
            variant="bordered"
            fullWidth
            classNames={{ base: 'sm:w-auto' }}
          >
            <Tab key="guitar" title="Guitar" />
            <Tab key="bass" title="Bass" />
          </Tabs>

          <div className="grid grid-cols-1 gap-4 sm:flex sm:gap-4">
            <Select
              label={presetLabel}
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
              label="String Brand"
              items={STRING_BRAND_PRESETS}
              selectedKeys={[stringBrand]}
              onSelectionChange={handleBrandChange}
              className="sm:w-48"
            >
              {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <Select
            label="Strings"
            items={stringOptions.map((n) => ({ key: String(n), label: String(n) }))}
            selectedKeys={[String(strings)]}
            onSelectionChange={handleStringsChange}
          >
            {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
          </Select>

          <Select
            label="Material"
            selectedKeys={[stringMaterial]}
            onSelectionChange={handleMaterialChange}
          >
            <SelectItem key="nickel-wound">Nickel Wound</SelectItem>
            <SelectItem key="stainless-wound">Stainless Steel</SelectItem>
            <SelectItem key="pure-nickel">Pure Nickel</SelectItem>
          </Select>

          <Select label="Coating" selectedKeys={[coating]} onSelectionChange={handleCoatingChange}>
            <SelectItem key="none">None</SelectItem>
            <SelectItem key="optiweb">Optiweb</SelectItem>
            <SelectItem key="nanoweb">Nanoweb</SelectItem>
            <SelectItem key="polyweb">Polyweb</SelectItem>
          </Select>

          <Select label="Tuning" selectedKeys={[tuning]} onSelectionChange={handleTuningChange}>
            <SelectItem key="standard">Standard</SelectItem>
            <SelectItem key="drop-d">Drop D</SelectItem>
            <SelectItem key="half-down">Half Step Down</SelectItem>
            <SelectItem key="full-down">Full Step Down</SelectItem>
          </Select>

          <Input
            type="number"
            label="Scale 1st"
            aria-label="Scale length for first string"
            min={scaleRange.min}
            max={scaleRange.max}
            step={0.5}
            value={scaleFrom}
            onValueChange={handleScaleFromChange}
            endContent={<span className="text-default-400 text-sm">"</span>}
          />
          <Input
            type="number"
            label="Scale last"
            aria-label="Scale length for last string"
            min={scaleRange.min}
            max={scaleRange.max}
            step={0.5}
            value={scaleTo}
            onValueChange={handleScaleToChange}
            endContent={<span className="text-default-400 text-sm">"</span>}
          />
        </div>

        <Table
          aria-label="String tensions"
          removeWrapper
          classNames={{
            th: 'px-0.5 sm:px-3',
            td: 'px-0.5 sm:px-3 py-1 sm:py-2',
          }}
        >
          <TableHeader>
            <TableColumn className="w-6 sm:w-12">#</TableColumn>
            <TableColumn className="w-20 sm:w-28">Scale</TableColumn>
            <TableColumn className="w-20 sm:w-28">Note</TableColumn>
            <TableColumn className="w-20 sm:w-28">Gauge</TableColumn>
            <TableColumn className="w-12 sm:w-24 text-right">Tension</TableColumn>
          </TableHeader>
          <TableBody>
            {stringsData.map((string, index) => (
              <TableRow key={string.number}>
                <TableCell className="font-medium">{string.number}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    size="sm"
                    aria-label={`Scale length for string ${string.number}`}
                    min={scaleRange.min}
                    max={scaleRange.max}
                    step={0.5}
                    value={string.scale}
                    onValueChange={(value) => updateString(index, 'scale', value)}
                    endContent={<span className="text-default-400 text-xs">"</span>}
                    classNames={{ input: 'text-center' }}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    size="sm"
                    selectedKeys={[string.note]}
                    onSelectionChange={(keys) => {
                      if (keys !== 'all' && keys.size > 0) {
                        updateString(index, 'note', Array.from(keys)[0] as string)
                      }
                    }}
                    aria-label={`Note for string ${string.number}`}
                  >
                    {noteOptions.map((note) => (
                      <SelectItem key={note}>{note}</SelectItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    size="sm"
                    selectedKeys={[string.gauge]}
                    onSelectionChange={(keys) => {
                      if (keys !== 'all' && keys.size > 0) {
                        updateString(index, 'gauge', Array.from(keys)[0] as string)
                      }
                    }}
                    aria-label={`Gauge for string ${string.number}`}
                  >
                    {GAUGE_OPTIONS.map((gauge) => (
                      <SelectItem key={gauge}>{gauge}</SelectItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell className="text-right font-mono text-xs sm:text-sm">
                  {string.tension > 0 ? (
                    <span className="flex flex-col gap-1 sm:flex-row">
                      <span>{string.tension}</span>
                      <span> lbs</span>
                    </span>
                  ) : (
                    '—'
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-end pt-2 border-t border-default-200">
          <span className="text-default-600">Total tension:</span>
          <span className="font-mono font-semibold ml-2">{totalTension.toFixed(1)} lbs</span>
        </div>
      </CardBody>
    </Card>
  )
}
