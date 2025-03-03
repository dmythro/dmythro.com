import { heroui } from '@heroui/theme'
import type { Config } from 'tailwindcss'

import pkg from './package.json'

const herouiPrefix = '@heroui/'
const componentsInUse = Object.keys(pkg.dependencies)
  .filter((c) => c.startsWith(herouiPrefix) && c.search(/(theme|system)/) === -1)
  .map((c) => c.replace(herouiPrefix, ''))

export default {
  content: [
    './app/{,**/}*.{ts,jsx,tsx,mdx}',
    './pages/{,**/}*.{ts,jsx,tsx,mdx}',
    './components/{,**/}*.{ts,jsx,tsx,mdx}',

    // If using `src` directory:
    './src/**/*.{ts,jsx,tsx,mdx}',

    // HeroUI individual installation:
    `../../node_modules/@heroui/theme/dist/components/(${componentsInUse.join('|')}).{js,jsx}`,
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [heroui()],
} satisfies Config
