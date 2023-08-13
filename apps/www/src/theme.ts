export type Theme = 'dark' | 'light'

export const defaultTheme: Theme = 'light'
export const themeAttrName = 'data-theme'

export const detectTheme = (): Theme => {
  'use client'

  if (typeof window === 'undefined') {
    return defaultTheme
  }

  const matchDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')

  if (matchDarkTheme) {
    return matchDarkTheme.matches ? 'dark' : 'light'
  }

  return defaultTheme
}

export const getSelectedTheme = (): Theme | false =>
  (window.localStorage.getItem(themeAttrName) as Theme) || false

export const getCurrentTheme = (): Theme => getSelectedTheme() || detectTheme()

export const applyTheme = (theme: Theme, isStorage = false) => {
  window.document.firstElementChild?.setAttribute(themeAttrName, theme)

  const classList = window.document.querySelector('main')?.classList
  if (!classList?.contains(theme)) {
    classList?.add(theme)
    classList?.remove(theme === 'dark' ? 'light' : 'dark')
  }

  if (isStorage) {
    window.localStorage.setItem(themeAttrName, theme)
  }
}

export const toggleTheme = () => {
  const currentTheme = getCurrentTheme()
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark', true)
}

// TODO: set <html data-theme="">
export const detectAndWatchTheme = (onChange?: (theme: Theme) => void, isStorage = false): void => {
  'use client'

  const selectedTheme = getSelectedTheme()

  // Watch for changes if there's no manually selected theme
  if (!selectedTheme) {
    window.matchMedia &&
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', ({ matches }) => {
          const nextTheme: Theme = matches ? 'dark' : 'light'
          applyTheme(nextTheme, isStorage)
          onChange && onChange(nextTheme)
        })
  }

  applyTheme(getCurrentTheme(), isStorage)
}
