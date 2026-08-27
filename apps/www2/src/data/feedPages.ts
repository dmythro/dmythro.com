/**
 * Standing pages that belong in the site feed alongside projects, so a CV or
 * contact change surfaces to subscribers rather than passing unnoticed.
 *
 * Dates are maintained by hand, exactly like `updatedAt` on a project. Deriving
 * them from git would be nicer but is not dependable: CI clones are often
 * shallow, which would silently collapse every entry onto the build date.
 */
export interface FeedPage {
  /** Route below the locale prefix, e.g. `/cv`. */
  path: string
  /** Translation key group this page's title and description come from. */
  key: 'cv' | 'contact' | 'openSource'
  publishedAt: string
  updatedAt?: string
}

export const feedPages: FeedPage[] = [
  { path: '/cv', key: 'cv', publishedAt: '2026-03-09', updatedAt: '2026-08-27' },
  { path: '/contact', key: 'contact', publishedAt: '2026-03-10' },
  { path: '/open-source', key: 'openSource', publishedAt: '2026-03-10', updatedAt: '2026-07-31' },
]
