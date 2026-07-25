import type { LocaleCode } from './i18n'

const localeTags: Record<LocaleCode, string> = {
  en: 'en-GB',
  uk: 'uk-UA',
}

/** Human-readable date, e.g. `25 Jul 2026` / `25 лип. 2026 р.`. */
export function formatDate(date: string | Date, locale: LocaleCode): string {
  const value = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(localeTags[locale], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(value)
}

/** `2026-07-25` — the `datetime` attribute for a `<time>` element. */
export function toIsoDate(date: string | Date): string {
  const value = typeof date === 'string' ? new Date(date) : date
  return value.toISOString().slice(0, 10)
}
