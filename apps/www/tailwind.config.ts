import { nextui } from '@nextui-org/theme'
import type { Config } from 'tailwindcss'

import pkg from './package.json'

const nextuiPrefix = '@nextui-org/'
const componentsInUse = Object.keys(pkg.dependencies)
  .filter((c) => c.startsWith(nextuiPrefix) && c.search(/(theme|system)/) === -1)
  .map((c) => c.replace(nextuiPrefix, ''))

export default {
  content: [
    './app/{,**/}*.{ts,jsx,tsx,mdx}',
    './pages/{,**/}*.{ts,jsx,tsx,mdx}',
    './components/{,**/}*.{ts,jsx,tsx,mdx}',

    // If using `src` directory:
    './src/**/*.{ts,jsx,tsx,mdx}',

    // NextUI individual installation:
    `../../node_modules/@nextui-org/theme/dist/components/(${componentsInUse.join('|')}).{js,jsx}`,
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [nextui()],
} satisfies Config
