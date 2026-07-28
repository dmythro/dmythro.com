import { localeTags } from './formatDate'
import type { LocaleCode } from './i18n'

/**
 * Locale-aware file size, e.g. `1.24 MB` / `1,24 МБ`. Intl carries both the decimal
 * separator and the unit name, so neither is spelled out per locale.
 */
export function formatFileSize(bytes: number, locale: LocaleCode): string {
  const useMegabytes = bytes >= 1024 * 1024
  const value = bytes / (useMegabytes ? 1024 * 1024 : 1024)

  return new Intl.NumberFormat(localeTags[locale], {
    style: 'unit',
    unit: useMegabytes ? 'megabyte' : 'kilobyte',
    unitDisplay: 'short',
    maximumFractionDigits: useMegabytes ? 2 : 0,
  }).format(value)
}
