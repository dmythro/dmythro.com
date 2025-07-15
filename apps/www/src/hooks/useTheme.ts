import { useEffect, useState } from 'react'
import { defaultTheme, type Theme, themeAttrName } from 'src/utils/theme'

const getSelectedTheme = (): Theme | false =>
  (window.localStorage.getItem(themeAttrName) as Theme) || false

const getCurrentTheme = (): Theme => getSelectedTheme() || detectTheme()

const applyTheme = (theme: Theme, isStorage = false) => {
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

const detectTheme = (): Theme => {
  'use client'

  if (typeof window === 'undefined') {
    return defaultTheme
  }

  const matchDarkTheme = window.matchMedia?.('(prefers-color-scheme: dark)')

  if (matchDarkTheme) {
    return matchDarkTheme.matches ? 'dark' : 'light'
  }

  return defaultTheme
}

const detectAndWatchTheme = (onChange?: (theme: Theme) => void, isStorage = false): void => {
  'use client'

  const selectedTheme = getSelectedTheme()

  // Watch for changes if there's no manually selected theme
  if (!selectedTheme) {
    window
      .matchMedia?.('(prefers-color-scheme: dark)')
      .addEventListener('change', ({ matches }) => {
        const nextTheme: Theme = matches ? 'dark' : 'light'
        applyTheme(nextTheme, isStorage)
        onChange?.(nextTheme)
      })
  }

  applyTheme(getCurrentTheme(), isStorage)
}

export const useTheme = (): Theme => {
  'use client'

  const [theme, setTheme] = useState<Theme>(detectTheme())

  useEffect(() => {
    detectAndWatchTheme(setTheme, false)
  }, [])

  return theme
}
