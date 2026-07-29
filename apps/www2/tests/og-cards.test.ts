import { describe, expect, it } from 'bun:test'

import { projects } from '../src/data/projects'
import { availableLocales } from '../src/utils/i18n'
import { OG_DESCRIPTION_LIMIT } from '../src/utils/ogImage'

/**
 * Card copy is curated, so a description that overruns the card is a sentence
 * someone wrote, not a runtime condition. The renderer clamps as a backstop, but
 * a clamp is a silent failure discovered weeks later in a chat preview — these
 * tests are the loud version, failing where the copy can still be edited.
 */

// `getPageCopy` reaches the standing pages' translations, the same strings their
// cards draw. Imported lazily so a failure here reads as a copy problem rather
// than a module-loading one.
const { getPageCopy } = await import('../src/utils/feed')

describe('OG card descriptions', () => {
  // The checks below all assert "nothing overran", which an empty corpus would
  // satisfy without reading a single string. This is what makes them mean something.
  it('actually has cards to check', () => {
    expect(projects.length).toBeGreaterThan(0)
    expect(availableLocales.length).toBeGreaterThan(1)
    for (const locale of availableLocales) {
      expect(Object.keys(getPageCopy(locale)).length).toBeGreaterThan(0)
    }
  })

  it('every project fits its card in every locale', () => {
    const overlong = projects.flatMap((project) =>
      availableLocales
        .filter((locale) => project.description[locale].length > OG_DESCRIPTION_LIMIT)
        .map(
          (locale) => `${project.slug} (${locale}): ${project.description[locale].length} chars`,
        ),
    )
    expect(overlong).toEqual([])
  })

  it('every standing page fits its card in every locale', () => {
    const overlong = availableLocales.flatMap((locale) =>
      Object.entries(getPageCopy(locale))
        .filter(([, copy]) => copy.description.length > OG_DESCRIPTION_LIMIT)
        .map(([key, copy]) => `${key} (${locale}): ${copy.description.length} chars`),
    )
    expect(overlong).toEqual([])
  })

  it('every project has copy for every locale', () => {
    for (const project of projects) {
      for (const locale of availableLocales) {
        expect(project.title[locale]?.length).toBeGreaterThan(0)
        expect(project.description[locale]?.length).toBeGreaterThan(0)
      }
    }
  })

  // The renderer strips these rather than escaping them, so copy containing one
  // would lose a character silently.
  it('no card copy carries angle brackets', () => {
    const sources = [
      ...projects.flatMap((p) =>
        availableLocales.map((l) => [`${p.slug} (${l})`, p.description[l]] as const),
      ),
      ...availableLocales.flatMap((l) =>
        Object.entries(getPageCopy(l)).map(([k, c]) => [`${k} (${l})`, c.description] as const),
      ),
    ]
    expect(sources.filter(([, text]) => /[<>]/.test(text)).map(([name]) => name)).toEqual([])
  })
})
