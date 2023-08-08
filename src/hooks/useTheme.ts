import { useEffect, useState } from 'react'
import { Theme, detectTheme, detectAndWatchTheme } from 'src/theme'

export const useTheme = (): Theme => {
  'use client'

  const [theme, setTheme] = useState<Theme>(detectTheme())

  useEffect(() => {
    detectAndWatchTheme(setTheme, false)
  }, [])

  return theme
}
