import { Tooltip } from '@heroui/tooltip'
import type { Translation } from 'my-locales'
import { type FC, useState } from 'react'

type IndicatorTranslations = Translation['guitars']['stringTension']['indicator']

// Baseline tensions: D'Addario NYXL 10-46/59/74 at E standard, 25.5" scale
// These represent the "ideal" tension range for each string position
// String 1-6: standard 10-46 set, String 7: .059w, String 8: .074w
const BASELINE_TENSIONS = [16.2, 15.4, 16.6, 18.4, 19.7, 18.1, 16.7, 14.8]

// Get baseline tension for a string position (1-indexed)
// For strings beyond 8, use the last baseline value
function getBaselineTension(stringNumber: number): number {
  const index = Math.min(stringNumber - 1, BASELINE_TENSIONS.length - 1)
  return BASELINE_TENSIONS[index] ?? BASELINE_TENSIONS[BASELINE_TENSIONS.length - 1]
}

// Calculate deviation percentage from baseline
function getDeviation(tension: number, baseline: number): number {
  if (baseline === 0) return 0
  return ((tension - baseline) / baseline) * 100
}

// Get color based on deviation percentage
// Green zone: within ±10% of baseline
// Yellow zone: 10-25% deviation
// Orange zone: 25-40% deviation
// Red zone: >40% deviation
function getIndicatorColor(deviationPercent: number): string {
  const absDeviation = Math.abs(deviationPercent)

  if (absDeviation <= 10) {
    // Green zone - interpolate from bright green to yellow-green
    const t = absDeviation / 10
    // hsl(120, 70%, 45%) -> hsl(90, 70%, 45%)
    const hue = 120 - t * 30
    return `hsl(${hue}, 70%, 45%)`
  }

  if (absDeviation <= 25) {
    // Yellow zone - interpolate from yellow-green to yellow to orange
    const t = (absDeviation - 10) / 15
    // hsl(90, 70%, 45%) -> hsl(45, 80%, 50%)
    const hue = 90 - t * 45
    const sat = 70 + t * 10
    const light = 45 + t * 5
    return `hsl(${hue}, ${sat}%, ${light}%)`
  }

  if (absDeviation <= 40) {
    // Orange zone - interpolate from orange to red-orange
    const t = (absDeviation - 25) / 15
    // hsl(45, 80%, 50%) -> hsl(20, 85%, 50%)
    const hue = 45 - t * 25
    const sat = 80 + t * 5
    return `hsl(${hue}, ${sat}%, 50%)`
  }

  // Red zone - interpolate from red-orange to deep red
  const t = Math.min((absDeviation - 40) / 20, 1)
  // hsl(20, 85%, 50%) -> hsl(0, 90%, 45%)
  const hue = 20 - t * 20
  const sat = 85 + t * 5
  const light = 50 - t * 5
  return `hsl(${hue}, ${sat}%, ${light}%)`
}

interface TensionIndicatorProps {
  tension: number
  stringNumber: number
  translations: IndicatorTranslations
}

export const TensionIndicator: FC<TensionIndicatorProps> = ({
  tension,
  stringNumber,
  translations: t,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  if (tension <= 0) {
    return (
      <span className="inline-flex items-center justify-end gap-1 font-mono text-xs sm:text-sm tabular-nums text-default-300">
        —
      </span>
    )
  }

  const baseline = getBaselineTension(stringNumber)
  const deviation = getDeviation(tension, baseline)
  const color = getIndicatorColor(deviation)

  // Determine arrow direction and symbol
  let symbol: string
  let tooltipContent: string

  const absDeviation = Math.abs(deviation)
  const sign = deviation > 0 ? '+' : ''

  if (absDeviation <= 10) {
    symbol = '●'
    tooltipContent = `${t.optimal} (${sign}${deviation.toFixed(0)}%)`
  } else if (deviation > 0) {
    symbol = '▲'
    tooltipContent = `${sign}${deviation.toFixed(0)}% ${t.vsBaseline} ${baseline} lbs`
  } else {
    symbol = '▼'
    tooltipContent = `${deviation.toFixed(0)}% ${t.vsBaseline} ${baseline} lbs`
  }

  const handleClick = () => {
    setIsOpen(true)
    // Auto-close after 2 seconds on mobile
    setTimeout(() => setIsOpen(false), 2000)
  }

  return (
    <Tooltip
      content={tooltipContent}
      placement="bottom-end"
      offset={4}
      delay={0}
      closeDelay={0}
      isOpen={isOpen}
      showArrow
      onOpenChange={setIsOpen}
    >
      <button
        type="button"
        className="inline-flex items-center justify-end gap-1 font-mono text-xs sm:text-sm tabular-nums cursor-help"
        onClick={handleClick}
      >
        <span role="img" className="text-xs" style={{ color }} aria-hidden="true">
          {symbol}
        </span>
        <span>{tension.toFixed(1)}</span>
      </button>
    </Tooltip>
  )
}
