function setTheme(isDark) {
  const classList = document.documentElement.classList

  if (isDark) {
    classList.add('dark')
  } else {
    classList.remove('dark')
  }
}

function initTheme() {
  if (!window.matchMedia) {
    return
  }

  const matchDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
  const isDark =
    localStorage.theme === 'dark' || (!('theme' in localStorage) && matchDarkScheme.matches)

  setTheme(isDark)

  matchDarkScheme.addEventListener('change', ({ matches }) => {
    setTheme(matches)
  })
}

initTheme()
