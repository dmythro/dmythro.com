const { nextui } = require('@nextui-org/theme')

import pkg from './package.json'

const nextuiPrefix = '@nextui-org/'
const componentsInUse = Object.keys(pkg.dependencies)
  .filter((c) => c.startsWith(nextuiPrefix) && c.search(/(theme|system)/) === -1)
  .map((c) => c.replace(nextuiPrefix, ''))

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/{,**/}*.{ts,jsx,tsx,mdx}',
    './pages/{,**/}*.{ts,jsx,tsx,mdx}',
    './components/{,**/}*.{ts,jsx,tsx,mdx}',

    // If using `src` directory:
    './src/**/*.{ts,jsx,tsx,mdx}',

    // NextUI individual installation:
    `../../node_modules/@nextui-org/theme/dist/components/(${componentsInUse.join('|')}).js`,
  ],
  theme: {
    extend: {},
  },
  darkMode: 'media',
  plugins: [require('@tailwindcss/typography'), nextui()],
}
