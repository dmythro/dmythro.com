/**
 * Dates for routes the sitemap cannot work out on its own. Projects carry their own
 * dates, the standing pages are dated in `feedPages.ts`, and a listing page takes the
 * newest date of what it lists — these are what is left over.
 *
 * Maintained by hand for the same reason as `feedPages`: CI clones are often shallow,
 * so deriving from git would silently collapse every entry onto the build date.
 *
 * Paths are relative to the locale prefix, e.g. `/guitars` covers `/en/guitars` and
 * `/uk/guitars`.
 */
export const pageDates: Record<string, string> = {
  '/guitars': '2026-03-10',
  '/guitars/string-tension': '2026-03-10',
}
